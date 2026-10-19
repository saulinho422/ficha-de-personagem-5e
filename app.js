// app.js

let inventarioPersonagem = [];
let ataquesPersonagem = [];
let tracosPersonagem = [];
let proficienciasAdicionais = [];
let progressosResolvidos = [];
let tracosAutomaticosExpandidos = new Set();
let filtroTracosAtual = 'todos';
const CHAVE_FICHA = ForjaEstado.CHAVE;
let personagemAtual = { raca: '', classe: '' };
let periciasManuais = {};
let especializacoes = [];
let percepcaoSituacao = 'normal';
let recursosPersonagem = { pvAtual: null, pvTemporarios: 0 };
let equipamentoPersonagem = { armadura: null, escudo: null };
let restaurandoEstado = false;
let salvamentoBloqueado = false;
let focoAnteriorPV = null;
let detalhesFicha = ForjaCampanha.novo();

const NIVEIS_INCREMENTO_POR_CLASSE = {
    'Ladino': [4, 8, 10, 12, 16, 19],
    'Guerreiro': [4, 6, 8, 12, 14, 16, 19],
    padrao: [4, 8, 12, 16, 19]
};
const RESUMOS_TALENTOS = {
    "Adepto Elemental (Elemental Adept)": "Especializa suas magias em um tipo de dano elemental, ajudando a superar resistências e melhorar resultados baixos de dano.",
    "Adepto Marcial (Martial Adept)": "Concede treinamento em manobras de combate e um recurso de superioridade para executá-las.",
    "Alerta (Alert)": "Melhora bastante a iniciativa e dificulta que o personagem seja surpreendido ou fique vulnerável a atacantes ocultos.",
    "Ambidestro (Dual Wielder)": "Aprimora o combate com duas armas, aumentando a defesa e permitindo empunhar armas mais versáteis em cada mão.",
    "Atacante Bestial (Savage Attacker)": "Permite refazer uma rolagem de dano com arma para tentar obter um resultado melhor.",
    "Atirador Aguçado (Sharpshooter)": "Favorece disparos a longa distância, reduz o efeito de cobertura e permite trocar precisão por dano elevado.",
    "Atirador de Magia (Spell Sniper)": "Amplia o alcance de magias de ataque, ajuda a ignorar cobertura e concede um truque ofensivo adicional.",
    "Atleta (Athlete)": "Melhora Força ou Destreza e facilita escaladas, saltos e a recuperação após cair.",
    "Ator (Actor)": "Aprimora Carisma e torna o personagem mais convincente ao imitar vozes ou assumir identidades.",
    "Conjurador de Guerra (War Caster)": "Ajuda a manter concentração em combate, conjurar com as mãos ocupadas e reagir com magias.",
    "Conjurador de Ritual (Ritual Caster)": "Concede um livro de rituais e permite aprender e conjurar determinadas magias como rituais.",
    "Curandeiro (Healer)": "Torna kits de primeiros socorros mais eficientes para estabilizar aliados e recuperar pontos de vida.",
    "Duelista Defensivo (Defensive Duelist)": "Permite usar a reação e uma arma de acuidade para aumentar a defesa contra um ataque.",
    "Especialista em Besta (Crossbow Expert)": "Aprimora o uso de bestas, reduz limitações de recarga e favorece ataques próximos ou adicionais.",
    "Especialista em Briga (Tavern Brawler)": "Melhora o combate improvisado e desarmado, além de facilitar agarrões após acertar um ataque.",
    "Explorador de Cavernas (Dungeon Delver)": "Ajuda a encontrar passagens e armadilhas, resistir a seus efeitos e explorar locais perigosos.",
    "Imobilizador (Grappler)": "Aprimora agarrões e oferece maior controle sobre criaturas que o personagem consegue segurar.",
    "Iniciado em Magia (Magic Initiate)": "Concede truques e uma magia básica escolhidos de uma classe conjuradora.",
    "Investida Poderosa (Charger)": "Permite transformar uma corrida em um ataque ou empurrão mais impactante.",
    "Líder Inspirador (Inspiring Leader)": "Usa uma fala motivadora para conceder pontos de vida temporários ao grupo.",
    "Maestria em Arma de Haste (Polearm Master)": "Aprimora armas de haste, oferecendo ataque adicional e mais oportunidades de reação.",
    "Mestre de Armas Pesadas (Heavy Armor Master)": "Melhora Força e reduz parte do dano físico comum enquanto usa armadura pesada.",
    "Matador de Conjuradores (Mage Slayer)": "Favorece reações contra conjuradores próximos e ajuda a resistir ou interromper suas magias.",
    "Mente Afiada (Keen Mind)": "Melhora Inteligência e concede memória, orientação e noção de tempo excepcionalmente precisas.",
    "Mestre de Armas (Weapon Master)": "Melhora Força ou Destreza e concede proficiência com armas escolhidas.",
    "Mestre de Armas Grandes (Great Weapon Master)": "Favorece armas pesadas, permitindo ataques extras e a troca de precisão por dano elevado.",
    "Mestre de Escudos (Shield Master)": "Permite usar melhor o escudo para empurrar inimigos e se proteger de efeitos que exigem Destreza.",
    "Mobilidade (Mobile)": "Aumenta o deslocamento e facilita atravessar o campo de batalha sem sofrer certas reações.",
    "Observador (Observant)": "Melhora Inteligência ou Sabedoria, leitura labial e percepção passiva de detalhes e pistas.",
    "Perito (Skilled)": "Concede proficiência em três perícias ou ferramentas escolhidas.",
    "Poliglota (Linguist)": "Melhora Inteligência, concede novos idiomas e permite criar códigos escritos.",
    "Proteção Leve (Lightly Armored)": "Melhora Força ou Destreza e concede treinamento com armaduras leves.",
    "Proteção Moderada (Moderately Armored)": "Melhora Força ou Destreza e concede treinamento com armaduras médias e escudos.",
    "Proteção Pesada (Heavily Armored)": "Melhora Força e concede treinamento com armaduras pesadas.",
    "Resiliente (Resilient)": "Melhora uma habilidade escolhida e concede proficiência nos testes de resistência relacionados a ela.",
    "Resistente (Durable)": "Melhora Constituição e aumenta a eficiência da recuperação ao gastar Dados de Vida.",
    "Robusto (Tough)": "Aumenta os pontos de vida máximos do personagem conforme o nível.",
    "Sentinela (Sentinel)": "Aprimora ataques de oportunidade e dificulta que inimigos escapem ou ataquem aliados próximos.",
    "Sorrateiro (Skulker)": "Melhora a furtividade em pouca luz e reduz as consequências de errar ataques à distância enquanto escondido.",
    "Sortudo (Lucky)": "Concede pontos de sorte para refazer jogadas importantes ou dificultar ataques inimigos."
};

function obterResumoTalento(nome) {
    return talentos[nome]?.beneficios || RESUMOS_TALENTOS[nome] || 'Talento com benefícios disponíveis no banco de talentos.';
}

