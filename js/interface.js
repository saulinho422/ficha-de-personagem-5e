/* Integra as três páginas, escolhas assistidas e ações de sessão. */
const ForjaInterface = (() => {
'use strict';
const R=ForjaRegras, F=ForjaCampanha, O=ForjaOpcoes, A=ForjaAuxiliares;
const $=id=>document.getElementById(id);
let executando=false,temporizadorSalvar,ultimoUsoItem=null,focoDialogo=null,focoDialogoId='',exibindoHub=false,dialogoAtual='',ganhosPVNivel=null,parteOrigem=1,promptInstalacao=null;
const criacao=ForjaCriacao.criar({contexto:()=>contexto(),detalhes:()=>detalhesFicha,el,campo,botao,aplicar:()=>aplicar(),salvar:()=>salvar()});
const midia=ForjaMidia.criar({detalhes:()=>detalhesFicha,el,botao,salvar:()=>salvar(),atualizar:()=>midia.preencher()});
const historia=ForjaHistoria.criar({contexto:()=>contexto(),detalhes:()=>detalhesFicha,campos:()=>camposHistoria,el,campo,botao,midia,salvar:()=>salvar(),tabelasPersonalidade,sugerirFisico});
function el(tag,attrs={},...filhos){const n=document.createElement(tag);for(const [k,v]of Object.entries(attrs)){if(k==='text')n.textContent=v;else if(k.startsWith('on'))n.addEventListener(k.slice(2),v);else if(k==='class')n.className=v;else if(k==='checked'||k==='disabled'||k==='hidden')n[k]=!!v;else n.setAttribute(k,String(v));}for(const f of filhos.flat(Infinity))if(f!==null&&f!==undefined)n.append(typeof f==='string'?document.createTextNode(f):f);return n;}
function botao(text,acao,attrs={}){return el('button',{type:'button',class:'btn-secundario',onclick:()=>tentar(acao),...attrs},text);}
function icone(nome){const caminhos={fechar:'m6 6 12 12M18 6 6 18',lixeira:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',arquivo:'M14 3H5v18h14V8zM14 3v5h5M8 13h8M8 17h5',baixar:'M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5',enviar:'M12 16V4m-4 4 4-4 4 4M4 17v4h16v-4',voltar:'m14 5-7 7 7 7',mais:'M12 5v14M5 12h14',restaurar:'M4 10a8 8 0 1 1 1 8M4 4v6h6',menu:'M5 6h14M5 12h14M5 18h14'};const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');for(const [k,v]of Object.entries({viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'1.8','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true',class:'forja-icone'}))svg.setAttribute(k,v);const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',caminhos[nome]||caminhos.arquivo);svg.append(path);return svg;}
function acoesDialogo(principal){return el('div',{class:'forja-dialogo-acoes'},botao('Cancelar',fecharDialogo),principal);}
function tentar(fn){try{return fn();}catch(e){mostrarToast(e.message,'aviso');}}
function contexto(){return {...contextoDaFicha(),recursos:recursosPersonagem,inventario:inventarioPersonagem,equipamento:equipamentoPersonagem};}
function salvar(){clearTimeout(temporizadorSalvar);temporizadorSalvar=setTimeout(salvarEstado,180);}
function aplicar(){if(executando)return;recalcularFicha();}
function campo(nome,id,valor,acao,{tipo='text',opcoes=null,area=false,...attrs}={}){const entrada=opcoes?el('select',{id,...attrs},opcoes.map(x=>{const [v,t]=Array.isArray(x)?x:[x,x];return el('option',{value:v},t);})):el(area?'textarea':'input',{id,...(!area?{type:tipo}:{}),...attrs});entrada.value=valor??'';entrada.addEventListener(!opcoes&&(area||tipo==='text')?'input':'change',()=>tentar(()=>acao(entrada.value)));return el('label',{class:'forja-campo',for:id},el('span',{},nome),entrada);}
function painel(titulo,id=null){const n=el('section',{class:'forja-card',...(id?{id}:{})},el('h3',{},titulo));return n;}
function limpar(id){const n=$(id);if(n)n.replaceChildren();return n;}
function detalhes(titulo,...conteudo){return el('details',{class:'forja-detalhes'},el('summary',{},titulo),...conteudo);}
function notificacao(mensagem){$('forja-mensagem').textContent=mensagem;mostrarToast(mensagem,'sucesso');}

const NOMES_ATRIBUTOS={forca:'Força',destreza:'Destreza',constituicao:'Constituição',inteligencia:'Inteligência',sabedoria:'Sabedoria',carisma:'Carisma',for:'Força',des:'Destreza',con:'Constituição',int:'Inteligência',sab:'Sabedoria',car:'Carisma'};
function formatarBonusRaca(nome,dado){
 if(nome==='Humano')return ['+1 em todos os atributos','Opção Humano Variante (+1 em 2 atributos + Talento)'];
 if(nome==='Humano Variante')return ['+1 em dois atributos à escolha','1 Perícia à escolha','1 Talento no 1º nível'];
 const res=Object.entries(dado?.bonusAtributos||{}).map(([k,v])=>'+'+v+' '+(NOMES_ATRIBUTOS[k]||k));
 if(nome==='Meio-Elfo')res.push('+1 em outros dois atributos');
 return res;
}
function quadroArteOrigem(categoria,nome,subtitulo=''){
 const url=O.imagensOrigem?.[categoria]?.[nome]||'';
 const wrap=el('div',{class:'forja-origem-card-midia'+(url?' com-imagem':'')});
 if(url)wrap.append(el('img',{src:url,alt:nome,class:'forja-origem-card-img',loading:'lazy'}));
 else wrap.append(el('div',{class:'forja-origem-card-placeholder','aria-hidden':'true'},el('span',{class:'forja-origem-emblema'},'✦'),el('small',{},'Espaço reservado para arte')));
 if(subtitulo)wrap.append(el('span',{class:'forja-origem-card-tag'},subtitulo));
 return wrap;
}
function perguntarHumanoVariante(){
 const corpo=el('div',{class:'forja-confirmacao forja-modal-humano-variante'},
  el('p',{class:'forja-dialogo-descricao'},'Você escolheu a raça Humano. Deseja ativar a regra opcional de Humano Variante do Livro do Jogador?'),
  el('div',{class:'forja-variante-comparacao'},
   el('div',{class:'forja-variante-opcao'},el('strong',{},'Humano Variante (Sim)'),el('p',{},'Recebe +1 em dois atributos à escolha, proficiência em 1 perícia adicional e 1 talento já no 1º nível.')),
   el('div',{class:'forja-variante-opcao'},el('strong',{},'Humano Padrão (Não)'),el('p',{},'Recebe +1 em todos os seis atributos (Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma).'))
  ),
  el('div',{class:'forja-dialogo-acoes'},
   botao('Não, usar Humano padrão',()=>{
    detalhesFicha.opcoes.humanoVariante=false;
    $('select-raca').value='Humano';
    $('select-raca').dispatchEvent(new Event('change',{bubbles:true}));
    fecharDialogo();
    if($('select-classe').value)parteOrigem=2;
    aplicar();
   }),
   botao('Sim, ativar Humano Variante',()=>{
    detalhesFicha.opcoes.humanoVariante=true;
    $('select-raca').value='Humano Variante';
    $('select-raca').dispatchEvent(new Event('change',{bubbles:true}));
    fecharDialogo();
    if($('select-classe').value)parteOrigem=2;
    aplicar();
   },{class:'btn-secundario forja-acao-principal'})
  )
 );
 abrirDialogo('Ativar Humano Variante?',corpo,'humano-variante');
}
function selecionarOrigem(tipo,valor){
 if(tipo==='raca'){
  if(valor==='Humano'){
   detalhesFicha.opcoes.humanoVariante=false;
   $('select-raca').value='Humano';
   $('select-raca').dispatchEvent(new Event('change',{bubbles:true}));
   fecharDialogo();
   perguntarHumanoVariante();
   return;
  }
  detalhesFicha.opcoes.humanoVariante=false;
  $('select-raca').value=valor;
  $('select-raca').dispatchEvent(new Event('change',{bubbles:true}));
  fecharDialogo();
  if($('select-classe').value)parteOrigem=2;
  aplicar();
  return;
 }
 if(tipo==='classe'){
  $('select-classe').value=valor;
  $('select-classe').dispatchEvent(new Event('change',{bubbles:true}));
  fecharDialogo();
  if($('select-raca').value)parteOrigem=2;
  aplicar();
  return;
 }
 if(tipo==='subraca'){
  const radio=document.querySelector('input[name="usar-subraca"][value="'+(valor?'sim':'nao')+'"]');
  if(radio){radio.checked=true;radio.dispatchEvent(new Event('change',{bubbles:true}));}
  $('select-subraca').value=valor;
  $('select-subraca').dispatchEvent(new Event('change',{bubbles:true}));
  fecharDialogo();
  aplicar();
  return;
 }
 if(tipo==='subclasse'){
  $('select-subclasse').value=valor;
  $('select-subclasse').dispatchEvent(new Event('change',{bubbles:true}));
  fecharDialogo();
  aplicar();
 }
}
function montarCardCatalogoRaca(nome,dado,atual,ehSubraca=false){
 const bonus=formatarBonusRaca(nome,dado);
 const tracos=(dado.caracteristicas||[]).map(t=>el('div',{class:'forja-origem-traco-item'},el('strong',{},t),el('span',{},dado.descricoesCaracteristicas?.[t]||'')));
 const pills=el('div',{class:'forja-origem-pills'},...bonus.map(b=>el('span',{class:'forja-origem-pill destaque'},b)));
 if(dado.deslocamento)pills.append(el('span',{class:'forja-origem-pill'},'Deslocamento '+dado.deslocamento+' m'));
 if(dado.idiomas?.length)pills.append(el('span',{class:'forja-origem-pill'},'Idiomas: '+dado.idiomas.join(', ')));
 const desc=ehSubraca?(O.descricoesSubracas?.[nome]||dado.descricao||'Linhagem ancestral.'):(dado.descricao||'');
 const btn=botao(atual===nome?'✓ Selecionado: '+nome:'Escolher '+nome,()=>selecionarOrigem(ehSubraca?'subraca':'raca',nome),{class:'btn-secundario forja-acao-principal forja-origem-card-btn',role:'option','aria-label':nome,'aria-selected':String(atual===nome)});
 return el('article',{class:'forja-origem-catalogo-card'+(atual===nome?' selecionado':'')},
  quadroArteOrigem(ehSubraca?'subracas':'racas',nome,ehSubraca?'Sub-raça':'Raça'),
  el('div',{class:'forja-origem-card-corpo'},
   el('h3',{},nome),
   el('p',{class:'forja-origem-card-desc'},desc),
   pills,
   tracos.length?el('div',{class:'forja-origem-tracos-lista'},el('small',{class:'forja-origem-subtitulo'},'Atributos e habilidades'),...tracos):null,
   btn
  )
 );
}
function montarCardCatalogoClasse(nome,dado,atual){
 const salvas=(dado.proficienciasSalvaguarda||[]).map(s=>NOMES_ATRIBUTOS[s]||s).join(' e ');
 const btn=botao(atual===nome?'✓ Selecionado: '+nome:'Escolher '+nome,()=>selecionarOrigem('classe',nome),{class:'btn-secundario forja-acao-principal forja-origem-card-btn',role:'option','aria-label':nome,'aria-selected':String(atual===nome)});
 return el('article',{class:'forja-origem-catalogo-card'+(atual===nome?' selecionado':'')},
  quadroArteOrigem('classes',nome,'Classe · d'+dado.dadoVida),
  el('div',{class:'forja-origem-card-corpo'},
   el('h3',{},nome),
   el('p',{class:'forja-origem-card-desc'},O.descricoesClasses?.[nome]||'Vocação heroica de combate e aventura.'),
   el('div',{class:'forja-classe-metricas'},
    el('div',{class:'forja-classe-metrica'},el('small',{},'Dado de Vida'),el('strong',{},'d'+dado.dadoVida)),
    el('div',{class:'forja-classe-metrica'},el('small',{},'Salvaguardas'),el('strong',{},salvas))
   ),
   btn
  )
 );
}
function montarCardCatalogoSubclasse(nome,classe,atual){
 const nv=R.nivelSubclasse(classe);
 const btn=botao(atual===nome?'✓ Selecionado: '+nome:'Escolher '+nome,()=>selecionarOrigem('subclasse',nome),{class:'btn-secundario forja-acao-principal forja-origem-card-btn',role:'option','aria-label':nome,'aria-selected':String(atual===nome)});
 return el('article',{class:'forja-origem-catalogo-card'+(atual===nome?' selecionado':'')},
  quadroArteOrigem('subclasses',nome,classe+' · Nível '+nv),
  el('div',{class:'forja-origem-card-corpo'},
   el('h3',{},nome),
   el('p',{class:'forja-origem-card-desc'},O.descricoesSubclasses?.[nome]||('Especialização de '+classe+' disponível a partir do '+nv+'º nível.')),
   btn
  )
 );
}
function abrirCatalogoOrigem(tipo){
 const c=contexto(),racaBase=c.raca==='Humano Variante'?'Humano':c.raca;
 const titulos={raca:'Catálogo de Raças',classe:'Catálogo de Classes',subraca:'Sub-raças de '+(racaBase||'sua raça'),subclasse:'Subclasses de '+(c.classe||'sua classe')};
 const wrap=el('div',{class:'forja-catalogo-origem-modal forja-seletor-dialogo'});
 const busca=el('input',{type:'search',class:'forja-seletor-busca','aria-label':'Buscar opções',placeholder:'Pesquisar no catálogo...'});
 const grade=el('div',{class:'forja-catalogo-origem-grade',role:'listbox','aria-label':titulos[tipo]});
 const renderLista=()=>{
  grade.replaceChildren();
  const termo=R.normalizar(busca.value);
  if(tipo==='raca'){
   for(const [nome,dado]of Object.entries(bancoDnD.racas)){
    if(nome==='Humano Variante')continue;
    const textoBusca=R.normalizar(nome+' '+(dado.descricao||'')+' '+(dado.caracteristicas||[]).join(' '));
    if(termo&&!textoBusca.includes(termo))continue;
    grade.append(montarCardCatalogoRaca(nome,dado,racaBase,false));
   }
  }else if(tipo==='classe'){
   for(const [nome,dado]of Object.entries(bancoDnD.classes)){
    const textoBusca=R.normalizar(nome+' '+(O.descricoesClasses?.[nome]||''));
    if(termo&&!textoBusca.includes(termo))continue;
    grade.append(montarCardCatalogoClasse(nome,dado,c.classe));
   }
  }else if(tipo==='subraca'){
   const subs=bancoDnD.racas[racaBase]?.subracas||{};
   for(const [nome,dado]of Object.entries(subs)){
    const textoBusca=R.normalizar(nome+' '+(O.descricoesSubracas?.[nome]||'')+' '+(dado.caracteristicas||[]).join(' '));
    if(termo&&!textoBusca.includes(termo))continue;
    grade.append(montarCardCatalogoRaca(nome,dado,c.subraca,true));
   }
  }else if(tipo==='subclasse'){
   for(const nome of (bancoDnD.classes[c.classe]?.subclasses||[])){
    const textoBusca=R.normalizar(nome+' '+(O.descricoesSubclasses?.[nome]||''));
    if(termo&&!textoBusca.includes(termo))continue;
    grade.append(montarCardCatalogoSubclasse(nome,c.classe,c.subclasse));
   }
  }
  if(!grade.children.length)grade.append(el('p',{class:'forja-nota'},'Nenhuma opção encontrada para a pesquisa.'));
  ForjaTransicoes.staggerCards?.(grade);
 };
 busca.addEventListener('input',renderLista);
 wrap.append(busca);
 if(tipo==='subraca')wrap.append(el('div',{class:'forja-catalogo-subraca-topo'},el('span',{class:'forja-nota'},'A sub-raça é opcional. Você pode escolher uma linhagem abaixo ou seguir apenas com a raça base.'),botao('Manter sem sub-raça',()=>selecionarOrigem('subraca',''))));
 wrap.append(grade);
 renderLista();
 abrirDialogo(titulos[tipo],wrap,'catalogo-origem');
 busca.focus();
}
function renderOrigem(){
 const palco=limpar('forja-origem-palco');if(!palco)return;
 const c=contexto(),racaBase=c.raca==='Humano Variante'?'Humano':c.raca;
 const temRacaClasse=!!(c.raca&&c.classe);
 if(!temRacaClasse)parteOrigem=1;
 const nav=el('div',{class:'forja-origem-etapas',role:'tablist','aria-label':'Partes de origem e treinamento'},
  botao('1. Raça e Classe',()=>{parteOrigem=1;renderOrigem();},{class:'forja-origem-etapa-btn'+(parteOrigem===1?' ativo':''),'aria-selected':String(parteOrigem===1)}),
  botao('2. Sub-raça e Subclasse',()=>{if(!temRacaClasse){mostrarToast('Escolha primeiro a raça e a classe.');return;}parteOrigem=2;renderOrigem();},{class:'forja-origem-etapa-btn'+(parteOrigem===2?' ativo':''),'aria-selected':String(parteOrigem===2),disabled:!temRacaClasse})
 );
 palco.append(nav);
 const grade=el('div',{class:'forja-origem-dupla'});
 if(parteOrigem===1){
  const dadoRaca=bancoDnD.racas[c.raca];
  const cardRaca=el('article',{class:'forja-origem-escolha-card'+(c.raca?' preenchido':'')},
   quadroArteOrigem('racas',c.raca||racaBase,'Parte 1 · Raça'),
   el('div',{class:'forja-origem-card-corpo'},
    el('span',{class:'forja-origem-kicker'},c.raca?'Raça selecionada':'Ancestralidade'),
    el('h4',{},c.raca==='Humano Variante'?'Humano (Variante)':(c.raca||'Escolha sua Raça')),
    el('p',{},dadoRaca?dadoRaca.descricao:'Clique para abrir o catálogo de raças com descrição, bônus de atributos e habilidades raciais.'),
    dadoRaca?el('div',{class:'forja-origem-pills'},...formatarBonusRaca(c.raca,dadoRaca).map(b=>el('span',{class:'forja-origem-pill destaque'},b)),el('span',{class:'forja-origem-pill'},(dadoRaca.caracteristicas||[]).length+' habilidades raciais')):null,
    el('div',{class:'forja-origem-card-acoes'},
     botao(c.raca?'Trocar Raça':'Escolher Raça',()=>abrirCatalogoOrigem('raca'),{id:'forja-btn-origem-raca',class:'btn-secundario forja-acao-principal','aria-label':'Escolher Raça: '+(c.raca||'Selecionar')}),
     ['Humano','Humano Variante'].includes(c.raca)?botao(c.raca==='Humano Variante'?'Variante: Ativo':'Ativar Humano Variante?',perguntarHumanoVariante):null
    )
   )
  );
  const dadoClasse=bancoDnD.classes[c.classe];
  const salvas=dadoClasse?(dadoClasse.proficienciasSalvaguarda||[]).map(s=>NOMES_ATRIBUTOS[s]||s).join(' e '):'';
  const cardClasse=el('article',{class:'forja-origem-escolha-card'+(c.classe?' preenchido':'')},
   quadroArteOrigem('classes',c.classe,'Parte 1 · Classe'),
   el('div',{class:'forja-origem-card-corpo'},
    el('span',{class:'forja-origem-kicker'},c.classe?'Classe selecionada':'Vocação de combate e magia'),
    el('h4',{},c.classe||'Escolha sua Classe'),
    el('p',{},c.classe?(O.descricoesClasses?.[c.classe]||''):'Clique para abrir o catálogo de classes com descrição, Dado de Vida e Salvaguardas.'),
    dadoClasse?el('div',{class:'forja-classe-metricas'},
     el('div',{class:'forja-classe-metrica'},el('small',{},'Dado de Vida'),el('strong',{},'d'+dadoClasse.dadoVida)),
     el('div',{class:'forja-classe-metrica'},el('small',{},'Salvaguardas'),el('strong',{},salvas))
    ):null,
    el('div',{class:'forja-origem-card-acoes'},
     botao(c.classe?'Trocar Classe':'Escolher Classe',()=>abrirCatalogoOrigem('classe'),{id:'forja-btn-origem-classe',class:'btn-secundario forja-acao-principal','aria-label':'Escolher Classe: '+(c.classe||'Selecionar')})
    )
   )
  );
  grade.append(cardRaca,cardClasse);
  palco.append(grade);
 }else{
  const subracas=bancoDnD.racas[racaBase]?.subracas||{};
  const temSubracas=Object.keys(subracas).length>0;
  const dadoSub=subracas[c.subraca];
  const cardSubraca=el('article',{class:'forja-origem-escolha-card'+(c.subraca?' preenchido':'')},
   quadroArteOrigem('subracas',c.subraca,'Opcional · Sub-raça'),
   el('div',{class:'forja-origem-card-corpo'},
    el('span',{class:'forja-origem-kicker'},temSubracas?'Linhagem opcional':'Linhagem de '+(c.raca||'sua raça')),
    el('h4',{},c.subraca||(temSubracas?'Sub-raça (Opcional)':['Humano','Humano Variante'].includes(c.raca)?c.raca:'Sem sub-raça adicional')),
    el('p',{},dadoSub?(O.descricoesSubracas?.[c.subraca]||'Sub-raça selecionada.'):temSubracas?'A escolha de sub-raça é totalmente opcional. Clique para ver as sub-raças de '+racaBase+' ou prossiga sem sub-raça.':(['Humano','Humano Variante'].includes(c.raca)?'Humanos não possuem sub-raça, mas contam com a opção de Humano Variante.':'A raça '+c.raca+' possui linhagem única e não requer sub-raça.')),
    dadoSub?el('div',{class:'forja-origem-pills'},...formatarBonusRaca(c.subraca,dadoSub).map(b=>el('span',{class:'forja-origem-pill destaque'},b))):null,
    el('div',{class:'forja-origem-card-acoes'},
     temSubracas?botao(c.subraca?'Trocar Sub-raça':'Escolher Sub-raça',()=>abrirCatalogoOrigem('subraca'),{id:'forja-btn-origem-subraca',class:'btn-secundario forja-acao-principal','aria-label':'Escolher Escolha a sub-raça: '+(c.subraca||'Opcional')}):null,
     temSubracas&&c.subraca?botao('Remover sub-raça',()=>selecionarOrigem('subraca','')):null,
     ['Humano','Humano Variante'].includes(c.raca)?botao('Alterar Humano Variante',perguntarHumanoVariante):null,
     botao('Trocar Raça ('+racaBase+')',()=>{parteOrigem=1;abrirCatalogoOrigem('raca');})
    )
   )
  );
  const nvSub=R.nivelSubclasse(c.classe),liberaSub=c.nivel>=nvSub;
  const cardSubclasse=el('article',{class:'forja-origem-escolha-card'+(c.subclasse?' preenchido':'')},
   quadroArteOrigem('subclasses',c.subclasse,liberaSub?'Obrigatório no nível '+c.nivel:'Disponível no nível '+nvSub),
   el('div',{class:'forja-origem-card-corpo'},
    el('span',{class:'forja-origem-kicker'},liberaSub?'Especialização obrigatória neste nível':'Desbloqueia no '+nvSub+'º nível'),
    el('h4',{},c.subclasse||(liberaSub?'Escolha sua Subclasse':'Subclasse no '+nvSub+'º nível')),
    el('p',{},c.subclasse?(O.descricoesSubclasses?.[c.subclasse]||'Subclasse selecionada.'):liberaSub?'Seu nível atual ('+c.nivel+') já permite escolher uma subclasse de '+c.classe+'. Escolha para avançar.':'No nível '+c.nivel+', sua classe ('+c.classe+') ainda não requer subclasse. Você poderá avançar diretamente.'),
    el('div',{class:'forja-origem-card-acoes'},
     liberaSub?botao(c.subclasse?'Trocar Subclasse':'Escolher Subclasse',()=>abrirCatalogoOrigem('subclasse'),{id:'forja-btn-origem-subclasse',class:'btn-secundario forja-acao-principal','aria-label':'Escolher Subclasse: '+(c.subclasse||'Selecionar')}):null,
     botao('Trocar Classe ('+c.classe+')',()=>{parteOrigem=1;abrirCatalogoOrigem('classe');})
    )
   )
  );
  grade.append(cardSubraca,cardSubclasse);
  palco.append(grade);
 }
 const btnCont=$('btn-continuar-etapa-2');
 if(btnCont)btnCont.textContent=parteOrigem===1?'Ir para Sub-raça e Subclasse':'Continuar';
}
function irParteOrigem(p){parteOrigem=p;renderOrigem();}
function avancarParteOrigem(){if(parteOrigem===1){parteOrigem=2;renderOrigem();return true;}return false;}
function voltarParteOrigem(){if(parteOrigem===2){parteOrigem=1;renderOrigem();return true;}return false;}

function instalarApp(){
 if(!promptInstalacao)return;
 promptInstalacao.prompt?.();
 promptInstalacao.userChoice?.then(r=>{
  if(r?.outcome==='accepted'){promptInstalacao=null;document.querySelectorAll('[data-forja-instalar]').forEach(b=>b.hidden=true);mostrarToast('Aplicativo instalado com sucesso!','sucesso');}
 }).catch(()=>undefined);
}
function iniciar(){
 ForjaCatalogo.aplicarCustomizacoes?.(bancoDnD,O,ForjaClasses);
 detalhesFicha.escolhas.criacaoNova=true;
 if('serviceWorker' in navigator&&(window.location.protocol==='https:'||window.location.hostname==='localhost'||window.location.hostname==='127.0.0.1')){navigator.serviceWorker.register('./sw.js').catch(()=>undefined);}
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptInstalacao=e;document.querySelectorAll('[data-forja-instalar]').forEach(b=>b.hidden=false);});
 window.addEventListener('appinstalled',()=>{promptInstalacao=null;document.querySelectorAll('[data-forja-instalar]').forEach(b=>b.hidden=true);});
 const barra=el('header',{id:'forja-barra',class:'forja-barra'},el('div',{},el('strong',{},'FORJA DE PERSONAGENS'),el('small',{},'D&D 5e • base 2014 + Patrulheiro Revisado')),
 el('nav',{'aria-label':'Gerenciar fichas'},botao('Personagens',mostrarHub),botao('Editar criação',()=>editar(1)),botao('Painel Admin',()=>{window.location.href='admin.html';}),botao('Exportar JSON',exportar),botao('Importar',importar),botao('Imprimir / PDF',imprimir),botao('Instalar app',instalarApp,{'data-forja-instalar':'1',hidden:!promptInstalacao})));
 const hub=el('main',{id:'forja-hub',class:'forja-hub',hidden:true});
 const topoMobile=el('header',{id:'forja-mobile-topo',class:'forja-mobile-topo'},botao('‹',mostrarHub,{'aria-label':'Voltar aos personagens',class:'forja-mobile-voltar'}),el('div',{},el('small',{},'PERSONAGEM ATUAL'),el('strong',{id:'forja-mobile-personagem'},'Forja de Personagens')),botao('•••',()=>abrirDialogo('Ações da ficha',el('div',{class:'forja-acoes-mobile'},botao('Editar criação',()=>{fecharDialogo();editar(1);}),botao('Painel Admin',()=>{window.location.href='admin.html';}),botao('Exportar JSON',exportar),botao('Importar',importar),botao('Imprimir / PDF',imprimir),promptInstalacao?botao('Instalar aplicativo no celular',()=>{fecharDialogo();instalarApp();},{class:'btn-secundario forja-acao-principal'}):null)),{'aria-label':'Mais ações'}));
 const navMobile=el('nav',{id:'forja-mobile-nav',class:'forja-mobile-nav','aria-label':'Navegação do aplicativo'},...['Ficha','História','Magias'].map((nome,i)=>botao(nome,()=>abrirPaginaMobile(i),{'data-pagina':String(i+1),class:'forja-mobile-destino'+(i===0?' ativo':'')})),botao('Heróis',mostrarHub,{class:'forja-mobile-destino'}));
 document.body.prepend(hub);document.body.prepend(barra);document.body.prepend(topoMobile);document.body.append(navMobile,el('p',{id:'forja-mensagem',class:'forja-sr',role:'status','aria-live':'polite'}));
 const dialogo=el('dialog',{id:'forja-dialogo','aria-labelledby':'forja-dialogo-titulo'},el('div',{class:'forja-dialogo-topo'},el('h2',{id:'forja-dialogo-titulo'}),botao(icone('fechar'),fecharDialogo,{'aria-label':'Fechar diálogo',class:'forja-fechar-dialogo'})),el('div',{id:'forja-dialogo-corpo'}));
 dialogo.addEventListener('close',()=>{dialogoAtual='';$('forja-dialogo-corpo').replaceChildren();(focoDialogo?.isConnected?focoDialogo:(focoDialogoId?$(focoDialogoId):null))?.focus();});document.body.append(dialogo);
 $('pagina-2').replaceChildren();$('pagina-3').replaceChildren();
 const p2=$('pagina-2');p2.append(el('h2',{},'História e apresentação'),el('div',{id:'forja-historia',class:'forja-grid'}),el('div',{id:'forja-auxiliares'}));
 montarHistoria();
 $('pagina-3').append(el('h2',{},'Conjuração'),el('div',{id:'forja-conjuracao'}));
 const resumo=el('div',{id:'forja-resumo'}),sessao=el('div',{id:'forja-sessao',class:'forja-grid'}),escolhas=el('div',{id:'forja-escolhas'}),inventario=el('div',{id:'forja-inventario-extra'}),evolucao=el('div',{id:'forja-evolucao'});
 $('pagina-1').append(resumo,escolhas);
 document.querySelector('.cabecalho-ficha').after(resumo);
 document.querySelector('.coluna-meio').append(sessao);
 document.querySelector('.coluna-direita').append(inventario,evolucao);
 document.querySelector('[data-etapa="1"]').insertBefore(midia.controle('retrato','criacao'),document.querySelector('[data-etapa="1"] .acoes-etapa'));
 const retrato=el('img',{id:'forja-cabecalho-retrato',class:'forja-cabecalho-retrato','data-forja-imagem':'retrato',alt:'Retrato do personagem',hidden:true});document.querySelector('.cabecalho-ficha').prepend(retrato);
 const primeira=document.querySelector('[data-etapa="1"] .grid-formulario');
 primeira.append(campo('Nome do jogador','forja-jogador','',v=>{detalhesFicha.jogador=v;salvar();},{maxlength:80}),campo('Evolução','forja-metodo-nivel','marcos',v=>{detalhesFicha.metodoNivel=v;salvar();},{opcoes:[['marcos','Marcos'],['xp','Experiência (XP)']]}),campo('XP','forja-xp',0,v=>{detalhesFicha.xp=Math.max(0,R.inteiro(v));salvar();},{tipo:'number',min:0}));
 const racas=$('select-raca');if(racas.querySelector('option[value="Humano Variante"]'))racas.querySelector('option[value="Humano Variante"]').hidden=true;
 const attrs=document.querySelector('[data-etapa="3"]');attrs.insertBefore(el('div',{id:'forja-metodos'}),attrs.querySelector('.grid-atributos-base'));attrs.insertBefore(el('p',{id:'forja-resumo-atributos',class:'forja-nota',role:'status'}),attrs.querySelector('.acoes-etapa'));
 for(const sigla of Object.keys(R.ATRIBUTOS)){const input=$('attr-'+sigla);input.previousElementSibling?.setAttribute('for',input.id);input.addEventListener('change',()=>{validarAtributos(false);aplicar();});}
 const etapas=[['Escolhas','forja-criacao-escolhas'],['Equipamento','forja-criacao-kit'],['Magias','forja-criacao-magias'],['Revisão','forja-criacao-revisao']];
 document.querySelector('[data-etapa="5"] .acoes-etapa button:last-child').textContent='Continuar';document.querySelector('[data-etapa="5"] .acoes-etapa button:last-child').onclick=()=>{mostrarEtapa(6);renderizar();};
 document.querySelector('[data-passo="5"]').lastChild.textContent=' Antecedente';
 etapas.forEach(([nome,id],i)=>{const n=i+6;document.querySelector('.progresso-criacao').append(el('div',{class:'passo-indicador','data-passo':n},el('span',{},String(n)),nome));const etapa=el('section',{class:'etapa-criacao','data-etapa':n},el('h3',{class:'titulo-secao'},nome),el('div',{id}),el('div',{class:'acoes-etapa'},botao('Voltar',()=>{mostrarEtapa(n-1);renderizar();}),botao(n===9?'Gerar ficha':'Continuar',()=>{if(n===9){const erros=pendencias();if(erros.length){mostrarToast(erros[0].mensagem);return;}iniciarPersonagem();}else{if(n===6&&!validarAtributos())return;mostrarEtapa(n+1);renderizar();}})));$('criacao-rapida').append(etapa);});
 document.querySelectorAll('.menu-abas .btn-aba').forEach((b,i)=>{b.id='forja-aba-'+(i+1);b.setAttribute('role','tab');b.setAttribute('aria-controls','pagina-'+(i+1));b.setAttribute('aria-selected',String(i===0));b.addEventListener('click',()=>{document.querySelectorAll('.menu-abas .btn-aba').forEach((a,j)=>{a.setAttribute('aria-selected',String(i===j));a.tabIndex=i===j?0:-1;});});b.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;const alvo=$('forja-aba-'+(j+1));alvo.click();alvo.focus();});$('pagina-'+(i+1)).setAttribute('role','tabpanel');$('pagina-'+(i+1)).setAttribute('aria-labelledby',b.id);});document.querySelector('.menu-abas').setAttribute('role','tablist');
 document.querySelectorAll('.etapa-criacao input,.etapa-criacao select').forEach(n=>n.addEventListener('change',()=>{salvar();renderizar();}));
 document.querySelectorAll('.modal-overlay').forEach(n=>{n.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();n.style.display='none';focoModal.get(n)?.focus();}if(e.key==='Tab'){const vis=[...n.querySelectorAll('button,input,select,textarea')].filter(x=>!x.disabled&&x.offsetParent!==null);const primeiro=vis[0],ultimo=vis.at(-1);if(e.shiftKey&&document.activeElement===primeiro){e.preventDefault();ultimo?.focus();}else if(!e.shiftKey&&document.activeElement===ultimo){e.preventDefault();primeiro?.focus();}}});});
 ForjaSeletores.instalar();ForjaVitais.instalar({recursos:()=>recursosPersonagem,maximo:()=>F.pvMaximos(contexto(),bancoDnD),confirmar:confirmarPV});
 const observador=new MutationObserver(ms=>ms.forEach(m=>{const n=m.target;if(n.classList?.contains('modal-overlay')&&n.style.display==='flex'){if(!focoModal.has(n))focoModal.set(n,document.activeElement);const conteudo=n.querySelector('.modal-conteudo');conteudo?.setAttribute('role','dialog');conteudo?.setAttribute('aria-modal','true');const h=conteudo?.querySelector('h2,h3');if(h){if(!h.id)h.id='modal-titulo-'+n.id;conteudo.setAttribute('aria-labelledby',h.id);}if(!n.contains(document.activeElement))n.querySelector('input:not([type=hidden]),select,button')?.focus();}else if(n.style?.display==='none'&&focoModal.has(n)){focoModal.get(n)?.focus();focoModal.delete(n);}}));document.querySelectorAll('.modal-overlay').forEach(n=>observador.observe(n,{attributes:true,attributeFilter:['style']}));
}
const focoModal=new Map();
function abrirPaginaMobile(indice){const aba=$('forja-aba-'+(indice+1));aba?.click();document.querySelectorAll('.forja-mobile-destino[data-pagina]').forEach((b,i)=>b.classList.toggle('ativo',i===indice));window.scrollTo({top:0,behavior:'smooth'});}
function abrirDialogo(titulo,conteudo,tipo=''){dialogoAtual=tipo;if(!$('forja-dialogo').open){focoDialogo=document.activeElement;focoDialogoId=focoDialogo?.id||'';}$('forja-dialogo').dataset.tipo=tipo;$('forja-dialogo-titulo').textContent=titulo;$('forja-dialogo-corpo').replaceChildren(conteudo);if(!$('forja-dialogo').open){$('forja-dialogo').showModal();ForjaTransicoes.animarDialogo?.($('forja-dialogo'));}$('forja-dialogo').scrollTop=0;ForjaSeletores.atualizar();}
function fecharDialogo(){dialogoAtual='';$('forja-dialogo').close();$('forja-dialogo-corpo').replaceChildren();}
function editar(etapa){if($('ficha-completa').style.display==='block')criacao.preservarGanhos();exibindoHub=false;document.body.classList.remove('modo-hub');$('forja-hub').hidden=true;$('forja-barra').hidden=false;$('criacao-rapida').hidden=false;$('ficha-completa').hidden=false;$('criacao-rapida').style.display='block';$('ficha-completa').style.display='none';if(etapa===2)parteOrigem=1;mostrarEtapa(etapa);renderizar();document.querySelector('.etapa-criacao.ativa input,.etapa-criacao.ativa select,.etapa-criacao.ativa button')?.focus();}
function metodosAtributos(){criacao.renderAtributos(limpar('forja-metodos'));}

