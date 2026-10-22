const ForjaMidia = (() => {
'use strict';
const LIMITE_BYTES = 8000000;
const PADRAO = () => ({zoom: 1, giro: 0, x: 0, y: 0, espelhar: false});

function desenharTransformado(canvas, img, est) {
 const ctx = canvas.getContext('2d'), w = canvas.width, h = canvas.height;
 ctx.clearRect(0, 0, w, h);
 ctx.save();
 ctx.translate(w / 2 + (est.x / 100) * (w * 0.45), h / 2 + (est.y / 100) * (h * 0.45));
 ctx.rotate((est.giro * Math.PI) / 180);
 ctx.scale((est.espelhar ? -1 : 1) * est.zoom, est.zoom);
 const escala = Math.max(w / img.width, h / img.height);
 const dw = img.width * escala, dh = img.height * escala;
 ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
 ctx.restore();
}

function exportarWebp(canvas) {
 for (const q of [0.82, 0.72, 0.6, 0.48]) {
  const url = canvas.toDataURL('image/webp', q);
  if (url.length <= 900000) return url;
 }
 throw Error('Imagem ainda muito grande após reduzir.');
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
 return imagem;
}

function criar({detalhes, el, botao, salvar, atualizar}) {
 const fontes = {}, estados = {}, estudios = new Set();

 function preencher() {
  for (const img of document.querySelectorAll('img[data-forja-imagem]')) {
   const data = detalhes().historia[img.dataset.forjaImagem] || '';
   img.hidden = !data;
   if (data) img.src = data; else img.removeAttribute('src');
  }
  for (const fn of estudios) fn();
 }

 function aplicarRetrato(img, est) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 800;
  desenharTransformado(canvas, img, est);
  detalhes().historia.retrato = exportarWebp(canvas);
  preencher();
  atualizar();
  salvar();
 }

 async function carregar(arquivo, chave) {
  if (!arquivo) return;
  const data = await lerArquivo(arquivo);
  const imagem = await decodificar(data);
  if (chave === 'retrato') {
   fontes.retrato = imagem;
   estados.retrato = PADRAO();
   aplicarRetrato(imagem, estados.retrato);
   for (const fn of estudios) fn(true);
  } else {
   const canvas = document.createElement('canvas');
   const fator = Math.min(1, 800 / imagem.width, 1000 / imagem.height);
   canvas.width = Math.max(1, Math.round(imagem.width * fator));
   canvas.height = Math.max(1, Math.round(imagem.height * fator));
   canvas.getContext('2d').drawImage(imagem, 0, 0, canvas.width, canvas.height);
   detalhes().historia[chave] = exportarWebp(canvas);
   preencher();
   atualizar();
   salvar();
  }
  mostrarToast(chave === 'retrato' ? 'Retrato atualizado. Ajuste o corte abaixo se desejar.' : 'Símbolo da organização atualizado.', 'sucesso');
 }

 function vincularArraste(palco, aoArrastar) {
  let ativo = null;
  palco.addEventListener('pointerdown', e => {
   ativo = {x: e.clientX, y: e.clientY};
   palco.setPointerCapture?.(e.pointerId);
  });
  palco.addEventListener('pointermove', e => {
   if (!ativo) return;
   const dx = ((e.clientX - ativo.x) / palco.clientWidth) * 140;
   const dy = ((e.clientY - ativo.y) / palco.clientHeight) * 140;
   ativo = {x: e.clientX, y: e.clientY};
   aoArrastar(dx, dy);
  });
  const soltar = () => { ativo = null; };
  palco.addEventListener('pointerup', soltar);
  palco.addEventListener('pointercancel', soltar);
 }

 function montarEstudio(el, botao) {
  const palco = el('canvas', {class: 'forja-retrato-palco', width: 240, height: 300, 'aria-label': 'Área de corte do retrato (arraste para mover)'});
  const cvHub = el('canvas', {class: 'forja-preview-canvas-hub', width: 240, height: 135});
  const cvFicha = el('canvas', {class: 'forja-preview-canvas-ficha', width: 76, height: 76});
  const nomeHub = el('strong', {class: 'forja-preview-nome'}, 'Seu Herói');
  const nomeFicha = el('strong', {class: 'forja-preview-nome'}, 'Seu Herói');
  const sliders = {};
  const criarSlider = ([ch, rot, min, max, step]) => {
   const inp = el('input', {type: 'range', min, max, step, value: 0, 'aria-label': rot});
   sliders[ch] = inp;
   return el('label', {class: 'forja-retrato-slider'}, el('span', {}, rot), inp);
  };
  const controles = el('div', {class: 'forja-retrato-sliders'},
   criarSlider(['zoom', 'Zoom / Corte', 1, 3, 0.05]),
   criarSlider(['giro', 'Girar (°)', -180, 180, 1]),
   criarSlider(['x', 'Posição horizontal', -100, 100, 1]),
   criarSlider(['y', 'Posição vertical', -100, 100, 1])
  );
  const previews = el('div', {class: 'forja-retrato-previews'},
   el('div', {class: 'forja-retrato-preview-card'},
    el('small', {}, 'Preview: Menu de personagens'),
    el('div', {class: 'forja-preview-hub-mock'}, cvHub, el('span', {class: 'forja-preview-badge'}, 'Nível 1'), nomeHub)
   ),
   el('div', {class: 'forja-retrato-preview-card'},
    el('small', {}, 'Preview: Parte da ficha'),
    el('div', {class: 'forja-preview-ficha-mock'}, cvFicha, el('div', {class: 'forja-preview-ficha-info'}, nomeFicha, el('span', {}, 'Cabeçalho da ficha')))
   )
  );
  const caixa = el('div', {class: 'forja-retrato-estudio', hidden: true});
  const sincronizar = (abrir = false) => {
   if (abrir && fontes.retrato) caixa.hidden = false;
   const img = fontes.retrato;
   if (!img || caixa.hidden) return;
   const est = estados.retrato || (estados.retrato = PADRAO());
   sliders.zoom.value = est.zoom;
   sliders.giro.value = est.giro;
   sliders.x.value = est.x;
   sliders.y.value = est.y;
   const n = document.getElementById('nome-personagem')?.value?.trim() || 'Seu Herói';
   nomeHub.textContent = n;
   nomeFicha.textContent = n;
   desenharTransformado(palco, img, est);
   desenharTransformado(cvHub, img, est);
   desenharTransformado(cvFicha, img, est);
  };
  const alterar = mut => {
   if (!fontes.retrato) return;
   estados.retrato = estados.retrato || PADRAO();
   mut(estados.retrato);
   aplicarRetrato(fontes.retrato, estados.retrato);
  };
  for (const ch of ['zoom', 'giro', 'x', 'y']) {
   sliders[ch].addEventListener('input', () => alterar(est => { est[ch] = Number(sliders[ch].value); }));
  }
  vincularArraste(palco, (dx, dy) => alterar(est => {
   est.x = Math.max(-100, Math.min(100, Math.round(est.x + dx)));
   est.y = Math.max(-100, Math.min(100, Math.round(est.y + dy)));
  }));
  const botoesGiro = el('div', {class: 'forja-retrato-botoes'},
   botao('↺ -90°', () => alterar(est => { est.giro = ((est.giro - 90 + 540) % 360) - 180; })),
   botao('↻ +90°', () => alterar(est => { est.giro = ((est.giro + 90 + 540) % 360) - 180; })),
   botao('⇄ Espelhar', () => alterar(est => { est.espelhar = !est.espelhar; })),
   botao('Redefinir', () => alterar(est => Object.assign(est, PADRAO()))),
   botao('Concluir edição', () => { caixa.hidden = true; }, {class: 'btn-secundario forja-acao-principal'})
  );
  caixa.append(
   el('div', {class: 'forja-retrato-estudio-topo'}, el('strong', {}, 'Editor de retrato'), el('small', {}, 'Arraste a imagem ou use os controles para cortar, mover e girar')),
   el('div', {class: 'forja-retrato-estudio-grade'}, el('div', {class: 'forja-retrato-palco-wrap'}, palco, botoesGiro), el('div', {class: 'forja-retrato-painel-direito'}, controles, previews))
  );
  estudios.add(sincronizar);
  return {caixa, abrir: async () => {
   if (!fontes.retrato && detalhes().historia.retrato) fontes.retrato = await decodificar(detalhes().historia.retrato);
   estados.retrato = estados.retrato || PADRAO();
   caixa.hidden = ! caixa.hidden;
   sincronizar();
  }};
 }

 function controle(chave, origem = 'historia') {
  const retrato = chave === 'retrato', nome = retrato ? 'Retrato' : 'Símbolo da organização';
  const root = el('section', {class: 'forja-midia-editor'}, el('h3', {}, nome + (origem === 'criacao' ? ' · opcional' : '')));
  const img = el('img', {'data-forja-imagem': chave, alt: nome, class: 'forja-midia-preview', hidden: true});
  const input = el('input', {type: 'file', id: 'forja-arquivo-' + chave + '-' + origem, accept: 'image/png,image/jpeg,image/webp', 'aria-label': 'Escolher ' + nome.toLowerCase() + (origem === 'criacao' ? ' na criação' : ''), class: 'forja-arquivo-imagem'});
  input.addEventListener('change', async () => { try { await carregar(input.files[0], chave); } catch (e) { mostrarToast(e.message, 'aviso'); } finally { input.value = ''; } });
  const est = retrato ? montarEstudio(el, botao) : null;
  const acoes = el('div', {class: 'forja-midia-acoes'},
   botao('Escolher imagem', () => input.click()),
   retrato ? botao('Editar retrato', () => { if (!detalhes().historia.retrato) { mostrarToast('Carregue um retrato primeiro.', 'aviso'); return; } est.abrir(); }) : null,
   botao('Remover ' + nome, () => { detalhes().historia[chave] = ''; if (retrato) { delete fontes.retrato; est.caixa.hidden = true; } preencher(); atualizar(); salvar(); mostrarToast(nome + ' removido.', 'sucesso'); })
  );
  root.append(el('div', {class: 'forja-midia-quadro'}, img, el('span', {class: 'forja-midia-vazio', 'aria-hidden': 'true'}, retrato ? 'Seu personagem' : 'Sua organização')), el('p', {class: 'forja-nota'}, 'PNG, JPEG ou WebP · até 7 MB'), input, acoes);
  if (est) root.append(est.caixa);
  return root;
 }
 return {controle, preencher, carregar};
}
return {criar};
})();
