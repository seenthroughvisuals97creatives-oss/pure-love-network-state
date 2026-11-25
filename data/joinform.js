/* =====================================================================
   data/joinform.js — THE JOIN THE NETWORK FORM
   Where the form goes, which questions it asks, and every word on it.

   ---- HOW THE ENTRIES REACH YOUR EMAIL (read this once) ----
   This site is static (GitHub Pages), so it has no server of its own. A free form service
   receives each entry and EMAILS it to you. Easiest two:
     A) FORMSPREE  (formspree.io): make a free form, set the email to yours,
        copy the address it gives you (looks like  https://formspree.io/f/abcdwxyz)
        and paste it into  endpoint  below. Leave accessKey empty.
     B) WEB3FORMS  (web3forms.com): enter your email, they email you an "access key".
        Paste  https://api.web3forms.com/submit  into  endpoint  and the key into  accessKey.
   Until  endpoint  is filled in, the form says plainly that it is not connected yet
   (so no visitor ever thinks they joined when nothing was sent).
   fallbackEmail (optional): if the form service ever fails, the visitor is offered a button
   that opens their own email app addressed to you. If endpoint is empty but fallbackEmail is
   filled, the form simply opens the visitor's email app, ready to send.
   ===================================================================== */
const PLNS_JOIN = {
  endpoint: '',                // <- PASTE the Formspree or Web3Forms address here
  accessKey: '',               // <- Web3Forms only
  fallbackEmail: '',           // <- your email address (optional safety net)
  subject: 'New Join the Network request',

  intro: [
    'Joining is your free choice. This short form is all we need for now. Afterwards we will email you to collect your description and image, so your place in the building is just as you want it.'
  ],

  labels: {
    name: 'Your name',
    email: 'Your email',
    link: 'Your website or link',
    about: 'Who you are and what you do, in a few lines',
    contribute: 'How would you like to contribute?',
    otherWhat: 'Tell us how else you could contribute',
    thinking: 'In your own words: what does genuine connection mean to you?',
    optional: '(optional)'
  },

  /* The ways to contribute. Add, remove or rename lines freely.
     The line with  other: true  opens a box for the visitor's own idea. Keep one if you want it. */
  contributeOptions: [
    { text: 'Present my project or business in the building' },
    { text: 'Collaborate with other members' },
    { text: 'Host or join an online session' },
    { text: 'Offer a free gift or session to the community' },
    { text: 'Help the community grow: share, invite, support' },
    { text: 'Another way', other: true }
  ],

  /* The Membership must be read to the end. Reading it ticks the box for the visitor. */
  readButton: 'Read the Membership',
  readNeeded: 'Please read the Membership first. When you reach its last line, the box below ticks itself.',
  readDone: 'You have read the Membership.',
  agreeLabel: 'I have read the Membership. I join by my own free will, ready to collaborate and contribute, to promote positivity, and to stand against any justification for lack of love.',

  submit: 'Join the Network',
  sending: 'Sending...',
  needs: 'To join: add your name and email, and read the Membership.',
  privacy: 'Your details are sent to the Pure Love Network of States team by email. We use them only to reply to you.',

  /* After a successful send */
  thanks: {
    title: 'Thank you',
    paragraphs: [
      'Your request has reached us.',
      'We will email you soon to collect your short description and image. Nothing is forced on you at any point. You remain free.'
    ],
    close: 'Close'
  },

  /* If something goes wrong */
  error: 'Something went wrong and your request was not sent. Please try again in a moment.',
  errorEmail: 'Send by email instead',
  notConnected: 'This form is not connected to an email yet, so nothing was sent. (Owner: see data/joinform.js.)',
  mailOpened: 'Your email app should have opened with your answers ready. Press send there to finish.'
};
