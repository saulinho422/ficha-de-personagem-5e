const ForjaMidia = (() => {
'use strict';
const LIMITE_BYTES = 8000000;
const PADRAO = () => ({zoom: 1, corte: 0, giro: 0, x: 0, y: 0, espelhar: false});

function lerEstadoEdicao(texto) {
 const base = PADRAO();
 if (!texto) return base;
 try {
  const obj = JSON.parse(texto);
  if (!obj || typeof obj !== 'object') return base;
  return {
   zoom: Number.isFinite(Number(obj.zoom)) ? Math.max(0.5, Math.min(3, Number(obj.zoom))) : 1,
   corte: Number.isFinite(Number(obj.corte)) ? Math.max(0, Math.min(45, Math.round(Number(obj.corte)))) : 0,
   giro: Number.isFinite(Number(obj.giro)) ? Math.max(-180, Math.min(180, Math.round(Number(obj.giro)))) : 0,
   x: Number.isFinite(Number(obj.x)) ? Math.max(-100, Math.min(100, Math.round(Number(obj.x)))) : 0,
   y: Number.isFinite(Number(obj.y)) ? Math.max(-100, Math.min(100, Math.round(Number(obj.y)))) : 0,
   espelhar: Boolean(obj.espelhar)
  };
 } catch (_) {
  return base;
 }
}

function escalaCorte(est, aplicarCorte) {
 if (!aplicarCorte || !est.corte) return 1;
 return 1 / Math.max(0.2, 1 - (est.corte / 100) * 0.8);
}

function desenharMascaraCorte(ctx, w, h, corte) {
 if (!corte) return;
 const ix = Math.round(((corte / 100) * w * 0.8) / 2);
 const iy = Math.round(((corte / 100) * h * 0.8) / 2);
 const cw = w - ix * 2, ch = h - iy * 2;
 ctx.save();
 ctx.fillStyle = 'rgba(8, 6, 5, 0.58)';
 ctx.fillRect(0, 0, w, iy);
 ctx.fillRect(0, iy + ch, w, h - iy - ch);
 ctx.fillRect(0, iy, ix, ch);
 ctx.fillRect(ix + cw, iy, w - ix - cw, ch);
 ctx.strokeStyle = 'rgba(199, 148, 62, 0.9)';
 ctx.lineWidth = 2;
 ctx.setLineDash([6, 4]);
 ctx.strokeRect(ix + 1, iy + 1, Math.max(2, cw - 2), Math.max(2, ch - 2));
 ctx.restore();
}

function desenharTransformado(canvas, img, est, aplicarCorte = true) {
 const ctx = canvas.getContext('2d'), w = canvas.width, h = canvas.height;
 const fatorCorte = escalaCorte(est, aplicarCorte);
 const zoomFinal = (est.zoom || 1) * fatorCorte;
 ctx.clearRect(0, 0, w, h);
 ctx.save();
 ctx.translate(w / 2 + (est.x / 100) * (w * 0.45) * fatorCorte, h / 2 + (est.y / 100) * (h * 0.45) * fatorCorte);
 ctx.rotate((est.giro * Math.PI) / 180);
 ctx.scale((est.espelhar ? -1 : 1) * zoomFinal, zoomFinal);
 const escala = Math.max(w / img.width, h / img.height);
 const dw = img.width * escala, dh = img.height * escala;
 ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
 ctx.restore();
 if (!aplicarCorte) desenharMascaraCorte(ctx, w, h, est.corte);
}

function criarFonteOtimizada(img) {
 const max = 1200, f = Math.min(1, max / Math.max(img.width, img.height));
 if (f >= 1) return img;
 const cv = document.createElement('canvas');
 cv.width = Math.max(1, Math.round(img.width * f));
 cv.height = Math.max(1, Math.round(img.height * f));
 cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
 return cv;
}

function exportarWebp(canvas) {
 for (const q of [0.82, 0.72, 0.6, 0.48]) {
  const url = canvas.toDataURL('image/webp', q);
  if (url.length <= 900000) return url;
 }
 throw Error('Imagem ainda muito grande após reduzir.');
}

function exportarOriginalWebp(img) {
 const cv = document.createElement('canvas');
 const f = Math.min(1, 960 / Math.max(img.width, img.height));
 cv.width = Math.max(1, Math.round(img.width * f));
 cv.height = Math.max(1, Math.round(img.height * f));
 cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
 return exportarWebp(cv);
}

function lerArquivo(arquivo) {
 if (!['image/png', 'image/jpeg', 'image/webp'].includes(arquivo.type) || arquivo.size > LIMITE_BYTES) {
  throw Error('Escolha PNG, JPEG ou WebP de até 7 MB.');
 }
 return new Promise((ok, no) => {
  const leitor = new FileReader();
  leitor.onload = () => ok(leitor.result);
  leitor.onerror = () => no(Error('Não foi possível ler a imagem.'));
  leitor.readAsDataURL(arquivo);
 });
}

async function decodificar(src) {
 const imagem = new Image();
 imagem.src = src;
 await imagem.decode();
 if (!imagem.width || !imagem.height) throw Error('A imagem não tem dimensões válidas.');
 return criarFonteOtimizada(imagem);
}

function vincularInteracaoPalco(palco, aoMover, aoZoom) {
 let ativo = null;
 palco.addEventListener('pointerdown', e => {
  ativo = {x: e.clientX, y: e.clientY};
  palco.setPointerCapture?.(e.pointerId);
 });
 palco.addEventListener('pointermove', e => {
  if (!ativo) return;
  const dx = ((e.clientX - ativo.x) / (palco.clientWidth || 320)) * 120;
  const dy = ((e.clientY - ativo.y) / (palco.clientHeight || 400)) * 120;
  ativo = {x: e.clientX, y: e.clientY};
  aoMover(dx, dy);
 });
 const soltar = () => { ativo = null; };
 palco.addEventListener('pointerup', soltar);
 palco.addEventListener('pointercancel', soltar);
 palco.addEventListener('wheel', e => {
  e.preventDefault();
  aoZoom(e.deltaY < 0 ? 0.08 : -0.08);
 }, {passive: false});
}

function criar({detalhes, el, botao, salvar, atualizar}) {
 const fontes = {}, estados = {};
 let modal = null;

 function preencher() {
  for (const img of document.querySelectorAll('img[data-forja-imagem]')) {
   const data = detalhes().historia[img.dataset.forjaImagem] || '';
   img.hidden = !data;
   if (data) img.src = data; else img.removeAttribute('src');
  }
 }

 function aplicarRetrato(img, est) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 800;
  desenharTransformado(canvas, img, est, true);
  const hist = detalhes().historia;
  if (!hist.retratoOriginal) hist.retratoOriginal = exportarOriginalWebp(img);
  hist.retratoEdicao = JSON.stringify(est);
  hist.retrato = exportarWebp(canvas);
  preencher();
  atualizar();
  salvar();
 }

 function garantirModal() {
  if (modal) return modal;
  const palco = el('canvas', {class: 'forja-retrato-palco', width: 320, height: 400, 'aria-label': 'Área de corte do retrato (arraste para mover)'});
  const cvHub = el('canvas', {class: 'forja-preview-canvas-hub', width: 320, height: 180});
  const cvFicha = el('canvas', {class: 'forja-preview-canvas-ficha', width: 84, height: 84});
  const nomeHub = el('strong', {class: 'forja-preview-nome'}, 'Seu Herói');
  const nomeFicha = el('strong', {class: 'forja-preview-nome'}, 'Seu Herói');
  const sliders = {}, valores = {};
  const criarSlider = ([ch, rot, min, max, step]) => {
   const val = el('strong', {'data-valor': ch}, '');
   const inp = el('input', {type: 'range', min, max, step, value: 0, 'aria-label': rot});
   sliders[ch] = inp;
   valores[ch] = val;
   return el('label', {class: 'forja-retrato-slider'}, el('div', {class: 'forja-retrato-slider-topo'}, el('span', {}, rot), val), inp);
  };
  const controles = el('div', {class: 'forja-retrato-sliders'},
   criarSlider(['zoom', 'Zoom da imagem', 0.5, 3, 0.02]),
   criarSlider(['corte', 'Corte das bordas', 0, 45, 1]),
   criarSlider(['giro', 'Girar', -180, 180, 1]),
   criarSlider(['x', 'Posição horizontal', -100, 100, 1]),
   criarSlider(['y', 'Posição vertical', -100, 100, 1])
  );
  const previews = el('div', {class: 'forja-retrato-previews'},
   el('div', {class: 'forja-retrato-preview-card'},
    el('small', {}, 'Menu de personagens (Hub)'),
    el('div', {class: 'forja-preview-hub-mock'}, cvHub, el('div', {class: 'forja-preview-hub-overlay'}, nomeHub, el('span', {class: 'forja-preview-badge'}, 'Nível 1')))
   ),
   el('div', {class: 'forja-retrato-preview-card'},
    el('small', {}, 'Cabeçalho da ficha'),
    el('div', {class: 'forja-preview-ficha-mock'}, cvFicha, el('div', {class: 'forja-preview-ficha-info'}, nomeFicha, el('span', {}, 'Ficha de Personagem 5E')))
   )
  );
  const dlg = el('dialog', {class: 'forja-retrato-modal', 'aria-label': 'Editor de retrato'});
  let raf = 0;
  const sincronizarSliders = est => {
   for (const ch of ['zoom', 'corte', 'giro', 'x', 'y']) sliders[ch].value = est[ch];
   valores.zoom.textContent = Math.round(est.zoom * 100) + '%';
   valores.corte.textContent = est.corte + '%';
   valores.giro.textContent = est.giro + '°';
   valores.x.textContent = String(est.x);
   valores.y.textContent = String(est.y);
  };
  const desenhar = () => {
   raf = 0;
   const img = fontes.retrato;
   if (!img) return;
   const est = estados.retrato || (estados.retrato = PADRAO());
   sincronizarSliders(est);
   const n = document.getElementById('nome-personagem')?.value?.trim() || 'Seu Herói';
   nomeHub.textContent = n;
   nomeFicha.textContent = n;
   desenharTransformado(palco, img, est, false);
   desenharTransformado(cvHub, img, est, true);
   desenharTransformado(cvFicha, img, est, true);
  };
  const agendar = mut => {
   if (!fontes.retrato) return;
   estados.retrato = estados.retrato || PADRAO();
   mut(estados.retrato);
   if (!raf) raf = requestAnimationFrame(desenhar);
  };
  for (const ch of ['zoom', 'corte', 'giro', 'x', 'y']) {
   sliders[ch].addEventListener('input', () => agendar(est => { est[ch] = Number(sliders[ch].value); }));
  }
  vincularInteracaoPalco(
   palco,
   (dx, dy) => agendar(est => {
    est.x = Math.max(-100, Math.min(100, Math.round(est.x + dx)));
    est.y = Math.max(-100, Math.min(100, Math.round(est.y + dy)));
   }),
   dz => agendar(est => {
    est.zoom = Math.max(0.5, Math.min(3, Math.round((est.zoom + dz) * 50) / 50));
   })
  );
  const fechar = () => {
   estados.retrato = lerEstadoEdicao(detalhes().historia.retratoEdicao);
   if (dlg.open && typeof dlg.close === 'function') dlg.close();
   dlg.removeAttribute('open');
  };
  const confirmar = () => {
   if (fontes.retrato) aplicarRetrato(fontes.retrato, estados.retrato || PADRAO());
   fechar();
   mostrarToast('Retrato atualizado.', 'sucesso');
  };
  const botoesRapidos = el('div', {class: 'forja-retrato-botoes'},
   botao('↺ -90°', () => agendar(est => { est.giro = ((est.giro - 90 + 540) % 360) - 180; })),
   botao('↻ +90°', () => agendar(est => { est.giro = ((est.giro + 90 + 540) % 360) - 180; })),
   botao('⇄ Espelhar', () => agendar(est => { est.espelhar = !est.espelhar; })),
   botao('Redefinir', () => agendar(est => Object.assign(est, PADRAO())))
  );
  dlg.append(
   el('header', {class: 'forja-retrato-modal-topo'},
    el('div', {}, el('h2', {}, 'Editor de retrato'), el('p', {}, 'Ajuste zoom e corte separadamente. A imagem original permanece salva para futuras edições.')),
    botao('✕', fechar, {class: 'btn-secundario forja-fechar-dialogo', 'aria-label': 'Fechar editor de retrato'})
   ),
   el('div', {class: 'forja-retrato-modal-corpo'},
    el('div', {class: 'forja-retrato-palco-col'},
     el('div', {class: 'forja-retrato-palco-moldura'}, palco, el('span', {class: 'forja-retrato-dica'}, 'Arraste para mover • Role para zoom • Corte preserva o original')),
     botoesRapidos
    ),
    el('div', {class: 'forja-retrato-controles-col'}, controles, previews)
   ),
   el('footer', {class: 'forja-retrato-modal-rodape'},
    botao('Cancelar', fechar),
    botao('Salvar retrato', confirmar, {class: 'btn-secundario forja-acao-principal'})
   )
  );
  dlg.addEventListener('click', e => { if (e.target === dlg) fechar(); });
  document.body.append(dlg);
  modal = {
   fechar,
   abrir: async () => {
    const hist = detalhes().historia;
    const srcOriginal = hist.retratoOriginal || hist.retrato;
    if (srcOriginal && fontes.srcRetrato !== srcOriginal) {
     fontes.retrato = await decodificar(srcOriginal);
     fontes.srcRetrato = srcOriginal;
    }
    if (!fontes.retrato) return;
    estados.retrato = lerEstadoEdicao(hist.retratoEdicao);
    try { if (!dlg.open) dlg.showModal?.(); } catch (_) { dlg.setAttribute('open', ''); }
    if (!dlg.open) dlg.setAttribute('open', '');
    desenhar();
   }
  };
  return modal;
 }

 async function carregar(arquivo, chave) {
  if (!arquivo) return;
  const data = await lerArquivo(arquivo);
  const imagem = await decodificar(data);
  if (chave === 'retrato') {
   const hist = detalhes().historia;
   hist.retratoOriginal = exportarOriginalWebp(imagem);
   fontes.retrato = imagem;
   fontes.srcRetrato = hist.retratoOriginal;
   estados.retrato = PADRAO();
   aplicarRetrato(imagem, estados.retrato);
   await garantirModal().abrir();
   mostrarToast('Retrato carregado. Ajuste o zoom ou o corte se desejar.', 'sucesso');
   return;
  }
  const canvas = document.createElement('canvas');
  const fator = Math.min(1, 800 / imagem.width, 1000 / imagem.height);
  canvas.width = Math.max(1, Math.round(imagem.width * fator));
  canvas.height = Math.max(1, Math.round(imagem.height * fator));
  canvas.getContext('2d').drawImage(imagem, 0, 0, canvas.width, canvas.height);
  detalhes().historia[chave] = exportarWebp(canvas);
  preencher();
  atualizar();
  salvar();
  mostrarToast('Símbolo da organização atualizado.', 'sucesso');
 }

 function removerMidia(chave, retrato, nome) {
  const hist = detalhes().historia;
  hist[chave] = '';
  if (retrato) {
   hist.retratoOriginal = '';
   hist.retratoEdicao = '';
   delete fontes.retrato;
   delete fontes.srcRetrato;
   delete estados.retrato;
   modal?.fechar();
  }
  preencher();
  atualizar();
  salvar();
  mostrarToast(nome + ' removido.', 'sucesso');
 }

 function controle(chave, origem = 'historia') {
  const retrato = chave === 'retrato', nome = retrato ? 'Retrato' : 'Símbolo da organização';
  const root = el('section', {class: 'forja-midia-editor'}, el('h3', {}, nome + (origem === 'criacao' ? ' · opcional' : '')));
  const img = el('img', {'data-forja-imagem': chave, alt: nome, class: 'forja-midia-preview', hidden: true});
  const input = el('input', {type: 'file', id: 'forja-arquivo-' + chave + '-' + origem, accept: 'image/png,image/jpeg,image/webp', 'aria-label': 'Escolher ' + nome.toLowerCase() + (origem === 'criacao' ? ' na criação' : ''), class: 'forja-arquivo-imagem'});
  input.addEventListener('change', async () => { try { await carregar(input.files[0], chave); } catch (e) { mostrarToast(e.message, 'aviso'); } finally { input.value = ''; } });
  const acoes = el('div', {class: 'forja-midia-acoes'},
   botao('Escolher imagem', () => input.click()),
   retrato ? botao('Editar retrato', () => { if (!detalhes().historia.retrato) { mostrarToast('Carregue um retrato primeiro.', 'aviso'); return; } garantirModal().abrir(); }) : null,
   botao('Remover ' + nome, () => removerMidia(chave, retrato, nome))
  );
  root.append(el('div', {class: 'forja-midia-quadro'}, img, el('span', {class: 'forja-midia-vazio', 'aria-hidden': 'true'}, retrato ? 'Seu personagem' : 'Sua organização')), el('p', {class: 'forja-nota'}, 'PNG, JPEG ou WebP · até 7 MB'), input, acoes);
  return root;
 }
 return {controle, preencher, carregar};
}
return {criar};
})();
