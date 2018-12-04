
`use strict`

//......................................................................................................................

oncontextmenu = event => G.contextMenu(event)
onmousemove = event => G.mouseMove(event.target.id)
onkeydown = event => G.keyDown(event)
onresize = event => G.resize()
onclick = event => G.click(event.target.id)

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

  const array = G.langs[G.S.lang][1]
  const text =

      `<div style="margin-bottom:calc(var(--unit) * 40)">${array[0]}</div>`
    + `<div style="margin-bottom:calc(var(--unit) * 90)">${array[1]}</div>`
    + `<div class="cnt tra yes" onclick="G.vignette.hide()"></div>`

  G.vignette.show(text)
}

//......................................................................................................................

G.start()

