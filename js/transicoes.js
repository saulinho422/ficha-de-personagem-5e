const ForjaTransicoes = (() => {
    let animacaoAtual = null;
    const movimentoReduzido = window.matchMedia?.('(prefers-reduced-motion: reduce)');

    function limpar() {
        const anterior = animacaoAtual;
        animacaoAtual = null;
        anterior?.cancel();
    }

    function mostrar(elemento, { direcao = 1 } = {}) {
        limpar();
        if (!elemento?.isConnected || elemento.hidden || movimentoReduzido?.matches ||
            typeof elemento.animate !== 'function') return Promise.resolve(false);

        // A vista já está ativa: animar sem substituir DOM, foco ou estado da ficha.
        let animacao;
        try {
            animacao = elemento.animate([
                { opacity: 0.35, transform: `translateX(${direcao < 0 ? -20 : 20}px)` },
                { opacity: 1, transform: 'translateX(0)' },
            ], { duration: 200, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
        } catch {
            return Promise.resolve(false);
        }
        animacaoAtual = animacao;
        return animacao.finished.then(() => {
            if (animacaoAtual === animacao) animacaoAtual = null;
            animacao.cancel();
            return true;
        }, () => {
            if (animacaoAtual === animacao) animacaoAtual = null;
            return false;
        });
    }

    movimentoReduzido?.addEventListener?.('change', limpar);
    window.addEventListener('beforeprint', limpar);
    window.addEventListener('pagehide', limpar);
    return { mostrar, limpar };
})();
