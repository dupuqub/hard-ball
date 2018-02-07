
'use strict'

//......................................................................................................................
//
G.update_athlete_zones = athlete_index =>
{
  const
  athlete_cell   = G.S.athletes[ athlete_index ] ,
  athlete_letter = athlete_cell.slice( 0 , 1 ) ,
  athlete_number = Number( athlete_cell.slice( 1 ) ) ,

  athlete_in_blue  = G.S.team.blue.indexOf( athlete_index ) !== -1 ,
  athlete_in_green = G.S.team.green.indexOf( athlete_index ) !== -1 ,

  team     = athlete_in_blue ? 'blue' : athlete_in_green ? 'green' : null ,
  team_not = team === 'blue' ? 'green' : team === 'green' ? 'blue' : null

  //..................................................................................................................
  // startup
  //
  if( G.S.turn === 0 )
  {
    G.S.starter.blue.concat( G.S.starter.green ).forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )
  }
  else if( G.S.turn < 8 )
  {
    if( team === null )
    {
      G.S.starter[ G.plays_now() ].forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )
    }
    else
    {
      const chewed_matrix = G.chew( athlete_index , athlete_index )

      chewed_matrix.forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )

      G.D.zones.forEach( zone => zone.classList.add( 'zon_not' ) )
    }
  }

  //..................................................................................................................
  // benched
  //
  else if( team === null )
  {
    //
  }

  //..................................................................................................................
  // rounding
  //
  else if( G.S.rounding && G.S.selected === athlete_index )
  {
    const chewed_matrix = G.chew( athlete_index , 13 )

    chewed_matrix.forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )

    G.update_keepers()
    G.colorize_athlete_zones( athlete_index )
  }

  //..................................................................................................................
  // playing
  //
  else
  {
    const chewed_matrix = G.chew( athlete_index , athlete_index )

    chewed_matrix.forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )

    if( team !== G.plays_now() ) G.D.zones.forEach( zone => zone.classList.add( 'zon_not' ) )

    G.update_keepers()
    G.colorize_athlete_zones( athlete_index )
  }
}

