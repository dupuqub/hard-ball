
`use strict`

//......................................................................................................................

G.nextCell = (firstCell, secondCell) =>
{
  const firstLetter = firstCell.slice (0, 1)
  const firstNumber = Number (firstCell.slice (1))
  const secondLetter = secondCell.slice (0, 1)
  const secondNumber = Number (secondCell.slice (1))

  const firstLetterIndex = G.I.aToM.indexOf (firstLetter)
  const secondLetterIndex = G.I.aToM.indexOf (secondLetter)
  const letterDiff = secondLetterIndex - firstLetterIndex
  const numberDiff = secondNumber - firstNumber
  const numberOrigin = secondNumber + numberDiff

  const newLetter = G.letterer (secondLetter, letterDiff)
  const newNumber = G.numberer (numberOrigin, 20)

  return G.celler (newLetter, newNumber)
}

