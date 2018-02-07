
'use strict'

//......................................................................................................................
//
G.update_ball_zones = _ =>
{
  //....................................................................................................................
  // startup
  //
  if( G.S.ball === null )
  {
    G.I.middle.forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )
    G.D.zones.forEach( zone => zone.classList.add( 'zon_not' ) )
  }

  //....................................................................................................................
  // common play
  //
  else if( G.S.placing || G.S.holder.now !== null )
  {
    //..................................................................................................................
    // aim
    //
    const
    new_letter = 0 , // G.letterer(  ) ,
    new_number = 0 , // G.numberer(  ) ,
    new_cell   = 0 // G.celler( new_letter , new_number )

    //..................................................................................................................
    // zones
    //
    const
    athlete_index = G.S.holder.now ,
    chewed_matrix = G.chew( athlete_index , 13 )

    chewed_matrix.forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )

    if( athlete_index !== null )
    {
      G.S.zones = G.S.zones.map( cell => cell === G.S.ball ? null : cell )
    }

    G.colorize_ball_zones()
  }
}

