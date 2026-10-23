const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {interfaceFicha,ficha,E,banco,F}=require('./apoio.cjs');
const clicar=(app,texto,raiz=app.w.document)=>{const b=[...raiz.querySelectorAll('button')].find(x=>x.textContent===texto||x.getAttribute('aria-label')===texto);assert(b,'Botão ausente: '+texto);b.click();};
function escolher(app,id,valor){const input=app.w.document.getElementById(id);input.value=valor;input.dispatchEvent(new app.w.Event('change',{bubbles:true}));}

test('inventário compacto compra com débito, impede saldo negativo e conserva PV',async t=>{
 const e=ficha({recursos:{pvAtual:2,pvTemporarios:0}});e.detalhes.moedas.po=5;
 const app=await interfaceFicha(e);t.after(app.fechar);
 app.eval('ForjaInterface.catalogo()');
 clicar(app,'Comprar Adaga');
 assert.equal(app.eval('ForjaCampanha.dinheiroEmCobre(detalhesFicha.moedas)'),300);
 assert.equal(app.eval("inventarioPersonagem.find(x=>x.nome==='Adaga').quantidade"),1);
 clicar(app,'Comprar Placas');
 assert.equal(app.eval('ForjaCampanha.dinheiroEmCobre(detalhesFicha.moedas)'),300);
 assert.equal(app.eval("inventarioPersonagem.some(x=>x.nome==='Placas')"),false);
 assert.match(app.w.document.querySelector('#toast-notificacao').textContent,/Saldo insuficiente/);
 assert.equal(app.w.document.querySelector('#display-hp-atual').textContent,'2');
 assert.equal(app.w.document.querySelector('#forja-inventario-extra').hidden,true);
 assert.equal(app.w.document.querySelectorAll('#forja-evolucao button').length,0);
});

test('compra de pacote desconta preço publicado e expande itens',async t=>{
 const e=ficha();e.detalhes.moedas.po=20;
 const app=await interfaceFicha(e);t.after(app.fechar);app.eval('ForjaInterface.catalogo()');
 clicar(app,'Comprar Pacote de Explorador');
 assert.equal(app.eval('ForjaCampanha.dinheiroEmCobre(detalhesFicha.moedas)'),1000);
 assert(app.eval("inventarioPersonagem.some(x=>x.nome==='Mochila')"));
 assert.equal(app.eval("detalhesFicha.transacoes[0].nome"),'Pacote de Explorador');
});

test('4d6 acontece por clique e seis resultados não podem ser rolados de novo',async t=>{
 const app=await interfaceFicha(ficha());t.after(app.fechar);
 app.eval('Math.random=()=>0.5');escolher(app,'forja-metodo-atributos','rolagem');
 assert.equal(app.eval('detalhesFicha.rolagens.length'),0);
 clicar(app,'Confirmar método e preparar os dados');
 for(let i=1;i<=6;i++){clicar(app,'Rolar '+i+'ª série de 4d6');assert.equal(app.eval('detalhesFicha.rolagens.length'),i);}
 assert.equal([...app.w.document.querySelectorAll('#forja-metodos button')].some(x=>/Rolar.*4d6/.test(x.textContent)),false);
 clicar(app,'Sugerir distribuição pela classe');
 assert.equal(app.eval('ForjaInterface.validarAtributos(false)'),true);
 app.eval('salvarEstado()');
 const salvo=JSON.parse(app.w.localStorage.getItem(E.CHAVE));
 assert.equal(salvo.detalhes.rolagens.length,6);
 const restaurada=await interfaceFicha(salvo);t.after(restaurada.fechar);
 assert.equal(restaurada.eval('detalhesFicha.rolagens.length'),6);
});

test('conjunto padrão exige distribuição e compra de pontos mostra orçamento',async t=>{
 const app=await interfaceFicha(ficha());t.after(app.fechar);
 escolher(app,'forja-metodo-atributos','padrao');
 assert.equal(app.eval('ForjaInterface.validarAtributos(false)'),false);
 clicar(app,'Sugerir distribuição pela classe');assert.equal(app.eval('ForjaInterface.validarAtributos(false)'),true);
 escolher(app,'forja-metodo-atributos','pontos');
 assert.match(app.w.document.querySelector('.forja-pontos-disponiveis').textContent,/27/);
 const b=app.w.document.querySelector('[aria-label="Aumentar Força"]');b.click();
 assert.equal(app.eval('contextoDaFicha().atributos.for'),9);
 assert.equal(F.custoPontos(JSON.parse(app.eval('JSON.stringify(contextoDaFicha().atributos)'))),1);
});

