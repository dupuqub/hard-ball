
`use strict`

//......................................................................................................................
// TASK: General polish.
//
// Console.
// Auto save.
// Make a general purpose central window.
// Make save/replace/load system work with the central window.
// Make end game effects work with the central window.

//......................................................................................................................
// TASK: UI buttons.
//
// Improve which buttons are shown, and how many.
// Make settings available with the central window if necessary.
// Make them work.

//......................................................................................................................

onmousemove = event => G.mouseMove(event.target.id)
onclick = event => G.click(event.target.id)
onresize = event => G.resize()

//......................................................................................................................

G.run = () =>
{
  G.check.tool()

  window.requestAnimationFrame(G.run)
}

//......................................................................................................................

G.start = () =>
{
  if(localStorage.hardBallAutoSave !== undefined)
  {
    G.loadFile(`hardBallAutoSave`)
  }

  G.resize()
  G.run()
}

//......................................................................................................................

G.start()

