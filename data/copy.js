/* =====================================================================
   data/copy.js — ALL WORDING, LOGO PATHS, SWATCHES AND TIMINGS
   This is the file you edit most. Nothing here changes how the building
   is built; it only changes what it says and how long each step waits.
   Other editable files:  data/announcements.js (marquee)  ·  data/floors.js (floors)
   ===================================================================== */
const PLNS_COPY = {

  /* ---------- LOGO PICTURES ----------
     Put your PNG in assets/logos/ and change the path below. That is all.
     The placeholders (.svg) are drawn circles until your PNGs are added. */
  logos: {
    community: 'assets/logos/PureLoveCom.jpeg',  // gate seal AND the circle in the lift
    network:   'assets/logos/pure-love-network.png'     // shown on the welcome door
  },

  /* ---------- THE GATE ---------- */
  gateInscription: 'Pure Love Network of States',   // written on the top beam of the gate

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

  /* ---------- THE WELCOME DOOR ---------- */
  door: {
    greetingPrefix: 'Welcome, ',
    greetingSuffix: '.',
    message: 'You are free here. Feel comfortable, feel at home. ' +
             'This is a space that holds no justification for lack of love, only oneness.'
  },

  /* Typed under the door logo, after the logo has breathed */
  networkTitle: 'Pure Love Community Network of States Virtual Experience',
  enterLabel:   'Enter',

  /* ---------- INSIDE THE LIFT: WORDING ---------- */
  lift: {
    kicker:            'Welcome',                      // small word above the visitor's name
    title:             'Pure Love Network State',      // above the marquee
    subtitle:          'Virtual Experience',
    openControl:       'Open the floor control',       // spoken name of the logo button
    floorPanelHeading: 'Floors',
    youAreHere:        'You are here',
    resting:           'Resting',
    ascending:         'Ascending',
    descending:        'Descending',
    next:              'Next',
    to:                'To',
    arrived:           'Arrived',
    floor:             'Floor'                         // small word used with a floor number
  },

  /* ---------- THE WINGS (left and right of the lift) ---------- */
  wings: {
    left:       'Left wing',
    right:      'Right wing',
    explore:    'Explore',
    openLeft:   'Open the left wing',
    openRight:  'Open the right wing',
    back:       'Return to the lift',
    emptyWing:  'No entries yet'      // used in the Explore popup when a wing has no entries
  },

  /* The slow welcome that loops under the visitor's name in the lift.
     {name} is replaced by their name (shown in their colour).
     Add more lines to the list and they will loop one after another. */
  liftLoop: [
    '{name}, breathe. You are exactly where you belong.',
    'Everything here is held with love.',
    'Take your time. You are welcome as you are.'
  ],

  /* The single words that appear one at a time BELOW the floor indicator.
     "line" is an optional short sentence shown under the word. */
  liftWords: [
    { word: 'Awareness',     line: 'Awareness brings things into view.' },
    { word: 'Presence',      line: 'Love is a present state of being' },
    { word: 'Possibility',   line: 'thoughts are  energy force' },
    { word: 'Understanding', line: 'helps makes communication possible' },
    { word: 'Connection',    line: 'both sides feeling good' },
    { word: 'Expression',    line: 'Love is infinity is why Diversity' },
    { word: 'Love',          line: 'Love used itself to birth all' }
  ],

  /* ---------- COLOUR SWATCHES ----------
     Starting colours only. The last control in the popup opens the full
     spectrum, so any colour can be chosen. */
  defaultColour: '#C8A96A',
  swatches: ['#C8A96A', '#E08FA6', '#E5836B', '#E3B341', '#5FAE8E', '#4FA3A5', '#6DA7E0', '#9A7BD6'],

  /* ---------- TIMINGS (milliseconds unless it says seconds) ---------- */
  timings: {
    sealBreatheBeforeFade: 3500,  // seal breathes this long, then fades
    sealFade:              1800,
    gateOpen:              2600,  // matches the gate swing in css/entrance.css
    approach:              2600,  // gate and outside fade away as we move forward; then the dark stage
    beforePopup:           400,
    doorOpen:              2800,  // the welcome door swings open (matches css/door.css)
    advance:               4200,  // moving forward through the doorway into the lobby
    lobbyPause:            1800,  // the pause in the lobby before the lift appears
    typeDoor:              55,    // ms per character on the welcome door
    typeTitle:             60,
    typeLift:              85,    // slower in the lift (calm, no rush)
    logoBreatheBeforeTitle:3200,  // network logo breathes this long before the title types
    liftClosedHold:        1500,  // the closed lift doors are shown this long
    liftLoopHold:          5000,  // each lift line stays this long before fading
    liftLoopFade:          1800,
    wordsHold:             4500,  // each looping word stays this long
    wordsFade:             1800,
    floorTravel:           1600,  // time to pass ONE floor
    arrivedHold:           1800,  // "Arrived" stays this long
    marqueeSeconds:        45     // SECONDS for the marquee to make one slow pass
  }
};
