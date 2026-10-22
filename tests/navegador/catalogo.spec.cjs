const {test,expect}=require('@playwright/test');
const {ficha}=require('../apoio.cjs');
test.use({hasTouch:true});

async function abrir(page){
 const estado=ficha({recursos:{pvAtual:2,pvTemporarios:1}});estado.detalhes.moedas.po=20;
 await page.addInitScript(e=>{localStorage.setItem('forjaPersonagens.ficha.v3',JSON.stringify(e));sessionStorage.setItem('forjaPersonagens.abrirDireto','1');},estado);
 await page.goto('/');await expect(page.locator('#ficha-completa')).toBeVisible();
}

test('catálogo original reúne compras e personalizados, com busca e foco no celular',async({page})=>{
 await page.setViewportSize({width:360,height:800});await abrir(page);
 const abrirCatalogo=page.getByRole('button',{name:'Comprar equipamento',exact:true});await abrirCatalogo.tap();
 const catalogo=page.getByRole('dialog',{name:'Catálogo de equipamentos',exact:true});await expect(catalogo).toBeVisible();
 await expect(page.locator('dialog[open]')).toHaveCount(1);await expect(page.locator('.forja-compra')).toHaveCount(0);
 await catalogo.getByRole('button',{name:'Ferramentas',exact:true}).tap();
 await catalogo.getByRole('searchbox',{name:'Buscar no catálogo'}).fill('ladrao');
 await expect(catalogo.locator('.item-catalogo')).toHaveCount(1);
 await expect(catalogo.locator('.item-catalogo')).toContainText(/Ferramentas de ladrão/i);
 await catalogo.getByRole('searchbox').fill('zzzz');await expect(catalogo.locator('.catalogo-vazio')).toBeVisible();
 await catalogo.getByRole('button',{name:'Personalizados',exact:true}).tap();
 await expect(page.locator('#form-item-personalizado')).toBeVisible();await expect(page.locator('#catalogo-filtros')).toBeHidden();
 await page.getByLabel('Nome do item',{exact:true}).fill('Lâmina da Aurora');
 await page.locator('#item-personalizado-peso').fill('1.5');await page.locator('.tipo-item-card[data-tipo="arma"]').tap();
 await page.getByRole('button',{name:/Adicionar ao inventário/}).click();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).inventario.some(x=>x.nome==='Lâmina da Aurora'&&x.personalizado&&x.dadosPersonalizados.dano==='1d8'))).toBe(true);
 await catalogo.getByRole('button',{name:'Todos',exact:true}).click();await catalogo.getByRole('searchbox').fill('Adaga');
 await catalogo.getByRole('button',{name:'Comprar Adaga',exact:true}).click();
 await expect(page.locator('#catalogo-saldo')).toHaveText('18 PO');await expect(page.locator('#display-hp-atual')).toHaveText('2');
 await page.keyboard.press('Escape');await expect(catalogo).toBeHidden();await expect(abrirCatalogo).toBeFocused();
});

test('catálogo e formulário cabem em quatro larguras com controles acessíveis',async({page})=>{
 await abrir(page);await page.getByRole('button',{name:'Comprar equipamento',exact:true}).click();
 for(const width of [320,390,760,1440]){
  await page.setViewportSize({width,height:900});
  const catalogo=page.locator('#modal-equipamentos');
  expect(await catalogo.evaluate(n=>n.scrollWidth<=n.clientWidth)).toBe(true);
  const fechar=await catalogo.getByRole('button',{name:'Fechar catálogo'}).boundingBox();expect(fechar.height).toBeGreaterThanOrEqual(44);
  await catalogo.getByRole('button',{name:'Personalizados',exact:true}).click();
  expect(await page.locator('#form-item-personalizado').evaluate(n=>n.scrollWidth<=n.clientWidth)).toBe(true);
  await catalogo.getByRole('button',{name:'Todos',exact:true}).click();
  if(width===390||width===1440)await page.screenshot({path:'test-results/catalogo-'+width+'.png'});
 }
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Personalizados',exact:true}).click();
 await page.screenshot({path:'test-results/personalizados-mobile.png'});
});

test('importação, backup e lixeira têm estados completos e não transbordam',async({page})=>{
 await abrir(page);await page.getByRole('button',{name:'Personagens',exact:true}).click();
 await page.setViewportSize({width:360,height:800});
 await page.getByRole('button',{name:'Importar ficha',exact:true}).click();
 const dialogo=page.locator('#forja-dialogo');await expect(dialogo.getByRole('button',{name:'Selecionar arquivo JSON'})).toBeVisible();
 await page.screenshot({path:'test-results/importacao-mobile.png'});
 const antes=await page.evaluate(()=>({...localStorage}));
 await page.getByLabel('Arquivo JSON da ficha ou coleção').setInputFiles({name:'invalido.json',mimeType:'application/json',buffer:Buffer.from('{')});
 await expect(dialogo.getByRole('alert')).toContainText('JSON válido');expect(await page.evaluate(()=>({...localStorage}))).toEqual(antes);
 await page.getByRole('button',{name:'Fechar diálogo'}).click();await page.getByRole('button',{name:'Backup',exact:true}).click();
 await expect(dialogo).toContainText('1 personagens');expect(await dialogo.evaluate(n=>n.scrollWidth<=n.clientWidth)).toBe(true);
 await page.screenshot({path:'test-results/backup-mobile.png'});
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar backup JSON'}).click();expect((await download).suggestedFilename()).toBe('forja-colecao.json');
 await page.getByRole('button',{name:'Abrir lixeira (0)',exact:true}).click();await expect(dialogo).toContainText('Nenhum personagem na lixeira');
 await page.screenshot({path:'test-results/lixeira-mobile.png'});await page.keyboard.press('Escape');
 await expect(page.getByRole('button',{name:'Abrir lixeira (0)',exact:true})).toBeFocused();
});
