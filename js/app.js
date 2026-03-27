/* ══════════════════════════════════════════════════════════════════
   SOBBER ENTERPRISE 2026
   app.js — Navigation, language switch, interactions
   ══════════════════════════════════════════════════════════════════ */

/* ─── ACTIVE NAV STATE ──────────────────────────────────────────────
   Highlight the correct nav item based on current page filename      */
(function markActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item, .nav-dropdown-item').forEach(el => {
    const href = el.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      el.classList.add('active');
    }
  });
})();

/* ─── LANGUAGE SWITCH ───────────────────────────────────────────────
   Persists language choice in localStorage across pages              */
function setLang(l) {
  document.body.className = l;
  document.documentElement.lang = l;
  document.getElementById('lEN').className = 'lang-btn' + (l === 'en' ? ' on' : '');
  document.getElementById('lFR').className = 'lang-btn' + (l === 'fr' ? ' on' : '');
  localStorage.setItem('sobber-lang', l);
}

// Restore saved language on page load
(function restoreLang() {
  const saved = localStorage.getItem('sobber-lang') || 'en';
  document.body.className = saved;
  document.documentElement.lang = saved;
  const btnEN = document.getElementById('lEN');
  const btnFR = document.getElementById('lFR');
  if (btnEN) btnEN.className = 'lang-btn' + (saved === 'en' ? ' on' : '');
  if (btnFR) btnFR.className = 'lang-btn' + (saved === 'fr' ? ' on' : '');
})();

/* ─── NAV SCROLL EFFECT ─────────────────────────────────────────────*/
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ─── MOBILE MENU ───────────────────────────────────────────────────*/
function toggleMobile() {
  document.body.classList.toggle('mobile-nav-open');
  const icon = document.querySelector('.hamburger');
  if (!icon) return;
  icon.innerHTML = document.body.classList.contains('mobile-nav-open')
    ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
    : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
}

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (
    document.body.classList.contains('mobile-nav-open') &&
    !e.target.closest('#nav')
  ) {
    document.body.classList.remove('mobile-nav-open');
    const icon = document.querySelector('.hamburger');
    if (icon) icon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }
});

/* ─── CONTACT FORM SUBMIT ───────────────────────────────────────────*/
function handleSubmit() {
  const btn = event.currentTarget;
  const origHTML = btn.innerHTML;
  btn.style.background = '#4ade80';
  btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Request received — we\'ll be in touch within 24h';
  btn.disabled = true;
  setTimeout(() => {
    btn.style.background = '';
    btn.innerHTML = origHTML;
    btn.disabled = false;
  }, 4000);
}

/* ─── SCROLL REVEAL ─────────────────────────────────────────────────*/
const reveal = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.card, .industry-card, .cert-card, .stat-box, .timeline-step, .bento-card, .contact-info-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  reveal.observe(el);
});