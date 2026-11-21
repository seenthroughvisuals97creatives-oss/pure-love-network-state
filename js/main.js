/* =====================================================================
   js/main.js — STARTS THE BUILDING
   Runs the entrance, then opens the lift. You rarely need to edit this.
   - Entrance steps: js/entrance.js
   - Lift: js/elevator.js
   - Wording, logos, timings: data/copy.js
   ===================================================================== */
(async function () {
  window.PLNS = window.PLNS || {};
  PLNS.started = true;                    // lets the page's self-check know this file loaded
  await PLNS.entrance.run();
  await PLNS.elevator.open();
})();
