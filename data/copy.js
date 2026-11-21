/* =====================================================================
   data/copy.js — ALL WORDING, LOGO PATHS, SWATCHES AND TIMINGS
   This is the file you edit most. Nothing here changes how the building
   is built; it only changes what it says and how long each step waits.
   ===================================================================== */
const PLNS_COPY = {

  /* ---------- LOGO PICTURES ----------
     Put your PNG in assets/logos/ and change the path below. That is all.
     The placeholders (.svg) are drawn circles until your PNGs are added. */
  logos: {
    community: 'assets/logos/community-logo.svg',  // gate seal (and, later, the lift's circle)
    network:   'assets/logos/network-logo.svg'     // shown on the welcome door
  },

  /* ---------- THE POPUP ---------- */
  personalise: {
    heading:      'Personalise your experience',
    nameLabel:    'What shall we call you?',
    namePlaceholder: 'Your name (optional)',
    colourLabel:  'Choose your colour',
    anyColour:    'Any colour',
    continue:     'Continue'
  },

  /* Used when the visitor leaves the name blank */
  anonymousName: 'friend',

  /* ---------- THE WELCOME DOOR ----------
     Typed in this order: greeting prefix + NAME (in their colour) + suffix,
     then the message. */
  door: {
    greetingPrefix: 'Welcome, ',
    greetingSuffix: '.',
    message: 'You are free here. Feel comfortable, feel at home. ' +
             'This is a space that holds no justification for lack of love, only oneness.'
  },

  /* Typed under the door logo, after the logo has breathed */
  networkTitle: 'Pure Love Community Network of States Virtual Experience',
  enterLabel:   'Enter',

  /* ---------- INSIDE THE LIFT ---------- {name} is replaced by their name.
     Add more lines to the list and they will loop one after another. */
  liftLoop: [
    '{name}, breathe. You are exactly where you belong.'
  ],

  /* ---------- COLOUR SWATCHES ----------
     Starting colours only. The last control in the popup opens the full
     spectrum, so any colour can be chosen. */
  defaultColour: '#C8A96A',
  swatches: ['#C8A96A', '#E08FA6', '#E5836B', '#E3B341', '#5FAE8E', '#4FA3A5', '#6DA7E0', '#9A7BD6'],

  /* ---------- TIMINGS (milliseconds) ---------- */
  timings: {
    sealBreatheBeforeFade: 3500,  // seal breathes this long, then fades
    sealFade:              1800,
    gateOpen:              2600,  // matches the gate swing in css/entrance.css
    beforePopup:           400,
    typeDoor:              55,    // ms per character on the welcome door
    typeTitle:             60,
    typeLift:              85,    // slower in the lift (calm, no rush)
    logoBreatheBeforeTitle:3200,  // network logo breathes this long before the title types
    liftClosedHold:        1500,  // the closed lift doors are shown this long
    liftLoopHold:          5000,  // each lift line stays this long before fading
    liftLoopFade:          1800
  }
};
