/* ── layout.js — shared header & footer loader ───────────────────── */
(function () {
  const PAGE = location.pathname.split('/').pop() || 'index.html';

  /* Resolve base URL (root of the site) regardless of environment.
     Works on Vercel (/) and Live Server (e.g. /sobber-website/)     */
  const BASE = (function () {
    var path = location.pathname;
    var dir = path.substring(0, path.lastIndexOf('/') + 1);
    return location.origin + dir;
  })();

  /* Inject a partial HTML file into a target element */
  function loadPartial(url, targetId, callback) {
    fetch(BASE + url)
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load ' + BASE + url + ' (' + res.status + ')');
        return res.text();
      })
      .then(function (html) {
        var el = document.getElementById(targetId);
        if (el) {
          el.outerHTML = html;
          if (typeof callback === 'function') callback();
        }
      })
      .catch(function (err) {
        console.warn('layout.js:', err);
      });
  }

  /* Mark the active nav link after header is injected */
  function markActive() {
    document.querySelectorAll('#nav .nav-item, #nav .nav-dropdown > .nav-item').forEach(function (el) {
      el.classList.remove('active');
      var href = el.getAttribute('href') || '';
      if (href === PAGE) el.classList.add('active');
    });

    if (PAGE === 'industries.html') {
      var btn = document.querySelector('#nav .nav-dropdown > button.nav-item');
      if (btn) btn.classList.add('active');
    }

    if (typeof setLang === 'function') {
      var lang = localStorage.getItem('sobber_lang') || 'en';
      setLang(lang);
    }
  }

  /* Load header first, then footer */
  loadPartial('partials/header.html', 'site-header', function () {
    window.addEventListener('scroll', function () {
      var nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
    markActive();
  });

  loadPartial('partials/footer.html', 'site-footer');
})();