
'use strict'

//......................................................................................................................
//
var update_zone_cell = _ =>
{
  state.zones = state.zones.map( _ => null )

  zones.forEach( zone => zone.classList.remove( 'zon_nop' ) )
  zones.forEach( zone => zone.classList.remove( 'zon_red' ) )
  zones.forEach( zone => zone.classList.remove( 'zon_blk' ) )

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

    athlete_in_blue  = state.team.blue.indexOf( athlete_index ) !== -1 ,
    athlete_in_green = state.team.green.indexOf( athlete_index ) !== -1 ,
    athlete_team     = athlete_in_blue ? 'blue' : athlete_in_green ? 'green' : null ,
    athlete_team_not = athlete_team === 'blue' ? 'green' : athlete_team === 'green' ? 'blue' : null

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

      // colorize zones
      //
      var
      keeper        = state.keepers[ athlete_team ] ,
      playing_cells = athletes_playing_cells() ,
      red_cells     = playing_cells.both.filter( cell => state.zones.indexOf( cell ) !== -1 ) ,
      red_zones     = red_cells.map( cell => state.zones.indexOf( cell ) ) ,
      black_cells_0 = state.zones.filter( cell => area[ athlete_team_not ].indexOf( cell ) !== -1 ) ,
      black_cells_1 = [] ,
      black_cells_2 = [] ,
      black_cells_3 = [] ,
      black_cells_4 = [] ,
      black_zones   = []

      if( keeper !== null && keeper !== athlete_index )
      {
        black_cells_1 = state.zones.filter( cell => area[ athlete_team_not ].indexOf( cell ) !== -1 )
      }

      red_zones.forEach( zone_index => zones[ zone_index ].classList.add( 'zon_red' ) )
      black_zones.forEach( zone_index => zones[ zone_index ].classList.add( 'zon_blk' ) )


      // reasons for black zone
      //
      // rule_0 = opponent's area                 . ok
      // rule_1 = own keeped area if not keeper   . ok
      // rule_2 = blocked push by athlete         .
      // rule_3 = blocked push by pushed's rule_0 .
      // rule_4 = blocked push by pushed's rule_1 .
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

    athlete_in_blue  = state.team.blue.indexOf( athlete_index ) !== -1 ,
    athlete_in_green = state.team.green.indexOf( athlete_index ) !== -1 ,
    athlete_team     = athlete_in_blue ? 'blue' : athlete_in_green ? 'green' : null ,
    athlete_team_not = athlete_team === 'blue' ? 'green' : athlete_team === 'green' ? 'blue' : null

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

      // colorize zones
      //
      var
      keeper        = state.keepers[ athlete_team ] ,
      playing_cells = athletes_playing_cells() ,
      red_cells     = playing_cells.both.filter( cell => state.zones.indexOf( cell ) !== -1 ) ,
      red_zones     = red_cells.map( cell => state.zones.indexOf( cell ) ) ,
      black_cells_0 = state.zones.filter( cell => area[ athlete_team_not ].indexOf( cell ) !== -1 ) ,
      black_cells_1 = [] ,
      black_cells_2 = [] ,
      black_cells_3 = [] ,
      black_cells_4 = [] ,
      black_zones   = []

      if( keeper !== null && keeper !== athlete_index )
      {
        black_cells_1 = state.zones.filter( cell => area[ athlete_team_not ].indexOf( cell ) !== -1 )
      }

      red_zones.forEach( zone_index => zones[ zone_index ].classList.add( 'zon_red' ) )
      black_zones.forEach( zone_index => zones[ zone_index ].classList.add( 'zon_blk' ) )
    }
  }

  //....................................................................................................................
  //
  reload.zones()
}

