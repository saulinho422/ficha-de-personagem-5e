const { test, expect } = require('@playwright/test');

async function gerarPngBase64(page) {
  return page.evaluate(() => {
    const c = document.createElement('canvas');
    c.width = 24;
    c.height = 24;
    const x = c.getContext('2d');
    x.fillStyle = '#8b1e24';
    x.fillRect(0, 0, 24, 24);
    return c.toDataURL('image/png').split(',')[1];
  });
}

test('painel admin cadastra entidades, edita imagens e integra com a criação da ficha', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/admin.html');
  await expect(page.getByRole('heading', { name: /Painel do Mestre/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  await page.setViewportSize({ width: 1280, height: 900 });
  const cardElfo = page.locator('.card-galeria-admin').filter({ hasText: 'Elfo' }).first();
  const fcPromise = page.waitForEvent('filechooser');
  await cardElfo.locator('.btn-upload-img').click();
  const fc = await fcPromise;
  await fc.setFiles({ name: 'elfo.png', mimeType: 'image/png', buffer: Buffer.from(await gerarPngBase64(page), 'base64') });
  await expect(page.locator('#toast-notificacao')).toContainText('otimizada e salva');
  await expect(cardElfo.locator('img')).toHaveAttribute('src', /^data:image\/webp/);

  await page.getByRole('tab', { name: /Raças/ }).click();
  await page.locator('#raca-nome').fill('Aasimar Teste');
  await page.locator('#raca-descricao').fill('Seres tocados pelos planos celestiais.');
  await page.locator('#raca-car').fill('2');
  await page.locator('#raca-habilidades').fill('Luz Celestial: Emite luz.');
  await page.locator('#form-raca button[type="submit"]').click();
  await expect(page.locator('#lista-racas-custom')).toContainText('Aasimar Teste');

  await page.locator('#subraca-pai').selectOption('Aasimar Teste');
  await page.locator('#subraca-nome').fill('Protetor Teste');
  await page.locator('#subraca-descricao').fill('Guardião alado.');
  await page.locator('#subraca-sab').fill('1');
  await page.locator('#form-subraca button[type="submit"]').click();
  await expect(page.locator('#lista-racas-custom')).toContainText('Protetor Teste');

  await page.getByRole('tab', { name: /Classes/ }).click();
  await page.locator('#classe-nome').fill('Artífice Teste');
  await page.locator('#classe-descricao').fill('Inventor de itens arcanos.');
  await page.locator('#classe-pericias-qtd').fill('2');
  await page.locator('#classe-habilidades').fill('1 | Infusão | Imbui objetos comuns.');
  await page.locator('#form-classe button[type="submit"]').click();
  await expect(page.locator('#lista-classes-custom')).toContainText('Artífice Teste');

  await page.getByRole('tab', { name: /Talentos/ }).click();
  await page.locator('#talento-nome').fill('Mente Telecinética Teste');
  await page.locator('#talento-beneficios').fill('Empurra um alvo a até 9 metros.');
  await page.locator('#form-talento button[type="submit"]').click();
  await expect(page.locator('#lista-talentos-custom')).toContainText('Mente Telecinética Teste');

  await page.locator('#antecedente-nome').fill('Cronista Teste');
  await page.locator('#antecedente-habilidade').fill('Memória Arquivística');
  await page.locator('#antecedente-descricao').fill('Reconhece registros antigos.');
  await page.locator('#form-antecedente button[type="submit"]').click();
  await expect(page.locator('#lista-talentos-custom')).toContainText('Cronista Teste');

  await page.locator('#lista-talentos-custom .item-registro-admin')
    .filter({ hasText: 'Mente Telecinética Teste' })
    .getByRole('button', { name: 'Excluir', exact: true })
    .click();
  await expect(page.locator('#lista-talentos-custom')).not.toContainText('Mente Telecinética Teste');

  await page.goto('/');
  await page.getByPlaceholder('Digite o nome').fill('Vesper');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('button', { name: /^Escolher Raça:/ }).click();
  await page.locator('#forja-dialogo').getByRole('option', { name: 'Aasimar Teste', exact: true }).click();
  await page.getByRole('button', { name: /^Escolher Classe:/ }).click();
  await page.locator('#forja-dialogo').getByRole('option', { name: 'Artífice Teste', exact: true }).click();
  await page.getByRole('button', { name: /^Escolher Escolha a sub-raça:/ }).click();
  await page.locator('#forja-dialogo').getByRole('option', { name: 'Protetor Teste', exact: true }).click();
  await expect(page.locator('#select-subraca')).toHaveValue('Protetor Teste');
  await expect(page.locator('#select-antecedente option[value="Cronista Teste"]')).toHaveCount(1);
});

test('painel admin exporta JSON, baixa módulo JS e publica no GitHub sem removidos', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('forjaPersonagens.customCatalogo.v1', JSON.stringify({
      imagens: { racas: { Elfo: 'https://cdn.exemplo.com/elfo.webp' }, subracas: {}, classes: {}, subclasses: {} },
      racas: { Aasimar: { descricao: 'Celestial.', deslocamento: 9, bonusAtributos: { carisma: 2 }, idiomas: ['Comum'], caracteristicas: [] } },
      removidos: { racas: ['Antiga'], imagens: { racas: ['Anao'] } },
    }));
  });

  const requisicoesPut = [];
  await page.route('https://api.github.com/**', async rota => {
    const req = rota.request();
    if (req.method() === 'GET') {
      await rota.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ sha: 'sha-inicial' }) });
      return;
    }
    if (req.method() === 'PUT') {
      requisicoesPut.push({
        url: req.url(),
        auth: req.headers().authorization,
        body: req.postDataJSON(),
      });
      await rota.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ content: { sha: 'sha-final' } }) });
      return;
    }
    await rota.abort();
  });

  await page.goto('/admin.html');
  const dlJson = page.waitForEvent('download');
  await page.locator('#btn-exportar-admin').click();
  expect((await dlJson).suggestedFilename()).toBe('forja-5e-catalogo-customizado.json');

  await page.locator('#btn-publicar-admin').click();
  await expect(page.locator('#modal-publicar-github')).toBeVisible();
  await page.locator('#gh-branch').selectOption('main');
  await page.locator('#gh-token').fill('ghp_token_teste_simulado');

  const dlJs = page.waitForEvent('download');
  await page.locator('#btn-baixar-js-global').click();
  expect((await dlJs).suggestedFilename()).toBe('custom-catalogo.js');

  await page.locator('#btn-confirmar-gh').click();
  await expect(page.locator('#modal-publicar-github')).toBeHidden();
  await expect(page.locator('#toast-notificacao')).toContainText('Publicado com sucesso no GitHub (main)');
  expect(requisicoesPut).toHaveLength(1);
  expect(requisicoesPut[0].auth).toBe('Bearer ghp_token_teste_simulado');
  expect(requisicoesPut[0].body.sha).toBe('sha-inicial');
  expect(requisicoesPut[0].body.branch).toBe('main');
  const conteudoDecodificado = Buffer.from(requisicoesPut[0].body.content, 'base64').toString('utf8');
  expect(conteudoDecodificado).toContain('Aasimar');
  expect(conteudoDecodificado).not.toContain('removidos');
});
