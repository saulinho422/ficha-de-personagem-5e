// banco_phb.js

const bancoDnD = {
racas: {
    "Anão": {
        descricao: "Anões são audazes, resistentes e conhecidos como hábeis guerreiros e mineradores. Têm longa memória e longo rancor.",
        bonusAtributos: { constituicao: 2 },
        deslocamento: 7.5,
        caracteristicas: ["Visão no Escuro", "Resiliência Anã", "Treinamento Anão em Combate", "Proficiência com Ferramentas", "Especialização em Rochas"],

        idiomas: ["Comum", "Anão"],
        idiomasEscolha: 0,
        proficienciasArmas: ["Machado de Batalha", "Machadinha", "Martelo Leve", "Martelo de Guerra"],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [
            "Ferramentas de ferreiro",
            "Suprimentos de cervejeiro",
            "Ferramentas de pedreiro"
        ],
        ferramentasEscolha: 1,

        descricoesCaracteristicas: {
            "Visão no Escuro": "Enxerga na penumbra a até 18 metros como se fosse luz plena e, no escuro, como se fosse penumbra, apenas em tons de cinza.",
            "Resiliência Anã": "Concede vantagem em testes de resistência contra veneno e resistência a dano de veneno.",
            "Treinamento Anão em Combate": "Concede proficiência com machados de batalha, machadinhas, martelos leves e martelos de guerra.",
            "Proficiência com Ferramentas": "Concede proficiência, à escolha, com ferramentas de ferreiro, suprimentos de cervejeiro ou ferramentas de pedreiro.",
            "Especialização em Rochas": "Em testes de Inteligência (História) relacionados a trabalhos em pedra, considera o personagem proficiente e aplica o dobro do bônus de proficiência."
        },

        subracas: {
            "Anão da Colina": {
                bonusAtributos: { sabedoria: 1 },
                caracteristicas: ["Tenacidade Anã"],

                idiomas: [],
                idiomasEscolha: 0,
                proficienciasArmas: [],
                proficienciasArmaduras: [],
                proficienciasFerramentas: [],
                ferramentasEscolha: 0,

                descricoesCaracteristicas: {
                    "Tenacidade Anã": "Aumenta o máximo de pontos de vida em 1 e concede mais 1 ponto de vida sempre que o personagem sobe de nível."
                }
            },

            "Anão da Montanha": {
                bonusAtributos: { forca: 2 },
                caracteristicas: ["Treinamento Anão com Armaduras"],

                idiomas: [],
                idiomasEscolha: 0,
                proficienciasArmas: [],
                proficienciasArmaduras: ["Armaduras leves", "Armaduras médias"],
                proficienciasFerramentas: [],
                ferramentasEscolha: 0,

                descricoesCaracteristicas: {
                    "Treinamento Anão com Armaduras": "Concede proficiência com armaduras leves e médias."
                }
            }
        }
    },

    "Elfo": {
        descricao: "Elfos são um povo mágico de graça sobrenatural, vivendo no mundo sem pertencer inteiramente a ele.",
        bonusAtributos: { destreza: 2 },
        deslocamento: 9,
        caracteristicas: ["Visão no Escuro", "Sentidos Aguçados", "Ancestral Feérico", "Transe"],

        idiomas: ["Comum", "Élfico"],
        idiomasEscolha: 0,
        proficienciasArmas: [],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        descricoesCaracteristicas: {
            "Visão no Escuro": "Enxerga na penumbra a até 18 metros como se fosse luz plena e, no escuro, como se fosse penumbra, apenas em tons de cinza.",
            "Sentidos Aguçados": "Concede proficiência na perícia Percepção.",
            "Ancestral Feérico": "Concede vantagem em testes de resistência contra ser enfeitiçado e impede que magias coloquem o personagem para dormir.",
            "Transe": "Permite substituir o sono por 4 horas de meditação semiconsciente, recebendo o benefício equivalente ao descanso de 8 horas de um humano."
        },

        subracas: {
            "Alto Elfo": {
                bonusAtributos: { inteligencia: 1 },
                caracteristicas: ["Treinamento Élfico com Armas", "Truque", "Idioma Adicional"],

                idiomas: [],
                idiomasEscolha: 1,
                proficienciasArmas: ["Espada Longa", "Espada Curta", "Arco Longo", "Arco Curto"],
                proficienciasArmaduras: [],
                proficienciasFerramentas: [],
                ferramentasEscolha: 0,

                descricoesCaracteristicas: {
                    "Treinamento Élfico com Armas": "Concede proficiência com espadas longas, espadas curtas, arcos longos e arcos curtos.",
                    "Truque": "Permite aprender um truque da lista de magias do mago, usando Inteligência como atributo de conjuração.",
                    "Idioma Adicional": "Permite falar, ler e escrever um idioma adicional à escolha."
                }
            },

            "Elfo da Floresta": {
                bonusAtributos: { sabedoria: 1 },
                deslocamento: 10.5,
                caracteristicas: ["Treinamento Élfico com Armas", "Pés Ligeiros", "Máscara da Natureza"],

                idiomas: [],
                idiomasEscolha: 0,
                proficienciasArmas: ["Espada Longa", "Espada Curta", "Arco Longo", "Arco Curto"],
                proficienciasArmaduras: [],
                proficienciasFerramentas: [],
                ferramentasEscolha: 0,

                descricoesCaracteristicas: {
                    "Treinamento Élfico com Armas": "Concede proficiência com espadas longas, espadas curtas, arcos longos e arcos curtos.",
                    "Pés Ligeiros": "Aumenta o deslocamento base de caminhada para 10,5 metros.",
                    "Máscara da Natureza": "Permite tentar se esconder quando estiver levemente obscurecido por folhagem, chuva forte, neve, névoa ou outro fenômeno natural."
                }
            },

            "Drow (Elfo Negro)": {
                bonusAtributos: { carisma: 1 },
                caracteristicas: ["Visão no Escuro Superior", "Sensibilidade à Luz Solar", "Magia Drow", "Treinamento Drow com Armas"],

                idiomas: [],
                idiomasEscolha: 0,
                proficienciasArmas: ["Rapieira", "Espada Curta", "Besta de Mão"],
                proficienciasArmaduras: [],
                proficienciasFerramentas: [],
                ferramentasEscolha: 0,

                descricoesCaracteristicas: {
                    "Visão no Escuro Superior": "Amplia o alcance da visão no escuro para 36 metros.",
                    "Sensibilidade à Luz Solar": "Impõe desvantagem em jogadas de ataque e em testes de Sabedoria (Percepção) baseados na visão quando o personagem, o alvo ou o que está sendo observado estiver sob luz solar direta.",
                    "Magia Drow": "Concede o truque Globos de Luz; no 3º nível, Fogo das Fadas uma vez por descanso longo; e, no 5º nível, Escuridão uma vez por descanso longo. Carisma é o atributo de conjuração.",
                    "Treinamento Drow com Armas": "Concede proficiência com rapieiras, espadas curtas e bestas de mão."
                }
            }
        }
    },

    "Halfling": {
        descricao: "Os halflings sobrevivem em um mundo cheio de criaturas maiores evitando serem notados.",
        bonusAtributos: { destreza: 2 },
        deslocamento: 7.5,
        caracteristicas: ["Sortudo", "Bravura", "Agilidade Halfling"],

        idiomas: ["Comum", "Halfling"],
        idiomasEscolha: 0,
        proficienciasArmas: [],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        descricoesCaracteristicas: {
            "Sortudo": "Quando obtém 1 natural em uma jogada de ataque, teste de habilidade ou teste de resistência, pode rolar novamente e deve usar o novo resultado.",
            "Bravura": "Concede vantagem em testes de resistência contra ficar amedrontado.",
            "Agilidade Halfling": "Permite atravessar o espaço ocupado por uma criatura de tamanho maior que o personagem."
        },

        subracas: {
            "Pés-Leves": {
                bonusAtributos: { carisma: 1 },
                caracteristicas: ["Furtividade Natural"],

                idiomas: [],
                idiomasEscolha: 0,
                proficienciasArmas: [],
                proficienciasArmaduras: [],
                proficienciasFerramentas: [],
                ferramentasEscolha: 0,

                descricoesCaracteristicas: {
                    "Furtividade Natural": "Permite tentar se esconder usando como cobertura uma criatura que seja pelo menos um tamanho maior."
                }
            },

            "Robusto": {
                bonusAtributos: { constituicao: 1 },
                caracteristicas: ["Resiliência dos Robustos"],

                idiomas: [],
                idiomasEscolha: 0,
                proficienciasArmas: [],
                proficienciasArmaduras: [],
                proficienciasFerramentas: [],
                ferramentasEscolha: 0,

                descricoesCaracteristicas: {
                    "Resiliência dos Robustos": "Concede vantagem em testes de resistência contra veneno e resistência a dano de veneno."
                }
            }
        }
    },

    "Humano": {
        descricao: "Os humanos são os mais adaptáveis, flexíveis e ambiciosos entre todas as raças comuns.",
        bonusAtributos: {
            forca: 1,
            destreza: 1,
            constituicao: 1,
            inteligencia: 1,
            sabedoria: 1,
            carisma: 1
        },
        deslocamento: 9,
        caracteristicas: ["Idiomas Extras"],

        idiomas: ["Comum"],
        idiomasEscolha: 1,
        proficienciasArmas: [],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        descricoesCaracteristicas: {
            "Idiomas Extras": "Permite falar, ler e escrever Comum e mais um idioma adicional à escolha."
        }
    },

    "Draconato": {
        descricao: "Descendentes de dragões que andam orgulhosamente pelo mundo.",
        bonusAtributos: { forca: 2, carisma: 1 },
        deslocamento: 9,
        caracteristicas: ["Ancestral Dracônico", "Arma de Sopro", "Resistência a Dano"],

        idiomas: ["Comum", "Dracônico"],
        idiomasEscolha: 0,
        proficienciasArmas: [],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        descricoesCaracteristicas: {
            "Ancestral Dracônico": "Define o tipo de dano e o formato da arma de sopro de acordo com a ancestralidade dracônica escolhida.",
            "Arma de Sopro": "Permite usar uma ação para exalar energia em cone ou linha. As criaturas na área fazem um teste de resistência baseado em Constituição; o dano começa em 2d6, aumenta com o nível e é reduzido à metade em caso de sucesso.",
            "Resistência a Dano": "Concede resistência ao tipo de dano associado à ancestralidade dracônica."
        }
    },

    "Gnomo": {
        descricao: "Gnomos regozijam a vida, apreciando cada momento de invento, exploração e brincadeira.",
        bonusAtributos: { inteligencia: 2 },
        deslocamento: 7.5,
        caracteristicas: ["Visão no Escuro", "Esperteza Gnômica"],

        idiomas: ["Comum", "Gnômico"],
        idiomasEscolha: 0,
        proficienciasArmas: [],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        descricoesCaracteristicas: {
            "Visão no Escuro": "Enxerga na penumbra a até 18 metros como se fosse luz plena e, no escuro, como se fosse penumbra, apenas em tons de cinza.",
            "Esperteza Gnômica": "Concede vantagem em testes de resistência de Inteligência, Sabedoria e Carisma contra magia."
        },

        subracas: {
            "Gnomo da Floresta": {
                bonusAtributos: { destreza: 1 },
                caracteristicas: ["Ilusionista Nato", "Falar com Bestas Pequenas"],

                idiomas: [],
                idiomasEscolha: 0,
                proficienciasArmas: [],
                proficienciasArmaduras: [],
                proficienciasFerramentas: [],
                ferramentasEscolha: 0,

                descricoesCaracteristicas: {
                    "Ilusionista Nato": "Concede o truque Ilusão Menor, usando Inteligência como atributo de conjuração.",
                    "Falar com Bestas Pequenas": "Permite comunicar ideias simples a Bestas Pequenas ou menores por meio de sons e gestos."
                }
            },

            "Gnomo das Rochas": {
                bonusAtributos: { constituicao: 1 },
                caracteristicas: ["Conhecimento de Artífice", "Engenhoqueiro"],

                idiomas: [],
                idiomasEscolha: 0,
                proficienciasArmas: [],
                proficienciasArmaduras: [],
                proficienciasFerramentas: ["Ferramentas de engenhoqueiro"],
                ferramentasEscolha: 0,

                descricoesCaracteristicas: {
                    "Conhecimento de Artífice": "Aplica o dobro do bônus de proficiência em testes de Inteligência (História) relacionados a itens mágicos, objetos alquímicos ou mecanismos tecnológicos.",
                    "Engenhoqueiro": "Concede proficiência com ferramentas de engenhoqueiro e permite gastar 1 hora e 10 po para criar um mecanismo Miúdo temporário, como brinquedo, isqueiro ou caixa de música."
                }
            }
        }
    },

    "Meio-Elfo": {
        descricao: "Vagando entre dois mundos mas não pertencendo inteiramente a nenhum.",
        bonusAtributos: { carisma: 2 },
        deslocamento: 9,
        caracteristicas: ["Visão no Escuro", "Ancestral Feérico", "Versatilidade em Perícia"],

        idiomas: ["Comum", "Élfico"],
        idiomasEscolha: 1,
        proficienciasArmas: [],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        descricoesCaracteristicas: {
            "Visão no Escuro": "Enxerga na penumbra a até 18 metros como se fosse luz plena e, no escuro, como se fosse penumbra, apenas em tons de cinza.",
            "Ancestral Feérico": "Concede vantagem em testes de resistência contra ser enfeitiçado e impede que magias coloquem o personagem para dormir.",
            "Versatilidade em Perícia": "Concede proficiência em duas perícias à escolha."
        }
    },

    "Meio-Orc": {
        descricao: "Marcados por sua herança orc, ostentam cicatrizes de batalha com orgulho.",
        bonusAtributos: { forca: 2, constituicao: 1 },
        deslocamento: 9,
        caracteristicas: ["Visão no Escuro", "Ameaçador", "Resistência Implacável", "Ataques Selvagens"],

        idiomas: ["Comum", "Orc"],
        idiomasEscolha: 0,
        proficienciasArmas: [],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        descricoesCaracteristicas: {
            "Visão no Escuro": "Enxerga na penumbra a até 18 metros como se fosse luz plena e, no escuro, como se fosse penumbra, apenas em tons de cinza.",
            "Ameaçador": "Concede proficiência na perícia Intimidação.",
            "Resistência Implacável": "Uma vez por descanso longo, quando seria reduzido a 0 pontos de vida sem morrer instantaneamente, o personagem fica com 1 ponto de vida.",
            "Ataques Selvagens": "Ao obter um acerto crítico com uma arma corpo a corpo, adiciona um dado de dano da arma ao dano extra do crítico."
        }
    },

    "Tiefling": {
        descricao: "Carregam a essência de Asmodeus infundida em sua linhagem.",
        bonusAtributos: { carisma: 2, inteligencia: 1 },
        deslocamento: 9,
        caracteristicas: ["Visão no Escuro", "Resistência Infernal", "Legado Infernal"],

        idiomas: ["Comum", "Infernal"],
        idiomasEscolha: 0,
        proficienciasArmas: [],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        descricoesCaracteristicas: {
            "Visão no Escuro": "Enxerga na penumbra a até 18 metros como se fosse luz plena e, no escuro, como se fosse penumbra, apenas em tons de cinza.",
            "Resistência Infernal": "Concede resistência a dano de fogo.",
            "Legado Infernal": "Concede o truque Taumaturgia; no 3º nível, Repreensão Infernal como magia de 2º nível uma vez por descanso longo; e, no 5º nível, Escuridão uma vez por descanso longo. Carisma é o atributo de conjuração."
        }
    }
},

classes: {
    "Bárbaro": {
        dadoVida: 12,
        proficienciasSalvaguarda: ["forca", "constituicao"],
        proficienciasArmasArmaduras: [
            "Armaduras leves",
            "Armaduras médias",
            "Escudos",
            "Armas simples",
            "Armas marciais"
        ],

        proficienciasArmas: ["Armas simples", "Armas marciais"],
        proficienciasArmaduras: ["Armaduras leves", "Armaduras médias", "Escudos"],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        subclasses: ["Caminho do Furioso", "Caminho do Guerreiro Totêmico"]
    },

    "Bardo": {
        dadoVida: 8,
        proficienciasSalvaguarda: ["destreza", "carisma"],
        proficienciasArmasArmaduras: [
            "Armaduras leves",
            "Armas simples",
            "Bestas de mão",
            "Espadas longas",
            "Rapieiras",
            "Espadas curtas"
        ],

        proficienciasArmas: [
            "Armas simples",
            "Besta de Mão",
            "Espada Longa",
            "Rapieira",
            "Espada Curta"
        ],
        proficienciasArmaduras: ["Armaduras leves"],
        proficienciasFerramentas: ["Instrumento musical (qualquer tipo)"],
        ferramentasEscolha: 3,

        subclasses: ["Colégio do Conhecimento", "Colégio da Bravura"]
    },

    "Bruxo": {
        dadoVida: 8,
        proficienciasSalvaguarda: ["sabedoria", "carisma"],
        proficienciasArmasArmaduras: ["Armaduras leves", "Armas simples"],

        proficienciasArmas: ["Armas simples"],
        proficienciasArmaduras: ["Armaduras leves"],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        subclasses: ["A Arquifada", "O Corruptor", "O Grande Antigo"]
    },

    "Clérigo": {
        dadoVida: 8,
        proficienciasSalvaguarda: ["sabedoria", "carisma"],
        proficienciasArmasArmaduras: [
            "Armaduras leves",
            "Armaduras médias",
            "Escudos",
            "Armas simples"
        ],

        proficienciasArmas: ["Armas simples"],
        proficienciasArmaduras: ["Armaduras leves", "Armaduras médias", "Escudos"],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        subclasses: [
            "Domínio do Conhecimento",
            "Domínio da Enganação",
            "Domínio da Guerra",
            "Domínio da Luz",
            "Domínio da Natureza",
            "Domínio da Tempestade",
            "Domínio da Vida"
        ]
    },

    "Druida": {
        dadoVida: 8,
        proficienciasSalvaguarda: ["inteligencia", "sabedoria"],
        proficienciasArmasArmaduras: [
            "Armaduras leves (não metálicas)",
            "Armaduras médias (não metálicas)",
            "Escudos (não metálicos)",
            "Clavas",
            "Adagas",
            "Dardos",
            "Azagaias",
            "Maças",
            "Bordões",
            "Cimitarras",
            "Foices",
            "Fundas",
            "Lanças"
        ],

        proficienciasArmas: [
            "Porrete",
            "Adaga",
            "Dardo",
            "Azagaia",
            "Maça",
            "Bordão",
            "Cimitarra",
            "Foice Curta",
            "Funda",
            "Lança"
        ],
        proficienciasArmaduras: [
            "Armaduras leves (não metálicas)",
            "Armaduras médias (não metálicas)",
            "Escudos (não metálicos)"
        ],
        proficienciasFerramentas: ["Kit de herbalismo"],
        ferramentasEscolha: 0,

        subclasses: ["Círculo da Terra", "Círculo da Lua"]
    },

    "Feiticeiro": {
        dadoVida: 6,
        proficienciasSalvaguarda: ["constituicao", "carisma"],
        proficienciasArmasArmaduras: [
            "Adagas",
            "Dardos",
            "Fundas",
            "Bordões",
            "Bestas leves"
        ],

        proficienciasArmas: ["Adaga", "Dardo", "Funda", "Bordão", "Besta Leve"],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        subclasses: ["Linhagem Dracônica", "Magia Selvagem"]
    },

    "Guerreiro": {
        dadoVida: 10,
        proficienciasSalvaguarda: ["forca", "constituicao"],
        proficienciasArmasArmaduras: [
            "Todas as armaduras",
            "Escudos",
            "Armas simples",
            "Armas marciais"
        ],

        proficienciasArmas: ["Armas simples", "Armas marciais"],
        proficienciasArmaduras: ["Todas as armaduras", "Escudos"],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        subclasses: ["Campeão", "Cavaleiro Arcano", "Mestre de Batalha"]
    },

    "Ladino": {
        dadoVida: 8,
        proficienciasSalvaguarda: ["destreza", "inteligencia"],
        proficienciasArmasArmaduras: [
            "Armaduras leves",
            "Armas simples",
            "Bestas de mão",
            "Espadas longas",
            "Rapieiras",
            "Espadas curtas"
        ],

        proficienciasArmas: [
            "Armas simples",
            "Besta de Mão",
            "Espada Longa",
            "Rapieira",
            "Espada Curta"
        ],
        proficienciasArmaduras: ["Armaduras leves"],
        proficienciasFerramentas: ["Ferramentas de ladrão"],
        ferramentasEscolha: 0,

        subclasses: ["Assassino", "Ladrão", "Trapaceiro Arcano"]
    },

    "Mago": {
        dadoVida: 6,
        proficienciasSalvaguarda: ["inteligencia", "sabedoria"],
        proficienciasArmasArmaduras: [
            "Adagas",
            "Dardos",
            "Fundas",
            "Bastões",
            "Bestas leves"
        ],

        proficienciasArmas: ["Adaga", "Dardo", "Funda", "Bordão", "Besta Leve"],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        subclasses: [
            "Escola de Abjuração",
            "Escola de Adivinhação",
            "Escola de Conjuração",
            "Escola de Encantamento",
            "Escola de Evocação",
            "Escola de Ilusão",
            "Escola de Necromancia",
            "Escola de Transmutação"
        ]
    },

    "Monge": {
        dadoVida: 8,
        proficienciasSalvaguarda: ["forca", "destreza"],
        proficienciasArmasArmaduras: ["Armas simples", "Espadas curtas"],

        proficienciasArmas: ["Armas simples", "Espada Curta"],
        proficienciasArmaduras: [],
        proficienciasFerramentas: [
            "Ferramentas de artesão (qualquer tipo)",
            "Instrumento musical (qualquer tipo)"
        ],
        ferramentasEscolha: 1,

        subclasses: [
            "Caminho da Mão Aberta",
            "Caminho da Sombra",
            "Caminho dos Quatro Elementos"
        ]
    },

    "Paladino": {
        dadoVida: 10,
        proficienciasSalvaguarda: ["sabedoria", "carisma"],
        proficienciasArmasArmaduras: [
            "Todas as armaduras",
            "Escudos",
            "Armas simples",
            "Armas marciais"
        ],

        proficienciasArmas: ["Armas simples", "Armas marciais"],
        proficienciasArmaduras: ["Todas as armaduras", "Escudos"],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        subclasses: [
            "Juramento de Devoção",
            "Juramento dos Anciões",
            "Juramento de Vingança"
        ]
    },

    "Patrulheiro": {
        dadoVida: 10,
        proficienciasSalvaguarda: ["forca", "destreza"],
        proficienciasArmasArmaduras: [
            "Armaduras leves",
            "Armaduras médias",
            "Escudos",
            "Armas simples",
            "Armas marciais"
        ],

        proficienciasArmas: ["Armas simples", "Armas marciais"],
        proficienciasArmaduras: ["Armaduras leves", "Armaduras médias", "Escudos"],
        proficienciasFerramentas: [],
        ferramentasEscolha: 0,

        subclasses: ["Caçador", "Mestre das Feras"]
    }
},

antecedentes: {
    "Acólito": {
        pericias: ["Intuição", "Religião"],
        ferramentas: [],

        proficienciasFerramentas: [],
        ferramentasEscolha: 0,
        idiomas: [],
        idiomasEscolha: 2,

        habilidade: "Abrigo dos Fiéis",
        descricaoHabilidade: "Concede respeito entre os fiéis, acesso a cerimônias, cura e caridade em templos da mesma fé, além de suporte modesto para você e possível auxílio de um templo aliado."
    },

    "Artisao da Guilda": {
        pericias: ["Persuasão", "Intuição"],
        ferramentas: ["Um tipo de ferramenta de artesão"],

        proficienciasFerramentas: ["Ferramentas de artesão (qualquer tipo)"],
        ferramentasEscolha: 1,
        idiomas: [],
        idiomasEscolha: 1,

        habilidade: "Associação de Guilda",
        descricaoHabilidade: "A guilda pode fornecer hospedagem, alimentação, contatos profissionais e apoio político, desde que você mantenha suas contribuições em dia."
    },

    "Artista": {
        pericias: ["Acrobacia", "Atuação"],
        ferramentas: ["Kit de disfarce", "Um tipo de instrumento musical"],

        proficienciasFerramentas: [
            "Kit de disfarce",
            "Instrumento musical (qualquer tipo)"
        ],
        ferramentasEscolha: 1,
        idiomas: [],
        idiomasEscolha: 0,

        habilidade: "Por Conta da Casa",
        descricaoHabilidade: "Você encontra locais para se apresentar e recebe hospedagem e comida em troca de apresentações, tornando-se conhecido e bem recebido localmente."
    },

    "Assassino": {
        pericias: ["Acrobacia", "Furtividade"],
        ferramentas: ["Kit de disfarce", "Ferramentas de ladrão"],

        proficienciasFerramentas: [
            "Kit de disfarce",
            "Ferramentas de ladrão"
        ],
        ferramentasEscolha: 0,
        idiomas: [],
        idiomasEscolha: 0,

        habilidade: "Contato Criminal",
        descricaoHabilidade: "Você possui um contato confiável no submundo e conhece intermediários capazes de transmitir mensagens mesmo a grandes distâncias."
    },

    "Charlatão": {
        pericias: ["Enganação", "Prestidigitação"],
        ferramentas: ["Kit de disfarce", "Kit de falsificação"],

        proficienciasFerramentas: [
            "Kit de disfarce",
            "Kit de falsificação"
        ],
        ferramentasEscolha: 0,
        idiomas: [],
        idiomasEscolha: 0,

        habilidade: "Identidade Falsa",
        descricaoHabilidade: "Você mantém uma identidade alternativa com documentos e disfarces, e pode falsificar documentos cujo modelo ou caligrafia já tenha visto."
    },

    "Criminoso": {
        pericias: ["Furtividade", "Enganação"],
        ferramentas: ["Jogo (um tipo)", "Ferramentas de ladrão"],

        proficienciasFerramentas: [
            "Ferramentas de ladrão",
            "Jogo (qualquer tipo)"
        ],
        ferramentasEscolha: 1,
        idiomas: [],
        idiomasEscolha: 0,

        habilidade: "Contato Criminal",
        descricaoHabilidade: "Você possui um contato confiável no submundo e conhece intermediários capazes de transmitir mensagens mesmo a grandes distâncias."
    },

    "Eremita": {
        pericias: ["Medicina", "Religião"],
        ferramentas: ["Kit de herbalismo"],

        proficienciasFerramentas: ["Kit de herbalismo"],
        ferramentasEscolha: 0,
        idiomas: [],
        idiomasEscolha: 1,

        habilidade: "Descoberta",
        descricaoHabilidade: "Seu isolamento revelou uma informação, verdade ou relíquia única e importante; os detalhes e efeitos são definidos com o Mestre."
    },

    "Forasteiro": {
        pericias: ["Atletismo", "Sobrevivência"],
        ferramentas: ["Instrumento musical (um tipo)"],

        proficienciasFerramentas: [
            "Instrumento musical (qualquer tipo)"
        ],
        ferramentasEscolha: 1,
        idiomas: [],
        idiomasEscolha: 1,

        habilidade: "Andarilho",
        descricaoHabilidade: "Você memoriza mapas e geografia e encontra comida e água para si e até cinco outras pessoas por dia, se o ambiente oferecer recursos."
    },

    "Herói do Povo": {
        pericias: ["Adestrar Animais", "Sobrevivência"],
        ferramentas: [
            "Ferramentas de artesão (um tipo)",
            "Veículos (terrestres)"
        ],

        proficienciasFerramentas: [
            "Veículos (terrestres)",
            "Ferramentas de artesão (qualquer tipo)"
        ],
        ferramentasEscolha: 1,
        idiomas: [],
        idiomasEscolha: 0,

        habilidade: "Hospitalidade Rústica",
        descricaoHabilidade: "Camponeses e pessoas comuns oferecem abrigo, descanso e esconderijo, desde que ajudá-lo não coloque suas vidas em risco."
    },

    "Marinheiro": {
        pericias: ["Atletismo", "Percepção"],
        ferramentas: [
            "Ferramentas de navegador",
            "Veículos (aquáticos)"
        ],

        proficienciasFerramentas: [
            "Ferramentas de navegador",
            "Veículos (aquáticos)"
        ],
        ferramentasEscolha: 0,
        idiomas: [],
        idiomasEscolha: 0,

        habilidade: "Passagem Marítima",
        descricaoHabilidade: "Você consegue passagem gratuita para o grupo em navios aliados, embora a rota e o prazo dependam do Mestre; em troca, o grupo ajuda a tripulação."
    },

    "Nobre": {
        pericias: ["História", "Persuasão"],
        ferramentas: ["Jogo (um tipo)"],

        proficienciasFerramentas: [
            "Jogo (qualquer tipo)"
        ],
        ferramentasEscolha: 1,
        idiomas: [],
        idiomasEscolha: 1,

        habilidade: "Posição de Privilégio",
        descricaoHabilidade: "Sua origem nobre facilita o acesso à alta sociedade, acomodações e audiências com nobres locais."
    },

    "Orfao": {
        pericias: ["Furtividade", "Prestidigitação"],
        ferramentas: [
            "Kit de disfarce",
            "Ferramentas de ladrão"
        ],

        proficienciasFerramentas: [
            "Kit de disfarce",
            "Ferramentas de ladrão"
        ],
        ferramentasEscolha: 0,
        idiomas: [],
        idiomasEscolha: 0,

        habilidade: "Urbano",
        descricaoHabilidade: "Fora de combate, você guia o grupo por atalhos urbanos, viajando entre dois pontos da cidade duas vezes mais rápido."
    },

    "Sábio": {
        pericias: ["Arcanismo", "História"],
        ferramentas: [],

        proficienciasFerramentas: [],
        ferramentasEscolha: 0,
        idiomas: [],
        idiomasEscolha: 2,

        habilidade: "Pesquisador",
        descricaoHabilidade: "Quando não sabe uma informação, você geralmente sabe onde ou com quem procurá-la, salvo quando o conhecimento é inacessível ou inexistente."
    },

    "Soldado": {
        pericias: ["Atletismo", "Intimidação"],
        ferramentas: [
            "Jogo (um tipo)",
            "Veículos (terrestres)"
        ],

        proficienciasFerramentas: [
            "Veículos (terrestres)",
            "Jogo (qualquer tipo)"
        ],
        ferramentasEscolha: 1,
        idiomas: [],
        idiomasEscolha: 0,

        habilidade: "Patente Militar",
        descricaoHabilidade: "Sua patente concede respeito entre soldados, influência sobre subordinados, empréstimo temporário de equipamento simples ou cavalos e acesso a instalações militares aliadas."
    }
},
    pericias: {
        "Acrobacia": "des", "Arcanismo": "int", "Atletismo": "for",
        "Atuação": "car", "Enganação": "car", "Furtividade": "des",
        "História": "int", "Intimidação": "car", "Intuição": "sab",
        "Investigação": "int", "Lidar com Animais": "sab", "Medicina": "sab",
        "Natureza": "int", "Percepção": "sab", "Persuasão": "car",
        "Prestidigitação": "des", "Religião": "int", "Sobrevivência": "sab"
    },
    equipamentos: {
                armas: {
            simples_corpo_a_corpo: [
                {
                    "nome": "Adaga",
                    "preco": "2 po",
                    "dano": "1d4 perfurante",
                    "peso": "0,5 kg",
                    "propriedades": "Acuidade, leve, arremesso (distância 6/18)",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": true,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Azagaia",
                    "preco": "5 pp",
                    "dano": "1d6 perfurante",
                    "peso": "1 kg",
                    "propriedades": "Arremesso (distância 9/36)",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Bordão",
                    "preco": "2 pp",
                    "dano": "1d6 concussão",
                    "peso": "2 kg",
                    "propriedades": "Versátil (1d8)",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": true,
                    "danoVersatil": "1d8",
                    "tipoDano": "contundente"
                },
                {
                    "nome": "Clava Grande",
                    "preco": "2 pp",
                    "dano": "1d8 concussão",
                    "peso": "5 kg",
                    "propriedades": "Pesada, duas mãos",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "contundente"
                },
                {
                    "nome": "Foice Curta",
                    "preco": "1 po",
                    "dano": "1d4 cortante",
                    "peso": "1 kg",
                    "propriedades": "Leve",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Lança",
                    "preco": "1 po",
                    "dano": "1d6 perfurante",
                    "peso": "1,5 kg",
                    "propriedades": "Arremesso (distância 6/18), versátil (1d8)",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": true,
                    "danoVersatil": "1d8",
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Maça",
                    "preco": "5 po",
                    "dano": "1d6 concussão",
                    "peso": "2 kg",
                    "propriedades": "-",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "contundente"
                },
                {
                    "nome": "Machadinha",
                    "preco": "5 po",
                    "dano": "1d6 cortante",
                    "peso": "1 kg",
                    "propriedades": "Leve, arremesso (distância 6/18)",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Martelo Leve",
                    "preco": "2 po",
                    "dano": "1d4 concussão",
                    "peso": "1 kg",
                    "propriedades": "Leve, arremesso (distância 6/18)",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "contundente"
                },
                {
                    "nome": "Porrete",
                    "preco": "1 pp",
                    "dano": "1d4 concussão",
                    "peso": "1 kg",
                    "propriedades": "Leve",
                    "categoria": "simples",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "contundente"
                }
            ],
        
            simples_a_distancia: [
                {
                    "nome": "Arco Curto",
                    "preco": "25 po",
                    "dano": "1d6 perfurante",
                    "peso": "1 kg",
                    "propriedades": "Munição (distância 24/96), duas mãos",
                    "categoria": "simples",
                    "modalidade": "a_distancia",
                    "atributoPadrao": "destreza",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Besta Leve",
                    "preco": "25 po",
                    "dano": "1d8 perfurante",
                    "peso": "2,5 kg",
                    "propriedades": "Munição (distância 24/96), recarga, duas mãos",
                    "categoria": "simples",
                    "modalidade": "a_distancia",
                    "atributoPadrao": "destreza",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Dardo",
                    "preco": "5 pc",
                    "dano": "1d4 perfurante",
                    "peso": "0,1 kg",
                    "propriedades": "Acuidade, arremesso (distância 6/18)",
                    "categoria": "simples",
                    "modalidade": "a_distancia",
                    "atributoPadrao": "destreza",
                    "acuidade": true,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Funda",
                    "preco": "1 pp",
                    "dano": "1d4 concussão",
                    "peso": "-",
                    "propriedades": "Munição (distância 9/36)",
                    "categoria": "simples",
                    "modalidade": "a_distancia",
                    "atributoPadrao": "destreza",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "contundente"
                }
            ],
        
            marciais_corpo_a_corpo: [
                {
                    "nome": "Alabarda",
                    "preco": "20 po",
                    "dano": "1d10 cortante",
                    "peso": "3 kg",
                    "propriedades": "Pesada, alcance, duas mãos",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Cimitarra",
                    "preco": "25 po",
                    "dano": "1d6 cortante",
                    "peso": "1,5 kg",
                    "propriedades": "Acuidade, leve",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": true,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Chicote",
                    "preco": "2 po",
                    "dano": "1d4 cortante",
                    "peso": "1,5 kg",
                    "propriedades": "Acuidade, alcance",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": true,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Espada Curta",
                    "preco": "10 po",
                    "dano": "1d6 perfurante",
                    "peso": "1 kg",
                    "propriedades": "Acuidade, leve",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": true,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Espada Grande",
                    "preco": "50 po",
                    "dano": "2d6 cortante",
                    "peso": "3 kg",
                    "propriedades": "Pesada, duas mãos",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Espada Longa",
                    "preco": "15 po",
                    "dano": "1d8 cortante",
                    "peso": "1,5 kg",
                    "propriedades": "Versátil (1d10)",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": true,
                    "danoVersatil": "1d10",
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Glaive",
                    "preco": "20 po",
                    "dano": "1d10 cortante",
                    "peso": "3 kg",
                    "propriedades": "Pesada, alcance, duas mãos",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Lança de Montaria",
                    "preco": "10 po",
                    "dano": "1d12 perfurante",
                    "peso": "3 kg",
                    "propriedades": "Alcance, especial",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Lança Longa",
                    "preco": "5 po",
                    "dano": "1d10 perfurante",
                    "peso": "4 kg",
                    "propriedades": "Pesada, alcance, duas mãos",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Maça Estrela",
                    "preco": "15 po",
                    "dano": "1d8 perfurante",
                    "peso": "2 kg",
                    "propriedades": "-",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Machado Grande",
                    "preco": "30 po",
                    "dano": "1d12 cortante",
                    "peso": "3,5 kg",
                    "propriedades": "Pesada, duas mãos",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Machado de Batalha",
                    "preco": "10 po",
                    "dano": "1d8 cortante",
                    "peso": "2 kg",
                    "propriedades": "Versátil (1d10)",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": true,
                    "danoVersatil": "1d10",
                    "tipoDano": "cortante"
                },
                {
                    "nome": "Malho",
                    "preco": "10 po",
                    "dano": "2d6 concussão",
                    "peso": "5 kg",
                    "propriedades": "Pesada, duas mãos",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "contundente"
                },
                {
                    "nome": "Mangual",
                    "preco": "10 po",
                    "dano": "1d8 concussão",
                    "peso": "1 kg",
                    "propriedades": "-",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "contundente"
                },
                {
                    "nome": "Martelo de Guerra",
                    "preco": "15 po",
                    "dano": "1d8 concussão",
                    "peso": "1 kg",
                    "propriedades": "Versátil (1d10)",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": true,
                    "danoVersatil": "1d10",
                    "tipoDano": "contundente"
                },
                {
                    "nome": "Picareta de Guerra",
                    "preco": "5 po",
                    "dano": "1d8 perfurante",
                    "peso": "1 kg",
                    "propriedades": "-",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Rapieira",
                    "preco": "25 po",
                    "dano": "1d8 perfurante",
                    "peso": "1 kg",
                    "propriedades": "Acuidade",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": true,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Tridente",
                    "preco": "5 po",
                    "dano": "1d6 perfurante",
                    "peso": "2 kg",
                    "propriedades": "Arremesso (6/18), versátil (1d8)",
                    "categoria": "marcial",
                    "modalidade": "corpo_a_corpo",
                    "atributoPadrao": "forca",
                    "acuidade": false,
                    "versatil": true,
                    "danoVersatil": "1d8",
                    "tipoDano": "perfurante"
                }
            ],
        
            marciais_a_distancia: [
                {
                    "nome": "Arco Longo",
                    "preco": "50 po",
                    "dano": "1d8 perfurante",
                    "peso": "1 kg",
                    "propriedades": "Munição (distância 45/180), pesada, duas mãos",
                    "categoria": "marcial",
                    "modalidade": "a_distancia",
                    "atributoPadrao": "destreza",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Besta de Mão",
                    "preco": "75 po",
                    "dano": "1d6 perfurante",
                    "peso": "1,5 kg",
                    "propriedades": "Munição (distância 9/36), leve, recarga",
                    "categoria": "marcial",
                    "modalidade": "a_distancia",
                    "atributoPadrao": "destreza",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Besta Pesada",
                    "preco": "50 po",
                    "dano": "1d10 perfurante",
                    "peso": "4,5 kg",
                    "propriedades": "Munição (distância 30/120), pesada, recarga, duas mãos",
                    "categoria": "marcial",
                    "modalidade": "a_distancia",
                    "atributoPadrao": "destreza",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                },
                {
                    "nome": "Rede",
                    "preco": "1 po",
                    "dano": "-",
                    "peso": "1,5 kg",
                    "propriedades": "Especial, arremesso (distância 1,5/4,5)",
                    "categoria": "marcial",
                    "modalidade": "a_distancia",
                    "atributoPadrao": "destreza",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": null
                },
                {
                    "nome": "Zarabatana",
                    "preco": "10 po",
                    "dano": "1 perfurante",
                    "peso": "0,5 kg",
                    "propriedades": "Munição (distância 7,5/30), recarga",
                    "categoria": "marcial",
                    "modalidade": "a_distancia",
                    "atributoPadrao": "destreza",
                    "acuidade": false,
                    "versatil": false,
                    "danoVersatil": null,
                    "tipoDano": "perfurante"
                }
            ]
        },
        armaduras: {
            leve: [
                {"nome": "Acolchoada", "preco": "5 po", "ca": "11 + modificador de Des", "forca": "-", "furtividade": "Desvantagem", "peso": "4 kg"},
                {"nome": "Couro", "preco": "10 po", "ca": "11 + modificador de Des", "forca": "-", "furtividade": "-", "peso": "5 kg"},
                {"nome": "Couro Batido", "preco": "45 po", "ca": "12 + modificador de Des", "forca": "-", "furtividade": "-", "peso": "6,5 kg"}
            ],
            media: [
                {"nome": "Gibão de Peles", "preco": "10 po", "ca": "12 + modificador de Des (máx. +2)", "forca": "-", "furtividade": "-", "peso": "6 kg"},
                {"nome": "Camisão de Malha", "preco": "50 po", "ca": "13 + modificador de Des (máx. +2)", "forca": "-", "furtividade": "-", "peso": "10 kg"},
                {"nome": "Brunea", "preco": "50 po", "ca": "14 + modificador de Des (máx. +2)", "forca": "-", "furtividade": "Desvantagem", "peso": "22,5 kg"},
                {"nome": "Peitoral", "preco": "400 po", "ca": "14 + modificador de Des (máx. +2)", "forca": "-", "furtividade": "-", "peso": "10 kg"},
                {"nome": "Meia-Armadura", "preco": "750 po", "ca": "15 + modificador de Des (máx. +2)", "forca": "-", "furtividade": "Desvantagem", "peso": "20 kg"}
            ],
            pesada: [
                {"nome": "Cota de anéis", "preco": "30 po", "ca": "14", "forca": "-", "furtividade": "Desvantagem", "peso": "20 kg"},
                {"nome": "Cota de malha", "preco": "75 po", "ca": "16", "forca": "For 13", "furtividade": "Desvantagem", "peso": "27,5 kg"},
                {"nome": "Cota de talas", "preco": "200 po", "ca": "17", "forca": "For 15", "furtividade": "Desvantagem", "peso": "30 kg"},
                {"nome": "Placas", "preco": "1.500 po", "ca": "18", "forca": "For 15", "furtividade": "Desvantagem", "peso": "32,5 kg"}
            ],
            escudo: [
                {"nome": "Escudo", "preco": "10 po", "ca": "+2", "forca": "-", "furtividade": "-", "peso": "3 kg"}
            ]
        },
        equipamento_aventura: [
            {"item": "Ábaco", "custo": "2 po", "peso": "1 kg"},
            {"item": "Ácido (vidro)", "custo": "25 po", "peso": "0,5 kg"},
            {"item": "Água benta (frasco)", "custo": "25 po", "peso": "0,5 kg"},
            {"item": "Algemas", "custo": "2 po", "peso": "2 kg"},
            {"item": "Algibeira", "custo": "5 po", "peso": "0,5 kg"},
            {"item": "Aljava", "custo": "1 po", "peso": "0,5 kg"},
            {"item": "Ampulheta", "custo": "25 po", "peso": "0,5 kg"},
            {"item": "Antídoto (vidro)", "custo": "50 po", "peso": "-"},
            {"item": "Apito de advertência", "custo": "25 po", "peso": "0,5 kg"},
            {"item": "Aríete portátil", "custo": "4 po", "peso": "17,5 kg"},
            {"item": "Armadilha de caça", "custo": "5 po", "peso": "12,5 kg"},
            {"item": "Arpéu", "custo": "2 po", "peso": "2 kg"},
            {"item": "Balança de mercador", "custo": "5 po", "peso": "1,5 kg"},
            {"item": "Balde", "custo": "5 pc", "peso": "1 kg"},
            {"item": "Barril", "custo": "2 po", "peso": "35 kg"},
            {"item": "Baú", "custo": "5 po", "peso": "12,5 kg"},
            {"item": "Bolsa de componentes", "custo": "25 po", "peso": "1 kg"},
            {"item": "Caixa de Fogo", "custo": "5 pp", "peso": "0,5 kg"},
            {"item": "Caneca", "custo": "2 pc", "peso": "0,5 kg"},
            {"item": "Caneta tinteiro", "custo": "2 pc", "peso": "-"},
            {"item": "Cantil", "custo": "2 pp", "peso": "2,5 kg"},
            {"item": "Cesto", "custo": "4 pp", "peso": "1 kg"},
            {"item": "Cobertor de inverno", "custo": "5 pp", "peso": "1,5 kg"},
            {"item": "Corda de cânhamo (15 metros)", "custo": "1 po", "peso": "5 kg"},
            {"item": "Corda de seda (15 metros)", "custo": "10 po", "peso": "2,5 kg"},
            {"item": "Corrente (3 metros)", "custo": "5 po", "peso": "5 kg"},
            {"item": "Equipamento de pescaria", "custo": "1 po", "peso": "2 kg"},
            {"item": "Escada (3 metros)", "custo": "1 pp", "peso": "12,5 kg"},
            {"item": "Esferas (sacola com 1.000)", "custo": "1 po", "peso": "1 kg"},
            {"item": "Espelho de aço", "custo": "5 po", "peso": "0,25 kg"},
            {"item": "Estrepes (bolsa com 20)", "custo": "1 po", "peso": "1 kg"},
            {"item": "Fechadura", "custo": "10 po", "peso": "0,5 kg"},
            {"item": "Foco arcano: Bastão", "custo": "10 po", "peso": "1 kg"},
            {"item": "Foco arcano: Cajado", "custo": "5 po", "peso": "2 kg"},
            {"item": "Foco arcano: Cristal", "custo": "10 po", "peso": "0,5 kg"},
            {"item": "Foco arcano: Orbe", "custo": "20 po", "peso": "1,5 kg"},
            {"item": "Foco arcano: Varinha", "custo": "10 po", "peso": "0,5 kg"},
            {"item": "Foco druídico: Cajado de madeira", "custo": "5 po", "peso": "2 kg"},
            {"item": "Foco druídico: Ramo de visco", "custo": "1 po", "peso": "-"},
            {"item": "Foco druídico: Totem", "custo": "1 po", "peso": "-"},
            {"item": "Foco druídico: Varinha de teixo", "custo": "10 po", "peso": "0,5 kg"},
            {"item": "Fogo alquímico (frasco)", "custo": "50 po", "peso": "0,5 kg"},
            {"item": "Frasco", "custo": "2 pc", "peso": "1 kg"},
            {"item": "Garrafa de vidro", "custo": "1 po", "peso": "1 kg"},
            {"item": "Giz (1 peça)", "custo": "1 pc", "peso": "-"},
            {"item": "Grimório", "custo": "50 po", "peso": "1,5 kg"},
            {"item": "Jarra", "custo": "4 pc", "peso": "2 kg"},
            {"item": "Kit de escalada", "custo": "25 po", "peso": "6 kg"},
            {"item": "Kit de primeiros-socorros", "custo": "5 po", "peso": "5 po", "peso": "1,5 kg"},
            {"item": "Lâmpada", "custo": "5 pp", "peso": "0,5 kg"},
            {"item": "Lanterna coberta", "custo": "5 po", "peso": "1 kg"},
            {"item": "Lanterna furta-fogo", "custo": "10 po", "peso": "1 kg"},
            {"item": "Lente de aumento", "custo": "100 po", "peso": "-"},
            {"item": "Livro", "custo": "25 po", "peso": "2,5 kg"},
            {"item": "Luneta", "custo": "1.000 po", "peso": "0,5 kg"},
            {"item": "Manto", "custo": "1 po", "peso": "2 kg"},
            {"item": "Marreta", "custo": "2 po", "peso": "5 kg"},
            {"item": "Martelo", "custo": "1 po", "peso": "1,5 kg"},
            {"item": "Mochila", "custo": "2 po", "peso": "2,5 kg"},
            {"item": "Munição: Balas de Funda (20)", "custo": "4 pc", "peso": "0,75 kg"},
            {"item": "Munição: Flechas (20)", "custo": "1 po", "peso": "0,5 kg"},
            {"item": "Munição: Virotes (20)", "custo": "1 po", "peso": "0,75 kg"},
            {"item": "Munição: Zarabatana (50)", "custo": "1 po", "peso": "0,5 kg"},
            {"item": "Óleo (frasco)", "custo": "1 pp", "peso": "0,5 kg"},
            {"item": "Pá", "custo": "2 po", "peso": "2,5 kg"},
            {"item": "Panela de ferro", "custo": "2 po", "peso": "5 kg"},
            {"item": "Papel (uma folha)", "custo": "2 pp", "peso": "-"},
            {"item": "Parafina", "custo": "5 pp", "peso": "-"},
            {"item": "Pé de cabra", "custo": "2 po", "peso": "2,5 kg"},
            {"item": "Pedra de amolar", "custo": "1 pc", "peso": "-"},
            {"item": "Perfume (frasco)", "custo": "5 po", "peso": "-"},
            {"item": "Pergaminho (uma folha)", "custo": "1 pp", "peso": "-"},
            {"item": "Picareta de minerador", "custo": "2 po", "peso": "5 kg"},
            {"item": "Píton", "custo": "5 pc", "peso": "-"},
            {"item": "Poção de cura", "custo": "50 po", "peso": "0,25 kg"},
            {"item": "Porta mapas ou pergaminhos", "custo": "1 po", "peso": "0,5 kg"},
            {"item": "Porta virotes", "custo": "1 po", "peso": "0,5 kg"},
            {"item": "Pregos de ferro (10)", "custo": "1 po", "peso": "2,5 kg"},
            {"item": "Rações de viagem (1 dia)", "custo": "5 pp", "peso": "1 kg"},
            {"item": "Robes", "custo": "5 pp", "peso": "2,5 kg"},
            {"item": "Roldana e polia", "custo": "1 po", "peso": "2,5 kg"},
            {"item": "Roupas comuns", "custo": "5 pp", "peso": "1,5 kg"},
            {"item": "Roupas de viajante", "custo": "2 po", "peso": "2 kg"},
            {"item": "Roupas de entretenimento", "custo": "5 po", "peso": "2 kg"},
            {"item": "Roupas finas", "custo": "15 po", "peso": "3 kg"},
            {"item": "Sabão", "custo": "2 pc", "peso": "-"},
            {"item": "Saco", "custo": "1 pc", "peso": "0,25 kg"},
            {"item": "Saco de dormir", "custo": "1 po", "peso": "3,5 kg"},
            {"item": "Símbolo sagrado: Amuleto", "custo": "5 po", "peso": "0,5 kg"},
            {"item": "Símbolo sagrado: Emblema", "custo": "5 po", "peso": "-"},
            {"item": "Símbolo sagrado: Relicário", "custo": "5 po", "peso": "1 kg"},
            {"item": "Sinete", "custo": "5 po", "peso": "-"},
            {"item": "Sino", "custo": "1 po", "peso": "-"},
            {"item": "Tenda para duas pessoas", "custo": "2 po", "peso": "10 kg"},
            {"item": "Tocha", "custo": "1 pc", "peso": "0,5 kg"},
            {"item": "Tinta (frasco de 30ml)", "custo": "10 po", "peso": "-"},
            {"item": "Vara (3 metros)", "custo": "5 pc", "peso": "3,5 kg"},
            {"item": "Vela", "custo": "1 pc", "peso": "-"},
            {"item": "Veneno básico (frasco)", "custo": "100 po", "peso": "-"}
        ],
        pacotes: [
            {"nome": "Pacote de Artista", "custo": "40 po", "descricao": "Inclui uma mochila, um saco de dormir, duas fantasias, 5 velas, 5 dias de rações, um cantil e um kit de disfarce."},
            {"nome": "Pacote de Assaltante", "custo": "16 po", "descricao": "Inclui uma mochila, um saco com 1.000 esferas de metal, 3 metros de linha, um sino, 5 velas, um pé de cabra, um martelo, 10 pitons, uma lanterna coberta, 2 frascos de óleo, 5 dias de rações, uma caixa de fogo e um cantil. O kit também possui 15 metros de corda de cânhamo amarrada ao lado dele."},
            {"nome": "Pacote de Aventureiro", "custo": "12 po", "descricao": "Inclui uma mochila, um pé de cabra, um martelo, 10 pitons, 10 tochas, uma caixa de fogo, 10 dias de rações e um cantil. O kit também tem 15 metros de corda de cânhamo amarrada ao lado dele."},
            {"nome": "Pacote de Diplomata", "custo": "39 po", "descricao": "Inclui um baú, 2 caixas para mapas ou pergaminhos, um conjunto de roupas finas, um vidro de tinta, uma caneta tinteiro, uma lâmpada, 2 frascos de óleo, 5 folhas de papel, um vidro de perfume, parafina e sabão."},
            {"nome": "Pacote de Estudioso", "custo": "40 po", "descricao": "Inclui uma mochila, um livro de estudo, um vidro de tinta, uma caneta tinteiro, 10 folhas de pergaminho, um saquinho de areia e uma pequena faca."},
            {"nome": "Pacote de Explorador", "custo": "10 po", "descricao": "Inclui uma mochila, um saco de dormir, um kit de refeição, uma caixa de fogo, 10 tochas, 10 dias de rações e um cantil. O kit também tem 15 metros de corda de cânhamo amarrada ao lado dele."},
            {"nome": "Pacote de Sacerdote", "custo": "19 po", "descricao": "Inclui uma mochila, um cobertor, 10 velas, uma caixa de fogo, uma caixa de esmolas, 2 blocos de incenso, um incensário, vestes, 2 dias de rações e um cantil."}
        ]
    },
    antecedentosTradicionaisPHB: {
        "Assassino": {
            pericias: ["Acrobacia", "Furtividade"],
            ferramentas: ["Kit de disfarce", "Ferramentas de ladrão"],
            habilidade: "Contato Criminal",
            descricaoHabilidade: "Você possui um contato confiável no submundo e conhece intermediários capazes de transmitir mensagens mesmo a grandes distâncias."
        },
        "Charlatão": {
            pericias: ["Enganação", "Prestidigitação"],
            ferramentas: ["Kit de disfarce", "Kit de falsificação"],
            habilidade: "Identidade Falsa",
            descricaoHabilidade: "Você mantém uma identidade alternativa com documentos e disfarces, e pode falsificar documentos cujo modelo ou caligrafia já tenha visto."
        },
        "Criminoso": {
            pericias: ["Furtividade", "Enganação"],
            ferramentas: ["Jogo (um tipo)", "Ferramentas de ladrão"],
            habilidade: "Contato Criminal",
            descricaoHabilidade: "Você possui um contato confiável no submundo e conhece intermediários capazes de transmitir mensagens mesmo a grandes distâncias."
        },
        "Eremita": {
            pericias: ["Medicina", "Religião"],
            ferramentas: ["Kit de herbalismo", "Kit de fabricação (um tipo)"],
            habilidade: "Descoberta",
            descricaoHabilidade: "Seu isolamento revelou uma informação, verdade ou relíquia única e importante; os detalhes e efeitos são definidos com o Mestre."
        },
        "Forasteiro": {
            pericias: ["Atletismo", "Sobrevivência"],
            ferramentas: ["Instrumento musical (um tipo)", "Ferramentas de artesão (um tipo)"],
            habilidade: "Andarilho",
            descricaoHabilidade: "Você memoriza mapas e geografia e encontra comida e água para si e até cinco outras pessoas por dia, se o ambiente oferecer recursos."
        },
        "Herói do Povo": {
            pericias: ["Adestrar Animais", "Sobrevivência"],
            ferramentas: ["Ferramentas de artesão (um tipo)", "Veículos (terrestres)"],
            habilidade: "Hospitalidade Rústica",
            descricaoHabilidade: "Camponeses e pessoas comuns oferecem abrigo, descanso e esconderijo, desde que ajudá-lo não coloque suas vidas em risco."
        },
        "Nobre": {
            pericias: ["História", "Persuasão"],
            ferramentas: ["Jogo (um tipo)"],
            habilidade: "Posição de Privilégio",
            descricaoHabilidade: "Sua origem nobre facilita o acesso à alta sociedade, acomodações e audiências com nobres locais."
        },
        "Orfao": {
            pericias: ["Furtividade", "Prestidigitação"],
            ferramentas: ["Kit de disfarce", "Ferramentas de ladrão"],
            habilidade: "Urbano",
            descricaoHabilidade: "Fora de combate, você guia o grupo por atalhos urbanos, viajando entre dois pontos da cidade duas vezes mais rápido."
        },
        "Sábio": {
            pericias: ["Arcanismo", "História"],
            ferramentas: ["(Dois idiomas à sua escolha)"],
            habilidade: "Pesquisador",
            descricaoHabilidade: "Quando não sabe uma informação, você geralmente sabe onde ou com quem procurá-la, salvo quando o conhecimento é inacessível ou inexistente."
        },
        "Marinheiro": {
            pericias: ["Atletismo", "Percepção"],
            ferramentas: ["Ferramentas de navegador", "Veículos (aquáticos)"],
            habilidade: "Passagem Marítima",
            descricaoHabilidade: "Você consegue passagem gratuita para o grupo em navios aliados, embora a rota e o prazo dependam do Mestre; em troca, o grupo ajuda a tripulação."
        },
        "Soldado": {
            pericias: ["Atletismo", "Intimidação"],
            ferramentas: ["Jogo (um tipo)", "Veículos (terrestres)"],
            habilidade: "Patente Militar",
            descricaoHabilidade: "Sua patente concede respeito entre soldados, influência sobre subordinados, empréstimo temporário de equipamento simples ou cavalos e acesso a instalações militares aliadas."
        },
        "Acólito": {
            pericias: ["Intuição", "Religião"],
            ferramentas: ["(Dois idiomas à sua escolha)"],
            habilidade: "Abrigo dos Fiéis",
            descricaoHabilidade: "Concede respeito entre os fiéis, acesso a cerimônias, cura e caridade em templos da mesma fé, além de suporte modesto para você e possível auxílio de um templo aliado."
        },
        "Artesão da Guilda": {
            pericias: ["Persuasão", "Intuição"],
            ferramentas: ["Ferramentas de artesão (um tipo)", "Idioma adicional"],
            habilidade: "Associação de Guilda",
            descricaoHabilidade: "A guilda pode fornecer hospedagem, alimentação, contatos profissionais e apoio político, desde que você mantenha suas contribuições em dia."
        },
        "Artista": {
            pericias: ["Acrobacia", "Atuação"],
            ferramentas: ["Kit de disfarce", "Instrumento musical (um tipo)"],
            habilidade: "Por Conta da Casa",
            descricaoHabilidade: "Você encontra locais para se apresentar e recebe hospedagem e comida em troca de apresentações, tornando-se conhecido e bem recebido localmente."
        }
    }
};
