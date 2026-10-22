# Setup e evidências

Verificação: **21/10/2026**, horário de referência America/Sao_Paulo.
Entrega inicial: infraestrutura primeiro; modularização em proposta posterior.
Continuidade aprovada: piloto de notificações implementado na mesma branch.
Validação do piloto: 103 testes aprovados/1 skip, check de 24 scripts,
check:rules aprovado, lint com 0 erros/85 avisos e 12 cenários Chromium aprovados.
Detalhes e limitações em [qualidade](quality.md) e no [plano](planos/modularizacao.md).
O usuário confirmou a aprovação final do toolkit. A continuidade usa uma cópia
permanente independente, clonada da mesma branch/base e conferida por SHA-256
em 95 arquivos, incluindo as alterações locais do toolkit. A próxima entrega
foi a [proposta de modularização](planos/modularizacao.md), seguida pelo piloto aprovado.
A cópia permanente passou novamente por instalação congelada, test (101 pass,
1 skip), check (23 scripts), check:rules (3 regras), lint (0 erros/85 avisos)
e 12 cenários Chromium (50,3 s), reutilizando o servidor oficial Node e o cache
de teste já existente. A cópia anterior permanece preservada; a pasta permanente
é a referência para as próximas alterações. O cadastro como projeto no desktop
e o carregamento numa nova sessão continuam sendo ações do cliente.
Aplicação: branch `codex/mobile-app-redesign`, base
`70fcea6fc104ea78c2aa2d2c340224bb1e88b4a5`, PR #2. As alterações desta entrega
ficam locais, sem commit, push, deploy ou merge automáticos.

## Fonte, ambiente e decisões

