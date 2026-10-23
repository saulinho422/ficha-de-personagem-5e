const {test,expect}=require('@playwright/test');const {ficha}=require('../apoio.cjs');
async function abrir(page,estado){await page.addInitScript(e=>{if(!localStorage.getItem('forjaPersonagens.ficha.v3'))localStorage.setItem('forjaPersonagens.ficha.v3',JSON.stringify(e));sessionStorage.setItem('forjaPersonagens.abrirDireto','1');},estado);await page.goto('/');await expect(page.locator('#ficha-completa')).toBeVisible();}
test('criação e restauração do rascunho',async({page})=>{const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');await page.getByPlaceholder('Digite o nome').fill('Nara');await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.getByRole('button',{name:/^Escolher Raça:/}).click();await page.locator('#forja-dialogo').getByRole('option',{name:'Elfo',exact:true}).click();await page.getByRole('button',{name:/^Escolher Classe:/}).click();await page.locator('#forja-dialogo').getByRole('option',{name:'Mago',exact:true}).click();await page.getByRole('button',{name:/^Escolher Escolha a sub-raça:/}).click();await page.locator('#forja-dialogo').getByRole('option',{name:'Elfo da Floresta',exact:true}).click();await page.reload();await expect(page.getByPlaceholder('Digite o nome')).toHaveValue('Nara');expect(erros).toEqual([]);});
test('placas na mochila, equipamento e dano persistente',async({page})=>{const e=ficha({recursos:{pvAtual:2,pvTemporarios:0},inventario:[{id:'placas',nome:'Placas',peso:32.5,quantidade:1}]});await abrir(page,e);await expect(page.locator('#display-ca')).toHaveText('13');await page.getByRole('button',{name:'Vestir Placas',exact:true}).click();await expect(page.locator('#display-ca')).toHaveText('18');await expect(page.locator('#display-hp-atual')).toHaveText('2');await page.reload();await expect(page.locator('#display-ca')).toHaveText('18');await expect(page.locator('#display-hp-atual')).toHaveText('2');});
test('experiência mobile funciona como aplicativo sem rolagem horizontal',async({page})=>{await page.setViewportSize({width:360,height:800});const e=ficha();e.detalhes.magias.selecoes=[{id:'magia-luz',fonte:'classe:Mago',preparada:true}];await abrir(page,e);await expect(page.locator('#forja-mobile-topo')).toBeVisible();await expect(page.locator('#forja-mobile-nav')).toBeVisible();await expect(page.locator('#forja-barra')).toBeHidden();await page.locator('#forja-mobile-nav').getByRole('button',{name:'História'}).click();await page.getByLabel('História do personagem',{exact:true}).fill('História que permanece depois da recarga.');await page.getByLabel('História do personagem',{exact:true}).press('Tab');await expect.poll(async()=>{const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')));return saved.detalhes.historia.historia;}).toBe('História que permanece depois da recarga.');await page.locator('#forja-mobile-nav').getByRole('button',{name:'Magias'}).click();await expect(page.locator('#pagina-3')).toContainText('Luz');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.waitForTimeout(500);await page.screenshot({path:'test-results/ficha-celular-app.png',fullPage:true});});
test('exportação JSON conserva recursos e campos adicionais',async({page})=>{const e=ficha({recursos:{pvAtual:0,pvTemporarios:3}});e.detalhes.historia.aliados='Lyra e os Guardiões';await abrir(page,e);const download=page.waitForEvent('download');await page.getByRole('button',{name:'Exportar JSON',exact:true}).click();const arquivo=await download;const stream=await arquivo.createReadStream();let texto='';for await(const bloco of stream)texto+=bloco;const doc=JSON.parse(texto);expect(doc.ficha.recursos.pvAtual).toBe(0);expect(doc.ficha.detalhes.historia.aliados).toBe('Lyra e os Guardiões');});
test('PV na ficha permite teclado, Escape e conservação',async({page})=>{await abrir(page,ficha({recursos:{pvAtual:3,pvTemporarios:0}}));const botao=page.getByRole('button',{name:'Alterar PV atuais',exact:true});await botao.click();const entrada=page.getByRole('textbox',{name:'Editar pontos de vida atuais',exact:true});await expect(entrada).toBeFocused();await entrada.fill('-2');await entrada.press('Escape');await expect(botao).toBeFocused();await expect(botao).toHaveText('3');await botao.click();await entrada.fill('-2');await entrada.press('Enter');await expect(botao).toHaveText('1');});
test('assistente mantém as nove etapas e o rascunho depois da recarga',async({page})=>{await page.goto('/');await expect(page.locator('.etapa-criacao')).toHaveCount(9);await page.getByPlaceholder('Digite o nome').fill('Ilyra');await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.getByRole('button',{name:/^Escolher Raça:/}).click();await page.locator('#forja-dialogo').getByRole('option',{name:'Elfo',exact:true}).click();await page.getByRole('button',{name:/^Escolher Classe:/}).click();await page.locator('#forja-dialogo').getByRole('option',{name:'Mago',exact:true}).click();await page.getByRole('button',{name:/^Escolher Escolha a sub-raça:/}).click();await page.locator('#forja-dialogo').getByRole('option',{name:'Alto Elfo',exact:true}).click();await page.reload();await expect(page.getByPlaceholder('Digite o nome')).toHaveValue('Ilyra');await expect(page.locator('.passo-indicador')).toHaveCount(9);});
test('evolução para mago 2 libera escola e conserva dano',async({page})=>{
 const e=ficha({recursos:{pvAtual:2,pvTemporarios:0}});await abrir(page,e);
 await page.getByRole('button',{name:'Editar criação'}).click();
 await page.locator('#nivel-personagem').fill('2');await page.locator('#nivel-personagem').dispatchEvent('change');
 await expect(page.locator('#select-subclasse')).toBeEnabled();
 await page.locator('#select-subclasse').selectOption('Escola de Abjuração',{force:true});
 await expect(page.locator('#display-hp-atual')).toHaveText('2');
 const estadoSalvo=()=>page.evaluate(()=>{
  const s=JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3'));
  return {nivel:s.nivel,subclasse:s.subclasse,pv:s.recursos.pvAtual,fichaGerada:s.fichaGerada};
 });
 const esperado={nivel:2,subclasse:'Escola de Abjuração',pv:2,fichaGerada:false};
 // Editar criação salva um rascunho; aguardar o debounce antes de recarregar.
 await expect.poll(estadoSalvo).toEqual(esperado);
 await page.reload();await expect(page.locator('#criacao-rapida')).toBeVisible();
 await expect(page.locator('#nivel-personagem')).toHaveValue('2');
 await expect(page.locator('#select-subclasse')).toHaveValue('Escola de Abjuração');
 await expect.poll(estadoSalvo).toEqual(esperado);
});
test('conjuração consome espaço e registra concentração',async({page})=>{const e=ficha();e.detalhes.magias.selecoes=[{id:'magia-nevoa-obscurecente',fonte:'classe:Mago',preparada:true}];await abrir(page,e);await page.getByRole('tab',{name:'Magias',exact:true}).click();await page.locator('#pagina-3 summary').filter({hasText:'1º círculo'}).click();await page.getByRole('button',{name:'Conjurar',exact:true}).click();await page.locator('#forja-conjurar-material').selectOption('sim');await page.getByRole('button',{name:'Confirmar lançamento'}).click();await expect.poll(()=>page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('forjaPersonagens.ficha.v3')).detalhes;return [d.magias.gastos['normal:1'],d.magias.concentracao];})).toEqual([1,'magia-nevoa-obscurecente']);});
test('hub duplica, envia à lixeira e restaura sem misturar IDs',async({page})=>{await abrir(page,ficha({nome:'Arlen'}));await page.getByRole('button',{name:'Personagens'}).click();await expect(page.getByRole('heading',{name:'Seus heróis'})).toBeVisible();await page.getByRole('button',{name:'Duplicar'}).click();await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.colecao.v1')).personagens.length)).toBe(2);await page.getByRole('button',{name:'Lixeira',exact:true}).first().click();await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.colecao.v1')).lixeira.length)).toBe(1);await page.getByRole('button',{name:'Abrir lixeira (1)',exact:true}).click();await page.getByRole('button',{name:/Restaurar /}).click();const ids=await page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.colecao.v1')).personagens.map(x=>x.detalhes.id));expect(new Set(ids).size).toBe(ids.length);});
test('acesso com personagens abre o hub em cards',async({page})=>{await page.setViewportSize({width:390,height:844});const e=ficha({nome:'Maelis'});await page.addInitScript(estado=>{localStorage.setItem('forjaPersonagens.ficha.v3',JSON.stringify(estado));localStorage.setItem('forjaPersonagens.colecao.v1',JSON.stringify({schemaVersion:1,personagens:[estado],lixeira:[]}));},e);await page.goto('/');await expect(page.getByRole('heading',{name:'Seus heróis'})).toBeVisible();await expect(page.locator('.forja-heroi-card')).toHaveCount(1);await expect(page.locator('.forja-heroi-card')).toContainText('Maelis');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'test-results/hub-celular.png',fullPage:true});});
test('importação recusa JSON inválido e aceita ficha válida',async({page})=>{
 await abrir(page,ficha({nome:'Atual'}));
 const antes=await page.evaluate(()=>({...localStorage}));
 await page.getByRole('button',{name:'Importar',exact:true}).click();
 await page.getByLabel('Arquivo JSON da ficha ou coleção').setInputFiles({name:'quebrado.json',mimeType:'application/json',buffer:Buffer.from('{')});
 await expect(page.locator('#toast-notificacao')).toContainText('Importação recusada');
 await expect(page.locator('#toast-notificacao')).toHaveClass(/visivel/);
 expect(await page.evaluate(()=>({...localStorage}))).toEqual(antes);
 await page.getByRole('button',{name:'Fechar diálogo'}).click();
 const importada=ficha({nome:'Importada'});importada.detalhes.id='ficha-importada-e2e';
 await page.getByRole('button',{name:'Importar',exact:true}).click();
 await page.getByLabel('Arquivo JSON da ficha ou coleção').setInputFiles({name:'ficha.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({ficha:importada}))});
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('forjaPersonagens.colecao.v1')).personagens.some(x=>x.nome==='Importada'))).toBe(true);
});
test('impressão gera as três páginas e suporta texto longo',async({page})=>{const e=ficha({nome:'Maelis'});e.detalhes.historia.historia='Crônica extensa '.repeat(300);e.detalhes.magias.selecoes=[{id:'magia-luz',fonte:'classe:Mago',preparada:true}];await abrir(page,e);await page.getByRole('button',{name:'Imprimir / PDF'}).click();const popupPromise=page.waitForEvent('popup');await page.getByRole('button',{name:'Abrir versão de impressão'}).click();const popup=await popupPromise;await expect(popup.locator('section.pagina')).toHaveCount(3);await expect(popup.locator('body')).toContainText('Crônica extensa');await popup.screenshot({path:'test-results/ficha-impressao.png',fullPage:true});await popup.pdf({path:'test-results/ficha-impressao.pdf',format:'A4'});});

