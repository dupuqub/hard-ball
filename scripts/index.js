
`use strict`

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
  if(localStorage.hardBallInitialState === undefined) localStorage.hardBallInitialState = JSON.stringify(G.S)
  if(localStorage.hardBallAutoSave !== undefined) G.loadFile(`hardBallAutoSave`)

  G.resize()
  G.run()
}

//......................................................................................................................

G.start()

