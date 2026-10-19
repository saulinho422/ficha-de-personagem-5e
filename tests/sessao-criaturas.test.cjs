const { test } = require('node:test');
const assert = require('node:assert/strict');
const { F, banco, ficha } = require('./apoio.cjs');
const S = require('../js/sessao.js');
const C = require('../js/criaturas.js');
const A = require('../dados/auxiliares.js');

function contexto(alteracoes = {}) {
    const base = ficha();
    const detalhes = alteracoes.detalhes || base.detalhes;
    return { ...base, ...alteracoes, detalhes, recursos: alteracoes.recursos || { pvAtual: 20, pvTemporarios: 0 } };
}

test('ações do turno não podem ser gastas duas vezes', () => {
    let c = contexto();
    c.detalhes = S.usarAcao(c, 'acao');
    assert.throws(() => S.usarAcao(c, 'acao'), /já foi usada/);
    assert.equal(S.novoTurno(c).sessao.turno.acao, false);
});

test('condições incapacitantes bloqueiam ações', () => {
    const c = contexto(); c.detalhes.sessao.condicoes = ['Atordoado'];
    assert.throws(() => S.usarAcao(c, 'acao'), /impede/);
});

test('resistência reduz dano e vulnerabilidade o dobra', () => {
    const c = contexto({ raca: 'Tiefling', subraca: '' });
    assert.equal(S.ajustarDano(c, banco, 9, 'fogo'), 4);
    assert.equal(S.ajustarDano(c, banco, 9, 'frio', { vulnerabilidades: ['frio'] }), 18);
});

test('imunidade prevalece sobre outros modificadores', () => {
    const c = contexto();
    assert.equal(S.ajustarDano(c, banco, 100, 'veneno', { imunidades: ['veneno'], vulnerabilidades: ['veneno'] }), 0);
});

test('Círculo da Terra de nível 10 é imune a veneno', () => {
    const c = contexto({ classe: 'Druida', nivel: 10, subclasse: 'Círculo da Terra' });
    assert.equal(S.ajustarDano(c, banco, 21, 'veneno'), 0);
});

test('Proteção Arcana absorve dano antes dos pontos de vida', () => {
    const c = contexto({ classe: 'Mago', nivel: 5, subclasse: 'Escola de Abjuração' });
    c.detalhes.sessao.protecaoArcana = 7;
    const out = S.sofrerDano(c, banco, c.recursos, 10, 'fogo');
    assert.equal(out.detalhes.sessao.protecaoArcana, 0);
    assert.equal(out.recursos.pvAtual, 17);
});

test('Proteção Arcana nasce cheia e recarrega com abjuração', () => {
    const c = contexto({ classe: 'Mago', nivel: 5, subclasse: 'Escola de Abjuração' });
    let d = S.recarregarProtecaoArcana(c, banco, 1);
    assert.equal(d.sessao.protecaoArcana, 10 + 2);
    d.sessao.protecaoArcana = 3;
    assert.equal(S.recarregarProtecaoArcana({ ...c, detalhes: d }, banco, 2).sessao.protecaoArcana, 7);
});

test('dano excedente da forma selvagem alcança o druida', () => {
    const c = contexto(); c.detalhes.sessao.forma = { pvAtual: 5, pvMax: 5, nome: 'Lobo' };
    const out = S.sofrerDano(c, banco, c.recursos, 8, 'cortante');
    assert.equal(out.detalhes.sessao.forma, null);
    assert.equal(out.recursos.pvAtual, 17);
});

test('cura durante Forma Selvagem recupera a forma', () => {
    const c = contexto(); c.detalhes.sessao.forma = { pvAtual: 2, pvMax: 11, nome: 'Lobo' };
    const out = S.curar(c, banco, c.recursos, 7);
    assert.equal(out.detalhes.sessao.forma.pvAtual, 9);
    assert.equal(out.recursos.pvAtual, 20);
});

test('Retomar o Fôlego gasta uso e cura 1d10 + nível', () => {
    const c = contexto({ classe: 'Guerreiro', nivel: 4, recursos: { pvAtual: 3, pvTemporarios: 0 } });
    const out = S.retomarFolego(c, banco, c.recursos, () => 6);
    assert.equal(out.recursos.pvAtual, 13);
    assert.equal(out.detalhes.gastos.folego, 1);
});

test('Cura pelas Mãos respeita a reserva', () => {
    const c = contexto({ classe: 'Paladino', nivel: 3, recursos: { pvAtual: 2, pvTemporarios: 0 } });
    const out = S.curaPelasMaos(c, banco, c.recursos, 12);
    assert.equal(out.detalhes.gastos['cura-maos'], 12);
    assert.throws(() => S.curaPelasMaos({ ...c, detalhes: out.detalhes }, banco, out.recursos, 4), /insuficiente/);
});

test('Conversão Flexível cria espaço com o custo correto', () => {
    const c = contexto({ classe: 'Feiticeiro', nivel: 5 });
    const d = S.converterEspaco(c, 3);
    assert.equal(d.gastos.feiticaria, 5);
    assert.equal(d.magias.espacosCriados[3], 1);
});

test('Destruição Divina consome espaço e limita os dados', () => {
    const c = contexto({ classe: 'Paladino', nivel: 17 });
    const out = S.destruicaoDivina(c, banco, 4, true);
    assert.equal(out.dano, '5d8');
    assert.equal(out.detalhes.magias.gastos[out.reserva], 1);
});

test('formas disponíveis respeitam ND, natação e voo', () => {
    const c2 = contexto({ classe: 'Druida', nivel: 2, subclasse: '' });
    assert.ok(C.formasPermitidas(c2, A.criaturas).every(x => x.nd <= 0.25 && !x.voo && !x.natacao));
    const c8 = contexto({ classe: 'Druida', nivel: 8, subclasse: '' });
    assert.ok(C.formasPermitidas(c8, A.criaturas).some(x => x.voo));
});

test('transformar gasta Forma Selvagem e registra estatísticas', () => {
    const c = contexto({ classe: 'Druida', nivel: 4, subclasse: '' });
    const cobra = A.criaturas.find(x => x.nome === 'Cobra Constritora');
    const d = C.transformar(c, banco, cobra);
    assert.equal(d.gastos['forma-selvagem'], 1);
    assert.equal(d.sessao.forma.nome, cobra.nome);
});

test('criatura personalizada exige autorização e dados estruturados', () => {
    const lobo = C.criarPersonalizada({ nome: 'Lobo da Névoa', pv: 11, ca: 13, nd: '1/4', tipo: 'Besta' });
    const c = contexto({ classe: 'Druida', nivel: 4 });
    assert.throws(() => C.transformar(c, banco, lobo), /autorização/);
    lobo.autorizada = true;
    assert.equal(C.transformar(c, banco, lobo).sessao.forma.pvMax, 11);
});

test('companheiro do Patrulheiro Revisado escala com proficiência', () => {
    const c = contexto({ classe: 'Patrulheiro', nivel: 8, subclasse: 'Conclave da Besta' });
    const base = { id: 'lobo', nome: 'Lobo', tipo: 'Besta', nd: 0.25, ca: 13, pv: 11, deslocamento: '12 m', ataque: 4, atributos: { sab: 12 }, pericias: { Percepção: 3 } };
    const aliado = C.companheiro(c, base);
    assert.equal(aliado.proficiencia, 3);
    assert.equal(aliado.ca, 16);
    assert.equal(aliado.pvMax, 32);
});