function validarAtributos(avisar=true){const a=contexto().atributos,m=detalhesFicha.metodoAtributos;let msg=criacao.validar()?'':'Distribua os seis resultados nos atributos.';if(m==='pontos'){try{const c=F.custoPontos(a);msg=c>27?'Você gastou '+c+' de 27 pontos.':'';}catch(e){msg=e.message;}}if(m==='padrao'&&!F.validarDistribuicao(a))msg='Distribua exatamente 15, 14, 13, 12, 10 e 8.';if(m==='rolagem'&&!F.validarDistribuicao(a,detalhesFicha.rolagens.map(x=>x.total)))msg='Distribua os seis resultados da rolagem sem criar ou repetir valores extras.';if(msg&&avisar)mostrarToast(msg);return !msg;}
function grupoEscolha(id,nome,max,opcoes,selecionadas,aoAlterar,nota=''){
 const fs=el('fieldset',{class:'forja-escolha'},el('legend',{},nome+' ('+selecionadas.length+'/'+max+')'));
 if(nota)fs.append(el('p',{class:'forja-nota'},nota));
 fs.append(el('div',{class:'forja-escolha-status'+(selecionadas.length===max?' completo':'')},selecionadas.length?'Selecionado: '+selecionadas.join(', '):'Selecione '+max+(max===1?' opção abaixo:':' opções abaixo:')));
 const lista=el('div',{class:'forja-checks'});
 opcoes.forEach((valor,i)=>{
  const marcado=selecionadas.includes(valor),input=el('input',{type:'checkbox',id:id+'-'+i,checked:marcado});
  input.addEventListener('change',()=>{
   let nova=selecionadas.filter(x=>x!==valor);
   if(input.checked)nova.push(valor);
   if(nova.length>max){input.checked=false;mostrarToast('Escolha no máximo '+max+'.');return;}
   aoAlterar(nova);aplicar();$(id+'-'+i)?.focus();
  });
  lista.append(el('label',{for:id+'-'+i,class:marcado?'selecionado':''},input,el('span',{},valor)));
 });
 fs.append(lista);return fs;
}
function grupos(ctx=contexto()){
 const dados=R.dadosOrigem(ctx,bancoDnD),e=detalhesFicha.escolhas,grupos=[];const add=(id,nome,max,opcoes,tipo='simples',nota='')=>{if(max)grupos.push({id,nome,max,opcoes,tipo,nota,selecionadas:tipo==='prof'?(e.proficiencias?.[id]||[]):(e[id]||[])});};
 const pericias=Object.keys(bancoDnD.pericias),idiomas=['Comum','Anão','Élfico','Gigante','Gnômico','Goblin','Halfling','Orc','Abissal','Celestial','Dracônico','Dialeto Subterrâneo','Infernal','Primordial','Silvestre','Subcomum'];
 if(['Meio-Elfo','Humano Variante'].includes(ctx.raca)){add('atributosRaciais','Dois bônus raciais de +1',2,Object.keys(R.ATRIBUTOS).filter(s=>ctx.raca!=='Meio-Elfo'||s!=='car'));add('periciasRaciais','Perícias raciais',ctx.raca==='Meio-Elfo'?2:1,pericias);}
 const fontes=[['raca',ctx.raca,dados.raca],['subraca',ctx.subraca,dados.subraca],['classe',ctx.classe,dados.classe],['antecedente',ctx.antecedente,dados.antecedente]];
 for(const [tipo,nome,dado]of fontes){add('idioma:'+tipo+':'+nome,'Idiomas — '+nome,dado.idiomasEscolha||0,idiomas,'prof');let ferramentas=O.ferramentas.map(x=>x.nome);if(tipo==='raca'&&ctx.raca==='Anão')ferramentas=['Ferramentas de ferreiro','Suprimentos de cervejeiro','Ferramentas de pedreiro'];if(tipo==='classe'&&ctx.classe==='Bardo'||['Artista','Gladiador','Forasteiro'].includes(nome))ferramentas=O.ferramentas.filter(x=>x.grupo==='instrumento').map(x=>x.nome);if(tipo==='classe'&&ctx.classe==='Monge')ferramentas=O.ferramentas.filter(x=>['instrumento','artesao'].includes(x.grupo)).map(x=>x.nome);if(['Artesão da Guilda','Herói do Povo'].includes(nome))ferramentas=O.ferramentas.filter(x=>x.grupo==='artesao').map(x=>x.nome);if(['Criminoso','Espião','Soldado','Nobre','Cavaleiro'].includes(nome))ferramentas=O.ferramentas.filter(x=>x.grupo==='jogo').map(x=>x.nome);if(nome!=='Mercador de Guilda')add('ferramenta:'+tipo+':'+nome,'Ferramentas — '+nome,dado.ferramentasEscolha||0,ferramentas,'prof');}
 if(ctx.raca==='Draconato')add('ancestral','Ancestral dracônico',1,Object.keys(O.dragoes));
 const semBg=R.fontesPericias({...ctx,antecedente:'',periciasManuais:{},detalhes:{...detalhesFicha,escolhas:{...e,substituicoesAntecedente:[]}}},bancoDnD);
 const duplicadas=(dados.antecedente.pericias||[]).filter(n=>semBg[n]?.length);
 const notaDup=duplicadas.length?'Seu antecedente concede '+duplicadas.join(' e ')+', que você já possui por outra origem. Escolha '+duplicadas.length+(duplicadas.length>1?' novas perícias livres no lugar.':' nova perícia livre no lugar.'):'';
 add('substituicoesAntecedente','Substituir perícias duplicadas do antecedente',duplicadas.length,pericias.filter(p=>!semBg[p]?.length&&!(dados.antecedente.pericias||[]).includes(p)),'simples',notaDup);
 if(ctx.antecedente==='Personalizado'){add('periciasPersonalizadas','Duas perícias do antecedente',2,pericias);add('antecedenteMisto','Duas escolhas de idiomas/ferramentas',2,[...idiomas.map(x=>'idioma: '+x),...O.ferramentas.map(x=>'ferramenta: '+x)]);}
 if(ctx.antecedente==='Mercador de Guilda')add('mercador','Idioma ou ferramentas de navegador',1,[...idiomas.map(x=>'idioma: '+x),'ferramenta: Ferramentas de navegador']);
 for(const item of F.escolhasClasse(ctx)){let opcoes=item.opcoes;if(item.id.startsWith('especializacao-'))opcoes=opcoes.filter(p=>p==='Ferramentas de ladrão'||R.fontesPericias(ctx,bancoDnD)[p]?.length);if(item.id.startsWith('magoDominio')){const circulo=item.id.endsWith('1')?1:2;opcoes=detalhesFicha.magias.selecoes.filter(s=>s.fonte==='classe:Mago'&&ForjaMagias.find(m=>m.id===s.id)?.nivel===circulo).map(s=>s.id);}if(item.id==='magoAssinatura')opcoes=detalhesFicha.magias.selecoes.filter(s=>s.fonte==='classe:Mago'&&s.preparada&&ForjaMagias.find(m=>m.id===s.id)?.nivel===3).map(s=>s.id);add(item.id,item.nome,item.max,opcoes.map(x=>ForjaMagias.find(m=>m.id===x)?.nome||x),'simples',item.nota);}
 if(ctx.classe==='Bardo'&&ctx.subclasse==='Colégio do Conhecimento'&&ctx.nivel>=3)add('periciasConhecimento','Proficiências do Colégio do Conhecimento',3,pericias);
 if(ctx.classe==='Clérigo'&&ctx.subclasse==='Domínio do Conhecimento')add('conhecimento','Bênçãos do Conhecimento (especialização)',2,['Arcanismo','História','Natureza','Religião']);
 if(ctx.classe==='Clérigo'&&ctx.subclasse==='Domínio da Natureza')add('natureza','Acólito da Natureza',1,['Lidar com Animais','Natureza','Sobrevivência']);
 const fixas=R.proficiencias({...ctx,detalhes:{...detalhesFicha,escolhas:{...e,proficiencias:{}}}},bancoDnD);
 for(const g of grupos.filter(x=>x.tipo==='prof')){const tipo=g.id.split(':')[0],conhecidas=fixas[tipo]||[];g.opcoes=g.opcoes.filter(v=>!conhecidas.some(x=>R.canonico(x)===R.canonico(v)));}
 return grupos;
}
function riquezaInicialValida(c=contexto()){const regra=ForjaKits[c.classe],dados=detalhesFicha.escolhas?.kit?.[c.classe];return !!(regra&&dados?.modo==='riqueza'&&Number.isInteger(dados.riqueza)&&dados.riqueza>=regra.riqueza[0]*regra.riqueza[1]&&dados.riqueza<=4*regra.riqueza[0]*regra.riqueza[1]&&(!dados.dadosRiqueza?.length||kitInicialAplicadoAtual(c)));}
function kitInicialAplicadoAtual(c=contexto()){const dados=detalhesFicha.escolhas?.kit?.[c.classe],a=detalhesFicha.kitAplicado;return !!(a&&dados&&a.classe===c.classe&&a.antecedente===c.antecedente&&a.modo===dados.modo);}
function escolhaEmPainel(destino){for(const g of grupos())destino.append(grupoEscolha(ForjaCatalogo.id(g.id),g.nome,g.max,g.opcoes,g.selecionadas,nova=>{if(g.tipo==='prof'){detalhesFicha.escolhas.proficiencias??={};detalhesFicha.escolhas.proficiencias[g.id]=nova;}else detalhesFicha.escolhas[g.id]=nova;if(g.id==='ancestral')detalhesFicha.escolhas.dragao=nova[0]||'';},g.nota));
 if(contexto().raca==='Humano Variante'){destino.append(campo('Talento de Humano Variante','forja-talento-racial',tracosPersonagem.find(x=>x.progressaoRaca==='Humano Variante')?.nome||'',nome=>{const dados=talentos[nome];if(!dados)return;const erros=F.requisitoTalento(contexto(),bancoDnD,dados);if(erros.length)throw Error(erros.join(' '));const antigos=tracosPersonagem.filter(t=>t.progressaoRaca!=='Humano Variante');tracosPersonagem=[...antigos,{id:'talento-humano-variante',nome,talentoId:dados.id,tipo:'talento',descricao:dados.beneficios,progressaoRaca:'Humano Variante',bonusAtributo:null,escolhas:{}}];aplicar();editarTalento(tracosPersonagem.at(-1));},{opcoes:[['','Escolha um talento'],...Object.keys(talentos)]}));}
 for(const t of tracosPersonagem.filter(x=>x.tipo==='talento'))destino.append(botao('Escolhas de '+t.nome,()=>editarTalento(t)));
 for(const lv of obterIncrementosPendentes())destino.append(botao('Resolver melhoria do nível '+lv,()=>abrirModalProgressao(lv)));
 destino.append(multiclasse());
}
function pendencias(){const c=contexto(),res=[];const add=(mensagem,etapa)=>res.push({mensagem,etapa});if(!c.nome)add('Informe o nome do personagem.',1);if(!c.raca||!c.classe)add('Escolha raça e classe.',2);if(!c.alinhamento)add('Escolha um alinhamento.',5);if(c.raca==='Humano Variante'&&!detalhesFicha.opcoes.humanoVariante)add('Ative a opção Humano Variante.',2);if(c.nivel>=R.nivelSubclasse(c.classe)&&!c.subclasse)add('Escolha a subclasse deste nível.',2);if(!c.antecedente)add('Escolha um antecedente.',5);if(!validarAtributos(false))add('Revise a distribuição dos atributos.',3);if(!criacao.validarPV()&&!capturarEstado().fichaGerada)add('Escolha média ou rolagem de PV para cada nível.',6);const config=configuracaoPericiasClasse();if(c.periciasClasse.length!==config.quantidade)add('Escolha '+config.quantidade+' perícias da classe.',4);for(const g of grupos(c))if(g.selecionadas.length!==g.max||g.selecionadas.some(v=>!g.opcoes.includes(v)))add('Complete: '+g.nome+'.',6);if(c.raca==='Humano Variante'&&!tracosPersonagem.some(t=>t.progressaoRaca===c.raca))add('Escolha o talento racial.',6);for(const t of R.talentosAtivos(c)){const erros=validarTalento(t.nome,t.escolhas||{},t);erros.forEach(e=>add(t.nome+': '+e,6));}for(const lv of obterIncrementosPendentes())add('Melhoria de atributo ou talento do nível '+lv+'.',6);if(!kitInicialAplicadoAtual(c)&&!riquezaInicialValida(c))add('Escolha equipamento inicial ou riqueza.',7);for(const fonte of F.fontesConjuracao(c,bancoDnD)){if(fonte.modo==='fixa')continue;const s=detalhesFicha.magias.selecoes.filter(x=>x.fonte===fonte.id),n0=s.filter(x=>ForjaMagias.find(m=>m.id===x.id)?.nivel===0).length,n1=s.length-n0;if(n0<fonte.truques)add('Escolha '+fonte.truques+' truques — '+fonte.nome+'.',8);if(['conhecidas','terco','iniciado','segredos','arcano','ritual'].includes(fonte.modo)&&(fonte.modo==='segredos'?s.length:n1)<fonte.conhecidas)add('Magias conhecidas incompletas — '+fonte.nome+'.',8);if(fonte.modo==='grimorio'&&n1<6+2*(fonte.nivel-1))add('Grimório: registre '+(6+2*(fonte.nivel-1))+' magias obtidas pela classe.',8);if(['grimorio','preparadas'].includes(fonte.modo)&&s.filter(x=>x.preparada&&ForjaMagias.find(m=>m.id===x.id)?.nivel>0).length<fonte.conhecidas)add('Preparação de magias incompleta — '+fonte.nome+'.',8);}
 for(const e of F.classes(c))if(e.nivel>=R.nivelSubclasse(e.classe)&&!e.subclasse)add('Escolha subclasse de '+e.classe+'.',6);
 return res;
}
function renderizar(){if(executando||!$('forja-sessao'))return;const foco=document.activeElement,focoId=foco?.id,itemFoco=foco?.closest('[data-item-id]'),idItem=itemFoco?.dataset.itemId,indiceFoco=itemFoco?[...itemFoco.querySelectorAll('button')].indexOf(foco):-1;executando=true;try{
 for(const [id,v]of [['forja-jogador',detalhesFicha.jogador],['forja-xp',detalhesFicha.xp],['forja-metodo-nivel',detalhesFicha.metodoNivel]])if($(id)&&$(id)!==document.activeElement)$(id).value=v;
 const v=$('select-raca').querySelector('option[value="Humano Variante"]');if(v)v.hidden=!detalhesFicha.opcoes.humanoVariante;
 renderOrigem();
 metodosAtributos();const c=contexto();$('forja-mobile-personagem').textContent=c.nome||'Forja de Personagens';$('forja-resumo-atributos').textContent='';$('forja-resumo-atributos').hidden=true;
 escolhaEmPainel(limpar('forja-criacao-escolhas'));criacao.renderPV($('forja-criacao-escolhas'));kit(limpar('forja-criacao-kit'));renderMagias(limpar('forja-conjuracao'),false);
 if(document.querySelector('[data-etapa="8"]').classList.contains('ativa'))renderMagias(limpar('forja-criacao-magias'),true);
 const erros=pendencias();for(const id of ['forja-resumo','forja-criacao-revisao']){const n=limpar(id);if(id.endsWith('revisao'))renderRevisao(n,c);if(erros.length)n.append(detalhes(erros.length+' escolhas pendentes',el('ul',{},erros.map(e=>el('li',{},botao(e.mensagem,()=>editar(e.etapa)))))));else n.append(el('p',{class:'forja-ok'},'✓ Escolhas obrigatórias concluídas.'));}
 renderSessao();renderInventario();renderEvolucao();preencherHistoria();renderCriaturas();ForjaSeletores.atualizar();if($('modal-nivel').style.display==='flex')prepararPVNivel();
 }finally{executando=false;if(foco&&!foco.isConnected){if(focoId)$(focoId)?.focus();else if(idItem){const row=[...document.querySelectorAll('[data-item-id]')].find(x=>x.dataset.itemId===idItem);(row?.querySelectorAll('button')[indiceFoco]||document.querySelector('#forja-inventario-gerenciador button'))?.focus();}}}}
