(function (raiz) {
  'use strict';

  const CHAVE = 'forjaPersonagens.customCatalogo.v1';
  const ATRIBUTOS = [
    ['for', 'forca'], ['des', 'destreza'], ['con', 'constituicao'],
    ['int', 'inteligencia'], ['sab', 'sabedoria'], ['car', 'carisma'],
  ];
  const ROTULOS_CAT = { racas: 'Raça', subracas: 'Sub-raça', classes: 'Classe', subclasses: 'Subclasse' };
  const COLECOES = ['racas', 'subracas', 'classes', 'subclasses', 'talentos', 'antecedentes'];
  let filtroCat = 'todos';
  let termoBusca = '';
  let alvoUpload = null;

  const $ = id => document.getElementById(id);
  const val = id => $(id)?.value.trim() || '';
  const avisar = (msg, tipo = 'sucesso') => {
    if (typeof raiz.mostrarToast === 'function') raiz.mostrarToast(msg, tipo);
  };

  function lerEstado() {
    const base = { imagens: { racas: {}, subracas: {}, classes: {}, subclasses: {} } };
    for (const k of COLECOES) base[k] = {};
    try {
      const lido = JSON.parse(raiz.localStorage?.getItem(CHAVE) || '{}');
      for (const k of Object.keys(base.imagens)) base.imagens[k] = { ...(lido.imagens?.[k] || {}) };
      for (const k of COLECOES) base[k] = { ...(lido[k] || {}) };
    } catch { /* ignora JSON corrompido */ }
    return base;
  }

  function salvarEstado(estado) {
    raiz.localStorage?.setItem(CHAVE, JSON.stringify(estado));
    raiz.ForjaCatalogo?.aplicarCustomizacoes?.(bancoDnD, ForjaOpcoes, ForjaClasses);
    atualizarTudo();
  }

  function listarEntidadesGaleria(estado) {
    const itens = [];
    const imgOpcoes = ForjaOpcoes.imagensOrigem || {};
    const add = (categoria, nome) => itens.push({
      categoria, nome, url: estado.imagens[categoria]?.[nome] || imgOpcoes[categoria]?.[nome] || '',
    });
    Object.keys(bancoDnD.racas || {}).forEach(r => {
      add('racas', r);
      Object.keys(bancoDnD.racas[r]?.subracas || {}).forEach(sr => add('subracas', sr));
    });
    Object.keys(bancoDnD.classes || {}).forEach(c => {
      add('classes', c);
      (bancoDnD.classes[c]?.subclasses || []).forEach(sc => add('subclasses', sc));
    });
    return itens;
  }

  function renderizarEstatisticas(estado) {
    const el = $('admin-estatisticas');
    if (!el) return;
    const gal = listarEntidadesGaleria(estado);
    const comFoto = gal.filter(i => Boolean(i.url)).length;
    const pares = [
      ['Imagens', `${comFoto}/${gal.length}`],
      ['Raças Custom', Object.keys(estado.racas).length],
      ['Sub-raças Custom', Object.keys(estado.subracas).length],
      ['Classes Custom', Object.keys(estado.classes).length],
      ['Subclasses Custom', Object.keys(estado.subclasses).length],
      ['Talentos Custom', Object.keys(estado.talentos).length],
      ['Antecedentes Custom', Object.keys(estado.antecedentes).length],
    ];
    el.innerHTML = pares.map(([r, v]) => `<span class="badge-estatistica">${r}: <strong>${v}</strong></span>`).join('');
  }

  function passaFiltroGaleria(item) {
    if (filtroCat === 'faltantes' && item.url) return false;
    if (filtroCat !== 'todos' && filtroCat !== 'faltantes' && item.categoria !== filtroCat) return false;
    return !termoBusca || `${item.nome} ${ROTULOS_CAT[item.categoria]}`.toLowerCase().includes(termoBusca.toLowerCase());
  }

  function definirImagemItem(item, novaUrl) {
    const est = lerEstado();
    if (novaUrl) est.imagens[item.categoria][item.nome] = novaUrl;
    else delete est.imagens[item.categoria][item.nome];
    if (ForjaOpcoes.imagensOrigem?.[item.categoria]) ForjaOpcoes.imagensOrigem[item.categoria][item.nome] = novaUrl;
    salvarEstado(est);
  }

  function criarCardGaleria(item) {
    const card = document.createElement('article');
    card.className = 'card-galeria-admin';
    const ok = Boolean(item.url);
    const midia = ok
      ? `<img src="${item.url}" alt="${item.nome}" loading="lazy">`
      : `<div class="card-galeria-placeholder">Sem ilustração cadastrada para<br><strong>${item.nome}</strong></div>`;
    card.innerHTML = `<div class="card-galeria-midia"><span class="tag-categoria-card">${ROTULOS_CAT[item.categoria]}</span>
      <span class="tag-status-imagem ${ok ? 'com-foto' : 'sem-foto'}">${ok ? 'Com Imagem' : 'Sem Imagem'}</span>${midia}</div>
      <div class="card-galeria-corpo"><h3 class="card-galeria-titulo">${item.nome}</h3>
      <input type="url" class="input-admin campo-url-card" placeholder="Cole o link (URL) ou faça upload..." value="${item.url.startsWith('data:') ? '' : item.url}">
      <div class="card-galeria-acoes"><button type="button" class="btn-primario-admin btn-salvar-img">Salvar Link</button>
      <button type="button" class="btn-secundario-admin btn-upload-img">📁 Upload</button>
      <button type="button" class="btn-perigo-admin btn-limpar-img">Limpar</button></div></div>`;
    card.querySelector('.btn-salvar-img').addEventListener('click', () => {
      definirImagemItem(item, card.querySelector('.campo-url-card').value.trim());
      avisar(`Imagem de "${item.nome}" salva!`);
    });
    card.querySelector('.btn-upload-img').addEventListener('click', () => { alvoUpload = item; $('upload-imagem-card').click(); });
    card.querySelector('.btn-limpar-img').addEventListener('click', () => {
      definirImagemItem(item, '');
      avisar(`Imagem de "${item.nome}" removida.`, 'aviso');
    });
    return card;
  }

  function renderizarGaleria(estado) {
    const grid = $('grid-galeria-imagens');
    if (!grid) return;
    grid.replaceChildren(...listarEntidadesGaleria(estado).filter(passaFiltroGaleria).map(criarCardGaleria));
  }

  function comprimirParaWebP(arquivo) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onerror = () => reject(new Error('Erro de leitura'));
      leitor.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Imagem inválida'));
        img.onload = () => {
          const esc = Math.min(1, 560 / Math.max(img.width || 1, img.height || 1));
          const cv = document.createElement('canvas');
          cv.width = Math.max(1, Math.round(img.width * esc));
          cv.height = Math.max(1, Math.round(img.height * esc));
          cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
          resolve(cv.toDataURL('image/webp', 0.82));
        };
        img.src = String(leitor.result);
      };
      leitor.readAsDataURL(arquivo);
    });
  }

  function lerBonus(prefixo) {
    const b = {};
    for (const [s, c] of ATRIBUTOS) { const n = Number($(`${prefixo}-${s}`)?.value || 0); if (n) b[c] = n; }
    return b;
  }

  function preencherBonus(prefixo, bonus = {}) {
    for (const [s, c] of ATRIBUTOS) if ($(`${prefixo}-${s}`)) $(`${prefixo}-${s}`).value = bonus[c] || 0;
  }

  function parsearHabsRaciais(texto) {
    const caracteristicas = [], descricoesCaracteristicas = {};
    String(texto || '').split('\n').map(l => l.trim()).filter(Boolean).forEach(l => {
      const i = l.indexOf(':');
      const n = (i > -1 ? l.slice(0, i) : l).trim();
      if (n) { caracteristicas.push(n); descricoesCaracteristicas[n] = (i > -1 ? l.slice(i + 1) : 'Característica racial.').trim(); }
    });
    return { caracteristicas, descricoesCaracteristicas };
  }

  function parsearHabsNivel(texto, pref) {
    return String(texto || '').split('\n').map(l => l.trim()).filter(Boolean).map((l, i) => {
      const p = l.split('|').map(x => x.trim());
      return { id: `${pref}-${i + 1}`, nivel: Math.max(1, Math.min(20, Number(p[0]) || 1)), nome: p[1] || p[0] || `Habilidade ${i + 1}`, descricao: p[2] || p[1] || '', referencia: { livro: 'Customizado', pagina: 0 } };
    });
  }

  function popularSelects() {
    if ($('subraca-pai')) $('subraca-pai').innerHTML = Object.keys(bancoDnD.racas || {}).map(r => `<option value="${r}">${r}</option>`).join('');
    if ($('subclasse-pai')) $('subclasse-pai').innerHTML = Object.keys(bancoDnD.classes || {}).map(c => `<option value="${c}">${c}</option>`).join('');
    const p1 = $('antecedente-pericia-1'), p2 = $('antecedente-pericia-2'), pers = Object.keys(bancoDnD.pericias || {});
    if (p1 && p2 && !p1.options.length) {
      p1.innerHTML = p2.innerHTML = pers.map(p => `<option value="${p}">${p}</option>`).join('');
      if (pers[1]) p2.value = pers[1];
    }
  }

  function criarItemLista(titulo, sub, aoEd, aoEx) {
    const div = document.createElement('div');
    div.className = 'item-registro-admin';
    div.innerHTML = `<div><strong>${titulo}</strong><small>${sub}</small></div><div class="card-galeria-acoes"></div>`;
    const acoes = div.querySelector('.card-galeria-acoes');
    if (aoEd) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'btn-secundario-admin'; b.textContent = 'Editar';
      b.addEventListener('click', aoEd); acoes.appendChild(b);
    }
    const bx = document.createElement('button');
    bx.type = 'button'; bx.className = 'btn-perigo-admin'; bx.textContent = 'Excluir';
    bx.addEventListener('click', aoEx); acoes.appendChild(bx);
    return div;
  }

  function excluir(col, nome) {
    const est = lerEstado(); delete est[col][nome]; salvarEstado(est);
    avisar(`"${nome}" removido do catálogo customizado.`, 'aviso');
  }

  function definirCampos(mapa) {
    for (const [id, valor] of Object.entries(mapa)) if ($(id)) $(id).value = valor ?? '';
  }

  function editarRacaOuSubraca(ehSub, nome, d) {
    const habs = (d.caracteristicas || []).map(c => `${c}: ${d.descricoesCaracteristicas?.[c] || ''}`).join('\n');
    if (ehSub) {
      definirCampos({ 'subraca-pai': d.racaPai, 'subraca-nome': nome, 'subraca-descricao': d.descricao, 'subraca-habilidades': habs, 'subraca-imagem': d.imagem });
      preencherBonus('subraca', d.bonusAtributos);
    } else {
      definirCampos({ 'raca-nome': nome, 'raca-deslocamento': d.deslocamento || 9, 'raca-descricao': d.descricao, 'raca-idiomas': (d.idiomas || ['Comum']).join(', '), 'raca-habilidades': habs, 'raca-imagem': d.imagem });
      preencherBonus('raca', d.bonusAtributos);
    }
  }

  function editarClasseOuSubclasse(ehSub, nome, d) {
    const habs = (d.caracteristicas || []).map(c => `${c.nivel} | ${c.nome} | ${c.descricao}`).join('\n');
    if (ehSub) {
      definirCampos({ 'subclasse-pai': d.classePai, 'subclasse-nome': nome, 'subclasse-descricao': d.descricao, 'subclasse-habilidades': habs, 'subclasse-imagem': d.imagem });
    } else {
      const s = d.proficienciasSalvaguarda || [];
      definirCampos({ 'classe-nome': nome, 'classe-dado-vida': d.dadoVida || 8, 'classe-descricao': d.descricao, 'classe-salva-1': s[0] || 'constituicao', 'classe-salva-2': s[1] || 'inteligencia', 'classe-pericias-qtd': d.periciasQuantidade || 2, 'classe-habilidades': habs, 'classe-imagem': d.imagem });
    }
  }

  function renderizarListasCustom(est) {
    const r = $('lista-racas-custom'), c = $('lista-classes-custom'), t = $('lista-talentos-custom');
    if (r) {
      r.replaceChildren(
        ...Object.entries(est.racas).map(([n, d]) => criarItemLista(`Raça: ${n}`, d.descricao || '', () => editarRacaOuSubraca(false, n, d), () => excluir('racas', n))),
        ...Object.entries(est.subracas).map(([n, d]) => criarItemLista(`Sub-raça: ${n} (${d.racaPai})`, d.descricao || '', () => editarRacaOuSubraca(true, n, d), () => excluir('subracas', n)))
      );
    }
    if (c) {
      c.replaceChildren(
        ...Object.entries(est.classes).map(([n, d]) => criarItemLista(`Classe: ${n} (d${d.dadoVida})`, d.descricao || '', () => editarClasseOuSubclasse(false, n, d), () => excluir('classes', n))),
        ...Object.entries(est.subclasses).map(([n, d]) => criarItemLista(`Subclasse: ${n} (${d.classePai})`, d.descricao || '', () => editarClasseOuSubclasse(true, n, d), () => excluir('subclasses', n)))
      );
    }
    if (t) {
      t.replaceChildren(
        ...Object.entries(est.talentos).map(([n, d]) => criarItemLista(`Talento: ${n}`, d.beneficios || '', null, () => excluir('talentos', n))),
        ...Object.entries(est.antecedentes).map(([n, d]) => criarItemLista(`Antecedente: ${n}`, `${(d.pericias || []).join(', ')} • ${d.habilidade || ''}`, null, () => excluir('antecedentes', n)))
      );
    }
  }

  function vincularSubmissoes() {
    $('form-raca')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('raca-nome'), img = val('raca-imagem'), est = lerEstado(); if (!n) return;
      est.racas[n] = { descricao: val('raca-descricao'), deslocamento: Number(val('raca-deslocamento')) || 9, bonusAtributos: lerBonus('raca'), idiomas: val('raca-idiomas').split(',').map(s => s.trim()).filter(Boolean), ...parsearHabsRaciais(val('raca-habilidades')), imagem: img };
      if (img) est.imagens.racas[n] = img;
      salvarEstado(est); ev.target.reset(); avisar(`Raça "${n}" cadastrada!`);
    });
    $('form-subraca')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('subraca-nome'), pai = val('subraca-pai'), img = val('subraca-imagem'), est = lerEstado(); if (!n || !pai) return;
      est.subracas[n] = { racaPai: pai, descricao: val('subraca-descricao'), bonusAtributos: lerBonus('subraca'), ...parsearHabsRaciais(val('subraca-habilidades')), imagem: img };
      if (img) est.imagens.subracas[n] = img;
      salvarEstado(est); ev.target.reset(); avisar(`Sub-raça "${n}" salva!`);
    });
    $('form-classe')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('classe-nome'), img = val('classe-imagem'), est = lerEstado(); if (!n) return;
      est.classes[n] = { descricao: val('classe-descricao'), dadoVida: Number(val('classe-dado-vida')) || 8, proficienciasSalvaguarda: [val('classe-salva-1'), val('classe-salva-2')], periciasQuantidade: Number(val('classe-pericias-qtd')) || 2, caracteristicas: parsearHabsNivel(val('classe-habilidades'), `classe-${n}`), imagem: img };
      if (img) est.imagens.classes[n] = img;
      salvarEstado(est); ev.target.reset(); avisar(`Classe "${n}" salva!`);
    });
    $('form-subclasse')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('subclasse-nome'), pai = val('subclasse-pai'), img = val('subclasse-imagem'), est = lerEstado(); if (!n || !pai) return;
      est.subclasses[n] = { classePai: pai, descricao: val('subclasse-descricao'), caracteristicas: parsearHabsNivel(val('subclasse-habilidades'), `sub-${n}`), imagem: img };
      if (img) est.imagens.subclasses[n] = img;
      salvarEstado(est); ev.target.reset(); avisar(`Subclasse "${n}" salva!`);
    });
    $('form-talento')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('talento-nome'), est = lerEstado(); if (!n) return;
      est.talentos[n] = { id: 'talento-' + ForjaCatalogo.id(n), preRequisitos: val('talento-prereq'), beneficios: val('talento-beneficios') };
      salvarEstado(est); ev.target.reset(); avisar(`Talento "${n}" salvo!`);
    });
    $('form-antecedente')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('antecedente-nome'), est = lerEstado(); if (!n) return;
      est.antecedentes[n] = { pericias: [val('antecedente-pericia-1'), val('antecedente-pericia-2')], ferramentas: [], idiomasEscolha: Number(val('antecedente-idiomas')) || 0, habilidade: val('antecedente-habilidade'), descricaoHabilidade: val('antecedente-descricao') };
      salvarEstado(est); ev.target.reset(); avisar(`Antecedente "${n}" salvo!`);
    });
  }

  function atualizarTudo() {
    const est = lerEstado();
    popularSelects(); renderizarEstatisticas(est); renderizarGaleria(est); renderizarListasCustom(est);
  }

  function iniciarControles() {
    document.querySelectorAll('.admin-aba-btn').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-aba-btn').forEach(b => { b.classList.toggle('ativa', b === btn); b.setAttribute('aria-selected', String(b === btn)); });
      document.querySelectorAll('.admin-secao').forEach(s => { const at = s.id === btn.dataset.aba; s.hidden = !at; s.classList.toggle('ativa', at); });
    }));
    document.querySelectorAll('.chip-filtro').forEach(ch => ch.addEventListener('click', () => {
      filtroCat = ch.dataset.cat;
      document.querySelectorAll('.chip-filtro').forEach(c => c.classList.toggle('ativo', c === ch));
      renderizarGaleria(lerEstado());
    }));
    $('busca-galeria')?.addEventListener('input', ev => { termoBusca = ev.target.value.trim(); renderizarGaleria(lerEstado()); });
    $('upload-imagem-card')?.addEventListener('change', async ev => {
      const arq = ev.target.files?.[0]; ev.target.value = ''; if (!arq || !alvoUpload) return;
      try { definirImagemItem(alvoUpload, await comprimirParaWebP(arq)); avisar(`Imagem de "${alvoUpload.nome}" otimizada e salva!`); }
      catch { avisar('Não foi possível processar a imagem.', 'aviso'); }
    });
    $('btn-exportar-admin')?.addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([JSON.stringify(lerEstado(), null, 2)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = 'forja-5e-catalogo-customizado.json'; a.click(); URL.revokeObjectURL(url);
      avisar('Catálogo customizado exportado!');
    });
    $('input-importar-admin')?.addEventListener('change', async ev => {
      const arq = ev.target.files?.[0]; ev.target.value = ''; if (!arq) return;
      try { raiz.localStorage?.setItem(CHAVE, JSON.stringify(JSON.parse(await arq.text()))); salvarEstado(lerEstado()); avisar('Catálogo importado com sucesso!'); }
      catch { avisar('Arquivo JSON inválido.', 'aviso'); }
    });
    $('btn-resetar-admin')?.addEventListener('click', () => {
      raiz.localStorage?.removeItem(CHAVE); atualizarTudo();
      avisar('Customizações limpas. Recarregue a página para restaurar os originais.', 'aviso');
    });
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => { iniciarControles(); vincularSubmissoes(); atualizarTudo(); });
  }
})(globalThis);
