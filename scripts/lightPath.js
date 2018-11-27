
`use strict`

//......................................................................................................................

G.lightPath = method =>
{
  G.S.pathing = true

  let index = 0

  const pathLighter = setInterval(() =>
  {
    const cell = document.querySelector(`#` + G.S.path[index])

    cell.classList[method](`pat`)

    index ++

    if(index === G.S.path.length - 1)
    {
      G.S.pathing = false

      window.clearInterval(pathLighter)

      if(method === `remove`)
      {
        G.S.path = []

        G.updateLights()
      }
    }
  }, 30)
}

