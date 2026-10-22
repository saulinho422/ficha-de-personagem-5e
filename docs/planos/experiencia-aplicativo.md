# Revisão da experiência de aplicativo

Escopo autorizado em 21/10/2026: comentários de navegador 1–38 e experiência
mobile própria, sem APK, push ou merge. Branch `codex/mobile-app-redesign`.

## Aceitação e conservação

- Inventário compacto com compra e gestão separadas; carteira, carga, mãos,
  equipamento e transações no gerenciador. Compra debita saldo; falha não muta.
- PV atuais e temporários editáveis na ficha, aceitando inteiro ou `+N`/`-N`,
  com limites, regras de dano/cura, teclado e conservação na recarga.
- Criação com seis rolagens 4d6 individuais, distribuição por seleção,
  conjunto padrão distribuível e compra de 27 pontos com controles +/−.
  Não oferecer nova rolagem após completar a série da personagem.
- PV por nível: máximo no primeiro; escolha de média/rolagem nos demais,
  antes de gerar. Fichas antigas conservam ganhos e PV atuais.
- Riqueza rolada pelo jogador, uma confirmação, catálogo e kit com alternativas.
- Seletores pesquisáveis acessíveis; proficiências com lista fechada validada.
- Toast suave e feedback de ações; correção de texto comprovadamente corrompido.
- História com retrato opcional na criação/aparência/cabeçalho; símbolo em
  organizações; sugestões e criaturas organizadas. Campos removidos da UI
  continuam conservados nos dados e na exportação.
- Conjuração e revisão final estruturadas; lixeira no cabeçalho do hub;
  confirmações para novo personagem e backup; importação e nível organizados.
- Mobile com navegação, sheets e alvos próprios; desktop preservado.
- Animações locais autorizadas pelo usuário após pesquisa do Swup: sem
  substituição de documento, perda de listeners, recarga ou mudança de URL.

Fonte de regras: PDF fornecido, pp.12–15 e 145 (numeração impressa), confrontado
com contratos existentes de 2014. Não alterar kits por ambiguidade de tradução
sem evidência suficiente; registrar divergências separadamente.

## Validação

Testes de regras/DOM para operações e conservação; Chromium para criação,
inventário, PV, seletores, imagens, hub, teclado, mobile e impressão. Executar
check, check:rules, lint, test e test:e2e. Revisão independente somente leitura
após integração. Evidências finais em docs/quality.md; decisões em design e
IMPLEMENTACAO, sem transformar este plano temporário em contrato permanente.

Resultado: grupos de aceitação implementados; revisões de integração
resolvidas e registradas em quality.md. Verificação final: 133 testes Node
aprovados, um skip Windows e 24 cenários Chromium aprovados. Prévia local
mantida em 127.0.0.1:8765. Sem push, deploy ou merge.
