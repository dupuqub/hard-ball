
`use strict`

//......................................................................................................................

G.colorizeBallZones = () =>
{
  const athleteIndex = G.S.holder.now || G.S.holder.future
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
  // rule1 = opposing goal

  const redCells0 = playingCells.both.filter (cell => G.S.zones.indexOf (cell) !== -1)
  const redCells1 = G.S.zones.filter (cell => G.I.goal [teamNot].indexOf (cell) !== -1)
  const redIndexes =

    redCells0
    .concat (redCells1)
    .map (cell => G.S.zones.indexOf (cell))
    .filter ((zoneIndex, index, array) => index === array.indexOf (zoneIndex)) // remove duplicates

  //....................................................................................................................
  // reasons for black zone
  //
  // rule0 = opposing athletes
  // rule1 = own goal
  // rule2 = opposing goal if holder is keeper

  const blackCells0 = G.S.zones.filter (cell => playingCells [teamNot].indexOf (cell) !== -1)
  const blackCells1 = G.S.zones.filter (cell => G.I.goal [team].indexOf (cell) !== -1)

  let blackCells2 = []

  if (athleteKeeper !== null && athleteKeeper === athleteIndex)
  {
    blackCells2 = G.S.zones.filter (cell => G.I.goal [teamNot].indexOf (cell) !== -1)
  }

  //....................................................................................................................
  // finalize black zones process

  const blackIndexes =

    blackCells0
    .concat (blackCells1)
    .concat (blackCells2)
    .map (cell => G.S.zones.indexOf (cell))
    .filter ((zoneIndex, index, array) => index === array.indexOf (zoneIndex)) // remove duplicates

  //....................................................................................................................
  // apply classes

  redIndexes.forEach (zoneIndex => G.D.zones [zoneIndex].classList.add (`zonRed`))
  blackIndexes.forEach (zoneIndex => G.D.zones [zoneIndex].classList.add (`zonBlk`))
}

