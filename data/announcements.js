/* =====================================================================
   data/announcements.js — THE MARQUEE IN THE LIFT (announcements)
   These flow from the logo circle to the right, slowly.
   TO ADD ONE:   add a line:  { text: 'Your words', link: '' },
   TO LINK IT:   put the web address between the quotes after  link:
                 (leave '' for plain text).
   TO REMOVE:    delete the line.
   This is separate from the looping words under the floor indicator
   (those are in data/copy.js -> liftWords).
   ===================================================================== */
const PLNS_ANNOUNCEMENTS = [
  { text: 'Free Gift of Remembrance', link: '' },
  { text: 'New projects',             link: '' },
  { text: 'Community expressions',    link: '' }
];
