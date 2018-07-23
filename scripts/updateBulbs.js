
`use strict`

//....................................................................................................................

G.updateBulbs = () =>
{
  G.D.bulbs.forEach (bulb =>
  {
    bulb.classList.remove (`blue`)
    bulb.classList.remove (`green`)
    bulb.classList.remove (`redLgt`)
  })

  if (G.S.holding.turns === 5)
  {
    G.D.bulbs.forEach (bulb => bulb.classList.add (`redLgt`))
  }

  else
  {
    G.D.bulbs.forEach ((bulb, index) =>
    {
      if (index < G.S.holding.turns)
      {
        bulb.classList.add (G.S.holding.team)
      }
    })
  }
}

