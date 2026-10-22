# Qualidade, revisão e limites

## Comandos e o que comprovam

Yarn 1.22.22 e yarn.lock são canônicos para instalação. Os scripts abaixo também
aceitam `corepack yarn <script>`. No PowerShell restrito, use `npm.cmd`.

| Comando | Evidência |
|---|---|
| `npm run check` | Sintaxe dos 24 scripts de aplicação e referências locais do HTML |
| `npm run check:rules` | Self-check das três regras locais do toolkit com RuleTester |
| `npm run lint` | ESLint 10 sobre JS clássico, ferramentas Node e testes; não formata |
| `npm test` | Regras, persistência, DOM e servidor HTTP isolado |
| `npm run test:e2e` | 14 cenários Chromium, incluindo responsividade, mobile/hub, teclado, JSON e impressão |
| `npm run verify` | check + check:rules + lint + test, sem navegador |
| `npm run verify:all` | verify + test:e2e |
| `corepack yarn audit --json` | Advisory de dependências; não prova ausência de vulnerabilidades |

Não há compilação, build, TypeScript ou verificação de tipos separados. As
ferramentas novas são verificadas por ESLint e por seus testes/self-checks;
`check` conserva o contrato anterior dos scripts de aplicação.

Playwright sobe `node scripts/servidor.cjs` no loopback e, fora do CI, pode
reutilizar `yarn start` já aberto. Um ambiente que impede encerrar a árvore de
processos pode exigir iniciar esse servidor em outro terminal e encerrá-lo ao
final. Isso não equivale a validar o encerramento automático nesse ambiente.
Não use servidor publicado nem perfil pessoal para os testes.

## Adoção do lint

ESLint 10.13.0, @eslint/js 10.0.1 e globals 17.13.0 foram escolhidos no canal
estável e registrados no lockfile. A série ESLint 9 estava sem suporte na
consulta; o ferramental exige Node 22.13+ na série 22 ou >=24. O runtime
observado permanece Node 24.13.0. Não foi instalado outro Node.

Os scripts do navegador são clássicos, carregados na ordem de index.html.
`eslint.config.mjs` declara explicitamente bindings compartilhados e mutáveis
do contrato app.js/interface.js; não desliga no-undef. Tests de navegador têm
ambos os ambientes, pois callbacks evaluate/addInitScript rodam no browser.
As regras de SQL e logger copiadas ficam inativas: esses contratos não existem.
Não há Biome/formatter redundante nem supressão geral de arquivos da aplicação.

Medição de 21/10/2026: **0 erros e 85 avisos**, todos nos arquivos anteriores
à entrega, após declarar os ambientes corretos. Ferramentas novas têm regras
de tamanho/complexidade/parâmetros como erro. Os avisos não são um teto permitido:
não se deve acrescentar dívida nem aumentar limites para esconder resultados.

| Regra em adoção | Avisos | Ação posterior |
|---|---:|---|
| complexity, limite 12 | 50 | Separar decisões por responsabilidade, com regressões |
| max-params, limite 4 | 15 | Rever interfaces quando o fluxo for alterado |
| quality/max-lines, referência 350 | 10 | Distinguir código de dados e propor modularização |
| no-unused-vars | 8 | Conferir usos reais antes de remover |
| max-depth, limite 4 | 1 | Simplificar o fluxo com testes |
| no-dupe-keys, apenas banco_phb.js | 1 | Corrigir a duplicação no catálogo com prova de regressão |

A chave duplicada é `peso` no Kit de primeiros-socorros; o valor efetivo atual
é `1,5 kg`. Registrá-la como dívida não altera o catálogo nem os personagens.
Promova cada regra para erro quando o seu escopo chegar a zero, sem enfraquecer
as proteções já existentes. Não modularize ou reformate como efeito colateral.

## Testes e evidência

### Revisão visual com Impeccable — 21/10/2026

Escopo: estrutura de criação, ficha, história, magias, hub e diálogos,
preservando dados e fluxos. Fontes consultadas: [skill Impeccable](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md)
e referências `layout`, `operate` e `craft-floor`. O launcher não existe neste
checkout; contexto e inspeção foram feitos diretamente, conforme o fallback
da skill. Não houve instalação de hooks, executáveis ou dependências globais;
o detector automático da Impeccable não foi executado.

A avaliação inicial identificou progresso grid com overrides flex inoperantes,
grade de ficha estreita perto de 900px, excesso de elevação repetida e ações do
hub apertadas em 320px. Capturas antes/depois orientaram as alterações. A revisão
independente somente leitura não deixou achados acionáveis. `npm run verify`
aprovou sintaxe de 24 scripts, três regras locais, lint e 103 testes Node/DOM,
com 1 skip de symlink Windows. Lint final: 0 erros e os mesmos 85 avisos.

Foram acrescentadas regressões de navegador para etapa atual visível no celular
e ficha/história/magias/hub em 320, 760, 800, 1000 e 1440px, com nome longo e
história extensa. A comparação do localStorage protege os dados ao navegar e
redimensionar. A navegação móvel usa máscaras SVG decorativas; os símbolos de
texto anteriores compunham o nome acessível e impediam localizar o rótulo exato.

Resultado final: **14/14 cenários Chromium aprovados em 4,2 minutos**, com o
cache de teste existente e o servidor oficial iniciado separadamente. A primeira
rodada direcionada revelou a ambiguidade dos símbolos nos nomes acessíveis;
após a correção, a suíte completa passou com o timeout padrão. A lentidão desta
execução também apareceu no Node (158,8 s), sem falhas ou mudança de timeout.
Capturas de criação, ficha, história, magias e hub foram inspecionadas. Não foi
realizada avaliação completa por leitor de tela ou em Safari/Firefox.

