document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌓' : '☀️';
    themeToggle.addEventListener('click', () => {
        const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeToggle.textContent = next === 'dark' ? '🌓' : '☀️';
    });

    // Reveal on scroll
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('active'); revealObs.unobserve(e.target); }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // Skill bars animate on scroll
    const barObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.skill-progress').forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
                barObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-category').forEach(cat => barObs.observe(cat));

    // Typewriter
    const el = document.getElementById('typewriter');
    const roles = [
        "Strategic Generative AI Leader",
        "AI Transformation Leader",
        "Analytics & Data Science Leader",
        "Agentic AI Architect"
    ];
    let ri = 0, ci = 0, del = false, speed = 100;
    function type() {
        const cur = roles[ri];
        el.textContent = del ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
        del ? ci-- : ci++;
        speed = del ? 50 : 100;
        if (!del && ci === cur.length) { del = true; speed = 2200; }
        else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; speed = 500; }
        setTimeout(type, speed);
    }
    type();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            const target = document.querySelector(id);
            if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });

});
