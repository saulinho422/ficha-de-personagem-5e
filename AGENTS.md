# Forja de Personagens 5e

## Contexto e comandos

Aplicação estática JavaScript/CSS, D&D 5e **2014 + Patrulheiro Revisado**.
Leia [README](README.md), [produto](PRODUCT.md), [implementação](docs/IMPLEMENTACAO.md)
e [cobertura](docs/COBERTURA.md) antes de alterar um fluxo.

Node 24 recomendado (ferramentas: Node 22.13+ na série 22 ou >=24).
Gerenciador canônico: Yarn 1.22.22, `yarn.lock`. Use `corepack yarn` se Yarn não
estiver no PATH; não acrescente outro lockfile.

| Ação | Comando na raiz |
|---|---|
| Instalar | `corepack yarn install --frozen-lockfile` |
| Servir local | `corepack yarn start` (127.0.0.1:8765) |
| Sintaxe e HTML | `npm run check` |
| Regras locais | `npm run check:rules` |
| Lint | `npm run lint` |
| Regras/DOM/servidor | `npm test` |
| Chromium | `corepack yarn playwright install chromium` |
| Navegador | `npm run test:e2e` |
| Verificar tudo | `npm run verify:all` |

No PowerShell restrito use `npm.cmd`/`corepack.cmd`. Não há build nem tipos TS.
Diagnóstico, avisos legados, revisão e evidências: [qualidade](docs/quality.md).

## Contratos e trabalho

- Preserve funcionalidades, UI mobile de aplicativo e desktop, validação,
  acessibilidade e personagens já salvos. Não misture regras de 2024.
- Ficha v3, coleção v1, chave v2 e backups têm contratos documentados em
  IMPLEMENTACAO.md. Mudança de formato exige migração e testes de conservação.
- Leia os callers e testes antes de editar. Defina aceitação, reproduza falhas
  e teste regressões. Execute test, check e test:e2e após mudanças funcionais.
- Faça a menor mudança completa. Não modularize app.js/interface.js nem
  reformate a aplicação como efeito colateral do setup; isso é outra entrega.
- Respeite alterações locais. Antes de retomar, confira checkout, arquivos,
  processos e verificações; um handoff não substitui evidência atual.
- Distinga observação, hipótese, decisão e resultado. Não declare integração
  funcionando só porque um arquivo foi instalado.
- Continue trabalho autorizado após responder status; um bloqueio interrompe
  apenas dependências afetadas. Não prometa execução em segundo plano sem processo.
- Esta continuidade usa `codex/mobile-app-redesign` / PR #2 por decisão do
  usuário. Não faça merge na main sem autorização explícita. Não acrescente
  requisitos de branch/worktree, hooks Git ou bloqueadores de commit/push.
- Setup não autoriza push, deploy, mensagens externas, contas, custos, operações
  destrutivas ou mudanças globais. Não altere modelo/provedor, login ou permissões.

## Contexto sob demanda e ferramentas

- [Design](docs/design.md): tokens, mobile, desktop e acessibilidade.
- [Onboarding](docs/onboarding.md): execução, caches e dados descartáveis.
- [Setup](docs/setup.md): fontes, versões, memória, integrações e pendências.
- [Harness](docs/harness.md): avaliação descartável e melhoria medida.
- Skills locais listadas em setup: Ponytail `full` para solução mínima;
  Caveman para português conciso, com gramática e conteúdo técnico preservados;
  writing-guidelines para prosa, web-design-guidelines para revisão de UI.
  find-skills só para lacuna concreta; instalação não autoriza ações externas.
- Context7: resolver biblioteca e consultar um conceito por vez, com versão
  real e sem código privado/segredos. Se indisponível, consultar fontes oficiais
  e registrar a limitação. Não duplicar conexão já fornecida pelo cliente.
- Superpowers/RTK/Graphify: verificar disponibilidade e discovery antes de usar;
  pendências e alternativas estão em setup. Sem hook RTK ativo, não invente
  reescrita; grafo ausente/desatualizado não prova relações do código.
- Revisão de segurança: faixa Git precisa, somente leitura por padrão e relatório
  privado fora do repo. differential-review pode orientar tracing manual;
  ferramentas/agentes específicos de outro cliente não são automaticamente portáveis.

## Delegação e documentação

Prefira execução direta para tarefas simples. Para isolamento ou revisão útil,
use agentes nativos com objetivo, contexto mínimo, arquivos permitidos, recursos,
aceitação e checks. Um escritor por arquivo; coordenador cuida de lockfiles,
configuração e Git. Serialize portas/saídas compartilhadas. Revise o diff e
integração; só assuma arquivos depois que o responsável parar.

Com seleção autorizada, escolha capacidade/esforço pelo risco e evidência, sem
fixar nomes comerciais como padrão. Revisores não editam o projeto. Resolva ou
disponha achados relevantes; novas rodadas precisam de risco/evidência novos.
Atualize o documento responsável quando mudar comportamento, comandos ou contratos.
Mantenha planos temporários separados das decisões duráveis.