function kit(destino){const c=contexto(),regra=ForjaKits[c.classe];if(!regra){destino.append(el('p',{},'Escolha uma classe para montar o equipamento.'));return;}
 const escolha=detalhesFicha.escolhas;escolha.kit??={};const dados=escolha.kit[c.classe]??={modo:'equipamento',alternativas:[],itens:{}};
 destino.append(campo('Opção inicial','forja-kit-modo',dados.modo,v=>{dados.modo=v;renderizar();salvar();},{opcoes:[['equipamento','Equipamento de classe e antecedente'],['riqueza','Riqueza inicial (substitui ambos os kits)']]}));
 if(dados.modo==='riqueza'){criacao.renderRiqueza(destino,regra,dados,{confirmar:()=>{aplicarKit();mostrarToast('Riqueza colocada na carteira.','sucesso');},aplicado:kitInicialAplicadoAtual(c)});if(kitInicialAplicadoAtual(c))destino.append(botao('Comprar equipamento com esta riqueza',catalogo));}

 else{regra.grupos.forEach((opcoes,i)=>{const selecionada=Math.min(opcoes.length-1,dados.alternativas[i]||0);destino.append(campo('Escolha de equipamento '+(i+1),'forja-kit-'+i,selecionada,v=>{dados.alternativas[i]=R.inteiro(v);renderizar();salvar();},{opcoes:opcoes.map((x,j)=>[String(j),x.replaceAll('@marcial-corpo','Arma marcial corpo a corpo à escolha').replaceAll('@simples-corpo','Arma simples corpo a corpo à escolha').replaceAll('@marcial','Arma marcial à escolha').replaceAll('@simples','Arma simples à escolha').replaceAll('@foco','Foco arcano').replaceAll('@instrumento','Instrumento musical').replaceAll('|',' + ').replaceAll('*',' × ')] )}));opcoes[selecionada].split('|').forEach((spec,j)=>{if(!spec.startsWith('@'))return;const k=i+'-'+j;let itens=ForjaCatalogo.itens(bancoDnD).filter(x=>spec.includes('marcial')?x.tipo==='armas'&&x.subtipo.startsWith('marciais'):spec.includes('simples')?x.tipo==='armas'&&x.subtipo.startsWith('simples'):spec==='@instrumento'?x.grupo==='instrumento':['Bastão','Cajado','Cristal','Orbe','Varinha'].includes(x.nome));if(spec.includes('corpo'))itens=itens.filter(x=>x.subtipo.includes('corpo'));const nomes=itens.map(x=>x.nome);if(!nomes.includes(dados.itens[k]))dados.itens[k]=nomes[0];destino.append(campo('Item para a escolha '+(i+1)+'.'+(j+1),'forja-kit-item-'+k,dados.itens[k],v=>{dados.itens[k]=v;salvar();},{opcoes:nomes}));});});destino.append(el('p',{},'Também recebe: '+regra.fixos.replaceAll('|',', ').replaceAll('*',' × ')),el('p',{class:'forja-nota'},'Antecedente: '+(A.antecedentes[bancoDnD.antecedentes[c.antecedente]?.varianteDe||c.antecedente]?.equipamento||'Defina o equipamento personalizado com o Mestre.')));}
 if(dados.modo!=='riqueza')destino.append(botao(detalhesFicha.kitAplicado?'Revisar substituição do kit inicial':'Adicionar equipamento inicial',()=>{if(detalhesFicha.kitAplicado){abrirDialogo('Substituir equipamento inicial',el('div',{},el('p',{},'Os itens ainda vinculados ao kit anterior serão substituídos. Itens personalizados e comprados continuam na ficha. O saldo original do kit será retirado antes de conceder o novo.'),botao('Substituir kit e recalcular',()=>{aplicarKit();fecharDialogo();})));}else aplicarKit();}));if(detalhesFicha.kitAplicado)destino.append(el('p',{class:'forja-ok'},'✓ Equipamento inicial registrado.'));
}
function adicionarItem(nome,quantidade=1,origemKit=null){const pacote=Object.entries(O.pacotes).find(([k])=>R.normalizar(k)===R.normalizar(nome));if(pacote){pacote[1].forEach(([n,q])=>adicionarItem(n,q*quantidade,origemKit||pacote[0]));return;}
 const item=ForjaCatalogo.itens(bancoDnD).find(x=>R.canonico(x.nome)===R.canonico(nome));const existente=inventarioPersonagem.find(x=>x.nome===(item?.nome||nome)&&x.origemKit===origemKit&&!x.personalizado);if(existente){existente.quantidade+=quantidade;return;}inventarioPersonagem.push({id:novoId('item'),nome:item?.nome||nome,peso:item?F.pesoNumero(item.peso):0,quantidade,origemKit,catalogoId:item?.id||null,...(!item?{personalizado:true,tipoPersonalizado:'item',descricao:'Item narrativo do antecedente. Peso pode ser ajustado.'}:{})});}
