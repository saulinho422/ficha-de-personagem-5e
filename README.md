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
python3 -m http.server 8765
```

Depois abra `http://localhost:8765`.

## Verificar

Requer Node.js 22 ou superior e Yarn 1.22:

```sh
corepack enable
yarn install --frozen-lockfile
yarn check
yarn test
yarn playwright install --with-deps chromium
yarn test:e2e
```

A suíte contém 91 testes de regras, persistência e integração DOM, além de 12 cenários reais em Chromium. O GitHub Actions guarda o relatório, as capturas e o PDF de teste.

## Estrutura

- `js/regras.js`: cálculos puros de ficha.
- `js/campanha.js`: progressão, recursos, descansos, inventário e conjuração.
- `js/sessao.js`: turno, dano tipado, cura e recursos usados em combate.
- `js/criaturas.js`: Forma Selvagem, companheiro revisado e criaturas próprias.
- `js/estado.js` e `js/colecao.js`: validação, migração, backup e coleção.
- `js/interface.js`: assistente, hub de personagens, três páginas, diálogos e impressão.
- `app-shell.css`: acabamento visual, componentes personalizados e experiência mobile em formato de aplicativo.
- `dados/`: classes, escolhas, magias e tabelas extraídas da fonte fornecida.
- `scripts/`: extrações reproduzíveis; o PDF original não é distribuído no repositório.
- `tests/`: testes unitários, DOM e navegador.

Os dados ficam no `localStorage` do navegador. Exporte JSON regularmente para manter uma cópia fora do dispositivo.

Projeto independente, não afiliado à Wizards of the Coast.
