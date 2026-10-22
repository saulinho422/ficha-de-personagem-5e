(function (raiz, criar) {
  const api = criar();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else raiz.ForjaCriacaoRegras = api;
})(globalThis, function () {
  'use strict';
  const siglas = ['for', 'des', 'con', 'int', 'sab', 'car'];
  const custos = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
  const aleatorio = faces => 1 + Math.floor(Math.random() * faces);

  function inteiro(valor, minimo, maximo) {
    if (!Number.isSafeInteger(valor) || valor < minimo || valor > maximo) {
      throw Error('Valor fora dos limites permitidos.');
    }
    return valor;
  }

  function dadosRolados(quantidade, faces, rolar) {
    return Array.from({ length: quantidade }, () => inteiro(rolar(faces), 1, faces));
  }

  function validarRolagem(rolagem) {
    if (!rolagem || !Array.isArray(rolagem.dados) || rolagem.dados.length !== 4) {
      throw Error('Rolagem de atributos inválida.');
    }
    rolagem.dados.forEach(dado => inteiro(dado, 1, 6));
    inteiro(rolagem.descarte, 0, 3);
    const menor = Math.min(...rolagem.dados);
    const total = rolagem.dados.reduce((soma, dado) => soma + dado, 0) - menor;
    if (rolagem.dados[rolagem.descarte] !== menor || rolagem.total !== total) {
      throw Error('Descarte ou total da rolagem inválido.');
    }
  }

  function rolarAtributo(rolagens, rolar = aleatorio) {
    if (!Array.isArray(rolagens) || rolagens.length >= 6) {
      throw Error('Cada personagem pode rolar seis valores de atributos.');
    }
    rolagens.forEach(validarRolagem);
    const dados = dadosRolados(4, 6, rolar);
    const descarte = dados.indexOf(Math.min(...dados));
    const total = dados.reduce((soma, dado) => soma + dado, 0) - dados[descarte];
    return [...rolagens.map(r => ({ ...r, dados: [...r.dados] })), { dados, descarte, total }];
  }

  function validarValores(valores) {
    if (!Array.isArray(valores) || valores.length !== 6) throw Error('Informe seis valores.');
    valores.forEach(valor => inteiro(valor, 3, 18));
  }

  function validarMapa(atribuicoes) {
    if (!atribuicoes || typeof atribuicoes !== 'object' || Array.isArray(atribuicoes)) {
      throw Error('Distribuição inválida.');
    }
    const indices = Object.values(atribuicoes);
    if (Object.keys(atribuicoes).some(sigla => !siglas.includes(sigla))) {
      throw Error('Atributo inválido.');
    }
    indices.forEach(indice => inteiro(indice, 0, 5));
    if (new Set(indices).size !== indices.length) throw Error('Um resultado foi usado mais de uma vez.');
  }

  function distribuir(valores, atribuicoes, indice, sigla) {
    validarValores(valores);
    validarMapa(atribuicoes);
    inteiro(indice, 0, 5);
    if (!siglas.includes(sigla)) throw Error('Atributo inválido.');
    const novo = { ...atribuicoes };
    const anterior = novo[sigla];
    const ocupado = siglas.find(atributo => novo[atributo] === indice);
    if (ocupado) {
      delete novo[ocupado];
      if (anterior !== undefined) novo[ocupado] = anterior;
    }
    novo[sigla] = indice;
    return novo;
  }

  function validarDistribuicao(valores, atribuicoes) {
    try {
      validarValores(valores);
      validarMapa(atribuicoes);
      return Object.keys(atribuicoes).length === 6;
    } catch {
      return false;
    }
  }

  function valoresDistribuidos(valores, atribuicoes) {
    if (!validarDistribuicao(valores, atribuicoes)) throw Error('Distribua os seis resultados.');
    return Object.fromEntries(siglas.map(sigla => [sigla, valores[atribuicoes[sigla]]]));
  }

  function custoPontos(atributos) {
    if (!atributos || Object.keys(atributos).length !== 6) throw Error('Informe os seis atributos.');
    return siglas.reduce((total, sigla) => total + custos[inteiro(atributos[sigla], 8, 15)], 0);
  }

  function alterarPonto(atributos, sigla, delta) {
    custoPontos(atributos);
    if (!siglas.includes(sigla) || ![-1, 1].includes(delta)) throw Error('Alteração inválida.');
    const novo = { ...atributos, [sigla]: inteiro(atributos[sigla] + delta, 8, 15) };
    if (custoPontos(novo) > 27) throw Error('A distribuição excede os 27 pontos.');
    return novo;
  }

  function ganhosPendentes(classes, banco, ganhosPV = {}) {
    let inicial = true;
    return classes.flatMap(entrada => {
      const dado = banco.classes[entrada.classe]?.dadoVida;
      inteiro(dado, 1, 100);
      inteiro(entrada.nivel, 1, 20);
      return Array.from({ length: entrada.nivel }, (_, indice) => {
        const nivel = indice + 1;
        const chave = entrada.classe + '-' + nivel;
        const primeiro = inicial;
        inicial = false;
        const valor = primeiro ? dado : ganhosPV[chave] ?? null;
        if (valor !== null) inteiro(valor, 1, dado);
        return { chave, classe: entrada.classe, nivel, dado, inicial: primeiro, valor };
      });
    });
  }

  function ganhoPV(dado, modo, rolar = aleatorio) {
    inteiro(dado, 1, 100);
    if (modo === 'media') return Math.floor(dado / 2) + 1;
    if (modo === 'rolagem') return inteiro(rolar(dado), 1, dado);
    throw Error('Escolha média ou rolagem para os pontos de vida.');
  }

  function rolarRiqueza(regra, rolar = aleatorio) {
    if (!Array.isArray(regra) || regra.length !== 2) throw Error('Regra de riqueza inválida.');
    const quantidade = inteiro(regra[0], 1, 100);
    const multiplicador = inteiro(regra[1], 1, 100);
    const dados = dadosRolados(quantidade, 4, rolar);
    return { dados, total: dados.reduce((soma, dado) => soma + dado, 0) * multiplicador };
  }

  function interpretarPV(texto, atual, maximo) {
    inteiro(maximo, 0, 1000000);
    inteiro(atual, 0, maximo);
    if (typeof texto !== 'string' || !/^[+-]?\d+$/.test(texto.trim())) {
      throw Error('Informe um inteiro ou uma alteração como +5 ou -2.');
    }
    const valor = texto.trim();
    const numero = Number(valor);
    if (!Number.isSafeInteger(numero)) throw Error('Quantidade inválida.');
    const resultado = /^[+-]/.test(valor) ? atual + numero : numero;
    return inteiro(resultado, 0, maximo);
  }

  return Object.freeze({ rolarAtributo, distribuir, validarDistribuicao, valoresDistribuidos,
    custoPontos, alterarPonto, ganhosPendentes, ganhoPV, rolarRiqueza, interpretarPV });
});
