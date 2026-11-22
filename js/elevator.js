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

  async function open() {
    const lift = $('lift');

    // Fill the nameplate and build the lift while the doors are still shut.
    $('lift-kicker').textContent = C.lift.kicker;
    $('lift-name').textContent = PLNS.visitor.name;
    makeParticles();
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
