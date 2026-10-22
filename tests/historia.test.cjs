const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const codigo = fs.readFileSync(path.join(__dirname, '../js/historia.js'), 'utf8');
const nomes = {
    idade: 'Idade', altura: 'Altura', peso: 'Peso', olhos: 'Olhos', pele: 'Pele', cabelos: 'Cabelos',
    aparencia: 'Aparência', tracos: 'Traços', ideais: 'Ideais', vinculos: 'Vínculos', defeitos: 'Defeitos',
    historia: 'História', aliados: 'Aliados', tesouro: 'Tesouro', adicionais: 'Adicionais',
    divindade: 'Divindade', planos: 'Planos', estiloVida: 'Estilo de vida',
};

function preparar(t) {
    const dom = new JSDOM('<main></main>', { runScripts: 'outside-only' });
    t.after(() => dom.window.close());
    const w = dom.window, d = w.document, mensagens = [];
    w.bancoDnD = { antecedentes: { Variante: { varianteDe: 'Base' } } };
    w.ForjaAuxiliares = { antecedentes: { Base: { tracos: ['Um', 'Dois'], ideais: ['Ideal'] } } };
    w.ForjaAventura = { bugigangas: Array(100).fill('Uma chave') };
    w.mostrarToast = texto => mensagens.push(texto);
    const el = (tag, attrs = {}, ...filhos) => {
        const n = d.createElement(tag);
        for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
        n.append(...filhos);
        return n;
    };
    const campo = (...args) => {
        const [nome, id, valor, acao, opcoes] = args;
        const n = el(opcoes.area ? 'textarea' : 'input', { id });
        n.value = valor;
        n.addEventListener('input', () => acao(n.value));
        return el('label', {}, nome, n);
    };
    const botao = (nome, acao) => {
        const n = el('button', {}, nome);
        n.addEventListener('click', acao);
        return n;
    };
    let estado = { historia: { historia: 'Antes', tesouro: 'Tesouro salvo', planos: 'Plano salvo' } };
    let salvamentos = 0, preenchimentos = 0, tabelas = 0, fisicos = 0;
    const midia = { controle: chave => el('div', { 'data-midia': chave }), preencher: () => preenchimentos++ };
    const api = w.eval(codigo + '\nForjaHistoria;').criar({
        contexto: () => ({ antecedente: 'Variante' }), detalhes: () => estado, campos: () => nomes,
        el, campo, botao, midia, salvar: () => salvamentos++,
        tabelasPersonalidade: () => tabelas++, sugerirFisico: () => fisicos++,
    });
    api.montar(d.querySelector('main'));
    return { w, d, api, mensagens, substituir: novo => estado = novo, estado: () => estado,
        contagens: () => ({ salvamentos, preenchimentos, tabelas, fisicos }) };
}

test('história organiza mídia e campos sem apagar dados removidos da interface', t => {
    const { d, estado, contagens } = preparar(t);
    assert.equal(d.querySelectorAll('.forja-historia-fisico input').length, 6);
    assert.equal(d.querySelectorAll('.forja-historia-personalidade textarea').length, 4);
    assert.ok(d.querySelector('.forja-historia-aparencia [data-midia="retrato"]'));
    assert.ok(d.querySelector('.forja-historia-organizacao [data-midia="simbolo"]'));
    for (const chave of ['tesouro', 'adicionais', 'divindade', 'planos', 'estiloVida']) {
        assert.equal(d.querySelector('#forja-historia-' + chave), null);
    }
    assert.equal(estado().historia.tesouro, 'Tesouro salvo');
    assert.equal(estado().historia.planos, 'Plano salvo');
    assert.equal(contagens().salvamentos, 0);
});

test('getter acompanha troca de personagem e preenchimento preserva edição focada', t => {
    const { w, d, api, substituir, estado, contagens } = preparar(t);
    const entrada = d.querySelector('#forja-historia-historia');
    const anterior = estado();
    substituir({ historia: { historia: 'Outra ficha' } });
    api.preencher();
    assert.equal(entrada.value, 'Outra ficha');
    entrada.focus();
    entrada.value = 'Digitando';
    api.preencher();
    assert.equal(entrada.value, 'Digitando');
    entrada.dispatchEvent(new w.Event('input'));
    assert.equal(estado().historia.historia, 'Digitando');
    assert.equal(anterior.historia.historia, 'Antes');
    assert.equal(contagens().salvamentos, 1);
});

test('sugestões acrescentam conteúdo da variante e bugiganga mantém destino salvo', t => {
    const { d, estado, mensagens, contagens } = preparar(t);
    const clicar = texto => [...d.querySelectorAll('button')].find(n => n.textContent === texto).click();
    estado().historia.tracos = 'Original';
    clicar('Sugerir traços');
    assert.ok(estado().historia.tracos.startsWith('Original\n'));
    assert.ok(estado().historia.tracos.includes('Um'));
    assert.ok(estado().historia.tracos.includes('Dois'));
    clicar('Escolher nas tabelas');
    clicar('Sugerir altura e peso');
    clicar('Rolar bugiganga (d100)');
    assert.ok(estado().historia.tesouro.startsWith('Tesouro salvo\n'));
    assert.ok(estado().historia.tesouro.endsWith(' — Uma chave'));
    assert.ok(mensagens[1].includes('Uma chave'));
    assert.equal(contagens().salvamentos, 2);
    assert.equal(contagens().tabelas, 1);
    assert.equal(contagens().fisicos, 1);
});
