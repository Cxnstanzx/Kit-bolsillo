/**
 * Utilidades de interfaz: DOM, avisos, portapapeles, tema y botones de llamada.
 */
(function (K) {
  'use strict';

  const $ = (id) => document.getElementById(id);

  /* ---------- Aviso flotante ---------- */
  let toastTimer = null;
  function showToast(text) {
    const el = $('toast');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  /* ---------- Portapapeles (con respaldo para navegadores antiguos) ---------- */
  function fallbackCopy(text, onDone) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      onDone();
    } catch (err) {
      showToast('Selecciona y copia el texto');
    }
  }

  function copyText(text, onDone) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onDone).catch(() => fallbackCopy(text, onDone));
    } else {
      fallbackCopy(text, onDone);
    }
  }

  /* ---------- Tema claro / oscuro ---------- */
  const THEME_KEY = 'kit_sos_theme_v1';

  function applyTheme(theme) {
    const dark = theme === 'dark';
    const btn = $('themeToggle');
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    $('themeIcon').textContent = dark ? '☀️' : '🌙';
    $('themeLabel').textContent = dark ? 'Modo claro' : 'Modo oscuro';
    K.storage.set(THEME_KEY, dark ? 'dark' : 'light');
  }

  function initTheme() {
    applyTheme(K.storage.get(THEME_KEY) === 'dark' ? 'dark' : 'light');
    $('themeToggle').addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  /* ---------- Botones de llamada ---------- */
  /** "*" y "#" deben ir codificados en los enlaces tel: */
  function telHref(number) {
    return 'tel:' + number.replace(/\*/g, '%2A').replace(/#/g, '%23');
  }

  function callRow(number, label, highlight) {
    return `
      <div class="row">
        <a class="pri${highlight ? ' amber' : ''}" href="${telHref(number)}">📞 ${label}</a>
        <button class="pri sec" type="button" data-copy="${number}" aria-label="Copiar número ${number}">📋 Copiar</button>
      </div>`;
  }

  function helplineCard(h, plain) {
    return `
      <div class="line${plain ? ' line--plain' : ''}">
        <p><strong>${h.title}</strong><br>${h.description}</p>
        ${callRow(h.number, 'Llamar', h.highlight)}
      </div>`;
  }

  K.ui = { $, showToast, copyText, initTheme, telHref, callRow, helplineCard };
})(window.KitSOS);
