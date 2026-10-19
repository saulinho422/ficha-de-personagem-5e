# Implementação da mega atualização

Perfil: Livro do Jogador 2014, com o Patrulheiro Revisado do PDF fornecido.

Esta branch implementa a criação guiada em nove etapas, os cálculos puros, as escolhas de origem/classe/talentos, os recursos de sessão, inventário, criaturas, história e conjuração. Os efeitos que dependem do contexto da mesa são apresentados como controles e lembretes; não são simulados sem uma decisão do jogador ou do Mestre.

## Organização

- `js/regras.js`: atributos, proficiências, perícias, passivos, CA e regras básicas.
- `js/campanha.js`: níveis, recursos, descansos, PV, dinheiro, carga e conjuração por fonte.
- `js/sessao.js`: economia de ações, dano tipado, Proteção Arcana, cura e recursos de combate.
- `js/criaturas.js`: Forma Selvagem, companheiro do Patrulheiro Revisado e criaturas personalizadas.
- `js/estado.js`: validação estrita, versão 3, migração conservadora da versão 2 e recuperação.
- `js/colecao.js`: personagens independentes, lixeira e importação sem sobrescrita silenciosa.
- `js/interface.js`: assistente, ações de sessão, história, magias e impressão.
- `dados/`: 12 classes e 41 subclasses/conclaves, 42 talentos, 361 magias/845 vínculos, 13 tabelas de antecedentes, 31 criaturas e tabelas de aventura.
- `scripts/extrair_*.py`: extração reproduzível a partir do PDF fornecido, que não é distribuído no repositório.

## Dados e recuperação

A chave antiga `forjaPersonagens.ficha.v2` permanece intacta. A chave atual é `forjaPersonagens.ficha.v3`; uma gravação conserva o documento válido anterior em `.backup`. Erros de leitura ou armazenamento exibem opções de recuperar ou exportar os dados. Equipamento guardado é independente do equipamento em uso.

A coleção usa `forjaPersonagens.colecao.v1`. Excluir move a ficha à lixeira. Importar um ID existente cria uma cópia; não substitui a ficha existente. O validador recusa perfil de regras, IDs, equipamentos ou progressões forjadas antes da gravação.

## Fontes e reconciliação

O catálogo registra as páginas do PDF fornecido. Os dados do Patrulheiro seguem exclusivamente a variante revisada. Variantes e conteúdo próprio permanecem identificados.

A descrição de **Falar com Plantas** na página 246 repete o cabeçalho de Falar com Animais. O catálogo usa círculo 3, transmutação, sem ritual, conforme as listas do próprio PDF e a regra oficial de 2014; a divergência fica registrada na entrada da magia.

## Verificação

```sh
yarn install --frozen-lockfile
yarn check
yarn test
yarn playwright install --with-deps chromium
yarn test:e2e
```

Resultados esperados desta revisão: 88 testes de regras/DOM e 11 cenários em Chromium. O workflow publica `playwright-report` e `test-results` por 14 dias, inclusive em falhas. A matriz detalhada está em [COBERTURA.md](COBERTURA.md).
