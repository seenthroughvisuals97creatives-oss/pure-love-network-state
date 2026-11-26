/* =====================================================================
   js/footer.js — BUILDS THE FOOTER BAR UNDER THE LIFT
   Addresses and words: data/footer.js.   Looks: css/footer.css.
   It appears when the lift doors have opened (the same moment as the wings).
   ===================================================================== */
PLNS.footer = (function () {
  const ICONS = {
    community: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3"/><path d="M2.5 19c0-3.2 2.5-5 5.5-5s5.5 1.8 5.5 5"/><circle cx="16.5" cy="9" r="2.5"/><path d="M14.6 14.3c.6-.2 1.3-.3 1.9-.3 2.7 0 4.5 1.6 4.5 4.6"/></svg>',
    site: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M4.5 7.5h15M4.5 16.5h15"/></svg>'
  };
  const F = (typeof PLNS_SITE_FOOTER !== 'undefined') ? PLNS_SITE_FOOTER : { links: [], copyright: '' };
  const bar = document.getElementById('site-footer'); if (!bar) return {};

  const live = F.links.filter(l => l.url);
  live.forEach(l => {
    const a = document.createElement('a'); a.className = 'sf-link'; a.href = l.url; a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', l.label);
    a.innerHTML = (ICONS[l.icon] || ICONS.site) + '<span class="sf-long"></span><span class="sf-short"></span>';
    a.querySelector('.sf-long').textContent = l.label; a.querySelector('.sf-short').textContent = l.short || l.label;
    bar.appendChild(a);
  });
  const c = document.createElement('span'); c.className = 'sf-copy';
  c.appendChild(document.createTextNode('© ' + new Date().getFullYear()));
  const nm = document.createElement('span'); nm.className = 'sf-name'; nm.textContent = ' ' + (F.copyright || ''); c.appendChild(nm);   // the name is hidden on small phones
  bar.appendChild(c);
  return {};
})();
