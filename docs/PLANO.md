# Mega atualização da Forja de Personagens — D&D 5e

Diagnóstico do site e plano de implementação • 8 de outubro de 2026

Projeto: **saulinho422/ficha-de-personagem-5e**

[Site publicado](https://saulinho422.github.io/ficha-de-personagem-5e/) • [Repositório](https://github.com/saulinho422/ficha-de-personagem-5e) • [Snapshot analisado](https://github.com/saulinho422/ficha-de-personagem-5e/tree/94e528bb13f697629673973e938cd9e1b55e8c97)

## 1. Resultado da comparação

O site tem uma base aproveitável de criação, atributos, perícias, inventário, ataques e talentos. Para cumprir a proposta de criação rápida e semiautomática, precisa completar duas páginas inteiras da ficha e transformar as informações do banco de dados em regras efetivamente aplicadas ao personagem.

Hoje, várias características aparecem como texto, mas não produzem seus efeitos. Também há cálculos que desconsideram a origem das proficiências, o equipamento realmente usado e escolhas específicas de raça ou classe. Assim, preencher mais campos sem corrigir o motor manteria fichas incompletas ou incoerentes.

A atualização proposta tem quatro resultados principais:

- **Criar:** conduzir todas as escolhas obrigatórias, oferecer opções válidas e preencher automaticamente os resultados.
- **Evoluir:** aplicar características, recursos, magias e escolhas de cada nível, preservando a ficha existente.
- **Jogar:** registrar PV, recursos, descansos, condições, equipamentos usados e espaços de magia.
- **Levar a ficha:** salvar vários personagens, importar/exportar e imprimir as três páginas completas, com anexos quando necessário.

Este documento é o levantamento anterior à implementação. O código do repositório não foi alterado nesta etapa.

## 2. Fontes, método e decisões de regras

### 2.1. Material considerado

| Fonte | Conteúdo e uso na análise |
| --- | --- |
| Imagem 1 — `image(20261008-191549).png` | Campos da página principal: identidade, atributos, perícias, combate, equipamento, personalidade e características. |
| Imagem 2 — `image(20261008-191602).png` | Campos físicos, aparência, aliados, organizações, história, características adicionais e tesouro. |
| Imagem 3 — `image(20261008-191614).png` | Cabeçalho de conjuração, truques, magias dos círculos 1–9, preparação e espaços totais/usados. |
| `Guia - Livro do Jogador(1).pdf` | Livro com 317 páginas no arquivo; regras de criação, raças, classes, antecedentes, equipamentos, talentos, testes, combate, conjuração e apêndices. |
| Código em `main` | Os seis arquivos do snapshot `94e528bb13f697629673973e938cd9e1b55e8c97`, lidos integralmente. |
| Site publicado | Navegação e reprodução de comportamentos em uma ficha de auditoria no navegador. |

O texto de todo o PDF foi extraído e organizado por página. As páginas com pouca ou nenhuma camada textual também foram conferidas visualmente: são capas, ilustrações, divisórias e as três fichas finais. A comparação funcional se concentra nas regras que afetam a criação, evolução e manutenção da ficha; o mapa do capítulo 5 registra a aplicação de cada parte do livro.

**Paginação:** as referências abaixo usam o número impresso no livro. Neste arquivo, a página do visualizador é normalmente o número impresso mais 1. Exemplo: criação na página impressa 11 corresponde à página 12 do PDF.

### 2.2. Regras escolhidas para o projeto

A base do material é a **5e de 2014**, com uma diferença importante: as páginas 115–121 contêm o **Patrulheiro Revisado**, com os Conclaves da Besta, do Caçador e do Rastreador Subterrâneo. Isso corresponde à revisão de Unearthed Arcana, e não ao patrulheiro original de 2014.

**Decisão do usuário: seguir o PDF.** Portanto, o patrulheiro revisado e os seus três conclaves entram no escopo principal. Os nomes e as regras atuais de Caçador/Mestre das Feras precisam ser reconciliados com essa fonte. Não acrescentar automaticamente as regras de 2024 nem um segundo perfil de patrulheiro original.

Referência primária de confirmação: [Wizards of the Coast — The Ranger, Revised](https://media.wizards.com/2016/dnd/downloads/UA_RevisedRanger.pdf). Para divergências entre a tradução e esse documento, conservar o perfil escolhido, registrar a divergência e resolver o dado antes de codificá-lo. Exemplo: a tabela de magias do Rastreador Subterrâneo do PDF deve ser conferida como uma unidade, sem misturar níveis de versões distintas.

Multiclasse, talentos, humano variante e sobrecarga variante são opções do livro. Devem ter identificação e ativação próprias. Conteúdo personalizado já salvo deve continuar utilizável e ser identificado como personalizado.

### 2.3. Evidência e limites de verificação

- **Reproduzido:** comportamento observado diretamente no site publicado.
- **Código:** comportamento ou ausência identificados no snapshot, sem simulação de todas as combinações de personagens.
- **Requisito:** função necessária para atender às fichas e ao livro, ainda por implementar.

Os testes de navegação cobriram a criação de uma ficha, abas, perícia, recarga, inventário e prévia de ataque. Não foi executada uma bateria completa de todas as classes, níveis, celulares ou leitores de tela. Esses itens aparecem como critérios de aceitação; não são apresentados como verificações já aprovadas. O repositório não contém suíte de testes nem configuração de integração contínua nesse snapshot.

## 3. O que já existe e pode ser aproveitado

| Área | Inventário atual | Alcance real |
| --- | --- | --- |
| Interface | Assistente de 5 etapas e 3 abas | A página principal funciona parcialmente; História e Conjuração são títulos sem conteúdo. |
| Raças | 9 raças e 9 sub-raças | Bônus fixos de atributos e descrições; várias escolhas e efeitos não se aplicam. |
| Classes | 12 classes; 40 nomes de subclasses | Dados de vida e proficiências básicas; falta progressão funcional de características e recursos. |
| Antecedentes | 14 registros | Os 13 antecedentes básicos e um registro extra de Assassino; há uma segunda lista duplicada. |
| Perícias | 18 perícias e 6 salvaguardas | Cálculo básico de atributo + proficiência; sem especialização ou composição completa das fontes. |
| Talentos | 40 registros | Seleção, alguns bônus e resumos; faltam dois talentos e diversos efeitos/requisitos. |
| Equipamento | 37 armas; 12 armaduras + escudo; 99 itens de aventura; 7 pacotes | Quantidade, peso e itens personalizados; sem equipamento inicial integrado, carteira ou estado equipado. |
| Ataques | Cadastro e prévia | Bônus e dano básicos; proficiência incompleta e poucas condições de uso. |
| Progressão | Alertas de incremento de atributo/talento | Reconhece os níveis extras de guerreiro e ladino; não implementa a evolução completa. |
| Persistência | Uma ficha em `localStorage` | Sem coleção de personagens, exportação, backup seguro ou recursos de sessão. |

O banco usa nomes visíveis como chaves e contém informações repetidas de proficiências. A atualização deve aproveitar os registros existentes, mas acrescentar identificadores estáveis, referências de origem e efeitos estruturados.

## 4. Comparação campo a campo das três fichas

Legenda: **parcial** = existe, mas precisa de dados, regras ou edição; **ausente** = não há função correspondente; **existente** = base disponível, ainda sujeita às correções deste plano.

### 4.1. Página 1 — identidade, atributos e combate

| Campo da ficha enviada | Situação atual | Implementação necessária |
| --- | --- | --- |
| Nome do personagem | Existente na criação | Editar depois, preservar nas três páginas e nos arquivos exportados. |
| Nome do jogador | Ausente | Campo independente do nome do personagem. |
| Classe, nível e subclasse | Parcial | Escolha da subclasse no nível correto; progressão completa e suporte à opção multiclasse. |
| Raça e sub-raça | Parcial | Escolhas obrigatórias, bônus flexíveis, sentidos, tamanho e efeitos raciais. |
| Antecedente e alinhamento | Existentes na criação | Edição posterior e opções/variações de antecedentes. |
| Pontos de experiência | Ausentes | XP e tabela de níveis; alternativa de evolução por marco. |
| Seis atributos e modificadores | Parcial | Métodos de geração, camadas de bônus, limites corretos e alterações reversíveis. |
| Inspiração | Ausente | Marcador de concessão/uso; não acumular várias inspirações. |
| Bônus de proficiência | Existente | Manter cálculo pelo nível total e exibir origem na memória do cálculo. |
| Seis testes de resistência | Parcial | Todas as fontes, efeitos condicionais, edição justificada e bônus de classe. |
| Dezoito perícias | Parcial | Fontes raciais, de classe, antecedentes e talentos; especialização; duplicidades resolvidas. |
| Percepção passiva | Parcial, incorreta | Usar todos os modificadores do teste; aplicar vantagem/desvantagem quando pertinente. |
| Outras proficiências e idiomas | Parcial | Escolhas em grupos restritos, proficiências sem duplicação e reflexo nos cálculos. |
| Classe de armadura | Parcial, incorreta | Equipamento usado, fórmulas alternativas válidas, escudo, estilos e efeitos. |
| Iniciativa e deslocamento | Parcial | Sub-raça, classe, talentos, condições e bônus condicionais. |
| PV máximos e atuais | Parcial | PV atuais editáveis; dano/cura; ganho de PV por nível; não curar por recalcular. |
| PV temporários | Ausentes | Valor independente, absorção do dano e escolha entre valores sem somá-los. |
| Dados de vida totais/restantes | Ausentes | Reserva por classe e consumo/recuperação em descansos. |
| Testes contra a morte | Ausentes | Sucessos/falhas, resultados especiais e estado estável. |
| Ataques e conjuração | Parcial | Armas, ataques desarmados, mágicos e características, com modos de uso corretos. |
| Equipamento | Parcial | Kit inicial, itens equipados, moedas, consumíveis, munição e efeitos de carga. |
| PC, PP, PE, PO e PL | Ausentes | Carteira com conversões, peso de moedas e compras opcionais. |
| Traços de personalidade | Ausentes | Dois traços sugeridos pelo antecedente e edição livre. |
| Ideais, vínculos e defeitos | Ausentes | Seleção assistida/aleatória e edição livre. |
| Características e habilidades | Parcial | Características de todas as classes/subclasses por nível, escolhas e recursos de uso. |

### 4.2. Página 2 — história e apresentação

A aba atual é apenas um título. Todos os grupos abaixo estão por implementar.

| Campo da ficha enviada | Resultado esperado |
| --- | --- |
| Nome | Compartilhar a identidade com a página principal. |
| Idade, altura e peso | Campos editáveis e sugestões/tabelas raciais, com unidades claras. |
| Olhos, pele e cabelo | Campos descritivos persistentes. |
| Aparência | Texto e retrato opcional, com substituição e remoção da imagem. |
| Aliados e organizações | Lista com nome, descrição e símbolo opcional; preservar registros múltiplos. |
| História do personagem | Editor simples, texto livre e perguntas orientadoras opcionais. |
| Características e habilidades adicionais | Exibir continuação das características mecânicas e notas próprias sem duplicar efeitos. |
| Tesouro | Relacionar bens/riquezas ao inventário e oferecer notas narrativas sem contar o mesmo valor duas vezes. |

A história não precisa ser inventada automaticamente. O ganho de agilidade vem de sugestões, tabelas do antecedente, preenchimento consistente e liberdade para editar.

### 4.3. Página 3 — conjuração

A aba atual também é apenas um título. Falta o subsistema de magias, e não somente uma lista de nomes.

| Campo da ficha enviada | Resultado esperado |
| --- | --- |
| Classe de conjuração | Blocos separados para fontes com regras ou atributos distintos. |
| Habilidade de conjuração | INT, SAB ou CAR conforme classe, raça, talento ou característica. |
| CD para evitar magia | `8 + bônus de proficiência + modificador de conjuração`, com modificadores identificados. |
| Bônus de ataque mágico | `bônus de proficiência + modificador de conjuração`, com modificadores identificados. |
| Truques | Seleção válida, quantidade por fonte e escalonamento apropriado. |
| Magias de círculos 1–9 | Catálogo, filtros, descrição funcional e associação à fonte. |
| Indicador de preparada | Distinguir preparada, conhecida, no grimório e sempre preparada. |
| Espaços totais/usados | Progressão por classe, consumo e recuperação; reserva de pacto separada. |
| Anotações de conjuração | Concentração, componentes, rituais, usos limitados e lançamento em círculo maior. |

Classes sem conjuração devem mostrar uma orientação adequada, mantendo magias raciais ou de talentos quando existirem. Ter uma magia de uso racial limitado não concede, por si só, espaços de conjuração de uma classe.

## 5. Cobertura de todo o livro

| Parte do PDF — páginas impressas | Aplicação no site e no plano |
| --- | --- |
| Prefácio e introdução — 4–7 | Explicação curta de criação e termos; decisões do jogador e do mestre continuam explícitas. |
| Criação — 11–15 | Assistente completo; valores padrão/compra/rolagem; equipamento; revisão; XP; evolução além do nível 1. |
| Raças — 17–43 | Nove raças, sub-raças, humano variante, escolhas flexíveis, sentidos, deslocamento, proficiências e poderes raciais. |
| Classes — 45–122 | Doze progressões de níveis 1–20, suas subclasses, recursos, escolhas e regras de conjuração; patrulheiro revisado do PDF. |
| Personalidades e antecedentes — 123–143 | Dados físicos, personalidade, inspiração, treze antecedentes básicos, variantes, duplicidades e antecedentes personalizados. |
| Equipamento — 145–163 | Kits iniciais ou riqueza inicial, armaduras, armas, ferramentas, itens, pacotes, montarias/veículos, bens, despesas e bugigangas. |
| Personalização — 165–172 | Multiclasse opcional, requisitos, proficiências recebidas, conjuração combinada e os 42 talentos. |
| Utilização de habilidades — 175–181 | Modificadores, proficiência/especialização, testes passivos, vantagem/desvantagem e salvaguardas. |
| Aventuras — 183–189 | Carga, movimento, sentidos, descansos, atividades e despesas registráveis. Ferramentas de campanha não são pré-requisito da ficha. |
| Combate — 191–200 | Iniciativa, ataques, modos de arma, resistências, dano/cura, PV temporários, morte, concentração e lembretes contextuais. |
| Conjuração — 203–207 | Conhecidas/preparadas, espaços, atributo/CD/ataque, componentes, rituais, concentração e tempo de conjuração. |
| Listas e descrições de magias — 209–290 | Catálogo integral da fonte, listas por classe, metadados e vínculos com características; efeitos condicionais controlados pelo jogador. |
| Condições — 291–293 | Marcadores, explicação e aplicação dos efeitos calculáveis, incluindo exaustão e velocidade. |
| Deuses — 294–300 | Seleção ou texto livre de divindade/panteão e referência contextual, especialmente para clérigos e acólitos. |
| Planos — 301–303 | Referência narrativa opcional para origem, patrono e história; não exige simulador de planos. |
| Criaturas — 305–312 | Estatísticas úteis a familiares, formas selvagens e companheiros; filtros e registro personalizado para possibilidades fora do apêndice. |
| Leitura inspiradora — 313 | Referência narrativa opcional; não gera regra mecânica. |
| Fichas — 314–316 | Modelo dos campos, agrupamento das três páginas e verificação da exportação/impressão. |

O objetivo é cobrir todas as regras relevantes à ficha. Simular uma mesa inteira, conduzir uma campanha, criar chat ou exigir contas online não é necessário para essa atualização.

## 6. Defeitos e lacunas com evidência

Os números de linha pertencem ao snapshot analisado. As funções indicadas ajudam a localizar o problema mesmo após mudanças.

| ID | Constatação | Evidência e reprodução | Correção associada |
| --- | --- | --- | --- |
| B01 | História e Conjuração sem implementação | Reproduzido nas duas abas. `index.html`, linhas 271–272, contém apenas os títulos. | BIO01–BIO05; M01–M10. |
| B02 | Percepção passiva ignora proficiência | Elfo da floresta/mago nível 1: SAB 11 e proficiência marcada dão Percepção +2, mas passiva permanece 10. `atualizarPercepcaoEProficiencias`, linha 588. | F01–F02. |
| B03 | Perícia manual é perdida ao recarregar | Marcar Percepção e recarregar desmarca o campo. `aplicarPericiasDaClasse`, linha 1810, recompõe apenas classe/antecedente. | D04; F01. |
| B04 | Deslocamento da sub-raça ignorado | Elfo da floresta permanece com 9 m, em vez de 10,5 m. O dado correto existe no banco; `calcularCombate`, linha 738, usa a raça base. | R01; F04. |
| B05 | Proficiência racial não vale no ataque | A prévia de arco longo para o elfo/mago mostra sem proficiência e ataque +3; com DES 16 e proficiência +2, deveria ser +5. `personagemProficienteNaArma`, linha 1902, consulta a classe. | D04; I04; F07. |
| B06 | Item na mochila muda CA | Adicionar placas altera imediatamente CA de 13 para 18, sem seleção de equipamento usado. `atualizarClasseArmadura`, linha 1206. | I03; F03. |
| B07 | Recálculo restaura PV atuais | Código: `calcularCombate`, linhas 738–764, escreve PV atuais iguais aos máximos; não há estado persistente de dano. | D03; F05. |
| B08 | Subclasse exigida cedo demais | Reproduzido: mago precisa escolher escola ao criar nível 1, embora a escolha seja no nível 2. `carregarSubclasses`, linha 1385, não filtra por nível. | C05; L01. |
| B09 | Características de classe não são geradas | Código: `obterTracosAutomaticos`, linha 2125, reúne raça/sub-raça/antecedente; não inclui progressões de classe/subclasse. | L01–L05; CLS01–CLS12. |
| B10 | Bônus flexíveis/traços raciais ficam incompletos | Código: meio-elfo sem escolhas de +1 em dois atributos e duas perícias; Percepção do elfo e Intimidação do meio-orc não entram na composição das perícias. | R02; R04. |
| B11 | Nome de perícia do antecedente não corresponde ao catálogo | Código: Herói do Povo usa “Adestrar Animais”; a perícia cadastrada é “Lidar com Animais”. | D01; C07. |
| B12 | Escolhas de ferramentas usam grupos incorretos | Código: anão recebe três ferramentas listadas e ainda uma escolha ampla; bardo/monge usam categorias genéricas como proficiências e escolhas sem restrição suficiente. | R05; C08. |
| B13 | Talento removido não desfaz bônus | Código: bônus aumentam o atributo base; `excluirTracoAtual`, linha 2060, remove o traço sem reverter os efeitos. Edição por nome também interfere na identificação dos efeitos. | D03; L03; O01. |
| B14 | Talentos incompletos e pré-requisitos não validados | Código: 40 registros; faltam Combatente Montado e Maestria em Armadura Média. Há resumos com benefícios omitidos, requisito ausente de armadura pesada e bloqueio de repetição até para Adepto Elemental com elemento diferente. | O01–O02. |
| B15 | Capacidade de carga e pacotes incompletos | Código: peso “Variado” dos pacotes resulta em zero; conteúdo não é expandido. Faixas de carga não distinguem plenamente carregar de empurrar/arrastar/erguer. | I02; I06. |
| B16 | Limite de atributo sempre 20 | Código: `calcularAtributos`, linha 416, limita o resultado a 20; impede o resultado de FOR/CON do bárbaro nível 20. | D03; CLS01. |
| B17 | Patrulheiro atual não corresponde ao PDF escolhido | Banco lista Caçador/Mestre das Feras; o PDF tem três conclaves revisados e características distintas. | D02; CLS12. |
| B18 | Salvamento não cobre uma ficha jogável completa | Código: `salvarEstado`, linha 1231, usa uma única chave; sem PV de sessão, magias e história. JSON inválido é removido em `restaurarEstado`, linha 1263. | D06–D09. |

### 6.1. Dados que exigem reconciliação

Antes de aplicar regras, normalizar aliases de perícias, armas, ferramentas, antecedentes e talentos. Exemplos: “Adestrar Animais”/“Lidar com Animais”, “Clavas”/“Porrete” e “Bastões”/“Bordão”. Não resolver proficiência por tentativa de singularizar nomes visíveis.

O talento atualmente chamado **Mestre de Armas Pesadas (Heavy Armor Master)** corresponde a **Maestria em Armadura Pesada**, não a **Mestre de Armas Grandes (Great Weapon Master)**. São regras diferentes. A migração precisa preservar a identidade pelo conteúdo/alias conhecido, sem intercambiar os efeitos.

O registro de antecedente **Assassino** deve continuar disponível como conteúdo personalizado; não deve ser confundido com a subclasse de ladino nem contado como um dos treze antecedentes básicos. Consolidar a lista duplicada `antecedentosTradicionaisPHB`.

## 7. Backlog de implementação

**P0:** correções e fundações que tornam os dados confiáveis e evitam perda de ficha. **P1:** funções principais da mega atualização, necessárias à criação e ao uso completos. **P2:** opções avançadas ou enriquecimento previstos no livro; integrar depois da base, mantendo-os no plano.

Cada linha é uma unidade de trabalho com resultado verificável. As tabelas não são estimativas de esforço: cadastrar nomes não equivale a implementar seus efeitos.

### 7.1. Dados, motor de regras e persistência

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| D01 — P0 | Dar IDs estáveis aos registros; unificar aliases e bancos duplicados; estruturar referências do livro. | Renomear um rótulo não muda regra nem apaga uma seleção; aliases antigos migram para o mesmo ID. |
| D02 — P0 | Definir o perfil de regras escolhido: base 2014 com patrulheiro revisado do PDF; marcar conteúdo personalizado e opções ativadas. | Uma ficha indica a origem de suas regras; não recebe características de versões incompatíveis. |
| D03 — P0 | Separar atributos base, bônus raciais, incrementos, talentos, efeitos e limites. Separar valores derivados de recursos atuais. | Remover/reaplicar uma escolha recompõe a ficha sem acumular bônus; recalcular não cura nem gasta recursos. |
| D04 — P0 | Compor proficiências de raça, sub-raça, classe, subclasse, antecedente, talento e entrada manual, preservando cada fonte. | Perícias, armas, armaduras, ferramentas e idiomas usam a mesma composição e persistem após recarga. |
| D05 — P0 | Criar funções de cálculo independentes do DOM para atributos, testes, passivos, CA, PV, movimento, ataques e conjuração. | Alterar qualquer entrada recalcula apenas os valores pertinentes, com memória de origem consistente. |
| D06 — P0 | Criar estado com versão de esquema, identidade, escolhas, níveis, inventário, magias, história e recursos. | Salvar/reabrir preserva integralmente uma ficha nas três páginas. |
| D07 — P0 | Migrar `forjaPersonagens.ficha.v2`, conservando cópia do estado original e registros personalizados. | Uma ficha antiga migra sem perda silenciosa; ambiguidades tornam-se pendências identificadas. |
| D08 — P0 | Tratar falha de armazenamento, dados inválidos e recuperação; validar importações antes de substituir dados. | Erro não apaga a única cópia; o usuário recebe opção concreta de recuperar/exportar os dados disponíveis. |
| D09 — P1 | Manter coleção de personagens com criar, abrir, duplicar, renomear e excluir com recuperação/backup adequado. | Duas fichas com escolhas diferentes não compartilham inventário, magias ou recursos acidentalmente. |
| D10 — P1 | Importar/exportar JSON versionado e incluir backup completo opcional da coleção. | A ficha exportada/importada preserva escolhas e recursos; conteúdo inválido é recusado antes de gravar. |
| D11 — P0 | Validar integridade do catálogo: IDs, referências, escolhas, progressões, nomes de perícias e efeitos. | Nenhum item/classe/magia aponta para registro inexistente; divergências de fonte ficam registradas. |

### 7.2. Criação rápida e escolhas assistidas

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| C01 — P1 | Reorganizar o assistente por dependências: identidade/regras, raça/classe, atributos, antecedente, proficiências, kit, magias e revisão. | A revisão mostra todas as escolhas obrigatórias e não conclui uma ficha mecanicamente incompleta. |
| C02 — P1 | Oferecer conjunto padrão `15,14,13,12,10,8`, distribuído sem reutilizar valores além da multiplicidade disponível. | Cada valor é usado uma vez; bônus raciais aparecem em coluna separada. |
| C03 — P1 | Implementar compra de 27 pontos: 8–15 antes dos bônus, custos `0,1,2,3,4,5,7,9`. | Não permite saldo negativo nem valor base 16; recalcula custo ao trocar atributos. |
| C04 — P1 | Oferecer rolagem de 4d6 descartando o menor, seis vezes, e preenchimento manual editável. | Exibe os dados e o descarte; permite distribuir resultados sem perder o histórico escolhido. |
| C05 — P1 | Solicitar subclasse no nível certo e somente características disponíveis; processar escolhas de níveis anteriores ao criar acima de 1. | Mago nível 1 não exige escola; mago nível 2 exige; personagem criado no nível 10 recebe todas as pendências pertinentes. |
| C06 — P1 | Oferecer sugestões rápidas coerentes por classe, com opções visíveis e editáveis, e retomar rascunho. | O fluxo sugerido produz ficha válida; voltar uma etapa ou recarregar conserva o rascunho. |
| C07 — P0 | Resolver perícias duplicadas de antecedente e outras fontes conforme as regras, sem desperdiçar escolhas. | Um duplicado de antecedente abre escolha de substituição do mesmo tipo; não concede bônus em dobro automaticamente. |
| C08 — P0 | Restringir escolhas de idiomas, ferramentas e instrumentos ao grupo da fonte; separar alternativa de concessão fixa. | Anão escolhe uma das três ferramentas permitidas; bardo escolhe três instrumentos; monge escolhe ferramenta de artesão ou instrumento. |
| C09 — P1 | Incluir variantes de antecedentes: mercador de guilda, gladiador, espião, cavaleiro e pirata; antecedente personalizado. | Cada variante altera os campos previstos; personalizado oferece duas perícias e duas escolhas totais de ferramentas/idiomas. |
| C10 — P1 | Permitir editar identidade e refazer escolhas estruturais com prévia de mudanças e pendências afetadas. | Trocar classe/raça não mantém efeitos inválidos nem apaga história e itens próprios. |

### 7.3. Raças e sub-raças

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| R01 — P0 | Aplicar tamanho, deslocamento, sentidos e modificações de sub-raça, incluindo elfo da floresta. | Elfo da floresta tem 10,5 m antes de efeitos posteriores; tamanho e visão ficam visíveis na ficha. |
| R02 — P1 | Implementar meio-elfo: CAR +2, +1 em dois outros atributos distintos, duas perícias e idioma adicional. | Escolhas são exigidas, não incluem CAR para os dois +1 e aplicam seus efeitos em todas as abas. |
| R03 — P1 | Implementar humano padrão e humano variante como opções distintas; variante com dois +1, perícia e talento. | Variante só aparece quando ativado; respeita atributos distintos e pré-requisitos do talento. |
| R04 — P0 | Aplicar Percepção do elfo e Intimidação do meio-orc; integrar proficiências raciais em ataques e duplicidades. | Elfo é proficiente em Percepção sem marcação manual; arco longo racial inclui o bônus de proficiência. |
| R05 — P0 | Corrigir ferramentas do anão e seus efeitos de sub-raça, incluindo PV extras do anão da colina por nível. | Uma ferramenta escolhida; anão da colina nível 5 recebe +5 PV raciais, preservados na evolução. |
| R06 — P1 | Implementar ancestral dracônico: cor, resistência, tipo de dano, forma, teste-alvo, CD, dano por nível e uso/descanso. | Cor escolhida determina sopro correto; CD usa CON e proficiência; recurso se recupera pelo descanso previsto. |
| R07 — P1 | Integrar truques/magias raciais de alto elfo, drow, gnomo da floresta e tiefling, com atributo, nível e usos próprios. | Magias raciais surgem na página de conjuração sem criar espaços de classe indevidos. |
| R08 — P1 | Estruturar demais traços raciais: resistências, vantagens condicionais, sorte do halfling, tenacidade do meio-orc e efeitos semelhantes. | Os efeitos calculáveis funcionam; os condicionais mostram gatilho e controle de uso, sem presumir o contexto da mesa. |
| R09 — P2 | Oferecer sugestões físicas/etárias e tabelas de altura/peso do livro, mantendo entrada livre. | Rolagem/sugestão preenche os campos da página 2 e pode ser editada sem afetar regras indevidamente. |

### 7.4. Página principal, combate e recursos

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| F01 — P0 | Calcular perícias/salvaguardas com fontes, especialização, bônus parciais de classe e efeitos, sem somar proficiência repetida. | Especialização duplica o bônus; generalista do bardo usa metade arredondada para baixo onde cabível; fontes repetidas não triplicam o teste. |
| F02 — P0 | Calcular passivos a partir do teste completo, incluindo Observador e vantagem/desvantagem aplicável. | SAB 11 + proficiência 2 dá passiva 12; vantagem dá 17; desvantagem dá 7, antes de outros efeitos. |
| F03 — P0 | Implementar fórmulas de CA válidas e não cumulativas: armadura usada, defesa sem armadura, resiliência dracônica e efeitos. | Placas na mochila não mudam CA; monge com escudo perde sua fórmula; alternativas não são somadas. |
| F04 — P0 | Integrar iniciativa e movimento a raça/sub-raça, classe, talentos, armadura, carga e condições. | Alerta, Mobilidade e características de classe alteram somente o que concedem; registrar vantagem de iniciativa separadamente do bônus numérico. |
| F05 — P0 | Separar PV máximos/atuais/temporários; dano, cura, ganho de nível, bônus de CON e opção média/rolagem de PV. | Recarga e mudança de inventário não curam; PV temporários absorvem primeiro; cura não ultrapassa o máximo. |
| F06 — P1 | Registrar dados de vida por classe e descansos curtos/longos, com recuperação de recursos conforme origem. | Descanso curto consome os dados escolhidos; longo recupera os recursos corretos e a quantidade de dados prevista. |
| F07 — P0 | Calcular ataques com proficiência de todas as fontes; atributo/modo, propriedades e efeitos condicionais. | Elfo/mago com arco longo e DES 16 tem ataque +5; arma não proficiente não inclui +2. |
| F08 — P1 | Implementar ataques desarmados, duas armas, versátil/arremesso, estilos, dano fixo e características como furtivo/fúria. | Zarabatana com dano base fixo não vira zero; ataque secundário respeita regra de modificador; modos mostram alcance e requisitos. |
| F09 — P1 | Acrescentar testes contra a morte e estabilidade, com 1 natural, 20 natural, dano a 0 PV e regras de reinício. | Três falhas indicam morte; 1 natural conta duas falhas; 20 natural restaura 1 PV; curar/estabilizar reinicia os marcadores conforme a regra. |
| F10 — P1 | Completar identidade, nome do jogador, XP/marcos, inspiração e campos de personalidade da página 1. | Os campos persistem e imprimem; tabela de XP controla a indicação de nível sem impor XP a quem usa marcos. |
| F11 — P1 | Exibir resistências, imunidades, sentidos, condições, exaustão e ajustes manuais com origem/justificativa. | Efeitos ativos alteram valores pertinentes; resistência duplicada não se soma; tirar uma condição restaura o cálculo anterior. |

### 7.5. Equipamento, dinheiro e inventário

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| I01 — P1 | Implementar escolhas de equipamento inicial da classe + antecedente, ou riqueza inicial conforme a alternativa escolhida. | Escolhas “a ou b” não concedem ambos; trocar por riqueza não duplica kit; material do antecedente é tratado conforme a opção usada. |
| I02 — P0 | Expandir pacotes em conteúdos, quantidades e pesos; permitir agrupamento visual sem dupla contagem. | Pacote do explorador adiciona seus itens; total de peso corresponde aos conteúdos e não a zero. |
| I03 — P0 | Adicionar estado equipado: armadura, escudo, mãos, arma, foco e itens com efeito; conservar itens guardados. | Usar/tirar armadura muda CA; guardar mantém item na mochila; combinações de mãos inválidas geram pendência clara. |
| I04 — P0 | Integrar proficiências e propriedades a equipamento/ataques; identificar armadura sem proficiência e restrições pertinentes. | Penalidades e impedimento de conjuração por armadura sem proficiência são apresentados; bônus racial/talento funciona no ataque. |
| I05 — P1 | Implementar carteira PC/PP/PE/PO/PL, conversões exatas e opção de comprar/vender sem inventar preço de revenda. | 1 PO = 10 PP = 100 PC; PE = 5 PP; 1 PL = 10 PO; movimentação não usa arredondamento monetário incorreto. |
| I06 — P1 | Calcular peso, moedas, capacidade por FOR/tamanho e empurrar/arrastar/erguer; opção de sobrecarga variante. | FOR 10 tem carga padrão de 75 kg; 150 kg corresponde ao limite de empurrar/arrastar/erguer, com regras de movimento aplicáveis. |
| I07 — P1 | Controlar consumíveis, munição, cargas e quantidades, com uso explícito e desfazer. | Usar poção/munição reduz a quantidade selecionada, não exclui item distinto, e persiste depois de recarga. |
| I08 — P1 | Completar catálogos de ferramentas, instrumentos, montarias/veículos e bens; manter itens personalizados com campos mecânicos. | Preço/peso/tipo são estruturados; ferramenta é escolhível como proficiência; item próprio continua editável. |
| I09 — P2 | Oferecer despesas/estilo de vida, tesouros e bugigangas com sugestões da fonte. | Uma despesa pode ser registrada sem débito silencioso; tesouro não duplica a carteira nem o inventário. |

### 7.6. Evolução e características de classe

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| L01 — P1 | Cadastrar progressão 1–20 por classe/subclasse, níveis de escolha, características, recursos e pendências. | Todas as classes liberam exatamente as características previstas para seu nível, com origem e referência. |
| L02 — P1 | Fazer evolução assistida, inclusive salto de vários níveis; registrar PV, magias, escolhas e substituições permitidas. | Subir de 1 para 8 percorre decisões de 2–8; não perde as escolhas existentes. |
| L03 — P0 | Registrar incrementos/talentos como escolhas reversíveis por nível; preservar calendários especiais de guerreiro/ladino. | Voltar nível remove os efeitos posteriores sem corromper atributos; não reaplica um incremento já resolvido. |
| L04 — P1 | Unificar recursos: total, disponível/gasto, recuperação e gatilho; vincular às características. | Fúria, ki, inspiração, dados de superioridade e similares seguem suas regras próprias de descanso. |
| L05 — P1 | Gerar painel de características com busca, fonte, nível, descrição, escolhas e ações de recurso; preservar traços próprios. | Trocar nível atualiza características automáticas sem duplicá-las ou apagar notas do jogador. |

### 7.7. Cobertura exigida para as doze classes

As famílias de subclasses listadas abaixo também fazem parte da implementação. O critério é aplicar suas progressões e escolhas, não apenas exibir os nomes. A contagem esperada do perfil escolhido passa dos 40 nomes atuais para **41 subclasses/conclaves**, com a substituição da família do patrulheiro pela do PDF.

| ID / prioridade, classe e fonte | Mecânicas e famílias a implementar | Aceitação específica |
| --- | --- | --- |
| CLS01 — P1 — Bárbaro, 46–50 | Fúria/usos/dano/resistências; defesa sem armadura; ataque descuidado; movimento; ataque extra; críticos; força e CON até 24 no nível 20. Furioso e Guerreiro Totêmico, com escolhas de totens e efeitos. | Escudo é compatível com a fórmula do bárbaro; armadura invalida a fórmula; ativar fúria não acrescenta dano a ataques fora das condições previstas. |
| CLS02 — P1 — Bardo, 51–55 | Inspiração e dado/recuperação; generalista; canção de descanso; especialização; magias conhecidas e segredos mágicos. Conhecimento e Bravura, incluindo escolhas adicionais. | Generalista se aplica a testes não proficientes cabíveis; especialização é escolhida nos níveis 3/10; segredos abrem listas e limites corretos. |
| CLS03 — P1 — Bruxo, 56–62 | Patrono no nível 1; invocações e requisitos; dádiva do pacto no 3; magia de pacto; arcanos místicos; recursos do patrono. Arquifada, Corruptor e Grande Antigo. | Espaços de pacto recuperam em descanso curto; arcanos 6–9 têm usos próprios; lista expandida do patrono não vira automaticamente magia conhecida. |
| CLS04 — P1 — Clérigo, 63–70 | Domínio no 1; magias preparadas; magias de domínio sempre preparadas; proficiências extras; canalizar divindade; destruir mortos-vivos; intervenção divina. Sete domínios do PDF. | Magia de domínio não gasta o limite de preparação; domínio concede seus efeitos/proficiências; preparação usa SAB + nível de clérigo, mínimo 1. |
| CLS05 — P1 — Druida, 71–76 | Druídico; magias preparadas; forma selvagem com usos, ND, limitações de deslocamento e criaturas vistas. Terra com terreno/magias/recuperação, e Lua com formas/recursos próprios. | Filtros de forma respeitam nível e limitações; substituir forma não perde a ficha original; magias de círculo são tratadas conforme a regra. |
| CLS06 — P1 — Feiticeiro, 77–82 | Origem no 1; magias conhecidas; pontos de feitiçaria/conversão; metamagias e custos. Linhagem Dracônica com ancestral/CA/PV, e Magia Selvagem com controles de gatilho. | Dracônico ganha +1 PV por nível e fórmula de CA pertinente; metamagias aparecem nos níveis previstos e consomem pontos; surto não é presumido sem decisão da mesa. |
| CLS07 — P1 — Guerreiro, 83–88 | Estilo; retomar o fôlego; surto de ação; ataques extras; incrementos adicionais; indomável. Campeão, Mestre de Batalha e Cavaleiro Arcano com suas escolhas/progressões. | Ataques por ação evoluem em 5/11/20; manobras usam dados/custos; Cavaleiro Arcano aplica conjuração de um terço e restrições de escolas. |
| CLS08 — P1 — Ladino, 89–93 | Especialização 1/6; ataque furtivo; gíria de ladrão; ação ardilosa; esquiva sobrenatural; evasão; talento confiável. Ladrão, Assassino e Trapaceiro Arcano. | Furtivo mostra dados e condições sem adicionar em todo ataque; especialização admite ferramentas de ladrão conforme a regra; Trapaceiro tem progressão/listas próprias. |
| CLS09 — P1 — Mago, 94–101 | Grimório; seis magias iniciais e duas por nível; preparação; copiar magias com tempo/custo; ritual do grimório; recuperação arcana; recursos de escola. Oito escolas do PDF. | Uma magia no grimório pode ser não preparada; ritual elegível não exige preparação; recuperação arcana respeita limites e frequência. |
| CLS10 — P1 — Monge, 102–107 | Defesa sem armadura; artes marciais/dado; ki/custos; movimento sem armadura; desviar projéteis; ataque atordoante; recursos e salvaguardas posteriores. Mão Aberta, Sombra e Quatro Elementos. | Armadura/escudo invalida efeitos correspondentes; dado de artes marciais evolui; disciplinas têm escolhas, requisitos e custos. |
| CLS11 — P1 — Paladino, 108–114 | Sentido divino; cura pelas mãos; estilo; magias preparadas com CAR; destruir divino; auras e ataque extra. Devoção, Anciões e Vingança com magias/canalizar juramento. | Reserva de cura = 5 × nível; preparação usa CAR + metade do nível arredondada para baixo, mínimo 1; magias de juramento ficam sempre preparadas. |
| CLS12 — P1 — Patrulheiro Revisado, 115–121 | Inimigo favorito +2 e evolução a +4; explorador natural; estilo; magias conhecidas; demais características revisadas. Conclaves da Besta, Caçador e Rastreador Subterrâneo, com companheiro, escolhas e magias do conclave. | Vantagem de iniciativa é registrada; companheiro tem ficha/escala próprias; característica de nível 5 segue o conclave e não concede ataque extra genérico a todos. |

### 7.8. Conjuração e catálogo de magias

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| M01 — P1 | Cadastrar todas as magias das listas/descrições do PDF: ID, círculo, escola, classes, tempo, alcance/área, componentes, custo/consumo, duração, concentração, ritual e efeito. | Cada entrada nas listas aponta para uma descrição/metadados válidos; divergências são conferidas na página antes de integrar. |
| M02 — P1 | Criar seleção com busca/filtros, contadores, fontes e restrições de classe/subclasse/nível. | Mago não aprende magia fora de sua lista por engano; características que abrem outras listas tornam a escolha válida. |
| M03 — P1 | Distinguir conhecidas, preparadas, grimório, sempre preparadas e magias de uso limitado. | Limites não incluem magias sempre preparadas; retirar preparação não apaga a magia do grimório. |
| M04 — P1 | Cadastrar tabelas de truques, magias conhecidas/preparação e espaços para cada classe, meios conjuradores e um terço. | Paladino/patrulheiro começam a conjurar no nível pertinente; Cavaleiro/Trapaceiro seguem tabelas próprias; bruxo não usa tabela genérica. |
| M05 — P1 | Calcular atributo/CD/ataque por fonte; permitir várias fontes no mesmo personagem e efeitos adicionais identificados. | Magia racial de INT não usa CAR da classe por acidente; CD e ataque exibem a fórmula aplicada. |
| M06 — P1 | Lançar/registrar uso, escolher círculo maior, consumir espaço ou uso próprio e aplicar escalonamento indicado. | Truque não consome espaço; magia racial limitada consome seu uso; dano de truques que escalam por nível usa nível total. |
| M07 — P1 | Separar espaços de pacto e arcanos místicos; recuperar espaços/usos por descanso e característica. | Descanso curto recupera pacto, sem recuperar espaços normais automaticamente; arcano místico não gasta espaço de pacto. |
| M08 — P1 | Implementar concentração única, término, lembrete de teste por dano e vantagem pertinente. | Nova concentração exige trocar a anterior; CD usa maior entre 10 e metade do dano arredondada para baixo; fontes de dano separadas geram testes separados. |
| M09 — P1 | Mostrar componentes, foco/bolsa, materiais caros/consumidos, ritual e impedimento de conjuração por armadura sem proficiência. | Foco não substitui material com custo ou consumido; ritual só aparece quando a fonte permite e segue tempo/requisitos. |
| M10 — P1 | Organizar página 3 por círculos 0–9, preparação e espaços; integrar ataques mágicos e regras contextuais de lançamento. | Magias e contadores persistem; regra de magia como ação bônus se refere ao mesmo turno e não vira proibição genérica de duas magias com círculo. |

### 7.9. História e campos adicionais

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| BIO01 — P1 | Criar todos os campos físicos, aparência e história da página 2, com salvamento e edição. | Todos os campos das imagens têm correspondência e persistem. |
| BIO02 — P1 | Integrar tabelas de personalidade, ideais, vínculos e defeitos de cada antecedente; seleção/rolagem e texto livre. | Duas sugestões de traço e uma dos demais grupos podem ser escolhidas e editadas; não sobrescrevem texto já escrito. |
| BIO03 — P1 | Adicionar retrato e símbolos, com controle de tamanho, substituir/remover e exportação coerente. | Imagem grande não rompe layout nem impede salvar; texto da ficha permanece acessível. |
| BIO04 — P1 | Registrar aliados/organizações e tesouro/nota narrativa, relacionando bens ao inventário quando pertinente. | Múltiplos registros funcionam e imprimem; tesouro vinculado não duplica riqueza. |
| BIO05 — P1 | Exibir características adicionais e continuação de conteúdos longos sem duplicação mecânica. | Uma característica aparece em continuação quando necessário, mas aplica seu efeito somente uma vez. |

### 7.10. Opções de personalização e auxiliares

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| O01 — P1 | Completar os 42 talentos, corrigir nomes/requisitos/benefícios omitidos e estruturar escolhas/efeitos. | Combatente Montado e Maestria em Armadura Média disponíveis; requisito de armadura pesada validado; benefícios completos do perfil escolhido. |
| O02 — P1 | Resolver escolhas de talentos: atributos, perícias/ferramentas, armas, magias, elementos, manobras e rituais. | Perito aceita três escolhas em qualquer combinação válida de perícias/ferramentas; Adepto Elemental aceita repetição com outro elemento; remover talento desfaz efeitos. |
| O03 — P2 | Implementar multiclasse opcional: requisitos, níveis por classe, PV/dados e proficiências limitadas recebidas ao entrar. | Proficiência geral usa nível total; segunda classe não concede kit nem todas as proficiências iniciais automaticamente. |
| O04 — P2 | Implementar conjuração multiclasse: nível combinado, arredondamentos, pacto separado, preparação/conhecimento por classe e efeitos não cumulativos. | Espaços de círculo alto não liberam automaticamente magias desse círculo; ataque extra e defesa sem armadura não se somam. |
| O05 — P1 | Oferecer fichas auxiliares de familiar, companheiro e forma selvagem com dados do apêndice e entrada personalizada. | Forma/companheiro conserva origem e escala correta; apêndice incompleto não impede registrar criatura autorizada pelo mestre. |
| O06 — P2 | Acrescentar referências opcionais de divindades, panteões e planos à história, sem impor conteúdo de cenário. | Jogador escolhe referência ou texto livre; seleção narrativa não concede bônus mecânicos por si só. |

### 7.11. Interface, exportação e qualidade

| ID / prioridade | Implementação | Critério de aceitação |
| --- | --- | --- |
| Q01 — P1 | Mostrar resumo da criação, pendências por origem e navegação direta para a escolha faltante. | Cada aviso conduz ao campo correto; completar uma escolha resolve o aviso correspondente. |
| Q02 — P1 | Mostrar a origem dos cálculos e permitir ajuste manual identificado, sem editar a base silenciosamente. | CA/testes/PV explicam seus componentes; tirar um ajuste restaura o valor calculado. |
| Q03 — P1 | Revisar uso em celular, navegação das três páginas, formulários e listas grandes de magias/equipamentos. | Larguras usuais de celular não exigem rolagem horizontal para editar; controles principais continuam acessíveis. |
| Q04 — P1 | Completar navegação por teclado, foco de modais, Escape/retorno de foco, rótulos, abas e mensagens acessíveis. | Fluxo de criação, inventário e magias pode ser operado por teclado; leitor de tela identifica campos e estados. |
| Q05 — P1 | Criar impressão/exportação com os campos das três fichas, escolhas de conteúdo e anexos de continuação. | Texto/magias longos não são cortados; página principal não imprime botões/modais; três grupos permanecem reconhecíveis. |
| Q06 — P1 | Manter boa resposta e independência de serviços remotos para os cálculos; carregamento/filtros eficientes. | Recalcular e pesquisar catálogo não trava a interface; não depende de IA ou API para uma ficha funcionar. |
| Q07 — P0 | Criar testes significativos de regras, progressões, migração e regressões reproduzidas; automatizar verificações no GitHub. | Regressões B02–B18 têm casos pertinentes; mudança de catálogo que quebra referências falha antes de publicar. |
| Q08 — P1 | Criar verificações de navegador para criação, recarga, nível, inventário, magias e exportação. | Os cenários do capítulo 10 passam no ambiente de implementação; não apenas testes que repetem o código. |
| Q09 — P0 | Validar entradas/importações e renderizar textos próprios com segurança; limitar tamanho de imagens/arquivos. | Nome/história contendo marcação não executa código; importação não cria estado impossível sem aviso. |
| Q10 — P1 | Atualizar documentação de regras, catálogo, persistência, execução, testes e publicação; registrar mudanças do perfil. | Outro colaborador consegue reproduzir a execução e verificar uma regra sem procurar em todo o arquivo monolítico. |

## 8. Automação esperada e decisões do jogador

| Situação | Comportamento semiautomático esperado |
| --- | --- |
| Escolher raça/classe/antecedente | Preencher concessões fixas e pedir somente as escolhas previstas. |
| Distribuir atributos | Aplicar bônus e limites; recalcular testes, PV, CD, ataques e carga; explicar cada origem. |
| Proficiência repetida | Identificar as fontes e oferecer substituição quando a regra concede, sem simplesmente somar bônus. |
| Subir de nível | Conceder efeitos fixos e abrir escolhas de PV, características, magias e incremento/talento pertinentes. |
| Equipar item | Aplicar CA/ataque/penalidades usando o item selecionado; guardar o restante como inventário. |
| Preparar/conjurar magia | Validar fonte e limites; controlar preparação, espaço/uso, concentração e escalonamento. |
| Descansar | Apresentar o que será recuperado e permitir resolver dados/decisões pendentes antes de aplicar. |
| Escrever história | Oferecer tabelas e perguntas; conservar a autoria e a edição do jogador. |
| Efeito dependente do contexto | Exibir condição e controle para ativar/aplicar; não presumir alvo, surpresa, iluminação, decisão do mestre ou resultado de ataque. |

O sistema pode automatizar integralmente um cálculo conhecido. Escolhas como inimigo favorito, preparo de magias, histórico, equipamento e características opcionais continuam decisões explícitas. Isso evita rapidez aparente que produz uma ficha sem escolhas essenciais.

## 9. Organização técnica e sequência no GitHub

### 9.1. Estrutura recomendada

A arquitetura estática em HTML/CSS/JavaScript é suficiente para esse objetivo. Não é necessário introduzir servidor, contas ou trocar de framework para completar as fichas.

Separar progressivamente:

- **Dados:** raças, classes, subclasses, antecedentes, talentos, equipamentos, magias e criaturas, com IDs e referências.
- **Regras:** funções de cálculo e resolução de efeitos, sem leitura/escrita direta dos formulários.
- **Estado:** escolhas do personagem, níveis, registros próprios e recursos de sessão; valores derivados calculados a partir deles.
- **Persistência:** versão, migrações, validação, coleção e importação/exportação.
- **Interface:** assistente, três páginas, modais, pendências, explicação de cálculos e impressão.
- **Verificação:** integridade do catálogo, casos de regra e cenários no navegador.

Um recurso deve indicar origem, total calculado, saldo atual e regra de recuperação. Uma escolha deve indicar fonte, nível, quantidade, grupo permitido e seleções. Uma característica deve separar descrição, escolhas, efeitos permanentes, condições e ações de recurso. Não inferir efeitos pelo texto do nome de um talento.

### 9.2. Ordem de implementação

| Etapa | Entrega concreta no código | Condição para avançar |
| --- | --- | --- |
| 1 — Base confiável | IDs/aliases, perfil de regras, estado versionado, migração com backup e motor; corrigir regressões de proficiência, CA, movimento, PV e atributos. | Ficha antiga preservada; casos de regressão aprovados; recálculo sem cura ou perda de escolhas. |
| 2 — Criação completa | Métodos de atributos, escolhas raciais/antecedentes, proficiências, equipamentos iniciais, identidade e revisão de pendências. | Personagens nível 1 válidos para todas as raças/classes; nenhuma escolha obrigatória perdida. |
| 3 — Evolução e classes | Progressões 1–20, todas as subclasses do perfil, recursos, incrementos/talentos e auxiliares de criatura. | Criação em nível alto e evolução consecutiva produzem resultados equivalentes para as mesmas escolhas. |
| 4 — Magias e sessão | Catálogo completo, listas/preparação/grimório, espaços/pacto, conjuração, concentração, PV, dados de vida e descansos. | Classes conjuradoras e fontes raciais/talentos têm reservas e limites corretos, persistentes. |
| 5 — Três páginas e entrega | História, personalidade, retrato, aliados, tesouro, coleção/importação/exportação e impressão; celular/acessibilidade. | Todos os campos das imagens preenchíveis ou derivados; exportação preserva conteúdos longos. |
| 6 — Opções avançadas | Multiclasse, conjuração combinada, sobrecarga variante e referências narrativas opcionais. | Opções ativadas produzem resultados corretos e permanecem identificadas no perfil da ficha. |

As etapas podem compartilhar dados, mas as dependências do motor precisam existir antes de gerar muitas características automáticas. Não publicar abas com apenas aparência completa e cálculos ainda desconectados.

Para cada bloco de código: trabalhar em branch, atualizar o plano com os IDs atendidos, incluir validações pertinentes e abrir PR com comportamento antes/depois. Conferir o estado mais recente de `main` antes da primeira edição: este levantamento é uma referência congelada, não uma garantia de que o repositório ficará inalterado.

## 10. Cenários de aceitação da mega atualização

Estes cenários são testes a executar na implementação. Os resultados esperados são ancorados nas regras e nos problemas encontrados, não uma declaração de que já passaram.

### 10.1. Criação e proficiências

1. Conjunto padrão usa exatamente seis valores e aplica bônus raciais em camada separada.
2. Compra de pontos rejeita base 16 e gasto acima de 27; base 15 custa 9.
3. Rolagem mostra 4d6, descarte e soma; distribuição conserva seis resultados.
4. Meio-elfo exige dois +1 distintos fora de CAR, duas perícias e idioma adicional.
5. Humano variante exige perícia, talento válido e dois bônus distintos quando a opção estiver ativa.
6. Anão recebe uma ferramenta entre as três previstas; bardo três instrumentos; monge uma alternativa válida.
7. Proficiência duplicada de antecedente abre substituição sem bônus em dobro.
8. Elfo da floresta/mago nível 1, DES 16 e SAB 11: deslocamento 10,5 m, Percepção +2, passiva 12 e arco longo +5.
9. Marcações manuais e escolhas raciais persistem após recarga e exportação/importação.
10. Mago nível 1 não exige escola; mago/druida nível 2 e as classes de subclasse no 3 solicitam a escolha no momento correto.

### 10.2. Equipamento, atributos e recursos

11. Placas na mochila não mudam CA; equipá-las muda a fórmula e apresenta restrições pertinentes.
12. Fórmulas de bárbaro e monge respeitam armadura/escudo; alternativas de CA não se somam.
13. Pacote expandido tem conteúdo e peso corretos; agrupar não duplica peso.
14. Carteira converte PC/PP/PE/PO/PL exatamente; peso de moedas acompanha a quantidade.
15. Dano seguido de recarga, troca de arma ou talento conserva PV atuais; cura respeita o máximo.
16. PV temporários absorvem primeiro e não se acumulam; trocar de origem permite escolher o valor aplicável.
17. Anão da colina, feiticeiro dracônico e Robusto acrescentam os PV por nível previstos; CON alterada atualiza o máximo conforme a regra.
18. Remover talento/incremento desfaz seu efeito; reaplicar não acumula bônus indevidos.
19. Bárbaro nível 20 pode atingir FOR/CON 24 conforme sua característica.
20. Dados de vida, descansos, recursos e testes contra a morte persistem; 1 natural, 20 natural e estabilidade seguem suas regras.

### 10.3. Classes, evolução e magias

21. Para cada uma das 12 classes, conferir níveis 1 e 20, cada mudança de tabela e cada nível de escolha de característica/subclasse.
22. Para todas as 41 famílias de subclasse/conclave do perfil, conferir características, escolhas, proficiências, recursos e conjuração pertinentes.
23. Criar no nível 8 e evoluir 1→8 com as mesmas escolhas produz os mesmos valores máximos e características.
24. Reduzir nível invalida efeitos posteriores e marca escolhas a rever, preservando notas/inventário próprios.
25. Bardo/ladino aplicam especialização corretamente; bardo aplica generalista somente onde cabível.
26. Patrulheiro da Besta usa progressão do companheiro; Caçador/Rastreador recebem suas características de nível 5, sem misturar perfis.
27. Bruxo recupera pacto em descanso curto; arcanos místicos têm usos próprios; lista de patrono não vira seleção conhecida automaticamente.
28. Clérigo/druida/mago/paladino respeitam preparação; magias sempre preparadas não gastam esse limite.
29. Grimório não confunde magia registrada com preparada; rituais seguem o que a fonte permite.
30. Magias raciais e de talentos usam atributo/uso próprios, mesmo em personagem sem classe conjuradora.
31. Lançamento em círculo maior consome o espaço escolhido; truque não consome espaço e escala por nível total quando a descrição determina.
32. Concentração é única; dano gera CD correta; material com custo/consumo não é dispensado pelo foco.
33. Feitos que permitem escolha de magias, rituais, manobras, armas ou perícias geram pendências e efeitos completos.
34. Multiclasse usa proficiência por nível total e magias conhecidas/preparadas por classe; espaços combinados não liberam automaticamente magias de círculo superior.

### 10.4. Persistência, interface e exportação

35. Ficha v2 migra com backup e sem perder itens, ataques, traços, talentos e escolhas já salvos.
36. JSON corrompido ou importação inválida não apaga a única ficha recuperável.
37. Duas fichas independentes podem ser abertas, duplicadas e exportadas sem misturar estados.
38. História, retrato, aliados, personalidade, tesouro e magias permanecem após recarga.
39. Nome/história com marcação é exibido como conteúdo sem executar script.
40. Criação, equipamentos e magias funcionam por teclado e em celular; modais retornam foco adequadamente.
41. Impressão/exportação conserva os campos das três imagens, contadores e conteúdos longos em anexos, sem cortes.
42. Referências de catálogo e progressões passam nos testes automatizados; documentação reproduz execução, migração e verificação.

## 11. Critério de conclusão

A mega atualização está completa quando o jogador consegue criar uma ficha válida no nível desejado, resolver todas as escolhas do perfil adotado, evoluir sem perder dados, usar seus recursos e magias e levar as três páginas completas para a mesa.

Antes da implementação, este documento já fornece o mapa de lacunas, as correções prioritárias, a cobertura do livro, a sequência de trabalho e os critérios de aceite. Durante os PRs, cada ID do backlog deve receber estado e evidência de verificação. Não usar quantidade de registros cadastrados como medida isolada de conclusão.

## 12. Referências do código e registro da análise

| Arquivo do snapshot | Papel na auditoria |
| --- | --- |
| [index.html](https://github.com/saulinho422/ficha-de-personagem-5e/blob/94e528bb13f697629673973e938cd9e1b55e8c97/index.html) | Assistente, campos, abas e modais. |
| [app.js](https://github.com/saulinho422/ficha-de-personagem-5e/blob/94e528bb13f697629673973e938cd9e1b55e8c97/app.js) | Cálculos, progressão parcial, estado, inventário, ataques, proficiências e características automáticas. |
| [banco_phb.js](https://github.com/saulinho422/ficha-de-personagem-5e/blob/94e528bb13f697629673973e938cd9e1b55e8c97/banco_phb.js) | Raças, classes, antecedentes, perícias e equipamentos. |
| [talentos_phb.js](https://github.com/saulinho422/ficha-de-personagem-5e/blob/94e528bb13f697629673973e938cd9e1b55e8c97/talentos_phb.js) | Catálogo parcial de talentos e pré-requisitos textuais. |
| [style.css](https://github.com/saulinho422/ficha-de-personagem-5e/blob/94e528bb13f697629673973e938cd9e1b55e8c97/style.css) | Layout e responsividade existentes; base para as páginas completas e impressão. |
| [README.md](https://github.com/saulinho422/ficha-de-personagem-5e/blob/94e528bb13f697629673973e938cd9e1b55e8c97/README.md) | Forma atual de execução abrindo o HTML; sem documentação de regras/testes/migração. |

Registro: diagnóstico elaborado a partir dos arquivos locais enviados, do código obtido pelo GitHub e das observações no site público. Resultados de cálculo adicionais e qualidade em outros dispositivos serão validados durante a implementação.
