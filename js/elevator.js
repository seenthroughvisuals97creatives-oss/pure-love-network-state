/* =====================================================================
   js/elevator.js — THE LIFT DOORS, WELCOME LOOP AND PARTICLES
   The closed doors are shown first, then slide apart.
   Wording of the looping welcome: data/copy.js -> liftLoop and lift.
   Hold time on the closed doors: data/copy.js -> timings.liftClosedHold.
   Looks: css/elevator.css.
   The floor control, clock, marquee and travelling: js/lift-control.js.
   ===================================================================== */
PLNS.elevator = (function () {
  const C = PLNS_COPY, T = C.timings, U = PLNS.util;
  const $ = id => document.getElementById(id);

  // A few faint stars rising in the visitor's colour (css/elevator.css -> .lp).
  function makeParticles() {
    if (U.reduce) return;                                   // none if the visitor prefers less motion
    const box = $('lift-particles');
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('span');
      s.className = 'lp';
      const size = 3 + Math.random() * 4;
      s.style.left = (6 + Math.random() * 88) + '%';
      s.style.width = s.style.height = size + 'px';
      s.style.animationDuration = (20 + Math.random() * 16) + 's';
      s.style.animationDelay = (-Math.random() * 34) + 's';
      box.appendChild(s);
    }
  }

  // Types a line; {name} is typed in the visitor's colour.
  async function typeTemplate(el, template, speed) {
    const parts = template.split('{name}');
    for (let i = 0; i < parts.length; i++) {
      await U.type(el, parts[i], speed);
      if (i < parts.length - 1) {
        const span = document.createElement('span');
        span.style.color = PLNS.visitor.colour;
        span.className = 'visitor-name';
        el.appendChild(span);
        await U.type(span, PLNS.visitor.name, speed);
      }
    }
  }

  // Slow, gentle looping welcome (types, holds, fades, repeats). No flashing.
  async function loopWelcome() {
    const el = $('lift-loop');
    let i = 0;
    while (true) {
      el.classList.remove('dim');
      el.textContent = '';
      await typeTemplate(el, C.liftLoop[i % C.liftLoop.length], T.typeLift);
      await U.sleep(T.liftLoopHold);
      el.classList.add('dim');
      await U.sleep(T.liftLoopFade);
      i++;
    }
  }

  // The lift wall picture follows the visitor's local time and crossfades (data/liftscenes.js).
  function startScenes() {
    const S = (typeof PLNS_LIFT_SCENES !== 'undefined') ? PLNS_LIFT_SCENES : null; if (!S || !S.scenes) return;
    const layers = [$('scene-a'), $('scene-b')], box = $('lift-scene');
    box.style.setProperty('--scene-fade', (S.fadeSeconds || 6) + 's');
    box.style.setProperty('--scene-strength', S.strength == null ? .7 : S.strength);
    let front = 0, shown = '';
    const pick = h => {
      const list = S.scenes.slice().sort((a, b) => a.from - b.from);
      let s = null; list.forEach(x => { if (x.from <= h) s = x; });
      return s || list[list.length - 1];            // before the first slot = the last one (night wraps)
    };
    const apply = () => {
      const sc = pick(new Date().getHours()); if (!sc || sc.name === shown) return;
      shown = sc.name;
      if (!sc.image) { layers.forEach(l => l.classList.remove('on')); return; }
      const img = new Image();
      img.onload = () => {
        const back = layers[1 - front];
        back.style.backgroundImage = 'url("' + sc.image + '")';
        back.classList.add('on'); layers[front].classList.remove('on'); front = 1 - front;
      };
      img.onerror = () => PLNS_warn('The lift picture for ' + sc.name + ' was not found at "' + sc.image + '". Check the path in data/liftscenes.js and that the file is uploaded.');
      img.src = sc.image;
    };
    apply(); setInterval(apply, 60000);
  }

  async function open() {
    const lift = $('lift');

    // Fill the nameplate and build the lift while the doors are still shut.
    $('lift-kicker').textContent = C.lift.kicker;
    $('lift-name').textContent = PLNS.visitor.name;
    makeParticles();
    startScenes();
    PLNS.liftControl.init();

    // Show the CLOSED doors first, and hold so the visitor sees them.
    $('stage').dataset.phase = 'lift';
    lift.classList.add('show'); lift.setAttribute('aria-hidden', 'false');
    await U.sleep(T.liftClosedHold);

    // Then the doors slide apart onto the lift interior.
    lift.classList.add('open');
    await U.sleep(2600);

    // Only now, with the doors open, do the wings appear on either side (css/wings.css).
    $('stage').dataset.wings = 'show';

    loopWelcome();
    PLNS.liftControl.startLoops();
  }

  return { open };
})();
