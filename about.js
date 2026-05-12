function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const idx = parseInt(entry.target.dataset.revealIndex || '0', 10);
                setTimeout(() => entry.target.classList.add('is-visible'), idx * 90);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach((el, i) => {
        el.dataset.revealIndex = i;
        io.observe(el);
    });
}

function initActiveNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.site-nav a');
    if (!links.length) return;

    const isWriting = path.includes('blog') || path.includes('problem') || path.includes('utopia') || path.includes('challenges');

    links.forEach(link => {
        link.classList.remove('is-active');
        const href = link.getAttribute('href') || '';
        if (href.includes('blog') && isWriting) link.classList.add('is-active');
        if ((href === './' || href === '/' || href.endsWith('index.html')) && !isWriting) link.classList.add('is-active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initActiveNav();
});
