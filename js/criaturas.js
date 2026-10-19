(function (raiz, fabrica) {
    const regras = typeof module !== 'undefined' && module.exports ? require('./regras.js') : raiz.ForjaRegras;
    const campanha = typeof module !== 'undefined' && module.exports ? require('./campanha.js') : raiz.ForjaCampanha;
    const api = fabrica(regras, campanha);
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else raiz.ForjaCriaturas = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (R, F) {
    'use strict';
    const copiar = valor => JSON.parse(JSON.stringify(valor));

    function numeroND(valor) {
        if (typeof valor === 'number') return valor;
        const texto = String(valor || '0').replace(',', '.');
        if (texto.includes('/')) { const [a, b] = texto.split('/').map(Number); return b ? a / b : 0; }
        return Number(texto) || 0;
    }

    function formasPermitidas(contexto, criaturas) {
        const nivel = F.nivelClasse(contexto, 'Druida');
        if (nivel < 2) return [];
        const lua = contexto.subclasse === 'Círculo da Lua';
        const maxND = lua ? (nivel >= 6 ? Math.floor(nivel / 3) : 1) : nivel >= 8 ? 1 : nivel >= 4 ? 0.5 : 0.25;
        const nadar = nivel >= 4, voar = nivel >= 8;
        return criaturas.filter(c => R.normalizar(c.tipo || '').includes('besta') && numeroND(c.nd ?? c.desafio) <= maxND && (nadar || !/natação|nadar/i.test(c.deslocamento || '')) && (voar || !/voo|voar/i.test(c.deslocamento || '')));
    }

    function transformar(contexto, banco, criatura) {
        if (!formasPermitidas(contexto, [criatura]).length) throw new Error('Essa forma não está disponível para o druida.');
        const d = copiar(contexto.detalhes);
        if (d.sessao.forma) throw new Error('Encerre a forma atual antes de assumir outra.');
        if (contexto.recursos?.pvAtual === 0 || d.sessao.morte.morto) throw new Error('Não é possível assumir forma a 0 PV ou morto.');
        const recurso = F.maxRecursos(contexto, banco).find(x => x.id === 'forma-selvagem');
        if (!recurso || recurso.disponivel < 1) throw new Error('Sem usos de Forma Selvagem.');
        const autorizado = criatura.autorizada || contexto.detalhes?.criaturas?.find(x => x.id === criatura.id)?.autorizada;
        if (criatura.personalizada && !autorizado) throw new Error('Uma criatura personalizada precisa de autorização do Mestre.');
        const atualizado = F.gastar(contexto, banco, 'forma-selvagem');
        atualizado.sessao.forma = { id: criatura.id, nome: criatura.nome, pvAtual: criatura.pv, pvMax: criatura.pv, ca: criatura.ca, nd: criatura.nd ?? criatura.desafio, base: copiar(criatura) };
        return atualizado;
    }

    function encerrarForma(contexto) {
        const d = copiar(contexto.detalhes);
        d.sessao.forma = null;
        return d;
    }

    function bonusProficienciaCompanheiro(nivel) { return R.bonusProficiencia(Math.max(1, nivel)); }

    function companheiro(contexto, criatura) {
        const nivel = F.nivelClasse(contexto, 'Patrulheiro');
        if (contexto.subclasse !== 'Conclave da Besta' || nivel < 3) throw new Error('Companheiro exige o Conclave da Besta no nível 3.');
        if (numeroND(criatura.nd ?? criatura.desafio) > 0.25 || Number(criatura.pv || 0) > 15 || /voo/i.test(criatura.deslocamento || '') && nivel < 7) throw new Error('Criatura inválida para companheiro.');
        const prof = bonusProficienciaCompanheiro(F.nivelTotal(contexto));
        const base = criatura.base || criatura;
        const atributos = copiar(base.atributos || {});
        const melhorias = contexto.detalhes?.escolhas?.companheiroAtributos || [];
        melhorias.forEach(sigla => { atributos[sigla] = Math.min(20, (atributos[sigla] || 10) + 1); });
        const pericias = {};
        for (const [nome, valor] of Object.entries(base.pericias || {})) pericias[nome] = Number(valor) + prof;
        for (const nome of contexto.detalhes?.escolhas?.companheiroPericias || []) if (!(nome in pericias)) pericias[nome] = prof + R.modificador(atributos.sab || 10);
        return {
            id: criatura.id, nome: criatura.nome, base: copiar(base), nivel, proficiencia: prof,
            ca: Number(base.ca || 10) + prof,
            pvMax: Math.max(Number(base.pv || 1), 4 * nivel),
            ataque: Number(base.ataque || 0) + prof,
            danoBonus: prof,
            salvaguardas: Object.fromEntries(Object.entries(base.salvaguardas || {}).map(([k, v]) => [k, Number(v) + prof])),
            pericias, atributos
        };
    }

    function criarPersonalizada(entrada) {
        const nome = String(entrada.nome || '').trim();
        const pv = Number(entrada.pv), ca = Number(entrada.ca), nd = numeroND(entrada.nd);
        if (!nome || !Number.isInteger(pv) || pv < 1 || !Number.isInteger(ca) || ca < 1 || nd < 0 || nd > 30) throw new Error('Nome, PV, CA ou ND da criatura são inválidos.');
        return { id: entrada.id || 'criatura-' + Date.now().toString(36), nome, tipo: String(entrada.tipo || 'Besta'), nd, pv, ca, deslocamento: String(entrada.deslocamento || '9 m'), atributos: copiar(entrada.atributos || {}), ataques: copiar(entrada.ataques || []), descricao: String(entrada.descricao || ''), personalizada: true };
    }

    return Object.freeze({ numeroND, formasPermitidas, transformar, encerrarForma, companheiro, criarPersonalizada });
});
