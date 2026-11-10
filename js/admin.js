(function (raiz) {
  'use strict';

  const CHAVE = 'forjaPersonagens.customCatalogo.v1';
  const ATRIBUTOS = [
    ['for', 'forca'], ['des', 'destreza'], ['con', 'constituicao'],
    ['int', 'inteligencia'], ['sab', 'sabedoria'], ['car', 'carisma'],
  ];
  const ROTULOS_CAT = { racas: 'Raça', subracas: 'Sub-raça', classes: 'Classe', subclasses: 'Subclasse' };
  const IMAGENS_CAT = ['racas', 'subracas', 'classes', 'subclasses'];
  const COLECOES = ['racas', 'subracas', 'classes', 'subclasses', 'talentos', 'antecedentes'];
  const PHB_RACAS = new Set(['Anão', 'Elfo', 'Halfling', 'Humano', 'Humano Variante', 'Draconato', 'Gnomo', 'Meio-Elfo', 'Meio-Orc', 'Tiefling']);
  const PHB_CLASSES = new Set(['Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge', 'Paladino', 'Patrulheiro']);
  let filtroCat = 'todos';
  let termoBusca = '';
  let alvoUpload = null;
  const posicoesForm = { racas: null, subracas: null, classes: null, subclasses: null };
  const FORM_POR_CAT = { 'form-raca': 'racas', 'form-subraca': 'subracas', 'form-classe': 'classes', 'form-subclasse': 'subclasses' };

  const $ = id => document.getElementById(id);
  const val = id => $(id)?.value.trim() || '';
  const normalizarPosicao = pos => raiz.ForjaCatalogo?.normalizarPosicaoImagem?.(pos) || { x: 50, y: 50, zoom: 1 };
  const aplicarEstiloImg = (img, pos) => {
    const est = raiz.ForjaCatalogo?.estiloImagem?.(pos);
    if (img && est) Object.assign(img.style, est);
  };
  const escaparHtml = v => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
  const avisar = (msg, tipo = 'sucesso') => {
    if (typeof raiz.mostrarToast === 'function') raiz.mostrarToast(msg, tipo);
  };

  function criarRemovidosVazio() {
    const rem = { imagens: {} };
    for (const k of IMAGENS_CAT) rem.imagens[k] = [];
    for (const k of COLECOES) rem[k] = [];
    return rem;
  }

  function normalizarRemovidos(orig) {
    const rem = criarRemovidosVazio();
    const o = orig && typeof orig === 'object' ? orig : {};
    for (const k of IMAGENS_CAT) if (Array.isArray(o.imagens?.[k])) rem.imagens[k] = [...new Set(o.imagens[k])];
    for (const k of COLECOES) if (Array.isArray(o[k])) rem[k] = [...new Set(o[k])];
    return rem;
  }

  const adicionarTombstone = (grupo, col, nome) => {
    if (Array.isArray(grupo?.[col]) && !grupo[col].includes(nome)) grupo[col].push(nome);
  };

  const removerTombstone = (grupo, col, nome) => {
    if (Array.isArray(grupo?.[col])) grupo[col] = grupo[col].filter(x => x !== nome);
  };

  function lerEstado() {
    let lido;
    try { lido = JSON.parse(raiz.localStorage?.getItem(CHAVE) || '{}') || {}; }
    catch { lido = {}; }
    const glob = raiz.ForjaCustomCatalogo || {};
    const mesclado = raiz.ForjaCatalogo?.mesclarFontesCustom
      ? raiz.ForjaCatalogo.mesclarFontesCustom(glob, lido)
      : { imagens: { racas: {}, subracas: {}, classes: {}, subclasses: {} }, posicoesImagens: { racas: {}, subracas: {}, classes: {}, subclasses: {} }, racas: {}, subracas: {}, classes: {}, subclasses: {}, talentos: {}, antecedentes: {} };
    mesclado.removidos = normalizarRemovidos(lido.removidos);
    return mesclado;
  }

  function salvarEstado(estado) {
    raiz.localStorage?.setItem(CHAVE, JSON.stringify(estado));
    raiz.ForjaCatalogo?.aplicarCustomizacoes?.(bancoDnD, ForjaOpcoes, ForjaClasses);
    atualizarTudo();
  }

  function listarEntidadesGaleria(estado) {
    const itens = [];
    const imgOpcoes = ForjaOpcoes.imagensOrigem || {};
    const posOpcoes = ForjaOpcoes.posicoesOrigem || {};
    const add = (categoria, nome) => {
      const removida = estado.removidos?.imagens?.[categoria]?.includes(nome);
      itens.push({
        categoria,
        nome,
        url: removida ? '' : (estado.imagens[categoria]?.[nome] || imgOpcoes[categoria]?.[nome] || ''),
        posicao: removida ? normalizarPosicao() : normalizarPosicao(estado.posicoesImagens?.[categoria]?.[nome] || posOpcoes[categoria]?.[nome]),
      });
    };
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

  function definirImagemItem(item, novaUrl, novaPosicao) {
    const est = lerEstado();
    est.removidos = normalizarRemovidos(est.removidos);
    est.posicoesImagens ??= { racas: {}, subracas: {}, classes: {}, subclasses: {} };
    if (novaUrl) {
      est.imagens[item.categoria][item.nome] = novaUrl;
      if (est[item.categoria]?.[item.nome]) est[item.categoria][item.nome].imagem = novaUrl;
      if (novaPosicao !== undefined) {
        const pos = normalizarPosicao(novaPosicao);
        est.posicoesImagens[item.categoria][item.nome] = pos;
        if (est[item.categoria]?.[item.nome]) est[item.categoria][item.nome].posicaoImagem = pos;
        ForjaOpcoes.posicoesOrigem ??= {};
        ForjaOpcoes.posicoesOrigem[item.categoria] ??= {};
        ForjaOpcoes.posicoesOrigem[item.categoria][item.nome] = pos;
      }
      removerTombstone(est.removidos.imagens, item.categoria, item.nome);
    } else {
      delete est.imagens[item.categoria][item.nome];
      delete est.posicoesImagens[item.categoria][item.nome];
      if (est[item.categoria]?.[item.nome]) {
        est[item.categoria][item.nome].imagem = '';
        est[item.categoria][item.nome].posicaoImagem = null;
      }
      delete ForjaOpcoes.posicoesOrigem?.[item.categoria]?.[item.nome];
      adicionarTombstone(est.removidos.imagens, item.categoria, item.nome);
    }
    if (ForjaOpcoes.imagensOrigem?.[item.categoria]) ForjaOpcoes.imagensOrigem[item.categoria][item.nome] = novaUrl;
    salvarEstado(est);
  }

  function criarCardGaleria(item) {
    const card = document.createElement('article');
    card.className = 'card-galeria-admin';
    const ok = Boolean(item.url);
    const ehUpload = item.url.startsWith('data:');
    const nomeEsc = escaparHtml(item.nome);
    const urlEsc = escaparHtml(item.url);
    const midia = ok
      ? `<img src="${urlEsc}" alt="${nomeEsc}" loading="lazy">`
      : `<div class="card-galeria-placeholder">Sem ilustração cadastrada para<br><strong>${nomeEsc}</strong></div>`;
    const placeholder = ehUpload ? 'Imagem enviada via upload (cole URL para substituir)' : 'Cole o link (URL) ou faça upload...';
    card.innerHTML = `<div class="card-galeria-midia"><span class="tag-categoria-card">${ROTULOS_CAT[item.categoria]}</span>
      <span class="tag-status-imagem ${ok ? 'com-foto' : 'sem-foto'}">${ok ? 'Com Imagem' : 'Sem Imagem'}</span>${midia}</div>
      <div class="card-galeria-corpo"><h3 class="card-galeria-titulo">${nomeEsc}</h3>
      <input type="text" class="input-admin campo-url-card" placeholder="${placeholder}" value="${ehUpload ? '' : urlEsc}">
      <div class="card-galeria-acoes"><button type="button" class="btn-primario-admin btn-salvar-img">Salvar Link</button>
      <button type="button" class="btn-secundario-admin btn-upload-img">📁 Upload</button>
      <button type="button" class="btn-secundario-admin btn-posicionar-img">🎯 Posicionar</button>
      <button type="button" class="btn-perigo-admin btn-limpar-img">Limpar</button></div></div>`;
    if (ok) aplicarEstiloImg(card.querySelector('.card-galeria-midia img'), item.posicao);
    card.querySelector('.btn-salvar-img').addEventListener('click', () => {
      const nova = card.querySelector('.campo-url-card').value.trim();
      if (!nova) { avisar('Cole uma URL ou use Limpar para remover a imagem.', 'aviso'); return; }
      definirImagemItem(item, nova);
      avisar(`Imagem de "${item.nome}" salva!`);
    });
    card.querySelector('.btn-upload-img').addEventListener('click', () => { alvoUpload = item; $('upload-imagem-card').click(); });
    card.querySelector('.btn-posicionar-img').addEventListener('click', () => {
      const urlAlvo = card.querySelector('.campo-url-card').value.trim() || item.url;
      if (!urlAlvo) { avisar('Cole uma URL ou faça upload de uma imagem antes de posicionar.', 'aviso'); return; }
      raiz.ForjaAdminImagem?.abrirEditorPosicao({
        categoria: item.categoria,
        nome: item.nome,
        rotuloCategoria: ROTULOS_CAT[item.categoria],
        url: urlAlvo,
        posicaoInicial: item.posicao,
        aoSalvar: pos => {
          definirImagemItem(item, urlAlvo, pos);
          avisar(`Posição da imagem de "${item.nome}" salva!`);
        },
      });
    });
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

  const comprimirParaWebP = arquivo => raiz.ForjaAdminImagem.comprimirParaWebP(arquivo);

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
    const opts = lista => lista.map(v => `<option value="${escaparHtml(v)}">${escaparHtml(v)}</option>`).join('');
    if ($('subraca-pai')) $('subraca-pai').innerHTML = opts(Object.keys(bancoDnD.racas || {}));
    if ($('subclasse-pai')) $('subclasse-pai').innerHTML = opts(Object.keys(bancoDnD.classes || {}));
    const p1 = $('antecedente-pericia-1'), p2 = $('antecedente-pericia-2'), pers = Object.keys(bancoDnD.pericias || {});
    if (p1 && p2 && !p1.options.length) {
      p1.innerHTML = p2.innerHTML = opts(pers);
      if (pers[1]) p2.value = pers[1];
    }
  }

  function criarItemLista(titulo, sub, aoEd, aoEx) {
    const div = document.createElement('div');
    div.className = 'item-registro-admin';
    div.innerHTML = `<div><strong>${escaparHtml(titulo)}</strong><small>${escaparHtml(sub)}</small></div><div class="card-galeria-acoes"></div>`;
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

  function removerDaMemoria(col, nome, anterior) {
    if (IMAGENS_CAT.includes(col)) {
      delete ForjaOpcoes.imagensOrigem?.[col]?.[nome];
      delete ForjaOpcoes.posicoesOrigem?.[col]?.[nome];
    }
    const acoes = {
      racas: () => !PHB_RACAS.has(nome) && delete bancoDnD.racas[nome],
      subracas: () => anterior?.racaPai && delete bancoDnD.racas[anterior.racaPai]?.subracas?.[nome],
      classes: () => { if (!PHB_CLASSES.has(nome)) { delete bancoDnD.classes[nome]; delete ForjaClasses.classes[nome]; } },
      subclasses: () => {
        const pai = anterior?.classePai && bancoDnD.classes[anterior.classePai];
        if (pai) pai.subclasses = (pai.subclasses || []).filter(s => s !== nome);
        if (anterior?.classePai) delete ForjaClasses.classes[anterior.classePai]?.subclasses?.[nome];
      },
      talentos: () => {
        const mapa = typeof talentos !== 'undefined' ? talentos : raiz.talentos;
        if (mapa?.[nome]?.referencia?.livro === 'Customizado') delete mapa[nome];
      },
      antecedentes: () => bancoDnD.antecedentes?.[nome]?.customizado && delete bancoDnD.antecedentes[nome],
    };
    acoes[col]?.();
  }

  function excluir(col, nome) {
    const est = lerEstado();
    const anterior = est[col][nome];
    delete est[col][nome];
    adicionarTombstone(est.removidos, col, nome);
    if (IMAGENS_CAT.includes(col)) {
      delete est.imagens[col][nome];
      delete est.posicoesImagens?.[col]?.[nome];
      adicionarTombstone(est.removidos.imagens, col, nome);
    }
    removerDaMemoria(col, nome, anterior);
    salvarEstado(est);
    avisar(`"${nome}" removido do catálogo customizado.`, 'aviso');
  }

  const definirCampos = mapa => Object.entries(mapa).forEach(([id, v]) => { if ($(id)) $(id).value = v ?? ''; });
  const focarFormulario = idCampo => { $(idCampo)?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' }); $(idCampo)?.focus(); };
  const preencherCampoImagem = (idCampo, est, cat, nome) => {
    const el = $(idCampo); if (!el) return;
    const url = est.imagens[cat]?.[nome] || est[cat]?.[nome]?.imagem || '';
    if (url.startsWith('data:')) { el.value = ''; el.dataset.placeholderOriginal ??= el.placeholder; el.placeholder = 'Imagem enviada via upload (mantida ao salvar)'; }
    else el.value = url;
  };
  const restaurarPlaceholderImagem = form => form.querySelectorAll('[data-placeholder-original]').forEach(el => { el.placeholder = el.dataset.placeholderOriginal; });

  function editarRacaOuSubraca(ehSub, nome, d) {
    const est = lerEstado(), habs = (d.caracteristicas || []).map(c => `${c}: ${d.descricoesCaracteristicas?.[c] || ''}`).join('\n');
    const cat = ehSub ? 'subracas' : 'racas';
    posicoesForm[cat] = est.posicoesImagens?.[cat]?.[nome] || d.posicaoImagem || null;
    if (ehSub) {
      definirCampos({ 'subraca-pai': d.racaPai, 'subraca-nome': nome, 'subraca-descricao': d.descricao, 'subraca-habilidades': habs });
      preencherCampoImagem('subraca-imagem', est, 'subracas', nome); preencherBonus('subraca', d.bonusAtributos); focarFormulario('subraca-nome');
    } else {
      definirCampos({ 'raca-nome': nome, 'raca-deslocamento': d.deslocamento || 9, 'raca-descricao': d.descricao, 'raca-idiomas': (d.idiomas || ['Comum']).join(', '), 'raca-habilidades': habs });
      preencherCampoImagem('raca-imagem', est, 'racas', nome); preencherBonus('raca', d.bonusAtributos); focarFormulario('raca-nome');
    }
  }

  function editarClasseOuSubclasse(ehSub, nome, d) {
    const est = lerEstado(), habs = (d.caracteristicas || []).map(c => `${c.nivel} | ${c.nome} | ${c.descricao}`).join('\n');
    const cat = ehSub ? 'subclasses' : 'classes';
    posicoesForm[cat] = est.posicoesImagens?.[cat]?.[nome] || d.posicaoImagem || null;
    if (ehSub) {
      definirCampos({ 'subclasse-pai': d.classePai, 'subclasse-nome': nome, 'subclasse-descricao': d.descricao, 'subclasse-habilidades': habs });
      preencherCampoImagem('subclasse-imagem', est, 'subclasses', nome); focarFormulario('subclasse-nome');
    } else {
      const s = d.proficienciasSalvaguarda || [];
      definirCampos({ 'classe-nome': nome, 'classe-dado-vida': d.dadoVida || 8, 'classe-descricao': d.descricao, 'classe-salva-1': s[0] || 'constituicao', 'classe-salva-2': s[1] || 'inteligencia', 'classe-pericias-qtd': d.periciasQuantidade || 2, 'classe-habilidades': habs });
      preencherCampoImagem('classe-imagem', est, 'classes', nome); focarFormulario('classe-nome');
    }
  }

  function editarTalento(nome, d) {
    definirCampos({ 'talento-nome': nome, 'talento-prereq': d.preRequisitos || '', 'talento-beneficios': d.beneficios || '' });
    focarFormulario('talento-nome');
  }

  function editarAntecedente(nome, d) {
    const pers = d.pericias || [];
    definirCampos({ 'antecedente-nome': nome, 'antecedente-pericia-1': pers[0] || '', 'antecedente-pericia-2': pers[1] || '', 'antecedente-habilidade': d.habilidade || '', 'antecedente-idiomas': d.idiomasEscolha || 0, 'antecedente-descricao': d.descricaoHabilidade || '' });
    focarFormulario('antecedente-nome');
  }

  function renderizarListasCustom(est) {
    const r = $('lista-racas-custom'), c = $('lista-classes-custom'), t = $('lista-talentos-custom');
    if (r) r.replaceChildren(
      ...Object.entries(est.racas).map(([n, d]) => criarItemLista(`Raça: ${n}`, d.descricao || '', () => editarRacaOuSubraca(false, n, d), () => excluir('racas', n))),
      ...Object.entries(est.subracas).map(([n, d]) => criarItemLista(`Sub-raça: ${n} (${d.racaPai})`, d.descricao || '', () => editarRacaOuSubraca(true, n, d), () => excluir('subracas', n)))
    );
    if (c) c.replaceChildren(
      ...Object.entries(est.classes).map(([n, d]) => criarItemLista(`Classe: ${n} (d${d.dadoVida})`, d.descricao || '', () => editarClasseOuSubclasse(false, n, d), () => excluir('classes', n))),
      ...Object.entries(est.subclasses).map(([n, d]) => criarItemLista(`Subclasse: ${n} (${d.classePai})`, d.descricao || '', () => editarClasseOuSubclasse(true, n, d), () => excluir('subclasses', n)))
    );
    if (t) t.replaceChildren(
      ...Object.entries(est.talentos).map(([n, d]) => criarItemLista(`Talento: ${n}`, d.beneficios || '', () => editarTalento(n, d), () => excluir('talentos', n))),
      ...Object.entries(est.antecedentes).map(([n, d]) => criarItemLista(`Antecedente: ${n}`, `${(d.pericias || []).join(', ')} • ${d.habilidade || ''}`, () => editarAntecedente(n, d), () => excluir('antecedentes', n)))
    );
  }

  function gravarImagemFormulario(est, cat, nome, textoUrl) {
    const prev = est.imagens[cat][nome] || est[cat][nome]?.imagem || '';
    const final = textoUrl || (prev.startsWith('data:') ? prev : '');
    if (final) { est.imagens[cat][nome] = final; removerTombstone(est.removidos.imagens, cat, nome); }
    else { delete est.imagens[cat][nome]; if (prev) adicionarTombstone(est.removidos.imagens, cat, nome); }
    return final;
  }

  function gravarPosicaoFormulario(est, cat, nome, temImagem) {
    est.posicoesImagens ??= { racas: {}, subracas: {}, classes: {}, subclasses: {} };
    if (!temImagem) {
      delete est.posicoesImagens[cat][nome];
      if (ForjaOpcoes.imagensOrigem?.[cat]) ForjaOpcoes.imagensOrigem[cat][nome] = '';
      delete ForjaOpcoes.posicoesOrigem?.[cat]?.[nome];
      posicoesForm[cat] = null;
      return null;
    }
    const pos = posicoesForm[cat] || est.posicoesImagens[cat][nome] || est[cat]?.[nome]?.posicaoImagem || null;
    posicoesForm[cat] = null;
    if (!pos) return null;
    const norm = normalizarPosicao(pos);
    est.posicoesImagens[cat][nome] = norm;
    ForjaOpcoes.posicoesOrigem ??= {};
    ForjaOpcoes.posicoesOrigem[cat] ??= {};
    ForjaOpcoes.posicoesOrigem[cat][nome] = norm;
    return norm;
  }

  function vincularPosicaoFormularios() {
    document.querySelectorAll('.btn-posicionar-form').forEach(btn => btn.addEventListener('click', () => {
      const { cat, nomeId, urlId } = btn.dataset;
      const nome = val(nomeId);
      const est = lerEstado();
      const urlAlvo = val(urlId) || (nome ? (est.imagens[cat]?.[nome] || est[cat]?.[nome]?.imagem || '') : '');
      if (!urlAlvo) { avisar('Cole uma URL ou envie a imagem pela Galeria antes de posicionar.', 'aviso'); return; }
      const inicial = posicoesForm[cat] || (nome ? (est.posicoesImagens?.[cat]?.[nome] || est[cat]?.[nome]?.posicaoImagem) : null) || normalizarPosicao();
      raiz.ForjaAdminImagem?.abrirEditorPosicao({
        categoria: cat,
        nome,
        rotuloCategoria: ROTULOS_CAT[cat],
        url: urlAlvo,
        posicaoInicial: inicial,
        aoSalvar: pos => {
          posicoesForm[cat] = pos;
          avisar('Posição da imagem ajustada! Clique em Salvar para gravar.');
        },
      });
    }));
  }

  function vincularSubmissoes() {
    document.querySelectorAll('form.card-admin-form').forEach(f => f.addEventListener('reset', () => {
      restaurarPlaceholderImagem(f);
      if (FORM_POR_CAT[f.id]) posicoesForm[FORM_POR_CAT[f.id]] = null;
    }));
    vincularPosicaoFormularios();
    $('form-raca')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('raca-nome'), est = lerEstado(); if (!n) return;
      const imagem = gravarImagemFormulario(est, 'racas', n, val('raca-imagem'));
      const posicaoImagem = gravarPosicaoFormulario(est, 'racas', n, imagem);
      removerTombstone(est.removidos, 'racas', n);
      est.racas[n] = { descricao: val('raca-descricao'), deslocamento: Number(val('raca-deslocamento')) || 9, bonusAtributos: lerBonus('raca'), idiomas: val('raca-idiomas').split(',').map(s => s.trim()).filter(Boolean), ...parsearHabsRaciais(val('raca-habilidades')), imagem, ...(posicaoImagem ? { posicaoImagem } : {}) };
      salvarEstado(est); ev.target.reset(); avisar(`Raça "${n}" cadastrada!`);
    });
    $('form-subraca')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('subraca-nome'), pai = val('subraca-pai'), est = lerEstado(); if (!n || !pai) return;
      const imagem = gravarImagemFormulario(est, 'subracas', n, val('subraca-imagem'));
      const posicaoImagem = gravarPosicaoFormulario(est, 'subracas', n, imagem);
      removerTombstone(est.removidos, 'subracas', n);
      est.subracas[n] = { racaPai: pai, descricao: val('subraca-descricao'), bonusAtributos: lerBonus('subraca'), ...parsearHabsRaciais(val('subraca-habilidades')), imagem, ...(posicaoImagem ? { posicaoImagem } : {}) };
      salvarEstado(est); ev.target.reset(); avisar(`Sub-raça "${n}" salva!`);
    });
    $('form-classe')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('classe-nome'), est = lerEstado(); if (!n) return;
      const imagem = gravarImagemFormulario(est, 'classes', n, val('classe-imagem'));
      const posicaoImagem = gravarPosicaoFormulario(est, 'classes', n, imagem);
      removerTombstone(est.removidos, 'classes', n);
      est.classes[n] = { descricao: val('classe-descricao'), dadoVida: Number(val('classe-dado-vida')) || 8, proficienciasSalvaguarda: [val('classe-salva-1'), val('classe-salva-2')], periciasQuantidade: Number(val('classe-pericias-qtd')) || 2, caracteristicas: parsearHabsNivel(val('classe-habilidades'), `classe-${n}`), imagem, ...(posicaoImagem ? { posicaoImagem } : {}) };
      salvarEstado(est); ev.target.reset(); avisar(`Classe "${n}" salva!`);
    });
    $('form-subclasse')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('subclasse-nome'), pai = val('subclasse-pai'), est = lerEstado(); if (!n || !pai) return;
      const imagem = gravarImagemFormulario(est, 'subclasses', n, val('subclasse-imagem'));
      const posicaoImagem = gravarPosicaoFormulario(est, 'subclasses', n, imagem);
      removerTombstone(est.removidos, 'subclasses', n);
      est.subclasses[n] = { classePai: pai, descricao: val('subclasse-descricao'), caracteristicas: parsearHabsNivel(val('subclasse-habilidades'), `sub-${n}`), imagem, ...(posicaoImagem ? { posicaoImagem } : {}) };
      salvarEstado(est); ev.target.reset(); avisar(`Subclasse "${n}" salva!`);
    });
    $('form-talento')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('talento-nome'), est = lerEstado(); if (!n) return;
      removerTombstone(est.removidos, 'talentos', n);
      est.talentos[n] = { id: 'talento-' + ForjaCatalogo.id(n), preRequisitos: val('talento-prereq'), beneficios: val('talento-beneficios') };
      salvarEstado(est); ev.target.reset(); avisar(`Talento "${n}" salvo!`);
    });
    $('form-antecedente')?.addEventListener('submit', ev => {
      ev.preventDefault(); const n = val('antecedente-nome'), est = lerEstado(); if (!n) return;
      removerTombstone(est.removidos, 'antecedentes', n);
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
    $('btn-publicar-admin')?.addEventListener('click', () => {
      raiz.ForjaPublicador?.abrirModalPublicacao(lerEstado, avisar, estadoLimpo => {
        ForjaOpcoes.posicoesOrigem = { racas: {}, subracas: {}, classes: {}, subclasses: {} };
        raiz.localStorage?.setItem(CHAVE, JSON.stringify({ ...estadoLimpo, removidos: criarRemovidosVazio() }));
        raiz.ForjaCatalogo?.aplicarCustomizacoes?.(bancoDnD, ForjaOpcoes, ForjaClasses);
        atualizarTudo();
      });
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
      const antes = lerEstado(), glob = raiz.ForjaCustomCatalogo || {};
      raiz.localStorage?.removeItem(CHAVE);
      for (const col of COLECOES) for (const n of Object.keys(antes[col] || {})) if (!glob[col]?.[n]) removerDaMemoria(col, n, antes[col][n]);
      for (const cat of IMAGENS_CAT) {
        if (ForjaOpcoes.imagensOrigem?.[cat]) {
          for (const n of Object.keys(ForjaOpcoes.imagensOrigem[cat])) if (!glob.imagens?.[cat]?.[n]) ForjaOpcoes.imagensOrigem[cat][n] = '';
        }
        if (ForjaOpcoes.posicoesOrigem) ForjaOpcoes.posicoesOrigem[cat] = {};
      }
      raiz.ForjaCatalogo?.aplicarCustomizacoes?.(bancoDnD, ForjaOpcoes, ForjaClasses);
      atualizarTudo();
      avisar('Customizações locais limpas.', 'aviso');
    });
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => { iniciarControles(); vincularSubmissoes(); atualizarTudo(); });
  }
})(globalThis);
