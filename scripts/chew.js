
`use strict`

//......................................................................................................................

G.celler = (letter, number) => letter + (number < 10 ? `0` + number : number)

//......................................................................................................................

G.letterer = (letter, number) => G.I.aToM [G.numberer (G.I.aToM.indexOf (letter) + number, 12)]

//......................................................................................................................

G.numberer = (index, length) => index > length - 1 ? index - length : index < 0 ? length + index : index

//......................................................................................................................

G.chew = (athleteSource, athleteSight) =>
{
  const sourceCell = G.S.athletes [athleteSource]
  const sourceCellLetter = sourceCell.slice (0, 1)
  const sourceCellNumber = Number (sourceCell.slice (1))
  const sightCell = G.S.athletes [athleteSight]
  const moves = G.matrix [athleteSight].moves
  const arrayOfCells = []

  moves.forEach (move =>
  {
    if (move === 0 || move === 2 || move === 5)
    {
      const value = move === 0 ? 1 : move === 2 ? 2 : 3
      const cells =
      [
        G.celler (sourceCellLetter, G.numberer (sourceCellNumber - value, 20)),
        G.celler (sourceCellLetter, G.numberer (sourceCellNumber + value, 20)),
        G.celler (G.letterer (sourceCellLetter, -value), sourceCellNumber),
        G.celler (G.letterer (sourceCellLetter, value), sourceCellNumber),
      ]

      cells.forEach(cell => arrayOfCells.push (cell))
    }
    if (move === 1 || move === 4 || move === 8)
    {
      const value = move === 1 ? 1 : move === 4 ? 2 : 3
      const cells =
      [
        G.celler (G.letterer (sourceCellLetter, -value), G.numberer (sourceCellNumber - value, 20)),
        G.celler (G.letterer (sourceCellLetter, value), G.numberer (sourceCellNumber - value, 20)),
        G.celler (G.letterer (sourceCellLetter, value), G.numberer (sourceCellNumber + value, 20)),
        G.celler (G.letterer (sourceCellLetter, -value), G.numberer (sourceCellNumber + value, 20)),
      ]

      cells.forEach(cell => arrayOfCells.push (cell))
    }
    if (move === 3 || move === 6 || move === 7)
    {
      const value0 = move === 3 ? 1 : move === 6 ? 1 : 2
      const value1 = move === 3 ? 2 : move === 6 ? 3 : 3
      const cells =
      [
        G.celler (G.letterer (sourceCellLetter, -value0), G.numberer (sourceCellNumber - value1, 20)),
        G.celler (G.letterer (sourceCellLetter, value0), G.numberer (sourceCellNumber - value1, 20)),
        G.celler (G.letterer (sourceCellLetter, value1), G.numberer (sourceCellNumber - value0, 20)),
        G.celler (G.letterer (sourceCellLetter, value1), G.numberer (sourceCellNumber + value0, 20)),
        G.celler (G.letterer (sourceCellLetter, value0), G.numberer (sourceCellNumber + value1, 20)),
        G.celler (G.letterer (sourceCellLetter, -value0), G.numberer (sourceCellNumber + value1, 20)),
        G.celler (G.letterer (sourceCellLetter, -value1), G.numberer (sourceCellNumber + value0, 20)),
        G.celler (G.letterer (sourceCellLetter, -value1), G.numberer (sourceCellNumber - value0, 20)),
      ]

      cells.forEach (cell => arrayOfCells.push (cell))
    }
  })

  return arrayOfCells
}