function aplicarKit(){const c=contexto(),r=ForjaKits[c.classe],d=detalhesFicha.escolhas.kit[c.classe],anterior=detalhesFicha.kitAplicado;const ganho=d.modo==='riqueza'?d.riqueza*100:({Acólito:1500,'Artesão da Guilda':1500,Artista:1500,Charlatão:1500,Criminoso:1500,Eremita:500,Forasteiro:1000,'Herói do Povo':1000,Marinheiro:1000,Nobre:2500,'Órfão':1000,Sábio:1000,Soldado:1000}[bancoDnD.antecedentes[c.antecedente]?.varianteDe||c.antecedente]||0);
 if(d.modo==='riqueza'&&(!Number.isInteger(d.riqueza)||d.riqueza<r.riqueza[0]*r.riqueza[1]||d.riqueza>4*r.riqueza[0]*r.riqueza[1]))throw Error('Riqueza fora dos limites da rolagem da classe.');
 const carteira=F.movimentarCarteira(detalhesFicha.moedas,ganho-(anterior?.moedas||0));const kitId='kit-inicial';inventarioPersonagem=inventarioPersonagem.filter(x=>x.origemKit!==kitId);if(d.modo!=='riqueza'){let specs=r.fixos?r.fixos.split('|'):[];r.grupos.forEach((g,i)=>g[d.alternativas[i]||0].split('|').forEach((x,j)=>specs.push(x.startsWith('@')?d.itens[i+'-'+j]:x)));const bg=bancoDnD.antecedentes[c.antecedente]?.varianteDe||c.antecedente;const bgs={Acólito:'Amuleto|Livro de preces|Vareta de incenso*5|Robes|Roupas comuns|Algibeira','Artesão da Guilda':'Roupas de viajante|Carta de apresentação|Algibeira',Artista:'Roupas de entretenimento|Presente de admirador|Algibeira',Charlatão:'Roupas finas|Kit de disfarce|Instrumento de trapaça|Algibeira',Criminoso:'Pé de cabra|Roupas comuns|Algibeira',Eremita:'Estojo de anotações|Cobertor de inverno|Roupas comuns|Kit de herbalismo',Forasteiro:'Bordão|Armadilha de caça|Troféu de caça|Roupas de viajante','Herói do Povo':'Pá|Panela de ferro|Roupas comuns|Algibeira',Marinheiro:'Porrete|Corda de seda (15 metros)|Amuleto da sorte|Roupas comuns',Nobre:'Roupas finas|Sinete|Pergaminho de linhagem|Algibeira','Órfão':'Pequena faca|Mapa da cidade|Camundongo de estimação|Lembrança dos pais|Roupas comuns|Algibeira',Sábio:'Tinta (frasco de 30ml)|Caneta tinteiro|Pequena faca|Carta de colega|Roupas comuns',Soldado:'Insígnia de patente|Troféu de guerra|Roupas comuns|Algibeira'};specs.push(...(bgs[bg]||'').split('|').filter(Boolean));const prof=detalhesFicha.escolhas.proficiencias||{};specs.push(...(prof['ferramenta:antecedente:'+c.antecedente]||[]));for(const spec of specs){if(!spec)throw Error('Complete as escolhas do kit.');const [nome,q]=spec.split('*');adicionarItem(nome,Number(q)||1,kitId);}}
 detalhesFicha.moedas=carteira;detalhesFicha.kitAplicado={classe:c.classe,antecedente:c.antecedente,modo:d.modo,moedas:ganho};for(const k of ['armadura','escudo'])if(!inventarioPersonagem.some(x=>x.id===equipamentoPersonagem[k]))equipamentoPersonagem[k]=null;aplicar();mostrarToast('Equipamento inicial adicionado. Indique o que está vestindo no inventário.','sucesso');}
