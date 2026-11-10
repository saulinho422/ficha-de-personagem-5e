const ForjaTransicoes = (() => {
    let animacaoAtual = null;
    let tweensAtivos = [];
    const movimentoReduzido = window.matchMedia?.('(prefers-reduced-motion: reduce)');

    function encerrarTween(item) {
        item?.tween?.kill?.();
        if (item?.alvos?.length && typeof window.gsap !== 'undefined') {
            window.gsap.set(item.alvos, { clearProps: 'transform,opacity' });
        }
    }

    function limparTweens() {
        const ativos = tweensAtivos;
        tweensAtivos = [];
        ativos.forEach(encerrarTween);
    }

    function limparAlvos(alvos) {
        const alvosSet = new Set(alvos);
        const manter = [];
        for (const item of tweensAtivos) {
            if (item.alvos.some(alvo => alvosSet.has(alvo))) encerrarTween(item);
            else manter.push(item);
        }
        tweensAtivos = manter;
    }

    function registrarTween(alvos, tween) {
        if (!tween) return;
        const registro = { alvos, tween };
        tweensAtivos.push(registro);
        tween.eventCallback?.('onComplete', () => {
            tweensAtivos = tweensAtivos.filter(item => item !== registro);
        });
    }

    function limpar() {
        const anterior = animacaoAtual;
        animacaoAtual = null;
        anterior?.cancel();
        limparTweens();
    }

    function staggerCards(container) {
        if (!container || movimentoReduzido?.matches || typeof window.gsap === 'undefined') return;
        const filhos = [...(container.children || [])].filter(el => !el.hidden);
        if (!filhos.length) return;
        limparAlvos(filhos);
        const tween = window.gsap.fromTo(
            filhos,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.24, stagger: 0.03, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
        registrarTween(filhos, tween);
    }

    function animarDialogo(dialogo) {
        if (!dialogo || movimentoReduzido?.matches || typeof window.gsap === 'undefined') return;
        limparAlvos([dialogo]);
        const tween = window.gsap.fromTo(
            dialogo,
            { opacity: 0.4, y: 12 },
            { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out', clearProps: 'transform,opacity' }
        );
        registrarTween([dialogo], tween);
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
    return { mostrar, limpar, staggerCards, animarDialogo };
})();
