// ===== Cursor Glow Effect =====
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth follow with lerp
    function animate() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    // Hide on mobile
    if ('ontouchstart' in window) {
        glow.style.display = 'none';
    }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    const staggerContainers = document.querySelectorAll('[data-animate-children]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || '0');
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach((el, i) => {
        if (!el.dataset.delay) {
            el.dataset.delay = i * 100;
        }
        observer.observe(el);
    });

    // Stagger children
    const childObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger each child
                Array.from(entry.target.children).forEach((child, i) => {
                    child.style.transitionDelay = (i * 0.08) + 's';
                });
                childObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });

    staggerContainers.forEach(el => childObserver.observe(el));
}

// ===== Hero Typing Animation =====
function initTypingAnimation() {
    const el = document.querySelector('.hero-typed');
    if (!el) return;

    const text = el.dataset.text || '';
    el.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            // Variable speed for natural feel
            const char = text.charAt(i - 1);
            const delay = char === ' ' ? 60 : (70 + Math.random() * 50);
            setTimeout(type, delay);
        }
    }

    setTimeout(type, 800);
}

// ===== Work Row Hover Dimming =====
function initWorkHoverDimming() {
    const rows = document.querySelectorAll('.dim-row');
    if (!rows.length) return;

    const workSection = rows[0].closest('.work-timeline') || rows[0].parentElement;

    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            rows.forEach(r => {
                if (r !== row) r.classList.add('dimmed-effect');
            });
        });

        row.addEventListener('mouseleave', () => {
            rows.forEach(r => r.classList.remove('dimmed-effect'));
        });
    });
}

// ===== Magnetic Hover on Tags =====
function initMagneticElements() {
    const tags = document.querySelectorAll('.hero-tag');

    tags.forEach(tag => {
        tag.addEventListener('mousemove', (e) => {
            const rect = tag.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            tag.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== Smooth Scroll (Lenis) =====
function initLenis() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// ===== Nav Active State =====
function initNavActive() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.main-nav a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (
            (href === './' && (path === '/' || path.endsWith('/index.html') || path.endsWith('/index'))) ||
            (href === './blog' && (path.includes('blog')))
        ) {
            link.classList.add('active');
        }
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initScrollAnimations();
    initTypingAnimation();
    initWorkHoverDimming();
    initMagneticElements();
    initLenis();
    initNavActive();
});
