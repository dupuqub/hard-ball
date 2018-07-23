
`use strict`

//......................................................................................................................

G.colorizeAthleteZones = athleteIndex =>
{
  const athleteCell = G.S.athletes [athleteIndex]
  const athleteInBlue = G.S.team.blue.indexOf (athleteIndex) !== -1
  const athleteInGreen = G.S.team.green.indexOf (athleteIndex) !== -1
  const team = athleteInBlue ? `blue` : athleteInGreen ? `green` : null
  const teamNot = team === `blue` ? `green` : team === `green` ? `blue` : null
  const athleteKeeper = G.S.keepers [team]
  const playingCells = G.athletesPlayingCells ()

  //....................................................................................................................
  // reasons for red zone
  //
  // rule0 = athletes
  // rule1 = ball
  // rule2 = path

  //....................................................................................................................
  // rule0

  const redCells = playingCells.both.filter (cell => G.S.zones.indexOf (cell) !== -1)
  const redIndexes = redCells.map (cell => G.S.zones.indexOf (cell))

  //....................................................................................................................
  // rule1
  //
  // push to "redIndexes" directly to optimize athlete-push calculations

  if (G.S.zones.indexOf (G.S.ball) !== -1) redIndexes.push (G.S.zones.indexOf (G.S.ball))

  //....................................................................................................................
  // rule2
  //
  // push to "redIndexes" directly to optimize athlete-push calculations

  if (G.S.path)
  {
    G.S.zones.forEach (cell =>
    {
      const cellPathIndex = G.S.path.indexOf (cell)
      const cellZonesIndex = G.S.zones.indexOf (cell)

      if (cellPathIndex !== -1 && redIndexes.indexOf (cellZonesIndex) === -1)
      {
        redIndexes.push (cellZonesIndex)
      }
    })
  }

  //....................................................................................................................
  // reasons for black zone
  //
  // rule0 = opponent's area
  // rule1 = own keeped area if not keeper
  // rule2 = blocked push by athlete
  // rule3 = blocked push by pushed's rule0
  // rule4 = blocked push by pushed's rule1

  //....................................................................................................................
  // rule0

  const blackCells0 = G.S.zones.filter (cell => G.I.area [teamNot].indexOf (cell) !== -1) // rule0

  let blackCells1 = []
  let blackCells2 = []
  let blackCells3 = []
  let blackCells4 = []

  //....................................................................................................................
  // rule1

  if (athleteKeeper !== null && athleteKeeper !== athleteIndex)
  {
    blackCells1 = G.S.zones.filter (cell =>
    {
      const isPush = playingCells.both.some (isPushCell => isPushCell === cell)

      if (!isPush) return G.I.area [team].indexOf (cell) !== -1
    })
  }

  //....................................................................................................................
  // pushed calculations

  redCells.forEach (cell =>
  {
    //..................................................................................................................
    // find the following cell

    const newCell = G.nextCell (athleteCell, cell)

    //..................................................................................................................
    // rule2

    if (playingCells.both.indexOf (newCell) !== -1) blackCells2.push (cell)

    //..................................................................................................................
    // pushed variables

    const pushedIndex = G.S.athletes.indexOf (cell)
    const pushedInBlue = G.S.team.blue.indexOf (pushedIndex) !== -1
    const pushedInGreen = G.S.team.green.indexOf (pushedIndex) !== -1
    const pushedTeam = pushedInBlue ? `blue` : pushedInGreen ? `green` : null
    const pushedTeamNot = pushedTeam === `blue` ? `green` : pushedTeam === `green` ? `blue` : null
    const pushedKeeper = G.S.keepers [pushedTeam]

    //..................................................................................................................
    // rule3

    if (G.I.area [pushedTeamNot].indexOf (newCell) !== -1) blackCells3.push (cell)

    //..................................................................................................................
    // rule4

    else if (pushedKeeper !== null || pushedKeeper === pushedIndex)
    {
      if (G.I.area [pushedTeam].indexOf (newCell) !== -1) blackCells4.push (cell)
    }
  })

  //....................................................................................................................
  // finalize black zones process

  const blackIndexes =

    blackCells0
    .concat (blackCells1)
    .concat (blackCells2)
    .concat (blackCells3)
    .concat (blackCells4)
    .map (cell => G.S.zones.indexOf (cell))
    .filter ((zoneIndex, index, array) => index === array.indexOf (zoneIndex)) // remove duplicates

  //....................................................................................................................
  // apply classes

  redIndexes.forEach (zoneIndex => G.D.zones [zoneIndex].classList.add (`zonRed`))
  blackIndexes.forEach (zoneIndex => G.D.zones [zoneIndex].classList.add (`zonBlk`))
}