function definirTesteMorte(tipo,valor){if(recursosPersonagem.pvAtual!==0)throw Error('Os testes contra a morte só podem ser marcados com 0 PV.');const m=detalhesFicha.sessao.morte,atual=m[tipo];m[tipo]=atual===valor?valor-1:valor;m.estavel=m.sucessos===3;m.morto=m.falhas===3;aplicar();}
function linhaTesteMorte(rotulo,tipo,valor,desabilitado){return el('div',{class:'forja-morte-linha'},el('strong',{},rotulo),el('div',{class:'forja-morte-pontos',role:'group','aria-label':rotulo},...Array.from({length:3},(_,i)=>botao(String(i+1),()=>definirTesteMorte(tipo,i+1),{class:'forja-morte-ponto'+(valor>i?' marcado':''),'aria-label':rotulo+' '+(i+1),'aria-pressed':String(valor>i),disabled:desabilitado}))));}
function renderSessao(){const root=limpar('forja-sessao'),c=contexto();
 const identidade=painel('Identidade e condições');const tipo=['Halfling','Gnomo'].includes(c.raca)?'Pequeno':'Médio';let visao=c.subraca==='Drow (Elfo Negro)'?'36 m':['Anão','Elfo','Gnomo','Meio-Elfo','Meio-Orc','Tiefling'].includes(c.raca)?'18 m':'sem visão no escuro';identidade.append(el('p',{},'Jogador: '+(detalhesFicha.jogador||'—')+' • '+tipo+' • Visão: '+visao),el('p',{},detalhesFicha.metodoNivel==='xp'?'XP '+detalhesFicha.xp+' • nível indicado '+Math.max(1,O.xp.filter(x=>x<=detalhesFicha.xp).length):'Progressão por marcos'),botao(detalhesFicha.inspiracao?'★ Gastar inspiração':'☆ Marcar inspiração',()=>{detalhesFicha.inspiracao=!detalhesFicha.inspiracao;aplicar();}),grupoEscolha('forja-condicao','Condições',14,Object.keys(O.condicoes),detalhesFicha.sessao.condicoes,v=>{detalhesFicha.sessao.condicoes=v;if(v.some(x=>['Incapacitado','Atordoado','Paralisado','Inconsciente','Petrificado'].includes(x)))detalhesFicha.magias.concentracao=null;}),campo('Nível de exaustão','forja-exaustao',detalhesFicha.sessao.exaustao,v=>{detalhesFicha.sessao.exaustao=R.inteiro(v);aplicar();},{opcoes:Array.from({length:7},(_,i)=>String(i))}));for(const x of detalhesFicha.sessao.condicoes)identidade.append(el('p',{class:'forja-nota'},x+': '+O.condicoes[x]));if(detalhesFicha.sessao.exaustao)identidade.append(el('p',{class:'forja-nota'},['','1: desvantagem em testes.','2: deslocamento pela metade.','3: desvantagem em ataques e salvaguardas.','4: PV máximos pela metade.','5: deslocamento 0.','6: morte.'].slice(1,detalhesFicha.sessao.exaustao+1).join(' ')));const resist=F.resistencias(c,bancoDnD);identidade.append(el('p',{},'Resistências: '+(resist.join('; ')||'nenhuma automática')));const condicoes=identidade.querySelector('.forja-escolha'),expansor=detalhes('Condições ('+detalhesFicha.sessao.condicoes.length+')');condicoes.before(expansor);expansor.append(condicoes);expansor.open=detalhesFicha.sessao.condicoes.length>0;root.append(identidade);
 const recursos=painel('Recursos e descansos');
 recursos.append(el('div',{class:'forja-descansos-grade'},
  botao('Descanso curto',()=>descanso('curto'),{class:'btn-secundario forja-btn-descanso'}),
  botao('Descanso longo',()=>descanso('longo'),{class:'btn-secundario forja-btn-descanso'})
 ));
 const listaRecursos=el('div',{class:'forja-recursos-lista'});
 for(const x of F.maxRecursos(c,bancoDnD)){
  const maxTxt=x.max===1000000?'∞':x.max;
  const row=el('div',{class:'forja-recurso'},
   el('div',{class:'forja-recurso-topo'},
    el('div',{class:'forja-recurso-info'},
     el('strong',{},x.nome),
     el('span',{class:'forja-recurso-meta'},x.disponivel+'/'+maxTxt+' disponíveis • recupera em descanso '+x.recupera)
    ),
    el('div',{class:'forja-recurso-acoes'},
     botao('Usar',()=>{detalhesFicha=F.gastar(contexto(),bancoDnD,x.id);aplicar();mostrarToast(x.nome+': recurso utilizado.','sucesso');},{disabled:x.disponivel<1,class:'btn-secundario forja-acao-principal'}),
     botao('Devolver',()=>{detalhesFicha=F.gastar(contexto(),bancoDnD,x.id,-1);aplicar();mostrarToast(x.nome+': uso devolvido.','sucesso');},{disabled:!x.gasto})
    )
   )
  );
  if(x.nota)row.append(el('small',{class:'forja-nota'},x.nota));
  listaRecursos.append(row);
 }
 recursos.append(listaRecursos);
 if(F.nivelClasse(c,'Bárbaro'))recursos.append(botao(detalhesFicha.sessao.furia?'Encerrar fúria':'Ativar fúria (gasta 1 uso)',()=>{if(!detalhesFicha.sessao.furia)detalhesFicha=F.gastar(contexto(),bancoDnD,'furia');detalhesFicha.sessao.furia=!detalhesFicha.sessao.furia;aplicar();},{class:'btn-secundario forja-furia-btn'+(detalhesFicha.sessao.furia?' ativo':'')}));
 const sopro=F.sopro(c,bancoDnD);if(sopro)recursos.append(el('p',{class:'forja-nota forja-sopro-destaque'},'Sopro '+sopro.cor+': '+sopro.dano+' '+sopro.tipo+' • '+sopro.area+' • '+sopro.salvaguarda.toUpperCase()+' CD '+sopro.cd+'; metade no sucesso.'));
 recursos.append(el('div',{class:'forja-acoes-sessao'},botao('Novo turno',()=>{detalhesFicha.magias.turno={bonusNivel:false,outraNivel:false};aplicar();mostrarToast('Novo turno iniciado.','sucesso');}),botao('Ajustes com origem',ajustes)));
 root.append(recursos);
 const morte=painel('Testes contra a morte'),m=detalhesFicha.sessao.morte,indisponivel=recursosPersonagem.pvAtual!==0;morte.classList.add('forja-morte');morte.append(el('p',{class:'forja-estado-morte'},indisponivel?'Disponível quando os PV chegarem a zero.':m.morto?'Três falhas — personagem morto.':m.estavel?'Três sucessos — personagem estável.':'Marque o resultado de cada teste.'),linhaTesteMorte('Sucessos','sucessos',m.sucessos,indisponivel),linhaTesteMorte('Falhas','falhas',m.falhas,indisponivel),botao('Limpar marcações',()=>{detalhesFicha.sessao.morte={sucessos:0,falhas:0,estavel:false,morto:false};aplicar();},{disabled:indisponivel||(!m.sucessos&&!m.falhas)}));root.append(morte);
}
function aoSofrerDano(quantidade,recursos){if(recursos.pvAtual===0&&quantidade>0)detalhesFicha=F.danoZero(detalhesFicha);const max=F.pvMaximos(contexto(),bancoDnD),excesso=quantidade-recursos.pvTemporarios-recursos.pvAtual;if(excesso>=max)detalhesFicha.sessao.morte.morto=true;if(detalhesFicha.magias.concentracao&&quantidade>0)mostrarToast('Concentração: faça uma salvaguarda de CON CD '+Math.max(10,Math.floor(quantidade/2))+(R.temTalento(contexto(),'war-caster')?' com vantagem.':'.'));}
function registrarCura(quantidade,recursos){if(typeof ForjaSessao==='undefined')return R.aplicarCura(recursos,quantidade,F.pvMaximos(contexto(),bancoDnD));const out=ForjaSessao.curar(contexto(),bancoDnD,recursos,quantidade);detalhesFicha=out.detalhes;return out.recursos;}
function aposPV(){if(recursosPersonagem.pvAtual>0)detalhesFicha.sessao.morte={sucessos:0,falhas:0,estavel:false,morto:false};else detalhesFicha.magias.concentracao=null;renderizar();}
function descanso(tipo){const corpo=el('div',{},el('p',{},tipo==='longo'?'Descanso de pelo menos 8 horas, máximo um benefício por 24 horas. Recupera PV, espaços normais e metade dos Dados de Vida totais (mínimo 1).':'Descanso de pelo menos 1 hora. Escolha os Dados de Vida a gastar.'));const selecionados={};if(tipo==='curto')for(const e of F.classes(contexto()))corpo.append(campo(e.classe+' — d'+bancoDnD.classes[e.classe].dadoVida+' ('+(e.nivel-(detalhesFicha.dadosVidaGastos[e.classe]||0))+' disponíveis)','forja-dv-'+ForjaCatalogo.id(e.classe),0,v=>selecionados[e.classe]=R.inteiro(v),{tipo:'number',min:0,max:e.nivel-(detalhesFicha.dadosVidaGastos[e.classe]||0)}));corpo.append(botao('Concluir descanso '+tipo,()=>{const out=F.descansar(contexto(),bancoDnD,tipo,selecionados);detalhesFicha=out.detalhes;recursosPersonagem=out.recursos;fecharDialogo();aplicar();mostrarToast('Descanso concluído. '+(out.cura?'Cura rolada: '+out.cura+' PV.':''),'sucesso');}));abrirDialogo('Descanso '+tipo,corpo);}
function renderInventario(){const root=el('div',{class:'forja-inventario-paineis'}),c=contexto(),p=F.peso(c,bancoDnD),financas=painel('Dinheiro e capacidade de carga');
 const totalOuro=(F.dinheiroEmCobre(detalhesFicha.moedas)/100).toFixed(2).replace(/\.00$/,'');
 const resumoBarra=el('div',{class:'forja-inventario-resumo-topo'},
  el('div',{class:'forja-inv-metrica'},el('small',{},'Riqueza total'),el('strong',{},totalOuro+' PO')),
  el('div',{class:'forja-inv-metrica'},el('small',{},'Peso carregado'),el('strong',{},p.total.toFixed(1).replace(/\.0$/,'')+' / '+p.capacidade+' kg')),
  el('div',{class:'forja-inv-metrica'},el('small',{},'Estado de carga'),el('strong',{},p.faixa))
 );
 const carteira=el('div',{class:'forja-carteira'});
 for(const tipo of Object.keys(F.moedas))carteira.append(campo(tipo.toUpperCase(),'forja-moeda-'+tipo,detalhesFicha.moedas[tipo],v=>{const n=Number(v);if(!Number.isSafeInteger(n)||n<0)throw Error('Informe uma quantidade inteira de moedas.');detalhesFicha.moedas[tipo]=n;aplicar();},{tipo:'number',min:0,max:1000000000}));
 const regrasCarga=detalhes('Conversão de moedas e regras de carga',
  el('p',{class:'forja-nota'},'1 PO = 10 PP = 100 PC • 1 PE = 5 PP • 1 PL = 10 PO'),
  el('p',{class:'forja-nota'},'Carga total: '+p.total+' kg (moedas: '+p.moedas.toFixed(2)+' kg). Capacidade: '+p.capacidade+' kg. Empurrar/arrastar/erguer: '+p.empurrar+' kg.'),
  campo('Sobrecarga variante','forja-sobrecarga',detalhesFicha.opcoes.sobrecarga?'sim':'nao',v=>{detalhesFicha.opcoes.sobrecarga=v==='sim';aplicar();},{opcoes:[['nao','Capacidade padrão'],['sim','Variante: FOR × 2,5 / 5 kg']]})
 );
 financas.append(resumoBarra,carteira,el('div',{class:'forja-carteira-acoes'},botao('Despesa ou receita',transacao)),regrasCarga);
 root.append(financas);
 const itens=painel('Itens, mãos e transações');
 const listas=[['','Nenhum'],...inventarioPersonagem.map(x=>[x.id,x.nome+' ('+x.quantidade+')'])];
 const gradeMaos=el('div',{class:'forja-maos-grade'});
 for(const [k,nome]of [['mao1','Mão principal'],['mao2','Outra mão'],['foco','Foco / símbolo sagrado']])gradeMaos.append(campo(nome,'forja-equipado-'+k,detalhesFicha.equipados[k]||'',v=>{detalhesFicha.equipados[k]=v||null;aplicar();},{opcoes:listas}));
 const barraMochila=el('div',{class:'forja-mochila-atalhos'},
  botao('Catálogo completo / comprar',catalogo,{class:'btn-secundario forja-acao-principal'}),
  botao('Criar item personalizado',abrirPersonalizado),
  botao('Aplicar kit inicial',()=>editar(7))
 );
 itens.append(el('h4',{class:'forja-subtitulo-inv'},'Empunhado nas mãos'),gradeMaos,el('h4',{class:'forja-subtitulo-inv'},'Mochila ('+inventarioPersonagem.length+' itens)'),barraMochila);
 const listaItens=el('div',{class:'forja-mochila-lista'});
 if(!inventarioPersonagem.length)listaItens.append(el('p',{class:'forja-nota'},'Sua mochila está vazia. Use o catálogo para comprar itens ou aplique o kit inicial da sua classe.'));
 inventarioPersonagem.forEach(item=>{
  const armadura=localizarArmadura(item.nome);
  const pesoItem=(item.peso*item.quantidade).toFixed(1).replace(/\.0$/,'');
  const cab=el('div',{class:'forja-item-cabecalho'},
   el('strong',{},item.nome+' × '+item.quantidade),
   el('span',{class:'forja-item-meta'},pesoItem+' kg'+(item.armazenado?' • Fora da carga':''))
  );
  const acoes=el('div',{class:'forja-item-acoes'});
  if(armadura){
   const tipo=armadura.subtipo==='escudo'?'escudo':'armadura',usando=equipamentoPersonagem[tipo]===item.id,acao=usando?(tipo==='escudo'?'Guardar':'Tirar'):(tipo==='escudo'?'Empunhar':'Vestir');
   acoes.append(botao(acao+' '+item.nome,()=>alternarEquipamento(inventarioPersonagem.findIndex(x=>x.id===item.id)),{'aria-pressed':String(usando),class:'btn-secundario'+(usando?' forja-acao-principal':'')}));
  }
  acoes.append(
   botao('Usar 1',()=>consumir(item.id)),
   botao(item.armazenado?'Carregar':'Guardar fora da carga',()=>{const atual=inventarioPersonagem.find(x=>x.id===item.id);if(atual)atual.armazenado=!atual.armazenado;aplicar();}),
   botao('Editar',()=>editarItem(item.id)),
   botao('Vender',()=>vender(item.id))
  );
  listaItens.append(el('div',{class:'forja-item-detalhe','data-item-id':item.id},cab,acoes));
 });
 itens.append(listaItens);
 if(ultimoUsoItem)itens.append(botao('Desfazer último consumo',()=>{const i=inventarioPersonagem.find(x=>x.id===ultimoUsoItem.id);if(i)i.quantidade++;else inventarioPersonagem.push(ultimoUsoItem);ultimoUsoItem=null;aplicar();mostrarToast('Consumo desfeito.','sucesso');}));
 root.append(itens);
 if(dialogoAtual==='inventario'&&$('forja-inventario-gerenciador'))$('forja-inventario-gerenciador').replaceChildren(root);
 $('forja-inventario-extra').replaceChildren();$('forja-inventario-extra').hidden=true;$('peso-total').textContent=p.total.toFixed(1);$('peso-maximo').textContent=p.capacidade;$('barra-progresso-carga').style.width=Math.min(100,p.total/p.capacidade*100)+'%';
 const passiva=R.percepcaoPassiva(c,bancoDnD);$('display-percepcao-passiva').textContent=passiva.valor+F.ajuste(c,'passiva');const eq=equipamentoAtivo();$('display-deslocamento').textContent=F.movimento(c,bancoDnD,eq.armadura,eq.escudo);if(detalhesFicha.sessao.exaustao===6)detalhesFicha.sessao.morte.morto=true;
}
function consumir(id){const item=inventarioPersonagem.find(x=>x.id===id);if(!item)throw Error('Item não encontrado.');ultimoUsoItem=JSON.parse(JSON.stringify(item));ultimoUsoItem.quantidade=1;item.quantidade--;if(item.quantidade===0){inventarioPersonagem=inventarioPersonagem.filter(x=>x.id!==id);for(const k of Object.keys(detalhesFicha.equipados))if(detalhesFicha.equipados[k]===id)detalhesFicha.equipados[k]=null;for(const k of Object.keys(equipamentoPersonagem))if(equipamentoPersonagem[k]===id)equipamentoPersonagem[k]=null;}aplicar();mostrarToast(item.nome+' utilizado.','sucesso');}
function editarItem(id){const item=inventarioPersonagem.find(x=>x.id===id);const campos={...item};const n=el('div',{class:'forja-grid'},campo('Nome','forja-item-nome',item.nome,v=>campos.nome=v,{maxlength:120}),campo('Quantidade','forja-item-qtd',item.quantidade,v=>campos.quantidade=Number(v),{tipo:'number',min:1}),campo('Peso de uma unidade (kg)','forja-item-peso',item.peso,v=>campos.peso=Number(v),{tipo:'number',min:0,step:0.001}),campo('Notas','forja-item-notas',item.descricao||'',v=>campos.descricao=v,{area:true,maxlength:10000}),botao('Salvar item',()=>{if(!campos.nome.trim()||!Number.isInteger(campos.quantidade)||campos.quantidade<1||!Number.isFinite(campos.peso)||campos.peso<0)throw Error('Nome, quantidade ou peso inválido.');Object.assign(item,campos);fecharDialogo();aplicar();}));abrirDialogo('Editar '+item.nome,n);}
function catalogo(){fecharDialogo();abrirModalEquipamentos();}
function abrirPersonalizado(){fecharDialogo();abrirModalEquipamentos('personalizados');ForjaSeletores.atualizar();}
function abrirInventario(){abrirDialogo('Gerenciar inventário',el('div',{id:'forja-inventario-gerenciador'}),'inventario');renderInventario();ForjaSeletores.atualizar();}

function vender(id){const item=inventarioPersonagem.find(x=>x.id===id);let quantidade=1,preco=0;abrirDialogo('Venda: '+item.nome,el('div',{},el('p',{},'Informe o preço combinado para uma unidade. A ficha não presume preço de revenda.'),campo('Quantidade','forja-venda-qtd',1,v=>quantidade=Number(v),{tipo:'number',min:1,max:item.quantidade}),campo('Preço por unidade (PC)','forja-venda-valor',0,v=>preco=Number(v),{tipo:'number',min:0}),botao('Registrar venda',()=>{if(!Number.isInteger(quantidade)||quantidade<1||quantidade>item.quantidade||!Number.isSafeInteger(preco)||preco<0)throw Error('Quantidade ou preço inválido.');detalhesFicha.moedas=F.movimentarCarteira(detalhesFicha.moedas,preco*quantidade);item.quantidade-=quantidade;if(!item.quantidade){inventarioPersonagem=inventarioPersonagem.filter(x=>x.id!==id);for(const k of Object.keys(equipamentoPersonagem))if(equipamentoPersonagem[k]===id)equipamentoPersonagem[k]=null;for(const k of Object.keys(detalhesFicha.equipados))if(detalhesFicha.equipados[k]===id)detalhesFicha.equipados[k]=null;}detalhesFicha.transacoes.unshift({tipo:'venda',nome:item.nome,cobre:preco*quantidade,quantidade,data:new Date().toISOString()});fecharDialogo();aplicar();})));
}
function transacao(){let texto='',valor=0;abrirDialogo('Despesa ou receita',el('div',{},campo('Descrição / estilo de vida','forja-despesa-texto','',v=>texto=v,{maxlength:160}),campo('Valor em PC (negativo para despesa)','forja-despesa-valor',0,v=>valor=Number(v),{tipo:'number'}),el('p',{class:'forja-nota'},'Exemplos por dia: miserável 0, esquálido 10 PC, pobre 20 PC, modesto 100 PC, confortável 200 PC, rico 400 PC, aristocrático a partir de 1000 PC.'),botao('Registrar e movimentar carteira',()=>{if(!texto.trim())throw Error('Identifique a movimentação.');detalhesFicha.moedas=F.movimentarCarteira(detalhesFicha.moedas,valor);detalhesFicha.transacoes.unshift({tipo:'ajuste',nome:texto,cobre:valor,data:new Date().toISOString()});fecharDialogo();aplicar();})));
}
function ajustes(){const n=el('div');let alvo='ca',valor=0,origem='';n.append(el('p',{},'Ajustes são aplicados separadamente dos atributos base e podem ser removidos.'),campo('Valor a ajustar','forja-ajuste-alvo',alvo,v=>alvo=v,{opcoes:['ca','pvmax','iniciativa','deslocamento','passiva','ataque','ataquemagia','cdmagia',...Object.keys(bancoDnD.pericias).map(x=>'pericia:'+x)]}),campo('Bônus ou penalidade','forja-ajuste-valor',0,v=>valor=Number(v),{tipo:'number',min:-10000,max:10000}),campo('Origem / justificativa','forja-ajuste-origem','',v=>origem=v,{maxlength:160}),botao('Adicionar ajuste',()=>{if(!origem.trim()||!Number.isFinite(valor)||Math.abs(valor)>10000)throw Error('Informe valor e origem válidos.');detalhesFicha.ajustes.push({id:novoId('ajuste'),alvo,valor,origem});fecharDialogo();aplicar();}));for(const x of detalhesFicha.ajustes)n.append(el('p',{},x.origem+': '+x.alvo+' '+formatarBonus(x.valor),botao('Remover',()=>{detalhesFicha.ajustes=detalhesFicha.ajustes.filter(a=>a.id!==x.id);fecharDialogo();aplicar();ajustes();})));abrirDialogo('Ajustes de regras',n);}
function multiclasse(){const c=contexto(),n=detalhes('Multiclasse opcional',el('p',{class:'forja-nota'},'Requer os atributos mínimos de todas as classes. Não concede equipamento inicial adicional. Conhecimento e preparação seguem cada classe; espaços altos não ampliam a lista aprendida.'));
 n.append(campo('Usar multiclasse','forja-multiclasse',detalhesFicha.opcoes.multiclasse?'sim':'nao',v=>{detalhesFicha.opcoes.multiclasse=v==='sim';if(v==='sim'&&!detalhesFicha.niveis.length)detalhesFicha.niveis=[{classe:c.classe,nivel:c.nivel,subclasse:c.subclasse}];aplicar();},{opcoes:[['nao','Não'],['sim','Sim']]}));
 if(!detalhesFicha.opcoes.multiclasse)return n;
 detalhesFicha.niveis.forEach((e,i)=>{const row=el('div',{class:'forja-grid'},el('strong',{},e.classe),campo('Níveis em '+e.classe,'forja-multi-nivel-'+i,e.nivel,v=>{const novo=R.nivel(v),total=detalhesFicha.niveis.reduce((s,x,j)=>s+(i===j?novo:x.nivel),0);if(total>20)throw Error('O nível total não pode ultrapassar 20.');e.nivel=novo;$('nivel-personagem').value=total;aplicar();},{tipo:'number',min:1,max:20}),campo('Subclasse de '+e.classe,'forja-multi-sub-'+i,e.subclasse||'',v=>{e.subclasse=v;aplicar();},{opcoes:[['','Escolha no nível '+R.nivelSubclasse(e.classe)],...bancoDnD.classes[e.classe].subclasses]}));if(i>0)row.append(botao('Remover classe',()=>{detalhesFicha.niveis.splice(i,1);$('nivel-personagem').value=F.nivelTotal(contexto());aplicar();}));n.append(row);});
 let nova=Object.keys(bancoDnD.classes).find(x=>!detalhesFicha.niveis.some(e=>e.classe===x));if(nova)n.append(campo('Nova classe','forja-multi-nova',nova,v=>nova=v,{opcoes:Object.keys(bancoDnD.classes).filter(x=>!detalhesFicha.niveis.some(e=>e.classe===x))}),botao('Adicionar um nível',()=>{if(F.nivelTotal(contexto())>=20)throw Error('Limite de 20 níveis.');if(!F.requisitosMulticlasse(contexto(),bancoDnD,nova)||detalhesFicha.niveis.some(e=>!F.requisitosMulticlasse(contexto(),bancoDnD,e.classe)))throw Error('Os atributos mínimos de multiclasse não foram atendidos.');detalhesFicha.niveis.push({classe:nova,nivel:1,subclasse:''});$('nivel-personagem').value=F.nivelTotal(contexto());aplicar();}));return n;
}
function renderEvolucao(){limpar('forja-evolucao').hidden=true;}

