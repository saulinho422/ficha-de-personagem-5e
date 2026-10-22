const test = require('node:test');
const assert = require('node:assert/strict');
const R = require('../js/criacao-regras.js');
const base = () => ({ for: 8, des: 8, con: 8, int: 8, sab: 8, car: 8 });

test('4d6 é solicitado por série, descarta só um menor e encerra após seis', () => {
  const sequencia = [1, 1, 5, 6];
  let chamadas = 0;
  const rolar = faces => { assert.equal(faces, 6); return sequencia[chamadas++ % 4]; };
  let rolagens = [];
  for (let i = 0; i < 6; i++) rolagens = R.rolarAtributo(rolagens, rolar);
  assert.equal(chamadas, 24);
  assert.deepEqual(rolagens[0], { dados: [1, 1, 5, 6], descarte: 0, total: 12 });
  assert.throws(() => R.rolarAtributo(rolagens, rolar));
  assert.equal(chamadas, 24);
  assert.throws(() => R.rolarAtributo([], () => 7));
  assert.throws(() => R.rolarAtributo([{ dados: [1, 2, 3, 4], descarte: 3, total: 6 }], rolar));
});

test('distribuição usa índices independentes e troca resultados já alocados', () => {
  const valores = [15, 15, 13, 12, 10, 8];
  let mapa = { for: 0, des: 1 };
  const trocado = R.distribuir(valores, mapa, 1, 'for');
  assert.deepEqual(trocado, { for: 1, des: 0 });
  assert.deepEqual(mapa, { for: 0, des: 1 });
  mapa = R.distribuir(valores, mapa, 0, 'con');
  assert.deepEqual(mapa, { des: 1, con: 0 });
  assert.equal(R.validarDistribuicao(valores, mapa), false);
  assert.throws(() => R.valoresDistribuidos(valores, mapa));
  mapa = { for: 0, des: 1, con: 2, int: 3, sab: 4, car: 5 };
  assert.deepEqual(R.valoresDistribuidos(valores, mapa), { for: 15, des: 15, con: 13, int: 12, sab: 10, car: 8 });
  assert.equal(R.validarDistribuicao(valores, { ...mapa, des: 0 }), false);
  assert.throws(() => R.distribuir(valores, {}, 6, 'for'));
});

test('compra limita 27 pontos e valores 8–15, preservando o mapa original', () => {
  const atributos = { ...base(), for: 15, des: 15, con: 15 };
  assert.equal(R.custoPontos(atributos), 27);
  assert.throws(() => R.alterarPonto(atributos, 'int', 1));
  assert.throws(() => R.alterarPonto(atributos, 'for', 1));
  assert.throws(() => R.alterarPonto(atributos, 'int', -1));
  const novo = R.alterarPonto(atributos, 'for', -1);
  assert.equal(R.custoPontos(novo), 25);
  assert.equal(atributos.for, 15);
  assert.equal(R.custoPontos(R.alterarPonto(novo, 'int', 1)), 26);
});

test('PV multiclasse só maximiza o primeiro nível de personagem', () => {
  const banco = { classes: { Guerreiro: { dadoVida: 10 }, Mago: { dadoVida: 6 } } };
  const classes = [{ classe: 'Guerreiro', nivel: 2 }, { classe: 'Mago', nivel: 1 }];
  assert.deepEqual(R.ganhosPendentes(classes, banco, { 'Guerreiro-2': 7 }), [
    { chave: 'Guerreiro-1', classe: 'Guerreiro', nivel: 1, dado: 10, inicial: true, valor: 10 },
    { chave: 'Guerreiro-2', classe: 'Guerreiro', nivel: 2, dado: 10, inicial: false, valor: 7 },
    { chave: 'Mago-1', classe: 'Mago', nivel: 1, dado: 6, inicial: false, valor: null },
  ]);
  assert.equal(R.ganhoPV(10, 'media'), 6);
  assert.equal(R.ganhoPV(6, 'rolagem', faces => faces), 6);
  assert.throws(() => R.ganhoPV(6, 'rolagem', () => 0));
});

test('edição de PV aceita absolutos e sinais, rejeita sintaxe e limites inválidos', () => {
  assert.equal(R.interpretarPV('-2', 33, 33), 31);
  assert.equal(R.interpretarPV('+2', 31, 33), 33);
  assert.equal(R.interpretarPV(' 7 ', 33, 33), 7);
  assert.equal(R.interpretarPV('0', 33, 33), 0);
  assert.equal(R.interpretarPV('+10', 0, 1000000), 10);
  for (const entrada of ['', '1.5', '1e2', '2 dano', '--2', '+ 2', 'Infinity', '34', '-34']) {
    assert.throws(() => R.interpretarPV(entrada, 33, 33), entrada);
  }
  assert.throws(() => R.interpretarPV('+1', 1000000, 1000000));
});

test('riqueza usa d4 e multiplicador próprios de cada classe', () => {
  let chamadas = 0;
  const rolar = faces => { assert.equal(faces, 4); chamadas++; return 3; };
  assert.deepEqual(R.rolarRiqueza([5, 10], rolar), { dados: [3, 3, 3, 3, 3], total: 150 });
  assert.equal(chamadas, 5);
  assert.deepEqual(R.rolarRiqueza([5, 1], () => 2), { dados: [2, 2, 2, 2, 2], total: 10 });
  assert.throws(() => R.rolarRiqueza([5, 10], () => 5));
});
