const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const ForjaCatalogo = require('../js/catalogo.js');
const ForjaPublicador = require('../js/admin-publicar.js');

test('mesclarFontesCustom combina fonte global e local e respeita removidos', () => {
  const globalCustom = {
    imagens: { racas: { Elfo: 'https://global/elfo.webp', Anao: 'https://global/anao.webp' }, subracas: {}, classes: {}, subclasses: {} },
    racas: { Aasimar: { descricao: 'Global' }, Golias: { descricao: 'Montanha' } },
    subracas: {},
    classes: { Artifice: { dadoVida: 8 } },
    subclasses: {},
    talentos: { SorteExtra: { beneficios: 'Global' } },
    antecedentes: {},
  };
  const localCustom = {
    imagens: { racas: { Elfo: 'https://local/elfo.webp' } },
    racas: { Tabaxi: { descricao: 'Felino' } },
    removidos: {
      imagens: { racas: ['Anao'] },
      racas: ['Golias'],
      subracas: [],
      classes: [],
      subclasses: [],
      talentos: ['SorteExtra'],
      antecedentes: [],
    },
  };
  const res = ForjaCatalogo.mesclarFontesCustom(globalCustom, localCustom);
  assert.equal(res.imagens.racas.Elfo, 'https://local/elfo.webp');
  assert.equal(res.imagens.racas.Anao, undefined);
  assert.equal(res.racas.Aasimar.descricao, 'Global');
  assert.equal(res.racas.Tabaxi.descricao, 'Felino');
  assert.equal(res.racas.Golias, undefined);
  assert.equal(res.talentos.SorteExtra, undefined);
});

test('ForjaPublicador normaliza repo, sanitiza estado e gera módulo JS válido', () => {
  assert.equal(ForjaPublicador.normalizarRepo('https://github.com/saulinho422/ficha-de-personagem-5e.git'), 'saulinho422/ficha-de-personagem-5e');
  assert.throws(() => ForjaPublicador.normalizarRepo('invalido'), /usuario\/repositorio/);
  const sujo = {
    imagens: { racas: { Elfo: 'https://cdn/elfo.webp', Vazio: '' }, subracas: {}, classes: {}, subclasses: {} },
    racas: { Aasimar: { descricao: 'Luz' } },
    removidos: { racas: ['Golias'], imagens: { racas: ['Elfo'] } },
  };
  const limpo = ForjaPublicador.sanitizarEstado(sujo);
  assert.equal(limpo.removidos, undefined);
  assert.equal(limpo.imagens.racas.Vazio, undefined);
  assert.equal(limpo.imagens.racas.Elfo, 'https://cdn/elfo.webp');
  const codigo = ForjaPublicador.gerarCodigoModulo(sujo);
  const ctx = {};
  ctx.globalThis = ctx;
  vm.runInNewContext(codigo, ctx);
  assert.deepEqual(JSON.parse(JSON.stringify(ctx.ForjaCustomCatalogo)), limpo);
});
