
`use strict`

//......................................................................................................................

G.pushAthlete = () =>
{
  const pushed = G.S.pushed
  const selectedCell = G.S.oldCell
  const pushedCell = G.S.athletes [pushed]
  const newCell =

      G.S.replace
    ? G.celler (`M`, pushed)
    : G.nextCell (selectedCell, pushedCell)

  //....................................................................................................................
  // update future holder . part 1

  if (pushed !== null)
  {
    if (pushed === G.S.holder.future
    || pushed === G.S.holder.now && null === G.S.holder.future
    || pushed === G.S.holder.now && pushed === G.S.holder.future)
    {
      G.S.holder.future = G.S.selected
    }
  }

  //....................................................................................................................
  // update future holder . part 2
  //
  // to prioritize the defensive team, every pushed athlete may disrupt the ball at its path

  if (G.S.ball === newCell
  || G.S.ball === null && G.I.middle.indexOf (newCell) !== -1
  || G.S.path.indexOf (newCell) !== -1)
  {
    G.S.holder.future = pushed
  }

  //....................................................................................................................

  G.S.pushed = null
  G.S.oldCell = null

  G.move (pushed, newCell)
}

