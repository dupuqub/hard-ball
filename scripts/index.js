
`use strict`

//......................................................................................................................
// TO DO
//
// goal art
// console
// utilities (complex save/load)
// "HARD" and "BALL" on laterals
// initial fade from black
// autosave

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

