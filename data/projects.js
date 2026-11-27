/* =====================================================================
   data/projects.js — THE PROJECT LIBRARY  (this is the ONE file you edit to add a project)
   Each project is one block { ... } inside the list below. Copy a block to add another.

   WHERE A PROJECT APPEARS  (this answers "which floor, which wing?")
     floor: '1'        the floor's label: '1', '2' or '3'   (as shown on the lift panel)
     wing:  'left'     'left' or 'right'
   Leave floor/wing out and the project is saved but NOT shown anywhere yet.
   The name written on top of each wing frame (e.g. "97 Industry") is NOT here:
   it is the wing's name in data/floors.js (floor -> left/right -> name).

   WHAT SHOWS
     On the wing card ........ the picture, and under it: the title, the tagline (short slogan)
                               and up to 3 small tags.
     In the Explore popup .... full picture, title, tagline, the full description, the bullet
                               points, link buttons, and the "How we collaborate" button.

   SAMPLE (copy this block to add a project, then change the words):
   {
     projectId:   'p-sample',               // short, no spaces, never reused
     floor:       '1',
     wing:        'right',
     openness:    'open',                   // 'open', 'summary' or 'private'
     title:       'Project name',
     image:       'assets/projects/sample.jpg',
     tagline:     'One short line: what the project does.',        // shows on the card AND in the popup
     tags:        [ 'Tag one', 'Tag two', 'Tag three' ],           // the card shows the first 3
     description: 'The full description. Shows in the popup only.',
     points:      [ 'A bullet point', 'Another bullet point' ],    // bullets in the popup
     links:       [ { label: 'Visit', url: 'https://...' } ],
     agreement: {
       intro:          'In plain words, what this project and the building agreed.',
       theyBring:      [ 'What this project brings' ],
       buildingBrings: [ 'What the building brings' ],
       bothIncrease:   'How both sides grow from this agreement.',
       agreedOn:       ''                   // e.g. 'January 2027'
     }
   },

   HOW OPEN THE AGREEMENT IS  (always the project's own free choice)
     openness: 'open'      shows everything written in the agreement block
     openness: 'summary'   shows only what each side brings and how both grow
     openness: 'private'   shows a gentle note: private by mutual agreement
     (leave it out: 'open' if an agreement block exists, otherwise the gentle note)
   The headings on the agreement page are in PLNS_PROJECT_WORDS at the bottom.

   PICTURES: put them in assets/projects/ and only write the path here (never paste a picture
   into this file). File names are case-sensitive on GitHub Pages, so use small letters only.
   KEEP PICTURES LIGHT: save each as .webp, about 1024 pixels wide, under 300 KB.
   ===================================================================== */
