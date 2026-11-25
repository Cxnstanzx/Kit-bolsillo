/**
 * Punto de entrada: navegación entre pantallas y arranque de la app.
 */
(function (K) {
  'use strict';

  const { $, showToast, copyText, initTheme } = K.ui;
  const VIEWS = ['inicio', 'plan', 'red', 'ayuda'];

  const isRoute = (id) => VIEWS.includes(id) || Boolean(K.data.situations[id]);

  function go(id) {
    let section = id;
    if (K.data.situations[id]) {
      K.views.renderSituation(id);
      section = 'sit';
    }
    document.querySelectorAll('.v').forEach((v) => v.classList.toggle('on', v.id === section));
    document.querySelectorAll('nav button').forEach((b) => {
      if (b.getAttribute('data-go') === id) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
    try {
      if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    } catch (e) { /* historial no disponible */ }
    window.scrollTo(0, 0);
  }

  function bindEvents() {
    document.addEventListener('click', (e) => {
      const copy = e.target.closest('[data-copy]');
      if (copy) {
        const number = copy.getAttribute('data-copy');
        if (number) copyText(number, () => showToast('Número copiado: ' + number));
        return;
      }
      const link = e.target.closest('[data-go]');
      if (link) {
        e.preventDefault();
        go(link.getAttribute('data-go'));
      }
    });

    window.addEventListener('hashchange', () => {
      const id = location.hash.replace('#', '');
      if (isRoute(id)) go(id);
    });
  }

  function init() {
    initTheme();
    K.views.renderHome();
    K.views.renderHelp();
    K.views.renderNetwork();
    K.views.renderPlan();
    K.views.renderStorageStatus();
    K.storage.requestPersistence();
    bindEvents();

    const initial = location.hash.replace('#', '');
    go(isRoute(initial) ? initial : 'inicio');
  }

  document.addEventListener('DOMContentLoaded', init);
})(window.KitSOS);
