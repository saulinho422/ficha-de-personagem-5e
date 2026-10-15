(function(r,f){const api=f();if(typeof module!=='undefined'&&module.exports)module.exports=api;else{r.ForjaCatalogo=api;api.preparar(bancoDnD,r.ForjaOpcoes,r.ForjaClasses);}})(globalThis,function(){
'use strict';
const id=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const aliases={'Artisao da Guilda':'Artesão da Guilda','Orfao':'Órfão','Caçador':'Conclave do Caçador','Mestre das Feras':'Conclave da Besta'};
function preparar(banco,opcoes,progressao){
 for(const [de,para]of Object.entries(aliases)){if(banco.antecedentes[de]){banco.antecedentes[para]=banco.antecedentes[de];delete banco.antecedentes[de];}}
 banco.racas.Anão.proficienciasFerramentas=[];
 banco.classes.Bardo.proficienciasFerramentas=[];banco.classes.Monge.proficienciasFerramentas=[];
 banco.classes.Patrulheiro.subclasses=Object.keys(progressao.classes.Patrulheiro.subclasses);
 banco.racas['Humano Variante']={...JSON.parse(JSON.stringify(banco.racas.Humano)),bonusAtributos:{},caracteristicas:['Versatilidade Humana'],descricoesCaracteristicas:{'Versatilidade Humana':'Dois atributos distintos recebem +1. Escolha uma perícia e um talento; exige opção Humano Variante ativada.'}};
 const variantes={'Mercador de Guilda':'Artesão da Guilda','Gladiador':'Artista','Espião':'Criminoso','Cavaleiro':'Nobre','Pirata':'Marinheiro'};
 for(const [nome,base]of Object.entries(variantes))banco.antecedentes[nome]={...JSON.parse(JSON.stringify(banco.antecedentes[base])),varianteDe:base};
 banco.antecedentes['Mercador de Guilda'].ferramentas=['Veículos terrestres'];
 banco.antecedentes.Gladiador.habilidade='Pela Demanda Popular (arena)';
 banco.antecedentes.Cavaleiro.habilidade='Retentores (três assistentes que não combatem)';
 banco.antecedentes.Pirata.habilidade='Má Reputação';
 banco.antecedentes.Personalizado={pericias:[],ferramentas:[],idiomasEscolha:0,habilidade:'Escolha uma característica de antecedente com aprovação do Mestre.',personalizado:true};
 banco.antecedentes.Assassino.personalizado=true;
 banco.antecedentes['Mercador de Guilda'].ferramentas=[];banco.antecedentes['Mercador de Guilda'].proficienciasFerramentas=[];banco.antecedentes['Mercador de Guilda'].ferramentasEscolha=0;
 banco.antecedentes.Cavaleiro.descricaoHabilidade='Três retentores leais servem como assistentes e mensageiros. Não combatem nem acompanham situações de perigo evidente.';
 banco.antecedentes.Pirata.descricaoHabilidade='Sua reputação facilita evitar punição por pequenas infrações; não impede consequências de crimes graves. Defina os limites com o Mestre.';
 for(const dado of Object.values(banco.antecedentes)){for(const campo of ['ferramentas','proficienciasFerramentas'])dado[campo]=(dado[campo]||[]).filter(n=>!/(?:qualquer|um tipo|\(um tipo\))/i.test(n));}
 // O banco duplicado passa a apontar para a mesma fonte canônica.
 banco.antecedentosTradicionaisPHB=banco.antecedentes;
 for(const [grupo,colecao]of [['raca',banco.racas],['classe',banco.classes],['antecedente',banco.antecedentes]])for(const [nome,dado]of Object.entries(colecao)){dado.id=dado.id||grupo+'-'+id(nome);dado.nome=nome;dado.referencia=dado.referencia||{livro:'LDJ fornecido',pagina:grupo==='classe'?progressao.classes[nome]?.pagina:grupo==='raca'?17:125};for(const [sub,valor]of Object.entries(dado.subracas||{})){valor.id='subraca-'+id(sub);valor.nome=sub;}}
 banco.equipamentos.ferramentas=opcoes.ferramentas;
 banco.equipamentos.veiculos=opcoes.veiculos;
 for(const extra of opcoes.extras)if(!banco.equipamentos.equipamento_aventura.some(x=>(x.item||x.nome)===extra.nome))banco.equipamentos.equipamento_aventura.push({...extra,item:extra.nome,custo:extra.preco});
 for(const grupo of ['armas','armaduras'])for(const [sub,lista]of Object.entries(banco.equipamentos[grupo]))for(const item of lista){item.id=(grupo==='armas'?'arma-':'armadura-')+id(item.nome);item.subtipo=sub;}
 for(const grupo of ['equipamento_aventura','ferramentas','veiculos'])for(const item of banco.equipamentos[grupo])item.id='item-'+id(item.nome||item.item);
 for(const [nome,conteudo]of Object.entries(opcoes.pacotes)){
  let pacote=banco.equipamentos.pacotes.find(x=>(x.nome||x.item)?.toLowerCase()===nome.toLowerCase());
  if(!pacote){pacote={nome,item:nome,preco:'0 po'};banco.equipamentos.pacotes.push(pacote);}pacote.id='pacote-'+id(nome);pacote.conteudo=conteudo;
 }
 return banco;
}
function itens(banco){const arr=[];for(const g of ['armas','armaduras'])for(const [sub,lista]of Object.entries(banco.equipamentos[g]))for(const item of lista)arr.push({...item,tipo:g,subtipo:sub});for(const g of ['equipamento_aventura','ferramentas','veiculos'])for(const item of banco.equipamentos[g]||[])arr.push({...item,nome:item.nome||item.item,preco:item.preco||item.custo,tipo:g});return arr;}
return {id,aliases,preparar,itens};
});
