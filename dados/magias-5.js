(function(r){const dados=[
  {
    "id": "magia-purificar-alimentos",
    "nome": "Purificar Alimentos",
    "nivel": 1,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "3 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": true,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Toda comida e bebida não-mágica dentro de uma esfera\nde 1,5 metro de raio centrada num ponto, à sua escolha,\ndentro do alcance é purificada e se livrada de venenos ou\ndoenças.",
    "escalonamento": "",
    "classes": [
      "Clérigo",
      "Druida",
      "Paladino"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 273
    }
  },
  {
    "id": "magia-queda-suave",
    "nome": "Queda Suave",
    "nivel": 1,
    "escola": "transmutação",
    "tempo": "1 reação, que você realiza quando você ou uma criatura a até 18 metros cair",
    "alcance": "18 metros",
    "componentes": "V, M (uma pequena pena ou penugem similar)",
    "duracao": "1 minuto",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Escolha até cinco criaturas caindo, dentro do alcance. A\ntaxa de descendência de uma criatura caindo é reduzida\npara 18 metros por rodada, até o fim da magia. Se a\ncriatura aterrissar antes da magia acabar, ela não sofre\nnenhum dano de queda, pode aterrissar em pé e a magia\ntermina para essa criatura.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 273
    }
  },
  {
    "id": "magia-raio-adoecente",
    "nome": "Raio Adoecente",
    "nivel": 1,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um raio adoecente de energia esverdeada chicoteia na\ndireção de uma criatura dentro do alcance. Faça um\nataque à distância com magia contra o alvo. Se atingir, o\nalvo sofrerá 2d8 de dano de veneno e deve realizar um\nteste de resistência de Constituição. Se falhar na\nresistência, ele também ficará envenenado até o final do\nseu próximo turno.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano da magia aumenta em 1d8 para cada\nnível do espaço acima do 1°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano da magia aumenta em 1d8 para cada\nnível do espaço acima do 1°.",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 273
    }
  },
  {
    "id": "magia-raio-ardente",
    "nome": "Raio Ardente",
    "nivel": 2,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria três raios de fogo e os arremessa em alvos\ndentro do alcance. Você pode arremessa-los em um alvo\nou em vários.\nRealize um ataque à distância com magia para cada\nraio. Se atingir, o alvo sofrerá 2d6 de dano de fogo.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, você cria um raio adicional para cada nível do\nespaço acima do 2°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, você cria um raio adicional para cada nível do\nespaço acima do 2°.",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 273
    }
  },
  {
    "id": "magia-raio-de-bruxa",
    "nome": "Raio De Bruxa",
    "nivel": 1,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S, M (um galho de uma árvore que tenha sido atingida por um relâmpago)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um raio crepitante de energia azul é arremessado em\numa criatura dentro do alcance, formando um arco\nelétrico contínuo entre você e o alvo. Faça um ataque à\ndistância com magia contra a criatura. Se atingir, o alvo\nsofrerá 1d12 de dano elétrico e, em cada um dos seus\nturnos, pela duração, você pode usar sua ação para causar\n1d12 de dano elétrico ao alvo, automaticamente. A magia\nacaba se você usar sua ação para fazer qualquer outra\ncoisa. A magia também acaba se o alvo estiver fora do\nalcance da magia ou se você tiver cobertura total para ele.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano inicial aumenta em 1d12 para cada nível\ndo espaço acima do 1°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano inicial aumenta em 1d12 para cada nível\ndo espaço acima do 1°.",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 273
    }
  },
  {
    "id": "magia-raio-de-fogo",
    "nome": "Raio De Fogo",
    "nivel": 0,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você arremessa um cisco de fogo em uma criatura ou\nobjeto dentro do alcance. Faça um ataque à distância com\nmagia contra o alvo. Se atingir, o alvo sofre 1d10 de dano\nde fogo. Um objeto inflamável atingido por essa magia,\nincendeia se não estiver sendo vestido ou carregado.\nO dano dessa magia aumenta em 1d10 quando você\nalcança o 5° nível (2d10), 11° nível (3d10) e 17° nível\n(4d10).",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 274
    }
  },
  {
    "id": "magia-raio-de-gelo",
    "nome": "Raio De Gelo",
    "nivel": 0,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um raio frigido de luz azul clara parte em direção de uma\ncriatura, dentro do alcance. Realize um ataque à\ndistância com magia contra o alvo. Se atingir, ele sofre\n1d8 de dano de frio e seu deslocamento é reduzido em 3\nmetros até o começo do seu próximo turno.\nO dano da magia aumenta em 1d8 quando você\nalcança o 5° nível (2d8), 11° nível (3d8) e 17° nível (4d8).",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 274
    }
  },
  {
    "id": "magia-raio-do-enfraquecimento",
    "nome": "Raio Do Enfraquecimento",
    "nivel": 2,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um raio negro de energia enervante parte do seu dedo em\ndireção de uma criatura, dentro do alcance. Faça um\nataque à distância com magia contra o alvo. Se atingir, o\nalvo causará metade do dano com ataques com armas que\nusem Força, até a magia acabar.\nNo final de cada um dos turnos do alvo, ele pode\nrealizar um teste de resistência de Constituição contra a\nmagia. Se obtiver sucesso, a magia acaba.",
    "escalonamento": "",
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 274
    }
  },
  {
    "id": "magia-raio-guiador",
    "nome": "Raio Guiador",
    "nivel": 1,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S",
    "duracao": "1 rodada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um lampejo de luz se lança em direção de uma criatura, à\nsua escolha, dentro do alcance. Realize um ataque à\ndistância com magia contra o alvo. Se atingir, o alvo sofre\n4d6 de dano radiante e, a próxima jogada de ataque\ncontra esse alvo, antes do final do seu próximo turno, terá\nvantagem, graças a penumbra mística cintilando no alvo,\naté então.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 1°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 1°.",
    "classes": [
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 274
    }
  },
  {
    "id": "magia-raio-lunar",
    "nome": "Raio Lunar",
    "nivel": 2,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S, M (várias sementes de qualquer planta lunar e um pedaço de feldspato opalescente)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um raio prateado de luz pálida brilha para baixo em um\ncilindro com 1,5 metro de raio e 12 metros de altura,\ncentrado num ponto dentro do alcance. Até a magia\nacabar, penumbra preenche o cilindro.\nQuando uma criatura entrar na área da magia pela\nprimeira vez em um turno, ou começar seu turno lá, ela é\nengolfada por chamas fantasmagóricas que causam dores\nlancinantes e ela deve realizar um teste de resistência de\nConstituição. Ela sofre 2d10 de dano radiante se falhar\nna resistência ou metade desse dano se passar.\nUm metamorfo faz seu teste de resistência com\ndesvantagem. Se ele falhar, ele, também, reverte\ninstantaneamente para sua forma original e não pode\nassumir uma forma diferente até deixar a luz da magia.\nEm cada um dos seus turnos após conjurar essa\nmagia, você pode usar uma ação para mover o raio até 18\nmetros em qualquer direção.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, o dano aumenta em 1d10 para cada nível do\nespaço acima do 2°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 3° nível ou\nsuperior, o dano aumenta em 1d10 para cada nível do\nespaço acima do 2°.",
    "classes": [
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 275
    }
  },
  {
    "id": "magia-raio-solar",
    "nome": "Raio Solar",
    "nivel": 6,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Pessoal (linha de 18 metros)",
    "componentes": "V, S, M (uma lente de aumento)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um raio de luz brilhante surge da sua mão em uma linha\nde 18 metros de comprimento por 1,5 metro de largura.\nCada criatura na linha deve realizar um teste de\nresistência de Constituição. Se falhar na resistência, uma\ncriatura sofrerá 6d8 de dano radiante e ficará cega até\nseu próximo turno. Se passar na resistência, ela sofrerá\nmetade desse dano e não ficará cega pela magia. Mortos-\nvivos e limos tem desvantagem nos seus testes de\nresistência.\nVocê pode criar uma linha de radiação com sua ação\nem qualquer turno, até a magia acabar.\nPela duração, uma fagulha de radiação luminosa\nbrilha na sua mão. Ela emite luz plena num raio de 9\nmetros e penumbra por 9 metros adicionais. Essa luz é\nluz do sol.",
    "escalonamento": "",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 275
    }
  },
  {
    "id": "magia-rajada-de-veneno",
    "nome": "Rajada De Veneno",
    "nivel": 0,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "3 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você ergue sua mão em direção de uma criatura que você\npossa ver, dentro do alcance e projeta um sopro de gás\ntóxico da sua palma. A criatura deve ser bem sucedida\nnum teste de resistência de Constituição ou sofrerá 1d12\nde dano de veneno.\nO dano dessa magia aumenta em 1d12 quando você\nalcança o 5° nível (2d12), 11° nível (3d12) e 17° nível\n(4d12).",
    "escalonamento": "",
    "classes": [
      "Bruxo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 275
    }
  },
  {
    "id": "magia-rajada-mistica",
    "nome": "Rajada Mística",
    "nivel": 0,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um feixe de energia crepitante vai em direção a uma\ncriatura dentro do alcance. Realize uma jogada de ataque\nà distância com magia contra o alvo. Se atingir, o alvo\nsofre 1d10 de dano de energia.\nA magia cria mais de um feixe quando você alcança\nníveis elevados: dois feixes no 5° nível, três feixes no 11°\nnível e quatro feixes no 17° nível. Você pode direcionar os\nfeixes para o mesmo alvo ou para alvos diferentes. Realize\njogadas de ataque separadas para cada feixe.",
    "escalonamento": "",
    "classes": [
      "Bruxo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 275
    }
  },
  {
    "id": "magia-rajada-prismatica",
    "nome": "Rajada Prismática",
    "nivel": 7,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Pessoal (cone de 18 metros)",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Oito raios de luz multicoloridos lampejam da sua mão.\nCada raio é uma cor diferente e tem poderes e propósitos\ndiferentes. Cada criatura em um cone de 18 metros deve\nrealizar um teste de resistência de Destreza. Para cada\nalvo, role um d8 para determinar qual cor de raio afetou\nele.\n1. Vermelho. O alvo sofre 10d6 de dano de fogo se\nfalhar na resistência ou metade desse dano se obtiver\nsucesso.\n2. Laranja. O alvo sofre 10d6 de dano de ácido se\nfalhar na resistência ou metade desse dano se obtiver\nsucesso.\n3. Amarelo. O alvo sofre 10d6 de dano elétrico se\nfalhar na resistência ou metade desse dano se obtiver\nsucesso.\n4. Verde. O alvo sofre 10d6 de dano de veneno se\nfalhar na resistência ou metade desse dano se obtiver\nsucesso.\n5. Azul. O alvo sofre 10d6 de dano de frio se falhar na\nresistência ou metade desse dano se obtiver sucesso.\n6. Anil. Se falhar na resistência, o alvo ficará\nimpedido. Ele deve então, fazer um teste de resistência de\nConstituição ao final de cada um dos turnos dele. Se\nobtiver sucesso três vezes, a magia termina. Se falhar na\nresistência três vezes, ela se torna pedra é afetada pela\ncondição petrificado. Os sucessos e falhas não precisam\nser consecutivos; anote ambos os resultados até o alvo\nacumular três de mesmo tipo.\n7. Violeta. Se falhar na resistência, o alvo ficará cego.\nEle deve realizar um teste de resistência de Sabedoria no\ninício do seu próximo turno. Um sucesso na resistência\nacaba com a cegueira. Se falhar na resistência, a criatura\né transportada para outro plano de existência, escolhido\npelo Mestre, e não estará mais cego. (Tipicamente, uma\ncriatura que esteja em um plano que não seja o seu plano\nnatal é banida para lá, enquanto que outras criaturas\ngeralmente são enviadas para os Planos Astral ou\nEtéreo.)\n8. Especial. O alvo é atingido por dois raios. Role\nmais duas vezes e jogue novamente qualquer 8.",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 275
    }
  },
  {
    "id": "magia-recipiente-arcano",
    "nome": "Recipiente Arcano",
    "nivel": 6,
    "escola": "necromancia",
    "tempo": "1 minuto",
    "alcance": "Pessoal",
    "componentes": "V, S, M (uma gema, cristal, relicário ou algum outro tipo de recipiente ornamental valendo, no mínimo, 500 po)",
    "duracao": "Até ser dissipada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": false,
    "descricao": "Seu corpo entra em um estado catatônico, enquanto sua\nalma o abandona e entra num recipiente que você usa\ncomo componente material da magia. Enquanto sua alma\npermanecer no recipiente, você estará ciente do seu\nentorno como se você estivesse no espaço do recipiente.\nVocê não pode se mover ou usar reações. A única ação que\nvocê pode realizar é projetar sua alma a até 30 metros do\nrecipiente, tanto para retornar para o seu corpo\n(terminando a magia) ou para tentar possuir um corpo\nhumanoide.\nVocê pode tentar possuir qualquer humanoide a até 30\nmetros de você que você possa ver (criaturas protegidas\npelas magias proteção contra o bem e mal ou círculo\nmágico não podem ser possuídas). O alvo deve realizar\num teste de resistência de Carisma. Se falhar, sua alma\nse move para o corpo do alvo e a alma do alvo fica\naprisionada no recipiente. Se obtiver sucesso, o alvo\nresiste aos seus esforços em possuí-lo e você não poderá\ntentar possuí-lo novamente por 24 horas.\nUma vez que tenha possuído o corpo de uma criatura,\nvocê a controla. Suas estatísticas de jogo são substituídas\npelas estatísticas da criatura, no entanto, você mantem\nsua tendência e seus valores de Inteligência, Sabedoria e\nCarisma. Você mantem os benefícios das suas\ncaracterísticas de classe. Se o alvo tiver quaisquer níveis\nde classe, você não pode usar quaisquer das\ncaracterísticas de classe dele.\nNesse período, a alma da criatura possuída pode\nperceber do recipiente usando os sentidos dela, mas, no\nmais, não pode se mover ou realizar quaisquer ações.\nEnquanto estiver possuindo um corpo, você pode usar\nsua ação para retornar do corpo do hospedeiro para o\nrecipiente se ele estiver a até 30 metros de você,\ndevolvendo a alma da criatura hospedeira para o corpo\ndela. Se o corpo do hospedeiro morrer enquanto você\nestiver dentro dele, a criatura morre e você deve realizar\num teste de resistência de Carisma contra a sua CD de\nconjuração. Se obtiver sucesso, você retorna ao recipiente\nse ele estiver a até 30 metros de você. Caso contrário, você\nmorre.\nSe o recipiente for destruído ou a magia acabar, sua\nalma, imediatamente, retorna para o seu corpo. Se seu\ncorpo estiver a mais de 30 metros de você ou se seu corpo\nestiver morto quando você tentar retornar para ele, você\nmorre. Se a alma de outra criatura estiver no recipiente\nquando ele for destruído, a alma da criatura volta para o\ncorpo dela se o corpo estiver vivo e a até 30 metros dela.\nCaso contrário, a criatura morre.\nQuando a magia acabar, o recipiente é destruído.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 277
    }
  },
  {
    "id": "magia-recuo-acelerado",
    "nome": "Recuo Acelerado",
    "nivel": 1,
    "escola": "transmutação",
    "tempo": "1 ação bônus",
    "alcance": "Pessoal",
    "componentes": "V, S",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia permite que você se mova a um ritmo\nincrível. Quando você conjura essa magia e, a partir de\nentão, com uma ação bônus em cada um dos seus turnos,\naté a magia acabar, você pode realizar a ação de\nDisparada.",
    "escalonamento": "",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 277
    }
  },
  {
    "id": "magia-reencarnacao",
    "nome": "Reencarnação",
    "nivel": 5,
    "escola": "transmutação",
    "tempo": "1 hora",
    "alcance": "Toque",
    "componentes": "V, S, M (óleos e unguentos raros valendo, no mínimo, 1.000 po, consumidos pela magia)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Você toca um humanoide morto ou um pedaço de um\nhumanoide morto. Considerando que a criatura não esteja\nmorta a mais de 10 dias, a magia forma um novo corpo\nadulto para ele e então, chama a alma para entrar no\ncorpo. Se a alam do alvo não estiver livre ou deseje fazê-\nlo, a magia falha.\nA magia forma um novo corpo para que a criatura\nhabite, o que, provavelmente, fará com que a raça da\ncriatura mude. O Mestre rola um d100 e consulta a tabela\nseguinte para determinar qual forma a criatura terá\nquando voltar a vida, ou o Mestre pode escolher uma\nforma.\nd100\nRaça\n01–04\nDraconato\n05–13\nAnão, colina\n14–21\nAnão, montanha\n22–25\nElfo, negro\n26–34\nElfo, alto\n35–42\nElfo, floresta\n43–46\nGnomo, floresta\n47–52\nGnomo, rochas\n53–56\nMeio-elfo\n57–60\nMeio-orc\n61–68\nHalfling, pés leves\n69–76\nHalfling, robusto\n77–96\nHumano\n97–00\nTiefling\nA criatura reencarnada lembra-se da sua vida e\nexperiências anteriores. Ela mantem as capacidades que\na sua forma original tinha, exceto por trocar sua raça\noriginal pela nova e mudar suas características raciais\nadequadamente.",
    "escalonamento": "",
    "classes": [
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 277
    }
  },
  {
    "id": "magia-reflexos",
    "nome": "Reflexos",
    "nivel": 2,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V, S",
    "duracao": "1 minuto",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Três duplicatas ilusórias de você aparecem no seu espaço.\nAté a magia acabar, as duplicatas se movem com você e\ncopiam as suas ações, trocando de posição, tornando\nimpossível rastrear qual imagem é real. Você pode usar\nsua ação para dissipar as duplicatas ilusórias.\nCada vez que uma criatura mirar você com um ataque\nenquanto a magia durar, role um d20 para determinar se\no ataque, em vez de você, mira uma das suas duplicatas.\nSe você tiver três duplicatas, você deve rolar um 6 ou\nmaior para mudar o alvo do ataque para uma duplicata.\nCom duas duplicatas, você deve rolar um 8 ou maior. Com\numa duplicata, você deve rolar um 11 ou maior.\nA CA de uma duplicata é igual a 10 + seu modificador\nde Destreza. Se um ataque atingir uma duplicata, ela é\ndestruída. Uma duplicata só pode ser destruída por um\nataque que a atinja. Ela ignora todos os outros danos e\nefeitos. A magia acaba quando todas as três duplicatas\nforem destruídas.\nUma criatura não pode ser afetada por essa magia se\nnão puder enxergar, se ela contar com outros sentidos\nalém da visão, como percepção às cegas, ou se ela puder\nperceber ilusões como falsas, como com visão verdadeira.",
    "escalonamento": "",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 277
    }
  },
  {
    "id": "magia-regeneracao",
    "nome": "Regeneração",
    "nivel": 7,
    "escola": "transmutação",
    "tempo": "1 minuto",
    "alcance": "Toque",
    "componentes": "V, S, M (uma conta de oração e água benta)",
    "duracao": "1 hora",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca uma criatura e estimula sua habilidade de cura\nnatural. O alvo recupera 4d8 + 15 pontos de vida. Pela\nduração da magia o alvo recupera 1 ponto de vida no\ninício de cada turno dela (10 pontos de vida por minuto).\nOs membro decepados do corpo do alvo (dedos, pernas,\nrabos e assim por diante), se tiver algum, são restaurados\napós 2 minutos. Se você tiver a parte decepada e segura-\nla contra o topo, a magia, instantaneamente, faz com que\no membro se grude ao toco.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 278
    }
  },
  {
    "id": "magia-relampago",
    "nome": "Relâmpago",
    "nivel": 3,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Pessoal (linha de 30 metros)",
    "componentes": "V, S, M (um pouco de pelo e uma haste de âmbar, cristal ou vidro)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Um relâmpago forma uma linha de 30 metros de\ncomprimento e 1,5 metro de largura que é disparado por\nvocê em uma direção, à sua escolha. Cada criatura na\nlinha deve realizar um teste de resistência de Destreza.\nUma criatura sofre 8d6 de dano elétrico se falhar na\nresistência ou metade desse dano se obtiver sucesso.\nO relâmpago incendeia objetos inflamáveis na área\nque não estejam sendo vestidos ou carregados.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 3°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 3°.",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 278
    }
  },
  {
    "id": "magia-remover-maldicao",
    "nome": "Remover Maldição",
    "nivel": 3,
    "escola": "abjuração",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Ao seu toque, todas as maldições afetando uma criatura\nou objeto terminam. Se o objeto for um item mágico\namaldiçoado, sua maldição persiste, mas a magia rompe a\nsintonia do portador com o objeto, então permitindo que\nele o remova ou descarte.",
    "escalonamento": "",
    "classes": [
      "Bruxo",
      "Clérigo",
      "Mago",
      "Paladino"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 278
    }
  },
  {
    "id": "magia-repouso-tranquilo",
    "nome": "Repouso Tranquilo",
    "nivel": 2,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (uma pitada de sal e uma peça de cobre colocada em cada um dos olhos do corpo, que devem permanecer ai pela duração)",
    "duracao": "10 dias",
    "ritual": true,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca um corpo ou outros restos mortais. Pela\nduração, o alvo estará protegido de decomposição e não\npode se tornar um morto-vivo.\nA magia também estende, efetivamente, o limite de\ntempo para que o alvo seja trazido de volta a vida, já que\nos dias passados sob a influência dessa magia não contam\nno tempo limite de tais magias, como reviver os mortos.",
    "escalonamento": "",
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 278
    }
  },
  {
    "id": "magia-repreensao-infernal",
    "nome": "Repreensão Infernal",
    "nivel": 1,
    "escola": "evocação",
    "tempo": "1 reação, que você faz em resposta ao sofre dano de uma criatura a até 18 metros de você e que você possa ver",
    "alcance": "18 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você aponta seu dedo e a criatura que causou dano a você\né, momentaneamente, envolta por chamas infernais. A\ncriatura deve realizar um teste de resistência de\nDestreza. Ela sofre 2d10 de dano de fogo se falhar na\nresistência ou metade desse dano se obtiver sucesso.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d10 para cada nível do\nespaço acima do 1°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d10 para cada nível do\nespaço acima do 1°.",
    "classes": [
      "Bruxo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 278
    }
  },
  {
    "id": "magia-resistencia",
    "nome": "Resistência",
    "nivel": 0,
    "escola": "abjuração",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (um manto em miniatura)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca uma criatura voluntária. Uma vez, antes da\nmagia acabar, o alvo pode rolar um d4 e adicionar o valor\njogado a um teste de resistência de sua escolha. Ele pode\nrolar o dado antes ou depois de realizar o teste de\nresistência. Então, a magia termina.",
    "escalonamento": "",
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 278
    }
  },
  {
    "id": "magia-respirar-na-agua",
    "nome": "Respirar Na Água",
    "nivel": 3,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S, M (um pedaço de cana ou palha)",
    "duracao": "24 horas",
    "ritual": true,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia concede a até dez criaturas voluntária que\nvocê possa ver, dentro do alcance, a habilidade de respirar\nembaixo d’água até a magia acabar. As criaturas afetadas\ntambém mantem sua forma normal de respiração.",
    "escalonamento": "",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 278
    }
  },
  {
    "id": "magia-ressurreicao",
    "nome": "Ressurreição",
    "nivel": 7,
    "escola": "necromancia",
    "tempo": "1 hora",
    "alcance": "Toque",
    "componentes": "V, S, M (um diamante valendo, no mínimo, 1.000 po, consumido pela magia)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Você toca uma criatura morta que não esteja assim a\nmais de um século, que não tenha morrido por velhice e\nque não seja um morto-vivo. Se a alma da criatura estiver\ndisposta e livre, o alvo volta a vida com todos os seus\npontos de vida.\nEssa magia neutraliza quaisquer venenos e cura\ndoenças normais que afetavam a criatura no momento da\nmorte. Essa magia, no entanto, não remove doenças\nmágicas, maldições ou efeitos similares; se eles não\ntiverem sido removidos antes da conjuração da magia,\neles voltam a afetar a criatura quando ela volta a viver.\nEssa magia fecha todos os ferimentos mortais e\nrestaura partes do corpo perdidas.\nVoltar dos mortos é um calvário. O alvo sofre –4 de\npenalidade em todas as suas jogadas de ataque, testes de\nresistência e testes de habilidade. A cada vez que o alvo\nterminar um descanso longo, as penalidades são\nreduzidas em 1, até desaparecerem.\nConjurar essa magia para trazer de volta a vida uma\ncriatura que tenha morrido a um ano ou mais tempo é\nextremamente desgastante para você. Até você terminar\num descanso longo, você não pode conjurar magias\nnovamente e terá desvantagem em todas as jogadas de\nataque, testes de habilidade e testes de resistência.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 278
    }
  },
  {
    "id": "magia-ressurreicao-verdadeira",
    "nome": "Ressurreição Verdadeira",
    "nivel": 9,
    "escola": "necromancia",
    "tempo": "1 hora",
    "alcance": "Toque",
    "componentes": "V, S, M (um borrifo de água benta e diamantes valendo, no mínimo, 25.000 po, consumidos pela magia)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Você toca uma criatura morta que não esteja assim a\nmais de 200 anos e que tenha morrido por qualquer\nmotivo, exceto velhice. Se a alma da criatura estiver\ndisposta e livre, o alvo volta a vida com todos os seus\npontos de vida.\nEssa magia fecha todos os ferimentos, neutraliza\nquaisquer venenos, cura todas as doenças e suspende\nquaisquer maldições que afligiam a criatura quando ela\nmorreu. A magia recupera órgão e membros danificados\nou perdidos. Se a criatura for um morto-vivo, ela é\nrestaurada para sua forma não-morta-viva.\nEssa magia pode, até mesmo, prover um novo corpo, se\no original não existir mais, nesse caso, você deve falar o\nnome da criatura. Ela aparece em um espaço desocupado,\nà sua escolha, a até 3 metros de você.",
    "escalonamento": "",
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 279
    }
  },
  {
    "id": "magia-restauracao-maior",
    "nome": "Restauração Maior",
    "nivel": 5,
    "escola": "abjuração",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (pó de diamante valendo, no mínimo, 100 po, consumido pela magia)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Você imbui uma criatura que você toca, com energia\npositiva para desfazer um efeito debilitante. Você pode\nreduzir a exaustão do alvo em um nível ou remover um\ndos seguintes do alvo:\n Um efeito que enfeitice ou petrifique o alvo\n Uma maldição, incluindo a sintonização do alvo com\num item mágico amaldiçoado\n Qualquer redução a um dos valores de habilidade do\nalvo\n Um efeito que esteja reduzindo o máximo de pontos de\nvida do alvo",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 279
    }
  },
  {
    "id": "magia-restauracao-menor",
    "nome": "Restauração Menor",
    "nivel": 2,
    "escola": "abjuração",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca uma criatura e pode, ou acabar com uma\ndoença ou uma condição que a esteja afligindo. A condição\npode ser cega, surda, paralisada ou envenenada.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 279
    }
  },
  {
    "id": "magia-reviver-os-mortos",
    "nome": "Reviver Os Mortos",
    "nivel": 5,
    "escola": "necromancia",
    "tempo": "1 hora",
    "alcance": "Toque",
    "componentes": "V, S, M (um diamante valendo, no mínimo, 500 po, consumido pela magia)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Você traz uma criatura morta que você tocar de volta a\nvida, considerando que ela não esteja morta a mais de 10\ndias. Se a alma da criatura estiver tanto disposta quando\nlivre para juntar-se ao corpo dela, a criatura volta a vida\ncom 1 ponto de vida.\nEssa magia também neutraliza quaisquer venenos e\ncura doenças não-mágicas que afetavam a criatura no\nmomento da morte. Essa magia, no entanto, não remove\ndoenças mágicas, maldições ou efeitos similares; se eles\nnão tiverem sido removidos antes da conjuração da\nmagia, eles voltam a afetar a criatura quando ela volta a\nviver. A magia não pode trazer uma criatura morta-viva\nde volta à vida.\nEssa magia fecha todos os ferimentos mortais, mas ela\nnão restaura partes do corpo perdidas. Se a criatura não\ntiver uma parte do corpo ou órgão fundamental para sua\nsobrevivência – sua cabeça, por exemplo – a magia falha\nautomaticamente.\nVoltar dos mortos é um calvário. O alvo sofre –4 de\npenalidade em todas as suas jogadas de ataque, testes de\nresistência e testes de habilidade. A cada vez que o alvo\nterminar um descanso longo, as penalidades são\nreduzidas em 1, até desaparecerem.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Paladino"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 279
    }
  },
  {
    "id": "magia-revivificar",
    "nome": "Revivificar",
    "nivel": 3,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (um diamante no valor de 300 po, consumido pela magia)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Você toca uma criatura que tenha morrido dentro do\núltimo minuto. Essa criatura volta a vida com 1 ponto de\nvida. Essa magia não pode trazer de volta a vida criaturas\nque tenham morrido de velhice nem pode restaurar\nquaisquer partes do corpo perdidas.",
    "escalonamento": "",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 279
    }
  },
  {
    "id": "magia-riso-histerico-de-tasha",
    "nome": "Riso Histérico De Tasha",
    "nivel": 1,
    "escola": "encantamento",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S, M (pequenas tortas e uma pena que é balançada no ar)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma criatura, à sua escolha, que você possa ver, dentro\ndo alcance, acha tudo hilariantemente engraçado e cai na\ngargalhada, se essa magia afeta-la. O alvo deve ser bem\nsucedido em um teste de resistência de Sabedoria ou cairá\nno chão, ficando incapacitado e incapaz de se levantar\npela duração. Uma criatura com valor de Inteligência 4 ou\ninferior não é afetada.\nAo final de cada um dos turnos dela e, toda vez que\nsofrer dano, o alvo pode realizar outro teste de resistência\nde Sabedoria. O alvo terá vantagem no teste de\nresistência se ele for garantido por ele ter sofrido dano. Se\nobtiver sucesso, a magia acaba.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 279
    }
  },
  {
    "id": "magia-rogar-maldicao",
    "nome": "Rogar Maldição",
    "nivel": 3,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca uma criatura e a criatura deve ser bem\nsucedida em um teste de resistência de Sabedoria ou será\namaldiçoada pela duração da magia. Quando você conjura\nessa magia, escolha a natureza da maldição dentre as\nseguintes opções:\n Escolha um valor de habilidade. Enquanto\namaldiçoado, o alvo tem desvantagem em testes de\nhabilidade e testes de resistência feitos com esse valor\nde habilidade,\n Enquanto amaldiçoado, o alvo tem desvantagem nas\njogadas de ataque contra você.\n Enquanto amaldiçoado, o alvo deve realizar um teste\nde resistência de Sabedoria no começo de cada um dos\nturnos dela. Se ela falhar, ela perderá sua ação aquele\nturno, não fazendo nada.\n Enquanto o alvo estiver amaldiçoado, seus ataques e\nmagias causam 1d8 de dano necrótico extra a ele.\nUma magia remover maldição termina esse efeito.\nCom a permissão do Mestre, você pode escolher um efeito\nalternativo de maldição, mas ele não deve ser mais\npoderoso que os descritos acima. O Mestre tem a palavra\nfinal sobre o efeito de uma maldição.\nEm Níveis Superiores. Se você conjurar essa magia\nusando um espaço de magia de 4° nível, a duração da\nconcentração sobe para 10 minutos. Se você usar um\nespaço de magia de 5° ou 6° nível, a duração será de 8\nhoras. Se você usar um espaço de magia de 7° ou 8° nível,\na duração será de 24 horas. Se você usar um espaço de\nmagia de 9° nível, a magia dura até ser dissipada. Usar\num espaço de magia de 5° nível ou superior faz com que a\nduração não necessite de concentração.",
    "escalonamento": "Se você conjurar essa magia\nusando um espaço de magia de 4° nível, a duração da\nconcentração sobe para 10 minutos. Se você usar um\nespaço de magia de 5° ou 6° nível, a duração será de 8\nhoras. Se você usar um espaço de magia de 7° ou 8° nível,\na duração será de 24 horas. Se você usar um espaço de\nmagia de 9° nível, a magia dura até ser dissipada. Usar\num espaço de magia de 5° nível ou superior faz com que a\nduração não necessite de concentração.",
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 279
    }
  },
  {
    "id": "magia-salto",
    "nome": "Salto",
    "nivel": 1,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (uma perna de gafanhoto)",
    "duracao": "1 minuto",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca uma criatura. A distância de salto da criatura é\ntriplicada até a magia acabar.",
    "escalonamento": "",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 280
    }
  },
  {
    "id": "magia-santuario",
    "nome": "Santuário",
    "nivel": 1,
    "escola": "abjuração",
    "tempo": "1 ação bônus",
    "alcance": "9 metros",
    "componentes": "V, S, M (um pequeno espelho de prata)",
    "duracao": "1 minuto",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você protege uma criatura, dentro do alcance, contra\nataques. Até a magia acabar, qualquer criatura que\ntentar atacar ou usar magias que causem dano contra\ncriatura protegida deve, primeiro, realizar um teste de\nresistência de Sabedoria. Se falhar na resistência, a\ncriatura deve escolher um novo alvo ou perderá o ataque\nou magia. Essa magia não protege a criatura contra\nefeitos de área, como a explosão de uma bola de fogo.\nSe a criatura protegida realizar um ataque ou conjurar\numa magia que afete uma criatura inimiga, essa magia\nacaba.",
    "escalonamento": "",
    "classes": [
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 280
    }
  },
  {
    "id": "magia-santuario-particular-de-mordenkainen",
    "nome": "Santuário Particular De Mordenkainen",
    "nivel": 4,
    "escola": "abjuração",
    "tempo": "10 minutos",
    "alcance": "36 metros",
    "componentes": "V, S, M (uma folha de chumbo, um pedaço de vidro opaco, um chumaço de algodão ou pano e pó de crisólita)",
    "duracao": "24 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você deixa uma área, dentro do alcance, magicamente\nsegura. A área é um cubo que pode ser tão pequeno\nquanto 1,5 metro ou tão grande quanto 30 metros de cada\nlado. A magia permanece pela duração ou até você usar\numa ação para dissipa-la.\nQuando você conjura essa magia, você decide que tipo\nde segurança ela fornecerá, escolhendo qualquer ou todas\nas propriedades a seguir:\n Sons não podem atravessar a barreira na fronteira da\nárea protegida.\n A barreira da área protegida escura e nebulosa,\nimpedindo visão (inclusive visão no escuro) através\ndela.\n Sensores criados por magia de adivinhação não podem\naparecer dentro da área protegida ou atravessar a\nbarreira no perímetro.\n As criaturas na área não podem ser alvo de magias de\nadivinhação.\n Nada pode se teletransportar para dentro ou para fora\nda área protegida.\n Viagem planar está bloqueada para dentro da área\nprotegida.\nConjurar essa magia no mesmo lugar, a cada dia, por\num ano, torna o efeito permanente.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 5° nível ou\nsuperior, você pode aumentar o tamanho do cubo em 30\nmetros de cada lado para cada nível do espaço acima do\n4°. Então, você poderia proteger um cubo de até 60 metros\nde lado usando um espaço de magia de 5° nível.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 5° nível ou\nsuperior, você pode aumentar o tamanho do cubo em 30\nmetros de cada lado para cada nível do espaço acima do\n4°. Então, você poderia proteger um cubo de até 60 metros\nde lado usando um espaço de magia de 5° nível.",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 280
    }
  },
  {
    "id": "magia-saraivada-de-espinhos",
    "nome": "Saraivada De Espinhos",
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
    "descricao": "Da próxima vez que você atingir uma criatura com um\nataque à distância com arma, antes da magia acabar,\nessa magia cria uma chuva de espinhos que brota da sua\narma à distância ou munição. Além do efeito normal do\nataque, o alvo do ataque e cada criatura a até 1,5 metro\ndele, devem realizar um teste de resistência de Destreza.\nUma criatura sofre 1d10 de dano perfurante se falhar na\nresistência ou metade desse dano se obtiver sucesso.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d10 para cada nível do\nespaço acima do 1° (até o máximo de 6d10).",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d10 para cada nível do\nespaço acima do 1° (até o máximo de 6d10).",
    "classes": [
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 280
    }
  },
  {
    "id": "magia-semiplano",
    "nome": "Semiplano",
    "nivel": 8,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V",
    "duracao": "1 hora",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria uma porta umbral em uma superfície sólida e\nlisa que você possa ver, dentro do alcance. A porta é\ngrande o suficiente para permitir a passagem de criaturas\nMédias sem dificuldade. Quando aberta, a porta levará a\num semiplano que parece uma sala vazia de 9 metros\nquadrados de dimensão, feita de madeira ou pedra.\nQuando a magia termina, a porta desaparece e, qualquer\ncriatura ou objeto dentro do semiplano, permanecerá\npreso lá, a medida que a porta desaparece do outro lado.\nCada vez que você conjura essa magia, você pode criar um\nnovo semiplano ou fazer a porta umbral se conectar a um\nsemiplano que você tenha criado em uma conjuração\nanterior dessa magia. Além disso, se você conhecer a\nnatureza e conteúdo do semiplano criado através da\nconjuração dessa magia por outra criatura, você pode\nfazer com que a porta umbral se conecte a esse semiplano.",
    "escalonamento": "",
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 280
    }
  },
  {
    "id": "magia-sentido-bestial",
    "nome": "Sentido Bestial",
    "nivel": 2,
    "escola": "adivinhação",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "S",
    "duracao": "Concentração, até 1 hora",
    "ritual": true,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca uma besta voluntária. Pela duração da magia,\nvocê pode usar sua ação para ver através dos olhos e ouvir\natravés dos ouvidos da besta e continua a fazê-lo até você\nusar sua ação para retornar aos seus sentidos normais.\nEnquanto estiver utilizando os sentidos da besta, você\nganha os benefícios de qualquer sentido especial possuído\npela criatura, no entanto, você estará cego e surdo em\nrelação aos seus próprios sentidos.",
    "escalonamento": "",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 281
    }
  },
  {
    "id": "magia-servo-invisivel",
    "nome": "Servo Invisível",
    "nivel": 1,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (um pedaço de barbante e um pouco de madeira)",
    "duracao": "1 hora",
    "ritual": true,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia cria uma força invisível, sem mente e sem\nforma que realiza tarefas simples, ao seu comando, até a\nmagia acabar. O servo aparece do nada em um espaço\ndesocupado no chão, dentro do alcance. Ele tem CA 10, 1\nponto de vida, Força 2 e não pode atacar. Se ele cair a 0\npontos de vida, a magia acaba.\nUma vez em cada um dos seus turnos, com uma ação\nbônus, você pode comandar, mentalmente, o servo para se\nmover até 4,5 metros e interagir com um objeto. O servo\npode realizar tarefas simples que um serviçal humano\nfaria, como buscar coisas, limpar, consertar, dobrar\nroupas, acender chamas, servir comida ou derramar\nvinho. Uma vez que um comando seja dado, o servo\nrealiza a tarefa da melhor forma possível, até completar a\ntarefa, então esperará o seu próximo comando.\nSe você comandar o servo a realizar uma tarefa que\npoderia afasta-lo a mais de 18 metros de você, a magia\ntermina.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 281
    }
  },
  {
    "id": "magia-sexto-sentido",
    "nome": "Sexto Sentido",
    "nivel": 9,
    "escola": "adivinhação",
    "tempo": "1 minuto",
    "alcance": "Toque",
    "componentes": "V, S, M (uma pena de colibri)",
    "duracao": "8 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca uma criatura voluntária e a abençoa com uma\nhabilidade limitada de ver o futuro iminente. Pela\nduração, o alvo não pode ser surpreendido e tem\nvantagem nas jogadas de ataque, testes de habilidade e\ntestes de resistência. Além disso, outras criaturas tem\ndesvantagem nas jogadas de ataque contra o alvo, pela\nduração.\nEssa magia termina imediatamente, se você conjura-la\nnovamente antes da duração acabar.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Druida",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 281
    }
  },
  {
    "id": "magia-silencio",
    "nome": "Silêncio",
    "nivel": 2,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S",
    "duracao": "Concentração, até 10 minutos",
    "ritual": true,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Pela duração, nenhum som pode ser criado dentro ou\natravessar uma esfera de 6 metros de raio centrada num\nponto, à sua escolha, dentro do alcance. Qualquer criatura\nou objeto totalmente dentro da esfera é imune a dano\ntrovejante e as criaturas estarão surdas enquanto\nestiverem completamente dentro dela. Conjurar magias\nque inclua a componente verbal é impossível ai.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Patrulheiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 281
    }
  },
  {
    "id": "magia-simbolo",
    "nome": "Símbolo",
    "nivel": 7,
    "escola": "abjuração",
    "tempo": "1 minuto",
    "alcance": "Toque",
    "componentes": "V, S, M (mercúrio, fósforo e pó de diamante e opala, com um valor total de, no mínimo, 1.000 po, consumidos pela magia)",
    "duracao": "Até ser dissipada ou ativada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Quando você conjura essa magia, você inscreve um glifo\nnocivo, tanto sobre uma superfície (como uma secção de\npiso, uma parede ou mesa) quanto dentro de um objeto\nque possa ser fechado (como um livro, um pergaminho ou\num baú de tesouro). Se você escolher uma superfície, o\nglifo pode cobrir uma área da superfície não superior a 3\nmetros de diâmetro. Se você escolher um objeto, o objeto\ndeve permanecer no seu local; se ele for movido mais de 3\nmetros de onde você conjurou essa magia, o glifo será\nquebrado e a magia termina sem ser ativada.\nO glifo é quase invisível e requer um teste de\nInteligência (Investigação) contra a CD da magia para ser\nencontrado.\nVocê define o que ativa o glifo quando você conjura a\nmagia. Para glifos inscritos em uma superfície, os gatilhos\nmais típicos incluem tocar ou ficar sobre o glifo, remover\noutro objeto cobrindo o glifo, aproximar-se a uma certa\ndistância do glifo ou manipular um objeto onde o glifo\nesteja inscrito. Para glifos inscritos dentro de objetos, os\ngatilhos mais comuns incluem abrir o objeto, aproximar-\nse a uma certa distância do objeto ou ver ou ler o glifo.\nVocê pode, posteriormente, aperfeiçoar o gatilho para\nque a magia se ative apenas sob certas circunstâncias ou\nde acordo com as características físicas (como altura ou\npeso), tipo de criatura (por exemplo, a proteção poderia\nser definida para afetar aberrações ou drow) ou\ntendência. Você pode, também, definir condições para\ncriaturas não ativarem o glifo, como aqueles que falarem\ndeterminada senha.\nQuando você inscreve o glifo, escolha uma das opções\nabaixo para seu efeito. Uma vez ativado, o glifo brilha,\npreenchendo uma esfera de 18 metros de raio com\npenumbra por 10 minutos, após esse tempo, a magia\ntermina. Cada criatura na esfera, quando o glifo é\nativado, é afetada por seu efeito, assim como uma\ncriatura que entrar na esfera a primeira vez num turno\nou termina seu turno nela.\nAtordoamento. Cada alvo deve realizar um teste de\nresistência de Sabedoria e ficará atordoada por 1 minuto\nse falhar na resistência.\nDesespero. Cada alvo deve realizar um teste de\nresistência de Carisma. Com uma falha na resistência, o\nalvo será consumido pelo desespero por 1 minuto.\nDurante esse período, ele não poderá atacar ou afetar\nqualquer criatura com habilidades, magias ou outros\nefeitos mágicos nocivos.\nDiscórdia. Cada alvo deve realizar um teste de\nresistência de Sabedoria. Com uma falha na resistência,\num alvo irá brigar e discutir com outras criaturas por 1\nminuto. Durante esse período, ele será incapaz de se\ncomunicar compreensivamente e terá desvantagem nas\njogadas de ataque e testes de habilidade.\nDor. Cada alvo deve realizar um teste de resistência\nde Constituição e ficará incapacitada com dores\nexcruciantes por 1 minuto se falhar na resistência.\nInsanidade. Cada alvo deve realizar um teste de\nresistência de Inteligência. Com uma falha na resistência,\no alvo é levado a loucura por 1 minuto. Uma criatura\ninsana, não pode realizar ações, não entende o que as\noutras criaturas dizem, não pode ler e fala apenas coisas\nsem sentido. O Mestre controla seus movimentos, que\nserão erráticos.\nMedo. Cada alvo deve realizar um teste de resistência\nde Sabedoria e ficará amedrontado por 1 minuto se falhar\nna resistência. Enquanto estiver amedrontado, o alvo\nlargará o que quer que esteja segurando e deve se afastar,\npelo menos 9 metros do glifo em cada um dos seus turnos,\nse for capaz.\nMorte. Cada alvo deve realizar um teste de resistência\nde Constituição, sofrendo 10d10 de dano necrótico se\nfalhar na resistência ou metade desse dano se passar na\nresistência.\nSono. Cada alvo deve realizar um teste de resistência\nde Sabedoria e cairá inconsciente por 10 minutos se\nfalhar na resistência. Uma criatura acorda se sofrer dano\nou se alguém usar sua ação para sacudi-la e estapeá-la\naté ela acordar.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 281
    }
  },
  {
    "id": "magia-similaridade",
    "nome": "Similaridade",
    "nivel": 5,
    "escola": "ilusão",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S",
    "duracao": "8 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia permite que você mude a aparência de\nqualquer quantidade de criaturas que você possa ver,\ndentro do alcance. Você dá a cada alvo que você escolheu\numa nova aparência ilusória. Um alvo involuntário pode\nrealizar um teste de resistência de Carisma, se for bem\nsucedido, a magia não o afetará.\nA magia disfarça a aparência física, assim como roupa,\narmadura, armas e equipamentos. Você pode fazer com\nque cada criatura pareça 30 centímetros mais baixa ou\nalta e aparente ser magra, gorda ou entre. Você não pode\nmudar o tipo do seu corpo, portanto, você deve adotar\numa forma que tenha a mesma disposição básica de\nmembros. No mais, a extensão da sua ilusão cabe a você.\nA magia permanece pela duração, a menos que você usa\nsua ação para dissipa-la precocemente.\nAs mudanças criadas por essa magia não conseguem\nse sustentar perante uma inspeção física. Por exemplo, se\nvocê usar essa magia para adicionar um chapéu ao seu\nvisual, objetos que passarem pelo chapéu e qualquer um\nque tocá-lo não sentirá nada ou sentirá sua cabeça e\ncabelo. Se você usar essa magia para aparentar ser mais\nmagro do que é, a mão de alguém que a erguer para tocar\nem você, irá esbarrar em você enquanto ainda está,\naparentemente, está no ar.\nUma criatura pode usar a ação dela para inspecionar\num alvo e fazer um teste de Inteligência (Investigação)\ncontra a CD da sua magia. Se for bem sucedido, ele estará\nciente de que o alvo está disfarçado.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 282
    }
  },
  {
    "id": "magia-simulacro",
    "nome": "Simulacro",
    "nivel": 7,
    "escola": "ilusão",
    "tempo": "12 horas",
    "alcance": "Toque",
    "componentes": "V, S, M (neve ou gelo em quantidade suficiente para fazer uma cópia em tamanho real da criatura duplicada; algum cabelo, recortes de unha ou outro pedaço do corpo da criatura, colocado dentro da neve ou gelo; e pó de rubi no valor de 1.500 po, polvilhado sobre a duplicata e consumido pela magia)",
    "duracao": "Até ser dissipada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Você modela uma duplicata ilusória de uma besta ou\nhumanoide, dentro do alcance, durante todo tempo de\nconjuração da magia. A duplicada é uma criatura,\nparcialmente real, formada de gelo ou neve e pode\nrealizar ações e, no mais, ser tratada como uma criatura\nnormal. Ela aparenta ser igual a original, mas tem\nmetade do máximo de pontos de vida da criatura e é\nformada sem qualquer equipamento. No mais, a ilusão\nusa todas as estatísticas da criatura que ela copiou.\nO simulacro é amigável a você e às criaturas que você\ndesignar. Ele obedece aos seus comandos verbais, se\nmovendo e agindo de acordo com seus desejos, agindo no\nseu turno em combate. O simulacro não possui capacidade\nde aprender ou de se tornar mais poderoso, portanto, ele\nnunca subirá de nível ou ganhará outras habilidades,\nnem poderá recuperar espaços de magia gastos.\nSe o simulacro sofrer dano, você pode repara-lo em um\nlaboratório alquímico, usando ervas e minerais raros no\nvalor de 100 po por ponto de vida recuperado. O simulacro\ndura até cair a 0 pontos de vida, no momento em que ele\nvolta a ser neve e derrete instantaneamente.\nSe você conjurar essa magia novamente, qualquer\nduplicata atualmente ativa, que você criou com essa\nmagia, é instantaneamente destruída.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 282
    }
  },
  {
    "id": "magia-sinal-de-esperanca",
    "nome": "Sinal De Esperança",
    "nivel": 3,
    "escola": "abjuração",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, S",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia confere esperança e vitalidade. Escolha\nqualquer quantidade de criaturas dentro do alcance. Pela\nduração, cada alvo tem vantagem em testes de resistência\nde Sabedoria e testes de resistência contra a morte e\nrecuperam o máximo de pontos de vida possível em\nqualquer cura.",
    "escalonamento": "",
    "classes": [
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 282
    }
  },
  {
    "id": "magia-sonho",
    "nome": "Sonho",
    "nivel": 5,
    "escola": "ilusão",
    "tempo": "1 minuto",
    "alcance": "Especial",
    "componentes": "V, S, M (um punhado de areia, um pouco de tinta e uma pena de escrita arrancada de um pássaro adormecido)",
    "duracao": "8 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia molda os sonhos de uma criatura. Escolha\numa criatura que você conheça como alvo dessa magia. O\nalvo deve estar no mesmo plano de existência que você.\nCriaturas que não dormem, como elfos, não podem ser\ncontatados por essa magia. Você, ou uma criatura\nvoluntária que você tocar, entram em um estado de\ntranse. Enquanto estiver me transe, o mensageiro está\nciente dos seus arredores, mas não pode realizar ações ou\nse mover.\nSe o alvo estiver dormindo, o mensageiro aparece no\nsonho do alvo e pode conversar com o alvo enquanto ele\nestiver dormindo, até o limite da duração da magia. O\nmensageiro também pode modificar o meio ambiente do\nsonho, criando paisagens, objetos e outras imagens. O\nmensageiro pode sair do transe a qualquer momento,\nterminando o efeito da magia prematuramente. O alvo se\nlembra do sonho perfeitamente quando acorda. Se o alvo\nestiver acordado quando a magia for conjurada, o\nmensageiro saberá disso e pode, tanto terminar o transe\n(e a magia) quando esperar o alvo cair no sono, no\nmomento em que o mensageiro aparecerá nos sonhos do\nalvo.\nVocê pode fazer o mensageiro parecer monstruoso e\naterrorizante para o alvo. Se o fizer, o mensageiro pode\nenviar uma mensagem de não mais que dez palavras,\nentão o alvo deve realizar um teste de resistência de\nSabedoria. Se falhar na resistência, ecos da\nmonstruosidade fantasmagórica criarão um pesadelo que\npermanecerá pela duração do sono do alvo e impede o alvo\nde ganhar qualquer benefício do descanso. Além disso,\nquando o alvo acordar, ele sofrerá 3d6 de dano psíquico.\nSe você tiver uma parte do corpo, mecha de cabelo,\nrecorte de unha ou porção similar do corpo do alvo, o alvo\nrealiza seu teste de resistência com desvantagem.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 282
    }
  },
  {
    "id": "magia-sono",
    "nome": "Sono",
    "nivel": 1,
    "escola": "encantamento",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S, M (um punhado de areia fina, pétalas de rosas ou um grilo)",
    "duracao": "1 minuto",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia põem as criaturas num entorpecimento\nmágico. Jogue 5d8; o total é a quantidade de pontos de\nvida de criaturas afetados pela magia. As criaturas numa\nárea de 6 metros de raio, centrada no ponto escolhido,\ndentro do alcance, são afetadas em ordem ascendente dos\npontos de vida atuais delas (ignorando criaturas\ninconscientes).\nComeçando com as criaturas com menos pontos de\nvida atuais, cada criatura afetada por essa magia cai\ninconsciente até a magia acabar, sofrer dano ou alguém\nusar sua ação para sacudi-la ou esbofeteá-la até acordar.\nSubtraia os pontos de vida de cada criatura do total antes\nde seguir para a próxima criatura com menos pontos de\nvida atuais. Os pontos de vida atuais da criatura devem\nser iguais ou menores que o valor restante para que a\ncriatura possa ser afetada.\nMortos-vivos e criaturas imunes a serem enfeitiçadas\nnão são afetadas por essa magia.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 2º nível ou\nsuperior, jogue 2d8 adicionais para cada nível do espaço\nacima do 1°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 2º nível ou\nsuperior, jogue 2d8 adicionais para cada nível do espaço\nacima do 1°.",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 283
    }
  },
  {
    "id": "magia-sugestao",
    "nome": "Sugestão",
    "nivel": 2,
    "escola": "encantamento",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V, M (uma língua de cobra e, ou um pedaço de favo de mel ou uma gota de azeite doce)",
    "duracao": "Concentração, até 8 horas",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você sugere um curso de atividade (limitado a uma ou\nduas sentenças) e, magicamente, influencia um criatura\nque você possa ver, dentro do alcance, e que possa ouvir e\ncompreender você. Criaturas que não podem ser\nenfeitiçadas são imunes a esse efeito. A sugestão deve ser\nformulada de modo que o curso de ação soe razoável.\nDizer para a criatura se esfaquear, se arremessar em\numa lança, tocar fogo em si mesma ou fazer algum outro\nato obviamente nocivo anulará o efeito da magia.\nO alvo deve realizar um teste de resistência de\nSabedoria. Se falhar na resistência, ele seguirá o curso de\nação que você descreveu, da melhor forma possível. O\ncurso de ação sugerido pode continuar por toda a duração.\nSe a atividade sugerida puder ser completada em um\ntempo menor, a magia termina quando o alvo completar o\nque lhe foi dito para que fizesse.\nVocê pode, também, especificar condições que irão\nativar uma atividade especial pela duração. Por exemplo,\nvocê poderia sugerir a um cavaleiro que entregasse seu\ncavalo de guerra ao primeiro mendigo que ele encontrar.\nSe a condição não for satisfeita antes da magia expirar, a\natividade não será concluída.\nSe você ou um dos seus companheiros causar dano a uma\ncriatura afetada por essa magia, a magia termina.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 283
    }
  },
  {
    "id": "magia-sugestao-em-massa",
    "nome": "Sugestão Em Massa",
    "nivel": 6,
    "escola": "encantamento",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, M (uma língua de cobra e, ou um pedaço de favo de mel ou uma gota de azeite doce)",
    "duracao": "24 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você sugere um curso de atividade (limitado a uma ou\nduas sentenças) e, magicamente, influencia até dozes\ncriaturas, à sua escolha, que você possa ver dentro do\nalcance e que possam ouvir e compreender você.\nCriaturas que não podem ser enfeitiçadas são imunes a\nesse efeito. A sugestão deve ser formulada de modo que o\ncurso de ação soe razoável. Dizer para a criatura se\nesfaquear, se arremessar em uma lança, tocar fogo em si\nmesma ou fazer algum outro ato obviamente nocivo\nanulará o efeito da magia.\nCada alvo deve realizar um teste de resistência de\nSabedoria. Se falhar na resistência, ele seguirá o curso de\nação que você descreveu, da melhor forma possível. O\ncurso de ação sugerido pode continuar por toda a duração.\nPor exemplo, você poderia sugeria a um grupo de soldados\nque deem todo o seu dinheiro para o primeiro mendigo\nque encontrarem. Se a condição não for atingida antes da\nmagia acabar, a atividade não é realizada.\nSe você ou um dos seus companheiros causar dano a\numa criatura afetada por essa magia, a magia termina\npara aquela criatura.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 7° nível, a duração\nserá de 10 dias. Quando você usar um espaço de magia de\n8° nível, a duração será de 30 dias. Quando você usar um\nespaço de magia de 9° nível, a duração será de 1 ano e 1\ndia.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 7° nível, a duração\nserá de 10 dias. Quando você usar um espaço de magia de\n8° nível, a duração será de 30 dias. Quando você usar um\nespaço de magia de 9° nível, a duração será de 1 ano e 1\ndia.",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 283
    }
  },
  {
    "id": "magia-sussurros-dissonantes",
    "nome": "Sussurros Dissonantes",
    "nivel": 1,
    "escola": "encantamento",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você sussurra uma melodia dissonante que apenas uma\ncriatura, à sua escolha, dentro do alcance pode ouvir,\ncausando-lhe uma terrível dor. O alvo deve realizar um\nteste de resistência de Sabedoria. Se falhar na\nresistência, ele sofrerá 3d6 de dano psíquico e deve,\nimediatamente, usar sua reação, se disponível, para se\nmover para o mais longe possível de você. A criatura não\nse moverá para um terreno obviamente perigoso, como\numa fogueira ou abismo. Se obtiver sucesso na\nresistência, o alvo sofre metade do dano e não precisa se\nafastar de você. Uma criatura surda obtém sucesso\nautomaticamente na sua resistência.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 1°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 2° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 1°.",
    "classes": [
      "Bardo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 283
    }
  },
  {
    "id": "magia-taumaturgia",
    "nome": "Taumaturgia",
    "nivel": 0,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "9 metros",
    "componentes": "V",
    "duracao": "Até 1 minuto",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você manifesta pequenas maravilhas, um sinal de poder\nsobrenatural, dentro do alcance. Você cria um dos\nseguintes efeitos mágicos dentro do alcance:\n Sua voz ressoa com o triplo do volume normal por 1\nminuto.\n Você provoca tremores inofensivos no solo por 1\nminuto.\n Você cria, instantaneamente, um som que se origina\nde um ponto, à sua escolha, dentro do alcance, como o\nbarulho de um trovão, o gralhar de um corvo ou\nsussurros sinistros.\n Você, instantaneamente, faz uma porta ou janela\ndestrancada se abrir ou se fechar.\n Você altera a aparência dos seus olhos por 1 minuto.\nSe você conjurar essa magia diversas vezes, você pode\nter até três dos efeitos de 1 minuto ativos por vez, e você\npode dissipar um desses efeitos com uma ação.",
    "escalonamento": "",
    "classes": [
      "Clérigo"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 284
    }
  },
  {
    "id": "magia-teia",
    "nome": "Teia",
    "nivel": 2,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (um pedaço de teia de aranha)",
    "duracao": "Concentração, até 1 hora",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você conjura uma massa de teias espessas e pegajosas\nnum ponto, à sua escolha, dentro do alcance. As teias\npreenchem um cubo de 6 metros naquele ponto, pela\nduração. As teias são terreno difícil e causam escuridão\nleve na área delas.\nSe as teias não estiverem sendo suportadas por duas\nmassas sólidas (como duas paredes ou árvores) ou em\ncamadas sobre um chão, parede ou teto, a teia conjurada\ndesaba sobre si mesma e a magia termina no início do seu\npróximo turno. As teias em camadas sobre uma superfície\nplana terão 1,5 metro de profundidade.\nCada criatura que começar seu turno nas teias ou\nentrar nelas durante seu turno, deve realizar um teste de\nresistência de Destreza. Se falhar na resistência, a\ncriatura estará impedida enquanto permanecer nas teias\nou até se libertar.\nUma criatura impedida pelas teias pode usar sua ação\npara realizar um teste de Força contra a CD da magia. Se\nobtiver sucesso, ela não estará mais impedida.\nAs teias são inflamáveis. Qualquer cubo de 1,5 metro\nde teia exposto ao fogo, é consumida por ele em 1 rodada,\ncausando 2d4 de dano de fogo a qualquer criatura que\ncomeçar seu turno nas chamas.",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 284
    }
  },
  {
    "id": "magia-telecinesia",
    "nome": "Telecinésia",
    "nivel": 5,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S",
    "duracao": "Concentração, até 10 minutos",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você adquire a habilidade de mover ou manipular\ncriaturas ou objetos através do pensamento. Quando você\nconjura a magia e, com sua ação a cada turno, pela\nduração, você pode exercer sua vontade sobre uma\ncriatura ou objeto que você possa ver, dentro do alcance,\ncausando os efeitos apropriados abaixo. Você pode afetar\no mesmo alvo rodada após rodada, ou escolher um novo a\nqualquer momento. Se você mudar de alvos, o alvo\nanterior não será mais afetado pela magia.\nCriatura. Você pode tentar mover uma criatura\nEnorme ou menor. Faça um teste de habilidade com sua\nhabilidade de conjuração resistido por um teste Força da\ncriatura. Se você vencer a disputa, você move a criatura\naté 9 metros em qualquer direção, incluindo para cima,\nmas não além do alcance da magia. Até o final do seu\npróximo turno, a criatura estará impedida pelo seu\nagarrão telecinético. Uma criatura erguida para cima\nestará suspensa no ar.\nEm rodadas subsequente, você pode usar sua ação\npara tentar manter seu agarrão telecinético na criatura\nrepetindo o teste resistido.\nObjeto. Você pode tentar mover um objeto pesando até\n500 quilos. Se o objeto não estiver sendo vestido ou\ncarregado, você o move, automaticamente, até 9 metros\nem qualquer direção, mas não além do alcance dessa\nmagia.\nSe o objeto estiver sendo vestido ou carregado por uma\ncriatura, você deve realizar um teste de habilidade com\nsua habilidade de conjuração resistido por um teste de\nForça da criatura. Se você for bem sucedido, você arranca\no objeto da criatura e o move até 9 metros, em qualquer\ndireção, mas não além do alcance dessa magia.\nVocê pode exercer um controle refinado sobre os\nobjetos com seu agarrão telecinético, como manipular\nferramentas simples, abrir uma porta ou um recipiente,\nguardar ou recuperar um item de um recipiente aberto ou\nderramar o conteúdo de um frasco.",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 284
    }
  },
  {
    "id": "magia-telepatia",
    "nome": "Telepatia",
    "nivel": 8,
    "escola": "adivinhação",
    "tempo": "1 ação",
    "alcance": "Ilimitado",
    "componentes": "V, S, M (um par de anéis de prata unidos)",
    "duracao": "24 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria uma ligação telepática entre você e uma\ncriatura voluntária com a qual você seja familiarizado. A\ncriatura pode estar em qualquer lugar no mesmo plano de\nexistência que você. A magia termina se você ou o alvo\nnão estiver mais no mesmo plano.\nAté a magia acabar, você e o alvo podem,\ninstantaneamente, compartilhar palavras, imagens, sons\ne outras mensagens sensoriais uma com a outra através\nda ligação e o alvo reconhece que é você a criatura que\nestá se comunicando com ele. A magia permite que uma\ncriatura com valor de Inteligência mínimo de 1\ncompreenda o sentido das suas palavras e capta o sentido\ngeral de qualquer mensagem sensorial que você enviar.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 284
    }
  },
  {
    "id": "magia-teletransporte",
    "nome": "Teletransporte",
    "nivel": 7,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "3 metros",
    "componentes": "V",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Essa magia, instantaneamente, transporta você e até oito\ncriaturas voluntárias, à sua escolha, que você possa ver\ndentro do alcance ou um único objeto que você possa ver\nno alcance, para um destino que você selecionou. Se você\nfor afetar um objeto, ele deve ser capaz de caber inteiro\ndentro de um cubo de 3 metros e não pode estar sendo\nempunhado ou carregado por uma criatura involuntária.\nO destino que você escolher deve ser conhecido por\nvocê e deve ser no mesmo plano de existência que você\nestá. Sua familiaridade com o destino determina se você\nchegará nele com sucesso. O Mestre rola um d100 e\nconsulta a tabela.\nÁrea\nFamiliaridade\nFiasco\nSimilar\nCírculo permanente\nObjeto associado\nMuito familiar\n01–05\n06–13\nVisto casualmente\n01–33\n34–43\nVisto uma vez\n01–43\n44–53\nDescrição\n01–43\n44–53\nDescrição falsa\n01–50\n51–100\nFamiliaridade. “Círculo permanente” significa um\ncírculo de teletransporte permanente o qual você conhece\na sequência de selos. “Objeto associado” significa que você\npossui um objeto retirado do destino desejado nos últimos\nseis meses, como um livro da biblioteca do mago, roupa de\ncama de uma suíte real ou um pedaço de mármore da\ntumba secreta do lich.\n“Muito familiar” é um lugar que você já tenha ido\nmuitas vezes, um lugar que você estudou cuidadosamente\nou um local que você possa ver enquanto conjura a magia.\n“Visto casualmente” é algum lugar que você tenha visto\nmais de uma vez, mas que não seja muito familiar. “Visto\numa vez” é um lugar que você só viu uma vez,\npossivelmente através de magia. “Descrição” é um lugar\ncuja localização e aparência você conhece através da\ndescrição de outrem, talvez através de um mapa.\n“Destino falso” é um local que não existe. Talvez você\ntenha tentado espionar o santuário de um inimigo, mas,\nao invés, viu uma ilusão ou você está tentando se\nteletransportar para um local familiar que não existe\nmais.\nNo Alvo. Você e seu grupo (ou objeto alvo) aparecem\nonde você queria.\nFora do Alvo. Você e seu grupo (ou objeto alvo)\naparecem a uma distância aleatória fora do destino em\numa direção aleatória. A distância do alvo é 1d10 x 1d10\npor cento da distância que você viajou. Por exemplo, se\nvocê tentou viajar 180 quilômetros, mas apareceu fora do\nalvo e rolou um 5 e um 3 nos dois d10s, então você saiu do\nalvo 15 por cento ou 27 quilômetros. O Mestre determina\na direção de fora do alvo aleatoriamente rolando um d8 e\ndesignando 1 como norte, 2 como nordeste, 3 como leste e\nassim por diante ao redor dos pontos cardeais. Se você\nseria teletransportado para uma cidade costeira, podendo\ncair a 27 quilômetros dela, no mar, você poderia ter\nproblemas.\nÁrea Similar. Você e seu grupo (ou objeto alvo)\naparecem em uma área diferente que, visualmente ou\ntematicamente, é similar a área alvo. Se você estava indo\npara o laboratório na sua casa, por exemplo, você pode\nparar em outro laboratório de mago ou em uma loja de\nsuprimentos alquímicos que terá muitas ferramentas\niguais às encontradas no seu laboratório. Geralmente,\nvocê aparecerá no local similar mais próximo, mas já que\na magia não tem limite de alcance, você pode,\nconcebivelmente, viajar para qualquer lugar no plano.\nFiasco. A mágica imprevisível da magia resulta em\numa jornada difícil. Cada criatura teletransportada (ou o\nobjeto alvo) sofrem 3d10 de dano de energia e o Mestre\nrola novamente a tabela para ver onde você foi parar\n(fiascos múltiplos podem ocorrer, causando dano a cada\nvez).",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 286
    }
  },
  {
    "id": "magia-teletransporte-por-arvores",
    "nome": "Teletransporte Por Árvores",
    "nivel": 6,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "3 metros",
    "componentes": "V, S",
    "duracao": "1 rodada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Fora do\nEssa magia cria uma ligação mágica entre uma planta\nAlvo\nNo Alvo\ninanimada Grande ou maior, dentro do alcance, e outra\nplanta a qualquer distância, no mesmo plano de\n01–100\n01–100\nexistência. Você deve ter visto ou tocado a planta de\n14–24\n25–100\ndestino, pelo menos uma vez antes. Pela duração,\nqualquer criatura pode entrar na planta alvo e sair da\n44–53\n54–100\n54–73\n74–100\nplanta destino usando 1,5 metro de movimento.\n54–73\n74–100",
    "escalonamento": "",
    "classes": [
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 286
    }
  },
  {
    "id": "magia-tempestade-da-vinganca",
    "nome": "Tempestade Da Vingança",
    "nivel": 9,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "Visão",
    "componentes": "V, S",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma agitada nuvem tempestuosa se forma, centrada num\nponto que você possa ver e se espalha num raio de 108\nmetros. Relâmpagos riscam a área, trovões ressoam e\nventos fortes silvam. Cada criatura embaixo da nuvem (a\nnão mais de 1.500 metros abaixo da nuvem) quando ela\naparece deve realizar um teste de resistência de\nConstituição. Com uma falha na resistência, uma criatura\nsofre 2d6 de dano trovejante e ficará surda por 5 minutos.\nA cada rodada que você mantiver a concentração nessa\nmagia, a tempestade produzirá efeitos adicionais no seu\nturno.\nRodada 2. Chuva ácida cai da nuvem. Cada criatura\ne objeto abaixo dela nuvem sofre 1d6 de dano ácido.\nRodada 3. Você convoca seis relâmpagos da nuvem\npara atingir seis criaturas ou objetos, à sua escolha,\nabaixo da nuvem. Uma mesma criatura ou objeto não\npode ser atingido por mais de um raio. Uma criatura\natingida deve realizar um teste de resistência de\nDestreza. A criatura sofrerá 10d6 de dano elétrico se\nfalhar na resistência ou metade desse dano se passar.\nRodada 4. Granizo chove da nuvem. Cada criatura\nabaixo da nuvem sofre 2d6 de dano de concussão.\nRodada 5–10. Ventos e chuva gelados atacam a área\nabaixo da nuvem. A área se torna terreno difícil e de\nescuridão densa. Cada criatura sofre 1d6 de dano de frio.\nAtaques com armas à distância na área são impossíveis.\nO vento e chuva contam como uma distração grave com os\npropósitos de manter a concentração em magias.\nFinalmente, ventos fortes (entre 30 e 75 quilômetros por\nhora) automaticamente dispersam nevoa, neblina e\nfenômenos similares na área, independentemente de\nserem mundanos ou mágicos.",
    "escalonamento": "",
    "classes": [
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 286
    }
  },
  {
    "id": "magia-tempestade-de-fogo",
    "nome": "Tempestade De Fogo",
    "nivel": 7,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "45 metros",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma tempestade feita de camadas de chamas crepitantes\naparece num local, à sua escolha, dentro do alcance. A\nárea da tempestade consiste de até dez cubos de 3 metros,\nque você pode organizar como desejar. Cada cubo deve\nter, pelo menos, uma face adjacente a face de outro cubo.\nCada criatura na área deve realizar um teste de\nresistência de Destreza. Ela sofre 7d10 de dano de fogo se\nfalhar na resistência, ou metade desse dano se obtiver\nsucesso.\nO fogo causa dano aos objetos na área e incendeia\nobjetos inflamáveis que não estejam sendo vestidos ou\ncarregados. Se desejar, a vida vegetal na área pode não\nser afetada por essa magia.",
    "escalonamento": "",
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 287
    }
  },
  {
    "id": "magia-tempestade-de-gelo",
    "nome": "Tempestade De Gelo",
    "nivel": 4,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "90 metros",
    "componentes": "V, S, M (um pouco de poeira e algumas gotas de água)",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma rajada de pedras de gelo batem no chão em um\ncilindro de 6 metros de raio por 12 metros de altura,\ncentrado num ponto dentro do alcance. Cada criatura no\ncilindro deve realizar um teste de resistência de Destreza.\nUma criatura sofre 2d8 de dano de concussão e 4d6 de\ndano de frio se falhar na resistência ou metade desse\ndano se obtiver sucesso.\nO granizo torna a área da tempestade em terreno\ndifícil até o final do seu próximo turno.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 5° nível ou\nsuperior, o dano de concussão aumenta em 1d8 para cada\nnível do espaço acima do 4°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 5° nível ou\nsuperior, o dano de concussão aumenta em 1d8 para cada\nnível do espaço acima do 4°.",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 287
    }
  },
  {
    "id": "magia-tentaculos-negros-de-evard",
    "nome": "Tentáculos Negros De Evard",
    "nivel": 4,
    "escola": "conjuração",
    "tempo": "1 ação",
    "alcance": "27 metros",
    "componentes": "V, S, M (um pedaço de tentáculo de um polvo gigante ou lula gigante)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Tentáculos negros retorcidos preenchem um quadrado de\n6 metros no chão, que você possa ver dentro do alcance.\nPela duração, esses tentáculos transformam o solo na\nárea em terreno difícil.\nQuando uma criatura adentrar a área afetada pela\nprimeira vez em um turno ou começar o turno dela lá, a\ncriatura deve ser bem sucedida num teste de resistência\nde Destreza ou sofrerá 3d6 de dano de concussão e estará\nimpedida pelos tentáculos até o fim da magia. Uma\ncriatura que começar seu turno na área e já estiver\nimpedida pelos tentáculos sofre 3d6 de dano de concussão.\nUma criatura impedida pelos tentáculos pode usar sua\nação para realizar um teste de Força ou Destreza (à\nescolha dela) contra a CD da sua magia. Se ela obtiver\nsucesso, ela se libertará.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 287
    }
  },
  {
    "id": "magia-terremoto",
    "nome": "Terremoto",
    "nivel": 8,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "150 metros",
    "componentes": "V, S, M (um pouco de poeira, uma pedra e um pedaço de barro)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria um distúrbio sísmico num ponto no solo, que\nvocê possa ver dentro do alcance. Pela duração, um\ntremor intenso rompe o solo em um círculo com 30 metros\nde raio centrado no ponto e sacode criaturas e estruturas\nem contato com o chão na área.\nO solo na área torna-se terreno difícil. Cada criatura\nno solo que estiver se concentrando, deve realizar um\nteste de resistência de Constituição. Se falha na\nresistência, a concentração da criatura é interrompida.\nQuando você conjura essa magia, e ao final de cada\nturno que você gastar se concentrando nela, cada criatura\nno solo na área deve realizar um teste de resistência de\nDestreza. Se falhar na resistência, a criatura será\nderrubada no chão.\nEssa magia pode ter efeitos adicionais a depender do\nterreno na área, como determinado pelo Mestre.\nFissuras. Fissuras se abrem por toda área da magia,\nno começo do seu próximo turno, após você conjurar a\nmagia. Um total de 1d6 dessas fissuras se abrem em\nlocais escolhidos pelo Mestre. Cada um tem 1d10 x 3\nmetros de profundidade, 3 metros de largura e se estende\nde uma extremidade até o lado oposto da área da magia.\nUma criatura que estiver em um ponto onde uma fissura\nse abriu deve ser bem sucedido num teste de resistência\nde Destreza ou cairá dentro dela. Uma criatura que\nobtenha sucesso na resistência se move com a margem da\nfissura, à medida que ela se abre.\nUma fissura que se abra abaixo de uma estrutura faz\ncom que ela, automaticamente, desmorone (veja abaixo).\nEstruturas. O tremor causa 50 de dano de concussão\na qualquer estrutura em contato com o solo na área,\nquando você conjurar a magia e, no início de cada turno\naté a magia terminar. Se a estrutura cair a 0 pontos de\nvida, ela desmorona e, potencialmente, fere criaturas\npróximas. Uma criatura a uma distância inferior a\nmetade da altura da estrutura deve realizar um teste de\nresistência de Destreza. Se falhar na resistência, a\ncriatura sofrerá 5d6 de dano de concussão, cairá no chão e\nestará soterrada nos escombros, precisando de um teste\nde Força (Atletismo) com CD 20, usando uma ação, para\nescapar. O Mestre pode ajustar a CD para cima ou para\nbaixo, dependendo da natureza dos escombros. Se obtiver\nsucesso na resistência, a criatura sofre metade do dano e\nnão estará caída ou soterrada.",
    "escalonamento": "",
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 287
    }
  },
  {
    "id": "magia-terreno-alucinogeno",
    "nome": "Terreno Alucinógeno",
    "nivel": 4,
    "escola": "ilusão",
    "tempo": "10 minutos",
    "alcance": "90 metros",
    "componentes": "V, S, M (uma pedra, um galho e um pouco de planta verde)",
    "duracao": "24 horas",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você faz com que um terreno natural num cubo de 45\nmetros dentro do alcance, pareça, soe e cheire com outro\ntipo de terreno natural. Portanto, campos abertos ou uma\nestrada podem ser modificados para se assemelharem a\num pântano, colina, fenda ou algum outro tipo de terreno\ndifícil ou intransponível. Uma lagoa pode ser modificada\npara se parecer com um prado, um precipício com um\ndeclive suave ou um barranco pedregoso com uma estrada\nlarga e lisa. Estruturas manufaturadas, equipamentos e\ncriaturas dentro da área não tem suas aparências\nmodificadas.\nAs características táteis do terreno são inalteradas,\nportanto, as criaturas que adentrarem na área estão\nsusceptíveis de ver através da ilusão. Se a diferença não\nfor obvia ao toque, uma criatura que examine a ilusão\ncuidadosamente, pode realizar um teste de Inteligência\n(Investigação) contra a CD da magia para desacredita-la.\nUma criatura que discernir a ilusão do que ela é, a\nenxerga como uma imagem vaga sobrepondo o terreno.",
    "escalonamento": "",
    "classes": [
      "Bardo",
      "Bruxo",
      "Druida",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 287
    }
  },
  {
    "id": "magia-toque-arrepiante",
    "nome": "Toque Arrepiante",
    "nivel": 0,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "36 metros",
    "componentes": "V, S",
    "duracao": "1 rodada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você cria uma mão esquelética fantasmagórica no espaço\nde uma criatura, dentro do alcance. Realize um ataque à\ndistância com magia contra a criatura para afeta-la com o\nfrio sepulcral. Se atingir, a criatura sofre 1d8 de dano\nnecrótico e não poderá recuperar pontos de vida até o\ninício do seu próximo turno. Até lá, a mão ficará presa ao\nalvo.\nSe você atingir um alvo morto-vivo, ele terá\ndesvantagem nas jogadas de ataque contra você até o\nfinal do seu próximo turno.\nO dano dessa magia aumenta em 1d8 quando você\nalcança o 5° nível (2d8), 11° nível (3d8) e 17° nível (4d8).",
    "escalonamento": "",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 288
    }
  },
  {
    "id": "magia-toque-chocante",
    "nome": "Toque Chocante",
    "nivel": 0,
    "escola": "evocação",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S",
    "duracao": "Instantânea",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Eletricidade surge da sua mão para transmitir um choque\nem uma criatura que você tentar tocar. Faça um ataque\ncorpo-a-corpo com magia contra o alvo. Você tem\nvantagem na jogada de ataque se o alvo estiver vestindo\nqualquer armadura de metal. Se atingir, o alvo sofre 1d8\nde dano elétrico e não pode usar reações até o início do\npróximo turno dele.\nO dano da magia aumenta em 1d8 quando você\nalcança o 5° nível (2d8), 11° nível (3d8) e 17° nível (4d8).",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 288
    }
  },
  {
    "id": "magia-toque-vampirico",
    "nome": "Toque Vampírico",
    "nivel": 3,
    "escola": "necromancia",
    "tempo": "1 ação",
    "alcance": "Pessoal",
    "componentes": "V, S",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "O toque da sua mão coberta de sombras pode drenar a\nforça vital dos outros para curar seus ferimentos. Realize\num ataque corpo-a-corpo com magia contra uma criatura\nao seu alcance. Se atingir, o alvo sofre 3d6 de dano\nnecrótico e você recupera pontos de vida igual à metade\ndo dano necrótico causado. Até a magia acabar, você pode\nrealizar o ataque novamente, no seu turno, com uma\nação.\nEm Níveis Superiores. Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 3°.",
    "escalonamento": "Quando você conjurar essa\nmagia usando um espaço de magia de 4° nível ou\nsuperior, o dano aumenta em 1d6 para cada nível do\nespaço acima do 3°.",
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 288
    }
  },
  {
    "id": "magia-tranca-arcana",
    "nome": "Tranca Arcana",
    "nivel": 2,
    "escola": "abjuração",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (pó de ouro valendo, no mínimo, 25 po, consumido pela magia)",
    "duracao": "Até ser dissipada",
    "ritual": false,
    "concentracao": false,
    "materialCusto": true,
    "materialConsumido": true,
    "descricao": "Você toca uma porta, janela, portão, baú ou outra entrada\nfechada e ela ficará trancada pela duração. Você e as\ncriaturas que você designar, quando você conjurar essa\nmagia, podem abrir o objeto normalmente. Você também\npode definir uma senha que, quando falada a 1,5 metro do\nobjeto, suprime a magia por 1 minuto. De outra forma, ele\né intransponível até ser quebrado ou a magia seja\ndissipada ou suprimida. Conjurar arrombar no objeto\nsuprime a tranca arcana por 10 minutos.\nEnquanto estiver sob efeito dessa magia, o objeto é\nmais difícil de quebrar ou de forçar para abrir; a CD para\nquebra-lo ou de arromba-lo aumenta em 10.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 288
    }
  },
  {
    "id": "magia-truque-de-corda",
    "nome": "Truque De Corda",
    "nivel": 2,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "Toque",
    "componentes": "V, S, M (pó de extrato de milho e um laço de pergaminho trançado)",
    "duracao": "1 hora",
    "ritual": false,
    "concentracao": false,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Você toca um pedaço de corda que tenha até 18 metros de\ncomprimento. Uma ponta da corda então, se ergue no ar\naté toda a corda estar erguida e perpendicular ao solo. Na\nponta de cima da corda, uma entrada invisível se abre\npara um espaço extradimensional que permanece até a\nmagia acabar.\nO espaço extradimensional pode ser alcançado\nescalando a corda até o topo. O espaço pode abrigar até\noito criaturas Médias ou menores. A corda pode ser\npuxada para dentro do buraco, fazendo-a desaparecer\npara os observadores do lado de fora do espaço.\nAtaques e magias não podem ultrapassar a entrada,\nentrando ou saindo do espaço extradimensional, mas\nquem está dentro pode ver o lado de fora, como se\nestivesse olhando por uma janela de 0,9 metro por 1,5\nmetro, centrada na corda.\nTudo que estiver dentro do espaço extradimensional\ncai quando a magia acabar.",
    "escalonamento": "",
    "classes": [
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 288
    }
  },
  {
    "id": "magia-tsunami",
    "nome": "Tsunami",
    "nivel": 8,
    "escola": "conjuração",
    "tempo": "1 minuto",
    "alcance": "Visão",
    "componentes": "V, S",
    "duracao": "Concentração, até 6 rodadas",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Uma muralha de água aparece do nada num ponto, à sua\nescolha, dentro do alcance. Você pode fazer a muralha ter\naté 90 metros de comprimento, 90 metro de altura e 15\nmetros de espessura. A muralha permanece pela duração.\nQuando a muralha aparece, cada criatura dentro da\nárea deve realizar um teste de resistência de Força. Se\nfalhar na resistência, uma criatura sofrerá 6d10 de dano\nde concussão ou metade desse dano se passar na\nresistência.\nNo início de cada um dos seus turnos, após a muralha\naparecer, ela, junto com qualquer criatura nela, se afasta\n15 metros de você. Qualquer criatura Enorme ou menor\ndentro da muralha ou no espaço que a muralha entrar\nquando ela se mover, deve ser bem sucedida num teste de\nresistência de Força ou sofrerá 5d6 de dano de concussão.\nUma criatura pode sofrer esse dano apenas uma vez por\nrodada. No final do turno, a altura da muralha é reduzida\nem 15 metros e o dano que as criaturas sofrem da magia\nnas rodadas subsequentes é reduzido em 1d10. Quando a\nmuralha chegar a 0 metro de altura, a magia acaba.\nUma criatura pega pela muralha, pode se mover\nnadando. Devido à força da onda, no entanto, a criatura\ndeve realizar um teste de Força (Atletismo) contra a CD\nda magia para conseguir se mover. Se ela falhar no teste,\nnão conseguirá se mover. Uma criatura que se mova para\nfora da área, cairá no chão.",
    "escalonamento": "",
    "classes": [
      "Druida"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 288
    }
  },
  {
    "id": "magia-velocidade",
    "nome": "Velocidade",
    "nivel": 3,
    "escola": "transmutação",
    "tempo": "1 ação",
    "alcance": "18 metros",
    "componentes": "V, S, M (uma raspa de raiz de alcaçuz)",
    "duracao": "Concentração, até 1 minuto",
    "ritual": false,
    "concentracao": true,
    "materialCusto": false,
    "materialConsumido": false,
    "descricao": "Escolha uma criatura voluntária que você possa ver,\ndentro do alcance. Até a magia acabar, o deslocamento do\nalvo é dobrado, ele ganha +2 de bônus na CA, ele tem\nvantagem em testes de resistência de Destreza e ganha\numa ação adicional em cada um dos turnos dele. A ação\npode ser usada apenas para realizar as ações de Ataque\n(um ataque com arma, apenas), Disparada, Desengajar,\nEsconder ou Usar um Objeto.\nQuando a magia acabar, o alvo não poderá se mover\nou realizar ações até depois do seu próximo turno, à\nmedida que uma onda de letargia toma conta dele.",
    "escalonamento": "",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "referencia": {
      "livro": "LDJ fornecido",
      "pagina": 289
    }
  }
]; if(typeof module!=="undefined"&&module.exports)module.exports=dados;else (r.ForjaMagias||(r.ForjaMagias=[])).push(...dados);})(globalThis);
