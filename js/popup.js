/* =====================================================================
   js/popup.js — THE FLOATING POPUP
   One popup, reused for: the five menu items (js/menu.js reads data/popups.js) and a wing's
   Explore (js/wings.js). It floats over the building and never changes the floor.
   - The TITLE and the × stay in place; the WORDS scroll. A soft fade at the bottom shows
     there is more to read, and disappears at the end.
   - A quiet footer shows your links (data/popups.js -> PLNS_FOOTER).
   Looks: css/popup.css.
   Use:  PLNS.popup.open({ title: 'Words', paragraphs: ['one', 'two'] })
         PLNS.popup.open({ title: 'Words', node: someElement,
                           footer: someElement,        // optional: fixed area under the words
                           links: false,               // optional: hide the footer links
                           onEnd: fn,                  // optional: runs once the end has been reached
                           onBack: fn })               // optional: × / Esc / outside tap call this instead of closing
   ===================================================================== */
PLNS.popup = (function () {
  const $ = id => document.getElementById(id);
  let lastFocus = null, onEnd = null, onBack = null, endFired = false, timer = null, foot = null;

  function footNode() {
    if (!foot) { foot = document.createElement('div'); foot.className = 'pop-foot'; $('pop-body').insertAdjacentElement('afterend', foot); }
    return foot;
  }
  function linksNav() {
    // the same addresses as the footer bar (data/footer.js); data/popups.js -> PLNS_FOOTER is the older fallback
    const src = (typeof PLNS_SITE_FOOTER !== 'undefined' && PLNS_SITE_FOOTER.links) ? PLNS_SITE_FOOTER.links : (typeof PLNS_FOOTER !== 'undefined' ? PLNS_FOOTER : []);
    const list = src.filter(l => l.url);
    if (!list.length) return null;
    const nav = document.createElement('nav'); nav.className = 'pop-links';
    list.forEach(l => { const a = document.createElement('a'); a.href = l.url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = l.label; nav.appendChild(a); });
    return nav;
  }

  // keeps the "more below" fade honest, and tells us when the end has been reached
  function check() {
    const b = $('pop-body'), root = $('pop-root'); if (root.hidden) return;
    const more = b.scrollTop + b.clientHeight < b.scrollHeight - 6;
    b.classList.toggle('more', more);
    if (!more && onEnd && !endFired) { endFired = true; onEnd(); }
  }

  function open(opts) {
    const root = $('pop-root'), body = $('pop-body');
    $('pop-title').textContent = opts.title || '';
    body.textContent = ''; body.scrollTop = 0;
    if (opts.node) body.appendChild(opts.node);
    (opts.paragraphs || []).forEach(t => { const p = document.createElement('p'); p.textContent = t; body.appendChild(p); });

    const f = footNode(); f.textContent = '';
    if (opts.footer) f.appendChild(opts.footer);
    if (opts.links !== false) { const nav = linksNav(); if (nav) f.appendChild(nav); }
    f.hidden = !f.childNodes.length;

    onEnd = opts.onEnd || null; onBack = opts.onBack || null; endFired = false;
    if (root.hidden) lastFocus = document.activeElement;
    root.hidden = false;
    requestAnimationFrame(() => { root.classList.add('show'); check(); });
    clearInterval(timer); timer = setInterval(check, 400);
    $('pop-close').focus({ preventScroll: true });
  }

  function close() {
    const root = $('pop-root'); if (root.hidden) return;
    root.classList.remove('show');
    clearInterval(timer); onEnd = null; onBack = null;
    setTimeout(() => { if (!root.classList.contains('show')) root.hidden = true; }, 450);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  const dismiss = () => { if (onBack) onBack(); else close(); };

  function init() {
    $('pop-close').addEventListener('click', dismiss);
    document.querySelector('.pop-scrim').addEventListener('click', dismiss);
    $('pop-body').addEventListener('scroll', check, { passive: true });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('pop-root').hidden) dismiss(); });
  }
  init();

  return { open, close };
})();
