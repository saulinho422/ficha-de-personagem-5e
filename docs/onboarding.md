# Começar a contribuir

A Forja é uma aplicação estática de HTML, JavaScript e CSS. Não há etapa de build. Para entender a distribuição de responsabilidades, leia a [Implementação](IMPLEMENTACAO.md); para limites funcionais, veja [PRODUCT.md](../PRODUCT.md) e [COBERTURA.md](COBERTURA.md).

## Preparar o ambiente

Use Node.js **24** (recomendado) ou 22.13+ na série 22 e Yarn **1.22.22**, definido em `packageManager`. O limite acompanha o ESLint 10; o runtime instalado não é atualizado pelo setup. Os comandos abaixo partem da raiz do repositório. Corepack deve estar disponível; não é necessário executar `corepack enable` globalmente para usar o prefixo explícito.

```sh
node --version
corepack --version
corepack yarn --version
corepack yarn install --frozen-lockfile
```

Não regenere o lockfile apenas para preparar a máquina. Se Node ou Corepack estiverem ausentes, siga o [setup](setup.md) antes de instalar dependências.

## Abrir a aplicação

```sh
corepack yarn start
```

Abra `http://127.0.0.1:8765`. O servidor de desenvolvimento usa Node e escuta somente no loopback. Encerre com Ctrl+C. Abrir `index.html` diretamente também é possível, mas use a origem HTTP acima para desenvolvimento e comparação com Playwright; cada origem mantém seu próprio armazenamento.

## Verificar uma alteração

```sh
corepack yarn check
corepack yarn test
corepack yarn playwright install chromium
corepack yarn test:e2e
```

`check` verifica integridade; `test` executa regras, persistência e integração DOM; `test:e2e` executa o navegador. Playwright gerencia o servidor necessário aos cenários. Instale Chromium uma vez por ambiente, ou novamente quando a versão exigida mudar.

Os atalhos de qualidade são:

```sh
corepack yarn verify
corepack yarn verify:all
```

`verify` reúne as verificações locais sem navegador; `verify:all` inclui os cenários Chromium. A referência inicial é de 91 testes de regras/DOM e 12 cenários de navegador, sem pressupor aprovação da execução atual. Consulte [quality.md](quality.md) para escopo dos comandos, relatórios e critérios de conclusão.

Os scripts também aceitam `npm run check`, `npm test` e `npm run test:e2e` depois da instalação canônica com Yarn. No Windows PowerShell, `npm.cmd` é uma alternativa quando a política de execução impede `npm.ps1`; isso não exige mudar a política da máquina.

## Trabalhar com dados de teste

Use personagens fictícios e backups JSON de teste ao reproduzir problemas. Não inclua segredos, dados pessoais ou fichas privadas em commits, relatórios ou capturas. Exporte uma cópia antes de testar importação, migração ou recuperação em um perfil de navegador que contenha dados importantes.

O `localStorage` contém ficha v3, coleção v1 e mecanismos de backup; a chave v2 é preservada na migração. O procedimento e as chaves estão em [Dados e recuperação](IMPLEMENTACAO.md#dados-e-recuperação).

## Restrições da máquina

Erros ao baixar dependências ou Chromium podem decorrer de rede, proxy, permissões ou cache. Ajustes de `COREPACK_HOME` e `PLAYWRIGHT_BROWSERS_PATH` são recursos para esses ambientes, não requisitos gerais nem caminhos a fixar no repositório. Consulte o [setup](setup.md) e preserve as mensagens de erro relevantes sem expor credenciais.

A etapa atual consolida infraestrutura e documentação. Não inclui modularização, alterações de regras, esquema persistido ou interface. Antes de concluir, execute a verificação correspondente à mudança e registre o resultado real.
