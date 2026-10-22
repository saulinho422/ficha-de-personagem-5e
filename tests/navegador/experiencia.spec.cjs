const {test,expect}=require('@playwright/test');
const {ficha}=require('../apoio.cjs');
async function abrir(page,estado=ficha()){
 await page.addInitScript(e=>{if(!localStorage.getItem('forjaPersonagens.ficha.v3'))localStorage.setItem('forjaPersonagens.ficha.v3',JSON.stringify(e));sessionStorage.setItem('forjaPersonagens.abrirDireto','1');},estado);
 await page.goto('/');await expect(page.locator('#ficha-completa')).toBeVisible();
}
async function escolher(page,nome,valor){
 await page.getByRole('button',{name:new RegExp('^Escolher '+nome+':')}).click();
 const dialogo=page.locator('.forja-seletor-dialogo');
 await expect(dialogo).toBeVisible();
 await dialogo.getByRole('searchbox',{name:'Buscar opções'}).fill(valor);
 await dialogo.getByRole('option',{name:valor,exact:true}).click();
 await expect(dialogo).toHaveCount(0);
}
async function edicao(page,etapa=3){
 await abrir(page);await page.getByRole('button',{name:'Editar criação',exact:true}).click();
 await page.evaluate(n=>window.mostrarEtapa(n),etapa);
}

test('riqueza só entra na carteira após confirmar e não oferece outra rolagem',async({page})=>{
 await edicao(page,7);
 await escolher(page,'Opção inicial','Riqueza inicial (substitui ambos os kits)');
 await page.getByRole('button',{name:'Rolar riqueza inicial',exact:true}).click();
 await expect(page.getByRole('button',{name:'Rolar riqueza inicial',exact:true})).toHaveCount(0);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).detalhes.moedas.po)).toBe(0);
 await page.getByRole('button',{name:'Confirmar riqueza inicial',exact:true}).click();
 await expect(page.getByRole('button',{name:'Comprar equipamento com esta riqueza'})).toBeVisible();
 await expect.poll(()=>page.evaluate(()=>{const m=JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).detalhes.moedas;return m.pc+10*m.pp+50*m.pe+100*m.po+1000*m.pl;})).toBeGreaterThan(0);
 await page.getByRole('button',{name:'Comprar equipamento com esta riqueza'}).click();
 await expect(page.getByRole('searchbox',{name:'Buscar no catálogo'})).toBeVisible();
});

test('nível cancela ganhos provisórios e confirma média preservando dano',async({page})=>{
 await abrir(page,ficha({recursos:{pvAtual:2,pvTemporarios:1}}));
 await page.getByRole('button',{name:'Gerenciar nível',exact:true}).click();
 await page.locator('#novo-nivel-personagem').fill('2');await page.locator('#novo-nivel-personagem').dispatchEvent('change');
 await page.getByRole('button',{name:'Usar média 4',exact:true}).click();
 await page.getByRole('button',{name:'Cancelar',exact:true}).click();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).detalhes.ganhosPV['Mago-2'])).toBeUndefined();
 await page.getByRole('button',{name:'Gerenciar nível',exact:true}).click();
 await page.locator('#novo-nivel-personagem').fill('2');await page.locator('#novo-nivel-personagem').dispatchEvent('change');
 await page.getByRole('button',{name:'Usar média 4',exact:true}).click();
 await escolher(page,'Subclasse','Escola de Evocação');
 await page.getByRole('button',{name:'Atualizar nível',exact:true}).click();
 await expect(page.locator('#display-nivel')).toHaveText('2');
 await expect(page.locator('#display-hp-atual')).toHaveText('2');
 await expect(page.locator('#display-hp-temporarios')).toHaveText('1');
});

