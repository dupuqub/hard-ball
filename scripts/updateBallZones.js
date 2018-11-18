
`use strict`

//......................................................................................................................

G.updateBallZones = () =>
{
  //....................................................................................................................
  // startup

  if(G.S.ball === null)
  {
    G.I.middle.forEach((cell, index) => G.S.zones[index] = cell)
    G.D.zones.forEach(zone => zone.classList.add(`zonNot`))
  }

  //....................................................................................................................

  else if(G.S.punting)
  {
    G.S.team[G.S.holding.team === `blue` ? `green` : `blue`]
    .map(index => G.S.athletes[index])
    .forEach((cell, index) => G.S.zones[index] = cell)

    G.D.zones.forEach(zone => zone.classList.add(`zonRed`))
  }

  //....................................................................................................................
  // common play

  else if(G.S.holder.now !== null)
  {
    const athleteIndex = G.S.holder.now
    const chewedMatrix = G.chew(athleteIndex, 13)

    chewedMatrix.forEach((cell, index) => G.S.zones[index] = cell)

    if(athleteIndex !== null)
    {
      G.S.zones = G.S.zones.map(cell => cell === G.S.ball ? null : cell)
    }

    G.updateKeepers()
    G.colorizeBallZones()
  }
}

