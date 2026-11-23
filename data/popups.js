/* =====================================================================
   data/popups.js — THE FIVE MENU ITEMS AND THE WORDS IN THEIR POPUPS
   They appear in the lift's floating panel, under the floor numbers, in this order.
   TO RENAME AN ITEM:       change its  label.
   TO CHANGE A POPUP:       change its  title  or the sentences inside  body.
                            Each line inside body is one paragraph.
   TO REORDER:              move a whole { ... } block up or down.
   These are floating popups: they never change the floor.
   Membership and Join the Network are two separate experiences.
   The real Join form and the final wording are built in a later step; until then
   these popups carry short placeholder words (Membership has a DRAFT you can edit).
   ===================================================================== */
const PLNS_MENU = [
  {
    id: 'services',
    label: 'Our Services',
    title: 'Our Services',
    body: ['This space is being prepared.']
  },
  {
    id: 'membership',
    label: 'Membership',
    title: 'Membership',
    /* DRAFT wording — edit freely */
    body: [
      'Membership is for people and projects that already have their own space online and freely choose to stand with this community.',
      'You keep your website, your work and your voice. Your place in the building carries an image, a short description and a link to your own page: an association, not a service.',
      'Everyone here stands on the law of one: no justification for lack of love. What we do to ourselves, we do to another. We welcome genuine connection, and nothing less.'
    ]
  },
  {
    id: 'join',
    label: 'Join the Network',
    title: 'Join the Network',
    body: ['The joining form will open here.']
  },
  {
    id: 'announcements',
    label: 'Announcements',
    title: 'Announcements',
    body: ['Announcements will appear here.']
  },
  {
    id: 'exit',
    label: 'Exit',
    title: 'Exit',
    body: ['The exit journey is being prepared.']
  }
];