test('picker móvel permite pesquisar, escolher e voltar pelo teclado',async({page})=>{
 await page.setViewportSize({width:360,height:800});await page.goto('/');
 await page.getByPlaceholder('Digite o nome').fill('Nara');
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await escolher(page,'Raça','Elfo');
 await escolher(page,'Classe','Mago');
 await expect(page.locator('#select-classe')).toHaveValue('Mago');
 await escolher(page,'Escolha a sub-raça','Elfo da Floresta');
 await expect(page.locator('#select-subraca')).toHaveValue('Elfo da Floresta');
 const botao=page.getByRole('button',{name:/^Escolher Escolha a sub-raça:/});
 await botao.click();
 await page.keyboard.press('Escape');await expect(botao).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('seis rolagens são individuais, distribuíveis e persistem sem rerrolagem',async({page})=>{
 await edicao(page);await page.setViewportSize({width:360,height:800});
 await escolher(page,'Método de atributos','4d6, descartar o menor');
 expect(await page.evaluate(()=>window.eval('detalhesFicha.rolagens.length'))).toBe(0);
 await page.getByRole('button',{name:'Confirmar método e preparar os dados'}).click();
 for(let i=1;i<=6;i++){
  await page.getByRole('button',{name:'Rolar '+i+'ª série de 4d6',exact:true}).click();
  expect(await page.evaluate(()=>window.eval('detalhesFicha.rolagens.length'))).toBe(i);
 }
 await expect(page.getByRole('button',{name:/Rolar .*série de 4d6/})).toHaveCount(0);
 await page.getByRole('button',{name:'Sugerir distribuição pela classe'}).click();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).detalhes.rolagens.length)).toBe(6);
 const valores=await page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).detalhes.rolagens);
 await page.reload();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).detalhes.rolagens)).toEqual(valores);
 await expect(page.getByRole('button',{name:/Rolar .*série de 4d6/})).toHaveCount(0);
 await page.screenshot({path:'test-results/atributos-mobile.png',fullPage:true});
});

test('conjunto padrão distribui por toque e compra detalha os 27 pontos',async({page})=>{
 await edicao(page);await escolher(page,'Método de atributos','Conjunto padrão');
 await page.getByRole('button',{name:'15',exact:true}).click();
 await page.getByRole('button',{name:'Atribuir Força',exact:true}).click();
 await expect(page.locator('#attr-for')).toHaveValue('15');
 await page.getByRole('button',{name:'Sugerir distribuição pela classe'}).click();
 await escolher(page,'Método de atributos','Compra de 27 pontos');
 await expect(page.locator('.forja-pontos-disponiveis')).toContainText('27');
 await page.getByRole('button',{name:'Aumentar Força',exact:true}).click();
 await expect(page.locator('#attr-for')).toHaveValue('9');
 await expect(page.locator('.forja-pontos-disponiveis')).toContainText('26');
});

