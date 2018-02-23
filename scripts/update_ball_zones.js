
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
  //
  else if( G.S.punting )
  {
    // make ball still shootable and movable + opponent athletes in red to pass (just like below)

    /*
    G.S.team[ G.S.holding.team === 'blue' ? 'green' : 'blue' ]
      .map( index => G.S.athletes[ index ] )
      .forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )

    G.D.zones.forEach( zone => zone.classList.add( 'zon_red' ) )
    */
  }

  //....................................................................................................................
  // common play
  //
  else if( G.S.holder.now !== null )
  {
    const
    athlete_index = G.S.holder.now ,
    chewed_matrix = G.chew( athlete_index , 13 )

    chewed_matrix.forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )

    if( athlete_index !== null )
    {
      G.S.zones = G.S.zones.map( cell => cell === G.S.ball ? null : cell )
    }

    G.update_keepers()
    G.colorize_ball_zones()
  }
}

