/* =====================================================================
   js/popup.js — THE FLOATING POPUP
   One popup, reused for: the five menu items (words: data/popups.js) and a wing's
   Explore (js/wings.js). It floats over the building and never changes the floor.
   Looks: css/popup.css.
   Use:  PLNS.popup.open({ title: 'Words', paragraphs: ['one', 'two'] })
         or  PLNS.popup.open({ title: 'Words', node: someElement })
   ===================================================================== */
PLNS.popup = (function () {
  const $ = id => document.getElementById(id);
  let lastFocus = null;

  function open(opts) {
    const root = $('pop-root'), body = $('pop-body');
    $('pop-title').textContent = opts.title || '';
    body.textContent = '';
    if (opts.node) body.appendChild(opts.node);
    (opts.paragraphs || []).forEach(t => {
      const p = document.createElement('p'); p.textContent = t; body.appendChild(p);
    });
    lastFocus = document.activeElement;
    root.hidden = false;
    requestAnimationFrame(() => root.classList.add('show'));
    $('pop-close').focus({ preventScroll: true });
  }

  function close() {
    const root = $('pop-root'); if (root.hidden) return;
    root.classList.remove('show');
    setTimeout(() => { if (!root.classList.contains('show')) root.hidden = true; }, 450);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function init() {
    $('pop-close').addEventListener('click', close);
    document.querySelector('.pop-scrim').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }
  init();

  return { open, close };
})();
