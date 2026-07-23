// app.js

let inventarioPersonagem = [];
const CHAVE_FICHA = 'forjaPersonagens.ficha.v2';
let personagemAtual = { raca: '', classe: '' };

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
    document.getElementById('select-classe').addEventListener('change', renderizarPericiasDaClasse);
    document.getElementById('nivel-personagem').addEventListener('change', validarNivel);
    renderizarSalvaguardas();
    renderizarPericias();
    restaurarEstado();
};

function carregarOpcoes() {
    const selectRaca = document.getElementById('select-raca');
    const selectClasse = document.getElementById('select-classe');

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
    for (let nomePericia in bancoDnD.pericias) {
        let atributoBase = bancoDnD.pericias[nomePericia];
        container.innerHTML += `
            <div class="pericia-item">
                <input type="checkbox" id="prof-${nomePericia}" onchange="calcularTodasPericias()">
                <span class="pericia-valor" id="valor-${nomePericia}">+0</span>
                <span>${nomePericia}</span>
                <span class="pericia-attr">(${atributoBase})</span>
            </div>
        `;
    }
}

function iniciarPersonagem(restaurando = false) {
    const nome = document.getElementById('nome-personagem').value.trim();
    const nivel = validarNivel();
    const subraca = document.getElementById('select-subraca').value;
    const raca = document.getElementById('select-raca').value;
    const classe = document.getElementById('select-classe').value;

    if (!nome || raca === "" || classe === "") {
        if (!restaurando) mostrarToast("Preencha o nome e selecione raça e classe.");
        return;
    }
    personagemAtual = { nome, nivel, raca, subraca, classe };

    document.getElementById('criacao-rapida').style.display = 'none';
    document.getElementById('ficha-completa').style.display = 'block';
    document.getElementById('display-nome').innerText = nome;
    document.getElementById('display-raca').innerText = raca;
    document.getElementById('display-subraca').innerText = subraca ? " — " + subraca : "";
    document.getElementById('display-classe').innerText = classe;
    document.getElementById('display-nivel').innerText = nivel;
    document.getElementById('display-proficiencia').innerText = "+" + obterBonusProficiencia();

    calcularAtributos(raca, subraca);
    calcularCombate(raca, classe);
    calcularSalvaguardas(classe);
    if (!validarPericiasDaClasse(restaurando)) return;
    aplicarPericiasDaClasse();
    calcularTodasPericias(); 
    
    // Atualiza o limite máximo de peso com base na Força do personagem
    atualizarInventario(); 
    
    mudarAba('pagina-1');
    salvarEstado();
}

function calcularModificador(valorAtributo) {
    return Math.floor((valorAtributo - 10) / 2);
}

function calcularAtributos(racaEscolhida, subracaEscolhida = '') {
    const raca = bancoDnD.racas[racaEscolhida];
    const bonusRaca = { ...(raca && raca.bonusAtributos ? raca.bonusAtributos : {}) };
    const dadosSubraca = raca && raca.subracas && raca.subracas[subracaEscolhida];
    Object.entries(dadosSubraca?.bonusAtributos || {}).forEach(([attr, bonus]) => bonusRaca[attr] = (bonusRaca[attr] || 0) + bonus);
    const atributosIds = ['for', 'des', 'con', 'int', 'sab', 'car'];
    
    atributosIds.forEach(function(attr) {
        const campo = document.getElementById('attr-' + attr);
        let valorBase = Math.min(20, Math.max(1, parseInt(campo.value, 10) || 10));
        campo.value = valorBase;
        let nomeNoBanco = mapearNomeAtributo(attr);
        let bonus = bonusRaca[nomeNoBanco] || 0; 
        
        let valorFinal = Math.min(20, valorBase + bonus);
        let modificador = calcularModificador(valorFinal);
        let stringModificador = modificador >= 0 ? "+" + modificador : modificador;
        
        document.getElementById('final-' + attr).innerText = valorFinal;
        document.getElementById('mod-' + attr).innerText = stringModificador;
    });
}

function calcularCombate(racaEscolhida, classeEscolhida) {
    const modDes = parseInt(document.getElementById('mod-des').innerText) || 0;
    const modCon = parseInt(document.getElementById('mod-con').innerText) || 0;

    atualizarClasseArmadura();
    document.getElementById('display-iniciativa').innerText = modDes >= 0 ? "+" + modDes : modDes;
    
    const raca = bancoDnD.racas[racaEscolhida];
    document.getElementById('display-deslocamento').innerText = raca && raca.deslocamento ? raca.deslocamento : 9;

    const classe = bancoDnD.classes[classeEscolhida];
    const dadoVidaClasse = classe && classe.dadoVida ? classe.dadoVida : 8;
    const nivel = validarNivel();
    const ganhoMedio = Math.floor(dadoVidaClasse / 2) + 1;
    const hpMax = Math.max(1, dadoVidaClasse + modCon + (nivel - 1) * Math.max(1, ganhoMedio + modCon));
    document.getElementById('display-hp-max').innerText = hpMax;
    document.getElementById('display-hp-atual').innerText = hpMax;
}

