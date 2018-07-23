
'use strict'

//......................................................................................................................
//
G.athletes_playing_cells = _ =>
{
  const new_object =
  {
    blue  : G.S.team.blue.map( athlete_index => G.S.athletes[ athlete_index ] ) ,
    green : G.S.team.green.map( athlete_index => G.S.athletes[ athlete_index ] )
  }

  new_object.both = new_object.blue.concat( new_object.green )

  return new_object
}

