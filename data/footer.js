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
    { label: 'Pure Love Community on Substack', short: 'Community', icon: 'community', url: 'https://substack.com/@purelovenetwork?utm_source=share&utm_medium=android&r=5zj5zo&utm_content=link_in_bio&fbclid=ZgZXh0bgNhZW0CMTEAcGRvZgRzcnRjBmFwcF9pZBAzNDE5NjI4MzA1MDI1OTE3AEOoxhcB1gusJUvNA05bT_fLx9CDc0IxDo2sMPezOBcGvPFhKB3qvyUkku-DrGmLiP8_aem_nYQfs5zrJaf3DoZPahZh7A&utm_id=97760_v0_s00_e0_tv3' },   // <- PASTE your Substack address
    { label: 'Pure Love Network of States',     short: 'Website',   icon: 'site',      url: 'https://pure-love-network.carrd.co/' }    // <- PASTE your network website address
  ],
  copyright: 'Pure Love Network of States'
};
