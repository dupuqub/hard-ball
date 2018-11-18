
`use strict`

//......................................................................................................................
// TASK: UI buttons.
//
// Improve which buttons are shown, and how many.
// Make settings available with the central window if necessary.
// Make them work.

//......................................................................................................................
// TASK: Adjacent goals.
//
// Each goal should be a collection of 8 cells adjacent to the current goals that will not exist anymore.
// The new goals are a representation of an object on another dimension, therefore they don't count as common cells.
// Make "last cell on ball track" to check if the shot missed the adjacent goal.
// Make ball stay inside the adjacent goal.

//......................................................................................................................
// TASK: General polish.
//
// Console.
// Auto save.
// Make a general purpose central window.
// Make save/replace/load system work with the central window.
// Make end game effects work with central window.

//......................................................................................................................

onmousemove = event => G.mouseMove (event.target.id)
onclick = event => G.click (event.target.id)
onresize = event => G.resize ()

//......................................................................................................................

G.run = () =>
{
  G.check.tool ()

  window.requestAnimationFrame (G.run)
}

//......................................................................................................................

G.start = () =>
{
  if (localStorage.hardBallAutoSave !== undefined)
  {
    G.loadFile (`hardBallAutoSave`)
  }

  G.resize ()
  G.run ()
}

//......................................................................................................................

G.start ()

