const ForjaCriacao = (() => {
'use strict';
function criar({contexto,detalhes,el,campo,botao,aplicar,salvar}) {
 const Q=ForjaCriacaoRegras,R=ForjaRegras,F=ForjaCampanha;
 const siglas=Object.keys(R.ATRIBUTOS),nomes=['Força','Destreza','Constituição','Inteligência','Sabedoria','Carisma'];
 let selecionado=null;
 function atualizar(foco=document.activeElement?.id){aplicar();salvar();const alvo=document.getElementById(foco);if(alvo&&!alvo.disabled)alvo.focus();else document.getElementById('forja-valor-0')?.focus();}
 const origem=()=>document.querySelector('.grid-atributos-base');
 const valores=()=>detalhes().metodoAtributos==='rolagem'?detalhes().rolagens.map(x=>x.total):[15,14,13,12,10,8];
 function mapa(){
  const d=detalhes(),chave=d.metodoAtributos;
  d.escolhas.distribuicoes??={};
  if(!d.escolhas.distribuicoes[chave]){
   const livres=valores().map((_,i)=>i),m={};
   for(const s of siglas){const i=livres.find(i=>valores()[i]===contexto().atributos[s]);if(i!==undefined){m[s]=i;livres.splice(livres.indexOf(i),1);}}
   d.escolhas.distribuicoes[chave]=m;
  }
  return d.escolhas.distribuicoes[chave];
 }
 function atribuir(m){
  detalhes().escolhas.distribuicoes[detalhes().metodoAtributos]=m;
  for(const [s,i]of Object.entries(m))document.getElementById('attr-'+s).value=valores()[i];
  selecionado=null;atualizar();
 }
 function sugerir(){
  const ordem=ForjaOpcoes.prioridades[contexto().classe]||siglas;
  const indices=valores().map((_,i)=>i).sort((a,b)=>valores()[b]-valores()[a]);
  if(indices.length!==6)throw Error('Conclua as seis rolagens antes de distribuir.');
  atribuir(Object.fromEntries(ordem.map((s,i)=>[s,indices[i]])));
 }
 function renderAtributos(destino){
  const d=detalhes(),metodo=d.metodoAtributos;
  origem().hidden=metodo!=='manual';
  destino.append(campo('Método de atributos','forja-metodo-atributos',metodo,v=>{
   d.metodoAtributos=v;selecionado=null;
   if(['padrao','rolagem'].includes(v)){d.escolhas.distribuicoes??={};d.escolhas.distribuicoes[v]??={};}
   if(v==='pontos')siglas.forEach(s=>document.getElementById('attr-'+s).value=8);
   aplicar();salvar();
  },{opcoes:[['manual','Valores informados'],['padrao','Conjunto padrão'],['pontos','Compra de 27 pontos'],['rolagem','4d6, descartar o menor']]}));
  if(metodo==='manual')return;
  if(metodo==='pontos'){renderPontos(destino);return;}
  if(metodo==='rolagem')renderRolagens(destino);
  if(valores().length!==6)return;
  destino.append(el('p',{class:'forja-nota'},'Escolha um valor e depois o atributo que vai recebê-lo. Valores iguais são resultados independentes.'));
  const m=mapa(),banco=el('div',{class:'forja-valores',role:'group','aria-label':'Valores para distribuir'});
  valores().forEach((v,i)=>{
   const atribuido=siglas.find(s=>m[s]===i);
   banco.append(botao(String(v)+(atribuido?' · '+atribuido.toUpperCase():''),()=>{selecionado=i;renderLocal();},{id:'forja-valor-'+i,'aria-pressed':String(selecionado===i),class:'forja-valor'+(selecionado===i?' selecionado':'')}));
  });
  const grade=el('div',{class:'forja-atributos-escolha'});
  siglas.forEach((s,i)=>grade.append(botao(nomes[i]+' · '+(m[s]===undefined?'Escolher':valores()[m[s]]),()=>{
   if(selecionado===null)throw Error('Escolha primeiro um dos valores disponíveis.');
   atribuir(Q.distribuir(valores(),mapa(),selecionado,s));
  },{id:'forja-atribuir-'+s,class:'forja-atributo-escolha','aria-label':'Atribuir '+nomes[i]})));
  destino.append(banco,grade,botao('Sugerir distribuição pela classe',sugerir,{id:'forja-sugerir-atributos'}));
 }
 function renderLocal(){const foco=document.activeElement?.id,n=document.getElementById('forja-metodos');n.replaceChildren();renderAtributos(n);ForjaSeletores.atualizar();document.getElementById(foco)?.focus();}
 function renderRolagens(destino){
  const d=detalhes();
  if(!d.escolhas.rolagemConfirmada&&!d.rolagens.length){
   destino.append(el('p',{class:'forja-nota'},'Você fará seis rolagens. Em cada uma, role quatro d6 e descarte o menor. A série concluída fica vinculada a esta personagem.'),botao('Confirmar método e preparar os dados',()=>{d.escolhas.rolagemConfirmada=true;aplicar();salvar();}));return;
  }
  const ultima=d.rolagens.at(-1),dados=ultima?.dados||[null,null,null,null];
  destino.append(el('div',{class:'forja-dados-mesa','aria-label':'Quatro dados de seis faces'},dados.map((v,i)=>el('span',{class:'forja-dado'+(ultima?.descarte===i?' descartado':''),'aria-label':v===null?'Dado preparado':String(v)+(ultima?.descarte===i?' descartado':'')},v===null?'?':String(v)))),el('p',{role:'status',class:'forja-nota'},d.rolagens.length+'/6 resultados registrados'+(ultima?' · último total: '+ultima.total:'')));
  if(d.rolagens.length<6)destino.append(botao('Rolar '+(d.rolagens.length+1)+'ª série de 4d6',()=>{
   d.rolagens=Q.rolarAtributo(d.rolagens);atualizar();mostrarToast('Rolagem '+d.rolagens.length+' registrada: '+d.rolagens.at(-1).total+'.','sucesso');
  },{id:'forja-rolar-atributo',class:'forja-acao-principal'}));
  else destino.append(el('p',{class:'forja-ok'},'Série concluída. Agora distribua seus seis resultados.'));
  if(d.rolagens.length)destino.append(el('div',{class:'forja-resultados-rolagem'},d.rolagens.map((r,i)=>el('span',{},(i+1)+'ª: '+r.total))));
 }
 function renderPontos(destino){
  const a=contexto().atributos,gasto=F.custoPontos(a),grade=el('div',{class:'forja-atributos-escolha'});
  destino.append(el('div',{class:'forja-pontos-disponiveis',role:'status'},el('strong',{},String(27-gasto)),el('span',{},'pontos disponíveis de 27')));
  siglas.forEach((s,i)=>{
   const alterar=delta=>{const novo=Q.alterarPonto(contexto().atributos,s,delta);document.getElementById('attr-'+s).value=novo[s];atualizar();};
   let aumentar=true;try{Q.alterarPonto(a,s,1);}catch(_){aumentar=false;}
   grade.append(el('div',{class:'forja-ponto-atributo'},el('strong',{},nomes[i]),el('div',{},botao('−',()=>alterar(-1),{id:'forja-ponto-'+s+'-menos','aria-label':'Diminuir '+nomes[i],disabled:a[s]<=8}),el('output',{},String(a[s])),botao('+',()=>alterar(1),{id:'forja-ponto-'+s+'-mais','aria-label':'Aumentar '+nomes[i],disabled:!aumentar})),el('small',{},'Custo: '+Q.custoPontos({...Object.fromEntries(siglas.map(x=>[x,8])),[s]:a[s]}))));
  });
  destino.append(grade,el('p',{class:'forja-nota'},'Valores de 8 a 15. Custos: 8→0, 9→1, 10→2, 11→3, 12→4, 13→5, 14→7, 15→9.'));
 }
 function validar(){
  const d=detalhes();
  if(!['padrao','rolagem'].includes(d.metodoAtributos))return true;
  return Q.validarDistribuicao(valores(),mapa());
 }
 function preservarGanhos(){
  const d=detalhes();for(const e of Q.ganhosPendentes(F.classes(contexto()),bancoDnD,d.ganhosPV))if(!e.inicial&&e.valor===null)d.ganhosPV[e.chave]=Q.ganhoPV(e.dado,'media');
 }
 function renderPV(destino,c=contexto(),anteriores=0,{ganhos=detalhes().ganhosPV,atualizar:apos=atualizar}={}){
  const mods=R.atributos(c,bancoDnD).modificadores;
  destino.append(el('h3',{},'Pontos de vida'),el('p',{class:'forja-nota'},'No primeiro nível, use o dado máximo. Nos seguintes, escolha a média ou role o Dado de Vida. CON '+(mods.con>=0?'+':'')+mods.con+' entra em cada nível.'));
  let total=0;
  for(const e of Q.ganhosPendentes(F.classes(c),bancoDnD,ganhos)){
   total++;
   const valor=valorPV(e,total<=anteriores);
   const row=el('div',{class:'forja-pv-escolha'},el('div',{},el('strong',{},e.classe+' · nível '+e.nivel),el('small',{},'d'+e.dado+(e.inicial?' · máximo inicial':''))),el('output',{},valor===null?'Escolha o ganho':String(Math.max(1,valor+mods.con))+' PV'));
   if(!e.inicial&&total>anteriores)row.append(botao('Usar média '+Q.ganhoPV(e.dado,'media'),()=>{ganhos[e.chave]=Q.ganhoPV(e.dado,'media');apos();},{id:destino.id+'-'+e.chave+'-media','aria-pressed':String(valor===Q.ganhoPV(e.dado,'media'))}),botao('Rolar d'+e.dado,()=>{ganhos[e.chave]=Q.ganhoPV(e.dado,'rolagem');apos();mostrarToast(e.classe+' nível '+e.nivel+': dado '+ganhos[e.chave]+', antes de CON.','sucesso');},{id:destino.id+'-'+e.chave+'-rolagem'}));
   destino.append(row);
  }
  destino.append(el('p',{class:'forja-nota'},'Anão da Colina, talentos e características de classe entram no total calculado. PV máximos: '+F.pvMaximos({...c,detalhes:{...c.detalhes,ganhosPV:ganhos}},bancoDnD)+'.'));
 }
 function valorPV(e,anterior){if(e.inicial)return e.dado;if(anterior&&e.valor===null)return Q.ganhoPV(e.dado,'media');return e.valor;}
 function validarPV(c=contexto(),anteriores=0,ganhos=detalhes().ganhosPV){return Q.ganhosPendentes(F.classes(c),bancoDnD,ganhos).every((e,i)=>e.inicial||i<anteriores||e.valor!==null);}
 function renderRiqueza(destino,regra,dados,{confirmar,aplicado}){
  destino.append(el('p',{class:'forja-nota'},regra.riqueza[0]+'d4 × '+regra.riqueza[1]+' PO. Rolar substitui o kit de classe e antecedente. Você pode comprar agora ou depois.'));
  if(dados.dadosRiqueza?.length||dados.riqueza){
   destino.append(el('div',{class:'forja-dados-mesa'},(dados.dadosRiqueza||[]).map(x=>el('span',{class:'forja-dado'},String(x)))),el('p',{class:'forja-riqueza-total'},el('strong',{},String(dados.riqueza)), ' PO'));
   if(!aplicado)destino.append(botao('Confirmar riqueza inicial',confirmar,{class:'forja-acao-principal'}));
   return;
  }
  destino.append(el('div',{class:'forja-dados-mesa'},Array.from({length:regra.riqueza[0]},()=>el('span',{class:'forja-dado'},'?'))),botao('Rolar riqueza inicial',()=>{
   const r=Q.rolarRiqueza(regra.riqueza);dados.dadosRiqueza=r.dados;dados.riqueza=r.total;aplicar();salvar();mostrarToast('Riqueza rolada: '+r.total+' PO. Confirme para colocar na carteira.','sucesso');
  },{class:'forja-acao-principal'}));
 }
 return {renderAtributos,sugerir,validar,renderPV,validarPV,preservarGanhos,renderRiqueza};
}
return {criar};
})();