const PLNS_PROJECTS = [

  /* ---------------- FLOOR 1 · LEFT WING ---------------- */
  {
    projectId:   '97-community-hub',
    floor:       '1',
    wing:        'left',
    openness:    'open',
    title:       '97 Community Hub',
    image:       'assets/projects/97-community-hub.webp',
    tagline:     'Websites, design and smart IT solutions, built around people.',
    tags:        [ 'Web Development', 'Custom IT Solutions', 'AI Integration' ],
    description: 'Nine Seven Community-Hub is a heart-centred IT service for businesses and individuals who want a strong digital presence. We build websites, design them to feel unique, keep them running smoothly and securely, and shape custom IT solutions, including AI integration, around your own needs, challenges and vision. More than IT solutions, we put people, connection and empowerment first, with a warm, person-centred approach. Build. Connect. Grow.',
    points:      [
      'Web development and unique, user-centred designs',
      'Design, communication and ongoing maintenance, so your site stays up and secure',
      'Custom IT solutions tailored to your needs',
      'AI integration for businesses and individuals',
      'Book a consultation to get started'
    ],
    links:       [ { label: 'Visit', url: 'https://7nine9seven.wixstudio.com/community-hub-97' } ],
    agreement: {
      intro:          'Write here, in plain words, what 97 Community Hub and the building agreed.',
      theyBring:      [ 'What this project brings (example line)' ],
      buildingBrings: [ 'What the building brings (example line)' ],
      bothIncrease:   'How both sides grow from this agreement.',
      agreedOn:       ''
    }
  },

  /* ---------------- FLOOR 1 · RIGHT WING ---------------- */
  {
    projectId:   '97-industry',
    floor:       '1',
    wing:        'right',
    openness:    'open',
    title:       '97 Industry',
    image:       'assets/projects/97-industry.webp',
    tagline:     'Powering Africa’s rise, one connection at a time.',
    tags:        [ 'Clean Energy', 'Solar & Wind', 'Energy Storage' ],
    description: '97 Industry stands for Africa, energy and independence: power independent. It looks at energy as a whole, with sunlight and wind captured as clean power, stored in batteries, and carried through the grid to homes, towns and cities. The aim is simple and bold: families and communities across Africa who can power their own future, with energy they can count on, one connection at a time.',
    points:      [
      'Clean power from the sun and the wind',
      'Energy storage, so power is there when it is needed',
      'Grid and infrastructure that connect homes, towns and cities',
      'A path toward energy independence for Africa'
    ],
    links:       [ { label: 'Visit', url: 'https://7nine9seven.wixsite.com/97-industry' } ],
    agreement: {
      intro:          'Write here, in plain words, what 97 Industry and the building agreed.',
      theyBring:      [ 'What this project brings (example line)' ],
      buildingBrings: [ 'What the building brings (example line)' ],
      bothIncrease:   'How both sides grow from this agreement.',
      agreedOn:       ''
    }
  },

  /* ---------------- FLOOR 2 · LEFT WING ---------------- */
  {
    projectId:   '97-art-galaxy',
    floor:       '2',
    wing:        'left',
    openness:    'open',
    title:       '97 Art Galaxy',
    image:       'assets/projects/97-art-galaxy.webp',
    tagline:     'Ideas become visible here.',
    tags:        [ 'Visual Identity', 'Graphic Design', 'Storytelling' ],
    description: '97 Art Galaxy is the gallery of 97 Creative Management: visual identity, graphic design, storytelling and digital experiences created to bring ideas into form. Step in and the work opens around you, from identity and graphics to stories, digital pieces and whole worlds, with a row of moments that keeps scrolling past like a living gallery wall. It is where an idea first becomes something you can see. Create. Inspire. Connect.',
    points:      [
      'Visual identity and graphic design',
      'Storytelling and digital experiences',
      'Worlds to explore, from first idea to finished image',
      'A scrolling gallery of moments, so you see where the idea came from'
    ],
    links:       [ { label: 'Visit', url: 'https://seenthroughvisuals97creatives-oss.github.io/97-art-Galaxy/97-art-galaxy.html' } ],
    agreement: {
      intro:          'Write here, in plain words, what 97 Art Galaxy and the building agreed.',
      theyBring:      [ 'What this project brings (example line)' ],
      buildingBrings: [ 'What the building brings (example line)' ],
      bothIncrease:   'How both sides grow from this agreement.',
      agreedOn:       ''
    }
  },

  /* ---------------- FLOOR 2 · RIGHT WING ---------------- */
  {
    projectId:   'world-within',
    floor:       '2',
    wing:        'right',
    openness:    'open',
    title:       'World Within',
    image:       'assets/projects/world-within.webp',
    tagline:     'Visual identity and storytelling for neurodivergent creators.',
    tags:        [ 'Self-Expression', 'Storytelling', 'Identity' ],
    description: 'World Within, from Seen Through Visuals, is visual identity and storytelling design for neurodivergent creators. Every person carries a world, and this is a gentle journey of self-expression, story and identity: be seen, be you, own your unique path, and find your community. You are loved here.',
    points:      [
      'Self-expression: be seen, be you',
      'Storytelling: your story matters',
      'Identity: own your unique path',
      'Connection: find your community'
    ],
    links:       [ { label: 'Visit', url: 'https://97divegentspirit-collab.github.io/world-within/index.html' } ],
    agreement: {
      intro:          'Write here, in plain words, what World Within and the building agreed.',
      theyBring:      [ 'What this project brings (example line)' ],
      buildingBrings: [ 'What the building brings (example line)' ],
      bothIncrease:   'How both sides grow from this agreement.',
      agreedOn:       ''
    }
  }

];

/* The words on the agreement page and the buttons. Change freely. */
const PLNS_PROJECT_WORDS = {
  agreementButton: 'How we collaborate',
  openMark:        'Open agreement',
  privateNote:     'This collaboration is private by mutual agreement. It follows the network’s principles: free will, mutual benefit, and no justification for lack of love.',
  noAgreement:     'This project has not shared its agreement. Openness is always a choice here, and every collaboration follows the network’s principles.',
  agreementTitle:  'How we collaborate',
  intro:           'Shared freely, so anyone may read it, learn from it, and adapt it for their own harmony.',
  theyBring:       'What the project brings',
  buildingBrings:  'What the building brings',
  bothIncrease:    'How both sides increase',
  agreedOn:        'Agreed',
  back:            '← Back to the project',
  visit:           'Visit'
};
