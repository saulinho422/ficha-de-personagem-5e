(function(r){const dados=[
  {
    "id": "magia-enfraquecer-intelecto",
    "nome": "Enfraquecer Intelecto",
    "nivel": 8,
    "escola": "encantamento",
    "tempo": "1 ação",
    "alcance": "45 metros",
    "componentes": "V, S, M (um punhado de barro, cristal, vidro ou esferas minerais)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você ataca a mente de uma criatura que você possa ver,\ndentro do alcance, tentando despedaçar seu intelecto e\npersonalidade. O alvo sofre 4d6 de dano psíquico e deve\nrealizar um teste de resistência de Inteligência.\nSe falhar na resistência, os valores de Inteligência e\nCarisma da criatura se tornam 1. A criatura não pode\nconjurar magias, ativar itens mágicos, compreender\nidiomas ou se comunicar de qualquer forma inteligível. A\ncriatura pode, no entanto, identificar seus amigos, segui-\nlos e, até mesmo, protege-los.\nAo final de cada 30 dias, a criatura pode repetir seu\nteste de resistência contra essa magia. Se ela obtiver\nsucesso no teste de resistência, a magia termina.\nEssa magia também pode ser terminada através de\nrestauração maior, cura completa ou desejo.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Druida",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 243
    }
  },
  {
    "id": "magia-enviar-mensagem",
    "nome": "Enviar Mensagem",
    "nivel": 3,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Ilimitado",
    "componentes": "V, S, M (um pequeno e fino pedaço de fio de cobre)",
    "duracao": "1 rodada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você envia uma mensagem curta, de vinte e cinco\npalavras ou menos, para uma criatura que seja familiar a\nvocê. A criatura ouve a mensagem na sua mente,\nreconhecendo que foi enviada por você, se ela te conhecer,\ne pode responder da mesma maneira, imediatamente. A\nmagia permite que criaturas com valores de Inteligência\nde no mínimo 1, compreendam o sentido da sua\nmensagem.\nVocê pode enviar a mensagem através de qualquer\ndistância e, até mesmo, para outro plano de existência,\nmas se o alvo estiver em um plano diferente do seu, existe\n5 por cento de chance da mensagem não chegar.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 243
    }
  },
  {
    "id": "magia-escrita-ilusoria",
    "nome": "Escrita Ilusória",
    "nivel": 1,
    "escola": "ilusão",
    "tempo": "1 minuto",
    "alcance": "Toque",
    "componentes": "S, M (uma tinta à base de chumbo valendo, no mínimo, 10 po, que é consumida pela magia)",
    "duracao": "10 dias",
    "ritual": true,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Você escreve em um pergaminho, papel ou qualquer outro\nmaterial adequado e tinge ele com uma poderosa ilusão\nque permanece pela duração.\nPara você e para qualquer criatura que você designar\nquando você conjura essa magia, a escrita parece normal,\nescrita com a sua caligrafia e transmite qualquer que seja\na mensagem que você desejava quando escreveu o texto.\nPara todos os outros, a escrita aparece como se tivesse\nsido escrita com uma caligrafia desconhecida ou mágica\nque é inteligível. Alternativamente, você pode fazer a\nescrita parecer uma mensagem totalmente diferente,\nescrita com uma caligrafia e idioma diferentes, apesar de\no idioma precisar ser um que você conheça.\nNo caso da magia ser dissipada, tanto a escrita\noriginal quanto a ilusória desaparecem.\nUma criatura com visão verdadeira pode ler a\nmensagem escondida.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 243
    }
  },
  {
    "id": "magia-escudo-arcano",
    "nome": "Escudo Arcano",
    "nivel": 1,
    "escola": "abjuração",
    "tempo": "1 reação, que você faz quando é atingido por um ataque ou alvo da magia mísseis mágicos",
    "alcance": "Pessoal",
    "componentes": "V, S",
    "duracao": "1 rodada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma barreira de energia invisível aparece e protege você.\nAté o início do seu próximo turno, você recebe +5 de bônus\nna CA, incluindo contra o ataque que desencadeou a\nmagia, e você não sofre dano de mísseis mágicos.",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 243
    }
  },
  {
    "id": "magia-escudo-da-fe",
    "nome": "Escudo Da Fé",
    "nivel": 1,
    "escola": "abjuração",
    "tempo": "1 ação bônus",
    "alcance": "18 metros",
    "componentes": "V, S, M (um pequeno pergaminho com alguns textos sagrados escritos nele)",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um campo cintilante aparece ao redor de uma criatura, à\nsua escolha, dentro do alcance, concedendo +2 de bônus\nna CA pela duração.",
    "escalonamento": "",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 243
    }
  },
  {
    "id": "magia-escudo-de-fogo",
    "nome": "Escudo De Fogo",
    "nivel": 4,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V, S, M (um pouco de fósforo ou um vaga- lume)",
    "duracao": "10 minutos",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Finas e discretas chamas rodeiam seu corpo pela duração,\nemitindo luz plena em 3 metros de raio e penumbra por\nmais 3 metros adicionais. Você pode terminar a magia\nprematuramente usando sua ação para dissipa-la.\nAs chamas lhe conferem um escudo quente ou um\nescudo frio, à sua escolha. O escudo quente lhe garante\nresistência a dano de frio e o escudo frio lhe concede\nresistência a dano de fogo.\nAlém disso, sempre que uma criatura a 1,5 metro de\nvocê atingir você com um ataque corpo-a-corpo, o escudo\nexpele chamas. O atacante sofre 2d8 de dano de fogo do\nescudo quente ou 2d8 de dano de frio do escudo frio.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 244
    }
  },
  {
    "id": "magia-escuridao",
    "nome": "Escuridão",
    "nivel": 2,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, M (pelo de morcego e uma gota de piche ou pedaço de carvão)",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Escuridão mágica se espalha a partir de um ponto, à sua\nescolha, dentro do alcance e preenche uma esfera de 4,5\nmetros de raio pela duração. A escuridão se estende,\ndobrando esquinas. Uma criatura com visão no escuro não\npode ver através dessa escuridão e luz não-mágica não\npode iluminar dentro dela.\nSe o ponto que você escolheu for um objeto que você\nesteja segurando, ou um que não esteja sendo vestido ou\ncarregado, a escuridão emanará do objeto e se moverá\ncom ele. Cobrir completamente a fonte da escuridão com\num objeto opaco, como uma vasilha ou um elmo,\nbloqueará a escuridão.\nSe qualquer área dessa magia sobrepor uma área de\nluz criada por uma magia de 2° ou inferior, a magia que\ncriou a luz será dissipada.",
    "escalonamento": "",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 244
    }
  },
  {
    "id": "magia-esfera-congelante-de-otiluke",
    "nome": "Esfera Congelante De Otiluke",
    "nivel": 6,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "90 metros",
    "componentes": "V, S, M (uma pequena esfera de cristal)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um globo frigido de energia gelada é arremessado das\npontas dos seus dedos para um ponto, à sua escolha,\ndentro do alcance, onde ele explode numa esfera de 18\nmetros de raio. Cada criatura dentro da área deve\nrealizar um teste de resistência de Constituição. Se falhar\nna resistência, uma criatura sofre 10d6 de dano de frio.\nSe obtiver sucesso na resistência, ela sofre metade desse\ndano.\nSe o globo atingir um corpo de água ou liquido\ncomposto principalmente de água (não incluindo criaturas\nfeitas de água), ele congela o líquido até uma\nprofundidade de 15 centímetros numa área de 9 metros\nquadrados. Esse gelo dura por 1 minuto. Criaturas que\nestiverem nadando na superfície de água congelada\nestarão presas no gelo. Uma criatura presa pode usar sua\nação para realizar um teste de Força contra a CD da\nmagia para se libertar.\nVocê pode evitar de disparar o globo após completar a\nmagia, se desejar. Um pequeno globo, do tamanho de uma\npedra de funda, frio ao toque, aparece em sua mão. A\nqualquer momento, você ou uma criatura a quem você\nentregar o globo, pode arremessa-lo (a uma distância de\n12 metros) ou atira-lo com uma funda (ao alcance normal\nda funda). Ele se despedaça no impacto, produzindo o\nmesmo efeito da conjuração normal da magia. Você pode,\ntambém, soltar o globo no chão sem despedaça-lo. Após 1\nminuto, se o globo ainda não tiver se despedaçado, ele\nexplode.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 7° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 6°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 7° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 6°.",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 244
    }
  },
  {
    "id": "magia-esfera-flamejante",
    "nome": "Esfera Flamejante",
    "nivel": 2,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (um pouco de seco, uma pitada de enxofre e uma camada de pó de ferro)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma esfera de fogo, com 1,5 metro de diâmetro, aparece\nem um espaço desocupado, à sua escolha, dentro do\nalcance e permanece pela duração. Qualquer criatura que\nterminar seu turno a até 1,5 metro da esfera, deve\nrealizar um teste de resistência de Destreza. A criatura\nsofre 2d6 de dano de fogo se falhar na resistência, ou\nmetade desse dano se obtiver sucesso.\nCom uma ação bônus, você pode mover a esfera até 9\nmetros. Se você arremessar a esfera contra uma criatura,\nessa criatura deve realizar o teste de resistência contra o\ndano da esfera e a esfera para de se mover esse turno.\nQuando você move a esfera, você pode direciona-la\npara barreira de até 1,5 metro de altura e ela salta sobre\nfossos de até 3 metros de distância. A esfera incendeia\nobjetos inflamáveis que não estejam sendo vestidos ou\ncarregados e emite luz plena a 6 metros de raio e\npenumbra por mais 6 metros adicionais.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 2°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 2°.",
    "classes": [
      "Druida",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 244
    }
  },
  {
    "id": "magia-esfera-resiliente-de-otiluke",
    "nome": "Esfera Resiliente De Otiluke",
    "nivel": 4,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S, M (uma peça hemisférica de cristal transparente e uma peça hemisférica que combine de goma arábica)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma esfera de energia brilhante engloba uma criatura ou\nobjeto de tamanho Grande ou menor, dentro do alcance.\nUma criatura involuntária deve realizar um teste de\nresistência de Destreza. Se falhar na resistência, a\ncriatura estará enclausurada pela duração.\nNada – nem objetos físicos, energia ou outros efeitos\nmágicos – pode passar através da barreira, para dentro\nou para fora, apesar da criatura na esfera poder respirar\nlá dentro. A esfera é imune a todos os danos e a criatura\nou objeto dentro não pode sofrer dano de ataques ou\nefeitos originados de fora, nem a criatura dentro da\nesfera, pode causar dano a nada fora dela.\nA esfera não tem peso e é grande o suficiente apenas\npara conter a criatura ou objeto dentro. Uma criatura\nenclausurada pode usar sua ação para empurrar a parede\nda esfera e, assim, rolar a esfera a metade do\ndeslocamento da criatura. Similarmente, o globo pode ser\nerguido e movido por outras criaturas.\nA magia desintegrar lançada no globo o destruirá sem\ncausar ferimentos a nada dentro dele.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 244
    }
  },
  {
    "id": "magia-espada-de-mordenkainen",
    "nome": "Espada De Mordenkainen",
    "nivel": 7,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (espada de platina em miniatura com cabo e pomo de cobre e zinco valendo, no mínimo, 250 po)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": true,
    "materialConsumido": false,
    "descricao": "Você cria um plano de energia em formato de espada que\nflutua dentro do alcance. Ela permanece pela duração.\nQuando a espada aparece, você realiza um ataque com\nmagia contra um alvo, à sua escolha, a 1,5 metro da\nespada. Se atingir, o alvo sofre 3d10 de dano de energia.\nAté a magia acabar, você pode usar uma ação bônus, em\ncada um dos seus turnos, para mover a espada até 6\nmetros para um local que você possa ver e repetir esse\nataque contra o mesmo alvo ou um diferente.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 245
    }
  },
  {
    "id": "magia-espiritos-guardioes",
    "nome": "Espíritos Guardiões",
    "nivel": 3,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "Pessoal (4,5 metros de raio)",
    "componentes": "V, S, M (um símbolo sagrado)",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você evoca espíritos para protege-lo. Eles flutuam a seu\nredor, a uma distância de 4,5 metros, pela duração. Se\nvocê for bom ou neutro, as formas espectrais deles\naparenta ser angelical ou feérica (à sua escolha). Se você\nfor mau, eles pareceram demoníacos.\nQuando você conjura essa magia, você pode designar\nqualquer quantidade de criaturas que você possa ver para\nnão serem afetadas por ela. O deslocamento de uma\ncriatura afetada é reduzido à metade na área e, quando a\ncriatura entrar na área pela primeira vez num turno ou\ncomeçar seu turno nela, ela deve realizar um teste de\nresistência de Sabedoria. Se falhar na resistência, a\ncriatura sofrerá 3d8 de dano radiante (se você for bom ou\nneutro) ou 3d8 de dano necrótico (se você for mau). Com\num sucesso na resistência, a criatura sofre metade desse\ndano.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano aumenta em 1d8 para cada nível do\nespaço acima do 3°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano aumenta em 1d8 para cada nível do\nespaço acima do 3°.",
    "classes": [
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 245
    }
  },
  {
    "id": "magia-espirro-acido",
    "nome": "Espirro Ácido",
    "nivel": 0,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você arremessa uma bolha de ácido. Escolha uma\ncriatura dentro do alcance, ou escolha duas criaturas\ndentro do alcance que estejam a 1,5 metro uma da outra.\nUm alvo deve ser bem sucedido num teste de resistência\nde Destreza ou sofrerá 1d6 de dano ácido.\nO dano dessa magia aumenta em 1d6 quando você\nalcança o 5° nível (2d6), 11° nível (3d6) e 17° nível (4d6).",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 245
    }
  },
  {
    "id": "magia-esquentar-metal",
    "nome": "Esquentar Metal",
    "nivel": 2,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (um pedaço de ferro e uma chama)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Escolha uma objeto manufaturado de metal, como uma\narma de metal ou uma armadura pesada ou média de\nmetal, que você possa ver dentro do alcance. Você faz com\nque o objeto brilhe vermelho-incandescente. Qualquer\ncriatura em contato físico com o objeto sofrerá 2d8 de\ndano de fogo quando você conjurar a magia. Até a magia\nacabar, você pode usar uma ação bônus, em cada um dos\nseus turnos subsequentes, para causar esse dano\nnovamente.\nSe uma criatura estiver segurando ou vestindo o objeto\ne sofrer o dano dele, a criatura deve ser bem sucedida\nnum teste de resistência de Constituição ou largará o\nobjeto se ela puder. Se ela não largar o objeto, ela terá\ndesvantagem em jogadas de ataque e testes de habilidade\naté o início do seu próximo turno.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, o dano aumenta em 1d8 para cada nível do\nespaço acima do 2°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, o dano aumenta em 1d8 para cada nível do\nespaço acima do 2°.",
    "classes": [
      "Bardo",
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 246
    }
  },
  {
    "id": "magia-estabilizar",
    "nome": "Estabilizar",
    "nivel": 0,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca uma criatura viva que esteja com 0 pontos de\nvida. A criatura é estabilizada. Essa magia não afeta\nmortos-vivos ou constructos.",
    "escalonamento": "",
    "classes": [
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 246
    }
  },
  {
    "id": "magia-explosao-solar",
    "nome": "Explosão Solar",
    "nivel": 8,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "45 metros",
    "componentes": "V, S, M (fogo e um pedaço de pedra do sol)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Luz solar brilhante lampeja num raio de 18 metros,\ncentrada num ponto, à sua escolha, dentro do alcance.\nCada criatura nessa luz, deve realizar um teste de\nresistência de Constituição. Com uma falha na\nresistência, uma criatura sofrerá 12d6 de dano radiante e\nficará cega por 1 minuto. Se obtiver sucesso na\nresistência, ela sofrerá metade desse dano e não ficará\ncega por essa magia. Mortos-vivos e limos tem\ndesvantagem nos seus testes de resistência.\nUma criatura cega por essa magia faz outro teste de\nresistência de Constituição no final de cada um dos\nturnos dela. Se obtiver sucesso, ela não estará mais cega.\nEssa magia dissipa qualquer escuridão na área dela\nque tenha sido criada por um magia.",
    "escalonamento": "",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 246
    }
  },
  {
    "id": "magia-fabricar",
    "nome": "Fabricar",
    "nivel": 4,
    "escola": "transmutação",
    "tempo": "10 minutos",
    "alcance": "36 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você converte matéria-prima em produtos do mesmo\nmaterial. Por exemplo, você pode construir uma ponte de\nmadeira usando um amontoado de árvores, uma corda de\num pedaço de cânhamo e roupas usando linho ou lã.\nEscolha matérias-primas que você possa ver, dentro do\nalcance. Você pode fabricar um objeto Grande ou menor\n(contido em 3 metros cúbicos ou em oito cubos de 1,5\nmetro conectados), tendo uma quantidade suficiente de\nmatéria-prima. Se você estiver trabalhando com metal,\npedra ou outra substância mineral, no entanto, o objeto\nfabricado não pode ser maior que Médio (contido em\napenas 1,5 metro cúbico). A quantidade de objetos feitos\npor essa magia é proporcional com a quantidade de\nmatéria-prima.\nCriaturas ou itens mágicos não podem ser criados ou\ntransmutados por essa magia. Você também não pode\nusá-la para criar itens que, geralmente, requerem um alto\ngrau de perícia, como joalheria, armas, vidros ou\narmaduras, a não ser que você tenha proficiência com o\ntipo de ferramenta de artesanato usada para construir\ntais objetos.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 246
    }
  },
  {
    "id": "magia-falar-com-animais",
    "nome": "Falar Com Animais",
    "nivel": 1,
    "escola": "adivinhação",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V, S",
    "duracao": "10 minutos",
    "ritual": true,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você adquire a habilidade de compreender e se comunicar\nverbalmente com bestas, pela duração. O conhecimento e\nconsciência de muitas bestas é limitado pela inteligência\ndelas mas, no mínimo, as bestas poderão dar informações\na você sobre os locais e monstros próximos, incluindo tudo\nque eles possam perceber ou tenham percebido no dia\nanterior. Você pode tentar persuadir uma besta a lhe\nprestar um favor, à critério do Mestre.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 246
    }
  },
  {
    "id": "magia-falar-com-os-mortos",
    "nome": "Falar Com Os Mortos",
    "nivel": 3,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "3 metros",
    "componentes": "V, S, M (incenso aceso)",
    "duracao": "10 minutos",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você concede o aspecto de vida e inteligência a um corpo,\nà sua escolha, dentro do alcance, permitindo que ele\nresponda as perguntas que você fizer. O corpo ainda deve\npossuir uma boca e não pode ser um morto-vivo. A magia\nfalha se o corpo já tiver sido alvo dessa magia nos últimos\n10 dias.\nAté a magia acabar, você pode fazer ao corpo até cinco\nperguntas. O corpo sabe apenas o que ele sabia em vida,\nincluindo o idioma que ele conhecia. As respostas\nnormalmente são breves, enigmáticas ou repetitivas e o\ncorpo não está sob nenhuma compulsão que o obrigue a\noferecer respostas verdadeiras se você for hostil a ele ou\nse ele reconhecer você como um inimigo. Essa magia não\ntraz a alma da criatura de volta ao corpo, apenas anima\nseu espírito. Portanto, o corpo não pode aprender novas\ninformações, não compreende nada que tenha acontecido\ndepois da sua morte e não pode especular sobre eventos\nfuturos.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 246
    }
  },
  {
    "id": "magia-falar-com-plantas",
    "nome": "Falar Com Plantas",
    "nivel": 3,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "Pessoal (9 metros de raio)",
    "componentes": "V, S",
    "duracao": "10 minutos",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você imbui as plantas a até 9 metros de você com\nconsciência e animação limitadas, dando-lhes a\nhabilidade de se comunicar com você e seguir seus\ncomandos simples. Você pode perguntar as plantas sobre\neventos na área da magia, acontecidos desde o dia\nanterior, recebendo informações sobre criaturas que\npassaram, clima e outras circunstâncias.\nVocê também pode tornar terreno difícil causado pelo\ncrescimento de plantas (como arbustos e vegetação\nrasteira) em terreno normal, permanecendo assim pela\nduração. Ou você pode tornar terreno normal onde as\nplantas estiverem presentes, em terreno difícil,\npermanecendo assim pela duração, fazendo as vinhas e\nramos atrasarem perseguidores, por exemplo.\nAs plantas podem ser capazes de realizar outras\ntarefas em seu favor, à critério do Mestre. A magia não\npermite que as plantas desenraizem-se e se movam, mas\nelas podem mover, livremente, seus ramos, galhos e\ncaules.\nSe uma criatura planta estiver na área, você pode se\ncomunicar com ela se você partilhar um idioma em\ncomum, mas você não recebe qualquer habilidade mágica\npara influencia-la.\nEssa magia pode fazer as plantas criadas pela magia\nconstrição soltarem uma criatura impedida.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 246
    },
    "errata": "PDF p.246 repete metadados de Falar com Animais; reconciliado com listas p.209/211/214 e SRD 5.1."
  },
  {
    "id": "magia-flecha-acida-de-melf",
    "nome": "Flecha Ácida De Melf",
    "nivel": 2,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S, M (folha de ruibarbo em pó e o estômago de uma víbora)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma flecha esverdeada cintilante voa em direção de um\nalvo dentro do alcance e explode em um jato de ácido.\nFaça um ataque à distância com magia contra o alvo. Se\natingir, o alvo sofre 4d4 de dano de ácido imediatamente e\n2d4 de dano de ácido no final do próximo turno dele. Se\nerrar, a flecha salpica o alvo com ácido, causando metade\ndo dano inicial e nenhum dano no final do próximo turno\ndele.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, o dano (tanto inicial quanto posterior) aumenta\nem 1d4 para cada nível do espaço acima do 2°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, o dano (tanto inicial quanto posterior) aumenta\nem 1d4 para cada nível do espaço acima do 2°.",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 247
    }
  },
  {
    "id": "magia-flecha-relampejante",
    "nome": "Flecha Relampejante",
    "nivel": 3,
    "escola": "transmutação",
    "tempo": "1 ação bônus",
    "alcance": "Pessoal",
    "componentes": "V, S",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Da próxima vez que você realizar um ataque com uma\narma à distância enquanto a magia durar, a munição da\narma ou a própria arma, se ela for uma arma de\narremesso, se transforma num relâmpago. Realize uma\njogada de ataque normal. O alvo sofre 4d8 de dano\nelétrico se atingir ou metade desse dano se errar, ao invés\ndo dano normal da arma.\nIndependentemente de você acertar ou errar, cada\ncriatura a até 3 metros do alvo deve realizar um teste de\nresistência de Destreza. Cada uma dessas criaturas sofre\n2d8 de dano elétrico se falhar na resistência ou metade\ndesse dano se obtiver sucesso.\nA munição ou arma então, volta a sua forma normal.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano de ambos os efeitos da magia aumenta\nem 1d8 para cada nível do espaço acima do 3°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano de ambos os efeitos da magia aumenta\nem 1d8 para cada nível do espaço acima do 3°.",
    "classes": [
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 247
    }
  },
  {
    "id": "magia-fogo-das-fadas",
    "nome": "Fogo Das Fadas",
    "nivel": 1,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Cada objeto num cubo de 6 metros dentro do alcance fica\ndelineado com luz azul, verde ou violeta (à sua escolha).\nQualquer criatura na área, quando a magia é conjurada,\ntambém fica delineada com luz, se falhar num teste de\nresistência de Destreza. Pela duração, os objetos e\ncriaturas afetadas emitem penumbra num raio de 3\nmetros.\nQualquer jogada de ataque contra uma criatura\nafetada ou objeto tem vantagem, se o atacante puder ver\no alvo e, a criatura afetada ou objeto não recebe benefício\npor estar invisível.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 247
    }
  },
  {
    "id": "magia-fome-de-hadar",
    "nome": "Fome De Hadar",
    "nivel": 3,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "45 metros",
    "componentes": "V, S, M (um tentáculo de polvo em conserva)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você abre um portal para a escuridão entre as estrelas,\numa região infestada de horrores desconhecidos. Uma\nesfera de 6 metros de raio de negritude e frio severo\naparece, centrada num ponto dentro do alcance, e\npermanece pela duração. Esse vazio está preenchido por\numa cacofonia de sussurros suaves e barulhos de rangidos\nque podem ser ouvidos a até 9 metros. Nenhuma luz,\nmágica ou qualquer que seja, pode iluminar a área e as\ncriaturas totalmente dentro da área estarão cegas.\nO vazio cria uma dobra no tecido do espaço e a área é\nde terreno difícil. Qualquer criatura que começar seu\nturno na área sofre 2d6 de dano de frio. Qualquer\ncriatura que terminar seu turno na área, deve ser bem\nsucedida num teste de resistência de Destreza ou sofrerá\n2d6 de dano de ácido, à medida que tentáculos leitosos\nextraterrestres se esfregam contra ela.",
    "escalonamento": "",
    "classes": [
      "Bruxo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 247
    }
  },
  {
    "id": "magia-forca-fantasmagorica",
    "nome": "Força Fantasmagórica",
    "nivel": 2,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (um pouco de lã)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você constrói uma ilusão que se enraíza na mente de uma\ncriatura que você possa ver, dentro do alcance. O alvo\ndeve realizar um teste de resistência de Inteligência. Se\nfalhar na resistência, você cria um objeto, criatura ou\noutro fenômeno visível – porém, fantasmagórico – à sua\nescolha, com não mais de 3 metros cúbicos e que será\npercebido apenas pelo alvo, pela duração. Essa magia não\nafeta mortos-vivos ou constructos.\nO fantasma inclui som, temperatura e outros\nestímulos, também evidentes apenas para o alvo.\nO alvo pode usar sua ação para examinar o fantasma\ncom um teste de Inteligência (Investigação) contra a CD\nda as magia. Se for bem sucedido, o alvo percebe que o\nfantasma é uma ilusão e a magia acaba.\nEnquanto o alvo estiver sob efeito dessa magia, ele\nconsiderará o fantasma como sendo real. O alvo\nracionalizará quaisquer resultados ilógicos ao interagir\ncom o fantasma. Por exemplo, um alvo tentado atravessar\numa ponte fantasmagórica que atravesse um abismo,\ncairá quando pisar na ponte. Se o alvo sobreviver a queda,\nele ainda acreditará que a ponte existe e procurará outra\nexplicação para a sua queda – ele foi puxado, ele\nescorregou ou um vento forte pode ter o jogado pra fora.\nUm alvo afetado está tão convencido da realidade do\nfantasma que pode até mesmo sofrer dano da ilusão. Um\nfantasma criado para se parecer com uma criatura pode\natacar o alvo. Similarmente, um fantasma criado para se\nparecer com fogo, um poço de ácido ou lava, podem\nqueimar o alvo. A cada rodada, no seu turno, o fantasma\npode causar 1d6 de dano psíquico no alvo, se ele estiver\nna área do fantasma ou a 1,5 metro dele, considerando\nque a ilusão é de uma criatura ou perigo que,\nlogicamente, possa causar dano, como por atacar. O alvo\nentende o dano como sendo de um tipo apropriado para a\nilusão.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 247
    }
  },
  {
    "id": "magia-forjar-morte",
    "nome": "Forjar Morte",
    "nivel": 3,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (uma pitada de terra de cemitério)",
    "duracao": "1 hora",
    "ritual": true,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca uma criatura voluntária e a coloca em um\nestado catatônico que é indistinguível da morte.\nPela duração da magia, ou até você usar uma ação\npara tocar o alvo e dissipar a magia, o alvo aparenta estar\nmorto para todas as inspeções externas e para magias\nusadas para determinar a condição do alvo. O alvo está\ncego e incapacitado e seu deslocamento cai para 0. O alvo\ntem resistência a todos os danos, exceto dano psíquico. Se\no alvo estava doente ou envenenado quando você conjurou\na magia, ou ficou doente ou envenenado durante o período\nem que estava sob efeito da magia, a doença e veneno não\nterá qualquer efeito até a magia terminar.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 248
    }
  },
  {
    "id": "magia-forma-eterea",
    "nome": "Forma Etérea",
    "nivel": 7,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V, S",
    "duracao": "até 8 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você dá um passo para dentro das fronteiras do Plano\nEtéreo, na área em que ele se sobrepõem com o seu plano\natual. Você se mantem na Fronteira Etérea pela duração\nou até você usar sua ação para dissipar a magia. Durante\nesse período, você pode se mover para qualquer direção.\nSe você se mover para cima ou para baixo, cada passo de\ndeslocamento custa um passo extra. Você pode ver e ouvir\no plano que você se originou, mas tudo parece cinzento e\nvocê não pode ver nada além de 18 metros de você.\nEnquanto estiver no Plano Etéreo, você pode afetar e\nser afetado apenas por criaturas nesse plano. As criaturas\nque não estiverem no Plano Etéreo não podem notar sua\npresença e não podem interagir com você, a menos que\numa habilidade especial ou magia dê a elas a capacidade\nde fazê-lo.\nVocê ignora todos os objetos e efeitos que não\nestiverem no Plano Etéreo, permitindo que você se mova\natravés de objetos que você perceba no plano de onde você\nveio.\nQuando a magia acabar, você imediatamente retorna\npara o plano de onde você se originou, no lugar que você\nestá ocupando atualmente. Se você estiver ocupando o\nmesmo espaço de um objeto sólido ou de uma criatura\nquando isso ocorrer, você é, imediatamente, desviado para\no espaço desocupado mais próximo que você puder ocupar\ne sofre dano de energia igual a dez vezes a quantidade de\nquadrados de 1,5 metro que você foi movido.\nEssa magia não tem efeito se você conjura-la enquanto\nestiver no Plano Etéreo ou um plano que não faça\nfronteira com ele, como um dos Planos Exteriores.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 8° nível ou\nsuperior, você pode afetar até três criaturas voluntária\n(incluindo você) para cada nível do espaço acima do 7°. As\ncriaturas devem estar a até 3 metros de você quando você\nconjurar a magia.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 8° nível ou\nsuperior, você pode afetar até três criaturas voluntária\n(incluindo você) para cada nível do espaço acima do 7°. As\ncriaturas devem estar a até 3 metros de você quando você\nconjurar a magia.",
    "classes": [
      "Bardo",
      "Bruxo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 248
    }
  },
  {
    "id": "magia-forma-gasosa",
    "nome": "Forma Gasosa",
    "nivel": 3,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (um pouco de gaze e um pouco de fumaça)",
    "duracao": "Concentração, até 1 hora",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você transforma uma criatura voluntária que você tocar,\njunto com tudo que ela estiver vestindo e carregando, em\numa nuvem nebulosa, pela duração. A magia termina se a\ncriatura cair a 0 pontos de vida. Uma criatura incorpórea\nnão pode ser afetada.\nEnquanto estiver nessa forma, o único meio de\nmovimentação do alvo é 3 metros de deslocamento de voo.\nO alvo pode entrar e ocupar o espaço de outra criatura. O\nalvo tem resistência a dano não-mágico e tem vantagem\nem testes de resistência de Força, Destreza e\nConstituição. O alvo pode passar através de pequenos\nburacos, aberturas estreitas e, até mesmo, meras\nrachaduras, embora ele trate líquidos como se fossem\nsuperfícies sólidas. O alvo não pode cair e se mantem\nflutuando no ar, mesmo se estiver atordoado ou\nincapacitado de alguma outra forma.\nEnquanto estiver na forma de uma nuvem nebulosa, o\nalvo não pode falar ou manipular objetos e, quaisquer\nobjetos que ele estava carregando ou segurando não pode\nser derrubado, usado ou, de outra forma, interagido. O\nalvo não pode atacar ou conjurar magias.",
    "escalonamento": "",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 248
    }
  },
  {
    "id": "magia-formas-animais",
    "nome": "Formas Animais",
    "nivel": 8,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S",
    "duracao": "Concentração, até 24 horas",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Sua magia transforma você em bestas. Escolha qualquer\nquantidade de criaturas voluntárias que você possa ver, o\nalcance. Você muda cada alvo para a forma de uma besta\nGrande ou menor, com um nível de desafio de 4 ou\ninferior. Nos turnos subsequentes, você pode usar sua\nação para mudar uma criatura afetada para uma nova\nforma.\nA transformação permanece pela duração para cada\nalvo, ou até o alvo cair para 0 pontos de vida ou morrer.\nVocê pode escolher uma forma diferente para cada alvo.\nAs estatísticas de jogo do alvo são substituídas pelas\nestatísticas da besta escolhida, mas o alvo mantem sua\ntendência e valores de Inteligência, Sabedoria e Carisma.\nO alvo adquire os pontos de vida da sua nova forma, e\nquando ele reverte para sua forma normal, ele volta aos\npontos de vida que tinha antes de ser transformado. Se\nele reverter como resultado de ter caído a 0 pontos de\nvida, todo dano excedente é recebido pela sua forma\nnormal. Contanto que o dano excedente não reduza os\npontos de vida da forma normal da criatura a 0, ela não\ncairá inconsciente. A criatura é limitada em suas ações\npela natureza da sua nova forma e ela não pode falar nem\nconjurar magias.\nO equipamento do alvo mescla-se a sua nova forma. O\nalvo não pode ativar, empunhar ou, de outra forma, se\nbeneficiar de qualquer de seus equipamentos.",
    "escalonamento": "",
    "classes": [
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 248
    }
  },
  {
    "id": "magia-glifo-de-vigilancia",
    "nome": "Glifo De Vigilância",
    "nivel": 3,
    "escola": "abjuração",
    "tempo": "1 hora",
    "alcance": "Toque",
    "componentes": "V, S, M (incenso e pó de diamante valendo, no mínimo, 200 po, consumidos pela magia)",
    "duracao": "Até ser dissipada ou ativada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Quando você conjura essa magia, você inscreve um glifo\nnão necessariamente nocivo, tanto sobre uma superfície\n(como uma mesa ou uma secção de piso ou parede) quanto\ndentro de um objeto que possa ser fechado (como um livro,\num pergaminho ou um baú de tesouro) para ocultar o\nglifo. O glifo pode cobrir uma área que não seja superior a\n3 metros de diâmetro. Se a superfície ou objeto for movido\nmais de 3 metros de onde você conjurou essa magia, o\nglifo se quebra e a magia termina sem ser ativada.\nO glifo é quase invisível e requer um teste de\nInteligência (Investigação) contra a CD da magia para ser\nencontrado.\nVocê define o que ativa o glifo quando você conjura a\nmagia. Para glifos inscritos em uma superfície, os gatilhos\nmais típicos incluem tocar ou ficar sobre o glifo, remover\noutro objeto cobrindo o glifo, aproximar-se a uma certa\ndistância do glifo ou manipular um objeto onde o glifo\nesteja inscrito. Para glifos inscritos dentro de objetos, os\ngatilhos mais comuns incluem abrir o objeto, aproximar-\nse a uma certa distância do objeto ou ver ou ler o glifo.\nUma vez que o glifo seja ativado, a magia termina.\nVocê pode, posteriormente, aperfeiçoar o gatilho para\nque a magia se ative apenas sob certas circunstâncias ou\nde acordo com as características físicas (como altura ou\npeso), tipo de criatura (por exemplo, a proteção poderia\nser definida para afetar aberrações ou drow) ou\ntendência. Você pode, também, definir condições para\ncriaturas não ativarem o glifo, como aqueles que falarem\ndeterminada senha.\nQuando você inscreve o glifo, escolha runas explosivas\nou glifo de magia.\nRunas Explosivas. Quando ativado, o glifo irrompe\ncom energia mágica numa esfera com 6 metros de raio,\ncentrada no glifo. A esfera se espalha, dobrando esquinas.\nCada criatura na área deve realizar um teste de\nresistência de Destreza. Uma criatura sofre 5d8 de dano\nde ácido, elétrico, fogo, frio ou trovejante se falhar no\nteste de resistência (você escolhe o tipo quando cria o\nglifo) ou metade desse dano se obtiver sucesso.\nGlifo de Magia. Você pode armazenar uma magia\npreparada de 3° nível ou inferior no glifo ao conjura-la\ncomo parte da criação do glifo. A magia a ser armazenada\nnão tem efeito imediato quando conjurada dessa forma.\nQuando o glifo for ativado, a magia armazenada é\nconjurada. Se a magia tiver um alvo, esse alvo será a\ncriatura que ativou o glifo. Se a magia afetar uma área, a\nárea será centrada na criatura. Se a magia invocar\ncriaturas hostis ou criar objetos ou armadilhas nocivos,\neles aparecerão o mais próximo possível do intruso e o\natacarão. Se a magia precisar de concentração, ela dura o\nmáximo possível da sua duração.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano do glifo de runas explosivas aumenta em\n1d8 para cada nível do espaço acima do 3°. Se você criar\num glifo de magia, você pode armazenar qualquer magia\ndo mesmo nível, ou inferior, do espaço que você usar para\no glifo de vigilância.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano do glifo de runas explosivas aumenta em\n1d8 para cada nível do espaço acima do 3°. Se você criar\num glifo de magia, você pode armazenar qualquer magia\ndo mesmo nível, ou inferior, do espaço que você usar para\no glifo de vigilância.",
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 249
    }
  },
  {
    "id": "magia-globo-de-invulnerabilidade",
    "nome": "Globo De Invulnerabilidade",
    "nivel": 6,
    "escola": "abjuração",
    "tempo": "1 ação",
    "alcance": "Pessoal (3 metros de raio)",
    "componentes": "V, S, M (uma perola de vidro ou cristal que se despedaça quando a magia termina)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma barreira imóvel, levemente cintilante, surge do nada\nnum raio de 3 metros centrado em você e permanece pela\nduração.\nQualquer magia de 5° nível ou inferior conjurada de\nfora da barreira não poderá afetar as criaturas ou objetos\ndentro dela, mesmo que a magia seja conjurada usando\num espaço de magia de nível superior. Tais magias podem\nter como alvo criaturas e objetos dentro da barreira, mas\na magia não produz nenhum efeito neles. Similarmente, a\nárea dentro da barreira é excluída das áreas afetadas por\ntais magias.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 7° nível ou\nsuperior, a barreira bloqueia magias de um nível superior\npara cada nível do espaço acima do 6°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 7° nível ou\nsuperior, a barreira bloqueia magias de um nível superior\npara cada nível do espaço acima do 6°.",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 249
    }
  },
  {
    "id": "magia-globos-de-luz",
    "nome": "Globos De Luz",
    "nivel": 0,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S, M (um pouco de fósforo ou wychwood ou um inseto luminoso)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria até quatro luzes do tamanho de tochas dentro\ndo alcance, fazendo-as parecerem tochas, lanternas ou\nesferas luminosas que flutuam no ar pela duração. Você\ntambém pode combinar as quatro luzes em uma forma\nluminosa, vagamente humanoide, de tamanho Médio.\nQualquer que seja a forma que você escolher, cada luz\nproduz penumbra num raio de 3 metros.\nCom uma ação bônus, no seu turno, você pode mover\nas luzes, até 18 metros, para um novo local dentro do\nalcance. Uma luz deve estar a, pelo menos, 6 metros de\noutra luz criada por essa magia e uma luz some se\nexceder o alcance da magia.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 249
    }
  },
  {
    "id": "magia-golpe-constritor",
    "nome": "Golpe Constritor",
    "nivel": 1,
    "escola": "conjuração",
    "tempo": "1 ação bônus",
    "alcance": "Pessoal",
    "componentes": "V",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Da próxima vez que você atingir uma criatura com um\nataque com arma, antes do final da magia, um\nemaranhado maciço de vinhas espinhentas aparecem no\nlocal do impacto e o alvo deve ser bem sucedido num teste\nde resistência de Força ou ficará impedido pelas vinhas\nmágicas, até o fim da magia. Uma criatura Grande ou\nmaior tem vantagem no seu teste de resistência. Se o alvo\nfor bem sucedido na resistência, as vinhas murcharão.\nEnquanto estiver impedido pela magia, um alvo sofre\n1d6 de dano perfurante no início de cada um dos turnos\ndele. Uma criatura impedida pelas vinhas ou uma que\npossa tocar a criatura, pode usar sua ação para realizar\num teste de Força contra a CD da magia. Num sucesso, o\nalvo é libertado.\nEm Níveis Superiores. Se você conjurar essa magia\nusando um espaço de magia de 2° nível ou superior, o\ndano aumenta em 1d6 para cada nível do espaço acima do\n1°.",
    "escalonamento": "Se você conjurar essa magia\nusando um espaço de magia de 2° nível ou superior, o\ndano aumenta em 1d6 para cada nível do espaço acima do\n1°.",
    "classes": [
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 249
    }
  },
  {
    "id": "magia-guardiao-da-fe",
    "nome": "Guardião Da Fé",
    "nivel": 4,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V",
    "duracao": "8 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um guardião espectral Grande aparece e flutua, pela\nduração, em um espaço desocupado, à sua escolha, que\nvocê possa ver dentro do alcance. O guardião ocupa esse\nespaço e é indistinto, exceto por uma espada reluzente e\num escudo brasonado com o símbolo da sua divindade.\nQualquer criatura hostil a você que se mover para um\nespaço a até 3 metros do guardião pela primeira vez em\num turno, deve ser bem sucedida num teste de resistência\nde Destreza. A criatura sofre 20 de dano radiante se\nfalhar na resistência ou metade desse dano se obtiver\nsucesso. O guardião desaparece após ter causado um total\nde 60 de dano.",
    "escalonamento": "",
    "classes": [
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 250
    }
  },
  {
    "id": "magia-heroismo",
    "nome": "Heroísmo",
    "nivel": 1,
    "escola": "encantamento",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma criatura voluntária que você tocar é imbuída com\nbravura. Até a magia acabar, a criatura é imune a ser\namedrontada e ganha pontos de vida temporários igual ao\nseu modificador de habilidade de conjuração, no início de\ncada turno dela. Quando a magia acabar, o alvo perde\nqualquer ponto de vida temporário restante dessa magia.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, você pode afetar uma criatura adicional para\ncada nível do espaço acima do 1°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, você pode afetar uma criatura adicional para\ncada nível do espaço acima do 1°.",
    "classes": [
      "Bardo",
      "Paladino"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 250
    }
  },
  {
    "id": "magia-identificacao",
    "nome": "Identificação",
    "nivel": 1,
    "escola": "adivinhação",
    "tempo": "1 minuto",
    "alcance": "Toque",
    "componentes": "V, S, M (uma perola valendo, no mínimo, 100 po e uma pena de coruja)",
    "duracao": "Instantânea",
    "ritual": true,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": false,
    "descricao": "Você escolhe um objeto que você deve tocar durante toda\na conjuração da magia. Se ele for um item mágico ou\nalgum outro objeto imbuído por magia, você descobre suas\npropriedades e como usá-lo, se exige sintonia para ser\nusado e quantas cargas ele tem, se aplicável. Você\ndescobre se quaisquer magias estão afetando o item e\nquais eles são. Se o item foi criado por magia, você\ndescobre que magia o criou.\nSe você, ao invés, tocar uma criatura durante toda a\nconjuração, você descobre quais magias, se houver\nalguma, estão afetando-a atualmente.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 250
    }
  },
  {
    "id": "magia-idiomas",
    "nome": "Idiomas",
    "nivel": 3,
    "escola": "adivinhação",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, M (uma pequena estátua de argila de um zigurate)",
    "duracao": "1 hora",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia garante a criatura que você tocar a\nhabilidade de compreender e falar o idioma que ela ouvir.\nAlém disso, quando o alvo fala, qualquer criatura que\nsaiba, pelo menos, um idioma pode ouvir o alvo e\ncompreender o que ele diz.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 250
    }
  },
  {
    "id": "magia-ilusao-menor",
    "nome": "Ilusão Menor",
    "nivel": 0,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, M (um pouco de lã)",
    "duracao": "1 minuto",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria um som ou uma imagem de um objeto, dentro\ndo alcance, que permanece pela duração. A ilusão também\ntermina se você dissipa-la usando uma ação ou conjurar\nessa magia novamente.\nSe você criar um som, seu volume pode variar entre\num sussurro até um grito. Pode ser a sua voz, a voz de\noutrem, o rugido de um leão, batidas de tambor ou\nqualquer outro som que você quiser. O som permanece no\nmesmo volume durante toda duração ou você pode fazer\nsons distintos em momentos diferentes, antes da magia\nacabar.\nSe você criar uma imagem de um objeto – como uma\ncadeira, pegadas de lama ou um pequeno baú – ela não\npode ter mais de 1,5 metro cúbico. A imagem não pode\nproduzir som, luz, cheiro ou qualquer outro efeito\nsensorial. Interação física com a imagem revelará que ela\né uma ilusão, já que as coisas podem atravessa-la.\nSe uma criatura usar sua ação para examinar a\nimagem, ela pode determinar que ela é uma ilusão se\nobtiver sucesso num teste de Inteligência (Investigação)\ncontra a CD da magia. Se uma criatura discernir a ilusão\ncomo sendo isso, a ilusão se tornará suave para a\ncriatura.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 250
    }
  },
  {
    "id": "magia-ilusao-programada",
    "nome": "Ilusão Programada",
    "nivel": 6,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S, M (um pouco de lã e pó de jade valendo, no mínimo, 25 po)",
    "duracao": "Até ser dissipada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": false,
    "descricao": "Você cria uma ilusão de um objeto, uma criatura ou de\nalgum outro fenômeno visível, dentro do alcance, que se\nativa quando uma condição especifica ocorre. A ilusão é\nimperceptível até esse momento. Ela não pode ter mais de\n9 metros cúbicos e você decide, quando conjura a magia,\ncomo a ilusão se comporta e quais sons ela faz. Essa\nperformance roteirizada por durar até 5 minutos.\nQuando a condição que você especificou ocorrer, a\nilusão surge do nada e age da maneira que você\ndescreveu. Uma vez que a ilusão tenha acabado de agir,\nela desaparece e permanece dormente por 10 minutos.\nApós desse período, a ilusão pode se ativar novamente.\nA condição de ativação pode ser tão genérica ou tão\ndetalhada quando você quiser, apesar de ela precisar ser\nbaseada em condições visuais ou audíveis que ocorram a\naté 9 metros da área. Por exemplo, você poderia criar uma\nilusão, de si mesmo, que aparecerá e avisará a outros que\ntentarem abrir a porta com armadilha ou você pode\nprogramar a ilusão para se ativar apenas quando uma\ncriatura disser a palavra ou frase correta.\nInteração física com a imagem revelará ela como sendo\numa ilusão, já que as coisas podem atravessa-la. Uma\ncriatura que usar sua ação para examinar a imagem,\npode determinar que ela é uma ilusão sendo bem sucedida\nnum teste de Inteligência (Investigação) contra a CD da\nmagia para desacredita-la. Se a criatura discernir a\nilusão como ela é, a criatura poderá ver através da\nimagem e qualquer barulho que ela fizer soará oco para a\ncriatura.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 250
    }
  },
  {
    "id": "magia-imagem-maior",
    "nome": "Imagem Maior",
    "nivel": 3,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S, M (um pedaço de lã)",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria uma imagem de um objeto, uma criatura ou\nalgum outro fenômeno visível que não tenha mais de 6\nmetros cúbicos. A imagem aparece em um local que você\npossa ver, dentro do alcance e permanece pela duração.\nEla parece completamente real, incluindo sons, cheiros e\ntemperatura apropriados para a coisa retratada. Você não\npode criar calo ou frio suficiente para causar dano, um\nsom alto o suficiente para causar dano trovejante ou\nensurdecer uma criatura ou um cheiro que poderia\nnausear uma criatura (como o fedor de um troglodita).\nEnquanto você estiver dentro do alcance da ilusão,\nvocê pode usar sua ação pra fazer a imagem se mover\npara qualquer outro local dentro do alcance. À medida\nque a imagem muda de lugar, você pode alterar a\naparência dela para que seu movimento pareça ser o\nnatural para a imagem. Por exemplo, se você criar uma\nimagem de uma criatura e move-la, você pode alterar a\nimagem para que ela pareça estar andando.\nSimilarmente, você pode fazer a ilusão emitir sons\ndiferentes em momentos diferentes, sendo possível até\nmesmo manter uma conversa, por exemplo.\nInteração física com a imagem, revelará que ela é uma\nilusão, já que as coisas podem passar através dela. Uma\ncriatura que usar sua ação para examinar a imagem,\npode determinar que ela é uma ilusão com um teste de\nInteligência (Investigação) bem sucedido contra a CD da\nmagia. Se uma criatura discernir a ilusão como sendo\nisso, a criatura verá através da imagem e suas outras\nqualidades sensoriais se tornaram suaves para a criatura.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 6° nível ou\nsuperior, a magia irá durar até ser dissipada, sem\nnecessitar da sua concentração.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 6° nível ou\nsuperior, a magia irá durar até ser dissipada, sem\nnecessitar da sua concentração.",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 252
    }
  },
  {
    "id": "magia-imagem-silenciosa",
    "nome": "Imagem Silenciosa",
    "nivel": 1,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (um pouco de lã)",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria a imagem de um objeto, criatura ou outro\nfenômeno visual que não tenha mais de 4,5 metros\ncúbicos. A imagem aparece num ponto, dentro do alcança,\ne permanece pela duração. A imagem é puramente visual;\nnão é acompanhada por som, cheiro ou outros efeitos\nsensoriais.\nVocê pode usar sua ação para fazer a imagem se\nmover para qualquer ponto, dentro do alcance. À medida\nque a imagem muda de lugar, você pode alterar a\naparência dela para que seu movimento pareça ser o\nnatural para a imagem. Por exemplo, se você criar uma\nimagem de uma criatura e move-la, você pode alterar a\nimagem para que ela pareça estar andando.\nInteração física com a imagem, revelará que ela é uma\nilusão, já que as coisas podem passar através dela. Uma\ncriatura que usar sua ação para examinar a imagem,\npode determinar que ela é uma ilusão com um teste de\nInteligência (Investigação) bem sucedido contra a CD da\nmagia. Se uma criatura discernir a ilusão como sendo\nisso, a criatura poderá ver através da imagem.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 252
    }
  },
  {
    "id": "magia-imobilizar-monstro",
    "nome": "Imobilizar Monstro",
    "nivel": 5,
    "escola": "encantamento",
    "tempo": "1 ação",
    "alcance": "27 metros",
    "componentes": "V, S, M (uma pequena peça de ferro reta)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Escolha uma criatura que você possa ver, dentro do\nalcance. O alvo deve ser bem sucedido num teste de\nresistência de Sabedoria ou ficará paralisado pela\nduração. Essa magia não tem efeito em mortos-vivos. No\nfinal de cada um dos turnos dele, o alvo pode realizar\noutro teste de resistência de Sabedoria. Se obtiver\nsucesso, a magia termina no alvo.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 6° nível ou\nsuperior, você pode afetar uma criatura adicional para\ncada nível de magia acima do 5°. As criaturas devem\nestar a 9 metros entre si para serem afetadas.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 6° nível ou\nsuperior, você pode afetar uma criatura adicional para\ncada nível de magia acima do 5°. As criaturas devem\nestar a 9 metros entre si para serem afetadas.",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 252
    }
  },
  {
    "id": "magia-imobilizar-pessoa",
    "nome": "Imobilizar Pessoa",
    "nivel": 2,
    "escola": "encantamento",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (uma pequena peça de ferro reta)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Escolha um humanoide que você possa ver, dentro do\nalcance. O alvo deve ser bem sucedido num teste de\nresistência de Sabedoria ou ficará paralisado pela\nduração. Essa magia não tem efeito em mortos-vivos. No\nfinal de cada um dos turnos dele, o alvo pode realizar\noutro teste de resistência de Sabedoria. Se obtiver\nsucesso, a magia termina no alvo.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, você pode afetar um humanoide adicional para\ncada nível de magia acima do 2°. Os humanoides devem\nestar a 9 metros entre si para serem afetados.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, você pode afetar um humanoide adicional para\ncada nível de magia acima do 2°. Os humanoides devem\nestar a 9 metros entre si para serem afetados.",
    "classes": [
      "Bardo",
      "Bruxo",
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 252
    }
  },
  {
    "id": "magia-infligir-ferimentos",
    "nome": "Infligir Ferimentos",
    "nivel": 1,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Faça um ataque corpo-a-corpo com magia contra uma\ncriatura dentro do alcance. Se atingir, o alvo sofre 3d10\nde dano necrótico.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d10 para cada nível acima\ndo 1°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d10 para cada nível acima\ndo 1°.",
    "classes": [
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 252
    }
  },
  {
    "id": "magia-inseto-gigante",
    "nome": "Inseto Gigante",
    "nivel": 4,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você transforma até dez centopeias, três aranhas, cinco\nvespas ou um escorpião, dentro do alcance, em versões\ngigantes das suas formas naturais, pela duração. Uma\ncentopeia se torna uma centopeia gigante, uma aranha se\ntorna uma aranha gigante, uma vespa se torna uma\nvespa gigante e um escorpião se torna um escorpião\ngigante.\nCada criatura obedece aos seus comando verbais e, em\ncombate, elas agem no seu turno a cada rodada. O Mestre\npossui as estatísticas dessas criaturas e determina suas\nações e movimentação.\nUma criatura permanece no tamanho gigante pela\nduração, ou até cair a 0 pontos de vida ou até você usar\nsua ação para dissipar o efeito nela.\nO Mestre pode permitir que você escolha alvos\ndiferentes. Por exemplo, se você transformar uma abelha,\nsua versão gigante poderia ter as mesmas estatísticas da\nvespa gigante.",
    "escalonamento": "",
    "classes": [
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 252
    }
  },
  {
    "id": "magia-inverter-a-gravidade",
    "nome": "Inverter A Gravidade",
    "nivel": 7,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "30 metros",
    "componentes": "V, S, M (um ímã e limalhas de ferro)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia inverte a gravidade num cilindro de 15\nmetros de raio por 30 metros de altura, centrado num\nponto dentro do alcance. Todas as criaturas e objetos que\nnão esteja, de alguma forma, presos ao solo na área, caem\npara cima e alcançam o topo da área, quando você conjura\nessa magia. Uma criatura pode fazer um teste de\nresistência de Destreza para se agarrar em algum objeto\nfixo que ela possa alcançar, assim, evitando a queda.\nSe algum objeto sólido (como um teto) for encontrado\ndurante essa queda, objetos e criaturas caindo atingem\nele, exatamente como fariam durante uma queda normal.\nSe um objeto ou criatura alcançar o topo da área sem\natingir nada, ele permanecerá lá, oscilando ligeiramente,\npela duração\nNo final da duração, objetos e criaturas afetadas caem\nde volta para baixo.",
    "escalonamento": "",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 253
    }
  },
  {
    "id": "magia-invisibilidade",
    "nome": "Invisibilidade",
    "nivel": 2,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (uma pestana envolta em goma- arábica)",
    "duracao": "Concentração, até 1 hora",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma criatura que você tocar, se torna invisível até a\nmagia acabar. Qualquer coisa que o alvo esteja vestindo\nou carregando fica invisível enquanto estiver de posse do\nalvo. A magia termina para o alvo caso ele ataque ou\nconjure uma magia.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, você pode afetar um alvo adicional para cada\nnível do espaço acima do 2°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, você pode afetar um alvo adicional para cada\nnível do espaço acima do 2°.",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 253
    }
  },
  {
    "id": "magia-invisibilidade-maior",
    "nome": "Invisibilidade Maior",
    "nivel": 4,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você ou uma criatura que você possa tocar, se torna\ninvisível até a magia acabar. Qualquer coisa que o alvo\nestiver vestindo ou carregando fica invisível enquanto\nestiver de posse do alvo.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 253
    }
  },
  {
    "id": "magia-invocacao-instantanea-de-drawmij",
    "nome": "Invocação Instantânea De Drawmij",
    "nivel": 6,
    "escola": "conjuração",
    "tempo": "1 minuto",
    "alcance": "Toque",
    "componentes": "V, S, M (uma safira no valor de 1.000 po)",
    "duracao": "Até ser dissipada",
    "ritual": true,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": false,
    "descricao": "Você toca um objeto pesando 5 quilos ou menos com maior\ndimensão de 1,8 metro ou menos. A magia deixa uma\nmarca invisível na sua superfície e grava invisivelmente o\nnome do item na safira que você usou como componente\nmaterial. A cada vez que você conjurar essa magia, você\ndeve usar uma safira diferente.\nA qualquer momento, posteriormente, você pode usar\nsua ação para falar o nome do item e esmagar a safira. O\nitem aparece instantaneamente em suas mãos,\nindependentemente de distâncias físicas ou planares, e a\nmagia termina.\nSe outra criatura estiver segurando ou carregando o\nitem, esmagar a safira não irá transportar o item até\nvocê, ao invés disso, você descobre quem é a criatura\npossuindo o objeto e onde, vagamente, a criatura está\nlocalizada no momento.\nDissipar magia ou um efeito similar aplicado com\nsucesso na safira, termina o efeito da magia.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 253
    }
  },
  {
    "id": "magia-isolamento",
    "nome": "Isolamento",
    "nivel": 7,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (um composto de pós de diamante, esmeralda, rubi e safira valendo, no mínimo, 5.000 po, consumidos pela magia)",
    "duracao": "Até ser dissipada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Através dessa magia, uma criatura voluntária ou um\nobjeto, pode ser escondido, seguro contra detecção pela\nduração. Quando você conjura essa magia e toca o alvo,\nele fica invisível e não pode ser alvo de magias de\nadivinhação ou percebido através de sensores de vidência\ncriados por magias de adivinhação.\nSe o alvo for uma criatura, ela entra num estado de\nanimação suspensa. O tempo para de fluir para ela e ela\nnão envelhece.\nVocê pode determinar uma condição para que a magia\ntermine prematuramente. A condição pode ser qualquer\ncoisa, à sua escolha, mas deve ocorrer ou ser visível a até\n1,5 quilômetro do alvo. Exemplos incluem “depois de\n1.000 anos” ou “quando o tarrasque despertar”. Essa\nmagia também acaba se o alvo sofrer qualquer dano.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 253
    }
  },
  {
    "id": "magia-labirinto",
    "nome": "Labirinto",
    "nivel": 8,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você bane uma criatura que você possa ver, dentro do\nalcance, para um semiplano labiríntico. O alvo permanece\nlá pela duração ou até escapar do labirinto.\nO alvo pode usar sua ação para tentar escapar.\nQuando o fizer, ele realiza um teste de Inteligência com\nCD 20. Se for bem sucedido, ele escapa e a magia termina\n(um minotauro ou um demônio goristro, obtém sucesso\nautomaticamente).\nQuando a magia termina, o alvo reaparece no espaço\nque ela estava ou, se o espaço estiver ocupado, no espaço\ndesocupado mais próximo.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 253
    }
  },
  {
    "id": "magia-lamina-flamejante",
    "nome": "Lâmina Flamejante",
    "nivel": 2,
    "escola": "evocação",
    "tempo": "1 ação bônus",
    "alcance": "Pessoal",
    "componentes": "V, S, M (folha de sumagre)",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você evoca uma lâmina ardente em sua mão livre. A\nlâmina é similar em tamanho e formato a uma cimitarra\ne ela permanece pela duração. Se você soltar a lâmina, ela\ndesaparece, mas você pode evocar a lâmina novamente\ncom uma ação bônus.\nVocê pode usar sua ação para realizar ataques corpo-a-\ncorpo com magia com a lâmina ardente. Se atingir, o alvo\nsofrerá 3d6 de dano de fogo.\nA lâmina flamejante emite luz plena a 3 metros de\nraio e penumbra por mais 3 metros adicionais.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano aumenta em 1d6 para cada dois níveis do\nespaço acima do 2°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano aumenta em 1d6 para cada dois níveis do\nespaço acima do 2°.",
    "classes": [
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 253
    }
  },
  {
    "id": "magia-lentidao",
    "nome": "Lentidão",
    "nivel": 3,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S, M (uma gota de melaço)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você altera o tempo ao redor de até seis criaturas, à sua\nescolha, num cubo de 12 metros, dentro do alcance. Cada\ncriatura deve ser bem sucedida num teste de resistência\nde Sabedoria ou será afetada por essa magia pela\nduração.\nO deslocamento de um alvo afetado é reduzido à\nmetade, ele sofre –2 de penalidade na CA e nos testes de\nresistência de Destreza e não pode usar reações. No turno\ndele, ele pode usar ou uma ação ou uma ação bônus, mas\nnão ambas. Independentemente das habilidades ou itens\nmágicos da criatura, ela não poderá realizar mais de um\nataque corpo-a-corpo ou à distância durante o turno dela.\nSe a criatura tentar conjurar uma magia com tempo\nde conjuração maior que 1 rodada, jogue um d20. Se cair\n11 ou maior, a magia não surte efeito até o próximo turno\nda criatura e a criatura deve usar sua ação nesse turno\npara completar a magia. Se ela não puder, a magia é\nperdida.\nUma criatura afetada por essa magia faz outro teste\nde resistência de Sabedoria no final do turno dela. Se\npassar na resistência, o efeito acaba nela.",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 254
    }
  },
  {
    "id": "magia-leque-cromatico",
    "nome": "Leque Cromático",
    "nivel": 1,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "Pessoal (cone de 4,5 metros)",
    "componentes": "V, S, M (um punhado de pó ou areia nas cores vermelha, amarela e azul)",
    "duracao": "1 rodada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um feixe ofuscante de luzes coloridas ordenadas, surge da\nsua mão. Role 6d10; o total é a quantidade de pontos de\nvida de criaturas que essa magia pode afetar. As\ncriaturas num cone de 4,5 metros, originado de você, são\nafetadas em ordem ascendente dos seus pontos de vida\n(ignorando criaturas inconsciente e que não podem ver).\nComeçando com as criaturas que tiverem menos\npontos de vida, cada criatura afetada por essa magia\nficará cega até o fim da magia. Subtraia os pontos de vida\nde cada criatura do total antes de considerar os pontos de\nvida da próxima criatura. Os pontos de vida de uma\ncriatura devem ser iguais ou menores que o total restante\npara que essa criatura seja afetada\nEm Níveis Superiores. Se você conjurar essa magia\nusando um espaço de magia de 2° nível ou superior, jogue\n2d10 adicionais para cada nível do espaço acima do 1°.",
    "escalonamento": "Se você conjurar essa magia\nusando um espaço de magia de 2° nível ou superior, jogue\n2d10 adicionais para cada nível do espaço acima do 1°.",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 254
    }
  },
  {
    "id": "magia-levitacao",
    "nome": "Levitação",
    "nivel": 2,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (uma pequena presilha de couro ou um pedaço de fio dourado dobrado em forma de copo com uma haste longa em uma extremidade)",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma criatura ou objeto, à sua escolha, que você possa ver,\ndentro do alcance, ergue-se verticalmente, até 6 metros e\npermanece suspenso lá pela duração. A magia pode\nlevitar um alvo pesando até 250 quilos. Uma criatura\ninvoluntária que for bem sucedida num teste de\nresistência de Constituição não é afetada\nO alvo pode se mover apenas ao puxar ou empurrar\num objeto fixo ou superfície ao seu alcance (como um\nmuro ou teto), permitindo que ele se mova como se\nestivesse escalando. Você pode mudar a altitude do alvo\nem até 6 metros em ambas as direções no seu turno. Se\nvocê for o alvo, você pode se mover para cima ou para\nbaixo como parte do seu movimento. Do contrário, você\nprecisa usar sua ação para mover o alvo, que deve\npermanecer dentro do alcance da magia.\nQuando a magia acaba, o alvo flutua suavemente até o\nchão, se ele ainda estiver no ar.",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 254
    }
  },
  {
    "id": "magia-ligacao-telepatica-de-rary",
    "nome": "Ligação Telepática De Rary",
    "nivel": 5,
    "escola": "adivinhação",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S, M (pedaços de cascas de ovos de dois tipos diferentes de criatura)",
    "duracao": "1 hora",
    "ritual": true,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você forja uma ligação telepática entre até oito criaturas\nvoluntárias, à sua escolha, dentro do alcance, ligando\npsiquicamente cada criatura a todas as outras, pela\nduração. Criaturas com valores de Inteligência 2 ou\nmenos não são afetadas por essa magia.\nAté a magia acabar, os alvos podem se comunicar\ntelepaticamente através do elo, independentemente de\nterem ou não um idioma em comum. A comunicação é\npossível a qualquer distância, apesar de não se estender a\noutros planos de existência.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 254
    }
  },
  {
    "id": "magia-limpar-a-mente",
    "nome": "Limpar A Mente",
    "nivel": 8,
    "escola": "abjuração",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S",
    "duracao": "24 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Até a magia acabar, uma criatura voluntária que você\ntocar fica imune a dano psíquico, a qualquer efeito que\npoderia sentir suas emoções ou ler seus pensamentos, a\nmagias de adivinhação e a condição enfeitiçado. A magia\npode até mesmo evitar a magia desejo e magias ou efeitos\nde poder similar usados para afetar a mente do alvo ou\npara adquirir informações sobre ele.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 254
    }
  },
  {
    "id": "magia-localizar-animais-ou-plantas",
    "nome": "Localizar Animais Ou Plantas",
    "nivel": 2,
    "escola": "adivinhação",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V, S, M (um pouco de pelo de um cão de caça)",
    "duracao": "Instantânea",
    "ritual": true,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Descreva ou nomeie um tipo especifico de besta ou planta.\nConcentre-se na voz da natureza ao seu redor, você\ndescobre a direção e distância da criatura ou planta mais\npróxima desse tipo dentro de 7,5 quilômetros, se houver\nalguma presente.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 254
    }
  },
  {
    "id": "magia-localizar-criatura",
    "nome": "Localizar Criatura",
    "nivel": 4,
    "escola": "adivinhação",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V, S, M (um pouco de pelo de um cão de caça)",
    "duracao": "Concentração, até 1 hora",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Descreva ou nomeie uma criatura que seja familiar a\nvocê. Você sente a direção da localização da criatura,\ncontanto que a criatura esteja a até 300 metros de você.\nSe a criatura se mover, você saberá a direção do\nmovimento dela.\nA magia pode localizar uma criatura especifica que\nvocê conheça ou a criatura mais próxima de um tipo\nespecifico (como um humano ou um unicórnio), desde que\nvocê já tenha visto tal criatura de perto – a até 9 metros –\npelo menos uma vez. Se a criatura que você descreveu ou\nnomeou estiver em uma forma diferente, como se estiver\nsob efeito da magia metamorfose, essa magia não\nlocalizará a criatura.\nEssa magia não pode localizar uma criatura se água\ncorrente de, pelo menos 3 metros de largura, bloquear o\ncaminho direito entre você e a criatura.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago",
      "Paladino",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 255
    }
  },
  {
    "id": "magia-localizar-objeto",
    "nome": "Localizar Objeto",
    "nivel": 2,
    "escola": "adivinhação",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V, S, M (um galho bifurcado)",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Descreva ou nomeie um objeto que seja familiar a você.\nVocê sente a direção da localização do objeto, contanto\nque o objeto esteja a até 300 metros de você. Se o objeto\nestiver em movimento, você saberá a direção do\nmovimento dele.\nA magia pode localizar um objeto especifico que você,\ndesde que você já tenha o visto de perto – a até 9 metros –\npelo menos uma vez. Alternativamente, a magia pode\nlocalizar o objeto de um tipo em particular mais próximo,\ncomo certo tipo de vestuário, joia, móvel, ferramenta ou\narma.\nEssa magia não pode localizar um objeto se qualquer\nespessura de chumbo, até mesmo uma folha fina,\nbloquear o caminho direto entre você e o objeto.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago",
      "Paladino",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 255
    }
  },
  {
    "id": "magia-loquacidade",
    "nome": "Loquacidade",
    "nivel": 8,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V",
    "duracao": "1 hora",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Até o fim da magia, quando você realizar um teste de\nCarisma, você pode substituir o número rolado por você\npor um 15. Além disso, não importa o que você diga,\nmagias que determinam se você está dizendo a verdade\nindicarão que você está sendo sincero.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 255
    }
  },
  {
    "id": "magia-lufada-de-vento",
    "nome": "Lufada De Vento",
    "nivel": 2,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Pessoal (linha de 18 metros)",
    "componentes": "V, S, M (uma semente de legume)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma linha de vento forte, com 18 metros de comprimento\ne 3 metros de largura, é soprada de você em uma direção,\nà sua escolha, pela duração da magia. Cada criatura que\ncomeçar seu turno na linha, deve ser bem sucedida num\nteste de resistência de Força ou será empurrada 4,5\nmetros para trás, na direção seguida pela linha. Qualquer\ncriatura na linha deve gastar 3 metros de movimentação\npara cada 1,5 metro que ela se mover enquanto se\naproxima de você.\nAs lufadas dispersam gases ou vapores e apagam\nvelas, tochas e chamas similares desprotegidas na área.\nElas fazem com que chamas protegidas, como as de\nlanternas, vibrem descontroladamente e tenham 50 por\ncento de chance de serem extintas.\nCom uma ação bônus, em cada um dos seus turnos,\nantes da magia acabar, você pode mudar a direção à qual\na linha é soprada de você.",
    "escalonamento": "",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 255
    }
  },
  {
    "id": "magia-luz",
    "nome": "Luz",
    "nivel": 0,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, M (um vaga-lume ou musgo fosforescente)",
    "duracao": "1 hora",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca um objeto que não tenha mais 3 metros em\nqualquer dimensão. Até a magia acabar, o objeto emite\nluz plena num raio de 6 metros e penumbra por 6 metros\nadicionais. Cobrir o objeto completamente com alguma\ncoisa opaca bloqueará a luz. A magia termina se você\nconjura-la novamente ou dissipa-la com uma ação.\nSe você tentar afetar um objeto segurado ou vestido\npor uma criatura hostil, a criatura deve ser bem sucedida\nnum teste de Destreza para evitar a magia.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 255
    }
  },
  {
    "id": "magia-luz-do-dia",
    "nome": "Luz Do Dia",
    "nivel": 3,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S",
    "duracao": "1 hora",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma esfera de luz, com 18 metros de raio, se espalha a\npartir de um ponto, à sua escolha, dentro do alcance. A\nesfera produz luz plena num raio de 18 metros e\npenumbra por 18 metros adicionais.\nSe você escolher um ponto em um objeto que você\nesteja segurando, ou um que não esteja sendo vestido ou\ncarregado, a luz brilha a partir do objeto e se move com\nele. Cobrir completamente o objeto afetado com um objeto\nopaco, como uma vasilha ou um elmo, bloqueará a luz.\nSe qualquer área dessa magia sobrepor uma área de\nescuridão criada por uma magia de 3° ou inferior, a magia\nque criou a escuridão será dissipada.",
    "escalonamento": "",
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Paladino",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 255
    }
  },
  {
    "id": "magia-malogro",
    "nome": "Malogro",
    "nivel": 4,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Energia necromântica inunda uma criatura, à sua\nescolha, que você possa ver dentro do alcance, drenando\nsua umidade e vitalidade. O alvo deve realizar um teste\nde resistência de Concentração. O alvo sofre 8d8 de dano\nnecrótico se falhar no teste, ou metade desse dano se\nobtiver sucesso. Essa magia não surte efeito em mortos-\nvivos ou constructos.\nSe você afetar uma criatura planta ou planta mágica,\nela faz seu teste de resistência com desvantagem e a\nmagia causa o máximo de dano a ela.\nSe você afetar uma planta não-mágica que não seja\numa criatura, como uma árvore ou arbusto, ele não faz\num teste de resistência; ela simplesmente seca e morre.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 5° nível ou\nsuperior, o dano aumenta em 1d8 para cada nível do\nespaço acima do 4°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 5° nível ou\nsuperior, o dano aumenta em 1d8 para cada nível do\nespaço acima do 4°.",
    "classes": [
      "Bruxo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 255
    }
  },
  {
    "id": "magia-mansao-magnifica-de-mordenkainen",
    "nome": "Mansão Magnífica De Mordenkainen",
    "nivel": 7,
    "escola": "conjuração",
    "tempo": "1 minuto",
    "alcance": "90 metros",
    "componentes": "V, S, M (um portal em miniatura esculpido em marfim, um pedaço de mármore polido e uma pequena colher de prata, cada item valendo, no mínimo, 5 po)",
    "duracao": "24 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": false,
    "descricao": "Você conjura uma residência extradimensional, dentro do\nalcance, que permanece pela duração. Você escolhe onde\nsua única entrada é localizada. A entrada brilha\ndiscretamente e tem 1,5 metro de largura por 3 metros de\naltura. Você e qualquer criatura que você designou,\nquando conjurou a magia, pode entrar na residência\nextradimensional enquanto o portal permanecer aberto.\nVocê pode abrir ou fechar o portal se estiver a até 9\nmetros dele. Enquanto estiver fechado, o portal é\ninvisível.\nAlém do portal existe um magnifico salão com\ninúmeros aposentos. A atmosfera é limpa, fresca e morna.\nVocê pode criar qualquer projeto de piso que quiser,\nmas o espaço não pode exceder 50 cubos, cada cubo tendo\n3 metros de cada lado. O local é mobiliado e decorado\ncomo você desejar. Ele contém comida suficiente para\nservir nove banquetes para até 100 pessoas. Uma equipe\nde 100 servos quase-transparentes atende todos que\nentrarem. Você decide a aparência visual dos servos e o\nvestuário deles. Eles são completamente obedientes as\nsuas ordens. Cada servo pode realizar qualquer tarefa\nque um servo humano comum poderia fazer, mas eles não\npodem atacar ou realizar qualquer ação que poderia\ncausar maleficio direto a outra criatura. Portanto, os\nservos podem buscar coisas, limpar, remendar, dobrar\nroupas, acender lareiras, servir comida, despejar vinho e\nassim por diante. Os servos podem ir a qualquer lugar na\nmansão, mas não podem deixa-la. Mobília e outros objetos\ncriados por essa magia viram fumaça se forem removidos\nda mansão. Quando a magia acabar, qualquer criatura\ndentro do espaço extradimensional é expelida para o\nespaço vago mais próximo da entrada.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 256
    }
  },
  {
    "id": "magia-manto-do-cruzado",
    "nome": "Manto Do Cruzado",
    "nivel": 3,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Poder sagrado irradia de você em uma aura de 9 metros\nde raio, despertando a audácia nas criaturas amigáveis.\nAté o final da magia, a aura se move, se mantendo\ncentrada em você. Enquanto estiver na aura, cada\ncriatura não-hostil (incluindo você) causa 1d4 de dano\nradiante extra quando atingir com ataques com arma.",
    "escalonamento": "",
    "classes": [
      "Paladino"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 256
    }
  },
  {
    "id": "magia-mao-de-bigby",
    "nome": "Mão De Bigby",
    "nivel": 5,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S, M (uma casca de ovo e uma luva de couro de cobra)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria uma mão Grande de energia cintilante e\ntranslucida em um espaço desocupado que você possa ver\ndentro do alcance. A mão permanece pela duração da\nmagia e ela se move ao seu comando, imitando os\nmovimentos da sua própria mão.\nA mão é um objeto com CA 20 e pontos de vida igual\nao seu máximo de pontos de vida. Se ela cair a 0 pontos de\nvida, a magia termina. Ela tem Força 26 (+8) e Destreza\n10 (+0). A mão não preenche o espaço dela.\nQuando você conjura essa magia você pode, com uma\nação bônus, nos seus turnos subsequentes, mover a mão\naté 18 metros e então causar um dos seguintes efeitos\ncom ela.\nMão Esmagadora. A mão tenta agarrar uma\ncriatura Enorme ou menor a 1,5 metro dela. Você usa o\nvalor de Força da mão para determinar o agarrão. Se o\nalvo for Médio ou menor, você terá vantagem no teste.\nEnquanto a mão estiver agarrando o alvo, você pode usar\numa ação bônus para fazer a mão esmaga-lo. Quando o\nfizer, o alvo sofre dano de concussão igual a 2d6 + seu\nmodificador de habilidade de conjuração.\nMão Interposta. A mão se interpõem entre você e\numa criatura a sua escolha até você lhe dar um comando\ndiferente. A mão se move para ficar entre você e o alvo,\nconcedendo a você meia-cobertura contra o alvo. O alvo\nnão pode se mover através do espaço da mão se o valor de\nForça dele for menor ou igual ao valor de Força da mão.\nSe o valor de Força dele for maior que o valor de Força da\nmão, o alvo pode se mover até você através do espaço da\nmão, mas aquele espaço será considerado terreno difícil\npara o alvo.\nMão Poderosa. A mão tenta empurrar uma criatura\na 1,5 metro dela em uma direção a sua escolha. Realize\num teste com a Força da mão, resistido por um teste de\nForça (Atletismo) do alvo. Se o alvo for Médio ou menor,\nvocê tem vantagem no teste. Se você for bem sucedido, a\nmão empurra o alvo até 1,5 metro mais uma quantidade\nde metros igual ao modificador da sua habilidade de\nconjuração multiplicado por 1,5. A mão se move com o\nalvo, permanecendo a 1,5 metro dele.\nPunho Cerrado. A mão golpeia uma criatura ou\nobjeto a 1,5 metro dela. Realize uma jogada de ataque\ncorpo-a-corpo com magia para a mão usando suas\nestatísticas de jogo. Se atingir, o alvo sofre 4d8 de dano de\nenergia.\nEm Níveis Superiores. Se você conjurar essa magia\nusando um espaço de magia de 6° nível ou superior, o\ndano da opção punho cerrado aumenta em 2d8 e o dano\nda mão esmagadora aumenta em 2d6 para cada nível do\nespaço acima do 5°.",
    "escalonamento": "Se você conjurar essa magia\nusando um espaço de magia de 6° nível ou superior, o\ndano da opção punho cerrado aumenta em 2d8 e o dano\nda mão esmagadora aumenta em 2d6 para cada nível do\nespaço acima do 5°.",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 256
    }
  },
  {
    "id": "magia-maos-flamejantes",
    "nome": "Mãos Flamejantes",
    "nivel": 1,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Pessoal (cone de 4,5 metros)",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Enquanto você mantiver suas mãos com os polegares\njuntos e os dedos abertos, uma fino leque de chamas\nemerge das pontas dos seus dedos erguidos. Cada criatura\nnum cone de 4,5 metros deve realizar um teste de\nresistência de Destreza. Uma criatura sofre 3d6 de dano\nde fogo se falhar no teste, ou metade desse dano se\nobtiver sucesso.\nO fogo incendeia qualquer objeto inflamável na área\nque não esteja sendo vestido ou carregado.\nEm Níveis Superiores. Se você conjurar essa magia\nusando um espaço de magia de 2° nível ou superior, o\ndano aumenta em 1d6 para cada nível do espaço acima do\n1°.",
    "escalonamento": "Se você conjurar essa magia\nusando um espaço de magia de 2° nível ou superior, o\ndano aumenta em 1d6 para cada nível do espaço acima do\n1°.",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 256
    }
  },
  {
    "id": "magia-maos-magicas",
    "nome": "Mãos Mágicas",
    "nivel": 0,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S",
    "duracao": "1 minuto",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma mão espectral flutuante aparece num ponto, à sua\nescolha, dentro do alcance. A mão permanece pela\nduração ou até você dissipa-la com uma ação. A mão some\nse estiver a mais de 9 metros de você ou se você conjurar\nessa magia novamente.\nVocê pode usar sua ação para controlar a mão. Você\npode usar a mão para manipular um objeto, abrir uma\nporta ou recipiente destrancado, guardar ou pegar um\nitem de um recipiente aberto ou derramar o conteúdo de\num frasco. Você pode mover a mão até 9 metros a cada\nvez que a usa.\nA mão não pode atacar, ativar itens mágicos ou\ncarregar mais de 5 quilos.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 257
    }
  }
]; if(typeof module!=="undefined"&&module.exports)module.exports=dados;else (r.ForjaMagias||(r.ForjaMagias=[])).push(...dados);})(globalThis);
