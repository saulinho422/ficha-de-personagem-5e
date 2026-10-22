# Forja de Personagens 5e

Criador e gerenciador de fichas de D&D 5e em português, executado inteiramente no navegador. O perfil de regras é o **Livro do Jogador de 2014 com o Patrulheiro Revisado presente no PDF do projeto**; regras de 2024 não são misturadas.

## O que a aplicação faz

- conduz a criação em nove etapas, com conjunto padrão, compra de pontos ou 4d6 descartando o menor;
- compõe raça, sub-raça, classe, subclasse, antecedente, talentos, proficiências e escolhas por nível;
- calcula atributos, perícias, passivos, CA, deslocamento, PV, carga, ataques e conjuração;
- mantém PV, dados de vida, testes contra a morte por marcadores, condições, recursos, descansos, espaços e concentração;
- organiza inventário, equipamento em uso, mãos, moedas, compras, vendas, kits, montarias, bens e bugigangas;
- oferece 12 classes, 41 subclasses/conclaves, 42 talentos e 361 magias com 845 vínculos de listas;
- reúne características raciais, de antecedente, classe, subclasse e talentos em uma lista automática com filtros;
- preenche as três páginas: ficha principal, história/apresentação e conjuração, com navegação própria de aplicativo no celular;
- abre os personagens em um hub com retrato, resumo, duplicação, renomeação, lixeira recuperável e backup;
- mantém vários personagens e importação/exportação JSON validada;
- imprime as páginas selecionadas ou permite salvá-las como PDF.

Algumas regras dependem do contexto da mesa. A aplicação registra o recurso, descreve o gatilho e oferece controles, mas não decide por conta própria alvos, terreno, autorização do Mestre ou interpretação narrativa. Veja [a matriz de cobertura](docs/COBERTURA.md).

## Executar

O site não requer build nem servidor. É possível abrir `index.html` diretamente. Para desenvolvimento:

```sh
corepack yarn start
```

Depois abra `http://127.0.0.1:8765`. O servidor Node escuta apenas no loopback e
serve os recursos públicos da aplicação. Não depende de Python.

## Verificar

Requer Node.js 24 (recomendado), ou 22.13+ na série 22, e Yarn 1.22.22:

```sh
corepack yarn install --frozen-lockfile
corepack yarn playwright install chromium
corepack yarn verify:all
```

A suíte contém os 91 testes de regras, persistência e DOM, além dos testes do
servidor local, dois testes de notificações e 14 cenários Chromium. Neste Windows, são 103 testes aprovados
e 1 ignorado por permissão de symlink. O lint registra dívida anterior sem
reformatar a aplicação. Consulte [qualidade](docs/quality.md) e
[evidências do setup](docs/setup.md) para resultados e limites. O GitHub Actions
guarda o relatório, as capturas e o PDF de teste.

No PowerShell restrito, use `npm.cmd` e `corepack.cmd`. Os comandos existentes
`npm test`, `npm run check` e `npm run test:e2e` continuam disponíveis depois da
instalação com Yarn. Preparação detalhada: [onboarding](docs/onboarding.md).

## Contexto para desenvolvimento

- [PRODUCT.md](PRODUCT.md): escopo, fluxos e critérios do produto.
- [AGENTS.md](AGENTS.md): comandos e acordos compartilhados para agentes.
- [Implementação](docs/IMPLEMENTACAO.md): arquitetura, persistência e recuperação.
- [Cobertura](docs/COBERTURA.md): matriz dos requisitos implementados.
- [Design](docs/design.md): identidade visual, responsividade e acessibilidade.
- [Qualidade](docs/quality.md): lint, testes e procedimento de revisão.
- [Setup](docs/setup.md): versões, integrações, pendências e manutenção.
- [Harness](docs/harness.md): descoberta de contexto e avaliações descartáveis.

O toolkit foi aprovado. A [proposta de modularização](docs/planos/modularizacao.md)
orienta as extrações em fatias verificáveis. O piloto aprovado está em
`js/notificacoes.js`, preservando a API global e o comportamento. As demais fatias
aguardam escopo próprio; regras e formato dos personagens continuam os mesmos.

## Estrutura

- `js/regras.js`: cálculos puros de ficha.
- `js/campanha.js`: progressão, recursos, descansos, inventário e conjuração.
- `js/sessao.js`: turno, dano tipado, cura e recursos usados em combate.
- `js/criaturas.js`: Forma Selvagem, companheiro revisado e criaturas próprias.
- `js/estado.js` e `js/colecao.js`: validação, migração, backup e coleção.
- `js/notificacoes.js`: mensagens toast, fechamento e temporizador, sem estado de personagem.
- `js/interface.js`: assistente, hub de personagens, três páginas, diálogos e impressão.
- `app-shell.css`: acabamento visual, componentes personalizados e experiência mobile em formato de aplicativo.
- `dados/`: classes, escolhas, magias e tabelas extraídas da fonte fornecida.
- `scripts/`: extrações reproduzíveis; o PDF original não é distribuído no repositório.
- `tests/`: testes unitários, DOM e navegador.

A revisão estrutural com [Impeccable](https://github.com/pbakaus/impeccable)
organiza as nove etapas, reduz superfícies repetidas e adapta ficha, história,
magias e hub entre celular e desktop. Decisões em [design](docs/design.md);
validações e limites em [qualidade](docs/quality.md).

A ficha permite editar PV em linha, comprar com débito na carteira e gerenciar
o inventário em diálogo. A criação tem rolagens individuais, distribuição de
atributos, pontos, ganhos de PV e confirmação de riqueza. As transições são
locais e respeitam a preferência de redução de movimento.

Os dados ficam no `localStorage` do navegador. Exporte JSON regularmente para manter uma cópia fora do dispositivo.

Projeto independente, não afiliado à Wizards of the Coast.