test('progresso da criação mantém a etapa atual visível no celular',async({page})=>{
 await page.setViewportSize({width:360,height:800});await page.goto('/');
 await page.getByPlaceholder('Digite o nome').fill('Nara');
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await expect(page.locator('[aria-current="step"]')).toHaveAttribute('data-passo','2');
 // Isola o layout da última etapa sem contornar a validação da criação real.
 await page.evaluate(()=>window.mostrarEtapa(9));
 const progresso=page.locator('.progresso-criacao'),atual=page.locator('[aria-current="step"]');
 await expect(atual).toHaveAttribute('data-passo','9');
 const faixa=await progresso.boundingBox(),etapa=await atual.boundingBox();
 expect(etapa.x).toBeGreaterThanOrEqual(faixa.x);
 expect(etapa.x+etapa.width).toBeLessThanOrEqual(faixa.x+faixa.width+1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:'test-results/criacao-celular.png',fullPage:true});
});

test('ficha, história, magias e hub se adaptam sem transbordar ou alterar dados',async({page})=>{
 const e=ficha({nome:'Maelis Guardiã dos Caminhos Esquecidos'});
 e.detalhes.historia.historia='Uma história preservada. '.repeat(80);
 e.detalhes.magias.selecoes=[{id:'magia-luz',fonte:'classe:Mago',preparada:true}];
 await abrir(page,e);
 const antes=await page.evaluate(()=>({...localStorage}));
 for(const width of [320,760,800,1000,1440]){
  await page.setViewportSize({width,height:900});
  for(const [i,nome]of ['Ficha','História','Magias'].entries()){
   if(width<=760)await page.locator('#forja-mobile-nav').getByRole('button',{name:nome,exact:true}).click();
   else await page.locator('#forja-aba-'+(i+1)).click();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),nome+' em '+width).toBe(true);
  }
 }
 expect(await page.evaluate(()=>({...localStorage}))).toEqual(antes);
 await page.setViewportSize({width:320,height:800});
 await page.locator('#forja-mobile-nav').getByRole('button',{name:'Heróis',exact:true}).click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const botao=await page.getByRole('button',{name:'Abrir ficha',exact:true}).boundingBox();
 expect(botao.height).toBeGreaterThanOrEqual(44);
});
