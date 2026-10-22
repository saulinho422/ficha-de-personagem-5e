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
- `js/notificacoes.js`: toast sob demanda, texto seguro e temporizador de 3500 ms;
  script clássico antes de app.js, mantendo mostrarToast/fecharToast globais.
- `js/interface.js`: assistente, hub de personagens, ações de sessão, história, magias e impressão.
- `js/criacao-regras.js` e `js/criacao.js`: rolagens individuais, distribuição,
  compra de pontos, escolhas de PV e confirmação da riqueza inicial.
- `js/seletores.js`: diálogos pesquisáveis, conservando controles como fonte de valores.
- `js/vitais.js`: edição de PV em linha com validação e operações com sinal.
- `js/historia.js` e `js/midia.js`: grupos de história, retrato e símbolo com limite de imagem.
- `js/transicoes.js`: animações locais sem substituição de DOM ou histórico.
- `app-shell.css`: sistema visual, componentes personalizados e navegação mobile em formato de aplicativo.
- `dados/`: 12 classes e 41 subclasses/conclaves, 42 talentos, 361 magias/845 vínculos, 13 tabelas de antecedentes, 31 criaturas e tabelas de aventura.
- `scripts/extrair_*.py`: extração reproduzível a partir do PDF fornecido, que não é distribuído no repositório.

## Dados e recuperação

A chave antiga `forjaPersonagens.ficha.v2` permanece intacta. A chave atual é `forjaPersonagens.ficha.v3`; uma gravação conserva o documento válido anterior em `.backup`. Erros de leitura ou armazenamento exibem opções de recuperar ou exportar os dados. Equipamento guardado é independente do equipamento em uso.

A coleção usa `forjaPersonagens.colecao.v1`. Excluir move a ficha à lixeira. Importar um ID existente cria uma cópia; não substitui a ficha existente. O validador recusa perfil de regras, IDs, equipamentos ou progressões forjadas antes da gravação.

Os formatos e chaves mantêm suas versões. `detalhes.escolhas` conserva o mapa
de índices de atributos por método, a confirmação de 4d6, os dados de riqueza
e o marcador de primeira criação. A primeira geração inicia com PV completos;
editar ou restaurar ficha existente conserva dano. `ganhosPV` registra o dado
antes de CON por classe e nível; o modal usa uma cópia até confirmar. Fichas
antigas sem ganhos explícitos mantêm a média anterior.

Tesouro, anotações adicionais, divindade, planos e estilo de vida ficam ocultos
na UI e conservados no JSON. Imagens são reduzidas para WebP antes de salvar.
Compras verificam saldo antes de inserir itens e registram a transação.

## Fontes e reconciliação

O catálogo registra as páginas do PDF fornecido. Os dados do Patrulheiro seguem exclusivamente a variante revisada. Variantes e conteúdo próprio permanecem identificados.

A descrição de **Falar com Plantas** na página 246 repete o cabeçalho de Falar com Animais. O catálogo usa círculo 3, transmutação, sem ritual, conforme as listas do próprio PDF e a regra oficial de 2014; a divergência fica registrada na entrada da magia.

A revisão de criação conferiu atributos/PV nas pp.12–15 e riqueza na p.145
(numeração impressa). Foram substituídos 111 marcadores privados U+F0B7 por
bullets Unicode; extratores normalizam esse caractere. As diferenças de
tradução dos nomes de pacotes não autorizam substituir silenciosamente os
kits canônicos existentes.

## Verificação

```sh
corepack yarn install --frozen-lockfile
corepack yarn playwright install chromium
corepack yarn verify:all
```

Os testes cobrem regras, persistência, DOM, servidor e fluxos Chromium. A referência de comandos,
lint gradual e limites está em [quality.md](quality.md); resultados efetivamente
executados estão em [setup.md](setup.md). O workflow publica `playwright-report`
e `test-results` por 14 dias, inclusive em falhas. A matriz detalhada está em
[COBERTURA.md](COBERTURA.md).

O servidor de desenvolvimento fica em `scripts/servidor.cjs`: GET/HEAD,
loopback, arquivos públicos explicitamente permitidos e raiz confinada após
resolver links/junctions. Não é servidor de produção. `npm start` e Playwright
usam a mesma entrada; não há migração de stack nem alteração de dados salvos.
