(function(r,f){const api=f();if(typeof module!=='undefined'&&module.exports)module.exports=api;else{r.ForjaCatalogo=api;api.preparar(bancoDnD,r.ForjaOpcoes,r.ForjaClasses,r.ForjaAventura);}})(globalThis,function(){
'use strict';
const id=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const aliases={'Artisao da Guilda':'Artesão da Guilda','Orfao':'Órfão','Caçador':'Conclave do Caçador','Mestre das Feras':'Conclave da Besta'};
const CHAVE_ADMIN='forjaPersonagens.customCatalogo.v1';
const arr=v=>Array.isArray(v)?v:[];
const obj=v=>v&&typeof v==='object'?v:{};
const txt=v=>String(v||'');
const num=(v,p=0)=>Number(v)||p;

function lerCustom(){
 try{const b=globalThis.localStorage?.getItem(CHAVE_ADMIN);return b?JSON.parse(b):null;}catch{return null;}
}
function mesclarImagens(opcoes,imagens){
 const orig=obj(opcoes.imagensOrigem);
 const nov=obj(imagens);
 for(const k of ['racas','subracas','classes','subclasses'])orig[k]={...obj(orig[k]),...obj(nov[k])};
 opcoes.imagensOrigem=orig;
}
function aplicarRaca(ctx,nome,d){
 const atual=obj(ctx.banco.racas[nome]);
 ctx.banco.racas[nome]={...atual,descricao:txt(d.descricao),deslocamento:num(d.deslocamento,9),bonusAtributos:obj(d.bonusAtributos),idiomas:d.idiomas||['Comum'],idiomasEscolha:num(d.idiomasEscolha),proficienciasArmas:arr(d.proficienciasArmas),proficienciasArmaduras:arr(d.proficienciasArmaduras),proficienciasFerramentas:arr(d.proficienciasFerramentas),ferramentasEscolha:0,caracteristicas:arr(d.caracteristicas),descricoesCaracteristicas:obj(d.descricoesCaracteristicas),subracas:obj(atual.subracas),customizado:true};
 if(d.imagem)ctx.opcoes.imagensOrigem.racas[nome]=d.imagem;
}
function aplicarSubraca(ctx,nome,d){
 const pai=ctx.banco.racas[d.racaPai];if(!pai)return;
 pai.subracas=obj(pai.subracas);
 pai.subracas[nome]={...obj(pai.subracas[nome]),bonusAtributos:obj(d.bonusAtributos),caracteristicas:arr(d.caracteristicas),descricoesCaracteristicas:obj(d.descricoesCaracteristicas),idiomas:arr(d.idiomas),idiomasEscolha:0,proficienciasArmas:[],proficienciasArmaduras:[],proficienciasFerramentas:[],ferramentasEscolha:0,customizado:true};
 if(d.descricao)ctx.opcoes.descricoesSubracas[nome]=d.descricao;
 if(d.imagem)ctx.opcoes.imagensOrigem.subracas[nome]=d.imagem;
}
function registrarProgressaoClasse(progressao,nome,d){
 const base=progressao.classes[nome]||{id:'classe-'+id(nome),nome,pagina:0,caracteristicas:[],subclasses:{}};
 if(Array.isArray(d.caracteristicas))base.caracteristicas=d.caracteristicas;
 progressao.classes[nome]=base;
 if(globalThis.PERICIAS_POR_CLASSE){
  const opcoes=arr(d.periciasOpcoes);
  globalThis.PERICIAS_POR_CLASSE[nome]={quantidade:num(d.periciasQuantidade,2),todas:!opcoes.length,opcoes};
 }
}
function aplicarClasse(ctx,nome,d){
 const atual=obj(ctx.banco.classes[nome]);
 ctx.banco.classes[nome]={...atual,dadoVida:num(d.dadoVida,8),proficienciasSalvaguarda:d.proficienciasSalvaguarda||['forca','constituicao'],proficienciasArmasArmaduras:d.proficienciasArmasArmaduras||['Armas simples'],proficienciasArmas:d.proficienciasArmas||['Armas simples'],proficienciasArmaduras:arr(d.proficienciasArmaduras),proficienciasFerramentas:arr(d.proficienciasFerramentas),ferramentasEscolha:0,subclasses:arr(atual.subclasses),customizado:true};
 if(d.descricao)ctx.opcoes.descricoesClasses[nome]=d.descricao;
 if(d.imagem)ctx.opcoes.imagensOrigem.classes[nome]=d.imagem;
 registrarProgressaoClasse(ctx.progressao,nome,d);
}
function aplicarSubclasse(ctx,nome,d){
 const pai=ctx.banco.classes[d.classePai];if(!pai)return;
 pai.subclasses=arr(pai.subclasses);
 if(!pai.subclasses.includes(nome))pai.subclasses.push(nome);
 registrarProgressaoClasse(ctx.progressao,d.classePai,{});
 ctx.progressao.classes[d.classePai].subclasses[nome]=arr(d.caracteristicas);
 if(d.descricao)ctx.opcoes.descricoesSubclasses[nome]=d.descricao;
 if(d.imagem)ctx.opcoes.imagensOrigem.subclasses[nome]=d.imagem;
}
function aplicarTalentosCustom(talentosCustom){
 const alvo=globalThis.talentos||(typeof talentos!=='undefined'?talentos:null);
 if(!alvo)return;
 for(const [nome,d]of Object.entries(obj(talentosCustom))){
  alvo[nome]={id:d.id||'talento-'+id(nome),preRequisitos:txt(d.preRequisitos),beneficios:txt(d.beneficios),referencia:{livro:'Customizado',pagina:0},customizado:true};
 }
}
function aplicarAntecedentesCustom(banco,antecedentesCustom){
 for(const [nome,d]of Object.entries(obj(antecedentesCustom))){
  const ferr=arr(d.ferramentas);
  banco.antecedentes[nome]={pericias:arr(d.pericias),ferramentas:ferr,proficienciasFerramentas:ferr,ferramentasEscolha:0,idiomas:[],idiomasEscolha:num(d.idiomasEscolha),habilidade:txt(d.habilidade),descricaoHabilidade:txt(d.descricaoHabilidade),customizado:true};
 }
}
function carimbarColecao(grupo,colecao,progressao){
 for(const [nome,dado]of Object.entries(obj(colecao))){
  dado.id=dado.id||grupo+'-'+id(nome);dado.nome=nome;
  const pag=grupo==='classe'?progressao.classes[nome]?.pagina:grupo==='raca'?17:125;
  dado.referencia=dado.referencia||{livro:'LDJ fornecido',pagina:pag};
  for(const [sub,valor]of Object.entries(obj(dado.subracas))){valor.id='subraca-'+id(sub);valor.nome=sub;}
 }
}
function carimbarIds(banco,progressao){
 carimbarColecao('raca',banco.racas,progressao);
 carimbarColecao('classe',banco.classes,progressao);
 carimbarColecao('antecedente',banco.antecedentes,progressao);
}
function aplicarCustomizacoes(banco,opcoes,progressao){
 const custom=lerCustom();
 if(!banco||!opcoes||!progressao||!custom)return banco;
 const ctx={banco,opcoes,progressao};
 mesclarImagens(opcoes,custom.imagens);
 for(const [n,d]of Object.entries(obj(custom.racas)))aplicarRaca(ctx,n,d);
 for(const [n,d]of Object.entries(obj(custom.subracas)))aplicarSubraca(ctx,n,d);
 for(const [n,d]of Object.entries(obj(custom.classes)))aplicarClasse(ctx,n,d);
 for(const [n,d]of Object.entries(obj(custom.subclasses)))aplicarSubclasse(ctx,n,d);
 aplicarTalentosCustom(custom.talentos);
 aplicarAntecedentesCustom(banco,custom.antecedentes);
 carimbarIds(banco,progressao);
 return banco;
}
function prepararAntecedentes(banco){
 for(const [de,para]of Object.entries(aliases)){if(banco.antecedentes[de]){banco.antecedentes[para]=banco.antecedentes[de];delete banco.antecedentes[de];}}
 const variantes={'Mercador de Guilda':'Artesão da Guilda','Gladiador':'Artista','Espião':'Criminoso','Cavaleiro':'Nobre','Pirata':'Marinheiro'};
 for(const [nome,base]of Object.entries(variantes))banco.antecedentes[nome]={...JSON.parse(JSON.stringify(banco.antecedentes[base])),varianteDe:base};
 banco.antecedentes.Gladiador.habilidade='Pela Demanda Popular (arena)';
 banco.antecedentes.Cavaleiro.habilidade='Retentores (três assistentes que não combatem)';
 banco.antecedentes.Pirata.habilidade='Má Reputação';
 banco.antecedentes.Personalizado={pericias:[],ferramentas:[],idiomasEscolha:0,habilidade:'Escolha uma característica de antecedente com aprovação do Mestre.',personalizado:true};
 banco.antecedentes.Assassino.personalizado=true;
 banco.antecedentes['Mercador de Guilda'].ferramentas=[];banco.antecedentes['Mercador de Guilda'].proficienciasFerramentas=[];banco.antecedentes['Mercador de Guilda'].ferramentasEscolha=0;
 banco.antecedentes.Cavaleiro.descricaoHabilidade='Três retentores leais servem como assistentes e mensageiros. Não combatem nem acompanham situações de perigo evidente.';
 banco.antecedentes.Pirata.descricaoHabilidade='Sua reputação facilita evitar punição por pequenas infrações; não impede consequências de crimes graves. Defina os limites com o Mestre.';
 for(const dado of Object.values(banco.antecedentes)){for(const campo of ['ferramentas','proficienciasFerramentas'])dado[campo]=arr(dado[campo]).filter(n=>!/(?:qualquer|um tipo|\(um tipo\))/i.test(n));}
 banco.antecedentosTradicionaisPHB=banco.antecedentes;
}
function prepararEquipamentos(banco,opcoes,aventura){
 banco.equipamentos.ferramentas=opcoes.ferramentas;
 banco.equipamentos.veiculos=opcoes.veiculos;
 banco.equipamentos.bens=arr(aventura.bens).map(([nome,preco,peso])=>({id:'item-'+id(nome),nome,preco,peso,grupo:'bem'}));
 banco.equipamentos.arreios=arr(aventura.arreios).map(([nome,preco,peso])=>({id:'item-'+id(nome),nome,preco,peso,grupo:'arreio'}));
 for(const extra of opcoes.extras)if(!banco.equipamentos.equipamento_aventura.some(x=>(x.item||x.nome)===extra.nome))banco.equipamentos.equipamento_aventura.push({...extra,item:extra.nome,custo:extra.preco});
 for(const grupo of ['armas','armaduras'])for(const [sub,lista]of Object.entries(banco.equipamentos[grupo]))for(const item of lista){item.id=(grupo==='armas'?'arma-':'armadura-')+id(item.nome);item.subtipo=sub;}
 for(const grupo of ['equipamento_aventura','ferramentas','veiculos'])for(const item of banco.equipamentos[grupo])item.id='item-'+id(item.nome||item.item);
 for(const [nome,conteudo]of Object.entries(opcoes.pacotes)){
  let pacote=banco.equipamentos.pacotes.find(x=>(x.nome||x.item)?.toLowerCase()===nome.toLowerCase());
  if(!pacote){pacote={nome,item:nome,preco:'0 po'};banco.equipamentos.pacotes.push(pacote);}pacote.id='pacote-'+id(nome);pacote.conteudo=conteudo;
 }
}
function preparar(banco,opcoes,progressao,aventura={}){
 banco.racas.Anão.proficienciasFerramentas=[];
 banco.classes.Bardo.proficienciasFerramentas=[];banco.classes.Monge.proficienciasFerramentas=[];
 banco.classes.Patrulheiro.subclasses=Object.keys(progressao.classes.Patrulheiro.subclasses);
 banco.racas['Humano Variante']={...JSON.parse(JSON.stringify(banco.racas.Humano)),bonusAtributos:{},caracteristicas:['Versatilidade Humana'],descricoesCaracteristicas:{'Versatilidade Humana':'Dois atributos distintos recebem +1. Escolha uma perícia e um talento; exige opção Humano Variante ativada.'}};
 prepararAntecedentes(banco);
 carimbarIds(banco,progressao);
 prepararEquipamentos(banco,opcoes,aventura);
 aplicarCustomizacoes(banco,opcoes,progressao);
 return banco;
}
function itens(banco){
 const lista=[];
 for(const g of ['armas','armaduras'])for(const [sub,grupo]of Object.entries(banco.equipamentos[g]))for(const item of grupo)lista.push({...item,tipo:g,subtipo:sub});
 for(const g of ['equipamento_aventura','ferramentas','veiculos','bens','arreios'])for(const item of arr(banco.equipamentos[g]))lista.push({...item,nome:item.nome||item.item,preco:item.preco||item.custo,tipo:g});
 return lista;
}
return {id,aliases,CHAVE_ADMIN,aplicarCustomizacoes,preparar,itens};
});
