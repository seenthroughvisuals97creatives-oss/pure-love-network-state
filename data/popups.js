/* =====================================================================
   data/popups.js — THE FIVE MENU ITEMS AND THE WORDS IN THEIR POPUPS
   They appear in the lift's floating panel, under the floor numbers, in this order.
   All popups SCROLL, so the words can be as long as you need.

   TO RENAME AN ITEM:        change its  label.
   TO CHANGE A POPUP'S WORDS: edit the quoted sentences. Each quoted line is one paragraph
                              (or one bullet, where it sits inside  list: [ ... ]).
   TO ADD A HEADED SECTION:   copy a whole  { heading: '...', paragraphs: [...] }  block.
   TO REORDER:                move a whole { ... } block up or down.
   The Join form (its fields and where it is emailed) is in data/joinform.js.
   The floating popups never change the floor.

   ALL THE WORDS BELOW ARE A DRAFT built from what you told me. Edit freely.
   ===================================================================== */
const PLNS_MENU = [
  /* ---------------------------------------------------------------- 1. OUR SERVICES */
  {
    id: 'services', kind: 'text',
    label: 'Our Services',
    title: 'Our Services',
    sections: [
      { heading: '', paragraphs: [
        'Everything here is offered in the spirit of oneness: what we do to another, we do to ourselves, and like energy attracts like energy.'
      ] },
      { heading: 'Live online sessions', paragraphs: [
        'Live streams and Zoom gatherings where we talk, listen and practise love together. Sessions we go live with on Substack are also published on YouTube, so more people can join us, now or later.'
      ] },
      { heading: 'Gift of Remembrance', paragraphs: [
        'A gift, freely given, to help each of us remember what is already true: that love is natural, that we are connected, and that nothing has to be earned to deserve it.'
      ] },
      { heading: 'Creative expression', paragraphs: [
        'Creative work built around oneness, made to express love and bring people together.'
      ] },
      { heading: 'The community on Substack', paragraphs: [
        'The Pure Love Community on Substack is where we gather. Each voice is heard on its own, and all of them together, in a space people already know how to use.'
      ] }
    ]
  },

  /* ---------------------------------------------------------------- 2. MEMBERSHIP
     Visitors must read this to the end before the Join form will let them join
     (the tick box in the form ticks itself when they reach the last line). */
  {
    id: 'membership', kind: 'membership',
    label: 'Membership',
    title: 'Membership',
    sections: [
      { heading: '', paragraphs: [
        'Being present in the building is not the same as being forced into membership. Visitors are free to explore.',
        'Membership is a choice, made freely and in the open, by people and projects who already have their own space online and want to stand with this community.'
      ] },
      { heading: 'What you stand for when you join', paragraphs: [
        'By joining you say that you are actively ready and willing to:'
      ], list: [
        'Collaborate and contribute, not only receive.',
        'Promote positivity in the way you speak, work and connect.',
        'Stand against any justification for lack of love.',
        'Renounce the idea of bringing anyone down.'
      ], after: [
        'To be a member is to live love, not only to say it. You choose, consciously and intentionally, to express love, to amplify it and to expand it. You choose to feel good simply because you exist, not because something makes you more valuable.'
      ] },
      { heading: 'What this building holds', list: [
        'No racism.',
        'No prejudice or discrimination.',
        'No hate.',
        'No exploitation or forced participation.',
        'No performance or pretence in place of authenticity.',
        'No stealing of other people\'s ideas.',
        'Openness to genuine collaboration.',
        'Respect for free will and individual expression.',
        'Partnerships where both sides have room to benefit and grow.'
      ] },
      { heading: 'Connections that grow both sides', paragraphs: [
        'This is not about one person gaining while another does not. We look for connections where both sides increase.',
        'A connection that favours only one side works against itself. That is why you decide what you connect with, and nothing is forced on you. It is how we know a connection is worth having.'
      ] },
      { heading: 'You keep what is yours', paragraphs: [
        'You keep your own website, your work and your voice. Your place in the building carries an image, a short description and a link to your own page. It is an association, by free will and shared values. We do not build or run your website.'
      ] },
      { heading: 'If the agreement is broken', paragraphs: [
        'If any of this is breached, you are removed from the building indefinitely. You can still visit and see the building, but you no longer appear in it.',
        'This is not because you do not deserve a second chance. It is simply the agreement, which you read and accepted freely.'
      ] },
      { heading: 'A transparent agreement', paragraphs: [
        'Your membership is a public, transparent agreement to help future generations live together in harmony. Anyone can look at it, learn from it, and choose to follow it. An agreement that increases both sides shows how people can work together without fighting or trying to bring each other down.'
      ] }
    ],
    closing: 'You have reached the end. Nothing here is forced on you. Joining is, and always was, your free will.'
  },

  /* ---------------------------------------------------------------- 3. JOIN THE NETWORK
     The form itself: data/joinform.js (fields, options, wording, and where it is emailed). */
  {
    id: 'join', kind: 'form',
    label: 'Join the Network',
    title: 'Join the Network'
  },

  /* ---------------------------------------------------------------- 4. ANNOUNCEMENTS
     The glowing box at the top is the NEWEST thing (a live session, a Zoom meeting, a new project).
     Below it, the marquee announcements (data/announcements.js) are listed.
     To show something new: fill in title, text (and a link if you like). Leave title and text
     empty ('') to show the quiet default words. */
  {
    id: 'announcements', kind: 'announcements',
    label: 'Announcements',
    title: 'Announcements',
    newest: {
      tag: 'Newest',
      title: '',
      text: '',
      link: '',            // e.g. a Zoom or Substack address
      linkLabel: 'Open',
      quiet: 'When there is a live session, a Zoom meeting or a new project, it appears here first.'
    },
    moreHeading: 'From the building'
  },

  /* ---------------------------------------------------------------- 5. EXIT
     A warm goodbye, not a cold door. "Leave the building" sends the visitor back to the
     entrance, or to the web address in leaveUrl (leave '' for the entrance). */
  {
    id: 'exit', kind: 'exit',
    label: 'Exit',
    title: 'Before you go',
    paragraphs: [
      'Thank you for being here.',
      'Thank you for oneness. Thank you for forgiveness. Thank you for the love that holds every life.',
      'You are free to stay, free to leave, and free to come back whenever you wish. The doors are never locked.'
    ],
    stay: 'Stay in the building',
    leave: 'Leave the building',
    leaveUrl: ''
  }
];

/* ---------------------------------------------------------------- FOOTER LINKS
   Shown quietly at the bottom of every popup. A line with an empty  url  is hidden,
   so put your Substack address here when you are ready. */
const PLNS_FOOTER = [
  { label: 'Pure Love Community on Substack', url: '' },
  { label: 'Pure Love Network of States',     url: '' }
];
