// app.js

let inventarioPersonagem = [];
let ataquesPersonagem = [];
let tracosPersonagem = [];
let tracosAutomaticosExpandidos = new Set();
let filtroTracosAtual = 'todos';
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
    document.querySelectorAll('input[name="usar-subraca"]').forEach(campo => campo.addEventListener('change', alternarEscolhaSubraca));
    document.getElementById('select-classe').addEventListener('change', () => {
        carregarSubclasses();
        renderizarPericiasDaClasse();
    });
    document.getElementById('select-antecedente').addEventListener('change', atualizarResumoAntecedente);
    document.getElementById('nivel-personagem').addEventListener('change', validarNivel);
    renderizarSalvaguardas();
    renderizarPericias();
    renderizarTracos();
    renderizarAtaques();
    restaurarEstado();
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
        opcao.value = antecedente; opcao.text = antecedente;
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
    const subraca = document.querySelector('input[name="usar-subraca"]:checked')?.value === 'sim'
        ? document.getElementById('select-subraca').value : '';
    const raca = document.getElementById('select-raca').value;
    const classe = document.getElementById('select-classe').value;
    const subclasse = document.getElementById('select-subclasse').value;
    const alinhamento = document.getElementById('select-alinhamento').value;
    const antecedente = document.getElementById('select-antecedente').value;

    if (!nome || !raca || !classe || !subclasse || !alinhamento || !antecedente) {
        if (!restaurando) mostrarToast("Conclua todas as escolhas antes de gerar a ficha.");
        return;
    }
    personagemAtual = { nome, nivel, raca, subraca, classe, subclasse, alinhamento, antecedente };

    document.getElementById('criacao-rapida').style.display = 'none';
    document.getElementById('ficha-completa').style.display = 'block';
    document.getElementById('display-nome').innerText = nome;
    document.getElementById('display-origem').innerText = subraca || raca;
    document.getElementById('display-classe').innerText = classe;
    document.getElementById('display-subclasse').innerText = subclasse;
    document.getElementById('display-alinhamento').innerText = alinhamento;
    document.getElementById('display-antecedente').innerText = antecedente;
    document.getElementById('display-nivel').innerText = nivel;
    document.getElementById('display-proficiencia').innerText = "+" + obterBonusProficiencia();

    calcularAtributos(raca, subraca);
    calcularCombate(raca, classe);
    calcularSalvaguardas(classe);
    if (!validarPericiasDaClasse(restaurando)) return;
    aplicarPericiasDaClasse();
    calcularTodasPericias();
    renderizarTracos();
    renderizarAtaques();
    
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
    let pesoNum = 0;
    if (pesoStr && pesoStr !== "-" && pesoStr !== "Variado") {
        let limpo = pesoStr.replace(" kg", "").replace(",", ".");
        pesoNum = parseFloat(limpo) || 0;
    }

    const existente = inventarioPersonagem.find(item => item.nome === nome && !item.personalizado);
    if (existente) {
        existente.quantidade = (existente.quantidade || 1) + 1;
    } else {
        inventarioPersonagem.push({ nome: nome, peso: pesoNum, pesoOriginal: pesoStr, quantidade: 1 });
    }
    atualizarInventario();
    mostrarToast(nome + ' foi adicionado ao inventário.', 'sucesso');
}

function atualizarCamposItemPersonalizado() {
    const tipo = document.getElementById('item-personalizado-tipo')?.value || 'comum';
    ['arma', 'armadura', 'pocao'].forEach(nome => {
        const bloco = document.getElementById('campos-personalizado-' + nome);
        if (bloco) bloco.hidden = tipo !== nome;
    });
    atualizarCamposRolagemPocao();
}

function atualizarCamposRolagemPocao() {
    const campos = document.getElementById('campos-rolagem-pocao');
    const marcado = document.getElementById('pocao-personalizada-tem-rolagem')?.checked;
    if (campos) campos.hidden = !marcado;
}