Piloto de notificações, 21/10/2026: dois testes DOM passaram antes e depois da
transferência literal para `js/notificacoes.js`. Cobrem criação sob demanda,
acessibilidade, texto seguro, reutilização, frames, prazo de 3500 ms, fechamento
e conservação do personagem/PV/localStorage. `npm test`: 103 aprovados, 1 skip
de symlink Windows; `check`: 24 scripts; `check:rules`: 3 regras aprovadas;
lint: 0 erros e os mesmos 85 avisos legados. O arquivo novo recebe limites como
erro; suas funções globais continuam disponíveis aos scripts consumidores.

A revisão independente, somente leitura, confirmou transferência, unicidade,
ordem e API. O achado de conservação no cenário de importação foi resolvido:
o teste compara todo o localStorage após recusar JSON inválido e mantém a
asserção original de importação válida.

Chromium: 12/12 aprovados (34,0 s), incluindo o caller real de importação.
A primeira tentativa não iniciou por ausência do navegador no cache padrão;
a execução final usou `PLAYWRIGHT_BROWSERS_PATH` apenas no processo, apontando
ao cache de teste existente em `work/pw-browsers` da cópia anterior. Nenhuma
instalação global foi feita. O servidor oficial foi iniciado separadamente e
reutilizado; esta execução não valida o shutdown automático do Playwright.

Na tentativa de testar o fechamento durante a importação, Chromium confirmou
que o diálogo modal intercepta o clique no toast. Esse comportamento anterior
permanece fora da extração; o fechamento é caracterizado no teste DOM.

O baseline era 91 testes Node/DOM, check aprovado e 12 cenários Chromium.
O novo servidor acrescenta casos HTTP, métodos, MIME, erros, traversal e
links/junctions. Neste Windows, o symlink de arquivo pode ficar ignorado por
permissão; junctions são exercitadas. Registre skip como skip, nunca como pass.

O teste de evolução agora aguarda nível/subclasse/PV no localStorage antes da
recarga e verifica a restauração do rascunho. O cenário anterior dependia do
debounce: depois do salvamento, a ficha está oculta e seu HTML inicial de PV
não representa o estado do personagem. As asserções de conservação dos dados
permanecem; nenhum comportamento da aplicação foi alterado.

O CI mantém jobs de regras/interface e navegador, Node 24, lockfile congelado,
permissões somente leitura e artefatos por 14 dias. Self-check e lint foram
acrescentados ao job existente. A execução local não comprova um novo run
remoto; não haverá push durante setup só para obter essa evidência.

## Revisão de segurança reutilizável

Fonte versionada: [bloco Prompt 13](https://github.com/soumatheusgomes/vibe-coding-toolkit/blob/790a895304e0c08b70a5b215c9d334f1c86b816c/docs/prompts/13-security-review.md#prompt).
Invocação: “Execute apenas esse bloco Prompt em modo diff: base e head iguais
ao commit local informado, incluindo alterações staged, unstaged e untracked
do setup. Preserve o checkout. Escreva relatório redigido fora do repositório.”

Para uma revisão futura de commits, informe duas revisões resolvidas e a
semântica de comparação; para baseline, informe o snapshot atual e exclusões.
Leia scripts antes de executar. Use dados sintéticos, não acesse produção,
não publique achados e não envie código a serviços externos. Correções exigem
escopo autorizado separado; revisão não autoriza alterações ou contas.

Use differential-review se disponível, adaptando passos ao cliente. Leia objetos
Git sem checkout; comandos de outro cliente ou agentes nomeados no upstream não
estão automaticamente instalados. Faça tracing manual quando necessário.
Relatório traz escopo, fonte, localização, cenário concreto, impacto, confiança,
contraprovas e limitações. Falta de teste não é vulnerabilidade confirmada.

## Critério de conclusão

Definir aceitação antes de editar, reproduzir falha quando viável e executar
regressões. Revisão independente para mudança não trivial usa diff preciso e
callers afetados; revisores são somente leitura. Encerrar quando achados
pertinentes forem resolvidos/dispostos e checks relevantes passarem. Novas
rodadas dependem de risco/evidência novos, não de contagem ritual.

Avaliação de agentes e método nativo Harness2: [harness](harness.md).
Evidências, integrações pendentes e próximos passos: [setup](setup.md).

## Experiência de aplicativo — 21/10/2026

Na branch `codex/mobile-app-redesign`, a rodada final executou:

- `npm run verify`: 31 scripts e referências HTML válidos; regras locais
  aprovadas; lint com zero erros e 84 avisos; 134 testes Node, sendo 133
  aprovados e um skip de symlink de arquivo no Windows.
- `npm run test:e2e`: 24 cenários Chromium aprovados, incluindo riqueza
  confirmada, cancelamento de nível, compras, PV em linha, imagens, teclado,
  movimento reduzido, cinco larguras e conservação dos dados.
- `git diff --check`: sem erros de whitespace.

Capturas locais em `test-results/`: ficha mobile/desktop, história mobile,
atributos, hub, gerenciador de inventário e impressão/PDF. Os testes e as
capturas usam contextos descartáveis; não alteram a coleção do navegador do
usuário. Revisão independente identificou e acompanhou as correções de
confirmação de riqueza, aviso de concentração, foco, PV provisórios e overflow
transitório das animações. Isso não equivale a uma auditoria completa com
leitor de tela ou a um teste em aparelhos físicos.
