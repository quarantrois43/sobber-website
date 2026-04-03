/* ── layout.js — shared header & footer loader ───────────────────── */
(function () {
  const PAGE = location.pathname.split('/').pop() || 'index.html';

  /* Inject a partial HTML file into a target element */
  function loadPartial(url, targetId, callback) {
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load ' + url);
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

    /* Industries dropdown: mark parent button active on any industries page */
    if (PAGE === 'industries.html') {
      var btn = document.querySelector('#nav .nav-dropdown > button.nav-item');
      if (btn) btn.classList.add('active');
    }

    /* Re-apply saved language after header is in the DOM */
    if (typeof setLang === 'function') {
      var lang = localStorage.getItem('sobber_lang') || 'en';
      setLang(lang);
    }
  }

  /* Load header first, then footer */
  loadPartial('partials/header.html', 'site-header', function () {
    /* Bind scroll effect */
    window.addEventListener('scroll', function () {
      var nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    markActive();
  });

  loadPartial('partials/footer.html', 'site-footer');
})();