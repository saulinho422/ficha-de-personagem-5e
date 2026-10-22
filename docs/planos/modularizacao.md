# Proposta de modularização incremental

Data: 21/10/2026. Estado: **piloto de notificações aprovado e implementado**.
O usuário aprovou o piloto após a proposta. As demais fatias continuam como
propostas, sem execução automática ou autorização de reorganização ampla.

## Objetivo e base

Separar responsabilidades da interface para facilitar mudanças e testes,
mantendo comportamento, scripts clássicos e formato dos personagens salvos.

Base: branch `codex/mobile-app-redesign`, commit
`70fcea6fc104ea78c2aa2d2c340224bb1e88b4a5`, mais alterações locais aprovadas
do toolkit. Os intervalos abaixo referem-se a essa base; conferir nomes e
callers antes de executar, pois linhas mudam após cada extração.

A cópia permanente foi clonada diretamente da branch, com o HEAD do PR #2
conferido no remoto. Os 95 arquivos da cópia anterior, incluindo modificações
e untracked do toolkit, foram transferidos e comparados por SHA-256. O estado
Git ficou idêntico; node_modules e relatórios gerados não foram copiados.

## O que o diagnóstico mostrou

| Evidência | Implicação |
|---|---|
| app.js tem cerca de 2,4 mil linhas e 117 KB | Concentra inicialização, formulários, sessão, inventário, ataques, traços e persistência |
| js/interface.js tem cerca de 240 linhas e 87 KB | Muitas rotinas ocupam uma única linha; ficar abaixo de 350 linhas não comprova divisão adequada |
| HTML usa funções globais em onclick/onsubmit | Trocar para ESM ou esconder handlers numa IIFE quebraria chamadas sem uma migração própria |
| window.onload coordena restauração e renderização | Não antecipar montagem de DOM ou salvamento ao carregar um novo arquivo |
| Objetos/arrays são substituídos em restauração, consumo e descansos | Módulos futuros não podem capturar uma referência antiga do estado |
| Check e servidor reconhecem JS diretamente em js/ | Usar arquivos nesse nível evita ampliar infraestrutura sem necessidade |
| Lint mede 85 avisos legados e zero erros | Melhorar fronteiras com evidência; não impor tamanho arbitrário nem esconder avisos |

O motor de regras já tem fronteiras em regras.js, campanha.js, sessao.js,
criaturas.js, estado.js e colecao.js. Não mover esse código para a camada de UI.

## Alternativas e decisão recomendada

| Alternativa | Benefício | Custo/risco | Decisão |
|---|---|---|---|
| Separar fisicamente scripts clássicos, preservando nomes globais | Diff pequeno, consumidores intactos, mesma execução sem build | Mantém o acoplamento global por enquanto | **Adotar nas primeiras fatias** |
| Extrair partes da IIFE com fábrica e dependências explícitas | Reduz closures grandes e facilita testar responsabilidades | Exige leitura tardia do estado e API definida | Adotar depois do piloto, começando por história |
| Converter tudo para ESM/framework/build | Permite redesenhar dependências | Afeta handlers HTML, ordem, execução direta e infraestrutura | Fora do escopo; não recomendado nesta série |

Recomendo começar por **notificações**, uma fatia sem regras ou dados de
personagem. O objetivo do piloto é provar extração e carregamento com regressões,
não eliminar o aviso de tamanho de app.js. Depois seguir por navegação, traços
e história. Inventário requer uma decisão posterior baseada nas primeiras fatias.

## Contratos que não mudam

- D&D 5e 2014 com Patrulheiro Revisado; nenhuma regra de 2024.
- Ficha v3, coleção v1, chave v2 preservada, backups e política de importação.
- PV atuais/temporários, inventário, equipamento em uso, moedas, magias e história.
- IDs de elementos/classes CSS, nomes e assinaturas dos handlers globais usados
  pelo HTML, ordem de inicialização e eventos relevantes.
- API pública de ForjaInterface e dos módulos de regras/estado.
- Aparência mobile, desktop, teclado, foco, impressão e execução estática.
- Nenhum commit/push/merge/publicação automático. Continuar na branch solicitada.

Extração não inclui consertar comportamentos antigos encontrados durante a
leitura. Registrar separadamente uma falha, reproduzi-la e propor correção com
teste, sem misturá-la ao deslocamento de código.

## Piloto implementável: notificações

### Arquivos e responsabilidade

