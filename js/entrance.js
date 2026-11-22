/* =====================================================================
   js/entrance.js — THE ORDER OF THE ENTRANCE STORY
   Wording and timings are NOT here: edit data/copy.js.
   Looks are NOT here: css/entrance.css (gate, popup) and css/door.css (door, lobby).
   The visitor's name and colour are kept only for this visit
   (in memory). Nothing is saved to a database or to the browser.

   THE STORY, IN ORDER
    1. The community seal breathes in front of the closed gate, then fades.
    2. The gate swings open.
    3. The gate and the outside fade away as we move forward.
    4. The popup stands alone on a dark stage (name + colour).
    5. The door of the building appears; the welcome types on it.
    6. The Network of States logo breathes on the door; the title types; Enter appears.
    7. Enter: the door swings open, we move forward into the ground-floor lobby.
    8. A pause in the lobby, then the lift appears (js/elevator.js).
   ===================================================================== */
window.PLNS = window.PLNS || {};

PLNS.visitor = { name: '', colour: PLNS_COPY.defaultColour };

PLNS.util = (function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = ms => new Promise(r => setTimeout(r, reduce ? Math.min(ms, 250) : ms));
  // Types text into an element one character at a time.
  async function type(el, text, speed) {
    if (reduce) { el.append(text); return; }
    for (const ch of text) { el.append(ch); await sleep(speed); }
  }
  return { sleep, type, reduce };
})();

