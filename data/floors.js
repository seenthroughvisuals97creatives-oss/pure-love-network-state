/* =====================================================================
   data/floors.js — THE BUILDING'S FLOORS AND WINGS (architecture only)
   Hierarchy:  Building -> Floors -> Wings -> Wing Entries -> Project content.
   This file declares the STRUCTURE. It holds no project images.
   Projects themselves live in data/projects.js; entries here only point to them.

   TO RENAME A FLOOR:      change its  name  below.
   TO ADD A FLOOR:         copy a whole { id: ... } block, give it a NEW id and a new
                           label (the number or letter shown in the lift), and put it
                           in the order you want. The lift lists floors automatically.
   TO NAME A WING:         change  left.name  or  right.name  on that floor.
   The ground floor is the lobby behind the welcome door; the lift starts at floor 1.
   Floors 2 and 3 are PLACEHOLDERS until you tell me which projects go there.
   ===================================================================== */
const PLNS_BUILDING = {

  startFloor: 'floor-1',     // the floor the lift opens onto (an id from the list below).
                             // The GROUND FLOOR is the lobby you walk through before the lift, so it is not in the lift.

  floors: [
    {
      id: 'floor-1', label: '1', name: 'First floor',
      left:  { id: 'wing-1-left',  position: 'left',  name: '97 Community Hub', originWingId: null, entries: [] },
      right: { id: 'wing-1-right', position: 'right', name: '97 Industry',      originWingId: null, entries: [] }
    },
    {
      id: 'floor-2', label: '2', name: 'Second floor',
      left:  { id: 'wing-2-left',  position: 'left',  name: '', originWingId: null, entries: [] },
      right: { id: 'wing-2-right', position: 'right', name: '', originWingId: null, entries: [] }
    },
    {
      id: 'floor-3', label: '3', name: 'Third floor',
      left:  { id: 'wing-3-left',  position: 'left',  name: '', originWingId: null, entries: [] },
      right: { id: 'wing-3-right', position: 'right', name: '', originWingId: null, entries: [] }
    },
     {
      id: 'floor-4', label: '3', name: 'Fourth floor',
      left:  { id: 'wing-4-left',  position: 'left',  name: '', originWingId: null, entries: [] },
      right: { id: 'wing-4-right', position: 'right', name: '', originWingId: null, entries: [] }
     }
  ]
};

/* ---------------------------------------------------------------------
   WING ENTRY SHAPE (used when projects are added later)
   {
     entryId:       'entry-1-left-001',   // unique, never reused
     projectId:     'p-community-hub',    // which project in data/projects.js
     originEntryId: null,                 // set automatically when a wing is duplicated
     display:       { },                  // this entry's own display settings
     description:   '',                    // this entry's own description (if customised)
     destination:   ''                    // this entry's own link (if customised)
   }

   DUPLICATING A WING (the rule from the blueprint):
   A duplicate is a NEW independent wing. It starts as a copy, but changing,
   adding, removing or re-ordering entries in the duplicate never changes the
   original, because every entry gets its own new id and remembers where it came from.
   --------------------------------------------------------------------- */
function PLNS_duplicateWing(sourceWing, newWingId, newPosition) {
  let n = 0;
  return {
    id: newWingId,
    position: newPosition || sourceWing.position,
    name: sourceWing.name,
    originWingId: sourceWing.id,
    entries: sourceWing.entries.map(function (e) {
      n += 1;
      return {
        entryId: newWingId + '-entry-' + String(n).padStart(3, '0'),
        projectId: e.projectId,
        originEntryId: e.entryId,
        display: JSON.parse(JSON.stringify(e.display || {})),
        description: e.description || '',
        destination: e.destination || ''
      };
    })
  };
}