test('novo ganho de PV exige escolha e média conserva dano ao subir nível',async t=>{
 const app=await interfaceFicha(ficha({recursos:{pvAtual:2,pvTemporarios:1}}));t.after(app.fechar);
 app.eval("abrirModalNivel();document.getElementById('novo-nivel-personagem').value=2;atualizarSubclasseNivelModal()");
 assert.equal(app.eval('ForjaInterface.validarPVNivel()'),false);
 clicar(app,'Usar média 4',app.w.document.querySelector('#forja-pv-nivel'));
 assert.equal(app.eval('ForjaInterface.validarPVNivel()'),true);
 app.eval("document.getElementById('nova-subclasse-personagem').value='Escola de Evocação';salvarNovoNivel({preventDefault(){}})");
 assert.equal(app.w.document.getElementById('display-nivel').textContent,'2');
 assert.equal(app.w.document.getElementById('display-hp-atual').textContent,'2');
 assert.equal(app.w.document.getElementById('display-hp-temporarios').textContent,'1');
 assert.equal(app.eval("detalhesFicha.ganhosPV['Mago-2']"),4);
});

test('PV em linha aplica dano/cura, temporários, validação e Escape',async t=>{
 const app=await interfaceFicha(ficha({recursos:{pvAtual:5,pvTemporarios:2}}));t.after(app.fechar);const d=app.w.document;
 const editar=(id,texto,tecla='Enter')=>{d.getElementById(id).click();const input=d.getElementById(id).nextElementSibling;input.value=texto;input.dispatchEvent(new app.w.KeyboardEvent('keydown',{key:tecla,bubbles:true}));};
 editar('display-hp-atual','-3');assert.equal(app.eval('recursosPersonagem.pvAtual'),4);assert.equal(app.eval('recursosPersonagem.pvTemporarios'),0);
 editar('display-hp-atual','+1');assert.equal(app.eval('recursosPersonagem.pvAtual'),5);
 editar('display-hp-temporarios','+4');assert.equal(app.eval('recursosPersonagem.pvTemporarios'),4);
 editar('display-hp-atual','1.5');assert.equal(app.eval('recursosPersonagem.pvAtual'),5);
 const input=d.getElementById('display-hp-atual').nextElementSibling;input.dispatchEvent(new app.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 editar('display-hp-atual','0','Escape');assert.equal(app.eval('recursosPersonagem.pvAtual'),5);
});

test('campos removidos ficam nos dados e imagens aparecem só nos destinos corretos',async t=>{
 const e=ficha();Object.assign(e.detalhes.historia,{tesouro:'Tesouro antigo',adicionais:'Notas antigas',divindade:'Dado antigo',retrato:'data:image/png;base64,AAAA',simbolo:'data:image/png;base64,BBBB'});
 const app=await interfaceFicha(e);t.after(app.fechar);const d=app.w.document;
 assert.equal(d.querySelector('#forja-historia-tesouro'),null);
 assert.equal(d.querySelector('#forja-historia-adicionais'),null);
 assert.equal(app.eval('detalhesFicha.historia.tesouro'),'Tesouro antigo');
 assert.equal(d.querySelector('#forja-cabecalho-retrato').src,e.detalhes.historia.retrato);
 assert.equal(d.querySelector('#forja-cabecalho-retrato').dataset.forjaImagem,'retrato');
 assert(d.querySelector('.forja-historia-aparencia [data-forja-imagem="retrato"]'));
 assert(d.querySelector('.forja-historia-organizacao [data-forja-imagem="simbolo"]'));
 assert.equal(app.erros.length,0);
});

test('proficiência exige catálogo e feedback de recurso/renomeação é seguro',async t=>{
 const app=await interfaceFicha(ficha());t.after(app.fechar);
 app.eval("abrirModalProficiencia();document.getElementById('proficiencia-valor').value='inventado';salvarProficiencia({preventDefault(){}})");
 assert.equal(app.eval('proficienciasAdicionais.length'),0);
 assert.match(app.w.document.querySelector('#toast-notificacao').textContent,/Escolha uma opção/);
 app.eval("document.getElementById('proficiencia-valor').value='Dracônico';salvarProficiencia({preventDefault(){}})");
 assert.equal(app.eval('proficienciasAdicionais.length'),1);
 assert.equal(app.w.document.getElementById('proficiencia-valor').readOnly,true);
});

test('descrições não dependem de marcadores privados de fonte',()=>{
 const dados=fs.readdirSync('dados').filter(x=>x.endsWith('.js'));
 for(const nome of dados)assert.equal(fs.readFileSync('dados/'+nome,'utf8').includes('\uf0b7'),false,nome);
 assert.equal(banco.classes.Monge.dadoVida,8);
});

test('cancelar nível descarta a escolha de PV sem alterar a ficha',async t=>{
 const app=await interfaceFicha(ficha({recursos:{pvAtual:2,pvTemporarios:3}}));t.after(app.fechar);
 const antes=app.eval('JSON.stringify(detalhesFicha.ganhosPV)');
 app.eval("abrirModalNivel();document.getElementById('novo-nivel-personagem').value=2;atualizarSubclasseNivelModal()");
 clicar(app,'Usar média 4',app.w.document.querySelector('#forja-pv-nivel'));
 assert.equal(app.eval('JSON.stringify(detalhesFicha.ganhosPV)'),antes);
 app.eval('fecharModalNivel()');
 assert.equal(app.eval('JSON.stringify(detalhesFicha.ganhosPV)'),antes);
 assert.equal(app.eval('recursosPersonagem.pvAtual'),2);
});

test('primeira geração começa com PV completos e nova edição conserva dano',async t=>{
 const app=await interfaceFicha(ficha());t.after(app.fechar);
 app.eval('ForjaInterface.pendencias=()=>[];detalhesFicha.escolhas.criacaoNova=true;recursosPersonagem.pvAtual=2;iniciarPersonagem()');
 assert.equal(app.eval('recursosPersonagem.pvAtual'),app.eval('ForjaCampanha.pvMaximos(contextoDaFicha(),bancoDnD)'));
 app.eval('recursosPersonagem.pvAtual=2;iniciarPersonagem()');
 assert.equal(app.eval('recursosPersonagem.pvAtual'),2);
});

test('dano conserva o aviso de concentração e o teclado alcança operações de PV',async t=>{
 const e=ficha({recursos:{pvAtual:5,pvTemporarios:0}});e.detalhes.magias.concentracao='magia-nevoa-obscurecente';
 const app=await interfaceFicha(e);t.after(app.fechar);const d=app.w.document;
 d.getElementById('display-hp-atual').click();const input=d.getElementById('display-hp-atual').nextElementSibling;
 input.nextElementSibling.querySelector('button').focus();assert.equal(input.hidden,false);
 input.value='-1';input.dispatchEvent(new app.w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
 assert.equal(app.eval('recursosPersonagem.pvAtual'),4);
 assert.match(d.querySelector('#toast-notificacao').textContent,/Concentração:.*CD 10/);
});

test('riqueza rolada exige confirmação, concede carteira uma vez e não oferece rerrolagem',async t=>{
 const app=await interfaceFicha(ficha());t.after(app.fechar);app.eval('Math.random=()=>0');
 escolher(app,'forja-kit-modo','riqueza');clicar(app,'Rolar riqueza inicial');
 assert.equal(app.eval('ForjaCampanha.dinheiroEmCobre(detalhesFicha.moedas)'),0);
 assert(app.eval('ForjaInterface.pendencias().some(x=>x.etapa===7)'));
 clicar(app,'Confirmar riqueza inicial');
 const saldo=app.eval('ForjaCampanha.dinheiroEmCobre(detalhesFicha.moedas)');assert(saldo>0);
 assert.equal(app.eval('ForjaInterface.pendencias().some(x=>x.etapa===7)'),false);
 assert.equal([...app.w.document.querySelectorAll('button')].some(x=>x.textContent==='Rolar riqueza inicial'),false);
 assert.equal([...app.w.document.querySelectorAll('button')].some(x=>x.textContent==='Confirmar riqueza inicial'),false);
});


test('substituição de perícia duplicada do antecedente mantém a opção escolhida visível e marcada',async t=>{
 const e=ficha({raca:'Elfo',subraca:'Elfo da Floresta',classe:'Mago',antecedente:'Sábio',periciasClasse:['Arcanismo','Investigação']});
 const app=await interfaceFicha(e);t.after(app.fechar);const d=app.w.document;
 const check=[...d.querySelectorAll('#forja-criacao-escolhas input[type="checkbox"]')].find(x=>x.parentElement.textContent.includes('Acrobacia'));
 assert(check,'Opção Acrobacia deve existir para substituir Arcanismo duplicado');
 check.checked=true;check.dispatchEvent(new app.w.Event('change',{bubbles:true}));
 const checkDepois=[...d.querySelectorAll('#forja-criacao-escolhas input[type="checkbox"]')].find(x=>x.parentElement.textContent.includes('Acrobacia'));
 assert(checkDepois,'Opção Acrobacia não pode sumir após ser selecionada');
 assert.equal(checkDepois.checked,true);
 assert(checkDepois.closest('.forja-escolha').querySelector('.forja-escolha-status').textContent.includes('Acrobacia'));
});

test('sub-raça é opcional e escolher Humano pergunta sobre Humano Variante em modal',async t=>{
 const e=ficha({raca:'Elfo',subraca:''});
 const app=await interfaceFicha(e);t.after(app.fechar);const d=app.w.document;
 assert.equal(app.eval("ForjaInterface.pendencias().some(x=>x.mensagem.includes('sub-raça'))"),false);
 app.eval('ForjaInterface.editar(2)');
 clicar(app,'Escolher Raça: Elfo');
 clicar(app,'Humano',d.querySelector('#forja-dialogo'));
 assert.equal(d.querySelector('#forja-dialogo-titulo').textContent,'Ativar Humano Variante?');
 clicar(app,'Sim, ativar Humano Variante',d.querySelector('#forja-dialogo'));
 assert.equal(app.eval('contextoDaFicha().raca'),'Humano Variante');
 assert.equal(app.eval('detalhesFicha.opcoes.humanoVariante'),true);
});

test('dados 3D de 4d6 renderizam cubos com 6 faces e catálogo aceita customizações do Admin',async t=>{
 const app=await interfaceFicha(ficha());t.after(app.fechar);const d=app.w.document;
 app.eval('Math.random=()=>0.5');
 escolher(app,'forja-metodo-atributos','rolagem');
 clicar(app,'Confirmar método e preparar os dados');
 clicar(app,'Rolar 1ª série de 4d6');
 const cubos=d.querySelectorAll('.forja-dado-3d .forja-cubo-3d');
 assert.equal(cubos.length,4);
 assert.equal(cubos[0].querySelectorAll('.forja-face').length,6);
 app.w.localStorage.setItem('forjaPersonagens.customCatalogo.v1',JSON.stringify({
  imagens:{racas:{Elfo:'https://exemplo.com/elfo.webp'}},
  racas:{'Aasimar':{descricao:'Tocado pelos planos celestiais.',deslocamento:9,bonusAtributos:{car:2},idiomas:['Comum','Celestial'],caracteristicas:['Mãos Curativas'],descricoesCaracteristicas:{'Mãos Curativas':'Cura por toque.'}}}
 }));
 app.eval('ForjaCatalogo.aplicarCustomizacoes(bancoDnD,ForjaOpcoes,ForjaClasses)');
 assert.equal(app.eval("ForjaOpcoes.imagensOrigem.racas['Elfo']"),'https://exemplo.com/elfo.webp');
 assert.equal(app.eval("bancoDnD.racas['Aasimar'].bonusAtributos.car"),2);
});

test('editor de retrato preserva imagem original e separa zoom de corte',()=>{
 const d=F.novo();
 d.historia.retrato='data:image/webp;base64,UklGRg==';
 d.historia.retratoOriginal='data:image/webp;base64,UklGRk9SSUc=';
 d.historia.retratoEdicao=JSON.stringify({zoom:1.4,corte:20,giro:90,x:10,y:-5,espelhar:true});
 assert.doesNotThrow(()=>F.validarDetalhes(d));
});