function calcularSalvaguardas(classeEscolhida) {
    const classe = bancoDnD.classes[classeEscolhida];
    const proficienciasDaClasse = classe && classe.proficienciasSalvaguarda ? classe.proficienciasSalvaguarda : []; 
    const bonusProficiencia = obterBonusProficiencia(); 
    const atributosIds = ['for', 'des', 'con', 'int', 'sab', 'car'];

    atributosIds.forEach(function(sigla) {
        let nomeNoBanco = mapearNomeAtributo(sigla); 
        let temProficiencia = proficienciasDaClasse.includes(nomeNoBanco);
        
        document.getElementById('salva-' + sigla).checked = temProficiencia;
        let modificadorAtributo = parseInt(document.getElementById('mod-' + sigla).innerText);
        
        let valorFinal = modificadorAtributo + (temProficiencia ? bonusProficiencia : 0);
        document.getElementById('valor-salva-' + sigla).innerText = valorFinal >= 0 ? "+" + valorFinal : valorFinal;
    });
}

function calcularTodasPericias() {
    const bonusProficiencia = obterBonusProficiencia(); 
    for (let nomePericia in bancoDnD.pericias) {
        let atributoBase = bancoDnD.pericias[nomePericia];
        let modificadorAtributo = parseInt(document.getElementById('mod-' + atributoBase).innerText);
        let estaProficiente = document.getElementById('prof-' + nomePericia).checked;
        
        let valorFinal = modificadorAtributo + (estaProficiente ? bonusProficiencia : 0);
        document.getElementById('valor-' + nomePericia).innerText = valorFinal >= 0 ? "+" + valorFinal : valorFinal;
    }
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
    const botoes = document.querySelectorAll('.modal-abas .btn-cat');
    botoes.forEach(b => b.classList.remove('ativa'));
    const correto = botao || Array.from(botoes).find(b =>
        (b.getAttribute('onclick') || '').includes("'" + categoria + "'")
    );
    if (correto) correto.classList.add('ativa');

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
    let pesoNum = 0;
    if (pesoStr && pesoStr !== "-" && pesoStr !== "Variado") {
        let limpo = pesoStr.replace(" kg", "").replace(",", ".");
        pesoNum = parseFloat(limpo) || 0;
    }

    const existente = inventarioPersonagem.find(item => item.nome === nome);
    if (existente) {
        existente.quantidade = (existente.quantidade || 1) + 1;
    } else {
        inventarioPersonagem.push({ nome: nome, peso: pesoNum, pesoOriginal: pesoStr, quantidade: 1 });
    }
    atualizarInventario();
}

