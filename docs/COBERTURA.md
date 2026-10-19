# Cobertura da mega atualização

Esta matriz liga os 98 requisitos do plano à implementação. “Automático” significa cálculo ou validação determinística. “Assistido” significa que a ficha oferece escolhas, controles e persistência, mas uma decisão contextual continua com jogador/Mestre. “Conteúdo” significa referência exibida sem tentar simular a mesa inteira.

| ID | Estado | Evidência principal |
| --- | --- | --- |
| D01 | Automático | IDs/aliases canônicos em `catalogo.js`; migração por identidade. |
| D02 | Automático | `ruleset` obrigatório: 2014 + Patrulheiro Revisado. |
| D03 | Automático | Camadas reversíveis de atributos; recursos atuais separados. |
| D04 | Automático | Composição de proficiências por origem em `regras.js`. |
| D05 | Automático | Cálculos puros em `regras.js`, `campanha.js` e `sessao.js`. |
| D06 | Automático | Esquema v3 cobre as três páginas e recursos. |
| D07 | Automático | Migração v2 conservadora, sem apagar a chave original. |
| D08 | Automático | Validação prévia, backup e recuperação. |
| D09 | Automático | Coleção independente, duplicação e lixeira. |
| D10 | Automático | JSON versionado de ficha/coleção. |
| D11 | Automático | `yarn check` e testes de integridade do catálogo. |
| C01 | Assistido | Assistente de nove etapas por dependência. |
| C02 | Automático | Conjunto padrão sem reutilização indevida. |
| C03 | Automático | Compra de 27 pontos e tabela de custos. |
| C04 | Automático | 4d6, descarte visível e distribuição validada. |
| C05 | Automático | Subclasse no nível correto e pendências anteriores. |
| C06 | Assistido | Sugestões por classe e rascunho persistente. |
| C07 | Automático | Substituição de perícia duplicada. |
| C08 | Automático | Grupos restritos de idioma/ferramenta/instrumento. |
| C09 | Assistido | Cinco variantes e antecedente personalizado. |
| C10 | Assistido | Reedição estrutural com recálculo; história e itens preservados. |
| R01 | Automático | Tamanho, sentidos e deslocamento por sub-raça. |
| R02 | Automático | Meio-elfo: atributos, perícias e idioma. |
| R03 | Automático | Humano comum/variante separados e opcionais. |
| R04 | Automático | Perícias e armas raciais entram nos cálculos. |
| R05 | Automático | Ferramenta anã e PV da Colina por nível. |
| R06 | Automático | Ancestral, sopro, CD, dano e uso. |
| R07 | Automático | Magias raciais por fonte, sem espaços indevidos. |
| R08 | Assistido | Efeitos calculáveis aplicados; condicionais têm gatilho/controle. |
| R09 | Assistido | Sugestões físicas editáveis. |
| F01 | Automático | Perícias/salvaguardas, especialização e Generalista. |
| F02 | Automático | Passivos completos, Observador e situação. |
| F03 | Automático | Fórmulas de CA exclusivas e equipamento realmente usado. |
| F04 | Automático | Movimento, iniciativa e restrições. |
| F05 | Automático | PV máximo/atual/temporário e dano/cura. |
| F06 | Automático | Dados de Vida, descansos, morte e estabilidade. |
| F07 | Automático | Ataques, proficiência, estilos e modos de arma. |
| F08 | Assistido | Turno, ação/bônus/reação e lembretes contextuais. |
| F09 | Automático | Condições e exaustão calculáveis; textos completos. |
| F10 | Automático | Resistência, imunidade, vulnerabilidade e concentração. |
| F11 | Assistido | Ajustes manuais exigem valor e origem. |
| I01 | Assistido | Kit inicial ou riqueza da classe. |
| I02 | Automático | Pacotes expandidos em itens com peso/quantidade. |
| I03 | Automático | Guardado, equipado, mãos e foco são estados distintos. |
| I04 | Automático | Armas, munição e proficiência integradas aos ataques. |
| I05 | Automático | Carteira exata, compras, vendas e histórico. |
| I06 | Automático | Carga, moedas e variante de sobrecarga. |
| I07 | Assistido | Consumíveis com desfazer e notas próprias. |
| I08 | Conteúdo | Montarias, veículos, arreios e bens pesquisáveis. |
| I09 | Assistido | Estilos de vida, serviços e transações registráveis. |
| L01 | Automático | Progressões 1–20 e 41 subclasses/conclaves. |
| L02 | Automático | Recursos máximos, gastos e recuperação. |
| L03 | Automático | Incrementos/talentos reversíveis por nível. |
| L04 | Assistido | Escolhas estruturadas; efeitos contextuais permanecem descritos. |
| L05 | Automático | Multiclasse, requisitos, espaços e fontes separadas. |
| CLS01 | Assistido | Bárbaro: fúria, CA/PV/movimento e recursos; decisões de alvo manuais. |
| CLS02 | Assistido | Bardo: inspiração, Generalista, especialização e segredos. |
| CLS03 | Assistido | Bruxo: pacto, invocações, arcanos e lista expandida. |
| CLS04 | Assistido | Clérigo: domínios, preparação e Canalizar Divindade. |
| CLS05 | Assistido | Druida: círculos, Forma Selvagem e recuperação. |
| CLS06 | Assistido | Feiticeiro: origem, metamagia e Conversão Flexível. |
| CLS07 | Assistido | Guerreiro: estilos, recursos, manobras e ataques extras. |
| CLS08 | Assistido | Ladino: especialização, furtivo e arquétipos. |
| CLS09 | Assistido | Mago: grimório, escolas, Proteção Arcana, domínio e assinatura. |
| CLS10 | Assistido | Monge: chi, artes marciais e disciplinas. |
| CLS11 | Assistido | Paladino: juramentos, Cura pelas Mãos e Destruição Divina. |
| CLS12 | Assistido | Patrulheiro Revisado e três conclaves, incluindo companheiro. |
| M01 | Automático | Fontes separadas e atributo correto. |
| M02 | Automático | CD e ataque mágico com memória do cálculo. |
| M03 | Automático | 361 magias/845 vínculos e filtros válidos. |
| M04 | Automático | Conhecida, preparada, grimório e sempre disponível. |
| M05 | Automático | Espaços normais, pacto, usos e recuperação. |
| M06 | Automático | Multiclasse conjuradora sem ampliar lista individual. |
| M07 | Automático | Ritual por fonte e sem gasto de espaço. |
| M08 | Assistido | Concentração, componentes e confirmação de custo/consumo. |
| M09 | Automático | Escalonamento de truque e círculo maior. |
| M10 | Assistido | Efeitos exibidos; alvos e resultados da mesa não são presumidos. |
| BIO01 | Automático | Identidade e campos físicos persistentes. |
| BIO02 | Assistido | Retrato e símbolo reduzidos/validados no navegador. |
| BIO03 | Automático | História, aliados e organizações em texto seguro. |
| BIO04 | Assistido | Sugestões de personalidade e d100 de bugigangas. |
| BIO05 | Automático | Tesouro e anotações separados do valor do inventário. |
| O01 | Automático | 42 talentos, bônus reversíveis e requisitos. |
| O02 | Assistido | Escolhas internas e repetição apenas quando permitida. |
| O03 | Assistido | Criaturas do apêndice e cadastro estruturado próprio. |
| O04 | Automático | Forma Selvagem filtra ND/natação/voo e trata PV excedente. |
| O05 | Automático | Companheiro revisado recalcula CA, PV, proficiência e escolhas. |
| O06 | Conteúdo | Divindade, panteão, planos e cosmologia em campos narrativos. |
| Q01 | Automático | Layout responsivo das três páginas. |
| Q02 | Automático | Teclado, foco, abas e diálogos testados. |
| Q03 | Automático | Saída como texto; entradas não viram marcação executável. |
| Q04 | Automático | Salvamento incremental e falhas sem apagar a cópia boa. |
| Q05 | Automático | Impressão selecionável em três grupos e quebra A4. |
| Q06 | Automático | Exportação/importação e backup completo. |
| Q07 | Automático | 88 testes de regras, persistência e DOM. |
| Q08 | Automático | 11 cenários em Chromium no CI. |
| Q09 | Assistido | Relatório/capturas/PDF do navegador publicados como artefato. |
| Q10 | Conteúdo | README, implementação, plano e esta matriz mantidos no repositório. |

## Limite deliberado

“Assistido” não é uma lacuna de dados: é a fronteira entre uma ficha automática e um simulador de mesa. A aplicação não escolhe inimigos, interpreta terreno, concede autorização do Mestre ou decide se um gatilho narrativo ocorreu. Ela calcula o que pode ser calculado, impede combinações inválidas e mantém a decisão contextual explícita.
