/* =====================================================================
   js/elevator.js — THE LIFT DOORS AND (PLACEHOLDER) LIFT INTERIOR
   The closed doors are shown first, then slide apart.
   Wording of the looping welcome: data/copy.js -> liftLoop.
   Hold time on the closed doors: data/copy.js -> timings.liftClosedHold.
   Looks: css/elevator.css.
   The full interior (floor indicator, flower stand, clock, marquee,
   circular control) is the next build and will be added here.
   ===================================================================== */
PLNS.elevator = (function () {
  const C = PLNS_COPY, T = C.timings, U = PLNS.util;
  const $ = id => document.getElementById(id);

  async function open() {
    const lift = $('lift');
    $('lift-name').textContent = PLNS.visitor.name;

    // Show the CLOSED doors first, and hold so the visitor sees them.
    $('stage').dataset.phase = 'lift';
    lift.classList.add('show'); lift.setAttribute('aria-hidden', 'false');
    await U.sleep(T.liftClosedHold);

    // Then the doors slide apart onto the lift interior.
    lift.classList.add('open');
    await U.sleep(2600);

    loopWelcome();
  }

  // Slow, gentle looping welcome (types, holds, fades, repeats). No flashing.
  async function loopWelcome() {
    const el = $('lift-loop');
    let i = 0;
    while (true) {
      const line = C.liftLoop[i % C.liftLoop.length].replace('{name}', PLNS.visitor.name);
      el.classList.remove('dim');
      el.textContent = '';
      await U.type(el, line, T.typeLift);
      await U.sleep(T.liftLoopHold);
      el.classList.add('dim');
      await U.sleep(T.liftLoopFade);
      i++;
    }
  }

  return { open };
})();
