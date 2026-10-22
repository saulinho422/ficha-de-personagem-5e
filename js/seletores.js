/* Seletores visuais conservam os controles originais como fonte dos valores. */
const ForjaSeletores = (() => {
    'use strict';
    const registros = new Map();
    let observador;
    const criar = (tag, classe, texto = '') => {
        const n = document.createElement(tag);
        n.className = classe;
        n.textContent = texto;
        return n;
    };
    function rotulo(origem) {
        const explicito = origem.getAttribute('aria-label');
        if (explicito) return explicito;
        const ids = origem.getAttribute('aria-labelledby');
        if (ids) return ids.split(' ').map(id => document.getElementById(id)?.textContent || '').join(' ').trim();
        const label = origem.labels?.[0];
        if (!label) return origem.name || 'Opção';
        const copia = label.cloneNode(true);
        copia.querySelectorAll('select,input,button,textarea,small').forEach(n => n.remove());
        return copia.textContent.trim() || 'Opção';
    }
    function ehPlaceholder(o) {
        return o.value === '' && /^(--|\s*escolha\b)/i.test(o.textContent || '');
    }
    function opcoesSelect(origem) {
        return [...origem.options].filter(o => !o.hidden && !o.closest('optgroup[hidden]') && !ehPlaceholder(o)).map(o => ({
            valor: o.value, texto: o.textContent,
            desabilitada: o.disabled || !!o.closest('optgroup[disabled]')
        }));
    }
    function opcoesEntrada(opcoes) {
        return opcoes.map(o => typeof o === 'string' ? {valor:o, texto:o} : {
            valor: String(o.value ?? o.valor ?? o.nome ?? ''),
            texto: String(o.label ?? o.texto ?? o.nome ?? o.value ?? o.valor ?? ''),
            desabilitada: !!(o.disabled ?? o.desabilitada)
        });
    }
    function sincronizar(registro) {
        const {origem, botao} = registro;
        const nome = rotulo(origem);
        const selecionada = registro.opcoes().find(o => o.valor === origem.value);
        const texto = selecionada?.texto || 'Selecionar';
        const conteudo = nome + ': ' + texto;
        if (botao.textContent !== conteudo) botao.textContent = conteudo;
        const acessivel = 'Escolher ' + conteudo;
        if (botao.getAttribute('aria-label') !== acessivel) botao.setAttribute('aria-label', acessivel);
        if (botao.disabled !== origem.disabled) botao.disabled = origem.disabled;
        if (botao.hidden !== origem.hidden) botao.hidden = origem.hidden;
    }
    function emitir(registro, valor) {
        registro.origem.value = valor;
        registro.origem.dispatchEvent(new Event('input', {bubbles:true}));
        registro.origem.dispatchEvent(new Event('change', {bubbles:true}));
        atualizar();
    }
    function abrir(registro) {
        if (registro.origem.disabled) return;
        const dialogo = criar('dialog', 'forja-seletor-dialogo');
        dialogo.setAttribute('aria-label', rotulo(registro.origem));
        const titulo = criar('h2', '', rotulo(registro.origem));
        const busca = criar('input', 'forja-seletor-busca');
        busca.type = 'search';
        busca.placeholder = 'Buscar opções';
        busca.setAttribute('aria-label', 'Buscar opções');
        const lista = criar('div', 'forja-seletor-lista');
        lista.setAttribute('role', 'listbox');
        lista.setAttribute('aria-label', titulo.textContent);
        const fechar = criar('button', 'btn-secundario', 'Fechar');
        fechar.type = 'button';
        const encerrar = () => {
            if (dialogo.close) dialogo.close();
            dialogo.remove();
            registro.botao.setAttribute('aria-expanded', 'false');
            const retorno = registro.botao.isConnected ? registro.botao : document.getElementById(registro.origem.id)?.nextElementSibling;
            if (retorno?.classList.contains('forja-seletor-botao')) retorno.focus();
        };
        fechar.addEventListener('click', encerrar);
        dialogo.addEventListener('cancel', e => {e.preventDefault(); encerrar();});
        dialogo.addEventListener('keydown', e => {
            if (e.key === 'Escape') {e.preventDefault(); e.stopPropagation(); encerrar(); return;}
            navegar(e, lista, busca);
        });
        const render = () => {
            const termo = busca.value.toLocaleLowerCase('pt-BR');
            lista.replaceChildren();
            registro.opcoes().filter(o => o.texto.toLocaleLowerCase('pt-BR').includes(termo)).forEach(o => {
                const opcao = criar('button', 'forja-seletor-opcao', o.texto);
                opcao.type = 'button';
                opcao.setAttribute('role', 'option');
                opcao.setAttribute('aria-selected', String(o.valor === registro.origem.value));
                opcao.disabled = !!o.desabilitada;
                opcao.addEventListener('click', () => {emitir(registro, o.valor); encerrar();});
                lista.append(opcao);
            });
            if (!lista.children.length) lista.append(criar('p', '', 'Nenhuma opção encontrada.'));
        };
        busca.addEventListener('input', render);
        dialogo.append(titulo, busca, lista, fechar);
        document.body.append(dialogo);
        render();
        registro.botao.setAttribute('aria-expanded', 'true');
        if (dialogo.showModal) dialogo.showModal();
        else dialogo.setAttribute('open', '');
        busca.focus();
    }
    function navegar(e, lista, busca) {
        const botoes = [...lista.querySelectorAll('button:not(:disabled)')];
        if (!botoes.length) return;
        const atual = botoes.indexOf(document.activeElement);
        let indice;
        if (e.key === 'ArrowDown') indice = (atual + 1) % botoes.length;
        if (e.key === 'ArrowUp') indice = atual < 0 ? botoes.length - 1 : (atual + botoes.length - 1) % botoes.length;
        if (e.key === 'Home' && e.target !== busca) indice = 0;
        if (e.key === 'End' && e.target !== busca) indice = botoes.length - 1;
        if (e.key === 'Enter' && e.target === busca) {e.preventDefault(); botoes[0].click();}
        if (indice !== undefined) {e.preventDefault(); botoes[indice].focus();}
    }
    function registrar(origem, opcoes) {
        const existente = registros.get(origem);
        if (existente) {existente.opcoes = opcoes; sincronizar(existente); return;}
        const botao = criar('button', 'forja-seletor-botao');
        botao.type = 'button';
        botao.setAttribute('aria-haspopup', 'dialog');
        botao.setAttribute('aria-expanded', 'false');
        const registro = {origem, botao, opcoes};
        registros.set(origem, registro);
        origem.classList.add('forja-seletor-original');
        origem.tabIndex = -1;
        origem.setAttribute('aria-hidden', 'true');
        origem.after(botao);
        botao.addEventListener('click', () => abrir(registro));
        origem.addEventListener('change', () => sincronizar(registro));
        origem.addEventListener('focus', () => botao.focus());
        origem.labels?.forEach(label => label.addEventListener('click', e => {
            if (e.target.closest('button')) return;
            e.preventDefault();
            botao.focus();
        }));
        sincronizar(registro);
    }
    function atualizar() {
        if (typeof document === 'undefined' || !document.body) return;
        document.querySelectorAll('select:not([multiple]):not([size]):not([data-forja-sem-seletor])').forEach(origem => registrar(origem, () => opcoesSelect(origem)));
        for (const [origem, registro] of registros) {
            if (!origem.isConnected || origem.hasAttribute('data-forja-sem-seletor')) {registro.botao.remove(); registros.delete(origem);}
            else sincronizar(registro);
        }
    }
    function instalar() {
        atualizar();
        if (observador) return;
        observador = new MutationObserver(atualizar);
        observador.observe(document.body, {childList:true, subtree:true, attributes:true,
            attributeFilter:['disabled','hidden','selected','label','value']});
    }
    function entrada(input, opcoes) {
        input.readOnly = true;
        input.removeAttribute('list');
        registrar(input, () => opcoesEntrada(opcoes));
    }
    return {instalar, atualizar, entrada};
})();
