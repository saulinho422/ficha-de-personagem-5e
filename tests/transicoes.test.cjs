const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const codigo = fs.readFileSync(path.join(__dirname, '../js/transicoes.js'), 'utf8');

function preparar(t, reduzido = false) {
    const dom = new JSDOM('<main><input value="Lia"><button>Jogar</button></main>', {
        url: 'file:///forja/index.html', runScripts: 'outside-only',
    });
    t.after(() => dom.window.close());
    const w = dom.window, alvo = w.document.querySelector('main');
    const media = new w.EventTarget();
    media.matches = reduzido;
    w.matchMedia = () => media;
    const animacoes = [];
    alvo.animate = (quadros, opcoes) => {
        let concluir, rejeitar;
        const animacao = {
            quadros, opcoes, cancelamentos: 0,
            finished: new Promise((resolve, reject) => { concluir = resolve; rejeitar = reject; }),
            concluir: () => concluir(),
            cancel() { this.cancelamentos++; rejeitar(new Error('cancelada')); },
        };
        animacoes.push(animacao);
        return animacao;
    };
    const api = w.eval(codigo + '\nForjaTransicoes;');
    return { w, alvo, media, animacoes, api };
}

test('slide preserva DOM, foco, listeners e histórico inclusive em file', async t => {
    const { w, alvo, api, animacoes } = preparar(t);
    const entrada = alvo.querySelector('input'), botao = alvo.querySelector('button');
    entrada.focus();
    let cliques = 0;
    botao.addEventListener('click', () => cliques++);
    const historico = JSON.stringify(w.history.state), url = w.location.href;
    const fim = api.mostrar(alvo, { direcao: -1 });
    assert.equal(animacoes[0].quadros[0].transform, 'translateX(-20px)');
    assert.equal(animacoes[0].opcoes.duration, 200);
    assert.equal(w.document.activeElement, entrada);
    assert.equal(entrada.value, 'Lia');
    animacoes[0].concluir();
    assert.equal(await fim, true);
    assert.equal(animacoes[0].cancelamentos, 1);
    botao.click();
    assert.equal(cliques, 1);
    assert.equal(alvo.getAttribute('style'), null);
    assert.equal(w.location.href, url);
    assert.equal(JSON.stringify(w.history.state), historico);
});

test('cliques rápidos cancelam animação anterior sem rejeição e limpar é repetível', async t => {
    const { alvo, api, animacoes } = preparar(t);
    const primeiro = api.mostrar(alvo), segundo = api.mostrar(alvo);
    assert.equal(await primeiro, false);
    assert.equal(animacoes[0].cancelamentos, 1);
    api.limpar();
    api.limpar();
    assert.equal(await segundo, false);
    assert.equal(animacoes[1].cancelamentos, 1);
    const terceiro = api.mostrar(alvo);
    animacoes[2].concluir();
    assert.equal(await terceiro, true);
});

test('reduzir movimento cancela slide ativo e impede novas animações', async t => {
    const { w, alvo, api, media, animacoes } = preparar(t);
    const fim = api.mostrar(alvo);
    media.matches = true;
    media.dispatchEvent(new w.Event('change'));
    assert.equal(await fim, false);
    assert.equal(await api.mostrar(alvo), false);
    assert.equal(animacoes.length, 1);
});

test('impressão e saída limpam animação', async t => {
    const { w, alvo, api } = preparar(t);
    for (const evento of ['beforeprint', 'pagehide']) {
        const fim = api.mostrar(alvo);
        w.dispatchEvent(new w.Event(evento));
        assert.equal(await fim, false);
    }
});

test('ausência de animate, falha da API, alvos ausentes e ocultos têm fallback', async t => {
    const { alvo, api, animacoes } = preparar(t);
    assert.equal(await api.mostrar(null), false);
    alvo.hidden = true;
    assert.equal(await api.mostrar(alvo), false);
    alvo.hidden = false;
    const animate = alvo.animate;
    delete alvo.animate;
    assert.equal(await api.mostrar(alvo), false);
    alvo.animate = () => { throw new Error('indisponível'); };
    assert.equal(await api.mostrar(alvo), false);
    alvo.animate = animate;
    alvo.remove();
    assert.equal(await api.mostrar(alvo), false);
    assert.equal(animacoes.length, 0);
});