function removerDoInventario(index) {
    const item = inventarioPersonagem[index];
    if (item && (item.quantidade || 1) > 1) item.quantidade -= 1;
    else inventarioPersonagem.splice(index, 1);
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
        atualizarClasseArmadura();
        salvarEstado();
        return;
    }

    let pesoTotal = 0;

    inventarioPersonagem.forEach((item, index) => {
        item.quantidade = item.quantidade || 1;
        pesoTotal += item.peso * item.quantidade;
        let div = document.createElement('div');
        div.className = 'item-inventario';
        div.innerHTML = `
            <span>${item.quantidade}× ${item.nome} (${item.pesoOriginal})</span>
            <button class="btn-remover" onclick="removerDoInventario(${index})" title="Remover">&times;</button>
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
    atualizarClasseArmadura();
    salvarEstado();
}

function localizarArmadura(nome) {
    for (const subtipo in bancoDnD.equipamentos.armaduras) {
        const item = bancoDnD.equipamentos.armaduras[subtipo].find(a => a.nome === nome);
        if (item) return { ...item, subtipo };
    }
    return null;
}

function atualizarClasseArmadura() {
    const display = document.getElementById('display-ca');
    const campoDes = document.getElementById('mod-des');
    if (!display || !campoDes) return;
    const modDes = parseInt(campoDes.innerText, 10) || 0;
    let ca = 10 + modDes;
    let bonusEscudo = 0;

    inventarioPersonagem.forEach(itemInventario => {
        const armadura = localizarArmadura(itemInventario.nome);
        if (!armadura) return;
        if (armadura.subtipo === 'escudo') {
            bonusEscudo = 2;
            return;
        }
        const base = parseInt(armadura.ca, 10);
        if (!Number.isFinite(base)) return;
        let caArmadura = base;
        if (armadura.subtipo === 'leve') caArmadura += modDes;
        if (armadura.subtipo === 'media') caArmadura += Math.min(2, modDes);
        ca = Math.max(ca, caArmadura);
    });
    display.innerText = ca + bonusEscudo;
}

function salvarEstado() {
    if (typeof localStorage === 'undefined' || typeof bancoDnD === 'undefined') return;
    const atributos = {};
    ['for', 'des', 'con', 'int', 'sab', 'car'].forEach(attr => {
        atributos[attr] = document.getElementById('attr-' + attr)?.value || 10;
    });
    const pericias = {};
    Object.keys(bancoDnD.pericias).forEach(nome => {
        pericias[nome] = Boolean(document.getElementById('prof-' + nome)?.checked);
    });
    localStorage.setItem(CHAVE_FICHA, JSON.stringify({
        nome: document.getElementById('nome-personagem')?.value || personagemAtual.nome,
        nivel: validarNivel(),
        subraca: document.getElementById('select-subraca')?.value || personagemAtual.subraca,
        raca: document.getElementById('select-raca')?.value || personagemAtual.raca,
        classe: document.getElementById('select-classe')?.value || personagemAtual.classe,
        atributos,
        pericias,
        periciasClasse: obterPericiasSelecionadas(),
        inventario: inventarioPersonagem,
        fichaGerada: document.getElementById('ficha-completa')?.style.display === 'block'
    }));
}

function restaurarEstado() {
    if (typeof localStorage === 'undefined') return;
    let estado;
    try {
        estado = JSON.parse(localStorage.getItem(CHAVE_FICHA));
    } catch (_) {
        localStorage.removeItem(CHAVE_FICHA);
        return;
    }
    if (!estado) return;
    document.getElementById('nome-personagem').value = estado.nome || '';
    document.getElementById('nivel-personagem').value = estado.nivel || 1;
    document.getElementById('select-raca').value = estado.raca || '';
    carregarSubracas();
    document.getElementById('select-subraca').value = estado.subraca || '';
    document.getElementById('select-classe').value = estado.classe || '';
    Object.entries(estado.atributos || {}).forEach(([attr, valor]) => {
        const campo = document.getElementById('attr-' + attr);
        if (campo) campo.value = valor;
    });
    inventarioPersonagem = Array.isArray(estado.inventario) ? estado.inventario : [];
    renderizarPericiasDaClasse();
    (estado.periciasClasse || []).forEach(nome => {
        const campo = document.querySelector('#lista-pericias-criacao input[value="' + CSS.escape(nome) + '"]');
        if (campo) campo.checked = true;
    });
    atualizarContadorPericias();
    Object.entries(estado.pericias || {}).forEach(([nome, marcado]) => {
        const campo = document.getElementById('prof-' + nome);
        if (campo) campo.checked = Boolean(marcado);
    });
    if (estado.fichaGerada && estado.raca && estado.classe) iniciarPersonagem(true);
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
    if (numero === 3 && (!document.getElementById('select-raca').value || !document.getElementById('select-classe').value)) {
        mostrarToast('Selecione a raça e a classe.');
        return;
    }
    if (numero === 4) renderizarPericiasDaClasse();
    mostrarEtapa(numero);
    salvarEstado();
}

function carregarSubracas() {
    const racaNome = document.getElementById('select-raca').value;
    const select = document.getElementById('select-subraca');
    const subracas = bancoDnD.racas[racaNome]?.subracas || {};
    select.innerHTML = '<option value="">-- Sem sub-raça --</option>';
    Object.keys(subracas).forEach(nome => {
        const opcao = document.createElement('option');
        opcao.value = nome;
        opcao.textContent = nome;
        select.appendChild(opcao);
    });
    select.disabled = Object.keys(subracas).length === 0;
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

function editarPersonagem() {
    document.getElementById('ficha-completa').style.display = 'none';
    document.getElementById('criacao-rapida').style.display = 'block';
    mostrarEtapa(1);
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
        ? 'Escolha ' + config.quantidade + ' perícia(s) disponíveis para ' + classe + '.'
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
    const escolhidas = new Set(obterPericiasSelecionadas());
    Object.keys(bancoDnD.pericias).forEach(nome => {
        const campo = document.getElementById('prof-' + nome);
        if (campo) campo.checked = escolhidas.has(nome);
    });
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
