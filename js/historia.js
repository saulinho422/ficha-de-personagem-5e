const ForjaHistoria = (() => {
    'use strict';
    function criar({ contexto, detalhes, campos, el, campo, botao, midia, salvar,
        tabelasPersonalidade, sugerirFisico }) {
        let destino;
        const fisicos = ['idade', 'altura', 'peso', 'olhos', 'pele', 'cabelos'];
        const personalidade = ['tracos', 'ideais', 'vinculos', 'defeitos'];
        const visiveis = [...fisicos, 'aparencia', ...personalidade, 'historia', 'aliados'];

        function preencher() {
            if (!destino) return;
            for (const chave of visiveis) {
                const entrada = destino.querySelector('#forja-historia-' + chave);
                if (entrada && entrada !== document.activeElement) {
                    entrada.value = detalhes().historia[chave] || '';
                }
            }
            midia.preencher();
        }

        function entrada(chave) {
            const longo = !fisicos.includes(chave);
            return campo(campos()[chave], 'forja-historia-' + chave,
                detalhes().historia[chave] || '', valor => {
                    detalhes().historia[chave] = valor;
                    salvar();
                }, { area: longo, maxlength: longo ? 60000 : 120,
                    ...(longo ? { rows: chave === 'historia' ? 7 : 4 } : {}) });
        }

        function sugerir(chave) {
            const antecedente = contexto().antecedente;
            const base = bancoDnD.antecedentes[antecedente]?.varianteDe || antecedente;
            const lista = ForjaAuxiliares.antecedentes[base]?.[chave] || [];
            if (!lista.length) throw Error('Esse antecedente permite texto livre.');
            const resultados = [...lista].sort(() => Math.random() - .5)
                .slice(0, chave === 'tracos' ? 2 : 1);
            const historia = detalhes().historia;
            historia[chave] = (historia[chave] ? historia[chave] + '\n' : '') + resultados.join('\n');
            preencher();
            salvar();
            window.mostrarToast('Sugestão acrescentada a ' + campos()[chave].toLowerCase() + '.', 'sucesso');
        }

        function bugiganga() {
            const indice = Math.floor(Math.random() * 100);
            const texto = String(indice + 1).padStart(2, '0') + ' — ' + ForjaAventura.bugigangas[indice];
            const historia = detalhes().historia;
            historia.tesouro = (historia.tesouro ? historia.tesouro + '\n' : '') + texto;
            salvar();
            window.mostrarToast('Bugiganga registrada: ' + texto, 'sucesso');
        }

        function sugestoes() {
            const acoes = el('div', { class: 'forja-sugestoes-acoes' });
            for (const chave of personalidade) {
                acoes.append(botao('Sugerir ' + campos()[chave].toLowerCase(), () => sugerir(chave)));
            }
            acoes.append(botao('Escolher nas tabelas', tabelasPersonalidade),
                botao('Sugerir altura e peso', sugerirFisico));
            if (typeof ForjaAventura !== 'undefined') acoes.append(botao('Rolar bugiganga (d100)', bugiganga));
            return el('section', { class: 'forja-sugestoes' },
                el('h3', {}, 'Inspiração do antecedente'),
                el('p', { class: 'forja-nota' }, 'Acrescente ideias à sua história. Seus textos continuam editáveis.'), acoes);
        }

        function montar(root) {
            destino = root;
            root.replaceChildren(
                el('section', { class: 'forja-historia-fisico', 'aria-label': 'Características físicas' },
                    ...fisicos.map(entrada)),
                el('section', { class: 'forja-historia-aparencia' }, midia.controle('retrato'), entrada('aparencia')),
                sugestoes(),
                el('section', { class: 'forja-historia-personalidade', 'aria-label': 'Personalidade' },
                    ...personalidade.map(entrada)),
                el('section', { class: 'forja-historia-narrativa' }, entrada('historia')),
                el('section', { class: 'forja-historia-organizacao' }, midia.controle('simbolo'), entrada('aliados')),
            );
            preencher();
        }
        return { montar, preencher };
    }
    return { criar };
})();
