// banco_phb.js

const bancoDnD = {
    racas: {
        "Anão": {
            descricao: "Anões são audazes, resistentes e conhecidos como hábeis guerreiros e mineradores. Têm longa memória e longo rancor.",
            bonusAtributos: { constituicao: 2 },
            deslocamento: 7.5,
            caracteristicas: ["Visão no Escuro", "Resiliência Anã", "Treinamento Anão em Combate", "Proficiência com Ferramentas", "Especialização em Rochas"],
            subracas: {
                "Anão da Colina": { 
                    bonusAtributos: { sabedoria: 1 },
                    caracteristicas: ["Tenacidade Anã"]
                },
                "Anão da Montanha": { 
                    bonusAtributos: { forca: 2 },
                    caracteristicas: ["Treinamento Anão com Armaduras"]
                }
            }
        },
        "Elfo": {
            descricao: "Elfos são um povo mágico de graça sobrenatural, vivendo no mundo sem pertencer inteiramente a ele.",
            bonusAtributos: { destreza: 2 },
            deslocamento: 9,
            caracteristicas: ["Visão no Escuro", "Sentidos Aguçados", "Ancestral Feérico", "Transe"],
            subracas: {
                "Alto Elfo": { 
                    bonusAtributos: { inteligencia: 1 },
                    caracteristicas: ["Treinamento Élfico com Armas", "Truque", "Idioma Adicional"]
                },
                "Elfo da Floresta": { 
                    bonusAtributos: { sabedoria: 1 },
                    deslocamento: 10.5,
                    caracteristicas: ["Treinamento Élfico com Armas", "Pés Ligeiros", "Máscara da Natureza"]
                },
                "Drow (Elfo Negro)": {
                    bonusAtributos: { carisma: 1 },
                    caracteristicas: ["Visão no Escuro Superior", "Sensibilidade à Luz Solar", "Magia Drow", "Treinamento Drow com Armas"]
                }
            }
        },
        "Halfling": {
            descricao: "Os halflings sobrevivem em um mundo cheio de criaturas maiores evitando serem notados.",
            bonusAtributos: { destreza: 2 },
            deslocamento: 7.5,
            caracteristicas: ["Sortudo", "Bravura", "Agilidade Halfling"],
            subracas: {
                "Pés-Leves": { 
                    bonusAtributos: { carisma: 1 },
                    caracteristicas: ["Furtividade Natural"]
                },
                "Robusto": { 
                    bonusAtributos: { constituicao: 1 },
                    caracteristicas: ["Resiliência dos Robustos"]
                }
            }
        },
        "Humano": {
            descricao: "Os humanos são os mais adaptáveis, flexíveis e ambiciosos entre todas as raças comuns.",
            bonusAtributos: { forca: 1, destreza: 1, constituicao: 1, inteligencia: 1, sabedoria: 1, carisma: 1 },
            deslocamento: 9,
            caracteristicas: ["Idiomas Extras"]
        },
        "Draconato": {
            descricao: "Descendentes de dragões que andam orgulhosamente pelo mundo.",
            bonusAtributos: { forca: 2, carisma: 1 },
            deslocamento: 9,
            caracteristicas: ["Ancestral Dracônico", "Arma de Sopro", "Resistência a Dano"]
        },
        "Gnomo": {
            descricao: "Gnomos regozijam a vida, apreciando cada momento de invento, exploração e brincadeira.",
            bonusAtributos: { inteligencia: 2 },
            deslocamento: 7.5,
            caracteristicas: ["Visão no Escuro", "Esperteza Gnômica"],
            subracas: {
                "Gnomo da Floresta": {
                    bonusAtributos: { destreza: 1 },
                    caracteristicas: ["Ilusionista Nato", "Falar com Bestas Pequenas"]
                },
                "Gnomo das Rochas": {
                    bonusAtributos: { constituicao: 1 },
                    caracteristicas: ["Conhecimento de Artífice", "Engenhoqueiro"]
                }
            }
        },
        "Meio-Elfo": {
            descricao: "Vagando entre dois mundos mas não pertencendo inteiramente a nenhum.",
            bonusAtributos: { carisma: 2 }, 
            deslocamento: 9,
            caracteristicas: ["Visão no Escuro", "Ancestral Feérico", "Versatilidade em Perícia"]
        },
        "Meio-Orc": {
            descricao: "Marcados por sua herança orc, ostentam cicatrizes de batalha com orgulho.",
            bonusAtributos: { forca: 2, constituicao: 1 },
            deslocamento: 9,
            caracteristicas: ["Visão no Escuro", "Ameaçador", "Resistência Implacável", "Ataques Selvagens"]
        },
        "Tiefling": {
            descricao: "Carregam a essência de Asmodeus infundida em sua linhagem.",
            bonusAtributos: { carisma: 2, inteligencia: 1 },
            deslocamento: 9,
            caracteristicas: ["Visão no Escuro", "Resistência Infernal", "Legado Infernal"]
        }
    },
    classes: {
        "Bárbaro": { 
            dadoVida: 12,
            proficienciasSalvaguarda: ["forca", "constituicao"],
            proficienciasArmasArmaduras: ["Armaduras leves", "Armaduras médias", "Escudos", "Armas simples", "Armas marciais"],
            subclasses: ["Caminho do Furioso", "Caminho do Guerreiro Totêmico"]
        },
        "Bardo": { 
            dadoVida: 8,
            proficienciasSalvaguarda: ["destreza", "carisma"],
            proficienciasArmasArmaduras: ["Armaduras leves", "Armas simples", "Bestas de mão", "Espadas longas", "Rapieiras", "Espadas curtas"],
            subclasses: ["Colégio do Conhecimento", "Colégio da Bravura"]
        },
        "Bruxo": { 
            dadoVida: 8,
            proficienciasSalvaguarda: ["sabedoria", "carisma"],
            proficienciasArmasArmaduras: ["Armaduras leves", "Armas simples"],
            subclasses: ["A Arquifada", "O Corruptor", "O Grande Antigo"]
        },
        "Clérigo": { 
            dadoVida: 8,
            proficienciasSalvaguarda: ["sabedoria", "carisma"],
            proficienciasArmasArmaduras: ["Armaduras leves", "Armaduras médias", "Escudos", "Armas simples"],
            subclasses: ["Domínio do Conhecimento", "Domínio da Enganação", "Domínio da Guerra", "Domínio da Luz", "Domínio da Natureza", "Domínio da Tempestade", "Domínio da Vida"]
        },
        "Druida": { 
            dadoVida: 8,
            proficienciasSalvaguarda: ["inteligencia", "sabedoria"],
            proficienciasArmasArmaduras: ["Armaduras leves (não metálicas)", "Armaduras médias (não metálicas)", "Escudos (não metálicos)", "Clavas", "Adagas", "Dardos", "Azagaias", "Maças", "Bordões", "Cimitarras", "Foices", "Fundas", "Lanças"],
            subclasses: ["Círculo da Terra", "Círculo da Lua"]
        },
        "Feiticeiro": { 
            dadoVida: 6,
            proficienciasSalvaguarda: ["constituicao", "carisma"],
            proficienciasArmasArmaduras: ["Adagas", "Dardos", "Fundas", "Bordões", "Bestas leves"],
            subclasses: ["Linhagem Dracônica", "Magia Selvagem"]
        },
        "Guerreiro": { 
            dadoVida: 10,
            proficienciasSalvaguarda: ["forca", "constituicao"],
            proficienciasArmasArmaduras: ["Todas as armaduras", "Escudos", "Armas simples", "Armas marciais"],
            subclasses: ["Campeão", "Cavaleiro Arcano", "Mestre de Batalha"]
        },
        "Ladino": { 
            dadoVida: 8,
            proficienciasSalvaguarda: ["destreza", "inteligencia"],
            proficienciasArmasArmaduras: ["Armaduras leves", "Armas simples", "Bestas de mão", "Espadas longas", "Rapieiras", "Espadas curtas"],
            subclasses: ["Assassino", "Ladrão", "Trapaceiro Arcano"]
        },
        "Mago": { 
            dadoVida: 6,
            proficienciasSalvaguarda: ["inteligencia", "sabedoria"],
            proficienciasArmasArmaduras: ["Adagas", "Dardos", "Fundas", "Bastões", "Bestas leves"],
            subclasses: ["Escola de Abjuração", "Escola de Adivinhação", "Escola de Conjuração", "Escola de Encantamento", "Escola de Evocação", "Escola de Ilusão", "Escola de Necromancia", "Escola de Transmutação"]
        },
        "Monge": { 
            dadoVida: 8,
            proficienciasSalvaguarda: ["forca", "destreza"],
            proficienciasArmasArmaduras: ["Armas simples", "Espadas curtas"],
            subclasses: ["Caminho da Mão Aberta", "Caminho da Sombra", "Caminho dos Quatro Elementos"]
        },
        "Paladino": { 
            dadoVida: 10,
            proficienciasSalvaguarda: ["sabedoria", "carisma"],
            proficienciasArmasArmaduras: ["Todas as armaduras", "Escudos", "Armas simples", "Armas marciais"],
            subclasses: ["Juramento de Devoção", "Juramento dos Anciões", "Juramento de Vingança"]
        },
        "Patrulheiro": { 
            dadoVida: 10,
            proficienciasSalvaguarda: ["forca", "destreza"],
            proficienciasArmasArmaduras: ["Armaduras leves", "Armaduras médias", "Escudos", "Armas simples", "Armas marciais"],
            subclasses: ["Caçador", "Mestre das Feras"]
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
                {"nome": "Adaga", "preco": "2 po", "dano": "1d4 perfurante", "peso": "0,5 kg", "propriedades": "Acuidade, leve, arremesso (distância 6/18)"},
                {"nome": "Azagaia", "preco": "5 pp", "dano": "1d6 perfurante", "peso": "1 kg", "propriedades": "Arremesso (distância 9/36)"},
                {"nome": "Bordão", "preco": "2 pp", "dano": "1d6 concussão", "peso": "2 kg", "propriedades": "Versátil (1d8)"},
                {"nome": "Clava Grande", "preco": "2 pp", "dano": "1d8 concussão", "peso": "5 kg", "propriedades": "Pesada, duas mãos"},
                {"nome": "Foice Curta", "preco": "1 po", "dano": "1d4 cortante", "peso": "1 kg", "propriedades": "Leve"},
                {"nome": "Lança", "preco": "1 po", "dano": "1d6 perfurante", "peso": "1,5 kg", "propriedades": "Arremesso (distância 6/18), versátil (1d8)"},
                {"nome": "Maça", "preco": "5 po", "dano": "1d6 concussão", "peso": "2 kg", "propriedades": "-"},
                {"nome": "Machadinha", "preco": "5 po", "dano": "1d6 cortante", "peso": "1 kg", "propriedades": "Leve, arremesso (distância 6/18)"},
                {"nome": "Martelo Leve", "preco": "2 po", "dano": "1d4 concussão", "peso": "1 kg", "propriedades": "Leve, arremesso (distância 6/18)"},
                {"nome": "Porrete", "preco": "1 pp", "dano": "1d4 concussão", "peso": "1 kg", "propriedades": "Leve"}
            ],
            simples_a_distancia: [
                {"nome": "Arco Curto", "preco": "25 po", "dano": "1d6 perfurante", "peso": "1 kg", "propriedades": "Munição (distância 24/96), duas mãos"},
                {"nome": "Besta Leve", "preco": "25 po", "dano": "1d8 perfurante", "peso": "2,5 kg", "propriedades": "Munição (distância 24/96), recarga, duas mãos"},
                {"nome": "Dardo", "preco": "5 pc", "dano": "1d4 perfurante", "peso": "0,1 kg", "propriedades": "Acuidade, arremesso (distância 6/18)"},
                {"nome": "Funda", "preco": "1 pp", "dano": "1d4 concussão", "peso": "-", "propriedades": "Munição (distância 9/36)"}
            ],
            marciais_corpo_a_corpo: [
                {"nome": "Alabarda", "preco": "20 po", "dano": "1d10 cortante", "peso": "3 kg", "propriedades": "Pesada, alcance, duas mãos"},
                {"nome": "Cimitarra", "preco": "25 po", "dano": "1d6 cortante", "peso": "1,5 kg", "propriedades": "Acuidade, leve"},
                {"nome": "Chicote", "preco": "2 po", "dano": "1d4 cortante", "peso": "1,5 kg", "propriedades": "Acuidade, alcance"},
                {"nome": "Espada Curta", "preco": "10 po", "dano": "1d6 perfurante", "peso": "1 kg", "propriedades": "Acuidade, leve"},
                {"nome": "Espada Grande", "preco": "50 po", "dano": "2d6 cortante", "peso": "3 kg", "propriedades": "Pesada, duas mãos"},
                {"nome": "Espada Longa", "preco": "15 po", "dano": "1d8 cortante", "peso": "1,5 kg", "propriedades": "Versátil (1d10)"},
                {"nome": "Glaive", "preco": "20 po", "dano": "1d10 cortante", "peso": "3 kg", "propriedades": "Pesada, alcance, duas mãos"},
                {"nome": "Lança de Montaria", "preco": "10 po", "dano": "1d12 perfurante", "peso": "3 kg", "propriedades": "Alcance, especial"},
                {"nome": "Lança Longa", "preco": "5 po", "dano": "1d10 perfurante", "peso": "4 kg", "propriedades": "Pesada, alcance, duas mãos"},
                {"nome": "Maça Estrela", "preco": "15 po", "dano": "1d8 perfurante", "peso": "2 kg", "propriedades": "-"},
                {"nome": "Machado Grande", "preco": "30 po", "dano": "1d12 cortante", "peso": "3,5 kg", "propriedades": "Pesada, duas mãos"},
                {"nome": "Machado de Batalha", "preco": "10 po", "dano": "1d8 cortante", "peso": "2 kg", "propriedades": "Versátil (1d10)"},
                {"nome": "Malho", "preco": "10 po", "dano": "2d6 concussão", "peso": "5 kg", "propriedades": "Pesada, duas mãos"},
                {"nome": "Mangual", "preco": "10 po", "dano": "1d8 concussão", "peso": "1 kg", "propriedades": "-"},
                {"nome": "Martelo de Guerra", "preco": "15 po", "dano": "1d8 concussão", "peso": "1 kg", "propriedades": "Versátil (1d10)"},
                {"nome": "Picareta de Guerra", "preco": "5 po", "dano": "1d8 perfurante", "peso": "1 kg", "propriedades": "-"},
                {"nome": "Rapieira", "preco": "25 po", "dano": "1d8 perfurante", "peso": "1 kg", "propriedades": "Acuidade"},
                {"nome": "Tridente", "preco": "5 po", "dano": "1d6 perfurante", "peso": "2 kg", "propriedades": "Arremesso (6/18), versátil (1d8)"}
            ],
            marciais_a_distancia: [
                {"nome": "Arco Longo", "preco": "50 po", "dano": "1d8 perfurante", "peso": "1 kg", "propriedades": "Munição (distância 45/180), pesada, duas mãos"},
                {"nome": "Besta de Mão", "preco": "75 po", "dano": "1d6 perfurante", "peso": "1,5 kg", "propriedades": "Munição (distância 9/36), leve, recarga"},
                {"nome": "Besta Pesada", "preco": "50 po", "dano": "1d10 perfurante", "peso": "4,5 kg", "propriedades": "Munição (distância 30/120), pesada, recarga, duas mãos"},
                {"nome": "Rede", "preco": "1 po", "dano": "-", "peso": "1,5 kg", "propriedades": "Especial, arremesso (distância 1,5/4,5)"},
                {"nome": "Zarabatana", "preco": "10 po", "dano": "1 perfurante", "peso": "0,5 kg", "propriedades": "Munição (distância 7,5/30), recarga"}
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
            {"item": "Kit de primeiros-socorros", "custo": "5 po", "peso": "1,5 kg"},
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
            {"item": "Robes", "custo": "1 po", "peso": "2 kg"},
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
    }
};