
`use strict`

//......................................................................................................................

G.updateAim = () =>
{
  G.D.aim.style.marginLeft = G.D.ball.style.marginLeft
  G.D.aim.style.marginTop = G.D.ball.style.marginTop

  G.S.aim = G.S.ball

  if (G.S.hovered === `ball` && G.S.selected === G.S.holder.now
  || G.S.hovered === `ball` && G.S.selected === null
  || G.S.hovered === `ball` && G.S.selected === `ball`
  || G.S.hovered === null && G.S.selected === `ball`)
  {
    if (!G.S.placing && G.S.ball !== null && G.S.holder.now !== null)
    {
      const firstCell = G.S.athletes [G.S.holder.now]
      const lastCell = G.S.ball
      const nextCell = G.nextCell (firstCell, lastCell)
      const nextLetter = nextCell.slice (0, 1)
      const nextNumber = Number (nextCell.slice (1))

      const nextX = nextNumber * G.I.cellSize + G.I.borderFull
      const nextY = G.I.aToM.indexOf (nextLetter) * G.I.cellSize + G.I.borderFull

      G.D.aim.style.marginLeft = nextX + `px`
      G.D.aim.style.marginTop = nextY + `px`

      G.S.aim = nextCell
    }
  }
}

