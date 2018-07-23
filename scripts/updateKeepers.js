
`use strict`

//......................................................................................................................

G.updateKeepers = () =>
{
  const playingCells = G.athletesPlayingCells ()
  const colors = [`blue`, `green`]

  G.S.keepers = {blue: null, green: null}

  colors.forEach (color =>
  {
    playingCells [color].forEach (cell =>
    {
      if (G.I.area [color].indexOf (cell) !== -1)
      {
        G.S.keepers [color] = G.S.athletes.indexOf (cell)
      }
    })
  })
}