| Arquivo | Alteração proposta |
|---|---|
| js/notificacoes.js | Receber temporizadorToast, mostrarToast e fecharToast |
| app.js | Remover apenas o bloco transferido, hoje nas linhas 2221–2248 |
| index.html | Carregar notificacoes.js como script clássico antes de app.js |
| eslint.config.mjs | Declarar mostrarToast/fecharToast nos consumidores e aplicar regras adequadas ao arquivo novo, sem desligar no-undef |
| tests/notificacoes.test.cjs | Caracterizar reutilização, texto seguro e ciclo de vida da notificação |
| tests/navegador/ficha.spec.cjs | Fortalecer um fluxo existente que mostra toast, preservando a asserção funcional original |
| docs/IMPLEMENTACAO.md, docs/quality.md, README.md | Atualizar mapa de responsabilidade e resultados reais, sem reescrever outras seções |

As dependências do bloco são document, requestAnimationFrame, setTimeout e
clearTimeout. Não há leitura de localStorage, de detalhesFicha ou das regras.
O temporizador acompanha as funções. Não introduzir namespace, adaptadores ou
novas opções no piloto: os consumidores continuam chamando as mesmas funções.

### Aceitação observável

1. A primeira mensagem cria um único `#toast-notificacao` sob demanda.
2. Preserva classes, role=status, aria-live=polite, ícone decorativo e botão
   “Fechar notificação” com seu nome acessível.
3. Mensagens com marcação HTML aparecem como texto; nenhum conteúdo é executado.
4. A segunda mensagem reutiliza o elemento, substitui texto/tipo, cancela o
   vencimento antigo e agenda o prazo atual de 3500 ms.
5. O botão fecha a mensagem e cancela seu temporizador; a animação via
   requestAnimationFrame continua com o mesmo comportamento.
6. Mostrar/fechar toast não altera personagem, PV ou documento persistido.
7. Um caller real, como importação JSON inválida, continua exibindo a mensagem
   esperada e recusando o arquivo sem alterar dados.

### Sequência verificável

1. **Caracterizar antes de mover.** Criar testes DOM contra a implementação
   atual por tests/apoio.cjs. Controlar temporizadores/frames na janela de teste;
   não esperar 3,5 segundos reais nem remover verificações de persistência.
   Confirmar que esses contratos passam antes da extração.
2. **Transferir o bloco e registrar o script.** Não renomear funções, alterar
   strings, mover estado do personagem ou formatar o restante de app.js.
   O diff deve mostrar uma transferência, não uma reimplementação.
3. **Conferir consumidores.** Inspecionar chamadas em app.js/interface.js,
   handlers do HTML, carregamento em tests/apoio.cjs e globals do ESLint.
   scripts/verificar.cjs já descobre o novo JS diretamente em js/; não ampliar
   a allowlist do servidor para esta mudança.
4. **Executar regressões.** Testes novos, npm test, npm run check,
   npm run check:rules, npm run lint e npm run test:e2e. Esperar que check
   passe a reconhecer 24 scripts; não codificar esse número como proteção.
5. **Revisar o diff.** Revisor somente leitura verifica origem/destino,
   escopo, API global, texto seguro, cancelamento de timers e conservação de
   dados. Corrigir achados pertinentes e repetir apenas checks afetados.

O piloto não promete reduzir os 85 avisos: o bloco de toast não é responsável
pelas maiores complexidades. Aceitação é zero nova dívida atribuível e a
responsabilidade isolada com comportamento preservado.

## Próximas fatias, sem execução automática

### 2. Navegação coordenada

Destino sugerido: js/navegacao.js. A função mudarAba de app.js:710–724 é pequena,
mas não está isolada: index.html:119–121 chama o global; a criação também o usa;
interface.js:46 instala ARIA/tabIndex/teclado e :54 coordena navegação mobile.

Extrair o conjunto com uma instalação explícita chamada no ponto atual de
ForjaInterface.iniciar. Preservar mudarAba global. Não corrigir silenciosamente
a diferença entre mudarAba direto e o handler de clique que atualiza ARIA.

Regressões: clique/seleção/painel desktop; ArrowLeft/Right/Home/End com foco;
destinos mobile; reabrir ficha/editar/criar conservando a página esperada.

### 3. Traços e características

Destino sugerido: js/tracos.js. Mover o bloco de app.js:1903–2218:
ROTULOS_TIPO_TRACO; abrir/fechar/salvar/excluir modal; geração de automáticos;
IDs, combinação e renderização; expansão, bloqueio e filtro.

filtroTracosAtual pode acompanhar a responsabilidade. tracosPersonagem e
tracosAutomaticosExpandidos permanecem no estado central, para captura e
restauração conservarem os mesmos contratos. Callers externos relevantes:
inicialização, recalcularFicha e handlers HTML dos filtros/modal.

Risco concreto: excluir um talento pode remover progressão e recalcular bônus;
não tratar o bloco como renderização pura. IDs automáticos precisam permanecer
idênticos, pois aparecem em tracosAutomaticosExpandidos serializado. A expansão
manual salva imediatamente; a automática não faz isso no mesmo ponto atual.
Não mudar esse momento de salvamento durante a extração.

