# Avaliação do ambiente de agentes

Este projeto adota o método nativo inspirado em Harness2: observar um problema,
definir um critério, testar e guardar evidência. Não instala o CLI Harness2,
outro orquestrador, proxy ou API de modelos. Preserva cliente, modelo principal,
autenticação e permissões da sessão.

## Fontes reproduzíveis

Receita `soumatheusgomes/vibe-coding-toolkit` na revisão
`790a895304e0c08b70a5b215c9d334f1c86b816c`:

- [Prompt 14 — avaliar](https://github.com/soumatheusgomes/vibe-coding-toolkit/blob/790a895304e0c08b70a5b215c9d334f1c86b816c/docs/prompts/14-harness-evaluation.md).
- [Prompt 15 — melhorar](https://github.com/soumatheusgomes/vibe-coding-toolkit/blob/790a895304e0c08b70a5b215c9d334f1c86b816c/docs/prompts/15-harness-improvement.md).
- [Guia e fixture](https://github.com/soumatheusgomes/vibe-coding-toolkit/blob/790a895304e0c08b70a5b215c9d334f1c86b816c/docs/07-harness-evaluation.md).

Invocação reutilizável: “Leia e execute o bloco Prompt do prompt 15 nessa
revisão para o ambiente deste projeto, no modo de adaptação nativa. Use os
checks existentes, preserve customizações e só compare uma candidata se houver
uma falha concreta. Não instale o CLI nem execute benchmarks pagos.”

## Casos proporcionais

1. Em contexto limpo, localizar instruções, comandos, ruleset e recuperação de
   dados. O coordenador confere os arquivos citados. Um subagente novo testa
   recuperação de contexto; não comprova reinício do aplicativo desktop.
2. Conferir skill pertinente em `.agents/skills/` e executar procedimento seguro
   quando disponível. Listagem de arquivos não comprova seleção automática.
3. Consultar Context7 com apenas nome/versão pública da biblioteca. Resolver o
   identificador antes de consultar; registrar ausência de versão exata no índice.
4. Reaplicar partes seguras em uma cópia descartável com customização de teste.
   Conferir preservação dessa customização e ausência de entradas duplicadas.
5. Revisar o diff somente em leitura, com relatório fora do checkout. Conferir
   se o revisor preservou os arquivos e se suas evidências são reproduzíveis.

Se houver mudança material de instruções de autorização/retomada, selecionar
também os casos boundary fix e stale handoff do fixture. Copiar para um
diretório descartável fora da aplicação e do toolkit; nunca servir/publicar o
fixture. O avaliador fica fora do conjunto de arquivos permitido ao agente.
O baseline deve falhar nos dois controles de autorização e passar nos demais;
após correção, os sete controles passam. Não mudar o avaliador para aceitar o bug.

## Uma comparação para uma falha real

Preservar o input e checks; registrar baseline. Alterar uma única candidata
mínima, executar os mesmos checks e revisar a diferença. Manter a candidata
somente com evidência do critério e sem regressões/ações não autorizadas.
Se os casos já passam, conservar as instruções; não inventar uma otimização.
Nova tentativa exige informação nova, falha remanescente ou decisão explícita.

Para cada caso registrar data, revisão, cliente/modelo/esforço observáveis,
inputs, comandos, resultado, alterações e limites. Marcar pass/fail/não executado
sem fazer médias que escondam falhas. Um smoke não é uma taxa de confiabilidade.
Resultados desta execução e gatilhos de reavaliação ficam em [setup](setup.md).

## Memória e retomada

AGENTS.md é o índice versionado para os documentos canônicos. O Codex deve ser
aberto na raiz Git para descoberta de instruções; CLAUDE.md importa o índice
para o outro cliente. Isso não prova que o chat atual mudou de cwd ou recarregou
configurações criadas durante a execução.

Antes de confiar em uma memória, conferir fonte, última verificação e gatilho
de invalidação em setup.md. Contexto transitório de tarefa deve ficar num plano
ou handoff com estado, checks, recursos próprios, bloqueios e próxima ação,
não virar regra permanente. Retomar verificando os arquivos/processos reais.
