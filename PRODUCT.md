# Produto: Forja de Personagens 5e

A Forja cria e mantém fichas em português no navegador, com o Livro do Jogador de D&D 5e de 2014 e o Patrulheiro Revisado da fonte do projeto. As regras de 2024 ficam fora desse perfil.

## Público e uso

Hipótese de público, inferida das funções existentes: jogadores de mesas em português que precisam criar personagens, consultar cálculos e registrar uma sessão no celular ou desktop. O Mestre participa das decisões contextuais; a ficha não substitui essa decisão.

O valor central é manter escolhas, cálculos e recursos da mesma personagem juntos, reduzindo transcrição entre criação, sessão e impressão. O [README](README.md) apresenta as capacidades e a [matriz de cobertura](docs/COBERTURA.md) distingue cálculo automático, operação assistida e conteúdo de referência.

## Fluxos e critérios observáveis

| Fluxo | Resultado esperado |
| --- | --- |
| Criar no hub | O assistente percorre nove etapas e a revisão aponta escolhas obrigatórias pendentes antes de gerar a ficha. |
| Distribuir atributos | Conjunto padrão, compra de 27 pontos e 4d6 com descarte seguem suas próprias validações. |
| Consultar e jogar | Ficha, História e Magias mostram os dados da personagem; PV, recursos, condições e descansos podem ser registrados durante a sessão. |
| Equipar e evoluir | Equipamento guardado e em uso são distintos; escolhas de nível e origem alimentam os cálculos. |
| Gerenciar personagens | Abrir, renomear e duplicar preservam fichas independentes; excluir move a ficha à lixeira recuperável. |
| Transportar dados | Exportação JSON gera uma cópia externa; importação valida antes de gravar e cria cópia quando o ID já existe. |
| Levar à mesa | A impressão permite selecionar grupos das três páginas e usar o salvamento em PDF do navegador. |

Os atributos rolados são produzidos em seis ações do jogador, com distribuição
dos resultados e sem nova série para a mesma personagem. A compra de pontos
mostra o orçamento de 27 pontos. Ganhos de PV posteriores ao primeiro nível
exigem média ou rolagem; cancelar o nível descarta escolhas provisórias.

O inventário mantém uma visão compacta na ficha, um catálogo de compras com
débito na carteira e um gerenciador de itens, equipamento e carga. PV atuais
e temporários aceitam valores inteiros e operações com sinal diretamente na
ficha. Retrato é opcional; campos antigos ocultos continuam nos dados salvos.

Consulte a [qualidade](docs/quality.md) para comandos e evidências de execução.

## Dados e limites do produto

O site é estático, com JavaScript e CSS, sem build de aplicação. As fichas ficam no `localStorage` da origem do navegador; mudar protocolo, host ou porta pode apresentar outra coleção. Não há sincronização de conta entre dispositivos.

O documento de ficha usa versão 3 e a coleção versão 1. A migração conservadora da versão 2 preserva a chave antiga; a gravação mantém backup do documento válido anterior. O usuário deve exportar JSON regularmente, inclusive antes de trocar de navegador ou limpar dados. As chaves e a recuperação estão documentadas em [Implementação](docs/IMPLEMENTACAO.md#dados-e-recuperação).

Alvos, terreno, autorização do Mestre e gatilhos narrativos permanecem decisões da mesa. A Forja apresenta controles e referências para esses casos, sem simular a resolução completa do jogo.

## Direção da manutenção atual

A prioridade aprovada é consolidar infraestrutura, documentação e verificações reproduzíveis. Essa etapa não muda a interface, o comportamento, o esquema de dados ou a organização dos módulos. Novas funções de produto precisam de escopo próprio e de critérios ligados aos fluxos acima.

Após essa etapa, o usuário aprovou o piloto de notificações e uma revisão da
estrutura visual com Impeccable. A revisão organiza a criação, a consulta e a
navegação responsiva dentro da identidade papel/vinho; preserva as funções,
o perfil de regras e os contratos de armazenamento. As decisões visuais ficam
em [design](docs/design.md), e as evidências em [qualidade](docs/quality.md).

Veja também o [design existente](docs/design.md) e o [onboarding](docs/onboarding.md).
