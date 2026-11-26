/* =====================================================================
   data/footer.js — THE FOOTER LINKS (Substack community + your websites) AND COPYRIGHT
   A slim glass bar under the lift (after the doors open), and the same links at the
   bottom of every popup. THIS IS THE ONE PLACE YOU PASTE YOUR ADDRESSES.

   TO ADD AN ADDRESS:  put it between the quotes after  url:   (start with https://)
                       A link whose url is empty '' stays hidden until you fill it in.
   TO RENAME A LINK:   change  label  (long, for popups and desktop)  and  short  (small phones).
   TO ADD ANOTHER:     copy a whole  { ... },  line. icon can be  'community'  or  'site'.
   COPYRIGHT:          the year updates itself. Change the name in  copyright  if you like.
   Looks: css/footer.css.   Behaviour: js/footer.js.
   ===================================================================== */
const PLNS_SITE_FOOTER = {
  links: [
    { label: 'Pure Love Community on Substack', short: 'Community', icon: 'community', url: '' },   // <- PASTE your Substack address
    { label: 'Pure Love Network of States',     short: 'Website',   icon: 'site',      url: '' }    // <- PASTE your network website address
  ],
  copyright: 'Pure Love Network of States'
};
