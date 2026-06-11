// ═══════════════════════════════════════════════
// METATECH — script.js
// ═══════════════════════════════════════════════

// ── Navbar: muda aparência ao rolar ──────────────
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Animação de entrada ao rolar (Intersection Observer) ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

// Aplica a todos os cards e seções com a classe fade-in
document.querySelectorAll(
  '.problem-card, .benefit-card, .empathy-card, .solution-item, .stat-card'
).forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ── Adiciona CSS de animação dinamicamente ────────
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// ── Fecha o menu mobile ao clicar em um link ──────
document.querySelectorAll('.nav-link, .btn-primary-brand').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    const collapse = bootstrap.Collapse.getInstance(menu);
    if (collapse) collapse.hide();
  });
});
