(function (raiz, fabrica) {
    const regras = typeof module !== 'undefined' && module.exports ? require('./regras.js') : raiz.ForjaRegras;
    const campanha = typeof module !== 'undefined' && module.exports ? require('./campanha.js') : raiz.ForjaCampanha;
    const api = fabrica(regras, campanha);
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else raiz.ForjaEstado = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (regras, campanha) {
    'use strict';
    const CHAVE = 'forjaPersonagens.ficha.v3';
    const LEGADO = 'forjaPersonagens.ficha.v2';
    const BACKUP = CHAVE + '.backup';
    const VERSION = 3;
    const lista = valor => Array.isArray(valor) ? valor : [];
    const objeto = valor => valor !== null && typeof valor === 'object' && !Array.isArray(valor);
    const copiar = valor => JSON.parse(JSON.stringify(valor));

    function validar(estado) {
        if (!objeto(estado) || estado.schemaVersion !== VERSION) throw new Error('Versão da ficha inválida ou não suportada.');
        if (!objeto(estado.atributos) || !objeto(estado.recursos) || !objeto(estado.equipamento) || !objeto(estado.periciasManuais)) throw new Error('A ficha está incompleta.');
        if (!Number.isInteger(estado.nivel) || estado.nivel < 1 || estado.nivel > 20) throw new Error('Nível inválido.');
        for (const sigla of Object.keys(regras.ATRIBUTOS)) {
            const valor = estado.atributos[sigla];
            if (!Number.isInteger(valor) || valor < 1 || valor > 20) throw new Error('Atributo inválido: ' + sigla);
        }
        for (const campo of ['inventario', 'ataques', 'tracos', 'proficienciasAdicionais', 'progressosResolvidos', 'periciasClasse']) {
            if (!Array.isArray(estado[campo])) throw new Error('Campo inválido: ' + campo);
        }
        for (const campo of ['nome', 'raca', 'subraca', 'classe', 'subclasse', 'alinhamento', 'antecedente']) {
            if (typeof estado[campo] !== 'string') throw new Error('Identidade inválida: ' + campo);
        }
        if (estado.recursos.pvAtual !== null && (!Number.isInteger(estado.recursos.pvAtual) || estado.recursos.pvAtual < 0)) throw new Error('PV atuais inválidos.');
        if (!Number.isInteger(estado.recursos.pvTemporarios) || estado.recursos.pvTemporarios < 0) throw new Error('PV temporários inválidos.');
        for (const item of estado.inventario) {
            if (!objeto(item) || typeof item.id !== 'string' || typeof item.nome !== 'string' || !Number.isFinite(item.peso) || item.peso < 0 || !Number.isInteger(item.quantidade) || item.quantidade < 1) throw new Error('Item de inventário inválido.');
        }
        const ids = estado.inventario.map(item => item.id);
        if (new Set(ids).size !== ids.length) throw new Error('Itens com identificadores repetidos.');
        for (const campo of ['armadura', 'escudo']) {
            const id = estado.equipamento[campo];
            if (id !== null && (typeof id !== 'string' || !ids.includes(id))) throw new Error('Equipamento inválido: ' + campo);
        }
        for (const traco of estado.tracos) {
            if (!objeto(traco) || typeof traco.id !== 'string' || typeof traco.nome !== 'string' || typeof traco.tipo !== 'string' || typeof traco.descricao !== 'string') throw new Error('Característica inválida.');
            if (traco.bonusAtributo && (!objeto(traco.bonusAtributo) || !(traco.bonusAtributo.sigla in regras.ATRIBUTOS) || traco.bonusAtributo.quantidade !== 1)) throw new Error('Bônus de talento inválido.');
        }
        for (const progresso of estado.progressosResolvidos) {
            if (!objeto(progresso) || !Number.isInteger(progresso.nivel) || progresso.nivel < 1 || progresso.nivel > 20 || typeof progresso.classe !== 'string' || !['atributos', 'talento'].includes(progresso.tipo)) throw new Error('Progressão inválida.');
            if (progresso.tipo === 'atributos' && (!objeto(progresso.incrementos) || Object.entries(progresso.incrementos).some(([sigla, valor]) => !(sigla in regras.ATRIBUTOS) || ![1, 2].includes(valor)))) throw new Error('Incremento inválido.');
        }
        for (const adicional of estado.proficienciasAdicionais) {
            if (!objeto(adicional) || typeof adicional.nome !== 'string' || typeof adicional.id !== 'string' || !['idioma', 'arma', 'armadura', 'ferramenta'].includes(adicional.tipo)) throw new Error('Proficiência inválida.');
        }
        for (const ataque of estado.ataques) {
            if (!objeto(ataque) || typeof ataque.nomeArma !== 'string' || typeof ataque.id !== 'string') throw new Error('Ataque inválido.');
        }
        if (estado.periciasClasse.some(nome => typeof nome !== 'string')) throw new Error('Perícia inválida.');
        if (estado.especializacoes && (!Array.isArray(estado.especializacoes) || estado.especializacoes.some(nome => typeof nome !== 'string'))) throw new Error('Especialização inválida.');
        if (Object.values(estado.periciasManuais).some(valor => typeof valor !== 'boolean')) throw new Error('Proficiência manual inválida.');
        if (estado.percepcaoSituacao && !['normal', 'vantagem', 'desvantagem'].includes(estado.percepcaoSituacao)) throw new Error('Situação de percepção inválida.');
        if (estado.tracosAutomaticosExpandidos && (!Array.isArray(estado.tracosAutomaticosExpandidos) || estado.tracosAutomaticosExpandidos.some(id => typeof id !== 'string'))) throw new Error('Características expandidas inválidas.');
        if (estado.detalhes) campanha.validarDetalhes(estado.detalhes);
        if (JSON.stringify(estado).length > 4000000) throw new Error('Ficha maior que 4 MB. Reduza as imagens.');
        return estado;
    }

    function migrarV2(legado, banco) {
        if (!objeto(legado) || (legado.schemaVersion && legado.schemaVersion !== 2)) throw new Error('Formato da ficha antiga inválido.');
        const estado = copiar(legado);
        estado.schemaVersion = VERSION;
        estado.ruleset = 'ldj-2014-patrulheiro-revisado';
        estado.nivel = regras.nivel(estado.nivel);
        for (const campo of ['nome', 'raca', 'subraca', 'classe', 'subclasse', 'alinhamento', 'antecedente']) estado[campo] = String(estado[campo] || '');
        for (const campo of ['inventario', 'ataques', 'tracos', 'proficienciasAdicionais', 'progressosResolvidos', 'periciasClasse']) estado[campo] = lista(estado[campo]);
        estado.atributos = Object.fromEntries(Object.keys(regras.ATRIBUTOS).map(sigla => [sigla, regras.inteiro(estado.atributos?.[sigla], 10)]));
        const descontos = Object.fromEntries(Object.keys(regras.ATRIBUTOS).map(sigla => [sigla, 0]));
        estado.progressosResolvidos.forEach(progresso => {
            if (progresso.tipo !== 'atributos') return;
            Object.entries(progresso.incrementos || {}).forEach(([sigla, valor]) => { if (sigla in descontos) descontos[sigla] += regras.inteiro(valor); });
        });
        estado.tracos.forEach(traco => {
            if (traco.tipo !== 'talento') return;
            traco.talentoId = regras.talentoId(traco);
            if (traco.progressaoNivel) {
                const progresso = estado.progressosResolvidos.find(item => item.tipo === 'talento' && item.nivel === traco.progressaoNivel && item.talento === traco.nome);
                traco.progressaoClasse = progresso?.classe || estado.classe;
            }
            const bonus = traco.bonusAtributo;
            if (bonus && bonus.sigla in descontos) descontos[bonus.sigla] += regras.inteiro(bonus.quantidade);
        });
        Object.keys(descontos).forEach(sigla => {
            // Não adivinhar o valor se registros antigos são incompatíveis com o atributo salvo.
            const base = estado.atributos[sigla] - descontos[sigla];
            if (base < 1 || base > 20) throw new Error('Não foi possível separar os bônus antigos de ' + sigla + '. A cópia original foi conservada.');
            estado.atributos[sigla] = base;
        });
        const automaticas = regras.fontesPericias({ ...estado, periciasManuais: {} }, banco);
        estado.periciasManuais = {};
        Object.entries(legado.pericias || {}).forEach(([nome, marcada]) => {
            const rotulo = Object.keys(banco.pericias).find(item => regras.canonico(item) === regras.canonico(nome));
            if (rotulo && marcada === true && !automaticas[rotulo]?.length) estado.periciasManuais[rotulo] = true;
        });
        estado.inventario.forEach((item, indice) => {
            item.id = item.id || 'legado-item-' + indice;
            item.quantidade = regras.inteiro(item.quantidade, 1) || 1;
            item.peso = Number(item.peso) || 0;
        });
        estado.recursos = { pvAtual: null, pvTemporarios: 0 };
        estado.equipamento = { armadura: null, escudo: null };
        estado.percepcaoSituacao = 'normal';
        estado.detalhes = campanha.novo();
        estado.antecedente = ({ 'Artisao da Guilda': 'Artesão da Guilda', 'Orfao': 'Órfão' })[estado.antecedente] || estado.antecedente;
        if (estado.classe === 'Patrulheiro') estado.subclasse = ({ 'Caçador': 'Conclave do Caçador', 'Mestre das Feras': 'Conclave da Besta' })[estado.subclasse] || estado.subclasse;
        estado.migradoDe = 2;
        return validar(estado);
    }

    // Nunca remove ou modifica a chave v2. O leitor não grava durante a restauração.
    function carregar(storage, banco) {
        try {
            const raw = storage.getItem(CHAVE);
            if (raw !== null) return { estado: validar(JSON.parse(raw)), migrado: false };
            const antigo = storage.getItem(LEGADO);
            if (antigo !== null) return { estado: migrarV2(JSON.parse(antigo), banco), migrado: true };
            return { estado: null, migrado: false };
        } catch (erro) {
            return { estado: null, bloqueado: true, erro: erro.message };
        }
    }

    function salvar(storage, estado) {
        validar(estado);
        const novo = JSON.stringify(estado);
        const anterior = storage.getItem(CHAVE);
        if (anterior === novo) return;
        if (anterior !== null) {
            // Não sobrescrever um documento desconhecido ou corrompido, nem o último backup bom.
            validar(JSON.parse(anterior));
            storage.setItem(BACKUP, anterior);
        }
        storage.setItem(CHAVE, novo);
    }

    function recuperar(storage, banco) {
        const quebrado = storage.getItem(CHAVE);
        const backup = storage.getItem(BACKUP);
        const legado = storage.getItem(LEGADO);
        let restaurado;
        if (backup !== null) {
            try { restaurado = validar(JSON.parse(backup)); } catch (_) { /* O legado continua sendo uma opção. */ }
        }
        if (!restaurado && legado !== null) restaurado = migrarV2(JSON.parse(legado), banco);
        if (!restaurado) throw new Error('Nenhuma cópia válida disponível. Baixe os dados para recuperação.');
        if (quebrado !== null) storage.setItem(CHAVE + '.recuperacao.' + Date.now(), quebrado);
        storage.setItem(CHAVE, JSON.stringify(restaurado));
        return restaurado;
    }

    return Object.freeze({ CHAVE, LEGADO, BACKUP, VERSION, validar, migrarV2, carregar, salvar, recuperar });
});
