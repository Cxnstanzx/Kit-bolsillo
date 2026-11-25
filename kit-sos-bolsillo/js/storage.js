/**
 * Almacenamiento local (localStorage) y copia de seguridad en texto.
 * Los datos nunca salen del dispositivo.
 */
(function (K) {
  'use strict';

  const BACKUP_HEADER = 'KIT-SOS-V1';

  const storage = {
    get(key) {
      try { return localStorage.getItem(key) || ''; } catch (e) { return ''; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) { /* almacenamiento bloqueado */ }
    },
    isAvailable() {
      try {
        localStorage.setItem('__test', '1');
        localStorage.removeItem('__test');
        return true;
      } catch (e) { return false; }
    },
    /** Pide al navegador que no borre estos datos por limpieza automática. */
    requestPersistence() {
      try {
        if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
      } catch (e) { /* no soportado */ }
    },
    /** Claves que forman parte de "Mi red" y "Mi plan". */
    dataKeys() {
      const keys = [];
      K.data.contacts.forEach(([id]) => keys.push(id + 'n', id + 't'));
      K.data.planFields.forEach(([id]) => keys.push(id));
      return keys;
    },
    exportBackup() {
      const out = {};
      this.dataKeys().forEach((k) => { const v = this.get(k); if (v) out[k] = v; });
      return BACKUP_HEADER + '\n' + JSON.stringify(out);
    },
    /** Devuelve cuántos campos se restauraron. Lanza error si el texto no es válido. */
    importBackup(raw) {
      const start = raw.indexOf('{');
      if (start < 0) throw new Error('invalid');
      const parsed = JSON.parse(raw.slice(start));
      let count = 0;
      this.dataKeys().forEach((k) => {
        if (typeof parsed[k] === 'string') { this.set(k, parsed[k]); count++; }
      });
      return count;
    }
  };

  K.storage = storage;
})(window.KitSOS);
