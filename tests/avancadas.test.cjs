const { test } = require('node:test');
const assert = require('node:assert/strict');
const { F, E, banco, magias, ficha, Storage } = require('./apoio.cjs');
const catalogo = require('../js/catalogo.js');
const aventura = require('../dados/aventura.js');
const opcoes = require('../dados/opcoes.js');

test('aventura contém d100 completo, bens, arreios e serviços', () => {
    assert.equal(aventura.bugigangas.length, 100);
    assert.equal(new Set(aventura.bugigangas).size, 100);
    assert.equal(aventura.bens.length, 23);
    assert.equal(aventura.arreios.length, 9);
    assert.equal(aventura.servicos.length, 7);
});

test('catálogo inclui bens de comércio e arreios', () => {
    const todos = catalogo.itens(banco);
    assert.ok(todos.some(x => x.tipo === 'bens' && x.nome === 'Trigo'));
    assert.ok(todos.some(x => x.tipo === 'arreios' && x.nome === 'Alforje'));
});

test('capacidades de montaria usam os valores conferidos', () => {
    const porNome = Object.fromEntries(opcoes.veiculos.map(x => [x.nome, x]));
    assert.equal(porNome['Cavalo de montaria'].capacidade, 220);
    assert.equal(porNome.Mastim.capacidade, 100);
    assert.equal(porNome.Pônei.capacidade, 115);
    assert.equal(porNome['Barco a remo'].capacidade, 45);
});

test('disciplinas elementais são 17 opções únicas', () => {
    assert.equal(opcoes.disciplinas.length, 17);
    assert.equal(new Set(opcoes.disciplinas).size, 17);
});

test('descanso curto encerra fúria e restaura Magia de Assinatura', () => {
    const c = ficha({ classe: 'Mago', nivel: 20 });
    c.detalhes.sessao.furia = true;
    c.detalhes.magias.gastos['assinatura:magia-bola-de-fogo'] = 1;
    const out = F.descansar({ ...c, recursos: { pvAtual: 20, pvTemporarios: 0 } }, banco, 'curto', {}, () => 1);
    assert.equal(out.detalhes.sessao.furia, false);
    assert.equal(out.detalhes.magias.gastos['assinatura:magia-bola-de-fogo'], 0);
});

test('descanso longo remove espaços criados por feitiçaria', () => {
    const c = ficha({ classe: 'Feiticeiro', nivel: 5 });
    c.detalhes.magias.espacosCriados = { 2: 1 };
    const out = F.descansar({ ...c, recursos: { pvAtual: 10, pvTemporarios: 0 } }, banco, 'longo');
    assert.deepEqual(out.detalhes.magias.espacosCriados, {});
});

test('estilos ativos combinam todas as classes sem duplicar lógica de interface', () => {
    const c = ficha(); c.detalhes.escolhas['estilos-Guerreiro'] = ['Defesa']; c.detalhes.escolhas['estilos-Paladino'] = ['Duelismo'];
    assert.deepEqual(F.estilosAtivos(c), ['Defesa', 'Duelismo']);
});

test('equipamento sem proficiência produz pendência contextual', () => {
    const c = ficha();
    const armadura = { nome: 'Placas', subtipo: 'pesada' };
    assert.match(F.pendenciasEquipamento(c, banco, armadura, null)[0], /sem proficiência/);
});

test('Domínio de Magia e Magias de Assinatura aparecem nos níveis corretos', () => {
    const c18 = ficha({ classe: 'Mago', nivel: 18 });
    const ids18 = F.escolhasClasse(c18).map(x => x.id);
    assert.ok(ids18.includes('magoDominio1') && ids18.includes('magoDominio2'));
    assert.ok(!ids18.includes('magoAssinatura'));
    assert.ok(F.escolhasClasse(ficha({ classe: 'Mago', nivel: 20 })).some(x => x.id === 'magoAssinatura'));
});

test('truques escalam pelo nível total e Rajada Mística cria feixes', () => {
    const rajada = magias.find(x => x.nome === 'Rajada Mística');
    const escala = F.escalonamentoMagia(rajada, 11);
    assert.equal(escala.feixes, 3);
    assert.match(escala.nota, /3 feixes/);
});

test('magia de círculo maior conserva a orientação de escalonamento', () => {
    const magia = { nome: 'Teste', nivel: 1, descricao: '1d6', escalonamento: 'Mais 1d6 por círculo.' };
    assert.match(F.escalonamentoMagia(magia, 5, 3).nota, /3º/);
});

test('copiar magia de mago calcula 50 PO e duas horas por círculo', () => {
    const c = ficha({ classe: 'Mago', nivel: 5 });
    const magia = magias.find(x => x.nome === 'Armadura Arcana');
    const out = F.copiarMagiaMago(c, banco, magias, magia.id);
    assert.equal(out.custoPO, 50);
    assert.equal(out.horas, 2);
    assert.ok(out.detalhes.magias.selecoes.some(x => x.id === magia.id && x.grimorio));
});

test('magia gratuita do nível não cobra transcrição', () => {
    const c = ficha({ classe: 'Mago', nivel: 5 });
    const magia = magias.find(x => x.nome === 'Armadura Arcana');
    assert.equal(F.copiarMagiaMago(c, banco, magias, magia.id, { gratuita: true }).custoPO, 0);
});

test('validação rejeita perfil de regras adulterado', () => {
    assert.throws(() => E.validar(ficha({ ruleset: '2024' })), /Perfil de regras/);
});

test('validação rejeita IDs repetidos em características e ataques', () => {
    const traco = { id: 'x', nome: 'X', tipo: 'manual', descricao: 'x' };
    assert.throws(() => E.validar(ficha({ tracos: [traco, traco] })), /Características.*repetidos/);
    const ataque = { id: 'a', nomeArma: 'Adaga' };
    assert.throws(() => E.validar(ficha({ ataques: [ataque, ataque] })), /Ataques.*repetidos/);
});

test('validação rejeita item empunhado ausente do inventário', () => {
    const c = ficha(); c.detalhes.equipados.mao1 = 'fantasma';
    assert.throws(() => E.validar(c), /empunhado não existe/);
});

test('gravação válida mantém backup da revisão anterior', () => {
    const armazenamento = new Storage();
    const a = ficha({ nome: 'A' }), b = ficha({ nome: 'B' });
    E.salvar(armazenamento, a); E.salvar(armazenamento, b);
    assert.equal(JSON.parse(armazenamento.getItem(E.BACKUP)).nome, 'A');
});

test('Falar com Plantas está reconciliada como transmutação de 3º círculo', () => {
    const magia = magias.find(x => x.nome === 'Falar com Plantas');
    assert.equal(magia.nivel, 3);
    assert.equal(magia.escola, 'transmutação');
    assert.equal(magia.ritual, false);
});
