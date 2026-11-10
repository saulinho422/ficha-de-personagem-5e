(function (raiz) {
  'use strict';

  const DIALOGO_ID = 'modal-posicionar-imagem';

  const escaparHtml = v => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

  function normalizarPos(pos) {
    if (raiz.ForjaCatalogo?.normalizarPosicaoImagem) return raiz.ForjaCatalogo.normalizarPosicaoImagem(pos);
    const p = pos && typeof pos === 'object' ? pos : {};
    const lim = (v, min, max, def) => {
      const n = Number(v);
      return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : def;
    };
    return {
      x: Math.round(lim(p.x, 0, 100, 50)),
      y: Math.round(lim(p.y, 0, 100, 50)),
      zoom: Math.round(lim(p.zoom, 1, 2.5, 1) * 100) / 100,
    };
  }

  function estiloParaPos(pos) {
    if (raiz.ForjaCatalogo?.estiloImagem) return raiz.ForjaCatalogo.estiloImagem(pos);
    const p = normalizarPos(pos);
    return {
      objectPosition: `${p.x}% ${p.y}%`,
      transformOrigin: `${p.x}% ${p.y}%`,
      transform: p.zoom > 1 ? `scale(${p.zoom})` : '',
    };
  }

  function comprimirParaWebP(arquivo) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onerror = () => reject(new Error('Erro de leitura'));
      leitor.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Imagem inválida'));
        img.onload = () => {
          const esc = Math.min(1, 800 / Math.max(img.width || 1, img.height || 1));
          const cv = document.createElement('canvas');
          cv.width = Math.max(1, Math.round(img.width * esc));
          cv.height = Math.max(1, Math.round(img.height * esc));
          cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
          resolve(cv.toDataURL('image/webp', 0.84));
        };
        img.src = String(leitor.result);
      };
      leitor.readAsDataURL(arquivo);
    });
  }

  function criarOuObterDialogo() {
    let dlg = document.getElementById(DIALOGO_ID);
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = DIALOGO_ID;
      dlg.className = 'modal-admin-publicar modal-admin-posicao';
      dlg.setAttribute('aria-labelledby', 'titulo-posicionar-imagem');
      dlg.addEventListener('click', ev => { if (ev.target === dlg) dlg.close(); });
      document.body.appendChild(dlg);
    }
    return dlg;
  }

  function templateDialogo({ titulo, rotuloCategoria, nome, url, pos }) {
    const rotuloEsc = escaparHtml(rotuloCategoria || 'Origem');
    const nomeEsc = escaparHtml(nome || 'Pré-visualização');
    const urlEsc = escaparHtml(url);
    const zoomPct = Math.round(pos.zoom * 100);
    return `
      <form id="form-posicionar-imagem" class="card-admin-form modal-posicao-form">
        <div class="modal-posicao-topo">
          <div>
            <h2 id="titulo-posicionar-imagem">🎯 ${escaparHtml(titulo)}</h2>
            <p class="subtitulo-form">Arraste a imagem ou use os controles para escolher o ponto de foco nos cards.</p>
          </div>
        </div>
        <div class="palco-posicao-img" id="palco-posicao-img">
          <span class="tag-categoria-card">${rotuloEsc}</span>
          <img class="img-posicao-palco" src="${urlEsc}" alt="${nomeEsc}" draggable="false">
          <div class="palco-posicao-guia" aria-hidden="true"></div>
          <span class="palco-posicao-dica">Arraste para posicionar • Roda do mouse ajusta zoom</span>
        </div>
        <p id="posicao-img-erro" class="posicao-erro" hidden>Não foi possível carregar esta URL para prévia. Verifique se o link permite visualização ou ajuste os controles abaixo.</p>
        <div class="posicao-presets" role="group" aria-label="Atalhos de enquadramento">
          <button type="button" class="btn-secundario-admin btn-preset-pos" data-x="50" data-y="0" data-zoom="1">⬆️ Topo / Rosto</button>
          <button type="button" class="btn-secundario-admin btn-preset-pos" data-x="50" data-y="50" data-zoom="1">⏺️ Centro</button>
          <button type="button" class="btn-secundario-admin btn-preset-pos" data-x="50" data-y="100" data-zoom="1">⬇️ Base</button>
        </div>
        <div class="posicao-sliders">
          <label class="posicao-slider-linha">
            <span>Posição Vertical (Y) <strong id="pos-valor-y">${pos.y}%</strong></span>
            <input type="range" id="pos-slider-y" min="0" max="100" step="1" value="${pos.y}">
          </label>
          <label class="posicao-slider-linha">
            <span>Posição Horizontal (X) <strong id="pos-valor-x">${pos.x}%</strong></span>
            <input type="range" id="pos-slider-x" min="0" max="100" step="1" value="${pos.x}">
          </label>
          <label class="posicao-slider-linha">
            <span>Zoom <strong id="pos-valor-zoom">${zoomPct}%</strong></span>
            <input type="range" id="pos-slider-zoom" min="100" max="250" step="5" value="${zoomPct}">
          </label>
        </div>
        <div class="acoes-form acoes-modal-posicao">
          <button type="button" id="btn-cancelar-posicao" class="btn-secundario-admin">Cancelar</button>
          <button type="submit" id="btn-salvar-posicao" class="btn-primario-admin">💾 Aplicar Posição</button>
        </div>
      </form>`;
  }

  function vincularControlesPosicao(dlg, opcoes) {
    const img = dlg.querySelector('.img-posicao-palco');
    const palco = dlg.querySelector('#palco-posicao-img');
    const sy = dlg.querySelector('#pos-slider-y');
    const sx = dlg.querySelector('#pos-slider-x');
    const sz = dlg.querySelector('#pos-slider-zoom');
    const vy = dlg.querySelector('#pos-valor-y');
    const vx = dlg.querySelector('#pos-valor-x');
    const vz = dlg.querySelector('#pos-valor-zoom');
    let atual = normalizarPos(opcoes.posicaoInicial);
    let rafId = 0;
    let arrasto = null;

    const pintar = () => {
      rafId = 0;
      Object.assign(img.style, estiloParaPos(atual));
      sx.value = String(atual.x);
      sy.value = String(atual.y);
      sz.value = String(Math.round(atual.zoom * 100));
      vx.textContent = `${atual.x}%`;
      vy.textContent = `${atual.y}%`;
      vz.textContent = `${Math.round(atual.zoom * 100)}%`;
    };

    const agendarPintura = () => {
      if (rafId) return;
      rafId = (raiz.requestAnimationFrame || (fn => setTimeout(fn, 16)))(pintar);
    };

    const atualizarPos = novo => {
      atual = normalizarPos({ ...atual, ...novo });
      agendarPintura();
    };

    img.addEventListener('error', () => { dlg.querySelector('#posicao-img-erro').hidden = false; });
    img.addEventListener('load', () => { dlg.querySelector('#posicao-img-erro').hidden = true; });
    sx.addEventListener('input', () => atualizarPos({ x: Number(sx.value) }));
    sy.addEventListener('input', () => atualizarPos({ y: Number(sy.value) }));
    sz.addEventListener('input', () => atualizarPos({ zoom: Number(sz.value) / 100 }));

    dlg.querySelectorAll('.btn-preset-pos').forEach(btn => {
      btn.addEventListener('click', () => {
        atualizarPos({ x: Number(btn.dataset.x), y: Number(btn.dataset.y), zoom: Number(btn.dataset.zoom) });
      });
    });

    palco.addEventListener('pointerdown', ev => {
      arrasto = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, baseX: atual.x, baseY: atual.y };
      palco.setPointerCapture?.(ev.pointerId);
    });
    palco.addEventListener('pointermove', ev => {
      if (!arrasto || arrasto.id !== ev.pointerId) return;
      const rect = palco.getBoundingClientRect();
      const fator = 100 / Math.max(atual.zoom, 1);
      const dx = ((ev.clientX - arrasto.x) / Math.max(rect.width, 1)) * fator;
      const dy = ((ev.clientY - arrasto.y) / Math.max(rect.height, 1)) * fator;
      atualizarPos({ x: arrasto.baseX - dx, y: arrasto.baseY - dy });
    });
    const encerrarArrasto = () => { arrasto = null; };
    palco.addEventListener('pointerup', encerrarArrasto);
    palco.addEventListener('pointercancel', encerrarArrasto);
    palco.addEventListener('wheel', ev => {
      ev.preventDefault();
      atualizarPos({ zoom: atual.zoom + (ev.deltaY < 0 ? 0.1 : -0.1) });
    }, { passive: false });

    dlg.querySelector('#btn-cancelar-posicao').addEventListener('click', () => dlg.close());
    dlg.querySelector('#form-posicionar-imagem').addEventListener('submit', ev => {
      ev.preventDefault();
      dlg.close();
      opcoes.aoSalvar?.(normalizarPos(atual));
    });
    pintar();
  }

  function abrirEditorPosicao(opcoes = {}) {
    if (!opcoes.url) return;
    const dlg = criarOuObterDialogo();
    const pos = normalizarPos(opcoes.posicaoInicial);
    const titulo = `Posicionar Imagem${opcoes.nome ? ` — ${opcoes.nome}` : ''}`;
    dlg.innerHTML = templateDialogo({
      titulo,
      rotuloCategoria: opcoes.rotuloCategoria,
      nome: opcoes.nome,
      url: opcoes.url,
      pos,
    });
    vincularControlesPosicao(dlg, opcoes);
    dlg.showModal?.();
  }

  const api = { comprimirParaWebP, abrirEditorPosicao };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else raiz.ForjaAdminImagem = api;
})(globalThis);
