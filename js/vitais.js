const ForjaVitais = (() => {
'use strict';
function instalar({recursos,maximo,confirmar}){
 function editor(chave,id,nome){
  const botao=document.getElementById(id);
  const input=document.createElement('input');
  input.type='text';input.inputMode='numeric';input.autocomplete='off';input.spellcheck=false;input.maxLength=9;input.pattern='[+-]?[0-9]+';
  input.className='forja-pv-editor';input.setAttribute('aria-label',nome);input.setAttribute('aria-describedby','forja-ajuda-pv');input.hidden=true;
  botao.after(input);
  const acoes=document.createElement('span');acoes.className='forja-pv-operacoes';acoes.hidden=true;input.after(acoes);
  for(const [sinal,nome]of [['-','− Perder'],['+','+ Ganhar']]){const acao=document.createElement('button');acao.type='button';acao.textContent=nome;acao.addEventListener('pointerdown',e=>e.preventDefault());acao.addEventListener('click',()=>{input.value=sinal;input.focus();});acoes.append(acao);}
  let cancelado=false;
  const fechar=()=>{input.hidden=true;acoes.hidden=true;botao.hidden=false;};
  botao.addEventListener('click',()=>{cancelado=false;input.removeAttribute('aria-invalid');input.value=String(recursos()[chave]);botao.hidden=true;input.hidden=false;acoes.hidden=false;input.focus();input.select();});
  const salvar=(devolverFoco=true)=>{
   if(input.hidden||cancelado)return;
   try{
    const texto=input.value.trim();
    validarTexto(texto);
    const tipo=/^[+-]/.test(texto)?(texto[0]==='-'?'dano':'cura'):'valor';
    let valor=Number(texto);
    if(chave==='pvTemporarios')valor=ForjaCriacaoRegras.interpretarPV(texto,recursos()[chave],1000000);
    else if(tipo==='valor')valor=ForjaCriacaoRegras.interpretarPV(texto,recursos()[chave],maximo());
    confirmar(chave,tipo,valor);fechar();if(devolverFoco)botao.focus();
   }catch(e){input.setAttribute('aria-invalid','true');mostrarToast(e.message,'aviso');input.focus();input.select();}
  };
  input.addEventListener('input',()=>input.removeAttribute('aria-invalid'));
  input.addEventListener('beforeinput',e=>{if(e.data&&/[^0-9+-]/.test(e.data))e.preventDefault();});
  input.addEventListener('keydown',e=>{
   if(e.key==='Enter'){e.preventDefault();salvar();}
   if(e.key==='Escape'){e.preventDefault();cancelado=true;fechar();botao.focus();}
  });
  input.addEventListener('blur',e=>{if(!acoes.contains(e.relatedTarget))salvar(false);});
  acoes.addEventListener('focusout',e=>{if(e.relatedTarget!==input&&!acoes.contains(e.relatedTarget))salvar(false);});
 }
 editor('pvAtual','display-hp-atual','Editar pontos de vida atuais');
 editor('pvTemporarios','display-hp-temporarios','Editar pontos de vida temporários');
}
return {instalar};
function validarTexto(texto){if(!/^[+-]?\d+$/.test(texto)||!Number.isSafeInteger(Number(texto))||Math.abs(Number(texto))>1000000)throw Error('Use um número inteiro, +5 para ganhar ou -2 para perder.');}
})();
