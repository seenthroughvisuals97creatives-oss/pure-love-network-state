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
     On the wing card ........ the picture and ONLY the title (on the soft gradient).
     In the Explore popup .... full picture, title, description, link buttons,
                               and the "Our agreement" button.
Syntax:
 {
    projectId:   'p-community-hub', 
    floor:       '1',
    wing:        'right',
    openness:    'open',          // 'open', 'summary' or 'private'
    title:       'Project name',
    image:       'assets/projects/community-hub.jpg',
    description: 'A short description.',
    links:       [ { label: 'Visit', url: 'https://...' } ]
    
   agreement: {
      intro:          'Write here, in plain words, what 97 Industry and the building agreed.',
      theyBring:      [ 'What this project brings (example line)' ],
      buildingBrings: [ 'What the building brings (example line)' ],
      bothIncrease:   'How both sides grow from this agreement.',
      agreedOn:       ''          // e.g. 'January 2027'
           }
  },


   HOW OPEN THE AGREEMENT IS  (always the project's own free choice)
     openness: 'open'      shows everything written in the agreement block
     openness: 'summary'   shows only what each side brings and how both grow
     openness: 'private'   shows a gentle note: private by mutual agreement
     (leave it out: 'open' if an agreement block exists, otherwise the gentle note)
   THE AGREEMENT TEXT (optional)
     agreement: { intro, theyBring:[...], buildingBrings:[...], bothIncrease, agreedOn }
   The headings on the agreement page are in PLNS_PROJECT_WORDS at the bottom.

   PICTURES: put them in assets/projects/. File names are case-sensitive on GitHub Pages:
   "97-Industry.png" and "97-industry.png" are different files.


   ===================================================================== */
const PLNS_PROJECTS = [
  {
        /* Floor one now present */
    projectId:   '97-community-hub', 
    floor:       '1',
    wing:        'left',
    openness:    'open',          // 'open', 'summary' or 'private'
    title:       '97-Community-Hub',
    image:       'assets/projects/community-hub.jpg',
    description: 'A short description.',
    links:       [ { label: 'Visit', url: 'https://7nine9seven.wixstudio.com/community-hub-97' } ],
    /* now present */
      agreement: {
      intro:          'Write here, in plain words, what 97 Community Hub and the building agreed.',
      theyBring:      [ 'What this project brings (example line)' ],
      buildingBrings: [ 'What the building brings (example line)' ],
      bothIncrease:   'How both sides grow from this agreement.',
      agreedOn:       ''          // e.g. 'January 2027'
           }
  },
      
  {
    projectId:   '97-industry',
    floor:       '1',
    wing:        'right',
    openness:    'open',          // 'open', 'summary' or 'private'
    title:       '97-Industry',
    image:       'assets/projects/97-Industry.png',
    description: 'A short description.',
    links:       [ { label: 'Visit', url: 'https://7nine9seven.wixsite.com/97-industry' } ],
    agreement: {
      intro:          'Write here, in plain words, what 97 Industry and the building agreed.',
      theyBring:      [ 'What this project brings (example line)' ],
      buildingBrings: [ 'What the building brings (example line)' ],
      bothIncrease:   'How both sides grow from this agreement.',
      agreedOn:       ''          // e.g. 'January 2027'
    }
  },

      /*  floor 2 now present */
{
    projectId:   '97 Art Galaxy', 
    floor:       '2',
    wing:        'left',
    openness:    'open',          // 'open', 'summary' or 'private'
    title:       'Project name',
    image:       'assets/projects/community-hub.jpg',
    description: 'A short description.',
    links:       [ { label: 'Visit', url: 'https://...' } ],
    
   agreement: {
      intro:          'Write here, in plain words, what 97 Industry and the building agreed.',
      theyBring:      [ 'What this project brings (example line)' ],
      buildingBrings: [ 'What the building brings (example line)' ],
      bothIncrease:   'How both sides grow from this agreement.',
      agreedOn:       ''          // e.g. 'January 2027'
           }
  },

     {
    projectId:   'world-within', 
    floor:       '2',
    wing:        'right',
    openness:    'open',          // 'open', 'summary' or 'private'
    title:       'World Within',
    image:       'assets/projects/community-hub.jpg',
    description: 'A short description.',
    links:       [ { label: 'Visit', url: 'https://...' } ],
    
   agreement: {
      intro:          'Write here, in plain words, what 97 Industry and the building agreed.',
      theyBring:      [ 'What this project brings (example line)' ],
      buildingBrings: [ 'What the building brings (example line)' ],
      bothIncrease:   'How both sides grow from this agreement.',
      agreedOn:       ''          // e.g. 'January 2027'
           }
  },

           /* now present */
      /* now present */
      /* now present */

   
];

/* The words on the agreement page and the buttons. Change freely. */
const PLNS_PROJECT_WORDS = {
  agreementButton: 'How we collaborate',
  openMark:        'Open agreement',
  privateNote:     'This collaboration is private by mutual agreement. It follows the network\u2019s principles: free will, mutual benefit, and no justification for lack of love.',
  noAgreement:     'This project has not shared its agreement. Openness is always a choice here, and every collaboration follows the network\u2019s principles.',
  agreementTitle:  'How we collaborate',
  intro:           'Shared freely, so anyone may read it, learn from it, and adapt it for their own harmony.',
  theyBring:       'What the project brings',
  buildingBrings:  'What the building brings',
  bothIncrease:    'How both sides increase',
  agreedOn:        'Agreed',
  back:            '← Back to the project',
  visit:           'Visit'
};