PLNS.entrance = (function () {
  const C = PLNS_COPY, T = C.timings, U = PLNS.util;
  const $ = id => document.getElementById(id);

  // How light a colour is (0 dark … 1 white). Used to keep the name field readable.
  function lightness(hex) {
    const n = parseInt(hex.slice(1), 16), r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  }

  function setColour(hex) {
    PLNS.visitor.colour = hex;
    document.documentElement.style.setProperty('--visitor', hex);
    // White field normally; a very light colour would vanish on white, so the field turns dark.
    $('visitor-name').classList.toggle('on-dark', lightness(hex) > 0.72);
  }

  // ---- Fill the popup with its wording and swatches (wording: data/copy.js) ----
  function buildPopup() {
    $('popup-heading').textContent = C.personalise.heading;
    $('popup-name-label').textContent = C.personalise.nameLabel;
    $('visitor-name').placeholder = C.personalise.namePlaceholder;
    $('popup-colour-label').textContent = C.personalise.colourLabel;
    $('popup-continue').textContent = C.personalise.continue;

    const box = $('swatches');
    const buttons = [];
    const select = (btn) => {
      buttons.forEach(b => b.setAttribute('aria-checked', b === btn ? 'true' : 'false'));
    };
    C.swatches.forEach((hex, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'swatch'; b.style.setProperty('--c', hex);
      b.setAttribute('role', 'radio'); b.setAttribute('aria-label', hex);
      b.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
      b.addEventListener('click', () => { select(b); setColour(hex); });
      buttons.push(b); box.appendChild(b);
    });
    // Last control: the browser's own colour field = the whole spectrum.
    const any = document.createElement('label');
    any.className = 'swatch swatch-any'; any.title = C.personalise.anyColour;
    any.setAttribute('role', 'radio'); any.setAttribute('aria-checked', 'false');
    any.setAttribute('aria-label', C.personalise.anyColour);
    const input = document.createElement('input'); input.type = 'color'; input.value = C.defaultColour;
    input.addEventListener('input', () => {
      buttons.forEach(b => b.setAttribute('aria-checked', 'false'));
      any.setAttribute('aria-checked', 'true');
      setColour(input.value);
    });
    any.appendChild(input); box.appendChild(any);
    buttons.push(any);
    setColour(C.defaultColour);
  }

  // Resolves when the visitor presses Continue.
  function askVisitor() {
    return new Promise(resolve => {
      $('personalise').addEventListener('submit', e => {
        e.preventDefault();
        PLNS.visitor.name = $('visitor-name').value.trim() || C.anonymousName;
        resolve();
      }, { once: true });
    });
  }

  async function run() {
    const stage = $('stage'), gate = $('gate'), seal = $('seal'), sealImg = $('seal-img');
    const popup = $('personalise'), entry = $('entry'), doorLogo = $('door-logo');

    buildPopup();
    $('gate-inscription').textContent = C.gateInscription;

    // If a logo picture is missing, show a quiet gold ring and a plain-words note.
    // The story carries on either way: it never waits for a picture.
    sealImg.addEventListener('error', () => {
      seal.classList.add('broken');
      PLNS_warn('The community logo was not found at "' + C.logos.community + '". Check the file is in assets/logos/ and the path in data/copy.js matches it exactly.');
    });
    doorLogo.addEventListener('error', () => {
      doorLogo.classList.add('broken');
      PLNS_warn('The Network of States logo was not found at "' + C.logos.network + '". Check the file is in assets/logos/ and the path in data/copy.js matches it exactly.');
    });
    sealImg.src = C.logos.community;
    doorLogo.src = C.logos.network;

    // 1. Community logo seal breathes in front of the closed gate, then fades.
    await U.sleep(T.sealBreatheBeforeFade);
    seal.classList.add('fade');
    await U.sleep(T.sealFade);

    // 2. The gate swings open on its hinges; the tower behind comes into focus.
    stage.dataset.phase = 'gate-open';
    gate.classList.add('open');
    await U.sleep(T.gateOpen);

    // 3. The gate and the outside fade away as we move forward. Dark stage rises.
    stage.dataset.phase = 'approach';
    gate.classList.add('gone');
    await U.sleep(T.approach);
    await U.sleep(T.beforePopup);

    // 4. The popup stands ALONE on the dark stage: name and colour.
    stage.dataset.phase = 'personalise';
    popup.classList.add('show'); popup.setAttribute('aria-hidden', 'false');
    $('visitor-name').focus({ preventScroll: true });
    await askVisitor();
    popup.classList.remove('show'); popup.setAttribute('aria-hidden', 'true');
    await U.sleep(1500);

    // 5. The door of the building appears; the welcome types on it (name in their colour).
    stage.dataset.phase = 'door';
    entry.classList.add('show'); entry.setAttribute('aria-hidden', 'false');
    await U.sleep(1800);
    const greet = $('door-greeting');
    await U.type(greet, C.door.greetingPrefix, T.typeDoor);
    const nameSpan = document.createElement('span');
    nameSpan.style.color = PLNS.visitor.colour;       // THEIR colour
    greet.appendChild(nameSpan);
    await U.type(nameSpan, PLNS.visitor.name, T.typeDoor);
    await U.type(greet, C.door.greetingSuffix, T.typeDoor);
    await U.sleep(500);
    await U.type($('door-message'), C.door.message, T.typeDoor);

    // 6. The Network of States logo appears ON the door, breathes and stays; then the title types.
    await U.sleep(600);
    doorLogo.classList.add('visible');
    await U.sleep(T.logoBreatheBeforeTitle);
    await U.type($('door-title'), C.networkTitle, T.typeTitle);

    // ENTER appears only after the typing has finished.
    const btn = $('enter-btn');
    btn.textContent = C.enterLabel;
    await U.sleep(400);
    btn.classList.add('visible');
    await new Promise(resolve => btn.addEventListener('click', resolve, { once: true }));
    btn.disabled = true;

    // 7. The door swings open, then we move forward through the doorway into the lobby.
    entry.classList.add('door-open');
    await U.sleep(T.doorOpen);
    stage.dataset.phase = 'advance';
    entry.classList.add('advance');
    await U.sleep(T.advance);

    // 8. A pause in the lobby, the lift ahead. Then the scene dissolves into the lift.
    await U.sleep(T.lobbyPause);
    entry.classList.add('leave');
    await U.sleep(700);
  }

  return { run };
})();