function limparFormularioItemPersonalizado() {
    document.getElementById('form-item-personalizado')?.reset();
    atualizarCamposItemPersonalizado();
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
        atualizarClasseArmadura();
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
        if (armadura.subtipo === 'leve' || armadura.subtipo === 'personalizada-destreza') caArmadura += modDes;
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
        subraca: document.querySelector('input[name="usar-subraca"]:checked')?.value === 'sim' ? (document.getElementById('select-subraca')?.value || '') : '',
        usarSubraca: document.querySelector('input[name="usar-subraca"]:checked')?.value || '',
        raca: document.getElementById('select-raca')?.value || personagemAtual.raca,
        classe: document.getElementById('select-classe')?.value || personagemAtual.classe,
        subclasse: document.getElementById('select-subclasse')?.value || personagemAtual.subclasse,
        alinhamento: document.getElementById('select-alinhamento')?.value || personagemAtual.alinhamento,
        antecedente: document.getElementById('select-antecedente')?.value || personagemAtual.antecedente,
        atributos,
        pericias,
        periciasClasse: obterPericiasSelecionadas(),
        inventario: inventarioPersonagem,
        ataques: ataquesPersonagem,
        tracos: tracosPersonagem,
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
    const escolhaSubraca = estado.usarSubraca || (estado.subraca ? 'sim' : 'nao');
    const radioSubraca = document.querySelector('input[name="usar-subraca"][value="' + escolhaSubraca + '"]');
    if (radioSubraca) radioSubraca.checked = true;
    alternarEscolhaSubraca();
    document.getElementById('select-subraca').value = estado.subraca || '';
    document.getElementById('select-classe').value = estado.classe || '';
    carregarSubclasses();
    document.getElementById('select-subclasse').value = estado.subclasse || '';
    document.getElementById('select-alinhamento').value = estado.alinhamento || '';
    document.getElementById('select-antecedente').value = estado.antecedente || '';
    atualizarResumoAntecedente();
    Object.entries(estado.atributos || {}).forEach(([attr, valor]) => {
        const campo = document.getElementById('attr-' + attr);
        if (campo) campo.value = valor;
    });
    inventarioPersonagem = Array.isArray(estado.inventario) ? estado.inventario : [];
    ataquesPersonagem = Array.isArray(estado.ataques) ? estado.ataques : [];
    tracosPersonagem = Array.isArray(estado.tracos) ? estado.tracos : [];
    renderizarTracos();
    renderizarAtaques();
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
        if (!subclasse) {
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
    const subclasses = bancoDnD.classes[classe]?.subclasses || [];
    select.innerHTML = '<option value="">-- Escolha uma Subclasse --</option>';
    subclasses.forEach(nome => {
        const opcao = document.createElement('option');
        opcao.value = nome;
        opcao.textContent = nome;
        select.appendChild(opcao);
    });
    select.disabled = subclasses.length === 0;
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
    const antecedenteNome = document.getElementById('select-antecedente').value;
    const periciasAntecedente = bancoDnD.antecedentes?.[antecedenteNome]?.pericias || [];
    periciasAntecedente.forEach(nome => escolhidas.add(nome));
    Object.keys(bancoDnD.pericias).forEach(nome => {
        const campo = document.getElementById('prof-' + nome);
        if (campo) campo.checked = escolhidas.has(nome);
    });
}



function listarArmasBanco(incluirPersonalizadas = true) {
    const armas = [];
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
    const nomesInventario = [...new Set(inventarioPersonagem.map(item => item.nome))];
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

function singularizarProficiencia(valor) {
    const normalizado = String(valor || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const alias = { 'bastoes': 'bordao', 'bordoes': 'bordao' };
    if (alias[normalizado]) return alias[normalizado];
    return normalizado.split(/\s+/).map(palavra => palavra.endsWith('s') ? palavra.slice(0, -1) : palavra).join(' ');
}

function personagemProficienteNaArma(arma) {
    const classeNome = document.getElementById('select-classe')?.value || personagemAtual.classe;
    const proficiencias = bancoDnD.classes?.[classeNome]?.proficienciasArmasArmaduras || [];
    if (proficiencias.includes(arma.categoria === 'simples' ? 'Armas simples' : 'Armas marciais')) return true;
    const nomeArma = singularizarProficiencia(arma.nome);
    return proficiencias.some(item => singularizarProficiencia(item) === nomeArma);
}

function calcularDadosAtaque(configuracao) {
    const arma = obterArmaBanco(configuracao.nomeArma);
    if (!arma) return null;
    const atributo = arma.acuidade ? configuracao.atributo : arma.atributoPadrao;
    const modificador = obterModificadorAtaque(atributo);
    const proficiente = personagemProficienteNaArma(arma);
    const bonusAtaque = modificador + (proficiente ? obterBonusProficiencia() : 0);
    const duasMaos = arma.versatil && configuracao.duasMaos;
    const dadoBase = duasMaos ? arma.danoVersatil : (String(arma.dano || '').match(/\d+d\d+/)?.[0] || null);
    const dano = dadoBase && arma.tipoDano
        ? dadoBase + (modificador >= 0 ? ' + ' + modificador : ' - ' + Math.abs(modificador)) + ' ' + arma.tipoDano
        : '—';
    return { arma, atributo, modificador, proficiente, bonusAtaque, dano, duasMaos };
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
    ataquesPersonagem = ataquesPersonagem.filter(ataque => obterArmaBanco(ataque.nomeArma) && inventarioPersonagem.some(item => item.nome === ataque.nomeArma));

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
    document.getElementById('traco-descricao').value = traco?.descricao || '';
    titulo.textContent = traco ? 'Editar traço ou característica' : 'Adicionar traço ou característica';
    modal.style.display = 'flex';
    document.getElementById('traco-nome').focus();
}

function fecharModalTraco() {
    document.getElementById('modal-traco').style.display = 'none';
    document.getElementById('form-traco').reset();
    document.getElementById('traco-id').value = '';
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
    renderizarTracos();
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
