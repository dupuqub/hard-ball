
`use strict`

//......................................................................................................................

G.updateAthleteZones = athleteIndex =>
{
  const athleteInBlue = G.S.team.blue.indexOf(athleteIndex) !== -1
  const athleteInGreen = G.S.team.green.indexOf(athleteIndex) !== -1
  const team = athleteInBlue ? `blue` : athleteInGreen ? `green` : null

  //....................................................................................................................
  // startup

  if(G.S.turn === 0)
  {
    G.S.starter.blue.concat(G.S.starter.green).forEach((cell, index) => G.S.zones[index] = cell)
  }
  else if(G.S.turn < 8)
  {
    if(team === null)
    {
      G.S.starter[G.playsNow()].forEach((cell, index) => G.S.zones[index] = cell)
    }
    else
    {
      const chewedMatrix = G.chew(athleteIndex, athleteIndex)

      chewedMatrix.forEach((cell, index) => G.S.zones[index] = cell)

      G.D.zones.forEach(zone => zone.classList.add(`zonNot`))
    }
  }

  //....................................................................................................................
  // benched

  else if(team === null)
  {
    const playsNow = G.playsNow()
    const color = G.S.replaced[playsNow].length < 2 ? `red` : `blk`
    const cells = G.S.team[playsNow].map(index => G.S.athletes[index])

    cells.forEach((cell, index) => G.S.zones[index] = cell)

    G.D.zones.forEach(zone => zone.classList.add(`zon` + G.title(color)))
  }

  //....................................................................................................................
  // rounding

  else if(G.S.rounding && G.S.selected === athleteIndex)
  {
    const chewedMatrix = G.chew(athleteIndex, 13)

    chewedMatrix.forEach((cell, index) => G.S.zones[index] = cell)

    G.updateKeepers()
    G.colorizeAthleteZones(athleteIndex)
  }

  //....................................................................................................................
  // playing

  else
  {
    const chewedMatrix = G.chew(athleteIndex, athleteIndex)

    chewedMatrix.forEach((cell, index) => G.S.zones[index] = cell)

    if(team !== G.playsNow()) G.D.zones.forEach(zone => zone.classList.add(`zonNot`))

    G.updateKeepers()
    G.colorizeAthleteZones(athleteIndex)
  }
}

