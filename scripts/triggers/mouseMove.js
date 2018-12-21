
`use strict`

//......................................................................................................................

G.mouseMove = event =>
{
  const {id} = event.target
  G.S.hovered =

      id === `ball`
    ? `ball`
    : id.slice(0, 7) === `athlete`
    ? Number(id.slice(7))
    : null

  G.updateZoneCells()
  G.updateBoardConsole(event)
}

