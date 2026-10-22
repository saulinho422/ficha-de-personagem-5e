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

    // Um dialog modal torna o restante do documento inerte; o aviso acompanha a camada ativa.
    const camada = [...document.querySelectorAll('dialog[open]')].at(-1) || document.body;
    if (toast.parentNode !== camada) camada.appendChild(toast);

    clearTimeout(temporizadorToast);
    toast.className = 'toast-notificacao ' + tipo;
    toast.querySelector('.toast-mensagem').textContent = mensagem;
    toast.querySelector('.toast-icone').textContent = tipo === 'sucesso' ? '✓' : '!';
    requestAnimationFrame(() => toast.classList.add('visivel'));
    temporizadorToast = setTimeout(fecharToast, 3500);
}

function fecharToast() {
    const toast = document.getElementById('toast-notificacao');
    if (!toast) return;
    clearTimeout(temporizadorToast);
    toast.classList.remove('visivel');
}

