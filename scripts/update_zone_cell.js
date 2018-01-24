
'use strict'

//......................................................................................................................
//
var update_zone_cell = _ =>
{
  state.zones = state.zones.map( _ => null )
  zones.forEach( zone => zone.classList.remove( 'zon_nop' ) )

  var
  hovered  = state.hovered.now , // athlete as string
  selected = state.selected.now // athlete as number

  //....................................................................................................................
  // HOVERED
  //....................................................................................................................
  //
  if( hovered === 'ball' )
  {
    if( state.ball === null )
    {
      ball.style.zIndex = "1"

      var middle = [ 'J05' , 'J06' , 'K05' , 'K06' ]

      middle.forEach( ( cell , $ ) => state.zones[ $ ] = cell )

      zones.forEach( zone => zone.classList.add( 'zon_nop' ) )
    }
  }

  //....................................................................................................................
  //
  else if( hovered !== null && hovered.slice( 0 , 7 ) === 'athlete' )
  {
    var
    athlete_index       = Number( hovered.slice( 8 , 10 ) ) ,
    athlete_cell        = state.athletes[ athlete_index ] ,
    athlete_cell_letter = athlete_cell.slice( 0 , 1 ) ,
    athlete_cell_number = Number( athlete_cell.slice( 1 , 3 ) ) ,
    athlete_team        =
      state.team.blue.indexOf( athlete_index ) !== -1
      ? 'blue'
      : state.team.green.indexOf( athlete_index ) !== -1
      ? 'green'
      : null

    //..................................................................................................................
    // startup
    //
    if( state.turn === 0 )
    {
      var both_starters = state.starter.blue.concat( state.starter.green )

      both_starters.forEach( ( cell , $ ) => state.zones[ $ ] = cell )
    }
    else if( state.turn < 8 )
    {
      if( athlete_team === null )
      {
        state.starter[ plays_now() ].forEach( ( cell , $ ) => state.zones[ $ ] = cell )
      }
      else
      {
        var chewed_matrix = chew( athlete_index , athlete_index )

        chewed_matrix.forEach( ( cell , $ ) => state.zones[ $ ] = cell )

        zones.forEach( zone => zone.classList.add( 'zon_nop' ) )
      }
    }

    //..................................................................................................................
    // roundabouting
    //
    else if( state.rounding )
    {
      //
    }

    //..................................................................................................................
    // benched
    //
    else if( athlete_team === null )
    {
      //
    }

    //..................................................................................................................
    // playing
    //
    else
    {
      var chewed_matrix = chew( athlete_index , athlete_index )

      chewed_matrix.forEach( ( cell , $ ) => state.zones[ $ ] = cell )

      if( athlete_team !== plays_now() ) zones.forEach( zone => zone.classList.add( 'zon_nop' ) )
    }
}

  //....................................................................................................................
  // SELECTED
  //....................................................................................................................
  //
  else if( selected === 'ball' )
  {
    //
  }

  //....................................................................................................................
  //
  else if( selected !== null ) // athlete
  {
    var
    athlete_index       = selected ,
    athlete_cell        = state.athletes[ athlete_index ] ,
    athlete_cell_letter = athlete_cell.slice( 0 , 1 ) ,
    athlete_cell_number = Number( athlete_cell.slice( 1 , 3 ) ) ,
    athlete_team        =
      state.team.blue.indexOf( athlete_index ) !== -1
      ? 'blue'
      : state.team.green.indexOf( athlete_index ) !== -1
      ? 'green'
      : null

    //..................................................................................................................
    // startup
    //
    if( state.turn === 0 )
    {
      var both_starter = state.starter.blue.concat( state.starter.green )

      both_starter.forEach( ( cell , $ ) => state.zones[ $ ] = cell )
    }
    else if( state.turn < 8 )
    {
      if( athlete_team === null )
      {
        state.starter[ plays_now() ].forEach( ( cell , $ ) => state.zones[ $ ] = cell )
      }
      else
      {
        var chewed_matrix = chew( athlete_index , athlete_index )

        chewed_matrix.forEach( ( cell , $ ) => state.zones[ $ ] = cell )

        zones.forEach( zone => zone.classList.add( 'zon_nop' ) )
      }
    }

    //..................................................................................................................
    // roundabouting
    //
    else if( state.rounding )
    {
      //
    }

    //..................................................................................................................
    // benched
    //
    else if( athlete_team === null )
    {
      //
    }

    //..................................................................................................................
    // playing
    //
    else
    {
      var chewed_matrix = chew( athlete_index , athlete_index )

      chewed_matrix.forEach( ( cell , $ ) => state.zones[ $ ] = cell )

      if( athlete_team !== plays_now() ) zones.forEach( zone => zone.classList.add( 'zon_nop' ) )
    }
  }

  //....................................................................................................................
  //
  reload.zones()
}

