// talentos_phb.js

// Lista de talentos (feats) adicionada como arquivo separado.
// Pode ser importado ou mesclado em banco_phb.js se desejar.

const talentos = {
  "Adepto Elemental (Elemental Adept)": {
    preRequisitos: "Capacidade de conjurar pelo menos uma magia",
    beneficios: "Suas magias ignoram a resistência a um tipo de dano escolhido (ácido, elétrico, fogo, frio ou trovão). Além disso, ao rolar dados de dano desse tipo para uma magia, você pode tratar qualquer resultado 1 como se fosse 2. Pode ser escolhido várias vezes, selecionando elementos diferentes."
  },

  "Adepto Marcial (Martial Adept)": {
    beneficios: "Você aprende duas manobras da classe de arquétipo Mestre de Batalha do Guerreiro. Você ganha um dado de superioridade (um d6) para alimentar essas manobras, o qual é recuperado após um descanso curto ou longo."
  },

  "Alerta (Alert)": {
    beneficios: "+5 de bônus em iniciativa. Você não pode ser surpreso enquanto estiver consciente, e criaturas escondidas não ganham vantagem nas jogadas de ataque contra você por estarem ocultas."
  },

  "Ambidestro (Dual Wielder)": {
    beneficios: "+1 de bônus na CA enquanto estiver empunhando uma arma corpo-a-corpo em cada mão. Permite usar o combate com duas armas mesmo se as armas não forem leves, e permite sacar/guardar duas armas de uma mão ao mesmo tempo."
  },

  "Atacante Bestial (Savage Attacker)": {
    beneficios: "Uma vez por turno, ao rolar o dano de um ataque corpo-a-corpo com arma, você pode rolar novamente os dados de dano e escolher qual dos dois valores utilizar."
  },

  "Atirador Aguçado (Sharpshooter)": {
    beneficios: "Você domina o uso de armas à distância e consegue realizar disparos extremamente difíceis. (Detalhes adicionais dos benefícios omitidos neste resumo)."
  },

  "Atirador de Magia (Spell Sniper)": {
    preRequisitos: "Capacidade de conjurar pelo menos uma magia",
    beneficios: "Dobra o alcance de suas magias que requerem jogada de ataque. Seus ataques à distância com magia ignoram meia-cobertura e três-quartos de cobertura. Você também aprende um truque de ataque da lista de Bardo, Bruxo, Clérigo, Druida, Feiticeiro ou Mago."
  },

  "Atleta (Athlete)": {
    beneficios: "Aumenta Força ou Destreza em 1 (máximo de 20). Levantar-se quando estiver caído consome apenas 1,5 metro de deslocamento. Escalar não custa movimento adicional, e você pode realizar saltos com corrida se movendo apenas 1,5 metro antes."
  },

  "Ator (Actor)": {
    beneficios: "Aumenta Carisma em 1 (máximo de 20). Garante vantagem em testes de Atuação e Enganação para se passar por outra pessoa. Permite imitar a voz de outras pessoas ou sons de criaturas que você tenha ouvido por pelo menos 1 minuto."
  },

  "Conjurador de Guerra (War Caster)": {
    preRequisitos: "Capacidade de conjurar pelo menos uma magia",
    beneficios: "Vantagem em testes de resistência de Constituição para manter concentração ao sofrer dano. Permite realizar componentes somáticos mesmo empunhando armas ou escudo. Permite usar uma reação para conjurar uma magia quando uma criatura provoca um ataque de oportunidade por movimento."
  },

  "Conjurador de Ritual (Ritual Caster)": {
    preRequisitos: "Inteligência ou Sabedoria 13 ou maior",
    beneficios: "Você adquire um livro de rituais com duas magias de 1º nível de ritual de uma classe de sua escolha (Bardo, Bruxo, Clérigo, Druida, Feiticeiro ou Mago). Permite transcrever outras magias de rituais encontradas em pergaminhos ou grimórios, gastando tempo e ouro por nível da magia."
  },

  "Curandeiro (Healer)": {
    beneficios: "Estabilizar uma criatura moribunda com um kit de primeiros-socorros faz com que ela recupere 1 ponto de vida. Com uma ação, você pode gastar um uso do kit para curar uma criatura em 1d6 + 4, mais um adicional igual ao número de Dados de Vida dela (uma vez por descanso curto ou longo por criatura)."
  },

  "Duelista Defensivo (Defensive Duelist)": {
    preRequisitos: "Destreza 13 ou maior",
    beneficios: "Ao empunhar uma arma de acuidade na qual seja proficiente, você pode usar sua reação para adicionar seu bônus de proficiência à sua CA contra um ataque corpo-a-corpo."
  },

  "Especialista em Besta (Crossbow Expert)": {
    beneficios: "Ignora a qualidade de recarga de bestas nas quais você tem proficiência. Estar a 1,5 metro de uma criatura hostil não impõe desvantagem em suas jogadas de ataque à distância. Ao usar a ação de Ataque com arma de uma mão, pode usar ação bônus para atacar com besta de mão."
  },

  "Especialista em Briga (Tavern Brawler)": {
    beneficios: "Aumenta Força ou Constituição em 1 (máximo de 20). Seus ataques desarmados causam 1d4 de dano. Ao atingir uma criatura com ataque desarmado ou arma improvisada no seu turno, pode tentar agarrá-la como ação bônus."
  },

  "Explorador de Cavernas (Dungeon Delver)": {
    beneficios: "Vantagem em testes de Percepção e Investigação para encontrar portas secretas. Vantagem em testes de resistência e resistência ao dano causado por armadilhas. Permite procurar armadilhas viajando em ritmo normal."
  },

  "Imobilizador (Grappler)": {
    preRequisitos: "Força 13 ou maior",
    beneficios: "Vantagem em ataques contra criaturas que você tenha agarrado. Você pode tentar realizar um segundo teste para imobilizar a criatura agarrada, deixando ambos na condição impedido."
  },

  "Iniciado em Magia (Magic Initiate)": {
    beneficios: "Você aprende dois truques e uma magia de 1º nível de uma classe de sua escolha. A magia de 1º nível pode ser conjurada uma vez por descanso longo."
  },

  "Investida Poderosa (Charger)": {
    beneficios: "Ao usar a ação de Disparada, você pode usar uma ação bônus para fazer um ataque corpo-a-corpo ou empurrar uma criatura. Se mover-se pelo menos 3 metros em linha reta antes dessa ação bônus, ganha +5 no dano do ataque ou empurra o alvo por até 3 metros."
  },

  "Líder Inspirador (Inspiring Leader)": {
    preRequisitos: "Carisma 13 ou maior",
    beneficios: "Você gasta 10 minutos inspirando até 6 companheiros dentro de 9 metros. Cada um ganha pontos de vida temporários igual ao seu nível + seu modificador de Carisma (uma vez por descanso curto ou longo)."
  },

  "Maestria em Arma de Haste (Polearm Master)": {
    beneficios: "Oferece técnicas de combate e alcance aprimorado para armas de haste. (Detalhes adicionais omitidos)."
  },

  "Mestre de Armas Pesadas (Heavy Armor Master)": {
    beneficios: "Aumenta Força em 1 (máximo de 20). Ao usar uma armadura pesada, reduz em 3 todo dano de concussão, cortante e perfurante recebido de ataques não-mágicos."
  },

  "Matador de Conjuradores (Mage Slayer)": {
    beneficios: "Quando uma criatura a 1,5 metro de você conjura uma magia, você pode usar sua reação para atacá-la. Ao causar dano em um conjurador concentrado em magia, ele tem desvantagem no teste para manter a concentração. Vantagem em salvaguardas contra magias conjuradas por criaturas a até 1,5 metro de você."
  },

  "Mente Afiada (Keen Mind)": {
    beneficios: "Aumenta Inteligência em 1 (máximo de 20). Você sempre sabe qual é a direção do norte, o número de horas para o nascer ou pôr do sol, e pode relembrar com precisão qualquer coisa que tenha visto ou ouvido no último mês."
  },

  "Mestre de Armas (Weapon Master)": {
    beneficios: "Aumenta Força ou Destreza em 1 (máximo de 20). Você ganha proficiência com quatro armas simples ou marciais de sua escolha."
  },

  "Mestre de Armas Grandes (Great Weapon Master)": {
    beneficios: "Permite desferir golpes devastadores e usar o peso das armas em sua vantagem. (Detalhes adicionais omitidos)."
  },

  "Mestre de Escudos (Shield Master)": {
    beneficios: "Se você for alvo de um efeito que exija salvaguarda de Destreza para sofrer apenas metade do dano, você pode usar sua reação para interpor o escudo e não sofrer dano caso passe no teste. (Outros benefícios omitidos)."
  },

  "Mobilidade (Mobile)": {
    beneficios: "Seu deslocamento aumenta em 3 metros. Ao usar Disparada, mover-se por terreno difícil não custa movimento adicional. Ao realizar um ataque corpo-a-corpo contra uma criatura, você não provoca ataques de oportunidade dela pelo resto do turno."
  },

  "Observador (Observant)": {
    beneficios: "Aumenta Inteligência ou Sabedoria em 1 (máximo de 20). Você pode ler os lábios de criaturas falando um idioma que você compreenda. Você recebe +5 de bônus nos valores passivos de Percepção e Investigação."
  },

  "Perito (Skilled)": {
    beneficios: "Você ganha proficiência em qualquer combinação de três perícias ou ferramentas de sua escolha."
  },

  "Poliglota (Linguist)": {
    beneficios: "Aumenta Inteligência em 1 (máximo de 20). Você aprende três idiomas à sua escolha. Permite criar criptogramas escritos que outros só decifram com teste de Inteligência ou mágica."
  },

  "Proteção Leve (Lightly Armored)": {
    beneficios: "Aumenta Força ou Destreza em 1 (máximo de 20). Você ganha proficiência com armaduras leves."
  },

  "Proteção Moderada (Moderately Armored)": {
    preRequisitos: "Proficiência em armadura leve",
    beneficios: "Aumenta Força ou Destreza em 1 (máximo de 20). Você ganha proficiência com armaduras médias e escudos."
  },

  "Proteção Pesada (Heavily Armored)": {
    preRequisitos: "Proficiência em armadura média",
    beneficios: "Aumenta Força em 1 (máximo de 20). Você ganha proficiência com armaduras pesadas."
  },

  "Resiliente (Resilient)": {
    beneficios: "Escolha um atributo para aumentar em 1 (máximo de 20). Você ganha proficiência nos testes de resistência do atributo escolhido."
  },

  "Resistente (Durable)": {
    beneficios: "Aumenta Constituição em 1 (máximo de 20). O valor mínimo recuperado ao rolar Dado de Vida para recuperar pontos de vida é igual a duas vezes seu modificador de Constituição (mínimo de 2)."
  },

  "Robusto (Tough)": {
    beneficios: "Seu máximo de pontos de vida aumenta em duas vezes o seu nível ao adquirir o talento. Toda vez que subir de nível, você ganha 2 pontos de vida adicionais."
  },

  "Sentinela (Sentinel)": {
    beneficios: "Atingir uma criatura com ataque de oportunidade zera o deslocamento dela pelo resto do turno. Criaturas provocam ataques de oportunidade de você mesmo usando a ação de Desengajar. Quando uma criatura a até 1,5 metro de você atacar um alvo que não possua esse talento, você pode usar sua reação para fazer um ataque corpo-a-corpo contra o atacante."
  },

  "Sorrateiro (Skulker)": {
    preRequisitos: "Destreza 13 ou maior",
    beneficios: "Você pode tentar se esconder quando estiver levemente obscurecido. Errar um ataque à distância enquanto estiver escondido não revela sua posição. Penumbra não impõe desvantagem em testes de Percepção baseados em visão."
  },

  "Sortudo (Lucky)": {
    beneficios: "Você ganha 3 pontos de sorte. Pode gastar 1 ponto de sorte para rolar um d20 adicional em jogadas de ataque, testes de habilidade ou testes de resistência, escolhendo qual dado utilizar. Pontos são restaurados após um descanso longo."
  }
};

// Para uso com CommonJS/Node: module.exports = talentos;
// Para uso em browser, pode-se importar o arquivo diretamente e acessar a variável 'talentos'.

if (typeof module !== 'undefined' && module.exports) {
  module.exports = talentos;
}
