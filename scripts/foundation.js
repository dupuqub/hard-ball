
`use strict`

//......................................................................................................................

G.D = // dom (document object model)
{
  aim: document.querySelector(`#aim`),
  ball: document.querySelector(`#ball`),
  board: document.querySelector(`#board`),
  vignette: document.querySelector(`#vignette`),

  bulbs: document.querySelectorAll(`.bul`),
  zones: document.querySelectorAll(`.zon`),
  athletes: document.querySelectorAll(`.atl`),
  athleteArt: document.querySelectorAll(`.atlArt`),
  benchArt: document.querySelectorAll(`.bncArt`),
  selectors: document.querySelectorAll(`.atlSel`),
  blueLight: document.querySelectorAll(`.bluLgt`),
  blueDark: document.querySelectorAll(`.bluDrk`),
  greenLight: document.querySelectorAll(`.grnLgt`),
  greenDark: document.querySelectorAll(`.grnDrk`),
}

//......................................................................................................................

G.I = // information
{
  roundabout: [`A`,`B`,`K`,`L`],
  middle: [`F09`,`F10`,`G09`,`G10`],
  aToM: [`A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`I`,`J`,`K`,`L`,`M`],
  body: {w: 0, h: 0}, // px
  board: {w: 0, h: 0}, // px
  aspect: {w: 16, h: 9}, // proportion
  cellSize: 0, // px
  borderFull: 0, // px
  athleteSize: 0, // px

  area: // cells
  {
    blue: Array.from(G.D.blueLight).concat(Array.from(G.D.blueDark)).map(light => light.id).sort(),
    green: Array.from(G.D.greenLight).concat(Array.from(G.D.greenDark)).map(light => light.id).sort(),
  },

  goal: // cells
  {
    blue: [`C00`,`D00`,`E00`,`F00`,`G00`,`H00`,`I00`,`J00`],
    green: [`C19`,`D19`,`E19`,`F19`,`G19`,`H19`,`I19`,`J19`],
  },

  missList:
  [
    // blue goal
    {cell: `C00`, misses: [`B00`,`D00`,`B19`,`D01`]},
    {cell: `D00`, misses: [`C00`,`E00`]},
    {cell: `E00`, misses: [`D00`,`F00`]},
    {cell: `F00`, misses: [`E00`,`G00`]},
    {cell: `G00`, misses: [`F00`,`H00`]},
    {cell: `H00`, misses: [`G00`,`I00`]},
    {cell: `I00`, misses: [`H00`,`J00`]},
    {cell: `J00`, misses: [`I00`,`K00`,`I01`,`K19`]},

    // green goal
    {cell: `C19`, misses: [`B19`,`D19`,`B00`,`D18`]},
    {cell: `D19`, misses: [`C19`,`E19`]},
    {cell: `E19`, misses: [`D19`,`F19`]},
    {cell: `F19`, misses: [`E19`,`G19`]},
    {cell: `G19`, misses: [`F19`,`H19`]},
    {cell: `H19`, misses: [`G19`,`I19`]},
    {cell: `I19`, misses: [`H19`,`J19`]},
    {cell: `J19`, misses: [`I19`,`K19`,`I18`,`K00`]},
  ],
}

//......................................................................................................................
// "aim", "shot" and "zones" are here for better code visualization since they don't have to be persistent

G.S = // state
{
  path: [],
  turn: 0,
  pathing: false,
  placing: false,
  rounding: false,
  locked: false,
  replace: false,
  punting: false,
  oldCell: null, // cell or null
  aim: null, // cell or null
  ball: null, // cell or null
  first: null, // "green", "blue" or null
  pushed: null, // from 0 to 19 or null
  selected: null, // from 0 to 19, "ball" or null
  hovered: null, // from 0 to 19, "ball" or null
  takingShot: null, // "green", "blue" or null
  shot: {x: 0, y: 0}, // -1, 0 or 1
  holding: {turns: 0, team: null},
  holder: {now: null, future: null}, // from 0 to 19 or null
  keepers: {blue: null, green: null}, // from 0 to 19 or null
  replaced: {blue: [], green: []}, // from 0 to 19
  team: {blue: [], green: []}, // from 0 to 19
  zones: Array.from(G.D.zones).map(() => null), // cells or nulls
  athletes: Array.from(G.D.selectors).map(selector => `M` + selector.id.slice(7)), // cells
  starter:
  {
    blue: [`C02`,`D03`,`I03`,`J02`],
    green: [`C17`,`D16`,`I16`,`J17`],
  },
}