const camposHistoria={idade:'Idade',altura:'Altura',peso:'Peso corporal',olhos:'Olhos',pele:'Pele',cabelos:'Cabelos',aparencia:'Aparência',tracos:'Traços de personalidade',ideais:'Ideais',vinculos:'Vínculos',defeitos:'Defeitos',historia:'História do personagem',aliados:'Aliados e organizações',tesouro:'Tesouros e vínculos com itens do inventário',adicionais:'Características e anotações adicionais',divindade:'Divindade / panteão',planos:'Planos e cosmologia',estiloVida:'Estilo de vida e despesas'};
function montarHistoria(){historia.montar(limpar('forja-historia'));}
function preencherHistoria(){historia.preencher();midia.preencher();}

function tabelasPersonalidade(){const c=contexto(),base=bancoDnD.antecedentes[c.antecedente]?.varianteDe||c.antecedente,t=A.antecedentes[base];if(!t)throw Error('Esse antecedente usa texto livre.');const n=el('div');for(const [k,nome]of [['tracos','Traços'],['ideais','Ideais'],['vinculos','Vínculos'],['defeitos','Defeitos']])n.append(detalhes(nome,...t[k].map((s,i)=>el('div',{class:'forja-sugestao'},el('p',{},(i+1)+'. '+s),botao('Acrescentar',()=>{detalhesFicha.historia[k]=(detalhesFicha.historia[k]?detalhesFicha.historia[k]+'\n':'')+s;preencherHistoria();salvar();notificacao('Sugestão acrescentada.');})))));abrirDialogo('Personalidade — '+base,n);}
function sugerirFisico(){
 const tabelas={'Humano':[142,6,10,55,2,4],'Humano Variante':[142,6,10,55,2,4],'Anão da Colina':[112,6,4,57,2,6],'Anão da Montanha':[122,6,4,65,2,6],'Alto Elfo':[137,6,10,45,1,4],'Elfo da Floresta':[137,6,10,50,1,4],'Drow (Elfo Negro)':[132,6,6,48,1,6],'Halfling':[78,6,4,18,0,1],'Draconato':[167,6,8,87,2,6],'Gnomo':[88,6,4,18,0,1],'Meio-Elfo':[145,6,8,55,2,4],'Meio-Orc':[147,6,10,70,2,6],'Tiefling':[145,6,8,55,2,4]};
 const c=contexto(),base=tabelas[c.subraca]||tabelas[c.raca];if(!base)throw Error('Use os campos livres para essa origem.');
 const rolar=(q,f)=>Array.from({length:q},()=>1+Math.floor(Math.random()*f)).reduce((s,x)=>s+x,0);const modificador=rolar(base[1],base[2]);const altura=base[0]+modificador,peso=Math.round((base[3]+modificador*(base[4]?rolar(base[4],base[5]):1)/5)*10)/10;
 abrirDialogo('Sugestão física — tabela do PDF, p. 123',el('div',{},el('p',{},'Altura: '+altura+' cm • peso: '+peso+' kg. Valores narrativos editáveis.'),botao('Usar sugestão',()=>{detalhesFicha.historia.altura=altura+' cm';detalhesFicha.historia.peso=peso+' kg';fecharDialogo();preencherHistoria();salvar();})));
}

