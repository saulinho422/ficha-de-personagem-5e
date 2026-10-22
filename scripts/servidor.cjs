const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PUBLICOS = new Set([
  'index.html', 'style.css', 'app-shell.css', 'app.js',
  'banco_phb.js', 'talentos_phb.js',
]);
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};
const MENSAGENS = {
  400: 'Requisição inválida.',
  403: 'Acesso não permitido.',
  404: 'Recurso não encontrado.',
  405: 'Método não permitido.',
  500: 'Não foi possível carregar o recurso.',
};

function responderErro(req, res, status) {
  const corpo = Buffer.from(MENSAGENS[status]);
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': corpo.length,
    'X-Content-Type-Options': 'nosniff',
    ...(status === 405 ? { Allow: 'GET, HEAD' } : {}),
  });
  res.end(req.method === 'HEAD' ? undefined : corpo);
}

function recursoPublico(alvo) {
  // Não usar new URL(): a normalização apagaria segmentos ".." antes da validação.
  const bruto = alvo.split('?')[0];
  if (!bruto.startsWith('/') || bruto.includes('#')) return { erro: 400 };
  let caminho;
  try {
    caminho = decodeURIComponent(bruto);
  } catch {
    return { erro: 400 };
  }
  if ([...caminho].some(caractere => caractere.codePointAt(0) < 32 || caractere.codePointAt(0) === 127)) {
    return { erro: 400 };
  }
  const segmentos = caminho.split('/').slice(1);
  if (/[\\:%]/.test(caminho) || segmentos.some(segmento => segmento.startsWith('.'))) {
    return { erro: 403 };
  }
  if (caminho === '/') return { arquivo: 'index.html' };
  const arquivo = caminho.slice(1);
  if (!PUBLICOS.has(arquivo) && !/^(js|dados)\/[a-zA-Z0-9_-]+\.js$/.test(arquivo)) {
    return { erro: 403 };
  }
  return { arquivo };
}

function criarServidor({ raiz = path.resolve(__dirname, '..') } = {}) {
  let raizReal;
  try {
    raizReal = fs.realpathSync(raiz);
    if (!fs.statSync(raizReal).isDirectory()) throw new Error();
  } catch {
    throw new Error('A raiz do servidor deve ser um diretório existente.');
  }

  async function atender(req, res) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      responderErro(req, res, 405);
      return;
    }
    const recurso = recursoPublico(req.url);
    if (recurso.erro) {
      responderErro(req, res, recurso.erro);
      return;
    }
    try {
      const arquivoReal = await fs.promises.realpath(path.join(raizReal, recurso.arquivo));
      const relativo = path.relative(raizReal, arquivoReal);
      // realpath resolve também links em diretórios intermediários e junctions Windows.
      if (relativo === '..' || relativo.startsWith(`..${path.sep}`) || path.isAbsolute(relativo)) {
        responderErro(req, res, 403);
        return;
      }
      // Um alias público também não pode revelar um arquivo privado dentro da raiz.
      if (recursoPublico(`/${relativo.split(path.sep).join('/')}`).erro) {
        responderErro(req, res, 403);
        return;
      }
      if (!(await fs.promises.stat(arquivoReal)).isFile()) {
        responderErro(req, res, 404);
        return;
      }
      const corpo = await fs.promises.readFile(arquivoReal);
      res.writeHead(200, {
        'Content-Type': TIPOS[path.extname(recurso.arquivo)],
        'Content-Length': corpo.length,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache',
      });
      res.end(req.method === 'HEAD' ? undefined : corpo);
    } catch (erro) {
      const status = { ENOENT: 404, ENOTDIR: 404, EACCES: 403, EPERM: 403, ELOOP: 403 }[erro.code] || 500;
      responderErro(req, res, status);
    }
  }

  const servidor = http.createServer((req, res) => {
    atender(req, res).catch(() => {
      if (!res.headersSent) responderErro(req, res, 500);
      else res.destroy();
    });
  });
  servidor.on('clientError', (_erro, socket) => {
    if (socket.writable) socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\nContent-Length: 0\r\n\r\n');
  });
  return servidor;
}

function executar() {
  const argumento = process.argv[2] ?? '8765';
  if (process.argv.length > 3 || !/^\d+$/.test(argumento) || Number(argumento) > 65535) {
    console.error('Informe uma porta entre 0 e 65535: node scripts/servidor.cjs [porta]');
    process.exitCode = 1;
    return;
  }
  let servidor;
  try {
    servidor = criarServidor();
  } catch (erro) {
    console.error(erro.message);
    process.exitCode = 1;
    return;
  }
  servidor.on('error', erro => {
    console.error(erro.code === 'EADDRINUSE'
      ? `A porta ${argumento} já está em uso. Escolha outra porta.`
      : 'Não foi possível iniciar o servidor local.');
    process.exitCode = 1;
  });
  servidor.listen(Number(argumento), '127.0.0.1', () => {
    console.log(`Forja disponível em http://127.0.0.1:${servidor.address().port}`);
  });
  let encerrando = false;
  function encerrar() {
    if (encerrando) return;
    encerrando = true;
    servidor.close();
    servidor.closeAllConnections();
  }
  process.once('SIGINT', encerrar);
  process.once('SIGTERM', encerrar);
}

module.exports = { criarServidor };
if (require.main === module) executar();
