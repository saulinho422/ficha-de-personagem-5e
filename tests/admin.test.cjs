const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const ForjaCatalogo = require('../js/catalogo.js');
const ForjaPublicador = require('../js/admin-publicar.js');

test('mesclarFontesCustom combina fonte global e local, preserva posições e respeita removidos', () => {
  const normPadrao = ForjaCatalogo.normalizarPosicaoImagem({ x: 140, y: -12, zoom: 5 });
  assert.deepEqual(normPadrao, { x: 100, y: 0, zoom: 2.5 });
  assert.deepEqual(ForjaCatalogo.normalizarPosicaoImagem(null), { x: 50, y: 50, zoom: 1 });
  assert.deepEqual(ForjaCatalogo.estiloImagem({ x: 30, y: 10, zoom: 1.4 }), {
    objectPosition: '30% 10%',
    transformOrigin: '30% 10%',
    transform: 'scale(1.4)',
  });
  assert.deepEqual(ForjaCatalogo.estiloImagem({ x: 50, y: 50, zoom: 1 }), {
    objectPosition: '50% 50%',
    transformOrigin: '50% 50%',
    transform: '',
  });

  const globalCustom = {
    imagens: { racas: { Elfo: 'https://global/elfo.webp', Anao: 'https://global/anao.webp' }, subracas: {}, classes: {}, subclasses: {} },
    posicoesImagens: { racas: { Elfo: { x: 25, y: 10, zoom: 1.8 }, Anao: { x: 50, y: 15, zoom: 1.2 } }, subracas: {}, classes: {}, subclasses: {} },
    racas: { Aasimar: { descricao: 'Global', imagem: 'https://global/aasimar.webp', posicaoImagem: { x: 50, y: 20, zoom: 1.1 } }, Golias: { descricao: 'Montanha' } },
    subracas: {},
    classes: { Artifice: { dadoVida: 8 } },
    subclasses: {},
    talentos: { SorteExtra: { beneficios: 'Global' } },
    antecedentes: {},
  };
  const localCustom = {
    imagens: { racas: { Elfo: 'https://local/elfo.webp' } },
    posicoesImagens: { racas: { Elfo: { x: 50, y: 50, zoom: 1 } } },
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
  assert.deepEqual(res.posicoesImagens.racas.Elfo, { x: 50, y: 50, zoom: 1 });
  assert.equal(res.imagens.racas.Anao, undefined);
  assert.equal(res.posicoesImagens.racas.Anao, undefined);
  assert.equal(res.racas.Aasimar.descricao, 'Global');
  assert.equal(res.racas.Tabaxi.descricao, 'Felino');
  assert.equal(res.racas.Golias, undefined);
  assert.equal(res.talentos.SorteExtra, undefined);
});

test('ForjaPublicador normaliza repo, sanitiza estado/posições e gera módulo JS válido', () => {
  assert.equal(ForjaPublicador.resolverBranch(''), 'main');
  assert.equal(ForjaPublicador.resolverBranch('todas'), 'main');
  assert.equal(ForjaPublicador.resolverBranch('codex/mobile-app-redesign'), 'main');
  assert.equal(ForjaPublicador.resolverBranch('codex/mega-atualizacao-ficha-5e'), 'main');
  assert.equal(ForjaPublicador.normalizarRepo('https://github.com/saulinho422/ficha-de-personagem-5e.git'), 'saulinho422/ficha-de-personagem-5e');
  assert.throws(() => ForjaPublicador.normalizarRepo('invalido'), /usuario\/repositorio/);
  const sujo = {
    imagens: { racas: { Elfo: 'https://cdn/elfo.webp', Anao: 'https://cdn/anao.webp', Vazio: '' }, subracas: {}, classes: {}, subclasses: {} },
    posicoesImagens: {
      racas: {
        Elfo: { x: 48, y: 5, zoom: 1.35 },
        Anao: { x: 50, y: 50, zoom: 1 },
        Orfa: { x: 50, y: 0, zoom: 1.5 },
      },
      subracas: {},
      classes: {},
      subclasses: {},
    },
    racas: { Aasimar: { descricao: 'Luz' } },
    removidos: { racas: ['Golias'], imagens: { racas: ['Elfo'] } },
  };
  const limpo = ForjaPublicador.sanitizarEstado(sujo);
  assert.equal(limpo.removidos, undefined);
  assert.equal(limpo.imagens.racas.Vazio, undefined);
  assert.equal(limpo.imagens.racas.Elfo, 'https://cdn/elfo.webp');
  assert.deepEqual(limpo.posicoesImagens.racas.Elfo, { x: 48, y: 5, zoom: 1.35 });
  assert.equal(limpo.posicoesImagens.racas.Anao, undefined);
  assert.equal(limpo.posicoesImagens.racas.Orfa, undefined);
  const codigo = ForjaPublicador.gerarCodigoModulo(sujo);
  const ctx = {};
  ctx.globalThis = ctx;
  vm.runInNewContext(codigo, ctx);
  assert.deepEqual(JSON.parse(JSON.stringify(ctx.ForjaCustomCatalogo)), limpo);
});
