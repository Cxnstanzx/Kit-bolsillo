/**
 * Render de cada pantalla. No maneja la navegación (eso vive en app.js).
 */
(function (K) {
  'use strict';

  const { $, showToast, copyText, telHref, callRow, helplineCard } = K.ui;
  const { data, storage } = K;

  const BREATHING_ORB = `
    <div class="orb" role="img" aria-label="Círculo de respiración: inhala 4 segundos, exhala 6 segundos">
      <span>Inhala 4s</span><span class="o2">Exhala 6s</span>
    </div>`;

  const RISK_ALERT = `
    <div class="alert">
      Si sientes que la situación te sobrepasa o hay riesgo, habla de inmediato con tu ETD
      o un adulto responsable, o llama al <strong>*4141</strong>.
    </div>`;

  /* ---------- Inicio ---------- */
  let lastTip = -1;
  function showTip() {
    let i;
    do { i = Math.floor(Math.random() * data.tips.length); } while (i === lastTip && data.tips.length > 1);
    lastTip = i;
    $('tip').textContent = data.tips[i];
  }

  function renderCards(filter) {
    const entries = Object.entries(data.situations)
      .filter(([, s]) => filter === 'all' || s.category === filter);
    $('cards').innerHTML = entries.map(([key, s]) => `
      <button class="big" type="button" data-go="${key}" style="background:${s.color}">
        <em aria-hidden="true">${s.emoji}</em>
        <span>${s.title}<small>${s.subtitle}</small></span>
      </button>`).join('');
  }

  function renderChips() {
    $('chips').innerHTML = data.categories.map(([id, label], i) =>
      `<button type="button" data-f="${id}" aria-pressed="${i === 0}">${label}</button>`).join('');
    $('chips').onclick = (e) => {
      const btn = e.target.closest('[data-f]');
      if (!btn) return;
      document.querySelectorAll('#chips button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      renderCards(btn.getAttribute('data-f'));
    };
  }

  function renderHome() {
    showTip();
    $('tipb').onclick = showTip;
    renderChips();
    renderCards('all');
  }

  /* ---------- Situación ---------- */
  function renderSituation(key) {
    const s = data.situations[key];
    if (!s) return;
    const steps = s.steps.map((text, i) =>
      `<div class="step"><b>${i + 1}</b><p>${text}</p></div>`).join('');
    const message = s.message ? `
      <div class="msg">
        <p>“${s.message}”</p>
        <button class="pri sec" id="cp" type="button">📋 Copiar mensaje sugerido</button>
      </div>` : '<div style="height:12px"></div>';

    $('sit').innerHTML = `
      <button class="back" type="button" data-go="inicio">← Volver</button>
      <div class="ban" style="background:${s.color}">
        <span aria-hidden="true">${s.emoji}</span>
        <h1>${s.title}</h1>
        <p>${s.subtitle} · Vas a tu ritmo.</p>
      </div>
      ${s.breathing ? BREATHING_ORB : ''}
      ${steps}
      ${message}
      <button class="pri sec" type="button" data-go="red">🤝 Abrir mi red de hoy</button>
      ${s.risk ? RISK_ALERT : ''}`;

    if (s.message) {
      $('cp').onclick = function () {
        copyText(s.message, () => {
          this.textContent = '✓ Mensaje copiado';
          showToast('Mensaje copiado');
        });
      };
    }
  }

  /* ---------- Pausa y apoyo ---------- */
  function renderHelp() {
    $('lines').innerHTML = data.helplines.filter((h) => h.inHelp).map((h) => helplineCard(h)).join('');
    $('emerg').innerHTML = data.emergency.map((e) => callRow(e.number, e.label)).join('');
  }

  /* ---------- Mi red ---------- */
  const contactRefreshers = [];

  function bindContact(id) {
    const name = $(id + 'n'), phone = $(id + 't');
    const call = $(id + 'a'), copy = $(id + 'c'), row = $(id + 'row');
    name.value = storage.get(id + 'n');
    phone.value = storage.get(id + 't');

    function refresh() {
      const clean = phone.value.replace(/[^0-9+*#]/g, '');
      row.style.display = clean ? 'flex' : 'none';
      call.href = clean ? telHref(clean) : '#red';
      copy.setAttribute('data-copy', clean);
    }
    contactRefreshers.push(refresh);
    refresh();

    name.oninput = () => storage.set(id + 'n', name.value);
    phone.oninput = () => { storage.set(id + 't', phone.value); refresh(); };
  }

  function renderNetwork() {
    const people = data.contacts.map(([id, label]) => `
      <div class="f">
        <label for="${id}n">${label}</label>
        <input id="${id}n" placeholder="Nombre o rol" autocomplete="off">
        <input id="${id}t" type="tel" placeholder="Teléfono (opcional)">
        <div class="row" id="${id}row" style="display:none">
          <a class="pri" id="${id}a" href="#red">📞 Llamar</a>
          <button class="pri sec" id="${id}c" type="button" aria-label="Copiar número">📋 Copiar</button>
        </div>
      </div>`).join('');

    const lines = data.helplines.map((h) => helplineCard(h, true)).join('');
    $('slots').innerHTML = people + `
      <div class="f">
        <label>Orientación gratuita</label>
        ${lines}
        <p class="mut" style="font-size:.84rem;margin-top:10px">
          Ante una urgencia, avisa a tu ETD o a un adulto responsable, o llama al 131 / 133.
        </p>
      </div>`;
    data.contacts.forEach(([id]) => bindContact(id));
  }

  /* ---------- Mi plan ---------- */
  function renderPlan() {
    const fields = data.planFields.map(([id, label]) => `
      <div class="f">
        <label for="${id}">${label}</label>
        <textarea id="${id}" rows="3" placeholder="Escribe aquí cuando estés tranquilo/a…"></textarea>
      </div>`).join('');

    $('fields').innerHTML = fields + `
      <div class="f">
        <label>💾 Guardar una copia de mis datos</label>
        <p class="mut" style="font-size:.9rem;margin-bottom:10px">
          Por si cambias de teléfono o se borra el navegador: copia tus datos, pégalos en un lugar
          tuyo (como Notas) y, cuando quieras, pégalos acá para recuperarlos.
        </p>
        <button class="pri sec" id="bkCopy" type="button">📋 Copiar mis datos</button>
        <textarea id="bk" rows="3" placeholder="Pega aquí tu copia para recuperar tus datos" style="margin-top:12px"></textarea>
        <button class="pri sec" id="bkRestore" type="button">↩ Recuperar mis datos</button>
      </div>`;

    data.planFields.forEach(([id]) => {
      const el = $(id);
      el.value = storage.get(id);
      el.oninput = () => storage.set(id, el.value);
    });

    $('bkCopy').onclick = () =>
      copyText(storage.exportBackup(), () => showToast('Datos copiados. Guárdalos en Notas'));

    $('bkRestore').onclick = () => {
      try {
        const count = storage.importBackup($('bk').value);
        data.planFields.forEach(([id]) => { $(id).value = storage.get(id); });
        data.contacts.forEach(([id]) => { $(id + 'n').value = storage.get(id + 'n'); $(id + 't').value = storage.get(id + 't'); });
        contactRefreshers.forEach((fn) => fn());
        $('bk').value = '';
        showToast(count ? 'Datos recuperados' : 'La copia estaba vacía');
      } catch (err) {
        showToast('No pude leer esa copia');
      }
    };
  }

  /* ---------- Aviso de guardado ---------- */
  function renderStorageStatus() {
    const msg = storage.isAvailable()
      ? '✓ Lo que escribas se guarda solo en este dispositivo, aunque cierres el navegador.'
      : '⚠ Este navegador no permite guardar aquí. Usa “Copiar mis datos” (en Mi plan) para no perder lo que escribas.';
    document.querySelectorAll('.stat').forEach((el) => { el.textContent = msg; });
  }

  K.views = { renderHome, renderSituation, renderHelp, renderNetwork, renderPlan, renderStorageStatus };
})(window.KitSOS);