Receita única: [Prompt 12](https://github.com/soumatheusgomes/vibe-coding-toolkit/blob/790a895304e0c08b70a5b215c9d334f1c86b816c/docs/prompts/12-existing-project-setup.md),
toolkit `790a895304e0c08b70a5b215c9d334f1c86b816c`. Guias 01–23, manifest de
documentação e templates dessa revisão orientaram as decisões. Não foi copiado
um scaffold Next nem o toolkit inteiro para dentro da aplicação.

| Item | Estado observado |
|---|---|
| Stack | HTML/CSS/JavaScript clássicos, sem build/TS/backend/SQL |
| Runtime | Node 24.13.0, sem atualização do runtime da máquina |
| Pacotes | Yarn 1.22.22 via Corepack; yarn.lock preservado e atualizado com dependências dev |
| npm | 11.6.2, usado para executar scripts e consultar registry; nenhum package-lock novo |
| ESLint / preset / globals | 10.13.0 / @eslint/js 10.0.1 / 17.13.0, estáveis consultados no registry |
| Browser / DOM | Playwright 1.62.1 e jsdom 26.1.0, versões existentes preservadas |
| Cliente | Codex desktop ativo; CLI detectada 0.163.0-alpha.11, sem atualizar cliente |
| Skills CLI | 1.7.4 via npx, sem instalação global; telemetria desabilitada na execução |
| Context7 | MCP 4.4.3 respondeu via JSON-RPC/HTTP; descoberta no desktop ainda não observada |

ESLint 9 consultado já estava sem suporte. O ESLint 10 usa Node 22.13+ na série
22 ou >=24; essa exigência foi refletida em engines/onboarding. O runtime e
Node 24 do CI continuam os mesmos. Typescript, Biome, logger, ORM, framework,
serviço de telemetria e banco não foram introduzidos.

Antes das mudanças, a árvore estava limpa. Um `git archive` recuperável da base
foi salvo fora do repositório, SHA256
`E08CB2134A7FADD869CEB0B8AF22A93550D0544B2A66708A3DD15C190E9573A2`.
Para recuperar configuração, compare o arquivo da base com a versão alterada;
não restaure o checkout inteiro sobre trabalho posterior. Esse backup não contém
personagens do navegador. Para esses dados, use exportação JSON e recuperação
documentadas em IMPLEMENTACAO.md.

Fontes de APIs: [ESLint](https://eslint.org/docs/latest/use/configure/language-options),
[Node 24 HTTP](https://nodejs.org/docs/latest-v24.x/api/http.html),
[Playwright webServer](https://playwright.dev/docs/test-webserver),
[CLI skills](https://www.skills.sh/docs/cli) e fontes upstream listadas no lockfile.
Uma consulta real Context7 resolveu Playwright e consultou webServer. O índice
não listou 1.62.1; a consulta documental não versionada foi cruzada com a API
instalada e com os testes, sem afirmar documentação exata dessa versão.

## Documentos e memória

| Destino do manifest | Fonte canônica adotada |
|---|---|
| README.md | README.md, entrada e execução |
| PRODUCT.md | PRODUCT.md, escopo/fluxos/aceitação |
| AGENTS.md | AGENTS.md, índice curto e comandos |
| CLAUDE.md | Ponte que importa AGENTS.md; Claude não foi instalado |
| docs/architecture.md | **docs/IMPLEMENTACAO.md**, preservado como equivalente |
| docs/design.md | docs/design.md, interface existente e critérios |
| docs/onboarding.md | docs/onboarding.md, ambiente e primeiro fluxo |
| docs/quality.md | docs/quality.md, checks, dívida e revisão |
| docs/setup.md | Este registro, versões/decisões/evidência |

COBERTURA.md continua a matriz de requisitos; PLANO.md é o diagnóstico histórico,
não a verdade sobre o estado atual. docs/harness.md registra avaliações do agente.
Não há segunda fonte concorrente de arquitetura nem MEMORY.md repetindo o código.

O índice portátil é AGENTS.md. Codex descobre instruções na raiz Git e caminho
até o cwd; CLAUDE.md importa o índice para Claude. A conversa atual começou no
workspace externo: arquivos criados não provam recarga automática nesse chat.
Abrir a raiz Git numa nova sessão é a próxima validação do carregamento nativo.

| Memória durável | Fonte e última verificação | Invalidar quando |
|---|---|---|
| Ruleset e dados | PRODUCT / IMPLEMENTACAO / código, 21/10/2026 | Alteração de regras/schema exige revisão/migração |
| Comandos e runtime | package.json, yarn.lock, configs e execuções abaixo, 21/10/2026 | Scripts, runtime ou dependências mudarem |
| UI | app-shell.css + docs/design.md, 21/10/2026 | Layout, componentes ou critérios de acessibilidade mudarem |
| Ferramentas | Matriz e lockfile de skills, 21/10/2026 | Atualização do cliente/skill/MCP ou mudança de conta/escopo |

Handoffs temporários pertencem ao plano da tarefa, com objetivo/estado/checks/
recursos/próxima ação; ao retomar, conferir arquivos e processos reais.

## Matriz final do catálogo

Legenda: **validado** = execução observada; **instalado** = arquivos locais
verificados, sem comprovar descoberta automática; **configurado** = requer
ativação/discovery; **equivalente** = capacidade existente atende ao objetivo;
**inaplicável** = falta de necessidade/stack; **pendente** = condição externa
com próxima ação. B/M indicam risco baixo/moderado da adoção.

| Componente / necessidade | Estado e ação | Escopo / dependência / risco | Evidência ou condição para retomar |
|---|---|---|---|
| Superpowers: processo | Equivalente manual; plugin pendente | Cliente / distribuição oficial Codex / M | Brainstorm, desenho e plano aprovados; plugin oficial exige Plugins → Superpowers no cliente e nova sessão, fora da instalação local aprovada |
| Subagentes: isolamento/revisão | Validado | Nativo / recursos separados / B | Agentes trabalharam em arquivos distintos e retornaram evidências; coordenador revisa integração |
| RTK: saída concisa | Pendente | Binário de ambiente ausente / M | Requer instalação oficial Windows autorizada; depois versão e uma única reescrita. Sem hook/wrapper fictício |
| Ponytail full: solução mínima | Instalado + procedimento usado manualmente | Skill local MIT / B | Instruções lidas; runtime do produto não reorganizado; discovery automático pendente |
| Caveman: comunicação | Instalado + equivalente em português | Skill local Apache 2.0 / B | Gramática/conteúdo preservados, sem proxy, modelo ou medição de economia |
| ESLint/regras: qualidade | Validado | Dev local / Yarn/Node compatíveis / M | Self-check 3 regras passa, lint 0 erros/85 avisos; arquivos novos sem dívida |
| Biome: cobertura adicional | Inaplicável | Duplicaria lint/formataria sem necessidade / B | Reavaliar somente com lacuna concreta |
| Graphify: relações | Pendente, exclusões configuradas | CLI/Python/uv ou pipx ausentes / M | Após preparar ambiente autorizado, `graphify extract . --code-only --no-cluster` com auto-refresh desligado; grafo ausente não foi consultado |
| Obsidian: memória externa | Inaplicável | Nenhum vault/necessidade/destino escolhido / B | Usar docs locais; não criar serviço para checklist |
| Memória em camadas | Configurada | Índice AGENTS + docs / B | Fontes/frescor/gatilhos acima; recuperação em contexto limpo avaliada separadamente do reinício desktop |
| Hooks | Equivalente sem novos hooks | Cliente / nenhum requisito concreto / M | Não há hooks Git, bloqueadores ou interceptores duplicados |
| agent-browser: automação | Equivalente Playwright validado | Browser descartável / B | 12 cenários locais, sem perfil pessoal; não instalar outro browser runner |
| Context7: documentação | MCP validado via HTTP; cliente configurado | `.codex/config.toml`, trust/reabertura / M | initialize, tools/list, resolve e query responderam; descoberta nativa no desktop pendente |
| Skills de artefatos Anthropic | Inaplicáveis | Sem pedido Office/PDF/artefatos novos / B | Não copiar coleção com licenças/runtime desnecessários |
| Criação/instalação de skills | Equivalente por ferramentas existentes | Skill-creator/installer de sistema e CLI oficial / B | Nenhuma skill criada para tarefa isolada; cópias de projeto pelo procedimento do toolkit |
| Chrome DevTools MCP | Equivalente Playwright | Console/rede locais atendem escopo / M | Sem lacuna que justifique outra conexão/perfil |
| Codex: instruções/config | Configurado; CLI observada | Projeto confiável / M | AGENTS curto e config específica; CLI não prova recarga do desktop |
| Claude: portabilidade | Configurado, não executado | CLAUDE.md importa AGENTS / B | Cliente ausente; instalação/execução fora desta entrega |
| web-design-guidelines | Instalado | Skill Vercel local MIT / B | Nome/recursos/lockfile conferidos; UI da aplicação preservada; checks mobile existentes |
| writing-guidelines | Instalado | Skill Vercel local MIT / B | Documentos e links revisados; discovery automático pendente |
| find-skills | Instalado, reaplicação validada | Skill local MIT / B | CLI lista 1 entrada; duas reaplicações em cópia sem duplicação |
| vercel-react-best-practices | Inaplicável | Sem React/Next / B | Nenhuma migração |
| vercel-composition-patterns | Inaplicável | Sem componentes React / B | Nenhuma biblioteca de componentes nova |
| vercel-react-view-transitions | Inaplicável | Sem React/pedido de animação / B | Nenhuma API experimental |
| vercel-react-native-skills | Inaplicável | Mobile é web, sem Expo/RN / B | Nenhuma migração nativa |
| vercel-optimize | Inaplicável | Sem Vercel/métricas escolhidos / B | Nenhum acesso a serviço |
| deploy-to-vercel | Inaplicável nesta entrega | Publicação não autorizada / M | Nenhum deploy/preview |
| vercel-cli-with-tokens | Inaplicável | Método/conta não escolhidos / M | Nenhum token/CLI Vercel |
| next-dev-loop | Inaplicável | Sem Next/Turbopack / B | Stack preservada |
| next-bundle-optimizer | Inaplicável | Sem analyzer/bundler Next / B | Nenhum build introduzido |
| supabase-postgres-best-practices | Inaplicável | Dados localStorage, sem SQL / B | Nenhuma migração/provedor |
| gh-fix-ci | Instalado; workflow upstream pendente | gh/auth/Python ausentes / M | Conector GitHub fornece equivalente somente leitura; skill não foi executada como CLI |
| differential-review | Instalado; revisão manual adaptada | Git + relatório fora do repo / M | Sem checkout, uploads ou agentes de outro cliente; licença CC BY-SA preservada |
| shadcn | Inaplicável | UI CSS própria / B | Nenhum sistema UI substituído |
| Sentry MCP | Inaplicável | Serviço/org/projeto não escolhidos / M | Sem SDK, OAuth ou telemetria |
| Harness2 nativo | Adotado | Cliente/autenticação/permissões atuais / M | Procedimento em harness.md; smokes e comparação delimitados abaixo |
| Harness2 CLI/benchmarks | Não selecionados | Laboratório e eventuais custos separados / M | Nenhuma dependência/benchmark/API pagos |
| aia-harness | Inaplicável | Sobrepõe onboarding/instruções / B | Nenhum segundo orquestrador |
| Plugins oficiais extras | Equivalentes existentes | Somente necessidade concreta / M | Sem instalação indiscriminada |

## Skills: origem, descoberta e manutenção

Sete skills locais foram instaladas com CLI `skills@1.7.4`, `--agent codex
--copy`, sem `--global`, links absolutos, caches pessoais ou credenciais no
repositório. As fontes por revisão, paths e computedHash estão em
`skills-lock.json`; licenças/atribuição em [third-party](third-party/README.md).
Isso prova instalação e listagem pela CLI, não seleção automática do desktop.

Para listar: `npx --yes skills@1.7.4 list --agent codex --json`.
Para reconstituir uma skill, usar `add` com URL GitHub `tree/<ref>/<diretório>`,
nome do lockfile e `--agent codex --copy --yes`. Para atualização intencional,
conferir `--help`, revisar fonte/licença e usar `update <nome> --project --yes`.
Não atualizar em massa para demonstrar repetibilidade. A reconstituição da
mesma revisão deve preservar hashes; uma atualização exige nova verificação.

Superpowers documenta instalação como plugin oficial Codex. Não foi copiada
uma versão de cliente incompatível nem ativado plugin global. RTK não está no
PATH; Graphify tampouco, e python3 é apenas um alias Windows não funcional.
Preparar esses pré-requisitos é uma tarefa de ambiente separada. Não foi
instalado uv/Python/RTK/Graphify silenciosamente.

## Verificações antes/depois

| Check | Antes | Após setup |
|---|---|---|
| test | 91/91 | 102 casos: 101 pass, 1 skip de symlink Windows, 0 falhas |
| check | 23 scripts/HTML aprovados | Mesmo contrato aprovado |
| check:rules | Não existia | 3 regras locais com self-check aprovado |
| lint | Não existia | 0 erros, 85 avisos legados medidos em quality.md |
| test:e2e | 12 pass com servidor auxiliar | 12 pass em 44,3 s reutilizando servidor oficial Node |
| Yarn congelado | yarn.lock existente | install --frozen-lockfile aprovado |
| Auditoria | Não repetida no baseline | 0 advisories em 119 dependências reportadas pelo Yarn; não certifica segurança |
| CI remoto | Run da base aprovado | YAML atualizado/revisado; execução desse diff não validada sem push |

O servidor teve TDD vermelho (módulo ausente) e verde (GET/HEAD, MIME, erros,
confinamento, travessia e junctions). Um skip de symlink de arquivo requer
permissão/Developer Mode; não foi contornado mudando permissões da máquina.

Falha encontrada no teste antigo de evolução: reload dependia do debounce e
lia PV no HTML oculto do assistente. O teste ajustado verifica armazenamento e
restauração, passou em duas repetições isoladas e na suíte completa. Nenhuma
mudança foi feita em app.js, js/interface.js, CSS, catálogo ou schema.

Neste sandbox Windows, o Playwright conseguiu iniciar o servidor e executar
os casos, mas o encerramento automático por árvore de processos não concluiu;
essas tentativas foram interrompidas. A execução concluída reutilizou
`node scripts/servidor.cjs` iniciado nesta tarefa. O encerramento automático
deve ser validado em Windows sem essa restrição ou no CI Linux; não foi
declarado aprovado. O servidor de teste e recursos próprios são encerrados
ao concluir a tarefa, sem parar processos de terceiros.

## Harness, revisão e limitações

Modo Harness2: adaptação nativa, fontes/invocação versionadas em harness.md e
quality.md. O caso concreto de falha era o comando python3 indisponível.
Uma candidata Node foi comparada em recurso local descartável, com os mesmos
critérios de startup/HTTP e checks de regressão; foi mantida após testes. Isso
não é benchmark de modelos nem medição de economia de tokens.

Reaplicação: uma cópia descartável com customizações em AGENTS e config MCP
recebeu `find-skills` da mesma revisão duas vezes. Hashes das customizações
permaneceram iguais; uma pasta e uma entrada no lockfile. Os arquivos reais
do projeto não foram usados como fixture para esse exercício.

Delegação observada nesta entrega: `gpt-6.1-sol`, esforços medium/high para
investigação, documentação, servidor e revisão conforme o risco. O modelo
principal, provedor e autenticação foram preservados; nenhum custo ou economia
foi estimado. O coordenador é dono de lockfiles/configs/Git e revisa integração.
Contexto limpo de subagente não equivale a reinício do cliente.

Smoke de recuperação em contexto novo: aprovado para localizar comandos,
ruleset/persistência, índice e gatilhos de invalidação, skill de revisão de
prosa e pendências reais. O agente conferiu destinos Markdown locais e não
encontrou links quebrados nos documentos do projeto. A skill foi encontrada
como arquivo e lockfile, não no catálogo fornecido pelo host; discovery
automático e reinício desktop continuam não executados. O smoke usou
`gpt-6-luna`, esforço medium, e operações somente leitura.

Revisão independente concluída, somente leitura, base=head no commit indicado
mais unstaged/untracked do setup. Nenhum achado confirmado ou bloqueante. O
revisor examinou servidor, callers, teste de persistência, configurações,
dependências, CI, regras, skills e documentação; repetiu servidor (10 pass,
1 skip), DOM (10 pass), check (23 scripts), self-check (3 regras) e lint
(41 arquivos, 0 erros, 85 avisos). O relatório redigido ficou fora do repo.
Não foi auditoria integral do produto/dependências nem prova de segurança.
Hashes dos arquivos de código/configuração conferidos após a revisão
permaneceram iguais. O servidor criado nesta tarefa foi encerrado e a porta
8765 foi conferida livre; nenhum processo de terceiros foi parado.
Fixture de autorização, pausa/retomada observável e sessões Claude não foram
executados: não houve mudança de autorização da aplicação e esses casos não
foram selecionados para este smoke de infraestrutura.

## Pendências e próxima entrega

- Abrir a raiz Git numa nova sessão confiável: conferir descoberta das sete
  skills e da conexão Context7. Se o plugin já fornecer Context7 nesse cliente,
  reconciliar a conexão de projeto para não duplicar; OAuth só se solicitado.
- Plugin Superpowers: instalar pela UI oficial, se desejado, e verificar
  carregamento em outra sessão; essa intervenção de cliente ficou pendente.
- RTK/Graphify: preparar binários/runtime por tarefa de ambiente autorizada;
  depois verificar versão, hook único e/ou extração code-only com exclusões.
- gh-fix-ci: preparar gh, login autorizado e Python para executar o workflow
  upstream; continuar distinguindo consultas do conector dessa execução.
- Validar shutdown automático Playwright fora da restrição Windows e symlink
  de arquivo onde a permissão já existir; CI Linux pós-push não foi executado.
- Dívida legada: 85 avisos são inventário, não aprovação para aumentar dívida.
  Propor modularização por responsabilidade e correção do catálogo separadamente.

Para repetir setup: conferir checkout/customizações, obter uma revisão única
do toolkit fora da aplicação, comparar decisões desta matriz, manter só
integrações úteis, atualizar grupos compatíveis e executar verify:all. Não
reinstalar tudo nem reiniciar testes pagos/agendamentos. Sem serviços, conta,
produção ou mudanças globais por efeito colateral.

A revisão da experiência de aplicativo de 21/10/2026 terminou com 133 testes
Node aprovados, um skip de Windows e 24 cenários Chromium aprovados. Resultados,
limites e capturas estão em [quality.md](quality.md); decisões de transições
locais e componentes estão em [design.md](design.md).
