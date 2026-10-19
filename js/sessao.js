(function (raiz, fabrica) {
    const regras = typeof module !== 'undefined' && module.exports ? require('./regras.js') : raiz.ForjaRegras;
    const campanha = typeof module !== 'undefined' && module.exports ? require('./campanha.js') : raiz.ForjaCampanha;
    const api = fabrica(regras, campanha);
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else raiz.ForjaSessao = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (R, F) {
    'use strict';

    const copiar = valor => JSON.parse(JSON.stringify(valor));
    const custosEspaco = Object.freeze({ 1: 2, 2: 3, 3: 5, 4: 6, 5: 7 });

    function detalhes(contexto) {
        const d = copiar(contexto.detalhes || F.novo());
        d.sessao.turno ||= { acao: false, bonus: false, reacao: false, movimento: false };
        d.sessao.forma ||= null;
        d.magias.espacosCriados ||= {};
        return d;
    }

    function novoTurno(contexto) {
        const d = detalhes(contexto);
        d.sessao.turno = { acao: false, bonus: false, reacao: false, movimento: false };
        d.magias.turno = { bonusNivel: false, outraNivel: false };
        return d;
    }

    function usarAcao(contexto, tipo) {
        if (!['acao', 'bonus', 'reacao', 'movimento'].includes(tipo)) throw new Error('Tipo de ação inválido.');
        const d = detalhes(contexto);
        if (d.sessao.turno[tipo]) throw new Error('Essa ação já foi usada neste turno.');
        if (d.sessao.condicoes.some(x => ['Incapacitado', 'Atordoado', 'Inconsciente', 'Paralisado', 'Petrificado'].includes(x)) && ['acao', 'bonus', 'reacao'].includes(tipo)) throw new Error('A condição atual impede essa ação.');
        d.sessao.turno[tipo] = true;
        return d;
    }

    function converterEspaco(contexto, circulo) {
        const custo = custosEspaco[circulo];
        if (!custo) throw new Error('Só é possível criar espaços do 1º ao 5º círculo.');
        const d = detalhes(contexto);
        const nivel = F.nivelClasse(contexto, 'Feiticeiro');
        if (nivel < 2) throw new Error('Conversão Flexível exige Feiticeiro de nível 2.');
        const max = Math.max(0, nivel - (d.gastos.feiticaria || 0));
        if (max < custo) throw new Error('Pontos de feitiçaria insuficientes.');
        d.gastos.feiticaria = (d.gastos.feiticaria || 0) + custo;
        d.magias.espacosCriados[circulo] = (d.magias.espacosCriados[circulo] || 0) + 1;
        return d;
    }

    function converterEmPontos(contexto, banco, reserva) {
        const d = detalhes(contexto);
        const nivel = F.nivelClasse(contexto, 'Feiticeiro');
        if (nivel < 2) throw new Error('Conversão Flexível exige Feiticeiro de nível 2.');
        const espaco = F.espacos(contexto, banco).find(x => x.id === reserva);
        if (!espaco || espaco.disponiveis < 1 || espaco.tipo !== 'normal') throw new Error('Espaço de magia indisponível para conversão.');
        const atuais = Math.max(0, nivel - (d.gastos.feiticaria || 0));
        const recebidos = Math.min(espaco.circulo, nivel - atuais);
        if (recebidos < 1) throw new Error('Os pontos de feitiçaria já estão no máximo.');
        d.magias.gastos[reserva] = (d.magias.gastos[reserva] || 0) + 1;
        d.gastos.feiticaria = Math.max(0, (d.gastos.feiticaria || 0) - recebidos);
        return d;
    }

    function resistenciaAplica(lista, tipo) {
        const normal = R.normalizar(tipo);
        return lista.some(item => {
            const valor = R.normalizar(item);
            return valor === normal || valor === 'todos' || valor.startsWith('todos exceto') && !valor.includes(normal) || valor.includes(normal);
        });
    }

    function ajustarDano(contexto, banco, quantidade, tipo, opcoes = {}) {
        if (!Number.isInteger(quantidade) || quantidade < 0) throw new Error('Dano inválido.');
        const imunes = (opcoes.imunidades || contexto.imunidades || []).map(R.normalizar);
        if (contexto.subclasse === 'Círculo da Terra' && F.nivelClasse(contexto, 'Druida') >= 10) imunes.push('veneno');
        const vulneraveis = (opcoes.vulnerabilidades || contexto.vulnerabilidades || []).map(R.normalizar);
        if (imunes.includes(R.normalizar(tipo))) return 0;
        let valor = quantidade;
        if (resistenciaAplica([...(F.resistencias(contexto, banco) || []), ...(opcoes.resistencias || [])], tipo)) valor = Math.floor(valor / 2);
        if (vulneraveis.includes(R.normalizar(tipo))) valor *= 2;
        return valor;
    }

    function sofrerDano(contexto, banco, recursos, quantidade, tipo = 'sem tipo', opcoes = {}) {
        const d = detalhes(contexto);
        let valor = ajustarDano(contexto, banco, quantidade, tipo, opcoes);
        if ((d.sessao.protecaoArcana || 0) > 0) {
            const absorvido = Math.min(d.sessao.protecaoArcana, valor);
            d.sessao.protecaoArcana -= absorvido;
            valor -= absorvido;
        }
        let forma = d.sessao.forma;
        if (forma?.pvAtual > 0) {
            const absorvido = Math.min(forma.pvAtual, valor);
            forma.pvAtual -= absorvido;
            valor -= absorvido;
            if (forma.pvAtual === 0) d.sessao.forma = null;
        }
        let atuais = copiar(recursos);
        if (valor > 0) {
            if (atuais.pvAtual === 0) d.sessao.morte = F.danoZero(d, !!opcoes.critico).sessao.morte;
            atuais = R.aplicarDano(atuais, valor);
            const max = F.pvMaximos(contexto, banco);
            if (valor - (recursos.pvTemporarios || 0) - (recursos.pvAtual || 0) >= max) d.sessao.morte.morto = true;
            if (d.magias.concentracao) d.sessao.ultimaConcentracao = { cd: Math.max(10, Math.floor(valor / 2)), vantagem: R.temTalento(contexto, 'war-caster') };
        }
        return { detalhes: d, recursos: atuais, danoAplicado: ajustarDano(contexto, banco, quantidade, tipo, opcoes), excedenteForma: valor };
    }

    function curar(contexto, banco, recursos, quantidade) {
        if (!Number.isInteger(quantidade) || quantidade < 0) throw new Error('Cura inválida.');
        const d = detalhes(contexto);
        if (d.sessao.morte.morto) throw new Error('Cura comum não revive um personagem morto.');
        if (d.sessao.forma?.pvAtual > 0) d.sessao.forma.pvAtual = Math.min(d.sessao.forma.pvMax, d.sessao.forma.pvAtual + quantidade);
        else recursos = R.aplicarCura(recursos, quantidade, F.pvMaximos(contexto, banco));
        if (recursos.pvAtual > 0) d.sessao.morte = F.novo().sessao.morte;
        return { detalhes: d, recursos };
    }

    function retomarFolego(contexto, banco, recursos, rolar = faces => 1 + Math.floor(Math.random() * faces)) {
        const nivel = F.nivelClasse(contexto, 'Guerreiro');
        if (!nivel) throw new Error('Retomar o Fôlego exige níveis de Guerreiro.');
        const d = F.gastar(contexto, banco, 'folego');
        return curar({ ...contexto, detalhes: d }, banco, recursos, rolar(10) + nivel);
    }

    function curaPelasMaos(contexto, banco, recursos, quantidade) {
        if (!Number.isInteger(quantidade) || quantidade < 1) throw new Error('Informe uma quantidade positiva de Cura pelas Mãos.');
        const max = F.nivelClasse(contexto, 'Paladino') * 5;
        const d = detalhes(contexto);
        if (max - (d.gastos['cura-maos'] || 0) < quantidade) throw new Error('Reserva de Cura pelas Mãos insuficiente.');
        d.gastos['cura-maos'] = (d.gastos['cura-maos'] || 0) + quantidade;
        return curar({ ...contexto, detalhes: d }, banco, recursos, quantidade);
    }

    function destruicaoDivina(contexto, banco, circulo, mortoVivoOuCorruptor = false) {
        if (!F.nivelClasse(contexto, 'Paladino')) throw new Error('Destruição Divina exige níveis de Paladino.');
        if (!Number.isInteger(circulo) || circulo < 1 || circulo > 4) throw new Error('Círculo inválido para Destruição Divina.');
        const reserva = F.espacos(contexto, banco).find(x => x.circulo >= circulo && x.disponiveis > 0 && x.tipo === 'normal');
        if (!reserva) throw new Error('Não há espaço disponível.');
        const d = detalhes(contexto);
        d.magias.gastos[reserva.id] = (d.magias.gastos[reserva.id] || 0) + 1;
        return { detalhes: d, dano: Math.min(5, circulo + 1 + (mortoVivoOuCorruptor ? 1 : 0)) + 'd8', reserva: reserva.id };
    }

    function recarregarProtecaoArcana(contexto, banco, circulo) {
        const nivel = F.nivelClasse(contexto, 'Mago');
        if (contexto.subclasse !== 'Escola de Abjuração' || nivel < 2) throw new Error('Proteção Arcana indisponível.');
        const d = detalhes(contexto);
        const max = 2 * nivel + R.atributos(contexto, banco).modificadores.int;
        const atual = d.sessao.protecaoArcana ?? 0;
        d.sessao.protecaoArcana = atual > 0 ? Math.min(max, atual + 2 * circulo) : max;
        return d;
    }

    return Object.freeze({ custosEspaco, novoTurno, usarAcao, converterEspaco, converterEmPontos, ajustarDano, sofrerDano, curar, retomarFolego, curaPelasMaos, destruicaoDivina, recarregarProtecaoArcana });
});
