const assert = require('node:assert/strict');
const { once } = require('node:events');
const fs = require('node:fs/promises');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { test } = require('node:test');
const { criarServidor } = require('../scripts/servidor.cjs');

// net preserva o request-target: clientes URL podem normalizar ".." antes do envio.
async function requisitar(porta, alvo, metodo = 'GET') {
  const socket = net.createConnection({ host: '127.0.0.1', port: porta });
  socket.setTimeout(5000, () => socket.destroy(new Error('Tempo de resposta excedido')));
  const partes = [];
  socket.on('data', parte => partes.push(parte));
  await once(socket, 'connect');
  socket.write(`${metodo} ${alvo} HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n`);
  await once(socket, 'close');
  const resposta = Buffer.concat(partes).toString('utf8');
  const [cabecalho, ...corpo] = resposta.split('\r\n\r\n');
  return {
    status: Number(cabecalho.split(' ')[1]),
    cabecalho: cabecalho.toLowerCase(),
    corpo: corpo.join('\r\n\r\n'),
    resposta,
  };
}

test('servidor local entrega apenas os recursos públicos', async t => {
  const raiz = await fs.mkdtemp(path.join(os.tmpdir(), 'forja-servidor-'));
  t.after(() => fs.rm(raiz, { recursive: true, force: true }));
  await fs.mkdir(path.join(raiz, 'js'));
  await fs.mkdir(path.join(raiz, 'dados'));
  const recursos = {
    'index.html': '<!doctype html><title>Forja ç</title>',
    'style.css': 'body { color: red; }',
    'app-shell.css': 'main { display: grid; }',
    'app.js': 'window.app = true;',
    'banco_phb.js': 'window.banco = [];',
    'talentos_phb.js': 'window.talentos = [];',
    'js/interface.js': 'window.interface = true;',
    'dados/opcoes.js': 'window.opcoes = [];',
  };
  for (const [arquivo, conteudo] of Object.entries(recursos)) {
    await fs.writeFile(path.join(raiz, arquivo), conteudo);
  }
  for (const arquivo of ['.env', '.git/config', 'node_modules/a.js', 'docs/a.js', 'tests/a.js', 'scripts/a.js', 'js/.oculto.js']) {
    await fs.mkdir(path.dirname(path.join(raiz, arquivo)), { recursive: true });
    await fs.writeFile(path.join(raiz, arquivo), 'SEGREDO');
  }
  const servidor = criarServidor({ raiz });
  t.after(() => new Promise(resolve => servidor.close(resolve)));
  servidor.listen(0, '127.0.0.1');
  await once(servidor, 'listening');
  const porta = servidor.address().port;

  await t.test('GET, MIME, UTF-8 e querystrings', async () => {
    for (const [arquivo, conteudo] of Object.entries(recursos)) {
      const resposta = await requisitar(porta, `/${arquivo}?v=1&outro=%ZZ`);
      assert.equal(resposta.status, 200, arquivo);
      assert.equal(resposta.corpo, conteudo);
      const tipo = arquivo.endsWith('.html') ? 'text/html' : arquivo.endsWith('.css') ? 'text/css' : 'text/javascript';
      assert.ok(resposta.cabecalho.includes(`content-type: ${tipo}; charset=utf-8`));
      assert.ok(resposta.cabecalho.includes(`content-length: ${Buffer.byteLength(conteudo)}`));
    }
    assert.equal((await requisitar(porta, '/')).corpo, recursos['index.html']);
    assert.equal((await requisitar(porta, '/%69ndex.html')).status, 200);
  });

  await t.test('HEAD retorna os cabeçalhos e nenhum corpo', async () => {
    const resposta = await requisitar(porta, '/index.html?v=2', 'HEAD');
    assert.equal(resposta.status, 200);
    assert.equal(resposta.corpo, '');
    assert.ok(resposta.cabecalho.includes(`content-length: ${Buffer.byteLength(recursos['index.html'])}`));
    const ausente = await requisitar(porta, '/js/ausente.js', 'HEAD');
    assert.equal(ausente.status, 404);
    assert.equal(ausente.corpo, '');
  });

  await t.test('arquivos ausentes e diretórios não geram listagem', async () => {
    assert.equal((await requisitar(porta, '/js/ausente.js')).status, 404);
    await fs.mkdir(path.join(raiz, 'dados/diretorio.js'));
    assert.equal((await requisitar(porta, '/dados/diretorio.js')).status, 404);
    for (const alvo of ['/js', '/js/', '/dados/', '/docs/', '/package.json']) {
      assert.equal((await requisitar(porta, alvo)).status, 403, alvo);
    }
  });

  await t.test('bloqueia traversal bruto/codificado, ocultos, barras Windows e ADS', async () => {
    for (const alvo of [
      '/../index.html', '/js/../app.js', '/%2e%2e/index.html', '/js/%2e%2e/app.js',
      '/%2e%2e%2findex.html', '/js%2f..%2fapp.js', '/js/%252e%252e/app.js',
      '/.env', '/.git/config', '/%2eenv', '/node_modules/a.js', '/docs/a.js',
      '/tests/a.js', '/scripts/a.js', '/js/.oculto.js', '/js/%2eoculto.js',
      '/js\\..\\app.js', '/js%5c..%5capp.js', '/C:/index.html', '/index.html:$DATA',
      '/index.html%3a$DATA', '//index.html', '/js/interface.js/extra',
    ]) {
      const resposta = await requisitar(porta, alvo);
      assert.equal(resposta.status, 403, alvo);
      assert.ok(!resposta.resposta.includes(raiz), alvo);
      assert.ok(!resposta.resposta.includes('SEGREDO'), alvo);
    }
  });

  await t.test('rejeita escapes inválidos, NUL e request-target inválido', async () => {
    for (const alvo of ['/index.html%', '/%GG', '/%E0%A4%A', '/%00', '/index.html\0', 'http://localhost/index.html']) {
      const resposta = await requisitar(porta, alvo);
      assert.equal(resposta.status, 400, alvo);
      assert.ok(!resposta.resposta.includes(raiz));
    }
  });

  await t.test('métodos diferentes de GET/HEAD recebem 405 e Allow', async () => {
    for (const metodo of ['POST', 'PUT', 'DELETE', 'OPTIONS']) {
      const resposta = await requisitar(porta, '/index.html', metodo);
      assert.equal(resposta.status, 405);
      assert.ok(resposta.cabecalho.includes('allow: get, head'));
    }
  });

  await t.test('symlink de arquivo e diretório não escapa da raiz', async t => {
    const externa = await fs.mkdtemp(path.join(os.tmpdir(), 'forja-externa-'));
    t.after(() => fs.rm(externa, { recursive: true, force: true }));
    await fs.writeFile(path.join(externa, 'segredo.js'), 'SEGREDO EXTERNO');
    await t.test('symlink de arquivo externo', async t => {
      try {
        await fs.symlink(path.join(externa, 'segredo.js'), path.join(raiz, 'js/ligacao.js'), 'file');
      } catch (erro) {
        if (process.platform === 'win32' && ['EPERM', 'EACCES'].includes(erro.code)) {
          t.skip('Windows exige permissão/Developer Mode para symlink de arquivo.');
          return;
        }
        throw erro;
      }
      assert.equal((await requisitar(porta, '/js/ligacao.js')).status, 403);
    });
    // Junctions permitem testar a fuga de diretório mesmo sem privilégio de symlink.
    await fs.rm(path.join(raiz, 'dados'), { recursive: true });
    try {
      await fs.symlink(path.join(raiz, 'docs'), path.join(raiz, 'dados'), process.platform === 'win32' ? 'junction' : 'dir');
    } catch (erro) {
      if (process.platform === 'win32' && ['EPERM', 'EACCES'].includes(erro.code)) {
        t.skip('Windows não concedeu permissão para symlink/junction.');
        return;
      }
      throw erro;
    }
    assert.equal((await requisitar(porta, '/dados/a.js')).status, 403);
    await fs.unlink(path.join(raiz, 'dados'));
    try {
      await fs.symlink(externa, path.join(raiz, 'dados'), process.platform === 'win32' ? 'junction' : 'dir');
    } catch (erro) {
      if (process.platform === 'win32' && ['EPERM', 'EACCES'].includes(erro.code)) {
        t.skip('Windows não concedeu permissão para symlink/junction.');
        return;
      }
      throw erro;
    }
    assert.equal((await requisitar(porta, '/dados/segredo.js')).status, 403);
  });

  await t.test('CLI explica conflito de porta sem expor caminhos internos', async () => {
    const filho = spawn(process.execPath, [path.resolve(__dirname, '../scripts/servidor.cjs'), String(porta)], { windowsHide: true });
    let saida = '';
    filho.stdout.on('data', parte => { saida += parte; });
    filho.stderr.on('data', parte => { saida += parte; });
    const [codigo] = await once(filho, 'exit');
    assert.equal(codigo, 1);
    assert.match(saida, /porta.*em uso/i);
    assert.ok(!saida.includes(__dirname));
    assert.ok(!saida.includes('Error:'));
  });
});

test('raiz inválida falha cedo com mensagem sem caminhos internos', async t => {
  const temporaria = await fs.mkdtemp(path.join(os.tmpdir(), 'forja-raiz-'));
  t.after(() => fs.rm(temporaria, { recursive: true, force: true }));
  const arquivo = path.join(temporaria, 'arquivo');
  await fs.writeFile(arquivo, 'x');
  for (const raiz of [path.join(temporaria, 'ausente'), arquivo, 42]) {
    assert.throws(() => criarServidor({ raiz }), erro => /raiz/i.test(erro.message) && !erro.message.includes(temporaria));
  }
});
