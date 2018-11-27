
`use strict`

//......................................................................................................................

G.move = (athlete, zoneCell) =>
{
  //....................................................................................................................

  const zoneLetter = zoneCell.slice(0, 1)
  const zoneNumber = Number(zoneCell.slice(1))
  const newX = zoneNumber * G.I.cellSize + G.I.borderFull
  const newY = G.I.aToM.indexOf(zoneLetter) * G.I.cellSize + G.I.borderFull

  G.S.locked = true
  G.S.athletes[athlete] = zoneCell
  G.D.athletes[athlete].style.marginLeft = newX + `px`
  G.D.athletes[athlete].style.marginTop = newY + `px`

  //....................................................................................................................

  const event =
  {
    //..................................................................................................................

    clear: true,

    //..................................................................................................................

    test: () =>
    {
      const boardRect = G.D.board.getBoundingClientRect()
      const athleteRect = G.D.athletes[athlete].getBoundingClientRect()
      const athleteX = Math.floor(athleteRect.x - boardRect.x - G.I.borderFull / 2)
      const athleteY = Math.floor(athleteRect.y - boardRect.y - G.I.borderFull / 2)
      const marginX = Math.floor(Number(G.D.athletes[athlete].style.marginLeft.slice(0, -2)))
      const marginY = Math.floor(Number(G.D.athletes[athlete].style.marginTop.slice(0, -2)))
      const error = 2

      const xIsClose =

           athleteX > marginX - error
        && athleteX < marginX + error

      const yIsClose =

           athleteY > marginY - error
        && athleteY < marginY + error

      return xIsClose && yIsClose
    },

    //..................................................................................................................

    act: () =>
    {
      let justReplaced = false

      if(!G.S.rounding && !G.S.replace && G.S.pushed === null) G.updateTurn()

      if(G.S.replace && G.S.pushed === null)
      {
        justReplaced = true
        G.S.replace = false
      }

      if(G.S.pushed !== null || G.S.replace) G.pushAthlete()

      if(justReplaced && G.S.holder.future !== null) G.updateHolder()
      else G.updateSelected(G.S.selected)
    },
  }

  //....................................................................................................................

  G.check.pool.push(event)
}

