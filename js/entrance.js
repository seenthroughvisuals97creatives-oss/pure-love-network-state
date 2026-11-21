/* =====================================================================
   js/entrance.js — THE ORDER OF THE ENTRANCE STEPS
   Wording and timings are NOT here: edit data/copy.js.
   Looks are NOT here: edit css/entrance.css.
   The visitor's name and colour are kept only for this visit
   (in memory). Nothing is saved to a database or to the browser.
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

  function setColour(hex) {
    PLNS.visitor.colour = hex;
    document.documentElement.style.setProperty('--visitor', hex);
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
    const popup = $('personalise'), door = $('door'), doorLogo = $('door-logo');

    buildPopup();

    // If a logo picture is missing, show a quiet gold ring and a plain-words note.
    // The sequence carries on either way: it never waits for a picture.
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

    // 2. The gate swings open on its hinges; the building behind comes into focus.
    stage.dataset.phase = 'gate-open';
    gate.classList.add('open');
    await U.sleep(T.gateOpen);
    await U.sleep(T.beforePopup);

    // 3. The dark popup asks for a name and a colour.
    stage.dataset.phase = 'personalise';
    popup.classList.add('show'); popup.setAttribute('aria-hidden', 'false');
    $('visitor-name').focus({ preventScroll: true });
    await askVisitor();
    popup.classList.remove('show'); popup.setAttribute('aria-hidden', 'true');
    await U.sleep(1100);

    // 4. The welcome door: the name (in their colour), then the warm message.
    gate.classList.add('gone');                         // the open gate fades as the door arrives
    stage.dataset.phase = 'door';
    door.classList.add('show'); door.setAttribute('aria-hidden', 'false');
    await U.sleep(1200);
    const greet = $('door-greeting');
    await U.type(greet, C.door.greetingPrefix, T.typeDoor);
    const nameSpan = document.createElement('span');
    nameSpan.style.color = PLNS.visitor.colour;       // THEIR colour
    greet.appendChild(nameSpan);
    await U.type(nameSpan, PLNS.visitor.name, T.typeDoor);
    await U.type(greet, C.door.greetingSuffix, T.typeDoor);
    await U.sleep(500);
    await U.type($('door-message'), C.door.message, T.typeDoor);

    // 5. The Network of States logo appears ON the door, breathes and stays.
    await U.sleep(600);
    $('door-logo').classList.add('visible');
    await U.sleep(T.logoBreatheBeforeTitle);

    // 6. The title types under the logo.
    await U.type($('door-title'), C.networkTitle, T.typeTitle);

    // 7. ENTER appears only now, after the typing has finished.
    const btn = $('enter-btn');
    btn.textContent = C.enterLabel;
    await U.sleep(400);
    btn.classList.add('visible');
    await new Promise(resolve => btn.addEventListener('click', resolve, { once: true }));
    door.classList.remove('show'); door.setAttribute('aria-hidden', 'true');
    await U.sleep(1300);
  }

  return { run };
})();
