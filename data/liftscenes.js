/* =====================================================================
   data/liftscenes.js — THE LIFT WALL PICTURES THAT CHANGE WITH THE TIME OF DAY
   The lift follows the visitor's OWN local time (their phone or computer clock).
   When the time moves into the next slot, the picture crossfades slowly. No flashing.

   TO ADD YOUR PICTURES:
     1. Upload your four images into the folder  assets/elevator/
     2. Write each file name in the  image:  line below, for example
            image: 'assets/elevator/morning.jpg'
        An empty  ''  means "no picture for this time": the floral wall shows alone.
   TO CHANGE WHEN EACH SLOT STARTS: change  from:  (the hour, 0 to 23, on a 24-hour clock).
        A slot lasts until the next slot starts. Night wraps past midnight automatically.
   TO MAKE A PICTURE STRONGER OR FAINTER: change  strength  (0 to 1). Lower = fainter,
        so the writing in the lift stays easy to read. A soft ivory veil is always laid over it.
   Tip: use landscape or square pictures, under 400 KB each, so the site stays light.
   ===================================================================== */
const PLNS_LIFT_SCENES = {
  fadeSeconds: 6,     // seconds the picture takes to melt into the next one
  strength: 0.7,      // how strong the pictures show (0 to 1)
  scenes: [
    { name: 'morning',   from: 5,  image: '' },   // 5:00 to 11:59   e.g. 'assets/elevator/morning.jpg'
    { name: 'afternoon', from: 12, image: '' },   // 12:00 to 16:59  e.g. 'assets/elevator/afternoon.jpg'
    { name: 'evening',   from: 17, image: '' },   // 17:00 to 20:59  e.g. 'assets/elevator/evening.jpg'
    { name: 'night',     from: 21, image: '' }    // 21:00 to 4:59   e.g. 'assets/elevator/night.jpg'
  ]
};
