(function (raiz) {
  'use strict';

  const CHAVE_GH = 'forjaPersonagens.githubConfig.v1';
  const REPO_PADRAO = 'saulinho422/ficha-de-personagem-5e';
  const CAMINHO_ARQUIVO = 'dados/custom-catalogo.js';

  function lerConfigGitHub() {
    try {
      const lido = JSON.parse(raiz.localStorage?.getItem(CHAVE_GH) || '{}');
      return {
        repo: lido.repo || REPO_PADRAO,
        branch: lido.branch || 'main',
        token: lido.token || '',
      };
    } catch {
      return { repo: REPO_PADRAO, branch: 'main', token: '' };
    }
  }

  function salvarConfigGitHub(cfg) {
    raiz.localStorage?.setItem(CHAVE_GH, JSON.stringify(cfg));
  }

  function gerarCodigoModulo(estado) {
    const json = JSON.stringify(estado, null, 2);
    return [
      '(function (r, f) {',
      '  const d = f();',
      "  if (typeof module !== 'undefined' && module.exports) module.exports = d;",
      '  else r.ForjaCustomCatalogo = d;',
      '})(globalThis, function () {',
      "  'use strict';",
      '  return ' + json.replace(/\n/g, '\n  ') + ';',
      '});',
      '',
    ].join('\n');
  }

  function utf8ParaBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  async function obterShaAtual(repo, branch, token) {
    const url = `https://api.github.com/repos/${repo}/contents/${CAMINHO_ARQUIVO}?ref=${encodeURIComponent(branch)}`;
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Falha ao consultar repositório (${res.status}). Verifique o Token e o nome do repositório.`);
    const dados = await res.json();
    return dados.sha || null;
  }

  async function publicarNoGitHub(estado, { repo, branch, token }) {
    if (!token) throw new Error('Informe seu Token do GitHub (Personal Access Token) para publicar.');
    const conteudoJs = gerarCodigoModulo(estado);
    const base64 = utf8ParaBase64(conteudoJs);
    const branches = branch === 'todas' ? ['main', 'codex/mobile-app-redesign', 'codex/mega-atualizacao-ficha-5e'] : [branch];
    for (const br of branches) {
      const sha = await obterShaAtual(repo, br, token);
      const url = `https://api.github.com/repos/${repo}/contents/${CAMINHO_ARQUIVO}`;
      const body = {
        message: 'feat(catalogo): atualizar catalogo customizado e imagens via Painel Admin',
        content: base64,
        branch: br,
      };
      if (sha) body.sha = sha;
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const erro = await res.json().catch(() => ({}));
        throw new Error(erro.message || `Erro HTTP ${res.status} ao publicar na branch ${br}.`);
      }
    }
  }

  function baixarArquivoJs(estado) {
    const codigo = gerarCodigoModulo(estado);
    const url = URL.createObjectURL(new Blob([codigo], { type: 'application/javascript;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-catalogo.js';
    a.click();
    URL.revokeObjectURL(url);
  }

  function abrirModalPublicacao(obterEstado, avisar) {
    let dlg = document.getElementById('modal-publicar-github');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'modal-publicar-github';
      dlg.className = 'modal-admin-publicar';
      document.body.appendChild(dlg);
    }
    const cfg = lerConfigGitHub();
    dlg.innerHTML = `
      <form id="form-publicar-gh" class="card-admin-form" style="margin:0;border:0;">
        <h2>🌐 Publicar para Todos os Jogadores</h2>
        <p class="subtitulo-form">Salva todas as suas raças, classes, subclasses, talentos e imagens diretamente no repositório oficial (<code>dados/custom-catalogo.js</code>) para que apareçam para qualquer pessoa que abrir o site.</p>
        <label>Repositório no GitHub
          <input type="text" id="gh-repo" class="input-admin" value="${cfg.repo}" required>
        </label>
        <label>Branch de destino
          <select id="gh-branch" class="input-admin">
            <option value="todas" selected>Todas as branches (main + codex/*)</option>
            <option value="main">Apenas main</option>
          </select>
        </label>
        <label>Token do GitHub (Personal Access Token com permissão <code>repo</code> ou <code>contents:write</code>)
          <input type="password" id="gh-token" class="input-admin" value="${cfg.token}" placeholder="ghp_... ou github_pat_...">
        </label>
        <p class="subtitulo-form" style="margin:4px 0 0;font-size:12px;">🔒 O token fica salvo apenas no seu navegador para você publicar com 1 clique sempre que quiser. Se preferir não usar token, clique em <strong>Baixar custom-catalogo.js</strong> e substitua na pasta <code>dados/</code>.</p>
        <div class="acoes-form" style="justify-content:flex-end;margin-top:12px;">
          <button type="button" id="btn-baixar-js-global" class="btn-secundario-admin">📥 Baixar custom-catalogo.js</button>
          <button type="button" id="btn-fechar-gh" class="btn-secundario-admin">Cancelar</button>
          <button type="submit" id="btn-confirmar-gh" class="btn-primario-admin">🚀 Publicar no Site Agora</button>
        </div>
      </form>`;
    dlg.querySelector('#btn-fechar-gh').addEventListener('click', () => dlg.close());
    dlg.querySelector('#btn-baixar-js-global').addEventListener('click', () => {
      baixarArquivoJs(obterEstado());
      avisar('Arquivo custom-catalogo.js baixado! Coloque na pasta dados/ do projeto.');
    });
    dlg.querySelector('#form-publicar-gh').addEventListener('submit', async ev => {
      ev.preventDefault();
      const btn = dlg.querySelector('#btn-confirmar-gh');
      const novaCfg = {
        repo: dlg.querySelector('#gh-repo').value.trim(),
        branch: dlg.querySelector('#gh-branch').value,
        token: dlg.querySelector('#gh-token').value.trim(),
      };
      salvarConfigGitHub(novaCfg);
      btn.disabled = true;
      btn.textContent = '⏳ Publicando no GitHub...';
      try {
        await publicarNoGitHub(obterEstado(), novaCfg);
        dlg.close();
        avisar('Publicado com sucesso no GitHub! Em instantes estará visível para todos no site.');
      } catch (e) {
        avisar(e.message || 'Erro ao publicar no GitHub.', 'aviso');
      } finally {
        btn.disabled = false;
        btn.textContent = '🚀 Publicar no Site Agora';
      }
    });
    dlg.showModal?.();
  }

  raiz.ForjaPublicador = { gerarCodigoModulo, abrirModalPublicacao };
})(globalThis);