function renderCriaturas(){const root=limpar('forja-auxiliares');root.classList.add('forja-criaturas');root.append(el('h3',{},'Familiares, companheiros e formas'),botao('Adicionar criatura do apêndice',escolherCriatura),botao('Criatura personalizada',()=>editarCriatura()));for(const [i,c]of detalhesFicha.criaturas.entries())root.append(detalhes(c.nome+' • '+c.papel+' • '+c.pvAtual+'/'+c.pv+' PV',el('p',{class:'forja-texto'},c.descricao),campo('PV atuais de '+c.nome,'forja-criatura-pv-'+i,c.pvAtual,v=>{c.pvAtual=Math.max(0,Math.min(c.pv,R.inteiro(v)));salvar();},{tipo:'number',min:0,max:c.pv}),botao('Editar criatura',()=>editarCriatura(i)),botao('Remover criatura',()=>{detalhesFicha.criaturas.splice(i,1);aplicar();})));}
function escolherCriatura(){let papel='Familiar',vistas=true;const n=el('div'),lista=el('div');const atual=()=>{lista.replaceChildren();const c=contexto(),l=F.nivelClasse(c,'Druida'),lua=F.classes(c).some(e=>e.subclasse==='Círculo da Lua');const max=lua?(l>=6?Math.floor(l/3):1):l>=8?1:l>=4?.5:.25;for(const cr of A.criaturas){if(papel==='Forma Selvagem'&&(!cr.tipo.startsWith('Besta')||cr.nd>max||cr.voo&&l<8||cr.natacao&&l<4))continue;if(papel==='Familiar'&&!['Coruja','Corvo','Gato','Rato','Morcego','Aranha','Sapo','Lagarto','Doninha','Cobra Venenosa','Cavalo-Marinho','Caranguejo','Peixe','Polvo','Falcão'].includes(cr.nome))continue;lista.append(el('div',{class:'forja-item-detalhe'},el('span',{},cr.nome+' • ND '+cr.nd+' • '+cr.deslocamento),botao('Adicionar',()=>{if(papel==='Forma Selvagem'&&(!l||!vistas))throw Error('Forma Selvagem exige druida e criatura já vista.');if(papel==='Companheiro Revisado'&&!F.classes(c).some(e=>e.classe==='Patrulheiro'&&e.subclasse==='Conclave da Besta'&&e.nivel>=3))throw Error('Essa origem exige o Conclave da Besta nível 3.');const e={...JSON.parse(JSON.stringify(cr)),papel,pvAtual:cr.pv};if(papel==='Companheiro Revisado'){const lv=F.nivelClasse(c,'Patrulheiro');e.pv=Math.max(cr.pv,cr.pv+(lv-3)*(Math.floor(8/2)+1));e.pvAtual=e.pv;e.descricao+='\nCompanheiro Revisado: usa seu bônus de proficiência '+R.bonusProficiencia(F.nivelTotal(c))+' no lugar do próprio; adiciona à CA e dano, duas perícias à escolha e proficiência em todas as salvaguardas. Recebe um Dado de Vida por nível após o 3º e melhorias nos níveis do patrulheiro. Revise os atributos ao evoluir.';}detalhesFicha.criaturas.push(e);fecharDialogo();aplicar();})));}};n.append(campo('Papel','forja-criatura-papel',papel,v=>{papel=v;atual();},{opcoes:['Familiar','Forma Selvagem','Companheiro Revisado','Aliado']}),el('p',{class:'forja-nota'},'Forma Selvagem: as criaturas da lista devem ter sido vistas; limites de voo/natação e ND são filtrados. Substituir a forma não altera atributos ou PV da ficha original.'),lista);atual();abrirDialogo('Criaturas do apêndice',n);}
function editarCriatura(indice){const c=indice===undefined?{id:novoId('criatura'),nome:'',papel:'Aliado',tipo:'Besta',nd:0,pv:1,pvAtual:1,ca:10,deslocamento:'9 m',atributos:{},ataques:[],descricao:'',autorizada:true}:{...detalhesFicha.criaturas[indice]};abrirDialogo('Criatura autorizada pelo Mestre',el('div',{},campo('Nome','forja-cr-nome',c.nome,v=>c.nome=v,{maxlength:100}),campo('Papel','forja-cr-papel',c.papel,v=>c.papel=v,{opcoes:['Familiar','Forma Selvagem','Companheiro Revisado','Aliado']}),campo('Tipo','forja-cr-tipo',c.tipo||'Besta',v=>c.tipo=v,{maxlength:80}),campo('Nível de desafio','forja-cr-nd',c.nd??0,v=>c.nd=Number(v),{tipo:'number',min:0,max:30,step:.125}),campo('Classe de Armadura','forja-cr-ca',c.ca||10,v=>c.ca=R.inteiro(v),{tipo:'number',min:1,max:40}),campo('PV máximos','forja-cr-max',c.pv,v=>c.pv=R.inteiro(v),{tipo:'number',min:1}),campo('Deslocamentos','forja-cr-deslocamento',c.deslocamento||'9 m',v=>c.deslocamento=v,{maxlength:120}),campo('Estatísticas, atributos, ataques e origem','forja-cr-desc',c.descricao,v=>c.descricao=v,{area:true,maxlength:30000}),botao('Salvar criatura',()=>{if(typeof ForjaCriaturas!=='undefined'){const validada=ForjaCriaturas.criarPersonalizada(c);Object.assign(c,validada,{papel:c.papel,pvAtual:Math.min(c.pv,c.pvAtual||c.pv),autorizada:true});}else if(!c.nome.trim()||c.pv<1)throw Error('Informe nome e PV.');c.pvAtual=Math.min(c.pv,c.pvAtual);if(indice===undefined)detalhesFicha.criaturas.push(c);else detalhesFicha.criaturas[indice]=c;fecharDialogo();aplicar();})) );}
function renderMagias(root,criacao){const c=contexto(),fontes=F.fontesConjuracao(c,bancoDnD);if(!fontes.length){root.append(el('p',{},'Este personagem ainda não tem uma fonte de conjuração. Magias raciais e talentos aparecem aqui quando aplicáveis.'));return;}
 const selecionadas=[...detalhesFicha.magias.selecoes,...F.magiasFixas(c,ForjaMagias)];
 if(!criacao){const slots=painel('Espaços de magia');for(const e of F.espacos(c,bancoDnD))slots.append(el('div',{class:'forja-recurso'},el('strong',{},(e.tipo==='pacto'?'Pacto':'Círculo')+' '+e.circulo),el('span',{},e.disponiveis+'/'+e.max+' • descanso '+e.recupera),botao('Devolver espaço',()=>{if((detalhesFicha.magias.gastos[e.id]||0)>0)detalhesFicha.magias.gastos[e.id]--;aplicar();})));if(!F.espacos(c,bancoDnD).length)slots.append(el('p',{},'Fontes raciais e de talentos usam suas próprias reservas.'));const concentrada=ForjaMagias.find(x=>x.id===detalhesFicha.magias.concentracao);slots.append(el('p',{},'Concentração: '+(concentrada?.nome||'nenhuma')),botao('Encerrar concentração',()=>{detalhesFicha.magias.concentracao=null;aplicar();}));root.append(slots);}
 for(const f of fontes){const p=painel(f.nome);p.append(el('div',{class:'forja-conjuracao-status'},el('div',{},el('small',{},'Atributo'),el('strong',{},f.atributo.toUpperCase())),el('div',{},el('small',{},'CD para resistir'),el('strong',{},String(f.cd))),el('div',{},el('small',{},'Ataque mágico'),el('strong',{},formatarBonus(f.ataque)))),el('p',{class:'forja-nota'},'CD = 8 + proficiência '+R.bonusProficiencia(F.nivelTotal(c))+' + modificador de '+f.atributo.toUpperCase()+'.'));
 const sel=selecionadas.filter(x=>x.fonte===f.id),proprias=sel.filter(x=>!x.sempre),truques=proprias.filter(x=>ForjaMagias.find(m=>m.id===x.id)?.nivel===0).length;let info='Truques '+truques+'/'+f.truques;if(f.modo==='grimorio')info+=' • Grimório '+(proprias.length-truques)+' • Preparadas '+proprias.filter(x=>x.preparada&&ForjaMagias.find(m=>m.id===x.id)?.nivel>0).length+'/'+f.conhecidas;else if(f.conhecidas!==null)info+=' • '+(f.modo==='preparadas'?'Preparadas':'Conhecidas')+' '+(proprias.length-truques)+'/'+f.conhecidas;p.append(el('p',{},info));if(f.modo!=='fixa')p.append(botao('Escolher magias — '+f.nome,()=>catalogoMagias(f.id)));
 for(let circulo=0;circulo<=9;circulo++){const desse=sel.filter(s=>ForjaMagias.find(m=>m.id===s.id)?.nivel===circulo);if(!desse.length)continue;const sec=detalhes(circulo===0?'Truques':circulo+'º círculo');for(const s of desse){const m=ForjaMagias.find(x=>x.id===s.id);if(!m)continue;const escala=F.escalonamentoMagia(m,F.nivelTotal(c));const row=el('article',{class:'forja-magia'},el('h4',{},m.nome+(s.sempre?' • sempre disponível':'')),el('p',{class:'forja-nota'},m.escola+' • '+m.tempo+' • '+m.alcance+' • '+m.duracao+(m.ritual?' • ritual':'')+(m.concentracao?' • concentração':'')),el('p',{},'Componentes: '+m.componentes),detalhes('Efeito e escalonamento',el('p',{class:'forja-texto'},m.descricao),escala.nota?el('p',{},escala.nota+(escala.dados?' • dados no nível atual: '+escala.dados:'')):null,el('small',{},'LDJ fornecido p. '+m.referencia.pagina)));
 if(['grimorio','preparadas'].includes(f.modo)&&m.nivel>0&&!s.sempre)row.append(botao(s.preparada?'Retirar da preparação':'Preparar',()=>{if(!s.preparada&&proprias.filter(x=>x.preparada&&ForjaMagias.find(m=>m.id===x.id)?.nivel>0).length>=f.conhecidas)throw Error('Limite de preparação alcançado.');s.preparada=!s.preparada;aplicar();}));if(!s.sempre)row.append(botao('Remover da lista',()=>{detalhesFicha.magias.selecoes=detalhesFicha.magias.selecoes.filter(x=>!(x.id===s.id&&x.fonte===s.fonte));aplicar();}));if(!criacao)row.append(botao('Conjurar',()=>conjurar(s)));sec.append(row);}p.append(sec);}root.append(p);}
 if(!criacao&&detalhesFicha.magias.historico.length)root.append(detalhes('Últimos lançamentos',...detalhesFicha.magias.historico.map(x=>el('p',{},(ForjaMagias.find(m=>m.id===x.id)?.nome||x.id)+' • '+x.fonte+' • '+x.reserva))));
}
function catalogoMagias(fonte){const c=contexto(),f=F.fontesConjuracao(c,bancoDnD).find(x=>x.id===fonte);if(!f)throw Error('Fonte indisponível.');const n=el('div'),busca=el('input',{type:'search','aria-label':'Buscar magia',placeholder:'Buscar pelo nome ou efeito'}),lista=el('div');let circulo='todos';n.append(busca,campo('Círculo','forja-filtro-circulo',circulo,v=>{circulo=v;montar();},{opcoes:[['todos','Todos'],...Array.from({length:10},(_,i)=>[String(i),i===0?'Truques':i+'º círculo'])]}),el('p',{class:'forja-nota'},f.modo==='grimorio'?'O grimório começa com seis magias e recebe duas por nível. Copiar outras magias custa normalmente 50 PO e 2 horas por círculo, com reduções da escola pertinentes.':'As opções respeitam a lista e o nível desta fonte.'),lista);
 const montar=()=>{lista.replaceChildren();const termo=R.normalizar(busca.value),selecionadas=detalhesFicha.magias.selecoes.filter(x=>x.fonte===fonte);for(const m of ForjaMagias.filter(m=>(circulo==='todos'||m.nivel===Number(circulo))&&R.normalizar(m.nome+' '+m.descricao).includes(termo)).filter(m=>{try{F.validarEscolhaMagia(c,bancoDnD,ForjaMagias,fonte,m.id);return true;}catch(_){return false;}}).slice(0,70)){const tem=selecionadas.some(x=>x.id===m.id);lista.append(el('article',{class:'forja-item-detalhe'},el('div',{},el('strong',{},m.nome),el('small',{},(m.nivel||'Truque')+' • '+m.escola+' • '+m.tempo+' • '+m.alcance)),botao(tem?'Na ficha':'Aprender / registrar',()=>{adicionarMagia(fonte,m.id);montar();},{disabled:tem}),detalhes('Ver efeito',el('p',{class:'forja-texto'},m.descricao))));}};busca.addEventListener('input',montar);montar();abrirDialogo('Magias — '+f.nome,n);
}
function adicionarMagia(fonte,id){const {f,m}=F.validarEscolhaMagia(contexto(),bancoDnD,ForjaMagias,fonte,id),s=detalhesFicha.magias.selecoes.filter(x=>x.fonte===fonte);if(s.some(x=>x.id===id))throw Error('Essa magia já está registrada nessa fonte.');const truques=s.filter(x=>ForjaMagias.find(m=>m.id===x.id)?.nivel===0).length;if(m.nivel===0&&f.modo!=='segredos'&&truques>=f.truques)throw Error('Limite de truques alcançado.');if(m.nivel>0&&['conhecidas','terco','iniciado','ritual','arcano'].includes(f.modo)&&s.length-truques>=f.conhecidas)throw Error('Limite de magias conhecidas alcançado.');if(f.modo==='segredos'&&s.length>=2)throw Error('Escolha duas magias de Segredos Mágicos.');if(f.modo==='iniciado'&&m.nivel>1)throw Error('Iniciado em Magia concede uma magia de 1º círculo.');if(f.modo==='terco'&&m.nivel>0){const escolas=f.nome==='Cavaleiro Arcano'?['abjuração','evocação']:['encantamento','ilusão'];const livres=1+[8,14,20].filter(l=>l<=f.nivel).length;if(!escolas.includes(m.escola)&&s.filter(x=>{const a=ForjaMagias.find(m=>m.id===x.id);return a?.nivel>0&&!escolas.includes(a.escola);}).length>=livres)throw Error('As demais magias devem pertencer às escolas '+escolas.join(' / ')+'.');}
 const maxPreparadas=f.conhecidas,preparadas=s.filter(x=>x.preparada&&ForjaMagias.find(m=>m.id===x.id)?.nivel>0).length;detalhesFicha.magias.selecoes.push({id,fonte,preparada:m.nivel===0||!['grimorio','preparadas'].includes(f.modo)||preparadas<maxPreparadas,nivelEscolha:F.nivelTotal(contexto())});aplicar();notificacao(m.nome+' registrada.');
}
function conjurar(selecao){const m=ForjaMagias.find(x=>x.id===selecao.id);let reserva=F.espacos(contexto(),bancoDnD).find(x=>x.circulo>=m.nivel&&x.disponiveis>0)?.id||'',ritual=false,materialConfirmado=false,trocarConcentracao=false;const n=el('div',{},el('h3',{},m.nome),el('p',{},m.componentes),el('p',{class:'forja-nota'},m.materialCusto||m.materialConsumido?'Material com custo ou consumido não pode ser substituído por foco ou bolsa.':'Componentes somáticos exigem mão livre; a mão do material pode executar o somático. Use foco permitido pela fonte ou bolsa para materiais sem custo, não consumidos.'),campo('Espaço a consumir','forja-conjurar-espaco',reserva,v=>reserva=v,{opcoes:[['','Uso próprio / truque'],...F.espacos(contexto(),bancoDnD).filter(x=>x.circulo>=m.nivel).map(x=>[x.id,x.tipo+' '+x.circulo+' ('+x.disponiveis+' disponíveis)'])]}));if(m.ritual)n.append(campo('Conjurar como ritual (+10 minutos)','forja-conjurar-ritual','nao',v=>ritual=v==='sim',{opcoes:[['nao','Não'],['sim','Sim']]}));n.append(campo('Material necessário disponível e autorizado para uso','forja-conjurar-material','nao',v=>materialConfirmado=v==='sim',{opcoes:[['nao','Confirmar componentes'],['sim','Sim']]}));if(m.concentracao&&detalhesFicha.magias.concentracao)n.append(campo('Encerrar a concentração anterior','forja-conjurar-concentracao','nao',v=>trocarConcentracao=v==='sim',{opcoes:[['nao','Manter anterior'],['sim','Trocar para esta magia']]}));n.append(botao('Confirmar lançamento',()=>{const c=contexto(),e=equipamentoAtivo();const semProficiencia=R.classeArmadura(c,bancoDnD,e.armadura,e.escudo).semProficiencia.length>0;detalhesFicha=F.lancar(c,bancoDnD,ForjaMagias,selecao,reserva,{ritual,materialConfirmado,trocarConcentracao,semProficiencia});fecharDialogo();aplicar();mostrarToast(m.nome+' conjurada'+(ritual?' como ritual.':'.'),'sucesso');}));abrirDialogo('Lançamento de magia',n);}
let escolhasTemporarias={};
function configuracaoTalento(nome,valor,alterar){const t=talentos[nome];if(!t)return el('p',{},'Talento não cadastrado.');const id=t.id,n=el('div',{},el('p',{class:'forja-texto'},t.beneficios));const escolher=(key,titulo,max,opcoes)=>n.append(grupoEscolha('forja-talento-'+key,titulo,max,opcoes,valor[key]||[],nova=>{valor[key]=nova;alterar(valor);}));
 const bonus=BONUS_ATRIBUTOS_TALENTOS[nome];if(bonus)n.append(campo('Atributo que recebe +1','forja-talento-bonus',valor.atributo||bonus[0],v=>{valor.atributo=v;alterar(valor);},{opcoes:bonus}));
 if(bonus&&!valor.atributo)valor.atributo=bonus[0];
 if(id==='skilled')escolher('mistas','Três perícias / ferramentas',3,[...Object.keys(bancoDnD.pericias).map(x=>'pericia: '+x),...O.ferramentas.map(x=>'ferramenta: '+x)]);
 if(id==='weapon-master')escolher('armas','Quatro armas',4,listarArmasBanco(false).map(x=>x.nome));
 if(id==='linguist')escolher('idiomas','Três idiomas',3,['Anão','Élfico','Gigante','Gnômico','Goblin','Halfling','Orc','Abissal','Celestial','Dracônico','Infernal','Primordial','Silvestre','Subcomum']);
 if(id==='elemental-adept')escolher('elemento','Elemento',1,['ácido','elétrico','fogo','frio','trovão']);
 if(id==='martial-adept')escolher('manobras','Duas manobras',2,O.manobras);
 if(['magic-initiate','ritual-caster','spell-sniper'].includes(id))n.append(campo('Lista / atributo de conjuração','forja-talento-classe',valor.classe||'',v=>{valor.classe=v;alterar(valor);},{opcoes:[['','Escolha uma classe'],...['Bardo','Bruxo','Clérigo','Druida','Feiticeiro','Mago']]}),el('p',{class:'forja-nota'},'Depois de salvar, selecione as magias na página de Conjuração.'));
 return n;
}
function normalizarEscolhasTalento(valor){const v=JSON.parse(JSON.stringify(valor));if(v.mistas){v.pericias=v.mistas.filter(x=>x.startsWith('pericia: ')).map(x=>x.slice(9));v.ferramentas=v.mistas.filter(x=>x.startsWith('ferramenta: ')).map(x=>x.slice(12));}return v;}
function validarTalento(nome,escolhas={},atual=null){const t=talentos[nome]||Object.values(talentos).find(x=>x.id===atual?.talentoId);if(!t)return [];const erros=F.requisitoTalento(contexto(),bancoDnD,t);const obrigatorio={skilled:['mistas',3],'weapon-master':['armas',4],linguist:['idiomas',3],'elemental-adept':['elemento',1],'martial-adept':['manobras',2]};const a=obrigatorio[t.id];if(a&&(!Array.isArray(escolhas[a[0]])||escolhas[a[0]].length!==a[1]||new Set(escolhas[a[0]]).size!==a[1]))erros.push('Complete as '+a[1]+' escolhas do talento.');if(['magic-initiate','ritual-caster','spell-sniper'].includes(t.id)&&!escolhas.classe)erros.push('Escolha uma lista de magias.');if(t.id==='elemental-adept'&&tracosPersonagem.some(x=>x!==atual&&x.talentoId===t.id&&x.escolhas?.elemento?.[0]===escolhas.elemento?.[0]))erros.push('Esse elemento já foi escolhido em Adepto Elemental.');return erros;}
function editarTalento(traco){const valor=JSON.parse(JSON.stringify(traco.escolhas||{}));const n=configuracaoTalento(traco.nome,valor,v=>Object.assign(valor,v));n.append(botao('Salvar escolhas do talento',()=>{const e=validarTalento(traco.nome,valor,traco);if(e.length)throw Error(e.join(' '));if(BONUS_ATRIBUTOS_TALENTOS[traco.nome]){const sigla=valor.atributo;const antes=R.atributos({...contexto(),tracos:tracosPersonagem.filter(x=>x!==traco)},bancoDnD).valores[sigla];if(antes>=20)throw Error('O bônus não pode aumentar o atributo acima de 20.');traco.bonusAtributo={sigla,quantidade:1};}traco.escolhas=normalizarEscolhasTalento(valor);fecharDialogo();aplicar();}));abrirDialogo('Escolhas de '+traco.nome,n);}
function prepararTalento(nome){escolhasTemporarias={};let botaoExtra=$('forja-configurar-talento');if(botaoExtra)botaoExtra.remove();botaoExtra=botao('Configurar escolhas do talento',()=>{const valor=escolhasTemporarias,n=configuracaoTalento(nome,valor,v=>Object.assign(valor,v));n.append(botao('Guardar escolhas',()=>{escolhasTemporarias=normalizarEscolhasTalento(valor);fecharDialogo();}));abrirDialogo('Escolhas de '+nome,n);},{id:'forja-configurar-talento'});$('resumo-talento-selecionado').append(botaoExtra);}
function obterEscolhasTalento(nome){const valor=normalizarEscolhasTalento(escolhasTemporarias),erros=validarTalento(nome,valor);if(erros.length)throw Error(erros.join(' '));return valor;}
function podeRepetirTalento(nome){const id=talentos[nome]?.id;return id==='elemental-adept'||!tracosPersonagem.some(x=>x.tipo==='talento'&&R.talentoId(x)===id);}
function exportar(){ForjaEstado.validar(capturarEstado());baixar('forja-'+ForjaCatalogo.id(contexto().nome||'rascunho')+'.json',{formato:'forja-ficha',schemaVersion:3,ficha:capturarEstado()});}
function baixar(nome,dados){const blob=new Blob([JSON.stringify(dados,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=el('a',{href:url,download:nome});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function importar(){
 const arq=el('input',{type:'file',accept:'.json,application/json',class:'forja-arquivo-input','aria-label':'Arquivo JSON da ficha ou coleção'}),estado=el('p',{class:'forja-importacao-estado',role:'status'}),erro=el('p',{class:'forja-erro-inline',role:'alert',hidden:true});
 const escolher=botao('Selecionar arquivo JSON',()=>arq.click(),{class:'forja-acao-principal'});
 arq.addEventListener('change',async()=>{const f=arq.files[0];if(!f)return;erro.hidden=true;escolher.disabled=true;estado.textContent='Lendo '+f.name+'…';try{if(f.size>20000000)throw Error('Limite de 20 MB por arquivo.');const texto=await f.text();if(!arq.isConnected||!$('forja-dialogo').open)return;ForjaColecao.importar(window.localStorage,texto,bancoDnD,ForjaMagias);fecharDialogo();colecao();mostrarToast('Importação validada. Abra a ficha importada na coleção.','sucesso');}catch(e){erro.hidden=false;erro.textContent='Não foi possível importar. '+(e instanceof SyntaxError?'O arquivo não contém um JSON válido. Selecione um arquivo exportado pela Forja.':e.message);estado.textContent=f.name;mostrarToast('Importação recusada: '+e.message);}finally{escolher.disabled=false;arq.value='';}});
 abrirDialogo('Importar personagens',el('div',{class:'forja-transferencia'},el('p',{class:'forja-dialogo-descricao'},'Traga uma ficha ou uma coleção exportada pela Forja.'),el('div',{class:'forja-arquivo-area'},icone('enviar'),el('strong',{},'Escolha seu arquivo'),el('span',{},'Formato JSON · até 20 MB'),escolher,arq),estado,erro,el('p',{class:'forja-nota'},'Fichas que já estão na coleção entram como cópias. Seus personagens atuais são preservados.')),'importar');
}
function salvarColecao(){if(salvamentoBloqueado)throw Error('Resolva o aviso de salvamento antes de trocar de personagem.');ForjaColecao.guardar(window.localStorage,capturarEstado());}
function abrirFicha(estado){ForjaEstado.validar(estado);ForjaEstado.salvar(window.localStorage,estado);exibindoHub=false;document.body.classList.remove('modo-hub');$('forja-hub').hidden=true;$('forja-barra').hidden=false;$('criacao-rapida').hidden=Boolean(estado.fichaGerada);$('ficha-completa').hidden=false;$('criacao-rapida').style.display=estado.fichaGerada?'none':'block';$('ficha-completa').style.display=estado.fichaGerada?'block':'none';restaurarEstado();if(!$('ficha-completa').style.display||$('ficha-completa').style.display==='none'){$('criacao-rapida').hidden=false;$('criacao-rapida').style.display='block';mostrarEtapa(1);}renderizar();window.scrollTo({top:0,behavior:'instant'});}
function estadoNovoPersonagem(){const e=capturarEstado();Object.assign(e,{nome:'',raca:'',subraca:'',classe:'',subclasse:'',alinhamento:'',antecedente:'',nivel:1,atributos:Object.fromEntries(Object.keys(R.ATRIBUTOS).map(x=>[x,10])),tracos:[],ataques:[],inventario:[],proficienciasAdicionais:[],progressosResolvidos:[],periciasClasse:[],periciasManuais:{},especializacoes:[],percepcaoSituacao:'normal',detalhes:F.novo(),recursos:{pvAtual:null,pvTemporarios:0},equipamento:{armadura:null,escudo:null},tracosAutomaticosExpandidos:[],fichaGerada:false});return e;}
function criarPersonagem(){const estado=estadoNovoPersonagem();estado.detalhes.escolhas.criacaoNova=true;abrirFicha(estado);}
function cardPersonagem(p){const ctx={...p,detalhes:p.detalhes,recursos:p.recursos,inventario:p.inventario,equipamento:p.equipamento},max=F.pvMaximos(ctx,bancoDnD),pv=p.recursos?.pvAtual??max,retrato=p.detalhes?.historia?.retrato;const card=el('article',{class:'forja-heroi-card','data-id':p.detalhes.id});const visual=retrato?el('img',{src:retrato,alt:'Retrato de '+(p.nome||'personagem')}):el('div',{class:'forja-heroi-monograma','aria-hidden':'true'},(p.nome||'?').trim().slice(0,1).toUpperCase());card.append(el('div',{class:'forja-heroi-visual'},visual,el('span',{class:'forja-heroi-nivel'},'Nível '+p.nivel)),el('div',{class:'forja-heroi-corpo'},el('small',{},(p.subraca||p.raca||'Origem pendente')+' • '+(p.antecedente||'Sem antecedente')),el('h2',{},p.nome||'Rascunho sem nome'),el('p',{},(p.classe||'Classe pendente')+(p.subclasse?' — '+p.subclasse:'')),el('div',{class:'forja-heroi-status'},el('span',{},'PV ',el('strong',{},pv+'/'+max)),el('span',{},'Itens ',el('strong',{},String(p.inventario?.length||0))))),el('div',{class:'forja-heroi-acoes'},botao('Abrir ficha',()=>abrirFicha(p),{class:'forja-acao-principal'}),botao('Duplicar',()=>{const copia=JSON.parse(JSON.stringify(p));copia.detalhes.id=F.novo().id;copia.nome=(p.nome||'Rascunho')+' (cópia)';ForjaColecao.guardar(window.localStorage,copia);renderizarHub();mostrarToast('Personagem duplicado.','sucesso');}),botao('Renomear',()=>renomearPersonagem(p)),botao('Lixeira',()=>{ForjaColecao.excluir(window.localStorage,p.detalhes.id);renderizarHub();mostrarToast('Personagem movido para a lixeira.','sucesso');})));return card;}
function renomearPersonagem(p){let nome=p.nome;abrirDialogo('Renomear personagem',el('div',{class:'forja-confirmacao'},campo('Novo nome','forja-renomear',nome,v=>nome=v,{maxlength:60}),acoesDialogo(botao('Salvar nome',()=>{if(!nome.trim())throw Error('Informe um nome.');p.nome=nome.trim();ForjaColecao.guardar(window.localStorage,p);if(p.detalhes.id===detalhesFicha.id){$('nome-personagem').value=p.nome;aplicar();}fecharDialogo();renderizarHub();mostrarToast('Nome do personagem atualizado.','sucesso');},{class:'forja-acao-principal'}))),'renomear');}
function renderizarHub(){
 const c=ForjaColecao.ler(window.localStorage),hub=limpar('forja-hub');
 const acoes=el('div',{class:'forja-hub-acoes'},
  botao('Novo personagem',confirmarNovoPersonagem,{class:'forja-acao-principal'}),
  botao('Painel Admin',()=>{window.location.href='admin.html';}),
  botao('Instalar app',instalarApp,{'data-forja-instalar':'1',hidden:!promptInstalacao}),
  botao('Importar ficha',importar),
  botao('Backup',confirmarBackup),botao([icone('lixeira'),el('span',{},'Lixeira'),el('span',{class:'forja-contador'},String(c.lixeira.length))],abrirLixeira,{'aria-label':'Abrir lixeira ('+c.lixeira.length+')',class:'btn-secundario forja-lixeira-atalho'})
 );
 hub.append(el('header',{class:'forja-hub-cabecalho'},
  el('div',{},el('span',{class:'forja-hub-marca'},'FORJA DE PERSONAGENS'),el('h1',{},'Seus heróis'),el('p',{},c.personagens.length?'Escolha uma ficha para voltar à aventura.':'Crie seu primeiro personagem para começar.')),
  acoes
 ));
 const grade=el('section',{class:'forja-herois-grade','aria-label':'Personagens salvos'});
 c.personagens.forEach(p=>grade.append(cardPersonagem(p)));
 if(!c.personagens.length)grade.append(el('div',{class:'forja-hub-vazio'},el('span',{'aria-hidden':'true'},'✦'),el('h2',{},'Uma nova história espera por você'),el('p',{},'Monte sua ficha em nove etapas e deixe os cálculos por conta da Forja.'),botao('Criar personagem',confirmarNovoPersonagem,{class:'forja-acao-principal'})));
 hub.append(grade);
 ForjaTransicoes.staggerCards?.(grade);
}
function mostrarHub(){if(!exibindoHub&&$('ficha-completa').style.display==='block')salvarColecao();exibindoHub=true;document.body.classList.add('modo-hub');$('forja-hub').hidden=false;$('forja-barra').hidden=true;$('criacao-rapida').hidden=true;$('ficha-completa').hidden=true;renderizarHub();ForjaTransicoes.mostrar(document.querySelector('.forja-herois-grade'));}
function abrirHubInicial(){if(window.sessionStorage.getItem('forjaPersonagens.abrirDireto')){window.sessionStorage.removeItem('forjaPersonagens.abrirDireto');return;}let c=ForjaColecao.ler(window.localStorage);if($('ficha-completa').style.display==='block'&&!c.personagens.some(p=>p.detalhes.id===detalhesFicha.id)){salvarColecao();c=ForjaColecao.ler(window.localStorage);}if(c.personagens.length)mostrarHub();}
function colecao(){mostrarHub();}
function abrirColecaoSemSalvar(){exibindoHub=true;document.body.classList.add('modo-hub');$('forja-hub').hidden=false;$('forja-barra').hidden=true;$('criacao-rapida').hidden=true;$('ficha-completa').hidden=true;renderizarHub();}
function imprimir(){const op={principal:true,historia:true,magias:true,efeitos:false};const n=el('div');for(const [k,t]of [['principal','Página principal'],['historia','História e apresentação'],['magias','Conjuração'],['efeitos','Incluir descrições completas das magias e características']])n.append(campo(t,'forja-print-'+k,op[k]?'sim':'nao',v=>op[k]=v==='sim',{opcoes:[['sim','Incluir'],['nao','Omitir']]}));n.append(botao('Abrir versão de impressão',()=>{const c=contexto(),w=window.open('','_blank');if(!w)throw Error('Permita abrir a versão de impressão no navegador.');w.opener=null;w.document.title='Ficha — '+c.nome;const style=w.document.createElement('style');style.textContent='body{font:12pt Georgia,serif;line-height:1.4;color:#171717;margin:1cm}h1{font-size:25pt}h2{border-bottom:2px solid #333}h3{break-after:avoid}section.pagina{break-before:page}section.pagina:first-child{break-before:auto}table{border-collapse:collapse;width:100%;margin:.6em 0}td,th{border:1px solid #aaa;padding:5px;text-align:left}p{white-space:pre-wrap;overflow-wrap:anywhere}img{max-width:5cm;max-height:7cm}small{font-size:9pt}article{margin:1em 0}.resumo{display:flex;gap:1em;flex-wrap:wrap}@page{size:A4;margin:1.2cm}@media print{.acoes{display:none}}';w.document.head.append(style);const body=w.document.body;const add=node=>body.append(w.document.importNode(node,true));
 const tabela=linhas=>el('table',{},el('tbody',{},linhas.map(l=>el('tr',{},l.map(x=>el('td',{},String(x)))))));
 if(op.principal){const p=el('section',{class:'pagina'},el('h1',{},c.nome),el('p',{},c.raca+' / '+c.subraca+' • '+F.classes(c).map(e=>e.classe+' '+e.nivel+' '+(e.subclasse||'')).join(' / ')),el('p',{},'Jogador: '+detalhesFicha.jogador+' • '+c.antecedente+' • '+c.alinhamento+' • '+(detalhesFicha.inspiracao?'Inspiração marcada':'Sem inspiração')),el('p',{},'Perfil: Livro do Jogador 2014 + Patrulheiro Revisado'),tabela(Object.entries(R.atributos(c,bancoDnD).valores).map(([s,v])=>[s.toUpperCase(),v,formatarBonus(R.modificador(v))])),tabela([['CA',$('display-ca').textContent,'Iniciativa',$('display-iniciativa').textContent,'Deslocamento',$('display-deslocamento').textContent+' m'],['PV atuais',recursosPersonagem.pvAtual,'PV máximos',F.pvMaximos(c,bancoDnD),'Temporários',recursosPersonagem.pvTemporarios]]),el('p',{},$('calculo-ca').textContent),tabela(Object.keys(bancoDnD.pericias).map(x=>[x,$('valor-'+x).textContent,R.fontesPericias(c,bancoDnD)[x].join(', ')])),el('p',{},'Percepção passiva '+$('display-percepcao-passiva').textContent),el('h3',{},'Salvaguardas'),tabela(Object.keys(R.ATRIBUTOS).map(s=>[s.toUpperCase(),$('valor-salva-'+s).textContent])),el('h3',{},'Ataques'),tabela(ataquesPersonagem.map(a=>{const v=calcularDadosAtaque(a);return[a.nomeArma,v?.bonusTexto||v?.bonusAtaque||'—',v?.dano||'—'];})),el('h3',{},'Equipamento e moedas'),tabela(inventarioPersonagem.map(x=>[x.nome,x.quantidade,x.peso+' kg',equipamentoPersonagem.armadura===x.id||equipamentoPersonagem.escudo===x.id?'Em uso':'Guardado'])),el('p',{},Object.entries(detalhesFicha.moedas).map(([m,v])=>v+' '+m.toUpperCase()).join(' • ')),el('p',{},'Carga '+F.peso(c,bancoDnD).total+' kg'),el('h3',{},'Proficiências e idiomas'),...Object.entries(R.proficiencias(c,bancoDnD)).map(([tipo,v])=>el('p',{},tipo+': '+v.join(', '))),el('h3',{},'Recursos'),tabela(F.maxRecursos(c,bancoDnD).map(x=>[x.nome,x.disponivel+'/'+x.max,x.recupera])),el('p',{},'Condições: '+detalhesFicha.sessao.condicoes.join(', ')+' • Exaustão '+detalhesFicha.sessao.exaustao),el('p',{},'Testes de morte: '+JSON.stringify(detalhesFicha.sessao.morte)),...['tracos','ideais','vinculos','defeitos'].map(k=>el('p',{},camposHistoria[k]+': '+(detalhesFicha.historia[k]||''))),el('h3',{},'Características'),...F.caracteristicas(c,bancoDnD).map(x=>el('article',{},el('strong',{},x.nome+' — '+x.fonte+' '+x.nivel),op.efeitos?el('p',{},x.descricao):null)),...tracosPersonagem.map(t=>el('article',{},el('strong',{},t.nome),el('p',{},t.descricao))));add(p);}
 if(op.historia){const p=el('section',{class:'pagina'},el('h2',{},'História e apresentação'));for(const [k,t]of Object.entries(camposHistoria).filter(([k])=>!['tesouro','adicionais','divindade','planos','estiloVida'].includes(k)))p.append(el('h3',{},t),el('p',{},detalhesFicha.historia[k]||'—'));for(const k of ['retrato','simbolo'])if(detalhesFicha.historia[k])p.append(el('img',{src:detalhesFicha.historia[k],alt:k}));for(const cr of detalhesFicha.criaturas)p.append(el('h3',{},cr.nome+' — '+cr.papel),el('p',{},cr.pvAtual+'/'+cr.pv+' PV\n'+cr.descricao));add(p);}
 if(op.magias){const concentrada=ForjaMagias.find(x=>x.id===detalhesFicha.magias.concentracao);const p=el('section',{class:'pagina'},el('h2',{},'Conjuração'),el('p',{},'Concentração atual: '+(concentrada?.nome||'nenhuma')),tabela(F.espacos(c,bancoDnD).map(e=>[e.tipo,e.circulo,e.disponiveis+'/'+e.max])));for(const f of F.fontesConjuracao(c,bancoDnD)){p.append(el('h3',{},f.nome+' • '+f.atributo.toUpperCase()+' • CD '+f.cd+' • ataque '+formatarBonus(f.ataque)));const todas=[...detalhesFicha.magias.selecoes,...F.magiasFixas(c,ForjaMagias)].filter(x=>x.fonte===f.id).sort((a,b)=>ForjaMagias.find(m=>m.id===a.id).nivel-ForjaMagias.find(m=>m.id===b.id).nivel);for(const s of todas){const m=ForjaMagias.find(x=>x.id===s.id);p.append(el('article',{},el('strong',{},(s.preparada?'● ':'○ ')+m.nome+' • '+m.nivel+'º'),el('p',{},m.tempo+' • '+m.alcance+' • '+m.duracao+'\nComponentes: '+m.componentes),op.efeitos?el('p',{},m.descricao):null));}}add(p);}
 add(el('p',{class:'acoes'},'Use Imprimir e escolha “Salvar como PDF” para exportar.'));w.print();fecharDialogo();}));abrirDialogo('Conteúdo da impressão',n);}
function confirmarPV(chave,tipo,valor){const concentracao=chave==='pvAtual'&&tipo==='dano'&&detalhesFicha.magias.concentracao;if(chave==='pvTemporarios')recursosPersonagem={...recursosPersonagem,pvTemporarios:valor};else if(tipo==='valor')recursosPersonagem={...recursosPersonagem,pvAtual:valor};else if(tipo==='dano'){aoSofrerDano(Math.abs(valor),recursosPersonagem);recursosPersonagem=R.aplicarDano(recursosPersonagem,Math.abs(valor));}else{if(detalhesFicha.sessao.morte.morto)throw Error('Cura comum não revive um personagem morto.');recursosPersonagem=registrarCura(valor,recursosPersonagem);}aposPV();atualizarDisplayPV();salvarEstado();if(!concentracao)mostrarToast(chave==='pvTemporarios'?'PV temporários atualizados.':'Pontos de vida atualizados.','sucesso');}
function contextoNivel(){const c=contexto(),n=R.nivel($('novo-nivel-personagem').value);return {...c,nivel:n,detalhes:{...detalhesFicha,niveis:detalhesFicha.opcoes.multiclasse?detalhesFicha.niveis:[]}};}
function prepararPVNivel(){ganhosPVNivel??={...detalhesFicha.ganhosPV};const foco=document.activeElement?.id;let root=$('forja-pv-nivel');if(!root){root=el('div',{id:'forja-pv-nivel'});document.querySelector('#modal-nivel .acoes-modal-traco').before(root);}root.replaceChildren();criacao.renderPV(root,contextoNivel(),F.nivelTotal(contexto()),{ganhos:ganhosPVNivel,atualizar:prepararPVNivel});ForjaSeletores.atualizar();if(foco?.startsWith('forja-pv-nivel-'))$(foco)?.focus();}
function validarPVNivel(){return criacao.validarPV(contextoNivel(),F.nivelTotal(contexto()),ganhosPVNivel||detalhesFicha.ganhosPV);}
function confirmarPVNivel(){if(ganhosPVNivel)detalhesFicha.ganhosPV={...ganhosPVNivel};ganhosPVNivel=null;}
function cancelarPVNivel(){ganhosPVNivel=null;}
function renderRevisao(n,c){const attrs=R.atributos(c,bancoDnD);n.append(el('div',{class:'forja-revisao-identidade'},el('h3',{},c.nome||'Seu personagem'),el('p',{},(c.subraca||c.raca)+' · '+c.classe+' '+F.nivelTotal(c)+' · '+c.antecedente)),el('div',{class:'forja-revisao-grid'},el('section',{},el('h4',{},'Atributos finais'),el('div',{class:'forja-revisao-atributos'},Object.entries(attrs.valores).map(([s,v])=>el('span',{},el('small',{},s.toUpperCase()),el('strong',{},String(v)))))),el('section',{},el('h4',{},'Pontos de vida'),el('strong',{},String(F.pvMaximos(c,bancoDnD))+' PV máximos'),botao('Rever ganhos de PV',()=>editar(6))),el('section',{},el('h4',{},'Equipamento'),el('p',{},inventarioPersonagem.length+' itens · '+F.dinheiroEmCobre(detalhesFicha.moedas)/100+' PO'),botao('Rever equipamento',()=>editar(7))),el('section',{},el('h4',{},'Conjuração'),el('p',{},detalhesFicha.magias.selecoes.length+' magias registradas · '+F.fontesConjuracao(c,bancoDnD).length+' fontes'),botao('Rever magias',()=>editar(8)))));}
function confirmarNovoPersonagem(){abrirDialogo('Criar um novo personagem?',el('div',{class:'forja-confirmacao'},el('p',{class:'forja-dialogo-descricao'},'Vamos começar uma nova ficha em nove etapas. Seus personagens atuais continuam salvos na coleção.'),acoesDialogo(botao('Continuar criando personagem',()=>{fecharDialogo();criarPersonagem();},{class:'forja-acao-principal'}))),'confirmacao');}
function confirmarBackup(){const c=ForjaColecao.ler(window.localStorage);abrirDialogo('Backup da coleção',el('div',{class:'forja-confirmacao'},el('p',{class:'forja-dialogo-descricao'},'Guarde uma cópia dos seus personagens fora deste navegador.'),el('div',{class:'forja-backup-resumo'},icone('arquivo'),el('div',{},el('strong',{},'forja-colecao.json'),el('span',{},c.personagens.length+' personagens · '+c.lixeira.length+' na lixeira'),el('small',{},'Inclui inventário, história e imagens.'))),el('p',{class:'forja-nota'},'Você poderá importar os personagens desse arquivo em outro navegador.'),acoesDialogo(botao([icone('baixar'),'Baixar backup JSON'],()=>{baixar('forja-colecao.json',{formato:'forja-colecao',schemaVersion:1,personagens:c.personagens,lixeira:c.lixeira});fecharDialogo();mostrarToast('Backup preparado para download.','sucesso');},{class:'forja-acao-principal'}))),'backup');}
function confirmarExclusaoPermanente(p){
 const nome=p.nome||'Rascunho';
 abrirDialogo('Apagar permanentemente?',el('div',{class:'forja-confirmacao'},
  el('p',{class:'forja-dialogo-descricao'},'Tem certeza que deseja apagar permanentemente "'+nome+'"? Esta ação não pode ser desfeita.'),
  el('div',{class:'forja-dialogo-acoes'},
   botao('Voltar à lixeira',abrirLixeira),
   botao([icone('lixeira'),'Apagar permanentemente'],()=>{ForjaColecao.excluirPermanentemente(window.localStorage,p.detalhes.id);renderizarHub();abrirLixeira();mostrarToast('Personagem apagado permanentemente.','sucesso');},{class:'btn-secundario forja-btn-perigo','aria-label':'Confirmar exclusão permanente de '+nome})
  )
 ),'confirmacao');
}
function confirmarEsvaziarLixeira(){
 const c=ForjaColecao.ler(window.localStorage);
 abrirDialogo('Esvaziar lixeira?',el('div',{class:'forja-confirmacao'},
  el('p',{class:'forja-dialogo-descricao'},'Tem certeza que deseja apagar permanentemente todos os '+c.lixeira.length+' personagens da lixeira? Esta ação não pode ser desfeita.'),
  el('div',{class:'forja-dialogo-acoes'},
   botao('Voltar à lixeira',abrirLixeira),
   botao([icone('lixeira'),'Esvaziar lixeira'],()=>{ForjaColecao.esvaziarLixeira(window.localStorage);renderizarHub();abrirLixeira();mostrarToast('Lixeira esvaziada permanentemente.','sucesso');},{class:'btn-secundario forja-btn-perigo'})
  )
 ),'confirmacao');
}
function abrirLixeira(){
 const c=ForjaColecao.ler(window.localStorage),n=el('div',{class:'forja-lixeira-lista'});
 if(!c.lixeira.length)n.append(el('div',{class:'forja-estado-vazio'},icone('lixeira'),el('h3',{},'Nenhum personagem na lixeira'),el('p',{},'Personagens removidos aparecem aqui e podem voltar para sua coleção ou ser apagados definitivamente.')));
 else n.append(el('div',{class:'forja-lixeira-cabecalho'},el('p',{class:'forja-dialogo-descricao'},'Restaure um personagem para sua coleção ou apague permanentemente.'),botao([icone('lixeira'),'Esvaziar lixeira'],confirmarEsvaziarLixeira,{class:'btn-secundario forja-btn-perigo'})));
 for(const p of c.lixeira){
  const nome=p.nome||'Rascunho';
  n.append(el('article',{class:'forja-lixeira-item'},
   el('div',{},el('strong',{},nome),el('small',{},(p.classe||'Classe pendente')+' · nível '+p.nivel)),
   el('div',{class:'forja-lixeira-item-acoes'},
    botao([icone('restaurar'),'Restaurar'],()=>{ForjaColecao.restaurar(window.localStorage,p.detalhes.id);renderizarHub();abrirLixeira();mostrarToast('Personagem restaurado.','sucesso');},{'aria-label':'Restaurar '+nome}),
    botao([icone('lixeira'),'Apagar permanentemente'],()=>confirmarExclusaoPermanente(p),{class:'btn-secundario forja-btn-perigo','aria-label':'Apagar permanentemente '+nome})
   )
  ));
 }
 abrirDialogo('Lixeira de personagens',n,'lixeira');
}
return {iniciar,editar,abrirInventario,catalogo,prepararPVNivel,validarPVNivel,confirmarPVNivel,cancelarPVNivel,renderizar,pendencias,validarAtributos,prepararTalento,obterEscolhasTalento,podeRepetirTalento,aoSofrerDano,registrarCura,aposPV,adicionarItem,contexto,abrirHubInicial,mostrarHub,irParteOrigem,avancarParteOrigem,voltarParteOrigem};
})();