test('compra debita carteira e inventário tem gestão separada',async({page})=>{
 const e=ficha();e.detalhes.moedas.po=5;await abrir(page,e);
 await page.getByRole('button',{name:'Comprar equipamento',exact:true}).click();
 await page.getByRole('searchbox',{name:'Buscar no catálogo'}).fill('Adaga');
 await page.getByRole('button',{name:'Comprar Adaga',exact:true}).click();
 await expect(page.locator('.forja-saldo')).toContainText('3 PO');
 await expect(page.getByRole('status').filter({hasText:'comprado'})).toContainText('Valor descontado');
 await page.getByRole('searchbox',{name:'Buscar no catálogo'}).fill('Placas');
 await page.getByRole('button',{name:'Comprar Placas',exact:true}).click();
 await expect(page.locator('#toast-notificacao')).toContainText('Saldo insuficiente');
 await page.getByRole('button',{name:'Fechar catálogo'}).click();
 await page.getByRole('button',{name:'Gerenciar inventário',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Dinheiro e capacidade de carga'})).toBeVisible();
 await expect(page.locator('#forja-inventario-gerenciador')).toContainText('Adaga');
 await page.screenshot({path:'test-results/inventario-gerenciador.png'});
});

test('PV atuais e temporários aceitam operações e rejeitam texto sem abrir modal',async({page})=>{
 const e=ficha({recursos:{pvAtual:5,pvTemporarios:0}});await abrir(page,e);await page.setViewportSize({width:360,height:800});
 await page.getByRole('button',{name:'Alterar PV atuais',exact:true}).click();
 const atual=page.getByRole('textbox',{name:'Editar pontos de vida atuais',exact:true});
 await atual.fill('-2');await atual.press('Enter');await expect(page.locator('#display-hp-atual')).toHaveText('3');
 await page.getByRole('button',{name:'Alterar PV atuais',exact:true}).click();await atual.fill('+2');await atual.press('Enter');
 await expect(page.locator('#display-hp-atual')).toHaveText('5');
 await page.getByRole('button',{name:'Alterar PV temporários',exact:true}).click();
 const temp=page.getByRole('textbox',{name:'Editar pontos de vida temporários',exact:true});await temp.fill('+3');await temp.press('Enter');
 await expect(page.locator('#display-hp-temporarios')).toHaveText('3');
 await page.getByRole('button',{name:'Alterar PV atuais',exact:true}).click();await atual.fill('1.5');await atual.press('Enter');
 await expect(page.locator('#display-hp-atual')).toHaveText('5');
 await page.reload();await expect(page.locator('#display-hp-atual')).toHaveText('5');await expect(page.locator('#display-hp-temporarios')).toHaveText('3');
 await expect(page.getByRole('button',{name:'Gerenciar PV',exact:true})).toHaveCount(0);
});

test('retrato opcional e símbolo ficam nos lugares corretos e campos antigos são conservados',async({page})=>{
 const e=ficha();e.detalhes.historia.tesouro='Dado conservado';await abrir(page,e);
 await page.getByRole('tab',{name:'Histórico e Traços',exact:true}).click();
 // PNG válido gerado no navegador descartável, sem imagem externa ou perfil pessoal.
 const png=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=32;c.height=40;const x=c.getContext('2d');x.fillStyle='#7f1d2d';x.fillRect(0,0,32,40);return c.toDataURL('image/png').split(',')[1];});
 await page.getByLabel('Escolher retrato',{exact:true}).setInputFiles({name:'retrato.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});
 await expect(page.locator('.forja-historia-aparencia img')).toBeVisible();
 await page.getByLabel('Escolher símbolo da organização',{exact:true}).setInputFiles({name:'simbolo.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});
 await expect(page.locator('.forja-historia-organizacao img')).toBeVisible();
 await expect(page.locator('#forja-historia-tesouro')).toHaveCount(0);
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).detalhes.historia.retrato||'')).toMatch(/^data:image\/webp/);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).detalhes.historia.tesouro)).toBe('Dado conservado');
 await page.getByRole('tab',{name:'Status Principais',exact:true}).click();await expect(page.locator('#forja-cabecalho-retrato')).toBeVisible();
});

test('hub confirma criação/backup e renomeação avisa por toast',async({page})=>{
 await abrir(page);await page.getByRole('button',{name:'Personagens',exact:true}).click();
 await page.getByRole('button',{name:'Novo personagem',exact:true}).click();await expect(page.getByRole('heading',{name:'Criar um novo personagem?'})).toBeVisible();
 await page.getByRole('button',{name:'Cancelar',exact:true}).click();
 await page.getByRole('button',{name:'Backup',exact:true}).click();await expect(page.getByRole('button',{name:'Baixar backup JSON'})).toBeVisible();
 await page.getByRole('button',{name:'Cancelar',exact:true}).click();
 await page.getByRole('button',{name:'Renomear',exact:true}).click();await page.getByLabel('Novo nome',{exact:true}).fill('Lia Renomeada');
 await page.getByRole('button',{name:'Salvar nome',exact:true}).click();await expect(page.locator('#toast-notificacao')).toContainText('Nome do personagem atualizado');
});

test('redução de movimento evita slides e navegação conserva dados',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await abrir(page);
 const antes=await page.evaluate(()=>({...localStorage}));
 await page.getByRole('tab',{name:'Histórico e Traços',exact:true}).click();await expect(page.locator('#pagina-2')).toBeVisible();
 expect(await page.evaluate(()=>document.getAnimations().filter(x=>x.playState==='running').length)).toBe(0);
 expect(await page.evaluate(()=>({...localStorage}))).toEqual(antes);
});
