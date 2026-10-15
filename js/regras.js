(function (raiz, fabrica) {
    const api = fabrica();
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else raiz.ForjaRegras = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    const ATRIBUTOS = { for: 'forca', des: 'destreza', con: 'constituicao', int: 'inteligencia', sab: 'sabedoria', car: 'carisma' };
    const ALIASES = {
        'adestrar animais': 'lidar com animais',
        'clava': 'porrete', 'clavas': 'porrete',
        'bastao': 'bordao', 'bastoes': 'bordao', 'bordoes': 'bordao',
        'adagas': 'adaga', 'dardos': 'dardo', 'fundas': 'funda',
        'bestas leves': 'besta leve', 'bestas de mao': 'besta de mao',
        'espadas longas': 'espada longa', 'espadas curtas': 'espada curta',
        'arcos longos': 'arco longo', 'arcos curtos': 'arco curto',
        'machados de batalha': 'machado de batalha', 'machadinhas': 'machadinha',
        'martelos leves': 'martelo leve', 'martelos de guerra': 'martelo de guerra'
    };
    const NOMES_TALENTOS = {
        'alert': 'alert', 'mobile': 'mobile', 'tough': 'tough', 'observant': 'observant',
        'resilient': 'resilient', 'lightly armored': 'lightly-armored',
        'moderately armored': 'moderately-armored', 'heavily armored': 'heavily-armored'
    };

    function normalizar(valor) {
        return String(valor || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
    }
    function canonico(valor) { const chave = normalizar(valor); return ALIASES[chave] || chave; }
    function inteiro(valor, padrao = 0) {
        const numero = Number(valor);
        return Number.isFinite(numero) ? Math.trunc(numero) : padrao;
    }
    function nivel(valor) { return Math.min(20, Math.max(1, inteiro(valor, 1))); }
    function modificador(valor) { return Math.floor((inteiro(valor, 10) - 10) / 2); }
    function bonusProficiencia(valor) { return 2 + Math.floor((nivel(valor) - 1) / 4); }

    function talentoId(traco) {
        if (traco.talentoId) return traco.talentoId;
        const ingles = normalizar(String(traco.nome || '').match(/\(([^)]+)\)/)?.[1]);
        return NOMES_TALENTOS[ingles] || ingles.replace(/[^a-z0-9]+/g, '-');
    }
    function talentosAtivos(contexto) {
        return (contexto.tracos || []).filter(traco => traco.tipo === 'talento' &&
            (!traco.progressaoNivel || traco.progressaoNivel <= nivel(contexto.nivel)) &&
            (!traco.progressaoRaca || traco.progressaoRaca === contexto.raca) &&
            (!traco.progressaoClasse || traco.progressaoClasse === contexto.classe));
    }
    function temTalento(contexto, id) { return talentosAtivos(contexto).some(traco => talentoId(traco) === id); }
    function dadosOrigem(contexto, banco) {
        const raca = banco.racas?.[contexto.raca] || {};
        return { raca, subraca: raca.subracas?.[contexto.subraca] || {},
            classe: banco.classes?.[contexto.classe] || {}, antecedente: banco.antecedentes?.[contexto.antecedente] || {} };
    }

    // Não altera os valores base nem as escolhas: recalcular e remover escolhas são reversíveis.
    function atributos(contexto, banco) {
        const { raca, subraca } = dadosOrigem(contexto, banco);
        const valores = {}, modificadores = {}, origens = {};
        Object.entries(ATRIBUTOS).forEach(([sigla, nome]) => {
            const base = Math.min(20, Math.max(1, inteiro(contexto.atributos?.[sigla], 10)));
            const partes = [{ origem: 'Base', valor: base }];
            [[contexto.raca, raca], [contexto.subraca, subraca]].forEach(([origem, dado]) => {
                const valor = inteiro(dado.bonusAtributos?.[nome]);
                if (valor) partes.push({ origem, valor });
            });
            const raciais = contexto.detalhes?.escolhas || {};
            if (['Meio-Elfo', 'Humano Variante'].includes(contexto.raca) && (raciais.atributosRaciais || []).includes(sigla)) partes.push({ origem: 'Escolha racial', valor: 1 });
            (contexto.progressosResolvidos || []).filter(progresso => progresso.tipo === 'atributos' &&
                progresso.classe === contexto.classe && progresso.nivel <= nivel(contexto.nivel)).forEach(progresso => {
                const valor = inteiro(progresso.incrementos?.[sigla]);
                if (valor) partes.push({ origem: 'Incremento do nível ' + progresso.nivel, valor });
            });
            talentosAtivos(contexto).forEach(traco => {
                if (traco.bonusAtributo?.sigla === sigla) partes.push({ origem: traco.nome, valor: inteiro(traco.bonusAtributo.quantidade) });
            });
            let total = Math.min(20, partes.reduce((soma, parte) => soma + parte.valor, 0));
            const barbaro = contexto.detalhes?.opcoes.multiclasse && contexto.detalhes.niveis.length ? contexto.detalhes.niveis.find(x => x.classe === 'Bárbaro')?.nivel : contexto.classe === 'Bárbaro' ? nivel(contexto.nivel) : 0;
            if (barbaro === 20 && ['for', 'con'].includes(sigla)) {
                total += 4;
                partes.push({ origem: 'Campeão Primitivo', valor: 4 });
            }
            valores[sigla] = total;
            modificadores[sigla] = modificador(total);
            origens[sigla] = partes;
        });
        return { valores, modificadores, origens };
    }

    function fontesPericias(contexto, banco) {
        const fontes = {};
        Object.keys(banco.pericias || {}).forEach(nome => fontes[nome] = []);
        function conceder(nomes, origem) {
            (nomes || []).forEach(nome => {
                const chave = Object.keys(fontes).find(rotulo => canonico(rotulo) === canonico(nome));
                if (chave && !fontes[chave].includes(origem)) fontes[chave].push(origem);
            });
        }
        const dados = dadosOrigem(contexto, banco);
        conceder(dados.raca.proficienciasPericias, contexto.raca);
        conceder(dados.subraca.proficienciasPericias, contexto.subraca);
        conceder(contexto.periciasClasse, contexto.classe);
        conceder(dados.antecedente.pericias, contexto.antecedente);
        const escolhas = contexto.detalhes?.escolhas || {};
        if (['Meio-Elfo', 'Humano Variante'].includes(contexto.raca)) conceder(escolhas.periciasRaciais, contexto.raca);
        conceder(escolhas.substituicoesAntecedente, 'Substituição de antecedente');
        if (contexto.antecedente === 'Personalizado') conceder(escolhas.periciasPersonalizadas, 'Antecedente personalizado');
        talentosAtivos(contexto).forEach(t => { if (talentoId(t) === 'skilled') conceder(t.escolhas?.pericias, t.nome); });
        if (contexto.classe === 'Bardo' && contexto.subclasse === 'Colégio do Conhecimento' && nivel(contexto.nivel) >= 3) conceder(escolhas.periciasConhecimento, 'Colégio do Conhecimento');
        if (contexto.classe === 'Bruxo' && (escolhas.invocacoes || []).includes('Influência Enganadora')) conceder(['Enganação', 'Persuasão'], 'Influência Enganadora');
        if (contexto.classe === 'Clérigo' && contexto.subclasse === 'Domínio do Conhecimento') conceder(escolhas.conhecimento, 'Bênçãos do Conhecimento');
        if (contexto.classe === 'Clérigo' && contexto.subclasse === 'Domínio da Natureza') conceder(escolhas.natureza, 'Acólito da Natureza');
        conceder(Object.keys(contexto.periciasManuais || {}).filter(nome => contexto.periciasManuais[nome] === true), 'Manual');
        return fontes;
    }

    function testePericia(contexto, banco, nome, calculoAtributos = atributos(contexto, banco)) {
        const fontes = fontesPericias(contexto, banco)[nome] || [];
        const proficiente = fontes.length > 0;
        const especiais = [...(contexto.especializacoes || []), ...(contexto.detalhes?.escolhas?.['especializacao-' + contexto.classe] || [])];
        if (contexto.classe === 'Clérigo' && contexto.subclasse === 'Domínio do Conhecimento') especiais.push(...(contexto.detalhes?.escolhas?.conhecimento || []));
        const especializacao = proficiente && especiais.some(item => canonico(item) === canonico(nome));
        const proficiencia = bonusProficiencia(contexto.nivel);
        const generalista = !proficiente && contexto.classe === 'Bardo' && nivel(contexto.nivel) >= 2;
        const bonusTreinamento = especializacao ? 2 * proficiencia : proficiente ? proficiencia : generalista ? Math.floor(proficiencia / 2) : 0;
        const atributo = banco.pericias?.[nome];
        return { valor: (calculoAtributos.modificadores[atributo] || 0) + bonusTreinamento,
            bonusTreinamento, fontes, proficiente, especializacao, generalista };
    }

    function percepcaoPassiva(contexto, banco) {
        const teste = testePericia(contexto, banco, 'Percepção');
        const observador = temTalento(contexto, 'observant') ? 5 : 0;
        const situacao = contexto.percepcaoSituacao === 'vantagem' ? 5 : contexto.percepcaoSituacao === 'desvantagem' ? -5 : 0;
        return { valor: 10 + teste.valor + observador + situacao, teste, observador, situacao };
    }

    function proficiencias(contexto, banco) {
        const dados = dadosOrigem(contexto, banco);
        const resultado = { idioma: [], arma: [], armadura: [], ferramenta: [] };
        const campos = { idioma: 'idiomas', arma: 'proficienciasArmas', armadura: 'proficienciasArmaduras', ferramenta: 'proficienciasFerramentas' };
        function incluir(tipo, nomes) {
            (nomes || []).forEach(nome => {
                if (!resultado[tipo].some(outro => canonico(outro) === canonico(nome))) resultado[tipo].push(nome);
            });
        }
        Object.values(dados).forEach(dado => Object.entries(campos).forEach(([tipo, campo]) => incluir(tipo, dado[campo])));
        incluir('ferramenta', dados.antecedente.ferramentas);
        const escolhas = contexto.detalhes?.escolhas || {};
        Object.entries(escolhas.proficiencias || {}).forEach(([fonte, itens]) => {
            const [tipo, origem, nome] = fonte.split(':');
            const ativa = origem === 'raca' ? nome === contexto.raca : origem === 'subraca' ? nome === contexto.subraca : origem === 'classe' ? nome === contexto.classe : origem === 'antecedente' ? nome === contexto.antecedente : false;
            if (ativa && resultado[tipo]) incluir(tipo, itens);
        });
        talentosAtivos(contexto).forEach(t => {
            if (talentoId(t) === 'skilled') incluir('ferramenta', t.escolhas?.ferramentas);
            if (talentoId(t) === 'weapon-master') incluir('arma', t.escolhas?.armas);
            if (talentoId(t) === 'linguist') incluir('idioma', t.escolhas?.idiomas);
        });
        if (contexto.antecedente === 'Personalizado' || contexto.antecedente === 'Mercador de Guilda') {
            const itens = escolhas[contexto.antecedente === 'Personalizado' ? 'antecedenteMisto' : 'mercador'] || [];
            itens.forEach(valor => { const [tipo, ...nome] = valor.split(': '); if (resultado[tipo]) incluir(tipo, [nome.join(': ')]); });
        }
        const s = contexto.subclasse;
        if (contexto.classe === 'Bardo' && s === 'Colégio da Bravura' && nivel(contexto.nivel) >= 3) { incluir('arma', ['Armas marciais']); incluir('armadura', ['Armaduras médias', 'Escudos']); }
        if (contexto.classe === 'Clérigo') {
            if (['Domínio da Guerra', 'Domínio daTempestade', 'Domínio da Tempestade'].includes(s)) incluir('arma', ['Armas marciais']);
            if (['Domínio da Guerra', 'Domínio da Tempestade', 'Domínio da Natureza', 'Domínio da Vida'].includes(s)) incluir('armadura', ['Armaduras pesadas']);
        }
        if (contexto.classe === 'Ladino' && s === 'Assassino' && nivel(contexto.nivel) >= 3) incluir('ferramenta', ['Kit de disfarce', 'Kit de venenos']);
        if (contexto.classe === 'Druida') incluir('idioma', ['Druídico']);
        if (contexto.classe === 'Ladino') incluir('idioma', ['Gíria de Ladrão']);
        if (temTalento(contexto, 'lightly-armored')) incluir('armadura', ['Armaduras leves']);
        if (temTalento(contexto, 'moderately-armored')) incluir('armadura', ['Armaduras médias', 'Escudos']);
        if (temTalento(contexto, 'heavily-armored')) incluir('armadura', ['Armaduras pesadas']);
        adicionaisAtivas(contexto, banco).forEach(item => {
            if (resultado[item.tipo]) incluir(item.tipo, [item.nome]);
        });
        return resultado;
    }

    function limitesEscolhas(contexto, banco) {
        const { raca, subraca, classe, antecedente } = dadosOrigem(contexto, banco);
        return {
            idioma: inteiro(raca.idiomasEscolha) + inteiro(subraca.idiomasEscolha) + inteiro(antecedente.idiomasEscolha) + (temTalento(contexto, 'linguist') ? 3 : 0),
            ferramenta: inteiro(raca.ferramentasEscolha) + inteiro(subraca.ferramentasEscolha) + inteiro(classe.ferramentasEscolha) + inteiro(antecedente.ferramentasEscolha) + (temTalento(contexto, 'skilled') ? 3 : 0),
            arma: temTalento(contexto, 'weapon-master') ? 4 : 0
        };
    }
    function adicionaisAtivas(contexto, banco) {
        const limites = limitesEscolhas(contexto, banco), usadas = {};
        return (contexto.proficienciasAdicionais || []).filter(item => {
            if (item.origem !== 'escolha') return true;
            usadas[item.tipo] = (usadas[item.tipo] || 0) + 1;
            return usadas[item.tipo] <= (limites[item.tipo] || 0);
        });
    }

    function proficienteNaArma(arma, lista) {
        if (arma.nome === 'Ataque Desarmado') return true;
        const grupo = arma.categoria === 'simples' ? 'armas simples' : 'armas marciais';
        return lista.some(nome => canonico(nome) === grupo || canonico(nome) === canonico(arma.nome));
    }
    function proficienteNaArmadura(armadura, lista) {
        if (!armadura) return true;
        // A categoria da armadura personalizada é desconhecida: não presumir treinamento.
        const categoria = { leve: 'armaduras leves', media: 'armaduras medias', pesada: 'armaduras pesadas', escudo: 'escudos' }[armadura.subtipo];
        return lista.some(nome => {
            const valor = normalizar(nome).replace(/\s*\([^)]*\)/g, '');
            return valor === categoria || (armadura.subtipo !== 'escudo' && categoria && valor === 'todas as armaduras') || canonico(nome) === canonico(armadura.nome);
        });
    }

    function classeArmadura(contexto, banco, armadura = null, escudo = null) {
        const { modificadores: mods } = atributos(contexto, banco);
        const formulas = [];
        if (armadura) {
            const base = Number.parseInt(armadura.ca, 10);
            const dex = ['leve', 'personalizada-destreza'].includes(armadura.subtipo) ? mods.des : armadura.subtipo === 'media' ? Math.min(temTalento(contexto, 'medium-armor-master') ? 3 : 2, mods.des) : 0;
            formulas.push({ nome: armadura.nome, valor: (Number.isFinite(base) ? base : 10) + dex, formula: base + (dex ? ' ' + (dex >= 0 ? '+ ' : '- ') + Math.abs(dex) + ' DES' : '') });
        } else {
            formulas.push({ nome: 'Sem armadura', valor: 10 + mods.des, formula: '10 + DES (' + mods.des + ')' });
            if (contexto.classe === 'Bárbaro') formulas.push({ nome: 'Defesa sem Armadura', valor: 10 + mods.des + mods.con, formula: '10 + DES (' + mods.des + ') + CON (' + mods.con + ')' });
            if (contexto.classe === 'Monge' && !escudo) formulas.push({ nome: 'Defesa sem Armadura', valor: 10 + mods.des + mods.sab, formula: '10 + DES (' + mods.des + ') + SAB (' + mods.sab + ')' });
            if (contexto.classe === 'Feiticeiro' && contexto.subclasse === 'Linhagem Dracônica') formulas.push({ nome: 'Resiliência Dracônica', valor: 13 + mods.des, formula: '13 + DES (' + mods.des + ')' });
        }
        const escolhida = formulas.reduce((melhor, formula) => formula.valor > melhor.valor ? formula : melhor);
        const bonusEscudo = escudo ? 2 : 0;
        const lista = proficiencias(contexto, banco).armadura;
        const semProficiencia = [armadura, escudo].filter(item => item && !proficienteNaArmadura(item, lista));
        return { valor: escolhida.valor + bonusEscudo, formula: escolhida.formula + (bonusEscudo ? ' + 2 Escudo' : ''),
            origem: escolhida.nome, semProficiencia };
    }

    function deslocamento(contexto, banco, armadura = null, escudo = null) {
        const { raca, subraca } = dadosOrigem(contexto, banco);
        let valor = Number(subraca.deslocamento ?? raca.deslocamento ?? 9);
        if (contexto.classe === 'Bárbaro' && nivel(contexto.nivel) >= 5 && armadura?.subtipo !== 'pesada') valor += 3;
        if (contexto.classe === 'Monge' && nivel(contexto.nivel) >= 2 && !armadura && !escudo) valor += 3 + 1.5 * Math.floor((nivel(contexto.nivel) - 2) / 4);
        if (temTalento(contexto, 'mobile')) valor += 3;
        const requisito = inteiro(String(armadura?.forca || '').match(/\d+/)?.[0]);
        if (armadura?.subtipo === 'pesada' && requisito && atributos(contexto, banco).valores.for < requisito && contexto.raca !== 'Anão') valor -= 3;
        return Math.max(0, valor);
    }

    function pontosVidaMaximos(contexto, banco) {
        const { classe } = dadosOrigem(contexto, banco);
        const dado = inteiro(classe.dadoVida, 8), modCon = atributos(contexto, banco).modificadores.con;
        const n = nivel(contexto.nivel), media = Math.floor(dado / 2) + 1;
        let total = Math.max(1, dado + modCon) + (n - 1) * Math.max(1, media + modCon);
        if (contexto.subraca === 'Anão da Colina') total += n;
        if (contexto.classe === 'Feiticeiro' && contexto.subclasse === 'Linhagem Dracônica') total += n;
        if (temTalento(contexto, 'tough')) total += 2 * n;
        return total;
    }

    function pontosVidaAtuais(recursos, maximo) {
        const atual = recursos.pvAtual == null ? maximo : inteiro(recursos.pvAtual);
        return { ...recursos, pvAtual: Math.max(0, Math.min(maximo, atual)), pvTemporarios: Math.max(0, inteiro(recursos.pvTemporarios)) };
    }
    function aplicarDano(recursos, quantidade) {
        const dano = Math.max(0, inteiro(quantidade));
        const absorvido = Math.min(recursos.pvTemporarios || 0, dano);
        return { ...recursos, pvTemporarios: (recursos.pvTemporarios || 0) - absorvido, pvAtual: Math.max(0, recursos.pvAtual - (dano - absorvido)) };
    }
    function aplicarCura(recursos, quantidade, maximo) {
        return { ...recursos, pvAtual: Math.min(maximo, recursos.pvAtual + Math.max(0, inteiro(quantidade))) };
    }
    function danoBase(arma, duasMaos) {
        const dado = String(duasMaos && arma.versatil ? arma.danoVersatil : arma.dano || '');
        return dado.match(/^\s*(\d+d\d+|\d+)(?=\s|$)/)?.[1] || null;
    }

    const NIVEL_SUBCLASSE = { 'Clérigo': 1, 'Bruxo': 1, 'Feiticeiro': 1, 'Druida': 2, 'Mago': 2 };
    function nivelSubclasse(classe) { return NIVEL_SUBCLASSE[classe] || 3; }

    return Object.freeze({ ATRIBUTOS, normalizar, canonico, inteiro, nivel, modificador, bonusProficiencia,
        talentoId, talentosAtivos, temTalento, dadosOrigem, atributos, fontesPericias, testePericia,
        percepcaoPassiva, proficiencias, limitesEscolhas, adicionaisAtivas, proficienteNaArma, proficienteNaArmadura, classeArmadura,
        deslocamento, pontosVidaMaximos, pontosVidaAtuais, aplicarDano, aplicarCura, danoBase, nivelSubclasse });
});