Regressões: criar/editar/excluir manual; proteção dos automáticos; bloqueio;
filtros; Enter/Espaço na expansão; texto seguro; restauração de IDs expandidos;
exclusão de talento preservando PV e reconciliação dos bônus.

### 4. História e apresentação da IIFE

Destino sugerido: js/interface-historia.js. O primeiro candidato da IIFE é o
grupo camposHistoria/montarHistoria/preencherHistoria/tabelasPersonalidade/
sugerirFisico, hoje em interface.js:152–164.

Aqui a separação física exige uma fábrica de escopo restrito, como
ForjaHistoria.criar(dependencias). A lista final de dependências deve ser
conferida na fatia; não criar um contêiner genérico de serviços. Ler
detalhesFicha por getter, porque restauração e descansos substituem o objeto.
Preservar ForjaInterface como fachada e a ordem das chamadas de montagem/render.

Impressão também consome camposHistoria: compartilhar o mesmo mapa em vez de
copiar rótulos. Não extrair criaturas, impressão e mídia como subsistemas novos
na mesma entrega.

Regressões: editar após substituição de detalhesFicha grava no objeto atual;
render não sobrescreve campo focado; sugestões acrescentam texto; impressão
mantém rótulos/dados; imagens conservam validação/redução já existentes.

### 5. Reavaliar inventário antes de projetar sua API

Não executar essa extração automaticamente. Há código complementar em
app.js:729–1125 e :2314–2340, e interface.js:128–140, além dos kits.
atualizarInventario recalcula, renderiza e salva; renderInventario também
atualiza outros aspectos da sessão. Consumo e venda substituem arrays;
ultimoUsoItem é estado privado da IIFE. Regras de carga/moedas ficam nos
módulos puros existentes.

Após as primeiras fatias, mapear leitura/mutação e propor uma API específica
com getters para estado atual. Testar equipar/tirar/empunhar/guardar, CA/PV,
consumo e desfazer, venda, carga, moedas, ataques vinculados e restauração.
É aceitável encerrar a série antes dessa fase se a fronteira continuar instável.

## Ordem de carregamento e riscos transversais

Conservar dados → catálogo → regras/campanha/sessão/criaturas/estado/coleção →
novos scripts de UI declarativos → app.js → interface.js. Cada extração deve
definir sua posição exata no HTML; a fábrica de história precisa existir antes
de interface.js, sem montar DOM na avaliação.

Não acrescentar async, defer ou type=module como consequência da reorganização.
A ordem de window.onload permanece: opções/listeners; campos e listas;
ForjaInterface.iniciar; restaurarEstado; renderizar; abrirHubInicial.

| Risco | Controle |
|---|---|
| Handler deixar de existir globalmente | Testes de integração e HTML mantido com mesmos nomes |
| Código duplicado no arquivo antigo e novo | Revisar transferência e unicidade das declarações |
| Captura de estado obsoleto | Getters apenas onde objetos são substituídos |
| Mudança acidental de salvamento/recálculo | Fixtures de PV, inventário, história, migração e backups |
| JS novo não servido ou fora dos checks | Arquivo flat em js/, referência HTML e startup local |
| Reduzir linhas mascarando complexidade | Medir responsabilidade e regressões, sem minificação/reformatação |

## Evidência inicial na pasta permanente

Instalação congelada Yarn aprovada. npm test: 101 aprovados, 1 skip de symlink
Windows, 0 falhas. npm run check e check:rules aprovados. Lint: zero erros e
85 avisos, como na origem. A validação Chromium desta cópia é registrada no
documento de transferência; os testes anteriores do toolkit não são tratados
como execução numa pasta diferente.

As limitações de shutdown automático do Playwright no sandbox Windows,
discovery do desktop e CI remoto continuam documentadas no setup. No ambiente
restrito, iniciar o servidor oficial em outro terminal e reutilizá-lo nos testes.

## Decisão para iniciar código

### Resultado do piloto em 21/10/2026

Bloco transferido literalmente, preservando funções globais e carregamento
clássico antes de app.js. Dois testes DOM aprovados antes e depois da extração;
103 testes Node aprovados, 1 skip Windows, check de 24 scripts, três regras
locais aprovadas, lint com 0 erros/85 avisos e 12/12 cenários Chromium (34,0 s).
Revisão independente somente leitura concluída sem pendências após fortalecer
a conservação de localStorage na recusa de importação. Evidências e limite do
diálogo modal registrados em [qualidade](../quality.md). Sem push ou merge.

O desenho recomendado é **piloto de notificações primeiro**, preservando API
global e comportamento, seguido de revisão antes de ampliar as extrações.
O piloto foi aprovado explicitamente e implementado nesta continuidade.
A aprovação não libera as demais fatias ou mudanças de produto.
