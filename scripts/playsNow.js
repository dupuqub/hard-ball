
`use strict`

//......................................................................................................................

G.playsNow = () =>
{
  const turnIsEven = G.S.turn % 2 === 0
  const color =

      G.S.first === `blue`
    ? (turnIsEven ? `blue` : `green`)
    : (turnIsEven ? `green` : `blue`)

  return color
}

