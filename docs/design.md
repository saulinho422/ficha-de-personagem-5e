# Design existente

Este documento registra a estrutura visual da aplicação. O CSS base está em
`style.css`; `app-shell.css` aplica os tokens, a hierarquia e a navegação de
celular. A revisão de 21/10/2026 usa as orientações de layout e interface
operacional da [Impeccable](https://github.com/pbakaus/impeccable), preservando
papel, vinho, dados, fluxos e o perfil de regras existente.

## Linguagem visual

Papel claro, vinho e detalhes dourados associam a ficha ao tema de fantasia. Cinzel com fallback serifado aparece em títulos; Roboto com fallback sem serifa compõe o texto base. A disponibilidade das fontes deve ser considerada ao conferir a renderização.

Tokens definidos em `:root` de `app-shell.css`:

| Token | Valor | Papel atual |
| --- | --- | --- |
| `--forja-vinho` | `#7f1d2d` | Marca, bordas e estados selecionados |
| `--forja-vinho-escuro` | `#4f101d` | Títulos e superfícies de navegação |
| `--forja-vinho-claro` | `#a73d4e` | Gradientes e foco de campos |
| `--forja-ouro` | `#c7943e` | Acentos decorativos |
| `--forja-tinta` | `#241f1d` | Texto principal |
| `--forja-muted` | `#665c55` | Texto secundário e placeholders |
| `--forja-papel` | `#fffdf9` | Cartões |
| `--forja-fundo` | `#f4efe8` | Fundo |
| `--forja-linha` | `#e5dbcf` | Separadores e bordas |
| `--forja-sombra` | `0 8px 24px rgba(62, 36, 28, .06)` | Elevação discreta |
| `--forja-raio` | `12px` | Arredondamento compartilhado |
| `--forja-espaco-campo` / `grupo` / `secao` | `8px` / `16px` / `32px` | Escala de espaçamento |
| `--forja-largura` | `1320px` | Limite da ficha e barra desktop |

Há valores específicos fora dos tokens: cartões, diálogos, campos e navegação usam raios e espaçamentos próprios. A tabela descreve o contrato atual, sem pressupor que todo estilo já esteja centralizado.

## Estrutura responsiva

| Largura | Composição da ficha |
| --- | --- |
| Acima de 1100px | Painel com máximo de 1320px e grade principal de três colunas. |
| De 761px até 1100px | Grade de duas colunas; a coluna direita ocupa a linha seguinte em duas colunas. |
| Até 760px | Fluxo vertical: coluna do meio, esquerda e direita; cabeçalho fixo ao rolar e navegação inferior. |

No celular, Ficha, História, Magias e Heróis formam a navegação do aplicativo web. A barra desktop e as abas ficam ocultas; o hub tem apresentação própria e não exibe essas barras. `safe-area-inset-*` reserva espaço para as áreas seguras do dispositivo. Diálogos aparecem junto à borda inferior e o resumo de combate permanece visível ao rolar.

O hub usa cartões em grade no desktop e uma coluna com retrato lateral no celular. Impressão é um fluxo separado da navegação em tela; seleções de páginas e quebras A4 têm cobertura descrita em [COBERTURA.md](COBERTURA.md).

## Hierarquia e criação guiada

A criação tem largura máxima de 1100px. Acima de 900px, as nove etapas ficam
em uma coluna lateral e a tarefa atual ocupa a área principal. Nas larguras
menores, a sequência vira uma faixa horizontal rolável; ao avançar, a etapa
atual recebe `aria-current="step"` e permanece visível nessa faixa. Etapas
anteriores mantêm o estado visual de progresso.

A barra desktop e as abas usam separadores, sem superfícies elevadas repetidas.
Acentos vinho distinguem ações, seleção e PV; atributos e combate usam
superfícies neutras. Traços ficam em uma lista com separadores. História,
magias, inventário e diálogos compartilham campos, foco e espaçamento.
Títulos temáticos mantêm Cinzel; controles e valores de consulta usam Roboto.

O seletor de situação da percepção fica oculto; o valor salvo é conservado.
No hub móvel, ações ficam abaixo dos dados, com alvos de pelo menos 44px e
quebra de nomes longos. A lixeira fica no cabeçalho. Novo personagem e backup
explicam a ação antes de confirmar.

Seletores abrem uma lista pesquisável em diálogo, com teclado e retorno do
foco. PV são editados na própria ficha; catálogo de compras e gestão do
inventário usam diálogos separados. História agrupa aparência e retrato,
personalidade, narrativa e aliados com símbolo da organização.

As transições usam animações locais de 200 ms, canceláveis, com respeito a
`prefers-reduced-motion`. O usuário escolheu essa abordagem após avaliar o
Swup: não há navegação HTML, recarga ou substituição dos controles. O slide
fica contido na superfície da ficha, criação ou hub, sem gerar rolagem lateral.

## Acessibilidade: evidência e verificação

Implementado no código:

- Abas com `tablist`, `tab`, `tabpanel`, seleção e navegação por setas, Home e End.
- Diálogo nativo com título associado e restauração do foco; modais existentes recebem semântica de diálogo e foco inicial.
- Nomes acessíveis em navegação e vários botões de ícone; estados `aria-pressed` em marcadores de morte e equipamento.
- Mensagens com região de status e `aria-live="polite"`; alerta de salvamento com `role="alert"`.
- Foco visual em campos, estados desabilitados e redução de animações conforme `prefers-reduced-motion`.
- Controles móveis com alturas explícitas, variando conforme o componente; isso não garante um tamanho mínimo único para toda a aplicação.

Critérios que exigem verificação, sem alegação de conformidade integral: percorrer todos os fluxos por teclado, conferir nomes dos campos e leitura por leitor de tela, medir contraste das combinações efetivamente renderizadas, ampliar texto/zoom e conferir sobreposição das barras móveis. A presença de ARIA ou CSS não substitui esses testes.

A referência inicial inclui cenários de teclado, foco, abas, diálogos e navegação móvel; a execução e seus limites pertencem à [documentação de qualidade](quality.md). Alterações visuais devem ser conferidas nos dois pontos de quebra, no desktop e na impressão.