function obterTalentosDisponiveis() {
    if (typeof talentos === 'undefined' || !talentos || typeof talentos !== 'object') return [];
    return Object.keys(talentos).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

function selecionarCardTalento(nome) {
    const dados = typeof talentos !== 'undefined' ? talentos?.[nome] : null;
    if (!dados) return;
    document.getElementById('talento-selecionado').value = nome;
    document.querySelectorAll('.card-talento').forEach(card => {
        const selecionado = card.dataset.talento === nome;
        card.classList.toggle('selecionado', selecionado);
        card.setAttribute('aria-selected', String(selecionado));
    });
    document.getElementById('nome-talento-selecionado').textContent = nome;
    document.getElementById('requisito-talento-selecionado').textContent =
        dados.preRequisitos ? 'Possui pré-requisitos cadastrados' : 'Sem pré-requisitos cadastrados';
    document.getElementById('descricao-talento-selecionado').textContent = obterResumoTalento(nome);
    document.getElementById('resumo-talento-selecionado').hidden = false;
    atualizarBonusAtributoTalento(nome);
    ForjaInterface.prepararTalento(nome);
}

function renderizarCardsTalentos(filtro = '') {
    const grid = document.getElementById('grid-talentos');
    const nomes = obterTalentosDisponiveis().filter(nome =>
        normalizarTextoProficiencia(nome).includes(normalizarTextoProficiencia(filtro))
    );
    const selecionadoAtual = document.getElementById('talento-selecionado').value;
    grid.innerHTML = '';
    document.getElementById('contador-talentos').textContent =
        nomes.length + (nomes.length === 1 ? ' talento' : ' talentos');

    if (!nomes.length) {
        const vazio = document.createElement('div');
        vazio.className = 'talentos-vazios';
        vazio.textContent = 'Nenhum talento encontrado para esta pesquisa.';
        grid.appendChild(vazio);
        return;
    }

    nomes.forEach(nome => {
        const dados = talentos[nome] || {};
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'card-talento' + (selecionadoAtual === nome ? ' selecionado' : '');
        card.dataset.talento = nome;
        card.setAttribute('role', 'option');
        card.setAttribute('aria-selected', String(selecionadoAtual === nome));

        const topo = document.createElement('span');
        topo.className = 'topo-card-talento';
        const icone = document.createElement('span');
        icone.className = 'icone-card-talento';
        icone.textContent = '✦';
        const marcador = document.createElement('span');
        marcador.className = 'marcador-card-talento';
        marcador.textContent = selecionadoAtual === nome ? '✓' : '';
        topo.append(icone, marcador);

        const titulo = document.createElement('strong');
        titulo.textContent = nome;
        const metadados = document.createElement('span');
        metadados.className = 'metadados-card-talento';
        const requisito = document.createElement('small');
        requisito.className = dados.preRequisitos ? 'com-requisito' : 'sem-requisito';
        requisito.textContent = dados.preRequisitos ? 'Com pré-requisito' : 'Sem pré-requisito';
        metadados.append(requisito);
        const resumo = document.createElement('p');
        resumo.className = 'resumo-card-talento';
        resumo.textContent = dados.beneficios || obterResumoTalento(nome);

        card.append(topo, titulo, metadados, resumo);
        card.onclick = () => {
            selecionarCardTalento(nome);
            renderizarCardsTalentos(document.getElementById('busca-talento').value);
        };
        grid.appendChild(card);
    });
}

function filtrarCardsTalentos() {
    renderizarCardsTalentos(document.getElementById('busca-talento').value);
}

const ATRIBUTOS_PROGRESSAO = {
    for: 'Força', des: 'Destreza', con: 'Constituição',
    int: 'Inteligência', sab: 'Sabedoria', car: 'Carisma'
};

const BONUS_ATRIBUTOS_TALENTOS = {
    'Atleta (Athlete)': ['for', 'des'],
    'Ator (Actor)': ['car'],
    'Especialista em Briga (Tavern Brawler)': ['for', 'con'],
    'Maestria em Armadura Pesada (Heavy Armor Master)': ['for'],
    'Mente Afiada (Keen Mind)': ['int'],
    'Mestre de Armas (Weapon Master)': ['for', 'des'],
    'Observador (Observant)': ['int', 'sab'],
    'Poliglota (Linguist)': ['int'],
    'Proteção Leve (Lightly Armored)': ['for', 'des'],
    'Proteção Moderada (Moderately Armored)': ['for', 'des'],
    'Proteção Pesada (Heavily Armored)': ['for'],
    'Resiliente (Resilient)': ['for', 'des', 'con', 'int', 'sab', 'car'],
    'Resistente (Durable)': ['con']
};

function atualizarBonusAtributoTalento(nome) {
    const painel = document.getElementById('bonus-atributo-talento');
    const select = document.getElementById('atributo-bonus-talento');
    const cards = document.getElementById('cards-atributo-bonus-talento');
    const titulo = document.getElementById('titulo-bonus-talento');
    const ajuda = document.getElementById('ajuda-bonus-talento');
    if (!painel || !select || !cards || !titulo || !ajuda) return;

    const opcoes = BONUS_ATRIBUTOS_TALENTOS[nome] || [];
    painel.hidden = opcoes.length === 0;
    select.innerHTML = '';
    cards.innerHTML = '';

    if (!opcoes.length) return;

    opcoes.forEach(sigla => {
        const opcao = document.createElement('option');
        const valorAtual = valorAtributoParaMelhoria(sigla);
        opcao.value = sigla;
        opcao.textContent = ATRIBUTOS_PROGRESSAO[sigla];
        opcao.disabled = valorAtual >= 20;
        select.appendChild(opcao);
    });

    const primeiraDisponivel = Array.from(select.options).find(opcao => !opcao.disabled);
    if (primeiraDisponivel) select.value = primeiraDisponivel.value;

    const automatico = opcoes.length === 1;
    titulo.textContent = automatico
        ? '+1 em ' + ATRIBUTOS_PROGRESSAO[opcoes[0]]
        : 'Escolha o atributo que receberá +1';
    ajuda.textContent = automatico
        ? (primeiraDisponivel
            ? 'Esse bônus será aplicado automaticamente quando você confirmar o talento.'
            : 'Esse atributo já está no limite máximo de 20.')
        : (primeiraDisponivel
            ? 'Selecione um dos cards. O bônus será aplicado quando você confirmar.'
            : 'Todos os atributos permitidos por este talento já estão no limite máximo de 20.');

    cards.hidden = automatico;
    if (!automatico) renderizarCardsBonusTalento(opcoes);
}

function renderizarCardsBonusTalento(opcoes) {
    const select = document.getElementById('atributo-bonus-talento');
    const cards = document.getElementById('cards-atributo-bonus-talento');
    if (!select || !cards) return;
    cards.innerHTML = '';
    opcoes.forEach(sigla => {
        const valor = valorAtributoParaMelhoria(sigla);
        cards.appendChild(criarCardAtributo(
            sigla,
            select.value === sigla,
            valor >= 20,
            () => {
                select.value = sigla;
                renderizarCardsBonusTalento(opcoes);
            }
        ));
    });
}

function obterBonusAtributoTalento(nome) {
    const opcoes = BONUS_ATRIBUTOS_TALENTOS[nome] || [];
    if (!opcoes.length) return null;
    const sigla = opcoes.length === 1
        ? opcoes[0]
        : document.getElementById('atributo-bonus-talento')?.value;
    if (!sigla || !opcoes.includes(sigla)) {
        mostrarToast('Escolha o atributo que receberá o bônus do talento.', 'aviso');
        return false;
    }
    const atual = valorAtributoParaMelhoria(sigla);
    if (atual >= 20) {
        mostrarToast(ATRIBUTOS_PROGRESSAO[sigla] + ' já está no limite máximo de 20.', 'aviso');
        return false;
    }
    return { sigla, quantidade: 1 };
}

const CATALOGO_IDIOMAS = [
    'Comum', 'Anão', 'Élfico', 'Gigante', 'Gnômico', 'Goblin', 'Halfling', 'Orc',
    'Abissal', 'Celestial', 'Dracônico', 'Dialeto Subterrâneo', 'Infernal', 'Primordial', 'Silvestre', 'Subcomum'
];
const CATALOGO_FERRAMENTAS = [
    'Ferramentas de alquimista', 'Suprimentos de cervejeiro', 'Ferramentas de calígrafo',
    'Ferramentas de carpinteiro', 'Ferramentas de cartógrafo', 'Ferramentas de sapateiro',
    'Utensílios de cozinheiro', 'Ferramentas de vidreiro', 'Ferramentas de joalheiro',
    'Ferramentas de coureiro', 'Ferramentas de pedreiro', 'Suprimentos de pintor',
    'Ferramentas de oleiro', 'Ferramentas de ferreiro', 'Ferramentas de funileiro',
    'Ferramentas de tecelão', 'Ferramentas de entalhador', 'Kit de disfarce',
    'Kit de falsificação', 'Kit de herbalismo', 'Kit de venenos', 'Ferramentas de ladrão',
    'Ferramentas de navegador', 'Instrumento musical', 'Jogo', 'Veículos terrestres', 'Veículos aquáticos'
];

const PERICIAS_POR_CLASSE = {
    'Bárbaro': { quantidade: 2, opcoes: ['Lidar com Animais', 'Atletismo', 'Intimidação', 'Natureza', 'Percepção', 'Sobrevivência'] },
    'Bardo': { quantidade: 3, todas: true },
    'Bruxo': { quantidade: 2, opcoes: ['Arcanismo', 'Enganação', 'História', 'Intimidação', 'Investigação', 'Natureza', 'Religião'] },
    'Clérigo': { quantidade: 2, opcoes: ['História', 'Intuição', 'Medicina', 'Persuasão', 'Religião'] },
    'Druida': { quantidade: 2, opcoes: ['Arcanismo', 'Lidar com Animais', 'Intuição', 'Medicina', 'Natureza', 'Percepção', 'Religião', 'Sobrevivência'] },
    'Feiticeiro': { quantidade: 2, opcoes: ['Arcanismo', 'Enganação', 'Intuição', 'Intimidação', 'Persuasão', 'Religião'] },
    'Guerreiro': { quantidade: 2, opcoes: ['Acrobacia', 'Lidar com Animais', 'Atletismo', 'História', 'Intuição', 'Intimidação', 'Percepção', 'Sobrevivência'] },
    'Ladino': { quantidade: 4, todas: true },
    'Mago': { quantidade: 2, opcoes: ['Arcanismo', 'História', 'Intuição', 'Investigação', 'Medicina', 'Religião'] },
    'Monge': { quantidade: 2, opcoes: ['Acrobacia', 'Atletismo', 'História', 'Intuição', 'Religião', 'Furtividade'] },
    'Paladino': { quantidade: 2, opcoes: ['Atletismo', 'Intuição', 'Intimidação', 'Medicina', 'Persuasão', 'Religião'] },
    'Patrulheiro': { quantidade: 3, opcoes: ['Lidar com Animais', 'Atletismo', 'Furtividade', 'Investigação', 'Natureza', 'Percepção', 'Sobrevivência', 'Intuição'] }
};

window.onload = function() {
    console.log("Sistema iniciado. Verificando banco de dados...");
    
    if (typeof bancoDnD === 'undefined') {
        console.error("ERRO CRÍTICO: O arquivo banco_phb.js não foi carregado.");
        mostrarToast("Erro de conexão com o banco de dados.");
        return; 
    }
    
    console.log("Banco de dados conectado com sucesso!");
    carregarOpcoes();
    document.getElementById('select-raca').addEventListener('change', carregarSubracas);
    document.querySelectorAll('input[name="usar-subraca"]').forEach(campo => campo.addEventListener('change', alternarEscolhaSubraca));
    document.getElementById('select-classe').addEventListener('change', () => {
        carregarSubclasses();
        renderizarPericiasDaClasse();
    });
    document.getElementById('select-antecedente').addEventListener('change', atualizarResumoAntecedente);
    document.getElementById('nivel-personagem').addEventListener('change', () => {
        validarNivel();
        carregarSubclasses();
    });
    renderizarSalvaguardas();
    renderizarPericias();
    renderizarTracos();
    renderizarAtaques();
    configurarDialogoPV();
    ForjaInterface.iniciar();
    restaurarEstado();
    ForjaInterface.renderizar();
};

function carregarOpcoes() {
    const selectRaca = document.getElementById('select-raca');
    const selectClasse = document.getElementById('select-classe');
    const selectAntecedente = document.getElementById('select-antecedente');

    for (let raca in bancoDnD.racas) {
        let opcao = document.createElement('option'); 
        opcao.value = raca; opcao.text = raca;
        selectRaca.appendChild(opcao);
    }
    for (let classe in bancoDnD.classes) {
        let opcao = document.createElement('option'); 
        opcao.value = classe; opcao.text = classe;
        selectClasse.appendChild(opcao);
    }
    for (let antecedente in (bancoDnD.antecedentes || {})) {
        let opcao = document.createElement('option');
        opcao.value = antecedente;
        opcao.text = formatarNomeAntecedente(antecedente);
        selectAntecedente.appendChild(opcao);
    }
}

function renderizarSalvaguardas() {
    const container = document.getElementById('lista-salvaguardas');
    const atributos = { 'for': 'Força', 'des': 'Destreza', 'con': 'Constituição', 'int': 'Inteligência', 'sab': 'Sabedoria', 'car': 'Carisma' };
    
    for (let sigla in atributos) {
        let nomeAtributo = atributos[sigla];
        container.innerHTML += `
            <div class="pericia-item">
                <input type="checkbox" id="salva-${sigla}" disabled>
                <span class="pericia-valor" id="valor-salva-${sigla}">+0</span>
                <span>${nomeAtributo}</span>
            </div>
        `;
    }
}

function renderizarPericias() {
    const container = document.getElementById('lista-pericias');
    container.replaceChildren();
    Object.entries(bancoDnD.pericias).forEach(([nome, atributo]) => {
        const item = document.createElement('div');
        item.className = 'pericia-item';
        const campo = document.createElement('input');
        campo.type = 'checkbox'; campo.id = 'prof-' + nome;
        campo.addEventListener('change', () => alterarPericiaManual(nome, campo.checked));
        const valor = document.createElement('span');
        valor.className = 'pericia-valor'; valor.id = 'valor-' + nome; valor.textContent = '+0';
        const rotulo = document.createElement('label'); rotulo.htmlFor = campo.id; rotulo.textContent = nome;
        const sigla = document.createElement('span'); sigla.className = 'pericia-attr'; sigla.textContent = '(' + atributo + ')';
        item.append(campo, valor, rotulo, sigla); container.appendChild(item);
    });
}

function iniciarPersonagem(restaurando = false) {
    const contexto = contextoDaFicha();
    if (!restaurando) {
        const pendentes = ForjaInterface.pendencias();
        if (pendentes.length) { mostrarToast(pendentes[0].mensagem); return false; }
    }
    const { nome, nivel, raca, subraca, classe, subclasse, alinhamento, antecedente } = contexto;
    const precisaSubclasse = nivel >= ForjaRegras.nivelSubclasse(classe);
    if (!nome || !raca || !classe || (precisaSubclasse && !subclasse) || !alinhamento || !antecedente) {
        if (!restaurando) mostrarToast('Conclua todas as escolhas antes de gerar a ficha.');
        return false;
    }
    if (!validarPericiasDaClasse(restaurando)) return false;
    personagemAtual = { nome, nivel, raca, subraca, classe, subclasse, alinhamento, antecedente };
    document.getElementById('criacao-rapida').style.display = 'none';
    document.getElementById('ficha-completa').style.display = 'block';
    document.getElementById('display-nome').textContent = nome;
    document.getElementById('display-origem').textContent = subraca || raca;
    document.getElementById('display-classe').textContent = classe;
    document.getElementById('display-subclasse').textContent = precisaSubclasse ? subclasse : 'Subclasse no nível ' + ForjaRegras.nivelSubclasse(classe);
    document.getElementById('display-alinhamento').textContent = alinhamento;
    document.getElementById('display-antecedente').textContent = formatarNomeAntecedente(antecedente);
    document.getElementById('display-nivel').textContent = nivel;
    document.getElementById('display-proficiencia').textContent = '+' + obterBonusProficiencia();
    recalcularFicha();
    mudarAba('pagina-1');
    salvarEstado();
    return true;
}

function calcularModificador(valorAtributo) {
    return ForjaRegras.modificador(valorAtributo);
}

function calcularAtributos(racaEscolhida, subracaEscolhida = '') {
    const calculo = ForjaRegras.atributos({ ...contextoDaFicha(), raca: racaEscolhida, subraca: subracaEscolhida }, bancoDnD);
    Object.keys(ForjaRegras.ATRIBUTOS).forEach(sigla => {
        document.getElementById('final-' + sigla).textContent = calculo.valores[sigla];
        document.getElementById('mod-' + sigla).textContent = formatarBonus(calculo.modificadores[sigla]);
        document.getElementById('final-' + sigla).title = calculo.origens[sigla].map(parte => parte.origem + ': ' + parte.valor).join(' • ');
    });
}

function normalizarListaProficiencias(lista) {
    const vistos = new Set();
    return (Array.isArray(lista) ? lista : []).filter(item => {
        const chave = normalizarTextoProficiencia(item);
        if (!chave || vistos.has(chave)) return false;
        vistos.add(chave);
        return true;
    });
}

function normalizarTextoProficiencia(valor) {
    return String(valor || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
}

function adicionarListaUnica(destino, itens) {
    const existentes = new Set(destino.map(normalizarTextoProficiencia));
    (Array.isArray(itens) ? itens : []).forEach(item => {
        const chave = normalizarTextoProficiencia(item);
        if (chave && !existentes.has(chave)) {
            destino.push(item);
            existentes.add(chave);
        }
    });
}

function obterDadosProficienciasAutomaticas() {
    const contexto = contextoDaFicha();
    const dados = ForjaRegras.proficiencias({ ...contexto, proficienciasAdicionais: [] }, bancoDnD);
    dados.limites = { idioma: 0, ferramenta: 0, arma: 0 };
    return dados;
}



function criarChipAdicional(item) {
    const chip = document.createElement('span');
    chip.className = 'chip-proficiencia ' + (item.origem === 'escolha' ? 'chip-escolhido' : 'chip-manual');
    const texto = document.createElement('span');
    texto.textContent = item.nome;
    chip.appendChild(texto);

    if (item.origem === 'manual') {
        const editar = document.createElement('button');
        editar.type = 'button';
        editar.className = 'acao-chip-proficiencia';
        editar.title = 'Editar';
        editar.setAttribute('aria-label', 'Editar ' + item.nome);
        editar.textContent = '✎';
        editar.onclick = () => abrirModalProficiencia('editar', item.tipo, item.id);
        chip.appendChild(editar);
    }

    const remover = document.createElement('button');
    remover.type = 'button';
    remover.className = 'acao-chip-proficiencia';
    remover.title = item.origem === 'escolha' ? 'Escolher novamente' : 'Remover';
    remover.setAttribute('aria-label', remover.title + ' ' + item.nome);
    remover.textContent = '×';
    remover.onclick = () => removerProficienciaAdicional(item.id);
    chip.appendChild(remover);
    return chip;
}

function criarGrupoProficiencias(titulo, icone, tipo, itensAutomaticos, limiteEscolhas = 0) {
    const adicionais = ForjaRegras.adicionaisAtivas(contextoDaFicha(), bancoDnD).filter(item => item.tipo === tipo);
    const escolhasFeitas = adicionais.filter(item => item.origem === 'escolha').length;
    const pendentes = Math.max(0, limiteEscolhas - escolhasFeitas);
    if (!itensAutomaticos.length && !adicionais.length && !pendentes) return null;

    const grupo = document.createElement('section');
    grupo.className = 'grupo-proficiencia-automatica';
    const cabecalho = document.createElement('div');
    cabecalho.className = 'titulo-grupo-proficiencia';
    const simbolo = document.createElement('span');
    simbolo.className = 'icone-grupo-proficiencia';
    simbolo.textContent = icone;
    const nome = document.createElement('strong');
    nome.textContent = titulo;
    cabecalho.append(simbolo, nome);

    const lista = document.createElement('div');
    lista.className = 'chips-proficiencias';
    normalizarListaProficiencias(itensAutomaticos).forEach(valor => {
        const chip = document.createElement('span');
        chip.className = 'chip-proficiencia chip-automatico';
        chip.textContent = valor;
        chip.title = 'Concedido automaticamente';
        lista.appendChild(chip);
    });
    adicionais.forEach(item => lista.appendChild(criarChipAdicional(item)));

    if (pendentes) {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'chip-proficiencia chip-pendente';
        botao.textContent = '+ Escolher ' + pendentes + (tipo === 'idioma'
            ? (pendentes === 1 ? ' idioma' : ' idiomas')
            : (pendentes === 1 ? ' proficiência' : ' proficiências'));
        botao.onclick = () => abrirModalProficiencia('escolha', tipo);
        lista.appendChild(botao);
    }

    grupo.append(cabecalho, lista);
    return grupo;
}

function atualizarPercepcaoEProficiencias() {
    const calculo = ForjaRegras.percepcaoPassiva(contextoDaFicha(), bancoDnD);
    document.getElementById('display-percepcao-passiva').textContent = calculo.valor;
    document.getElementById('calculo-percepcao-passiva').textContent = '10 ' + formatarBonus(calculo.teste.valor) + ' do teste de Percepção' +
        (calculo.observador ? ' + 5 Observador' : '') + (calculo.situacao ? ' ' + formatarBonus(calculo.situacao) + ' pela situação' : '');
    document.getElementById('situacao-percepcao').value = percepcaoSituacao;
    const dados = obterDadosProficienciasAutomaticas();
    const container = document.getElementById('lista-proficiencias-automaticas');
    container.replaceChildren();
    const grupos = [
        criarGrupoProficiencias('Idiomas', '文', 'idioma', dados.idioma, dados.limites.idioma),
        criarGrupoProficiencias('Armas', '⚔', 'arma', dados.arma, dados.limites.arma),
        criarGrupoProficiencias('Armaduras e escudos', '◆', 'armadura', dados.armadura),
        criarGrupoProficiencias('Ferramentas e veículos', '⚒', 'ferramenta', dados.ferramenta, dados.limites.ferramenta)
    ].filter(Boolean);
    if (!grupos.length) container.innerHTML = '<em class="texto-vazio">Nenhum idioma ou proficiência informado.</em>';
    else grupos.forEach(grupo => container.appendChild(grupo));
}

function catalogoPorTipoProficiencia(tipo) {
    if (tipo === 'idioma') return CATALOGO_IDIOMAS;
    if (tipo === 'ferramenta') return CATALOGO_FERRAMENTAS;
    if (tipo === 'arma') {
        const armas = [];
        Object.values(bancoDnD.equipamentos?.armas || {}).forEach(lista =>
            lista.forEach(item => armas.push(item.nome))
        );
        return normalizarListaProficiencias(armas);
    }
    if (tipo === 'armadura') {
        const armaduras = [];
        Object.values(bancoDnD.equipamentos?.armaduras || {}).forEach(lista =>
            lista.forEach(item => armaduras.push(item.nome))
        );
        return normalizarListaProficiencias(armaduras);
    }
    return [];
}

function atualizarSugestoesProficiencia() {
    const tipo = document.getElementById('proficiencia-tipo').value;
    const rotulos = { idioma: 'Idioma', arma: 'Arma', armadura: 'Armadura ou escudo', ferramenta: 'Ferramenta, instrumento, jogo ou veículo' };
    document.getElementById('rotulo-valor-proficiencia').textContent = rotulos[tipo];
    const datalist = document.getElementById('sugestoes-proficiencia');
    datalist.innerHTML = '';
    catalogoPorTipoProficiencia(tipo).forEach(valor => {
        const opcao = document.createElement('option');
        opcao.value = valor;
        datalist.appendChild(opcao);
    });
}

function abrirModalProficiencia(modo = 'manual', tipo = 'idioma', id = '') {
    const modal = document.getElementById('modal-proficiencia');
    const form = document.getElementById('form-proficiencia');
    form.reset();
    document.getElementById('proficiencia-id-edicao').value = id;
    document.getElementById('proficiencia-origem').value = modo === 'escolha' ? 'escolha' : 'manual';
    const selectTipo = document.getElementById('proficiencia-tipo');
    const itemEdicao = proficienciasAdicionais.find(item => item.id === id);

    if (itemEdicao) {
        selectTipo.value = itemEdicao.tipo;
        document.getElementById('proficiencia-valor').value = itemEdicao.nome;
    } else {
        selectTipo.value = tipo;
    }
    selectTipo.disabled = modo === 'escolha' || modo === 'editar';
    document.getElementById('titulo-modal-proficiencia').textContent =
        modo === 'escolha' ? 'Concluir escolha' : modo === 'editar' ? 'Editar informação' : 'Adicionar à ficha';
    document.getElementById('subtitulo-modal-proficiencia').textContent =
        modo === 'escolha' ? 'Escolha uma opção concedida pela criação do personagem.' :
        modo === 'editar' ? 'Atualize a informação adicionada manualmente.' :
        'Inclua um idioma ou proficiência personalizada.';
    document.getElementById('btn-salvar-proficiencia').textContent =
        modo === 'editar' ? 'Salvar alteração' : modo === 'escolha' ? 'Confirmar escolha' : 'Adicionar à ficha';
    atualizarSugestoesProficiencia();
    modal.style.display = 'flex';
    setTimeout(() => document.getElementById('proficiencia-valor').focus(), 0);
}

function fecharModalProficiencia() {
    document.getElementById('modal-proficiencia').style.display = 'none';
    document.getElementById('proficiencia-tipo').disabled = false;
    document.getElementById('form-proficiencia').reset();
}

function salvarProficiencia(evento) {
    evento.preventDefault();
    const tipo = document.getElementById('proficiencia-tipo').value;
    const nome = document.getElementById('proficiencia-valor').value.trim();
    const origem = document.getElementById('proficiencia-origem').value;
    const idEdicao = document.getElementById('proficiencia-id-edicao').value;
    if (!nome) return;

    const dados = obterDadosProficienciasAutomaticas();
    const todosDaCategoria = [...(dados[tipo] || []), ...proficienciasAdicionais.filter(item => item.tipo === tipo && item.id !== idEdicao).map(item => item.nome)];
    if (todosDaCategoria.some(item => normalizarTextoProficiencia(item) === normalizarTextoProficiencia(nome))) {
        mostrarToast('Essa informação já está presente na ficha.', 'aviso');
        return;
    }
    if (origem === 'escolha') {
        const feitas = proficienciasAdicionais.filter(item => item.origem === 'escolha' && item.tipo === tipo).length;
        if (feitas >= (dados.limites[tipo] || 0)) {
            mostrarToast('Todas as escolhas desta categoria já foram concluídas.', 'aviso');
            fecharModalProficiencia();
            return;
        }
    }

    if (idEdicao) {
        const item = proficienciasAdicionais.find(valor => valor.id === idEdicao);
        if (item) item.nome = nome;
    } else {
        proficienciasAdicionais.push({
            id: 'prof-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
            tipo,
            nome,
            origem
        });
    }
    calcularTodasPericias();
    atualizarClasseArmadura();
    renderizarAtaques();
    salvarEstado();
    fecharModalProficiencia();
    mostrarToast(idEdicao ? 'Informação atualizada.' : 'Informação adicionada à ficha.', 'sucesso');
}

function removerProficienciaAdicional(id) {
    proficienciasAdicionais = proficienciasAdicionais.filter(item => item.id !== id);
    calcularTodasPericias();
    atualizarClasseArmadura();
    renderizarAtaques();
    salvarEstado();
    mostrarToast('Informação removida da ficha.', 'sucesso');
}

function calcularCombate(racaEscolhida, classeEscolhida) {
    const contexto = { ...contextoDaFicha(), raca: racaEscolhida, classe: classeEscolhida };
    const atributos = ForjaRegras.atributos(contexto, bancoDnD);
    const iniciativa = atributos.modificadores.des + (ForjaRegras.temTalento(contexto, 'alert') ? 5 : 0) +
        (classeEscolhida === 'Bardo' && contexto.nivel >= 2 ? Math.floor(obterBonusProficiencia() / 2) : 0);
    document.getElementById('display-iniciativa').textContent = formatarBonus(iniciativa + ForjaCampanha.ajuste(contexto, 'iniciativa'));
    const { armadura, escudo } = equipamentoAtivo();
    document.getElementById('display-deslocamento').textContent = ForjaRegras.deslocamento(contexto, bancoDnD, armadura, escudo);
    const maximo = ForjaCampanha.pvMaximos(contexto, bancoDnD);
    recursosPersonagem = ForjaRegras.pontosVidaAtuais(recursosPersonagem, maximo);
    document.getElementById('display-hp-max').textContent = maximo;
    atualizarDisplayPV();
    atualizarClasseArmadura();
}

function calcularSalvaguardas(classeEscolhida) {
    const contexto = { ...contextoDaFicha(), classe: classeEscolhida };
    const lista = bancoDnD.classes[classeEscolhida]?.proficienciasSalvaguarda || [];
    const atributos = ForjaRegras.atributos(contexto, bancoDnD);
    const resilientes = ForjaRegras.talentosAtivos(contexto).filter(traco => ForjaRegras.talentoId(traco) === 'resilient');
    Object.entries(ForjaRegras.ATRIBUTOS).forEach(([sigla, nome]) => {
        const treinado = lista.includes(nome) || resilientes.some(traco => traco.bonusAtributo?.sigla === sigla);
        document.getElementById('salva-' + sigla).checked = treinado;
        document.getElementById('valor-salva-' + sigla).textContent = formatarBonus(atributos.modificadores[sigla] + (treinado ? obterBonusProficiencia() : 0));
    });
}

function calcularTodasPericias() {
    aplicarPericiasDaClasse();
    const contexto = contextoDaFicha(), atributos = ForjaRegras.atributos(contexto, bancoDnD);
    Object.keys(bancoDnD.pericias).forEach(nome => {
        const calculo = ForjaRegras.testePericia(contexto, bancoDnD, nome, atributos);
        document.getElementById('valor-' + nome).textContent = formatarBonus(calculo.valor + ForjaCampanha.ajuste(contexto, 'pericia:' + nome));
        document.getElementById('prof-' + nome).title = calculo.fontes.length ? 'Proficiência: ' + calculo.fontes.join(', ') : 'Adicionar proficiência manual';
    });
    atualizarPercepcaoEProficiencias();
    salvarEstado();
}

function mapearNomeAtributo(sigla) {
    const mapa = { 'for': 'forca', 'des': 'destreza', 'con': 'constituicao', 'int': 'inteligencia', 'sab': 'sabedoria', 'car': 'carisma' };
    return mapa[sigla];
}

function mudarAba(idAbaDesejada, botao = null) {
    const todasAbas = document.getElementsByClassName('aba');
    for (let i = 0; i < todasAbas.length; i++) { 
        todasAbas[i].style.display = 'none'; 
    }
    document.getElementById(idAbaDesejada).style.display = 'block';

    const botoesAba = document.querySelectorAll('.menu-abas .btn-aba');
    botoesAba.forEach(btn => btn.classList.remove('ativa'));
    const correto = botao || Array.from(botoesAba).find(btn =>
        (btn.getAttribute('onclick') || '').includes("'" + idAbaDesejada + "'")
    );
    if (correto) correto.classList.add('ativa');
}

// ==========================================
// FUNÇÕES DO MODAL E DO INVENTÁRIO (COM CARGA)
// ==========================================

function abrirModalEquipamentos() {
    document.getElementById('modal-equipamentos').style.display = 'flex';
    mudarCategoriaModal('todos');
}

function fecharModalEquipamentos() {
    document.getElementById('modal-equipamentos').style.display = 'none';
}

function mudarCategoriaModal(categoria, botao = null) {
    const botoes = document.querySelectorAll('#modal-equipamentos .modal-abas .btn-cat');
    botoes.forEach(b => b.classList.remove('ativa'));
    const correto = botao || Array.from(botoes).find(b =>
        (b.getAttribute('onclick') || '').includes("'" + categoria + "'")
    );
    if (correto) correto.classList.add('ativa');

    const catalogo = document.getElementById('modal-lista-itens');
    const formulario = document.getElementById('form-item-personalizado');
    const personalizado = categoria === 'personalizados';
    catalogo.hidden = personalizado;
    formulario.hidden = !personalizado;
    if (personalizado) {
        atualizarCamposItemPersonalizado();
        return;
    }
    carregarItensCatalogo(categoria);
}

function carregarItensCatalogo(categoria) {
    const container = document.getElementById('modal-lista-itens');
    container.innerHTML = '';

    const eq = bancoDnD.equipamentos;
    let listaParaExibir = [];

    if (categoria === 'todos' || categoria === 'armas') {
        for (let sub in eq.armas) {
            eq.armas[sub].forEach(item => {
                listaParaExibir.push({
                    nome: item.nome,
                    preco: item.preco,
                    peso: item.peso,
                    detalhes: `Dano: ${item.dano} | ${item.propriedades}`
                });
            });
        }
    }

    if (categoria === 'todos' || categoria === 'armaduras') {
        for (let sub in eq.armaduras) {
            eq.armaduras[sub].forEach(item => {
                listaParaExibir.push({
                    nome: item.nome,
                    preco: item.preco,
                    peso: item.peso,
                    detalhes: `CA: ${item.ca}`
                });
            });
        }
    }

    if (categoria === 'todos' || categoria === 'aventura') {
        eq.equipamento_aventura.forEach(item => {
            listaParaExibir.push({
                nome: item.item,
                preco: item.custo,
                peso: item.peso,
                detalhes: `Custo: ${item.custo}`
            });
        });
    }

    if (categoria === 'todos' || categoria === 'pacotes') {
        eq.pacotes.forEach(item => {
            listaParaExibir.push({
                nome: item.nome,
                preco: item.custo,
                peso: "Variado",
                detalhes: item.descricao
            });
        });
    }

    listaParaExibir.forEach(item => {
        let div = document.createElement('div');
        div.className = 'item-catalogo';
        div.innerHTML = `
            <div class="item-info">
                <span class="item-nome">${item.nome} (${item.preco})</span>
                <span class="item-detalhes">${item.detalhes} | Peso: ${item.peso}</span>
            </div>
            <button class="btn-adicionar-catalogo" onclick="adicionarAoInventario('${item.nome}', '${item.peso}')">Adicionar</button>
        `;
        container.appendChild(div);
    });
}

function adicionarAoInventario(nome, pesoStr) {
    if (Object.keys(ForjaOpcoes.pacotes).some(x => ForjaRegras.normalizar(x) === ForjaRegras.normalizar(nome))) {
        ForjaInterface.adicionarItem(nome); atualizarInventario(); ForjaInterface.renderizar(); return;
    }
    let pesoNum = 0;
    if (pesoStr && pesoStr !== "-" && pesoStr !== "Variado") {
        let limpo = pesoStr.replace(" kg", "").replace(",", ".");
        pesoNum = parseFloat(limpo) || 0;
    }

    const existente = inventarioPersonagem.find(item => item.nome === nome && !item.personalizado);
    if (existente) {
        existente.quantidade = (existente.quantidade || 1) + 1;
    } else {
        inventarioPersonagem.push({ id: novoId('item'), nome: nome, peso: pesoNum, pesoOriginal: pesoStr, quantidade: 1 });
    }
    atualizarInventario();
    mostrarToast(nome + ' foi adicionado ao inventário.', 'sucesso');
}

function selecionarTipoItemPersonalizado(tipo, botao = null) {
    const campoTipo = document.getElementById('item-personalizado-tipo');
    if (campoTipo) campoTipo.value = tipo;
    document.querySelectorAll('.tipo-item-card').forEach(card => {
        card.classList.toggle('selecionado', card === botao || (!botao && card.dataset.tipo === tipo));
    });
    atualizarCamposItemPersonalizado();
}

function atualizarCamposItemPersonalizado() {
    const tipo = document.getElementById('item-personalizado-tipo')?.value || 'comum';
    ['comum', 'arma', 'armadura', 'pocao'].forEach(nome => {
        const bloco = document.getElementById('campos-personalizado-' + nome);
        if (bloco) bloco.hidden = tipo !== nome;
    });
    const ajudas = {
        comum: 'O item comum não precisa de informações adicionais',
        arma: 'Defina como a arma funciona nos ataques',
        armadura: 'Defina a proteção que ela oferece ao personagem',
        pocao: 'Defina se o efeito da poção usa uma rolagem'
    };
    const ajuda = document.getElementById('ajuda-tipo-personalizado');
    if (ajuda) ajuda.textContent = ajudas[tipo];
    atualizarCamposRolagemPocao();
    atualizarResumoItemPersonalizado();
}

function atualizarCamposRolagemPocao() {
    const campos = document.getElementById('campos-rolagem-pocao');
    const marcado = document.getElementById('pocao-personalizada-tem-rolagem')?.checked;
    if (campos) campos.hidden = !marcado;
    atualizarResumoItemPersonalizado();
}

function atualizarResumoItemPersonalizado() {
    const tipo = document.getElementById('item-personalizado-tipo')?.value || 'comum';
    const nome = document.getElementById('item-personalizado-nome')?.value.trim();
    const peso = Math.max(0, obterValorNumerico('item-personalizado-peso'));
    const configuracoes = {
        comum: { icone: '📦', titulo: 'Novo item comum', detalhe: 'Item comum' },
        arma: { icone: '⚔️', titulo: 'Nova arma', detalhe: 'Arma' },
        armadura: { icone: '🛡️', titulo: 'Nova armadura', detalhe: 'Armadura' },
        pocao: { icone: '🧪', titulo: 'Nova poção', detalhe: 'Poção' }
    };
    const atual = configuracoes[tipo];
    let detalhe = atual.detalhe;

    if (tipo === 'arma') {
        const quantidade = Math.max(1, Math.floor(obterValorNumerico('arma-personalizada-quantidade', 1)));
        detalhe += ' · ' + quantidade + (document.getElementById('arma-personalizada-dado')?.value || 'd8');
        detalhe += ' ' + (document.getElementById('arma-personalizada-dano')?.value || 'cortante');
    } else if (tipo === 'armadura') {
        const ca = Math.max(1, Math.floor(obterValorNumerico('armadura-personalizada-ca', 10)));
        detalhe += ' · CA ' + ca;
        if (document.getElementById('armadura-personalizada-calculo')?.value === 'destreza') detalhe += ' + Destreza';
    } else if (tipo === 'pocao') {
        if (document.getElementById('pocao-personalizada-tem-rolagem')?.checked) {
            const quantidade = Math.max(1, Math.floor(obterValorNumerico('pocao-personalizada-quantidade', 1)));
            const dado = document.getElementById('pocao-personalizada-dado')?.value || 'd6';
            const bonus = Math.floor(obterValorNumerico('pocao-personalizada-bonus'));
            detalhe += ' · ' + quantidade + dado + (bonus > 0 ? ' + ' + bonus : bonus < 0 ? ' - ' + Math.abs(bonus) : '');
        } else {
            detalhe += ' · sem rolagem';
        }
    }

    document.getElementById('resumo-item-icone').textContent = atual.icone;
    document.getElementById('resumo-item-nome').textContent = nome || atual.titulo;
    document.getElementById('resumo-item-detalhes').textContent = detalhe + ' · ' + peso.toLocaleString('pt-BR') + ' kg';
}

function limparFormularioItemPersonalizado() {
    document.getElementById('form-item-personalizado')?.reset();
    const campoTipo = document.getElementById('item-personalizado-tipo');
    if (campoTipo) campoTipo.value = 'comum';
    selecionarTipoItemPersonalizado('comum');
}

function obterValorNumerico(id, padrao = 0) {
    const valor = Number(document.getElementById(id)?.value);
    return Number.isFinite(valor) ? valor : padrao;
}

function salvarItemPersonalizado(evento) {
    evento.preventDefault();
    const nome = document.getElementById('item-personalizado-nome').value.trim();
    const tipo = document.getElementById('item-personalizado-tipo').value;
    const peso = Math.max(0, obterValorNumerico('item-personalizado-peso'));
    if (!nome) {
        mostrarToast('Informe o nome do item personalizado.', 'aviso');
        return;
    }
    const nomeEmUso = inventarioPersonagem.some(item => item.nome.toLocaleLowerCase('pt-BR') === nome.toLocaleLowerCase('pt-BR')) ||
        listarArmasBanco(false).some(item => item.nome.toLocaleLowerCase('pt-BR') === nome.toLocaleLowerCase('pt-BR')) ||
        localizarArmaduraBanco(nome);
    if (nomeEmUso) {
        mostrarToast('Já existe um item com esse nome no inventário ou no catálogo.', 'aviso');
        return;
    }

    const item = {
        id: novoId('item'),
        nome,
        peso,
        pesoOriginal: peso.toFixed(2).replace('.', ',') + ' kg',
        quantidade: 1,
        personalizado: true,
        tipoPersonalizado: tipo,
        dadosPersonalizados: {}
    };

    if (tipo === 'arma') {
        const quantidade = Math.max(1, Math.floor(obterValorNumerico('arma-personalizada-quantidade', 1)));
        const dado = document.getElementById('arma-personalizada-dado').value;
        const modalidade = document.getElementById('arma-personalizada-modalidade').value;
        item.dadosPersonalizados = {
            dano: quantidade + dado,
            tipoDano: document.getElementById('arma-personalizada-dano').value,
            modalidade,
            categoria: document.getElementById('arma-personalizada-categoria').value,
            atributoPadrao: modalidade === 'distância' ? 'destreza' : 'forca',
            acuidade: document.getElementById('arma-personalizada-acuidade').checked,
            versatil: false,
            danoVersatil: null
        };
    }

    if (tipo === 'armadura') {
        item.dadosPersonalizados = {
            ca: Math.max(1, Math.floor(obterValorNumerico('armadura-personalizada-ca', 10))),
            calculoCA: document.getElementById('armadura-personalizada-calculo').value
        };
    }

    if (tipo === 'pocao') {
        const temRolagem = document.getElementById('pocao-personalizada-tem-rolagem').checked;
        item.dadosPersonalizados = { temRolagem };
        if (temRolagem) {
            item.dadosPersonalizados.rolagem =
                Math.max(1, Math.floor(obterValorNumerico('pocao-personalizada-quantidade', 1))) +
                document.getElementById('pocao-personalizada-dado').value;
            item.dadosPersonalizados.bonus = Math.floor(obterValorNumerico('pocao-personalizada-bonus'));
        }
    }

    inventarioPersonagem.push(item);
    atualizarInventario();
    limparFormularioItemPersonalizado();
    mostrarToast(nome + ' foi adicionado ao inventário.', 'sucesso');
}

function descreverItemPersonalizado(item) {
    if (!item?.personalizado) return '';
    const dados = item.dadosPersonalizados || {};
    if (item.tipoPersonalizado === 'arma') return 'Arma · ' + dados.dano + ' ' + dados.tipoDano;
    if (item.tipoPersonalizado === 'armadura') return 'Armadura · CA ' + dados.ca + (dados.calculoCA === 'destreza' ? ' + Destreza' : '');
    if (item.tipoPersonalizado === 'pocao') {
        if (!dados.temRolagem) return 'Poção · sem rolagem';
        const bonus = Number(dados.bonus) || 0;
        return 'Poção · ' + dados.rolagem + (bonus > 0 ? ' + ' + bonus : bonus < 0 ? ' - ' + Math.abs(bonus) : '');
    }
    return 'Item comum';
}

function removerDoInventario(index) {
    const item = inventarioPersonagem[index];
    if (item && (item.quantidade || 1) > 1) {
        item.quantidade -= 1;
    } else {
        const nomeRemovido = item?.nome;
        Object.keys(equipamentoPersonagem).forEach(tipo => { if (equipamentoPersonagem[tipo] === item?.id) equipamentoPersonagem[tipo] = null; });
        inventarioPersonagem.splice(index, 1);
        if (nomeRemovido && !inventarioPersonagem.some(outro => outro.nome === nomeRemovido)) {
            ataquesPersonagem = ataquesPersonagem.filter(ataque => ataque.nomeArma !== nomeRemovido);
            renderizarAtaques();
        }
    }
    atualizarInventario();
}

function atualizarInventario() {
    const container = document.getElementById('lista-inventario');
    const spanPesoTotal = document.getElementById('peso-total');
    const spanPesoMaximo = document.getElementById('peso-maximo');
    const barraPreenchimento = document.getElementById('barra-progresso-carga');
    
    container.innerHTML = '';
    
    // 1. Lê a Força Final da Página 1 para calcular o limite oficial (Força * 7.5 kg)
    let forcaFinal = parseInt(document.getElementById('final-for').innerText) || 10;
    let capacidadeMaxima = forcaFinal * 7.5;
    spanPesoMaximo.innerText = capacidadeMaxima.toString().replace(".", ",");

    if (inventarioPersonagem.length === 0) {
        container.innerHTML = '<em class="texto-vazio">Nenhum item adicionado.</em>';
        spanPesoTotal.innerText = "0,0";
        barraPreenchimento.style.width = "0%";
        barraPreenchimento.style.backgroundColor = "#4caf50";
        calcularCombate(contextoDaFicha().raca, contextoDaFicha().classe);
        if (!restaurandoEstado) ForjaInterface.renderizar();
    salvarEstado();
        return;
    }

    let pesoTotal = 0;

    inventarioPersonagem.forEach((item, index) => {
        item.quantidade = item.quantidade || 1;
        pesoTotal += item.peso * item.quantidade;
        let div = document.createElement('div');
        div.className = 'item-inventario' + (item.personalizado ? ' item-personalizado' : '');
        const detalhes = descreverItemPersonalizado(item);
        div.innerHTML = `
            <span class="item-inventario-texto">
                <b>${item.quantidade}× ${escaparHtml(item.nome)}</b>
                <small>${escaparHtml(item.pesoOriginal || (item.peso + ' kg'))}${detalhes ? ' · ' + escaparHtml(detalhes) : ''}</small>
            </span>
            <span class="item-inventario-acoes">${botaoEquipamento(item, index)}<button class="btn-remover" onclick="removerDoInventario(${index})" title="Remover" aria-label="Remover ${escaparHtml(item.nome)}">&times;</button></span>
        `;
        container.appendChild(div);
    });

    spanPesoTotal.innerText = pesoTotal.toFixed(1).replace(".", ",");

    // 2. Cálculo da Porcentagem da Barra de Carga
    let porcentagem = (pesoTotal / capacidadeMaxima) * 100;
    if (porcentagem > 100) porcentagem = 100; // Trava visualmente em 100% no máximo
    barraPreenchimento.style.width = porcentagem + "%";

    // 3. Mudança dinâmica de cor da barra baseada nas regras de carga
    // Verde (< 100%): Carga segura
    // Amarelo (100% a 200% do limite básico): Carga excessiva / Sobrecarregado
    let limiteSobrecarregado = forcaFinal * 15; // Dobro da capacidade básica
    
    if (pesoTotal <= capacidadeMaxima) {
        barraPreenchimento.style.backgroundColor = "#4caf50"; // Verde (Seguro)
    } else if (pesoTotal <= limiteSobrecarregado) {
        barraPreenchimento.style.backgroundColor = "#ff9800"; // Laranja/Amarelo (Carga Excessiva)
    } else {
        barraPreenchimento.style.backgroundColor = "#d32f2f"; // Vermelho (Sobrecarregado / Limite Máximo atingido)
    }
    calcularCombate(contextoDaFicha().raca, contextoDaFicha().classe);
    if (!restaurandoEstado) ForjaInterface.renderizar();
    salvarEstado();
}

function localizarArmaduraBanco(nome) {
    for (const subtipo in bancoDnD.equipamentos.armaduras) {
        const item = bancoDnD.equipamentos.armaduras[subtipo].find(a => a.nome.toLocaleLowerCase('pt-BR') === String(nome).toLocaleLowerCase('pt-BR'));
        if (item) return { ...item, subtipo };
    }
    return null;
}

function localizarArmadura(nome) {
    const itemPersonalizado = inventarioPersonagem.find(item =>
        item.personalizado && item.tipoPersonalizado === 'armadura' && item.nome === nome
    );
    if (itemPersonalizado) {
        const dados = itemPersonalizado.dadosPersonalizados || {};
        return {
            nome: itemPersonalizado.nome,
            ca: dados.ca,
            subtipo: dados.calculoCA === 'destreza' ? 'personalizada-destreza' : 'personalizada-fixa'
        };
    }
    return localizarArmaduraBanco(nome);
}

function atualizarClasseArmadura() {
    const { armadura, escudo } = equipamentoAtivo();
    const calculo = ForjaCampanha.defesa(contextoDaFicha(), bancoDnD, armadura, escudo, inventarioPersonagem);
    document.getElementById('display-ca').textContent = calculo.valor;
    document.getElementById('calculo-ca').textContent = calculo.origem + ': ' + calculo.formula;
    const aviso = document.getElementById('aviso-armadura');
    aviso.hidden = calculo.semProficiencia.length === 0;
    aviso.textContent = calculo.semProficiencia.length ? 'Sem proficiência com ' + calculo.semProficiencia.map(item => item.nome).join(' e ') +
        ': desvantagem em testes, salvaguardas e ataques que envolvam Força ou Destreza. Não pode conjurar magias usando esse equipamento.' : '';
}

function salvarEstado() {
    if (restaurandoEstado || salvamentoBloqueado) return;
    try {
        const storage = window.localStorage;
        ForjaEstado.salvar(storage, capturarEstado());
        document.getElementById('alerta-salvamento').hidden = true;
    } catch (erro) {
        salvamentoBloqueado = true;
        avisarFalhaSalvamento('Não foi possível salvar. As alterações continuam nesta tela. Baixe uma cópia antes de fechar a página. ' + erro.message);
    }
}

function restaurarEstado() {
    let resultado;
    try { resultado = ForjaEstado.carregar(window.localStorage, bancoDnD); }
    catch (erro) { resultado = { bloqueado: true, erro: erro.message }; }
    if (resultado.bloqueado) {
        salvamentoBloqueado = true;
        avisarFalhaSalvamento('Não foi possível abrir a ficha salva. Os dados originais foram conservados. Baixe uma cópia ou tente recuperar a anterior. ' + resultado.erro);
        return;
    }
    if (!resultado.estado) return;
    const estado = resultado.estado;
    detalhesFicha = ForjaCampanha.completar(estado.detalhes);
    restaurandoEstado = true;
    try {
        document.getElementById('nome-personagem').value = estado.nome;
        document.getElementById('nivel-personagem').value = estado.nivel;
        document.getElementById('select-raca').value = estado.raca;
        carregarSubracas();
        const escolha = estado.usarSubraca || (estado.subraca ? 'sim' : 'nao');
        const radio = document.querySelector('input[name="usar-subraca"][value="' + (escolha === 'sim' ? 'sim' : 'nao') + '"]');
        if (radio) radio.checked = true;
        alternarEscolhaSubraca();
        document.getElementById('select-subraca').value = estado.subraca;
        document.getElementById('select-classe').value = estado.classe;
        carregarSubclasses();
        document.getElementById('select-subclasse').value = estado.subclasse;
        document.getElementById('select-alinhamento').value = estado.alinhamento;
        const aliases = { 'Artisao da Guilda': 'Artesão da Guilda', 'Orfao': 'Órfão' };
        const candidato = aliases[estado.antecedente] || estado.antecedente;
        document.getElementById('select-antecedente').value = bancoDnD.antecedentes[candidato] ? candidato : estado.antecedente;
        Object.entries(estado.atributos).forEach(([sigla, valor]) => document.getElementById('attr-' + sigla).value = valor);
        inventarioPersonagem = estado.inventario;
        ataquesPersonagem = estado.ataques;
        tracosPersonagem = estado.tracos;
        proficienciasAdicionais = estado.proficienciasAdicionais;
        progressosResolvidos = estado.progressosResolvidos;
        periciasManuais = estado.periciasManuais;
        especializacoes = estado.especializacoes || [];
        percepcaoSituacao = estado.percepcaoSituacao || 'normal';
        recursosPersonagem = estado.recursos;
        equipamentoPersonagem = estado.equipamento;
        tracosAutomaticosExpandidos = new Set(estado.tracosAutomaticosExpandidos || []);
        renderizarPericiasDaClasse();
        estado.periciasClasse.forEach(nome => {
            const campo = document.querySelector('#lista-pericias-criacao input[value="' + CSS.escape(nome) + '"]');
            if (campo) campo.checked = true;
        });
        atualizarContadorPericias();
        atualizarResumoAntecedente();
        for (const [campo, original] of [['select-raca', estado.raca], ['select-classe', estado.classe], ['select-antecedente', candidato]]) {
            if (original && document.getElementById(campo).value !== original) throw new Error('Registro não reconhecido: ' + original);
        }
        if (estado.fichaGerada && !iniciarPersonagem(true)) {
            salvamentoBloqueado = true;
            avisarFalhaSalvamento('A ficha antiga tem escolhas pendentes. Baixe uma cópia antes de concluir a revisão. Os dados originais permanecem salvos.');
            mostrarEtapa(2);
            mostrarToast('Complete as escolhas de origem para abrir sua ficha. Seus itens e anotações continuam salvos.', 'aviso');
        }
    } catch (erro) {
        salvamentoBloqueado = true;
        avisarFalhaSalvamento('A ficha precisa de revisão e não foi sobrescrita. Baixe os dados para recuperação. ' + erro.message);
    } finally {
        restaurandoEstado = false;
    }
    if (!salvamentoBloqueado) salvarEstado();
    if (resultado.migrado && estado.inventario.some(item => localizarArmadura(item.nome))) mostrarToast('Sua ficha foi recuperada. Use Vestir ou Empunhar no inventário para indicar a armadura e o escudo em uso.');
}


function mostrarEtapa(numero) {
    document.querySelectorAll('.etapa-criacao').forEach(etapa => etapa.classList.toggle('ativa', Number(etapa.dataset.etapa) === numero));
    document.querySelectorAll('.passo-indicador').forEach(passo => passo.classList.toggle('ativo', Number(passo.dataset.passo) <= numero));
}

function proximaEtapa(numero) {
    if (numero === 2 && !document.getElementById('nome-personagem').value.trim()) {
        mostrarToast('Digite o nome do personagem.');
        return;
    }
    if (numero === 3) {
        const raca = document.getElementById('select-raca').value;
        const classe = document.getElementById('select-classe').value;
        const subclasse = document.getElementById('select-subclasse').value;
        const temSubracas = Object.keys(bancoDnD.racas[raca]?.subracas || {}).length > 0;
        const decisaoSubraca = document.querySelector('input[name="usar-subraca"]:checked')?.value;
        const subraca = document.getElementById('select-subraca').value;
        if (!raca || !classe) {
            mostrarToast('Selecione a raça e a classe.');
            return;
        }
        if (temSubracas && !decisaoSubraca) {
            mostrarToast('Informe se deseja escolher uma sub-raça.');
            return;
        }
        if (decisaoSubraca === 'sim' && !subraca) {
            mostrarToast('Escolha uma sub-raça para continuar.');
            return;
        }
        if (validarNivel() >= ForjaRegras.nivelSubclasse(classe) && !subclasse) {
            mostrarToast('Escolha uma subclasse para continuar.');
            return;
        }
    }
    if (numero === 4) renderizarPericiasDaClasse();
    if (numero === 5 && !validarPericiasDaClasse()) return;
    mostrarEtapa(numero);
    salvarEstado();
}

function carregarSubracas() {
    const racaNome = document.getElementById('select-raca').value;
    const select = document.getElementById('select-subraca');
    const pergunta = document.getElementById('pergunta-subraca');
    const grupo = document.getElementById('grupo-subraca');
    const subracas = bancoDnD.racas[racaNome]?.subracas || {};
    const nomes = Object.keys(subracas);
    select.innerHTML = '<option value="">-- Escolha uma Sub-raça --</option>';
    nomes.forEach(nome => {
        const opcao = document.createElement('option');
        opcao.value = nome;
        opcao.textContent = nome;
        select.appendChild(opcao);
    });
    document.querySelectorAll('input[name="usar-subraca"]').forEach(campo => campo.checked = false);
    pergunta.hidden = nomes.length === 0;
    grupo.hidden = true;
    select.value = '';
}

function alternarEscolhaSubraca() {
    const escolha = document.querySelector('input[name="usar-subraca"]:checked')?.value;
    const grupo = document.getElementById('grupo-subraca');
    grupo.hidden = escolha !== 'sim';
    if (escolha !== 'sim') document.getElementById('select-subraca').value = '';
}

function carregarSubclasses() {
    const classe = document.getElementById('select-classe').value;
    const select = document.getElementById('select-subclasse');
    const anterior = select.value;
    const liberada = validarNivel() >= ForjaRegras.nivelSubclasse(classe);
    select.innerHTML = '';
    const vazio = document.createElement('option'); vazio.value = '';
    vazio.textContent = liberada ? '-- Escolha uma Subclasse --' : 'Escolha no nível ' + ForjaRegras.nivelSubclasse(classe);
    select.appendChild(vazio);
    (bancoDnD.classes[classe]?.subclasses || []).forEach(nome => {
        const opcao = document.createElement('option'); opcao.value = nome; opcao.textContent = nome; select.appendChild(opcao);
    });
    if ([...select.options].some(opcao => opcao.value === anterior)) select.value = anterior;
    select.disabled = !classe || !liberada;
}

function atualizarResumoAntecedente() {
    const nome = document.getElementById('select-antecedente').value;
    const resumo = document.getElementById('resumo-antecedente');
    const dados = bancoDnD.antecedentes?.[nome];
    if (!dados) {
        resumo.hidden = true;
        resumo.innerHTML = '';
        return;
    }
    const pericias = Array.isArray(dados.pericias) ? dados.pericias.join(', ') : 'Nenhuma';
    const ferramentas = Array.isArray(dados.ferramentas) && dados.ferramentas.length ? dados.ferramentas.join(', ') : 'Nenhuma';
    resumo.innerHTML = '<strong>Benefícios do antecedente</strong>' +
        '<span><b>Perícias:</b> ' + escaparHtml(pericias) + '</span>' +
        '<span><b>Ferramentas:</b> ' + escaparHtml(ferramentas) + '</span>' +
        '<span><b>Habilidade:</b> ' + escaparHtml(dados.habilidade || 'Não informada') + '</span>';
    resumo.hidden = false;
    salvarEstado();
}

function formatarNomeAntecedente(nome) {
    return ({ 'Artisao da Guilda': 'Artesão da Guilda', 'Orfao': 'Órfão' })[nome] || nome;
}

function escaparHtml(valor) {
    return String(valor).replace(/[&<>"']/g, caractere => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[caractere]);
}

function validarNivel() {
    const campo = document.getElementById('nivel-personagem');
    const nivel = Math.min(20, Math.max(1, parseInt(campo?.value, 10) || 1));
    if (campo) campo.value = nivel;
    return nivel;
}

function obterBonusProficiencia() {
    return 2 + Math.floor((validarNivel() - 1) / 4);
}

function niveisIncrementoDaClasse(classe) {
    return NIVEIS_INCREMENTO_POR_CLASSE[classe] || NIVEIS_INCREMENTO_POR_CLASSE.padrao;
}

function obterIncrementosPendentes() {
    const classe = document.getElementById('select-classe')?.value || personagemAtual.classe;
    const nivel = validarNivel();
    const resolvidos = new Set(progressosResolvidos.filter(item => item.classe === classe || !item.classe).map(item => item.nivel));
    return niveisIncrementoDaClasse(classe).filter(nivelIncremento => nivelIncremento <= nivel && !resolvidos.has(nivelIncremento));
}

function renderizarNotificacoesNivel() {
    const nivel = validarNivel();
    const pendentes = obterIncrementosPendentes();
    const displayAcao = document.getElementById('display-nivel-acao');
    const badge = document.getElementById('badge-notificacoes-nivel');
    const lista = document.getElementById('lista-notificacoes-nivel');
    const resumo = document.getElementById('resumo-notificacoes-nivel');
    if (displayAcao) displayAcao.textContent = nivel;
    if (!badge || !lista || !resumo) return;

    badge.textContent = pendentes.length;
    badge.hidden = pendentes.length === 0;
    resumo.textContent = pendentes.length
        ? pendentes.length + (pendentes.length === 1 ? ' melhoria pendente' : ' melhorias pendentes')
        : 'Tudo em dia';
    lista.innerHTML = '';

    if (!pendentes.length) {
        const vazio = document.createElement('div');
        vazio.className = 'notificacao-nivel-vazia';
        vazio.innerHTML = '<span>✓</span><div><strong>Nenhuma melhoria pendente</strong><small>Novas opções aparecerão conforme o nível aumentar.</small></div>';
        lista.appendChild(vazio);
        return;
    }

    pendentes.forEach(nivelPendente => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'item-notificacao-nivel';
        botao.innerHTML = '<span class="icone-notificacao-nivel">!</span><div><strong>Melhoria do ' +
            nivelPendente + 'º nível</strong><small>Escolha um talento ou melhore suas habilidades.</small></div><b>›</b>';
        botao.onclick = () => abrirModalProgressao(nivelPendente);
        lista.appendChild(botao);
    });
}

function alternarNotificacoesNivel() {
    const painel = document.getElementById('painel-notificacoes-nivel');
    const botao = document.getElementById('btn-notificacoes-nivel');
    const abrir = painel.hidden;
    painel.hidden = !abrir;
    botao.setAttribute('aria-expanded', String(abrir));
    if (abrir) renderizarNotificacoesNivel();
}

function abrirModalNivel() {
    if (detalhesFicha.opcoes.multiclasse) { ForjaInterface.editar(6); return; }
    document.getElementById('novo-nivel-personagem').value = validarNivel();
    atualizarSubclasseNivelModal();
    document.getElementById('modal-nivel').style.display = 'flex';
}

function fecharModalNivel() {
    document.getElementById('modal-nivel').style.display = 'none';
}

function ajustarNivelModal(delta) {
    const campo = document.getElementById('novo-nivel-personagem');
    campo.value = ForjaRegras.nivel((parseInt(campo.value, 10) || 1) + delta);
    atualizarSubclasseNivelModal();
}

function salvarNovoNivel(evento) {
    evento.preventDefault();
    const novoNivel = ForjaRegras.nivel(document.getElementById('novo-nivel-personagem').value);
    const classe = document.getElementById('select-classe').value;
    const subclasse = document.getElementById('nova-subclasse-personagem').value;
    if (novoNivel >= ForjaRegras.nivelSubclasse(classe) && !subclasse) {
        mostrarToast('Escolha a subclasse para este nível.');
        return;
    }
    document.getElementById('nivel-personagem').value = novoNivel;
    carregarSubclasses();
    document.getElementById('select-subclasse').value = subclasse;
    fecharModalNivel();
    iniciarPersonagem(true);
    mostrarToast('Personagem atualizado para o nível ' + novoNivel + '.', 'sucesso');
}

function preencherSelectAtributosProgressao() {
    ['incremento-atributo-1', 'incremento-atributo-2'].forEach(id => {
        const select = document.getElementById(id);
        const anterior = select.value;
        select.innerHTML = '';
        Object.entries(ATRIBUTOS_PROGRESSAO).forEach(([sigla, nome]) => {
            const valor = valorAtributoParaMelhoria(sigla);
            const opcao = document.createElement('option');
            opcao.value = sigla;
            opcao.textContent = nome + ' (' + valor + ')';
            select.appendChild(opcao);
        });
        if ([...select.options].some(opcao => opcao.value === anterior)) select.value = anterior;
    });
    if (!document.getElementById('incremento-atributo-2').value ||
        document.getElementById('incremento-atributo-2').value === document.getElementById('incremento-atributo-1').value) {
        document.getElementById('incremento-atributo-2').selectedIndex = 1;
    }
    renderizarCardsAtributosProgressao();
}

function criarCardAtributo(sigla, selecionado, desabilitado, aoSelecionar) {
    const valor = valorAtributoParaMelhoria(sigla);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card-atributo' + (selecionado ? ' selecionado' : '');
    card.disabled = desabilitado;
    card.dataset.atributo = sigla;
    card.setAttribute('role', 'option');
    card.setAttribute('aria-selected', String(selecionado));
    card.innerHTML = '<strong>' + ATRIBUTOS_PROGRESSAO[sigla] + '</strong><small>Valor atual: ' + valor +
        (desabilitado ? ' · indisponível' : '') + '</small><span class="marcador-card-atributo">' +
        (selecionado ? '✓' : '') + '</span>';
    card.onclick = aoSelecionar;
    return card;
}

function renderizarCardsAtributosProgressao() {
    const modo = document.querySelector('input[name="modo-incremento"]:checked')?.value || 'dois';
    const primeiro = document.getElementById('incremento-atributo-1');
    const segundo = document.getElementById('incremento-atributo-2');

    const quantidadePrimeiro = modo === 'dois' ? 2 : 1;
    const valorPrimeiro = valorAtributoParaMelhoria(primeiro.value);
    if (valorPrimeiro + quantidadePrimeiro > 20) {
        const alternativa = Array.from(primeiro.options).find(opcao => {
            const valor = valorAtributoParaMelhoria(opcao.value);
            return valor + quantidadePrimeiro <= 20;
        });
        if (alternativa) primeiro.value = alternativa.value;
    }

    if (modo === 'um-um') {
        const valorSegundo = valorAtributoParaMelhoria(segundo.value);
        if (primeiro.value === segundo.value || valorSegundo >= 20) {
            const alternativa = Array.from(segundo.options).find(opcao => {
                const valor = valorAtributoParaMelhoria(opcao.value);
                return opcao.value !== primeiro.value && valor < 20;
            });
            if (alternativa) segundo.value = alternativa.value;
        }
    }

    [
        { select: primeiro, container: document.getElementById('cards-incremento-atributo-1'), segundo: false },
        { select: segundo, container: document.getElementById('cards-incremento-atributo-2'), segundo: true }
    ].forEach(grupo => {
        if (!grupo.container) return;
        grupo.container.innerHTML = '';
        Object.keys(ATRIBUTOS_PROGRESSAO).forEach(sigla => {
            const valor = valorAtributoParaMelhoria(sigla);
            const quantidade = modo === 'dois' && !grupo.segundo ? 2 : 1;
            const repetido = modo === 'um-um' && grupo.segundo && sigla === primeiro.value;
            const desabilitado = valor + quantidade > 20 || repetido;
            grupo.container.appendChild(criarCardAtributo(
                sigla,
                grupo.select.value === sigla,
                desabilitado,
                () => selecionarAtributoProgressao(grupo.select.id, sigla)
            ));
        });
    });
}

function selecionarAtributoProgressao(idSelect, sigla) {
    const select = document.getElementById(idSelect);
    if (!select || ![...select.options].some(opcao => opcao.value === sigla)) return;
    select.value = sigla;
    renderizarCardsAtributosProgressao();
    atualizarPreviaIncremento();
}

function abrirModalProgressao(nivel) {
    document.getElementById('painel-notificacoes-nivel').hidden = true;
    document.getElementById('btn-notificacoes-nivel').setAttribute('aria-expanded', 'false');
    document.getElementById('subtitulo-modal-progressao').textContent = 'Melhoria disponível no ' + nivel + 'º nível.';
    document.getElementById('form-progressao').reset();
    document.getElementById('nivel-progressao-atual').value = nivel;
    document.getElementById('tipo-progressao').value = 'atributos';
    document.querySelectorAll('.card-escolha-progressao').forEach(card =>
        card.classList.toggle('selecionado', card.dataset.escolha === 'atributos')
    );
    preencherSelectAtributosProgressao();
    document.getElementById('talento-selecionado').value = '';
    document.getElementById('busca-talento').value = '';
    document.getElementById('resumo-talento-selecionado').hidden = true;
    document.getElementById('bonus-atributo-talento').hidden = true;
    renderizarCardsTalentos();
    selecionarTipoProgressao('atributos');
    atualizarCamposIncremento();
    document.getElementById('modal-progressao').style.display = 'flex';
}

function fecharModalProgressao() {
    document.getElementById('modal-progressao').style.display = 'none';
}

function selecionarTipoProgressao(tipo, botao = null) {
    document.getElementById('tipo-progressao').value = tipo;
    document.querySelectorAll('.card-escolha-progressao').forEach(card =>
        card.classList.toggle('selecionado', card === botao || (!botao && card.dataset.escolha === tipo))
    );
    document.getElementById('painel-progressao-atributos').hidden = tipo !== 'atributos';
    document.getElementById('painel-progressao-talento').hidden = tipo !== 'talento';
}

function atualizarCamposIncremento() {
    const modo = document.querySelector('input[name="modo-incremento"]:checked')?.value || 'dois';
    document.getElementById('grupo-incremento-atributo-2').hidden = modo !== 'um-um';
    renderizarCardsAtributosProgressao();
    atualizarPreviaIncremento();
}

function atualizarPreviaIncremento() {
    const modo = document.querySelector('input[name="modo-incremento"]:checked')?.value || 'dois';
    const primeiro = document.getElementById('incremento-atributo-1').value;
    const segundo = document.getElementById('incremento-atributo-2').value;
    const previa = document.getElementById('previa-incremento');
    previa.textContent = modo === 'dois'
        ? ATRIBUTOS_PROGRESSAO[primeiro] + ' receberá +2.'
        : ATRIBUTOS_PROGRESSAO[primeiro] + ' e ' + ATRIBUTOS_PROGRESSAO[segundo] + ' receberão +1 cada.';
}

function aplicarIncrementosAtributos() {
    const modo = document.querySelector('input[name="modo-incremento"]:checked')?.value || 'dois';
    const primeiro = document.getElementById('incremento-atributo-1').value;
    const segundo = document.getElementById('incremento-atributo-2').value;
    const incrementos = modo === 'dois' ? { [primeiro]: 2 } : { [primeiro]: 1, [segundo]: 1 };
    if (modo === 'um-um' && primeiro === segundo) {
        mostrarToast('Escolha duas habilidades diferentes.', 'aviso');
        return null;
    }
    for (const [sigla, quantidade] of Object.entries(incrementos)) {
        const atual = valorAtributoParaMelhoria(sigla);
        if (atual + quantidade > 20) {
            mostrarToast(ATRIBUTOS_PROGRESSAO[sigla] + ' não pode ultrapassar 20.', 'aviso');
            return null;
        }
    }
    return incrementos;
}

function salvarProgressao(evento) {
    evento.preventDefault();
    const nivel = parseInt(document.getElementById('nivel-progressao-atual').value, 10);
    const classe = document.getElementById('select-classe').value || personagemAtual.classe;
    if (!obterIncrementosPendentes().includes(nivel)) {
        mostrarToast('Esta melhoria já foi resolvida.', 'aviso');
        fecharModalProgressao();
        return;
    }

    const tipo = document.getElementById('tipo-progressao').value;
    if (tipo === 'atributos') {
        const incrementos = aplicarIncrementosAtributos();
        if (!incrementos) return;
        progressosResolvidos.push({ nivel, classe, tipo: 'atributos', incrementos });
        fecharModalProgressao();
        iniciarPersonagem(true);
        mostrarToast('Valores de habilidade atualizados.', 'sucesso');
        return;
    }

    const talento = document.getElementById('talento-selecionado').value;
    const dadosTalento = typeof talentos !== 'undefined' ? talentos?.[talento] : null;
    if (!talento || !dadosTalento) {
        mostrarToast('Não foi possível carregar esse talento do banco de talentos.', 'aviso');
        return;
    }
    if (!ForjaInterface.podeRepetirTalento(talento)) {
        mostrarToast('Este talento já foi escolhido.', 'aviso');
        return;
    }
    const bonusAtributo = obterBonusAtributoTalento(talento);
    if (bonusAtributo === false) return;
    let escolhas;
    try { escolhas = ForjaInterface.obterEscolhasTalento(talento); }
    catch (erro) { mostrarToast(erro.message); return; }
    const descricaoBonus = bonusAtributo
        ? ' Bônus aplicado: +' + bonusAtributo.quantidade + ' em ' + ATRIBUTOS_PROGRESSAO[bonusAtributo.sigla] + '.'
        : '';
    tracosPersonagem.push({
        id: 'talento-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
        nome: talento,
        talentoId: ForjaRegras.talentoId({ nome: talento }),
        tipo: 'talento',
        descricao: obterResumoTalento(talento) + descricaoBonus + ' Escolhido como melhoria do ' + nivel + 'º nível.' +
            (dadosTalento.preRequisitos ? ' Possui pré-requisitos que devem ser conferidos.' : ''),
        bonusAtributo,
        escolhas,
        fonteTalento: 'talentos_phb.js',
        bloqueado: false,
        expandido: false,
        progressaoNivel: nivel,
        progressaoClasse: classe
    });
    progressosResolvidos.push({ nivel, classe, tipo: 'talento', talento, bonusAtributo });
    fecharModalProgressao();
    iniciarPersonagem(true);
    mostrarToast('Talento adicionado aos traços do personagem.', 'sucesso');
}

function configuracaoPericiasClasse() {
    const classe = document.getElementById('select-classe').value;
    const config = PERICIAS_POR_CLASSE[classe] || { quantidade: 0, opcoes: [] };
    return {
        quantidade: config.quantidade,
        opcoes: config.todas ? Object.keys(bancoDnD.pericias) : config.opcoes.filter(nome => nome in bancoDnD.pericias)
    };
}

function renderizarPericiasDaClasse() {
    const container = document.getElementById('lista-pericias-criacao');
    if (!container) return;
    const classe = document.getElementById('select-classe').value;
    const config = configuracaoPericiasClasse();
    const anteriores = new Set(obterPericiasSelecionadas());
    container.innerHTML = '';
    document.getElementById('instrucao-pericias').textContent = classe
        ? `Você pode escolher ${config.quantidade} perícia${config.quantidade > 1 ? 's' : ''} que combinam com seu treinamento como ${classe}.`
        : 'Selecione uma classe na etapa anterior.';
    document.getElementById('limite-pericias').textContent = config.quantidade;

    config.opcoes.forEach(nome => {
        const label = document.createElement('label');
        label.className = 'opcao-pericia';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = nome;
        input.checked = anteriores.has(nome);
        const texto = document.createElement('span');
        texto.textContent = nome;
        label.append(input, texto);
        label.classList.toggle('selecionada', input.checked);
        input.addEventListener('change', () => {
            const selecionadas = obterPericiasSelecionadas();
            if (input.checked && selecionadas.length > config.quantidade) {
                input.checked = false;
                mostrarToast('Você pode escolher somente ' + config.quantidade + ' perícia(s) para esta classe.');
            }
            label.classList.toggle('selecionada', input.checked);
            atualizarContadorPericias();
            salvarEstado();
        });
        container.appendChild(label);
    });
    atualizarContadorPericias();
}

function obterPericiasSelecionadas() {
    return Array.from(document.querySelectorAll('#lista-pericias-criacao input:checked')).map(input => input.value);
}

function atualizarContadorPericias() {
    const contador = document.getElementById('contador-pericias');
    if (contador) contador.textContent = obterPericiasSelecionadas().length;
}

function validarPericiasDaClasse(restaurando = false) {
    const config = configuracaoPericiasClasse();
    const quantidade = obterPericiasSelecionadas().length;
    if (quantidade !== config.quantidade) {
        document.getElementById('ficha-completa').style.display = 'none';
        document.getElementById('criacao-rapida').style.display = 'block';
        mostrarEtapa(4);
        if (!restaurando) mostrarToast('Escolha exatamente ' + config.quantidade + ' perícia(s) da sua classe.');
        return false;
    }
    return true;
}

function aplicarPericiasDaClasse() {
    const fontes = ForjaRegras.fontesPericias(contextoDaFicha(), bancoDnD);
    Object.keys(bancoDnD.pericias).forEach(nome => {
        const campo = document.getElementById('prof-' + nome);
        campo.checked = fontes[nome].length > 0;
        campo.disabled = fontes[nome].some(origem => origem !== 'Manual');
    });
}



function listarArmasBanco(incluirPersonalizadas = true) {
    const armas = [{nome:'Ataque Desarmado',dano:'1 concussão',tipoDano:'concussão',atributoPadrao:'forca',categoria:'simples',tipo:'corpo-a-corpo',alcance:'1,5 m'}];
    Object.values(bancoDnD.equipamentos?.armas || {}).forEach(lista => lista.forEach(arma => armas.push(arma)));
    if (incluirPersonalizadas) {
        inventarioPersonagem
            .filter(item => item.personalizado && item.tipoPersonalizado === 'arma')
            .forEach(item => armas.push({ nome: item.nome, ...(item.dadosPersonalizados || {}), personalizada: true }));
    }
    return armas;
}

function obterArmaBanco(nome) {
    return listarArmasBanco().find(arma => arma.nome === nome);
}

function abrirModalAtaque() {
    const modal = document.getElementById('modal-ataque');
    const select = document.getElementById('ataque-arma');
    const nomesInventario = ['Ataque Desarmado', ...new Set(inventarioPersonagem.map(item => item.nome))];
    const armasDisponiveis = listarArmasBanco().filter(arma => nomesInventario.includes(arma.nome));

    document.getElementById('form-ataque').reset();
    select.innerHTML = '<option value="">-- Escolha uma Arma --</option>';
    armasDisponiveis.forEach(arma => {
        const opcao = document.createElement('option');
        opcao.value = arma.nome;
        opcao.textContent = arma.nome;
        select.appendChild(opcao);
    });

    const semArmas = armasDisponiveis.length === 0;
    document.getElementById('aviso-sem-armas').hidden = !semArmas;
    document.getElementById('btn-salvar-ataque').disabled = semArmas;
    document.getElementById('grupo-atributo-ataque').hidden = true;
    document.getElementById('grupo-versatil-ataque').hidden = true;
    document.getElementById('previa-ataque').hidden = true;
    modal.style.display = 'flex';
}

function fecharModalAtaque() {
    document.getElementById('modal-ataque').style.display = 'none';
    document.getElementById('form-ataque').reset();
}

function atualizarOpcoesAtaque() {
    const arma = obterArmaBanco(document.getElementById('ataque-arma').value);
    const grupoAtributo = document.getElementById('grupo-atributo-ataque');
    const grupoVersatil = document.getElementById('grupo-versatil-ataque');
    const selectAtributo = document.getElementById('ataque-atributo');

    if (!arma) {
        grupoAtributo.hidden = true;
        grupoVersatil.hidden = true;
        document.getElementById('previa-ataque').hidden = true;
        return;
    }

    selectAtributo.value = arma.atributoPadrao;
    grupoAtributo.hidden = !arma.acuidade;
    grupoVersatil.hidden = !arma.versatil;
    if (!arma.versatil) {
        const umaMao = document.querySelector('input[name="modo-versatil"][value="uma"]');
        if (umaMao) umaMao.checked = true;
    }
    atualizarPreviaAtaque();
}

function obterModificadorAtaque(atributo) {
    const ids = { forca: 'for', destreza: 'des' };
    return parseInt(document.getElementById('mod-' + ids[atributo])?.innerText, 10) || 0;
}



function personagemProficienteNaArma(arma) {
    return ForjaRegras.proficienteNaArma(arma, ForjaRegras.proficiencias(contextoDaFicha(), bancoDnD).arma);
}

function calcularDadosAtaque(configuracao) {
    const arma = obterArmaBanco(configuracao.nomeArma);
    if (!arma) return null;
    const atributo = arma.acuidade ? configuracao.atributo : arma.atributoPadrao;
    const contexto = { ...contextoDaFicha(), inventario: inventarioPersonagem };
    const eq = equipamentoAtivo();
    const calc = ForjaCampanha.ataque(contexto, bancoDnD, { ...arma, modalidade: arma.tipo === 'distancia' ? 'distancia' : 'corpo', pesada: /pesada/i.test(arma.propriedades || '') },
        { ...configuracao, atributo: ({ forca:'for',destreza:'des' })[atributo] || 'auto', furia: detalhesFicha.sessao.furia && eq.armadura?.subtipo !== 'pesada', armadura: eq.armadura, escudo: eq.escudo });
    return { arma, atributo, modificador: calc.bonus, proficiente: calc.proficiente, bonusAtaque: calc.ataque,
        dano: calc.dano + ' ' + (arma.tipoDano || '') + (calc.furtivo ? ' + ' + calc.furtivo : ''), duasMaos: configuracao.duasMaos };
}

function atualizarPreviaAtaque() {
    const nomeArma = document.getElementById('ataque-arma').value;
    const arma = obterArmaBanco(nomeArma);
    const previa = document.getElementById('previa-ataque');
    if (!arma) {
        previa.hidden = true;
        return;
    }
    const atributo = arma.acuidade ? document.getElementById('ataque-atributo').value : arma.atributoPadrao;
    const duasMaos = arma.versatil && document.querySelector('input[name="modo-versatil"]:checked')?.value === 'duas';
    const calculo = calcularDadosAtaque({ nomeArma, atributo, duasMaos });
    previa.innerHTML = '<strong>Prévia</strong>' +
        '<span><b>Atributo:</b> ' + (atributo === 'forca' ? 'Força' : 'Destreza') + '</span>' +
        '<span><b>Proficiência:</b> ' + (calculo.proficiente ? 'Sim' : 'Não') + '</span>' +
        '<span><b>Bônus de ataque:</b> ' + formatarBonus(calculo.bonusAtaque) + '</span>' +
        '<span><b>Dano:</b> ' + calculo.dano + '</span>';
    previa.hidden = false;
}

function salvarAtaque(evento) {
    evento.preventDefault();
    const nomeArma = document.getElementById('ataque-arma').value;
    const arma = obterArmaBanco(nomeArma);
    if (!arma || !inventarioPersonagem.some(item => item.nome === nomeArma)) {
        mostrarToast('Escolha uma arma que esteja no inventário.');
        return;
    }
    const atributo = arma.acuidade ? document.getElementById('ataque-atributo').value : arma.atributoPadrao;
    const duasMaos = arma.versatil && document.querySelector('input[name="modo-versatil"]:checked')?.value === 'duas';
    ataquesPersonagem.push({
        id: 'ataque-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
        nomeArma,
        atributo,
        duasMaos
    });
    fecharModalAtaque();
    renderizarAtaques();
    salvarEstado();
    mostrarToast('Ataque adicionado.', 'sucesso');
}

function formatarBonus(valor) {
    return valor >= 0 ? '+' + valor : String(valor);
}

function renderizarAtaques() {
    const lista = document.getElementById('lista-ataques');
    if (!lista) return;
    lista.innerHTML = '';
    // Ataques antigos continuam registrados mesmo se o item sair da mochila.

    if (!ataquesPersonagem.length) {
        lista.innerHTML = '<em class="texto-vazio">Nenhum ataque adicionado.</em>';
        return;
    }

    ataquesPersonagem.forEach((ataque, indice) => {
        const calculo = calcularDadosAtaque(ataque);
        if (!calculo) return;
        const linha = document.createElement('div');
        linha.className = 'item-ataque';
        const nome = document.createElement('strong');
        nome.textContent = ataque.nomeArma + (calculo.duasMaos ? ' (2 mãos)' : '');
        const bonus = document.createElement('span');
        bonus.className = 'bonus-ataque';
        bonus.textContent = formatarBonus(calculo.bonusAtaque);
        bonus.title = calculo.proficiente ? 'Modificador do atributo + bônus de proficiência' : 'Somente modificador do atributo';
        const dano = document.createElement('span');
        dano.className = 'dano-ataque';
        dano.textContent = calculo.dano;
        const remover = document.createElement('button');
        remover.type = 'button';
        remover.className = 'btn-remover-ataque';
        remover.title = 'Remover ataque';
        remover.setAttribute('aria-label', 'Remover ataque ' + ataque.nomeArma);
        remover.textContent = '×';
        remover.addEventListener('click', () => removerAtaque(indice));
        if (!inventarioPersonagem.some(x => x.nome === ataque.nomeArma) && ataque.nomeArma !== 'Ataque Desarmado') { nome.textContent += ' (item indisponível)'; }
        linha.append(nome, bonus, dano, remover);
        lista.appendChild(linha);
    });
}

function removerAtaque(indice) {
    ataquesPersonagem.splice(indice, 1);
    renderizarAtaques();
    salvarEstado();
}


const ROTULOS_TIPO_TRACO = {
    racial: 'Racial',
    antecedente: 'Antecedente',
    classe: 'Classe',
    talento: 'Talento'
};

function abrirModalTraco(id = '') {
    const modal = document.getElementById('modal-traco');
    const titulo = document.getElementById('titulo-modal-traco');
    const campoId = document.getElementById('traco-id');
    const traco = id ? tracosPersonagem.find(item => item.id === id) : null;

    if (traco?.bloqueado) {
        mostrarToast('Destranque esta habilidade antes de editá-la.');
        return;
    }

    document.getElementById('form-traco').reset();
    campoId.value = traco?.id || '';
    document.getElementById('traco-nome').value = traco?.nome || '';
    document.getElementById('traco-tipo').value = traco?.tipo || '';
    document.getElementById('traco-tipo').disabled = !!traco?.talentoId;
    document.getElementById('traco-descricao').value = traco?.descricao || '';
    titulo.textContent = traco ? 'Editar traço ou característica' : 'Adicionar traço ou característica';
    const botaoExcluir = document.getElementById('btn-excluir-traco-modal');
    botaoExcluir.hidden = !traco;
    botaoExcluir.dataset.confirmando = 'nao';
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.classList.remove('confirmando');
    modal.style.display = 'flex';
    document.getElementById('traco-nome').focus();
}

function fecharModalTraco() {
    document.getElementById('modal-traco').style.display = 'none';
    document.getElementById('form-traco').reset();
    document.getElementById('traco-tipo').disabled = false;
    document.getElementById('traco-id').value = '';
    const botaoExcluir = document.getElementById('btn-excluir-traco-modal');
    if (botaoExcluir) {
        botaoExcluir.hidden = true;
        botaoExcluir.dataset.confirmando = 'nao';
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.remove('confirmando');
    }
}

function excluirTracoAtual() {
    const id = document.getElementById('traco-id').value;
    const traco = tracosPersonagem.find(item => item.id === id);
    if (!traco || traco.bloqueado) {
        mostrarToast('Este traço não pode ser excluído.', 'aviso');
        return;
    }
    const botao = document.getElementById('btn-excluir-traco-modal');
    if (botao.dataset.confirmando !== 'sim') {
        botao.dataset.confirmando = 'sim';
        botao.textContent = 'Confirmar exclusão';
        botao.classList.add('confirmando');
        return;
    }
    tracosPersonagem = tracosPersonagem.filter(item => item.id !== id);
    if (traco.progressaoNivel) {
        progressosResolvidos = progressosResolvidos.filter(item =>
            !(item.nivel === traco.progressaoNivel && item.tipo === 'talento')
        );
    }
    fecharModalTraco();
    recalcularFicha();
    salvarEstado();
    mostrarToast('Traço excluído.', 'sucesso');
}

function salvarTraco(evento) {
    evento.preventDefault();
    const id = document.getElementById('traco-id').value;
    const nome = document.getElementById('traco-nome').value.trim();
    const tipo = document.getElementById('traco-tipo').value;
    const descricao = document.getElementById('traco-descricao').value.trim();

    if (!nome || !tipo || !descricao) {
        mostrarToast('Preencha nome, tipo e descrição.');
        return;
    }

    if (id) {
        const traco = tracosPersonagem.find(item => item.id === id);
        if (!traco || traco.bloqueado) {
            mostrarToast('Esta habilidade está trancada e não pode ser editada.');
            fecharModalTraco();
            return;
        }
        Object.assign(traco, { nome, tipo, descricao });
        mostrarToast('Habilidade atualizada.', 'sucesso');
    } else {
        tracosPersonagem.push({
            id: 'traco-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
            nome,
            tipo,
            descricao,
            bloqueado: false,
            expandido: false
        });
        mostrarToast('Habilidade adicionada.', 'sucesso');
    }

    fecharModalTraco();
    recalcularFicha();
    salvarEstado();
}

function obterTracosAutomaticos() {
    const automaticos = [];
    const racaNome = document.getElementById('select-raca')?.value || personagemAtual.raca;
    const subracaNome = document.getElementById('select-subraca')?.value || personagemAtual.subraca;
    const antecedenteNome = document.getElementById('select-antecedente')?.value || personagemAtual.antecedente;
    const raca = bancoDnD.racas?.[racaNome];

    const adicionarCaracteristicas = (origem, prefixo) => {
        if (!origem) return;
        const descricoes = origem.descricoesCaracteristicas || {};
        (origem.caracteristicas || []).forEach((nome, indice) => {
            automaticos.push({
                id: 'automatico-racial-' + prefixo + '-' + indice,
                nome,
                tipo: 'racial',
                descricao: descricoes[nome] || 'Descrição não cadastrada no banco.',
                bloqueado: true,
                automatico: true,
                expandido: tracosAutomaticosExpandidos.has('automatico-racial-' + prefixo + '-' + indice)
            });
        });
    };

    adicionarCaracteristicas(raca, normalizarIdTraco(racaNome));
    if (subracaNome && raca?.subracas?.[subracaNome]) {
        adicionarCaracteristicas(raca.subracas[subracaNome], normalizarIdTraco(racaNome + '-' + subracaNome));
    }

    const antecedente = bancoDnD.antecedentes?.[antecedenteNome];
    if (antecedente?.habilidade) {
        const id = 'automatico-antecedente-' + normalizarIdTraco(antecedenteNome);
        automaticos.push({
            id,
            nome: antecedente.habilidade,
            tipo: 'antecedente',
            descricao: antecedente.descricaoHabilidade || 'Descrição não cadastrada no banco.',
            bloqueado: true,
            automatico: true,
            expandido: tracosAutomaticosExpandidos.has(id)
        });
    }

    return automaticos;
}

function normalizarIdTraco(valor) {
    return String(valor || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
}

function todosOsTracos() {
    return [...obterTracosAutomaticos(), ...tracosPersonagem];
}

function renderizarTracos() {
    const lista = document.getElementById('lista-tracos');
    if (!lista) return;
    const todos = todosOsTracos();
    const visiveis = todos.filter(item => filtroTracosAtual === 'todos' || item.tipo === filtroTracosAtual);
    lista.innerHTML = '';

    if (!visiveis.length) {
        const vazio = document.createElement('em');
        vazio.className = 'texto-vazio';
        vazio.textContent = todos.length ? 'Nenhuma habilidade encontrada neste filtro.' : 'Nenhum traço ou característica adicionado.';
        lista.appendChild(vazio);
        return;
    }

    visiveis.forEach(traco => {
        const item = document.createElement('article');
        item.className = 'item-traco' + (traco.expandido ? ' expandido' : '') + (traco.bloqueado ? ' bloqueado' : '') + (traco.automatico ? ' automatico' : '');
        item.dataset.id = traco.id;

        const cabecalho = document.createElement('div');
        cabecalho.className = 'item-traco-cabecalho';
        cabecalho.setAttribute('role', 'button');
        cabecalho.setAttribute('tabindex', '0');
        cabecalho.setAttribute('aria-expanded', String(Boolean(traco.expandido)));
        cabecalho.addEventListener('click', () => alternarTraco(traco.id));
        cabecalho.addEventListener('keydown', evento => {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                alternarTraco(traco.id);
            }
        });

        const nome = document.createElement('strong');
        nome.textContent = traco.nome;

        const acoes = document.createElement('div');
        acoes.className = 'acoes-traco';

        const editar = document.createElement('button');
        editar.type = 'button';
        editar.className = 'btn-acao-traco btn-editar-traco';
        editar.title = traco.automatico ? 'Habilidade automática' : (traco.bloqueado ? 'Habilidade trancada' : 'Editar habilidade');
        editar.setAttribute('aria-label', editar.title);
        editar.textContent = '✎';
        editar.disabled = traco.bloqueado;
        editar.addEventListener('click', evento => {
            evento.stopPropagation();
            abrirModalTraco(traco.id);
        });

        const bloquear = document.createElement('button');
        bloquear.type = 'button';
        bloquear.className = 'btn-acao-traco btn-bloquear-traco';
        bloquear.title = traco.automatico ? 'Habilidade automática protegida' : (traco.bloqueado ? 'Destrancar habilidade' : 'Trancar habilidade');
        bloquear.setAttribute('aria-label', bloquear.title);
        bloquear.textContent = traco.bloqueado ? '🔒' : '🔓';
        bloquear.classList.toggle('automatico', Boolean(traco.automatico));
        bloquear.addEventListener('click', evento => {
            evento.stopPropagation();
            alternarBloqueioTraco(traco.id);
        });

        const seta = document.createElement('span');
        seta.className = 'seta-traco';
        seta.textContent = '⌄';

        acoes.append(editar, bloquear);
        cabecalho.append(nome, acoes, seta);

        const detalhes = document.createElement('div');
        detalhes.className = 'detalhes-traco';
        const tipo = document.createElement('span');
        tipo.className = 'etiqueta-traco tipo-' + traco.tipo;
        tipo.textContent = ROTULOS_TIPO_TRACO[traco.tipo] || traco.tipo;
        if (traco.automatico) {
            const origemAutomatica = document.createElement('span');
            origemAutomatica.className = 'etiqueta-automatica';
            origemAutomatica.textContent = 'Automática';
            detalhes.append(tipo, origemAutomatica);
        } else {
            detalhes.append(tipo);
        }
        const descricao = document.createElement('p');
        descricao.textContent = traco.descricao;
        detalhes.append(descricao);

        item.append(cabecalho, detalhes);
        lista.appendChild(item);
    });
}

function alternarTraco(id) {
    const tracoManual = tracosPersonagem.find(item => item.id === id);
    if (tracoManual) {
        tracoManual.expandido = !tracoManual.expandido;
        renderizarTracos();
        salvarEstado();
        return;
    }
    const automatico = obterTracosAutomaticos().find(item => item.id === id);
    if (!automatico) return;
    if (tracosAutomaticosExpandidos.has(id)) tracosAutomaticosExpandidos.delete(id);
    else tracosAutomaticosExpandidos.add(id);
    renderizarTracos();
}

function alternarBloqueioTraco(id) {
    if (id.startsWith('automatico-')) {
        mostrarToast('Habilidades automáticas são protegidas e acompanham a origem do personagem.');
        return;
    }
    const traco = tracosPersonagem.find(item => item.id === id);
    if (!traco) return;
    traco.bloqueado = !traco.bloqueado;
    renderizarTracos();
    salvarEstado();
    mostrarToast(traco.bloqueado ? 'Habilidade trancada.' : 'Habilidade destrancada.', 'sucesso');
}

function alternarMenuFiltroTracos() {
    const menu = document.getElementById('menu-filtro-tracos');
    menu.hidden = !menu.hidden;
}

function filtrarTracos(tipo, botao) {
    filtroTracosAtual = tipo;
    document.querySelectorAll('#menu-filtro-tracos button').forEach(item => item.classList.toggle('ativo', item === botao));
    document.getElementById('menu-filtro-tracos').hidden = true;
    renderizarTracos();
}


let temporizadorToast;

function mostrarToast(mensagem, tipo = 'aviso') {
    let toast = document.getElementById('toast-notificacao');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notificacao';
        toast.className = 'toast-notificacao';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML = '<span class="toast-icone" aria-hidden="true">!</span><span class="toast-mensagem"></span><button class="toast-fechar" type="button" aria-label="Fechar notificação">&times;</button>';
        document.body.appendChild(toast);
        toast.querySelector('.toast-fechar').addEventListener('click', fecharToast);
    }

    clearTimeout(temporizadorToast);
    toast.className = 'toast-notificacao ' + tipo;
    toast.querySelector('.toast-mensagem').textContent = mensagem;
    requestAnimationFrame(() => toast.classList.add('visivel'));
    temporizadorToast = setTimeout(fecharToast, 3500);
}

function fecharToast() {
    const toast = document.getElementById('toast-notificacao');
    if (!toast) return;
    clearTimeout(temporizadorToast);
    toast.classList.remove('visivel');
}

// A interface fornece entradas; o motor não consulta nem modifica elementos HTML.
function contextoDaFicha() {
    const valor = id => document.getElementById(id)?.value || '';
    const atributos = Object.fromEntries(Object.keys(ForjaRegras.ATRIBUTOS).map(sigla =>
        [sigla, Math.min(20, Math.max(1, ForjaRegras.inteiro(valor('attr-' + sigla), 10)))]));
    return {
        nome: valor('nome-personagem').trim(), nivel: ForjaRegras.nivel(valor('nivel-personagem')),
        raca: valor('select-raca'),
        subraca: document.querySelector('input[name="usar-subraca"]:checked')?.value === 'sim' ? valor('select-subraca') : '',
        classe: valor('select-classe'), subclasse: valor('select-subclasse'),
        alinhamento: valor('select-alinhamento'), antecedente: valor('select-antecedente'),
        atributos, detalhes: detalhesFicha, tracos: tracosPersonagem, progressosResolvidos,
        periciasClasse: obterPericiasSelecionadas(), periciasManuais, especializacoes,
        proficienciasAdicionais, percepcaoSituacao
    };
}

function capturarEstado() {
    const contexto = contextoDaFicha();
    return {
        ...contexto, schemaVersion: ForjaEstado.VERSION, ruleset: 'ldj-2014-patrulheiro-revisado',
        usarSubraca: document.querySelector('input[name="usar-subraca"]:checked')?.value || '',
        inventario: inventarioPersonagem, ataques: ataquesPersonagem,
        recursos: recursosPersonagem, equipamento: equipamentoPersonagem,
        tracosAutomaticosExpandidos: [...tracosAutomaticosExpandidos],
        fichaGerada: document.getElementById('ficha-completa').style.display === 'block'
    };
}

function recalcularFicha() {
    const suspensoAntes = restaurandoEstado;
    restaurandoEstado = true;
    try {
        const contexto = contextoDaFicha();
        Object.entries(contexto.atributos).forEach(([sigla, valor]) => document.getElementById('attr-' + sigla).value = valor);
        calcularAtributos(contexto.raca, contexto.subraca);
        calcularCombate(contexto.raca, contexto.classe);
        calcularSalvaguardas(contexto.classe);
        calcularTodasPericias();
        atualizarInventario();
        renderizarAtaques();
        renderizarTracos();
        renderizarNotificacoesNivel();
        ForjaInterface.renderizar();
    } finally { restaurandoEstado = suspensoAntes; }
    salvarEstado();
}

function alterarPericiaManual(nome, marcada) {
    if (marcada) periciasManuais[nome] = true;
    else delete periciasManuais[nome];
    calcularTodasPericias();
}

function alterarSituacaoPercepcao(situacao) {
    percepcaoSituacao = ['normal', 'vantagem', 'desvantagem'].includes(situacao) ? situacao : 'normal';
    atualizarPercepcaoEProficiencias();
    salvarEstado();
}

function novoId(prefixo) {
    return prefixo + '-' + (typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2));
}

function equipamentoAtivo() {
    const localizar = id => {
        const item = inventarioPersonagem.find(item => item.id === id);
        return item ? localizarArmadura(item.nome) : null;
    };
    return { armadura: localizar(equipamentoPersonagem.armadura), escudo: localizar(equipamentoPersonagem.escudo) };
}

function botaoEquipamento(item, indice) {
    const armadura = localizarArmadura(item.nome);
    if (!armadura) return '';
    const tipo = armadura.subtipo === 'escudo' ? 'escudo' : 'armadura';
    const usando = equipamentoPersonagem[tipo] === item.id;
    const acao = usando ? (tipo === 'escudo' ? 'Guardar' : 'Tirar') : (tipo === 'escudo' ? 'Empunhar' : 'Vestir');
    return '<button class="btn-equipar" type="button" aria-pressed="' + usando + '" aria-label="' + acao + ' ' + escaparHtml(item.nome) +
        '" onclick="alternarEquipamento(' + indice + ')">' + acao + '</button>';
}

function alternarEquipamento(indice) {
    const item = inventarioPersonagem[indice];
    const armadura = item && localizarArmadura(item.nome);
    if (!armadura) return;
    const tipo = armadura.subtipo === 'escudo' ? 'escudo' : 'armadura';
    equipamentoPersonagem[tipo] = equipamentoPersonagem[tipo] === item.id ? null : item.id;
    atualizarInventario();
}

function valorAtributoParaMelhoria(sigla) {
    const contexto = contextoDaFicha();
    const valor = ForjaRegras.atributos(contexto, bancoDnD).valores[sigla];
    return valor - (contexto.classe === 'Bárbaro' && contexto.nivel === 20 && ['for', 'con'].includes(sigla) ? 4 : 0);
}

function atualizarSubclasseNivelModal() {
    const classe = document.getElementById('select-classe').value;
    const n = ForjaRegras.nivel(document.getElementById('novo-nivel-personagem').value);
    const select = document.getElementById('nova-subclasse-personagem');
    const anterior = select.value || document.getElementById('select-subclasse').value;
    select.innerHTML = '<option value="">-- Escolha uma Subclasse --</option>';
    (bancoDnD.classes[classe]?.subclasses || []).forEach(nome => {
        const opcao = document.createElement('option'); opcao.value = nome; opcao.textContent = nome; select.appendChild(opcao);
    });
    if ([...select.options].some(opcao => opcao.value === anterior)) select.value = anterior;
    select.disabled = n < ForjaRegras.nivelSubclasse(classe);
    document.getElementById('ajuda-subclasse-nivel').textContent = select.disabled
        ? 'A escolha fica disponível no nível ' + ForjaRegras.nivelSubclasse(classe) + '.'
        : 'Escolha a subclasse para continuar.';
}

function atualizarDisplayPV() {
    document.getElementById('display-hp-atual').textContent = recursosPersonagem.pvAtual;
    document.getElementById('display-hp-temporarios').textContent = recursosPersonagem.pvTemporarios;
}

function preencherEdicaoPV() {
    document.getElementById('pv-atual-edicao').value = recursosPersonagem.pvAtual;
    document.getElementById('pv-atual-edicao').max = document.getElementById('display-hp-max').textContent;
    document.getElementById('pv-temporario-edicao').value = recursosPersonagem.pvTemporarios;
}

function abrirModalPV() {
    focoAnteriorPV = document.activeElement;
    preencherEdicaoPV();
    document.getElementById('quantidade-pv').value = 1;
    document.getElementById('modal-pv').style.display = 'flex';
    document.getElementById('pv-atual-edicao').focus();
}

function fecharModalPV() {
    document.getElementById('modal-pv').style.display = 'none';
    focoAnteriorPV?.focus();
}

function lerEdicaoPV() {
    const atual = Number(document.getElementById('pv-atual-edicao').value);
    const temporarios = Number(document.getElementById('pv-temporario-edicao').value);
    const maximo = Number(document.getElementById('display-hp-max').textContent);
    if (!Number.isInteger(atual) || atual < 0 || atual > maximo || !Number.isInteger(temporarios) || temporarios < 0 || temporarios > 1000000) {
        mostrarToast('Informe PV atuais entre 0 e o máximo e PV temporários não negativos.');
        return null;
    }
    return { ...recursosPersonagem, pvAtual: atual, pvTemporarios: temporarios };
}

function salvarPV(evento) {
    evento.preventDefault();
    const recursos = lerEdicaoPV();
    if (!recursos) return;
    recursosPersonagem = recursos;
    ForjaInterface.aposPV();
    atualizarDisplayPV(); salvarEstado(); fecharModalPV();
}

function alterarPV(tipo) {
    if (tipo === 'cura' && detalhesFicha.sessao.morte.morto) { mostrarToast('Cura comum não revive um personagem morto.'); return; }
    const recursos = lerEdicaoPV();
    const quantidade = Number(document.getElementById('quantidade-pv').value);
    if (!recursos || !Number.isInteger(quantidade) || quantidade < 1 || quantidade > 1000000) {
        mostrarToast('Informe uma quantidade inteira e positiva de dano ou cura.');
        return;
    }
    if (tipo === 'dano') ForjaInterface.aoSofrerDano(quantidade, recursos);
    recursosPersonagem = tipo === 'dano' ? ForjaRegras.aplicarDano(recursos, quantidade)
        : ForjaInterface.registrarCura(quantidade, recursos);
    ForjaInterface.aposPV();
    atualizarDisplayPV(); preencherEdicaoPV(); salvarEstado();
}

function configurarDialogoPV() {
    const modal = document.getElementById('modal-pv');
    modal.addEventListener('keydown', evento => {
        if (evento.key === 'Escape') { evento.preventDefault(); fecharModalPV(); }
        if (evento.key !== 'Tab') return;
        const campos = [...modal.querySelectorAll('button, input, select, textarea, summary')].filter(campo => !campo.disabled);
        const primeiro = campos[0], ultimo = campos[campos.length - 1];
        if (evento.shiftKey && document.activeElement === primeiro) { evento.preventDefault(); ultimo.focus(); }
        else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primeiro.focus(); }
    });
}

function avisarFalhaSalvamento(mensagem) {
    document.getElementById('mensagem-salvamento').textContent = mensagem;
    document.getElementById('alerta-salvamento').hidden = false;
}

function tentarSalvarNovamente() {
    salvamentoBloqueado = false;
    salvarEstado();
}

function baixarCopiaDaFicha() {
    const copia = { estadoDaTela: capturarEstado(), dadosSalvos: {} };
    try {
        [ForjaEstado.CHAVE, ForjaEstado.LEGADO, ForjaEstado.BACKUP].forEach(chave => copia.dadosSalvos[chave] = window.localStorage.getItem(chave));
    } catch (_) { copia.armazenamentoIndisponivel = true; }
    const url = URL.createObjectURL(new Blob([JSON.stringify(copia, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'forja-copia-de-recuperacao.json';
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function recuperarCopiaDaFicha() {
    try {
        const storage = window.localStorage;
        storage.setItem(ForjaEstado.CHAVE + '.sessao.' + Date.now(), JSON.stringify(capturarEstado()));
        ForjaEstado.recuperar(storage, bancoDnD);
        window.location.reload();
    } catch (erro) { avisarFalhaSalvamento('Não foi possível recuperar a ficha. ' + erro.message); }
}
