const {test}=require('node:test');
const assert=require('node:assert/strict');
const {interfaceFicha,ficha}=require('./apoio.cjs');

async function preparar(t){
 const app=await interfaceFicha(ficha({recursos:{pvAtual:3,pvTemporarios:2}}));
 t.after(app.fechar);
 const timers=new Map(),frames=[];
 let id=0;
 app.w.setTimeout=(callback,prazo)=>{timers.set(++id,{callback,prazo});return id;};
 app.w.clearTimeout=chave=>timers.delete(chave);
 app.w.requestAnimationFrame=callback=>frames.push(callback);
 return {...app,timers,frames};
}

test('toast nasce sob demanda com acessibilidade e mensagem como texto',async t=>{
 const {w,frames,erros}=await preparar(t),d=w.document;
 assert.equal(d.querySelector('#toast-notificacao'),null);
 w.fecharToast();
 const mensagem='<img src=x onerror="window.invadiu=true"><script>window.invadiu=true</script>';
 w.mostrarToast(mensagem);
 const toast=d.querySelector('#toast-notificacao');
 assert.equal(toast.parentNode,d.body);
 assert.equal(toast.className,'toast-notificacao aviso');
 assert.equal(toast.getAttribute('role'),'status');
 assert.equal(toast.getAttribute('aria-live'),'polite');
 assert.equal(toast.querySelector('.toast-icone').getAttribute('aria-hidden'),'true');
 const botao=toast.querySelector('button');
 assert.equal(botao.getAttribute('aria-label'),'Fechar notificação');
 assert.equal(botao.type,'button');
 assert.equal(toast.querySelector('.toast-mensagem').textContent,mensagem);
 assert.equal(toast.querySelector('img,script'),null);
 assert.equal(w.invadiu,undefined);
 assert.equal(toast.classList.contains('visivel'),false);
 frames.shift()();
 assert.equal(toast.classList.contains('visivel'),true);
 assert.equal(erros.length,0);
});

test('toast reutiliza elemento, renova prazo e fecha pelo botão ou vencimento sem alterar dados',async t=>{
 const {w,eval:avaliar,timers,frames}=await preparar(t),d=w.document;
 const estado=avaliar('JSON.stringify(capturarEstado())');
 const salvo=JSON.stringify({...w.localStorage});
 w.mostrarToast('Primeira');
 frames.shift()();
 const toast=d.querySelector('#toast-notificacao'),antigo=[...timers.keys()][0];
 assert.equal(timers.get(antigo).prazo,3500);
 w.mostrarToast('Segunda','sucesso');
 assert.equal(d.querySelector('#toast-notificacao'),toast);
 assert.equal(d.querySelectorAll('#toast-notificacao').length,1);
 assert.equal(toast.className,'toast-notificacao sucesso');
 assert.equal(toast.querySelector('.toast-mensagem').textContent,'Segunda');
 assert.equal(timers.has(antigo),false);
 assert.equal(timers.size,1);
 assert.equal([...timers.values()][0].prazo,3500);
 frames.shift()();
 toast.querySelector('button').click();
 assert.equal(timers.size,0);
 assert.equal(toast.classList.contains('visivel'),false);
 w.mostrarToast('Terceira');
 frames.shift()();
 [...timers.values()][0].callback();
 assert.equal(timers.size,0);
 assert.equal(toast.classList.contains('visivel'),false);
 assert.equal(avaliar('JSON.stringify(capturarEstado())'),estado);
 assert.equal(JSON.stringify({...w.localStorage}),salvo);
 assert.equal(d.querySelector('#display-hp-atual').textContent,'3');
 assert.equal(d.querySelector('#display-hp-temporarios').textContent,'2');
});
