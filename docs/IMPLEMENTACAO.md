# Implementação da mega atualização

Perfil: Livro do Jogador 2014, com o Patrulheiro Revisado do PDF fornecido.

Esta branch implementa a criação guiada em nove etapas, cálculos puros, escolhas de origem/classe/talentos, recursos, inventário, história e conjuração. A validação de integração e de navegador ainda está em andamento; o PR permanece como rascunho durante esse trabalho.

## Organização

- `js/regras.js`: atributos, proficiências, perícias, passivos, CA e regras básicas.
- `js/campanha.js`: níveis, recursos, descansos, PV, dinheiro, carga e conjuração por fonte.
- `js/estado.js`: validação, versão 3, migração conservadora da versão 2 e recuperação.
- `js/colecao.js`: personagens independentes, lixeira e importação sem sobrescrita silenciosa.
- `js/interface.js`: assistente, ações de sessão, história, magias e impressão.
- `dados/`: progressões das doze classes e 41 subclasses, 42 talentos, 361 magias com 845 vínculos de lista, 13 tabelas de antecedentes e 31 criaturas do apêndice.
- `scripts/extrair_*.py`: extração reproduzível a partir do PDF fornecido, que não é distribuído no repositório.

## Dados e recuperação

A chave antiga `forjaPersonagens.ficha.v2` permanece intacta. A chave atual é `forjaPersonagens.ficha.v3`; uma gravação conserva o documento válido anterior em `.backup`. Erros de leitura ou armazenamento exibem opções de baixar os dados, recuperar uma cópia e tentar novamente. Equipamento guardado é independente do equipamento em uso.

A coleção usa `forjaPersonagens.colecao.v1`. Excluir move a ficha à lixeira. Importar um ID existente cria uma cópia; não substitui a ficha existente.

## Fontes e reconciliação

O catálogo registra as páginas do PDF fornecido. Os dados do Patrulheiro seguem exclusivamente a variante revisada. Variantes e conteúdo próprio permanecem identificados.

A descrição de Falar com Plantas na página 246 repete o cabeçalho de Falar com Animais. O catálogo usa círculo 3, transmutação, sem ritual, conforme as listas do próprio PDF e a regra oficial de 2014: https://media.wizards.com/2016/downloads/SRD-OGL_V1.1.pdf . O erro e a reconciliação ficam registrados na entrada da magia.

## Verificação

```sh
yarn install --frozen-lockfile
yarn check
yarn test
yarn playwright install --with-deps chromium
yarn test:e2e
```

Os testes de regras e integração DOM podem ser executados localmente sem serviços externos. O workflow do GitHub também executa verificações reais em Chromium. Não confundir a passagem dos testes DOM com verificação visual em navegador.
