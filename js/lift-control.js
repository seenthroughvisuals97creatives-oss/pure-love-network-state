/* =====================================================================
   js/lift-control.js — THE FLOOR CONTROL, CLOCK, MARQUEE AND TRAVELLING
   - The logo circle opens the floor panel. Floors: data/floors.js.
   - The lift rises or descends one floor at a time; the indicator shows the
     current floor, direction, next floor and destination.
   - The clock's hands wear the visitor's colour (css/lift-control.css).
   - The marquee flows left to right: data/announcements.js.
   - The looping single words: data/copy.js -> liftWords.
   Floor CONTENT (wings, projects) is not built yet; this is the empty stage.
   ===================================================================== */
PLNS.liftControl = (function () {
  const C = PLNS_COPY, T = C.timings, L = C.lift, U = PLNS.util;
  const $ = id => document.getElementById(id);

  let floors = [], current = 0, busy = false, wallShift = 0, ready = false;

  // ---------- Build everything (called once, while the doors are still shut) ----------
  function init() {
    if (ready) return; ready = true;
    floors = PLNS_BUILDING.floors;
    const start = floors.findIndex(f => f.id === PLNS_BUILDING.startFloor);
    current = start >= 0 ? start : 0;

    $('lift-title').textContent = L.title;
    $('lift-subtitle').textContent = L.subtitle;
    buildClock();
    buildMarquee();
    buildLogoControl();
    buildFloorPanel();
    renderIndicator();
    markCurrent();
  }

  // ---------- The clock ----------
  function buildClock() {
    const ticks = $('clock-ticks');
    for (let i = 0; i < 12; i++) {
      const major = i % 3 === 0;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', 50); line.setAttribute('x2', 50);
      line.setAttribute('y1', major ? 9 : 10.5); line.setAttribute('y2', major ? 17 : 14.5);
      line.setAttribute('transform', 'rotate(' + (i * 30) + ' 50 50)');
      if (major) line.setAttribute('class', 'major');
      ticks.appendChild(line);
    }
    const tick = () => {
      const d = new Date(), s = d.getSeconds(), m = d.getMinutes() + s / 60, h = (d.getHours() % 12) + m / 60;
      $('hand-h').setAttribute('transform', 'rotate(' + (h * 30) + ' 50 50)');
      $('hand-m').setAttribute('transform', 'rotate(' + (m * 6) + ' 50 50)');
      $('hand-s').setAttribute('transform', 'rotate(' + (s * 6) + ' 50 50)');
    };
    tick(); setInterval(tick, 1000);
  }

  // ---------- The marquee (left to right) ----------
  function buildMarquee() {
    const track = $('marquee-track'), box = track.parentElement;
    track.style.setProperty('--marquee-seconds', T.marqueeSeconds + 's');
    const makeHalf = () => {
      const half = document.createDocumentFragment();
      PLNS_ANNOUNCEMENTS.forEach(a => {
        const el = document.createElement(a.link ? 'a' : 'span');
        el.className = 'marquee-item'; el.textContent = a.text;
        if (a.link) { el.href = a.link; el.target = '_blank'; el.rel = 'noopener'; }
        const sep = document.createElement('span'); sep.className = 'marquee-sep'; sep.textContent = '✦'; sep.setAttribute('aria-hidden', 'true');
        half.appendChild(el); half.appendChild(sep);
      });
      return half;
    };
    // Make one half at least as wide as the band, then double it so the loop has no gap.
    const first = document.createElement('div'); first.style.display = 'flex'; first.appendChild(makeHalf());
    track.appendChild(first);
    let guard = 0;
    while (first.scrollWidth < box.clientWidth * 1.2 && guard++ < 8) first.appendChild(makeHalf());
    const second = first.cloneNode(true); second.setAttribute('aria-hidden', 'true');
    track.appendChild(second);
  }

  // ---------- The logo circle = the floor control ----------
  function buildLogoControl() {
    const btn = $('logo-control'), img = $('lift-logo');
    btn.setAttribute('aria-label', L.openControl);
    img.addEventListener('error', () => {
      btn.classList.add('broken');
      PLNS_warn('The community logo (lift circle) was not found at "' + C.logos.community + '". Check the path in data/copy.js.');
    });
    img.src = C.logos.community;
    btn.addEventListener('click', e => { e.stopPropagation(); togglePanel(); });
    document.addEventListener('click', e => {
      if (!$('floor-panel').hidden && !$('floor-panel').contains(e.target)) closePanel();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
  }

  // ---------- The floating floor panel ----------
  function buildFloorPanel() {
    $('fp-heading').textContent = C.lift.floorPanelHeading;
    const list = $('fp-list');
    // highest floor at the top, like a real lift panel
    floors.map((f, i) => ({ f, i })).reverse().forEach(({ f, i }) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'fp-item'; b.dataset.index = i;
      b.innerHTML = '<span class="fp-light" aria-hidden="true"></span>' +
                    '<span class="fp-num"></span><span class="fp-name"></span><span class="fp-here"></span>';
      b.querySelector('.fp-num').textContent = f.label;
      b.querySelector('.fp-name').textContent = f.name;
      b.querySelector('.fp-here').textContent = L.youAreHere;
      b.addEventListener('click', () => { closePanel(); travelTo(i); });
      li.appendChild(b); list.appendChild(li);
    });
  }
  function togglePanel() { $('floor-panel').hidden ? openPanel() : closePanel(); }
  function openPanel() {
    const p = $('floor-panel'); p.hidden = false;
    requestAnimationFrame(() => p.classList.add('show'));
    $('logo-control').setAttribute('aria-expanded', 'true');
  }
  function closePanel() {
    const p = $('floor-panel'); if (p.hidden) return;
    p.classList.remove('show');
    $('logo-control').setAttribute('aria-expanded', 'false');
    setTimeout(() => { if (!p.classList.contains('show')) p.hidden = true; }, 500);
  }
  function markCurrent() {
    document.querySelectorAll('.fp-item').forEach(b => {
      if (Number(b.dataset.index) === current) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
      b.disabled = busy;
    });
  }

  // ---------- The floor indicator ----------
  // state: null = resting; or { dir: 1|-1, next: index, dest: index }
  function renderIndicator(state, arrived) {
    const ind = $('floor-indicator');
    $('fi-current').textContent = floors[current].label;
    ind.classList.toggle('moving', !!state);
    if (state) {
      $('fi-dir').textContent = (state.dir > 0 ? '▲ ' + L.ascending : '▼ ' + L.descending);
      $('fi-trip').textContent = (state.next === state.dest)
        ? L.to + ' ' + floors[state.dest].label
        : L.next + ' ' + floors[state.next].label + ' · ' + L.to + ' ' + floors[state.dest].label;
    } else {
      $('fi-dir').textContent = arrived ? L.arrived : L.resting;
      $('fi-trip').textContent = floors[current].name;
    }
  }

  // ---------- Travelling: one floor at a time ----------
  async function travelTo(target) {
    if (busy || target === current) return;
    busy = true; markCurrent();
    const dir = target > current ? 1 : -1;
    while (current !== target) {
      const next = current + dir;
      renderIndicator({ dir, next, dest: target });
      // the floral wall drifts, so you feel the rise (or fall)
      wallShift += dir * 150;
      $('lift').style.setProperty('--wall-shift', wallShift + 'px');
      await U.sleep(T.floorTravel);
      current = next;
      renderIndicator({ dir, next: Math.min(Math.max(current + dir, 0), floors.length - 1), dest: target });
      markCurrent();
    }
    renderIndicator(null, true);
    await U.sleep(T.arrivedHold);
    busy = false; markCurrent();
    if (!busy) renderIndicator(null, false);
  }

  // ---------- The looping single words under the indicator ----------
  async function wordsLoop() {
    const box = $('lift-words'), w = $('lw-word'), l = $('lw-line');
    let i = 0;
    while (true) {
      const item = C.liftWords[i % C.liftWords.length];
      w.textContent = item.word; l.textContent = item.line || '';
      box.classList.remove('dim');
      await U.sleep(T.wordsHold);
      box.classList.add('dim');
      await U.sleep(T.wordsFade);
      i++;
    }
  }

  function startLoops() { wordsLoop(); }

  return { init, startLoops, travelTo };
})();
