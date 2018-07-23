
`use strict`

//......................................................................................................................

G.athletesPlayingCells = () =>
{
  const newObject =
  {
    blue: G.S.team.blue.map (athleteIndex => G.S.athletes [athleteIndex]),
    green: G.S.team.green.map (athleteIndex => G.S.athletes [athleteIndex]),
  }

  newObject.both = newObject.blue.concat (newObject.green)

  return newObject
}

