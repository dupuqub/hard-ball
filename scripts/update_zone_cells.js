
'use strict'

//......................................................................................................................
//
G.update_zone_cells = _ =>
{
  G.S.zones = G.S.zones.map( _ => null )

  G.D.zones.forEach( zone =>
  {
    zone.classList.remove( 'zon_not' )
    zone.classList.remove( 'zon_red' )
    zone.classList.remove( 'zon_blk' )
  } )

  G.D.ball.style.zIndex = 1
  G.D.aim.style.zIndex = 1

  //....................................................................................................................
  // HOVERED
  //....................................................................................................................
  //
  if( G.S.hovered === 'ball' )
  {
    //..................................................................................................................
    // startup
    //
    if( G.S.ball === null && G.S.scoring === null )
    {
      G.I.middle.forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )
      G.D.zones.forEach( zone => zone.classList.add( 'zon_not' ) )
    }

    //..................................................................................................................
    //
    else if( G.S.placing || G.S.holder.now !== null )
    {
      const
      athlete_index = G.S.holder.now ,
      chewed_matrix = G.chew( athlete_index , 13 )

      chewed_matrix.forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )

      if( athlete_index !== null )
      {
        G.S.zones = G.S.zones.map( cell => cell === G.S.ball ? null : cell )
      }

      // colorize ball zones
    }
  }

  //....................................................................................................................
  //
  else if( G.S.hovered !== null ) // athlete
  {
    const
    athlete_index  = G.S.hovered ,
    athlete_cell   = G.S.athletes[ athlete_index ] ,
    athlete_letter = athlete_cell.slice( 0 , 1 ) ,
    athlete_number = Number( athlete_cell.slice( 1 ) ) ,

    athlete_in_blue  = G.S.team.blue.indexOf( athlete_index ) !== -1 ,
    athlete_in_green = G.S.team.green.indexOf( athlete_index ) !== -1 ,
    athlete_team     = athlete_in_blue ? 'blue' : athlete_in_green ? 'green' : null ,
    athlete_team_not = athlete_team === 'blue' ? 'green' : athlete_team === 'green' ? 'blue' : null

    //..................................................................................................................
    // startup
    //
    if( G.S.turn === 0 )
    {
      G.S.starter.blue.concat( G.S.starter.green ).forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )
    }
    else if( G.S.turn < 8 )
    {
      if( athlete_team === null )
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
    else if( athlete_team === null )
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

      if( athlete_team !== G.plays_now() ) G.D.zones.forEach( zone => zone.classList.add( 'zon_not' ) )

      G.update_keepers()
      G.colorize_athlete_zones( athlete_index )
    }
  }

  //....................................................................................................................
  // SELECTED
  //....................................................................................................................
  //
  else if( G.S.selected === 'ball' )
  {
    if( G.S.placing || G.S.holder.now !== null )
    {
      const
      athlete_index = G.S.holder.now ,
      chewed_matrix = G.chew( athlete_index , 13 )

      chewed_matrix.forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )

      if( athlete_index !== null )
      {
        G.S.zones = G.S.zones.map( cell => cell === G.S.ball ? null : cell )
      }

      // colorize ball zones
    }
  }

  //....................................................................................................................
  //
  else if( G.S.selected !== null ) // athlete
  {
    const
    athlete_index  = G.S.selected ,
    athlete_cell   = G.S.athletes[ athlete_index ] ,
    athlete_letter = athlete_cell.slice( 0 , 1 ) ,
    athlete_number = Number( athlete_cell.slice( 1 ) ) ,

    athlete_in_blue  = G.S.team.blue.indexOf( athlete_index ) !== -1 ,
    athlete_in_green = G.S.team.green.indexOf( athlete_index ) !== -1 ,
    athlete_team     = athlete_in_blue ? 'blue' : athlete_in_green ? 'green' : null ,
    athlete_team_not = athlete_team === 'blue' ? 'green' : athlete_team === 'green' ? 'blue' : null

    //..................................................................................................................
    // startup
    //
    if( G.S.turn === 0 )
    {
      G.S.starter.blue.concat( G.S.starter.green ).forEach( ( cell , $ ) => G.S.zones[ $ ] = cell )
    }
    else if( G.S.turn < 8 )
    {
      if( athlete_team === null )
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
    else if( athlete_team === null )
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

      if( athlete_team !== G.plays_now() ) G.D.zones.forEach( zone => zone.classList.add( 'zon_not' ) )

      G.update_keepers()
      G.colorize_athlete_zones( athlete_index )
    }
  }

  //....................................................................................................................
  //
  G.reposition.zones()
}

