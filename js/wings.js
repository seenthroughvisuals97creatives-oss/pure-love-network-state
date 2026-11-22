/* =====================================================================
   js/wings.js — THE LEFT AND RIGHT WINGS
   - Builds both wings from data/floors.js (each floor has its own left and right wing).
   - Wings change when the lift arrives on a floor (js/lift-control.js calls show()).
   - Wings are EMPTY until entries are added in data/floors.js (projects: data/projects.js).
   - Desktop: both wings stand beside the lift. Explore opens a popup of the wing's entries.
   - Phones: a sliver of each wing shows; tap it or swipe to bring the wing in as a full-width
     view. The floor badge (top) or a swipe the other way returns you to the lift.
   - Wording: data/copy.js -> wings.   Looks: css/wings.css.
   ===================================================================== */
PLNS.wings = (function () {
  const C = PLNS_COPY, W = C.wings, L = C.lift, U = PLNS.util;
  const $ = id => document.getElementById(id);
  const phone = window.matchMedia('(max-width: 900px)');

  let floors = [], idx = 0, openSide = null;

  function projectOf(id) { return (window.PLNS_PROJECTS || []).find(p => p.projectId === id) || {}; }
  // One wing entry + its project -> what the wing shows
  function resolve(entry) {
    const p = projectOf(entry.projectId);
    return {
      title: p.title || '', image: p.image || '',
      description: entry.description || p.description || '',
      links: entry.destination ? [{ label: 'Visit', url: entry.destination }] : (p.links || [])
    };
  }

  // ---------- Build the wing frames once ----------
  function buildFrame(side) {
    const el = $('wing-' + side);
    el.textContent = '';
    const explore = document.createElement('button');
    explore.type = 'button'; explore.className = 'wing-explore';
    const sp = document.createElement('span'); sp.textContent = W.explore; explore.appendChild(sp);
    explore.addEventListener('click', e => { e.stopPropagation(); explorePopup(side); });

    const inner = document.createElement('div'); inner.className = 'wing-inner';
    const name = document.createElement('p'); name.className = 'wing-name';
    const body = document.createElement('div'); body.className = 'wing-body';
    inner.appendChild(name); inner.appendChild(body);

    const arrow = document.createElement('button');
    arrow.type = 'button'; arrow.className = 'wing-arrow';
    arrow.textContent = side === 'left' ? '›' : '‹';
    arrow.setAttribute('aria-label', side === 'left' ? W.openLeft : W.openRight);
    arrow.addEventListener('click', e => { e.stopPropagation(); open(side); });

    el.appendChild(explore); el.appendChild(inner); el.appendChild(arrow);
    el.setAttribute('aria-label', side === 'left' ? W.left : W.right);
  }

  // ---------- Fill a wing with the current floor's wing ----------
  function render(side) {
    const wing = floors[idx][side], el = $('wing-' + side);
    const name = el.querySelector('.wing-name'), body = el.querySelector('.wing-body');
    name.textContent = wing.name || (side === 'left' ? W.left : W.right);
    name.classList.toggle('is-default', !wing.name);
    body.textContent = '';
    body.classList.toggle('is-empty', wing.entries.length === 0);
    if (!wing.entries.length) {
      const o = document.createElement('div'); o.className = 'wing-orn'; o.setAttribute('aria-hidden', 'true'); body.appendChild(o);
      return;
    }
    wing.entries.forEach(entry => {
      const r = resolve(entry), card = document.createElement('div'); card.className = 'wing-card';
      if (r.image) { const im = document.createElement('img'); im.src = r.image; im.alt = r.title; card.appendChild(im); }
      if (r.title) { const h = document.createElement('h3'); h.textContent = r.title; card.appendChild(h); }
      body.appendChild(card);
    });
  }

  // Explore: a popup with the wing's entries (or a quiet "no entries yet")
  function explorePopup(side) {
    const wing = floors[idx][side];
    const title = wing.name || (side === 'left' ? W.left : W.right);
    if (!wing.entries.length) { PLNS.popup.open({ title, paragraphs: [W.emptyWing] }); return; }
    const box = document.createElement('div');
    wing.entries.forEach(entry => {
      const r = resolve(entry), item = document.createElement('div'); item.className = 'pop-entry';
      if (r.image) { const im = document.createElement('img'); im.src = r.image; im.alt = r.title; item.appendChild(im); }
      if (r.title) { const h = document.createElement('h3'); h.textContent = r.title; item.appendChild(h); }
      if (r.description) { const p = document.createElement('p'); p.textContent = r.description; item.appendChild(p); }
      r.links.forEach(l => { const a = document.createElement('a'); a.href = l.url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = l.label + ' →'; item.appendChild(a); item.appendChild(document.createTextNode(' ')); });
      box.appendChild(item);
    });
    PLNS.popup.open({ title, node: box });
  }

  // ---------- Phones: bring a wing in / return to the lift ----------
  function open(side) {
    if (!phone.matches || openSide || !shown() || busyMoving()) return;
    openSide = side;
    $('wing-' + side).classList.add('open');
    const badge = $('floor-badge');
    badge.classList.add('show'); badge.tabIndex = 0;
  }
  function closeAll() {
    openSide = null;
    ['left', 'right'].forEach(s => $('wing-' + s).classList.remove('open'));
    const badge = $('floor-badge'); badge.classList.remove('show'); badge.tabIndex = -1;
  }
  const shown = () => $('stage').dataset.wings === 'show';
  const busyMoving = () => $('stage').dataset.moving === '1';

  function setBadge() { $('floor-badge').textContent = L.floor + ' ' + floors[idx].label + ' · ' + W.back; }

  // ---------- Public ----------
  function init(allFloors, start) {
    floors = allFloors; idx = start;
    buildFrame('left'); buildFrame('right');
    render('left'); render('right'); setBadge();

    const badge = $('floor-badge');
    badge.setAttribute('aria-label', W.back); badge.tabIndex = -1;
    badge.addEventListener('click', closeAll);

    // tapping a peeking wing (anywhere on its visible sliver) brings it in
    ['left', 'right'].forEach(s => $('wing-' + s).addEventListener('click', () => open(s)));

    // swipe: right brings in the left wing (or sends the right wing away); left does the opposite
    let sx = 0, sy = 0, tracking = false;
    const stage = $('stage');
    stage.addEventListener('touchstart', e => {
      tracking = e.touches.length === 1 && $('pop-root').hidden;
      if (tracking) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }
    }, { passive: true });
    stage.addEventListener('touchend', e => {
      if (!tracking || !phone.matches) return; tracking = false;
      const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx > 0) { openSide === 'right' ? closeAll() : open('left'); }
      else        { openSide === 'left'  ? closeAll() : open('right'); }
    }, { passive: true });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && openSide && $('pop-root').hidden) closeAll(); });
  }

  // The lift has arrived on floor i: the wings change to that floor's wings.
  function show(i) {
    idx = i;
    const inners = document.querySelectorAll('.wing-inner');
    inners.forEach(n => n.classList.add('swap'));
    setTimeout(() => {
      render('left'); render('right'); setBadge();
      inners.forEach(n => n.classList.remove('swap'));
      setMoving(false);
    }, U.reduce ? 0 : 500);
  }
  function setMoving(b) { $('stage').dataset.moving = b ? '1' : '0'; }

  return { init, show, closeAll, setMoving };
})();
