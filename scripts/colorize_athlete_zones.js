
'use strict'

//......................................................................................................................
//
G.colorize_athlete_zones = athlete_index =>
{
  const
  athlete_cell   = G.S.athletes[ athlete_index ] ,
  athlete_letter = athlete_cell.slice( 0 , 1 ) ,
  athlete_number = Number( athlete_cell.slice( 1 , 3 ) ) ,

  athlete_in_blue  = G.S.team.blue.indexOf( athlete_index ) !== -1 ,
  athlete_in_green = G.S.team.green.indexOf( athlete_index ) !== -1 ,
  athlete_team     = athlete_in_blue ? 'blue' : athlete_in_green ? 'green' : null ,
  athlete_team_not = athlete_team === 'blue' ? 'green' : athlete_team === 'green' ? 'blue' : null ,

  athlete_keeper = G.S.keepers[ athlete_team ] ,
  playing_cells  = G.athletes_playing_cells() ,

  //....................................................................................................................
  // define red zones
  //
  red_cells = playing_cells.both.filter( cell => G.S.zones.indexOf( cell ) !== -1 ) ,
  red_zones = red_cells.map( cell => G.S.zones.indexOf( cell ) )

  //....................................................................................................................
  // reasons for black zone
  //
  // rule_0 = opponent's area
  // rule_1 = own keeped area if not keeper
  // rule_2 = blocked push by athlete
  // rule_3 = blocked push by pushed's rule_0
  // rule_4 = blocked push by pushed's rule_1
  //
  const black_cells_0 = G.S.zones.filter( cell => G.I.area[ athlete_team_not ].indexOf( cell ) !== -1 )

  let
  black_cells_1 = [] ,
  black_cells_2 = [] ,
  black_cells_3 = [] ,
  black_cells_4 = []

  //....................................................................................................................
  // rule_1
  //
  if( athlete_keeper !== null && athlete_keeper !== athlete_index )
  {
    black_cells_1 = G.S.zones.filter( cell => G.I.area[ athlete_team ].indexOf( cell ) !== -1 )
  }

  //....................................................................................................................
  // pushed calculations
  //
  red_cells.forEach( cell =>
  {
    //..................................................................................................................
    // find the following cell
    //
    const
    cell_letter = cell.slice( 0 , 1 ) ,
    cell_number = Number( cell.slice( 1 , 3 ) ) ,

    cell_letter_index    = G.I.a_to_m.indexOf( cell_letter ) ,
    athlete_letter_index = G.I.a_to_m.indexOf( athlete_letter ) ,
    letter_diff          = cell_letter_index - athlete_letter_index ,
    number_diff          = cell_number - athlete_number ,
    number_origin        = cell_number + number_diff ,

    new_cell = G.celler( G.letterer( cell_letter , letter_diff ) , G.numberer( number_origin , 20 ) )

    //..................................................................................................................
    // rule_2
    //
    if( playing_cells.both.indexOf( new_cell ) !== -1 ) black_cells_2.push( cell )

    //..................................................................................................................
    // pushed variables
    //
    const
    pushed_index    = G.S.athletes.indexOf( cell ) ,
    pushed_in_blue  = G.S.team.blue.indexOf( pushed_index ) !== -1 ,
    pushed_in_green = G.S.team.green.indexOf( pushed_index ) !== -1 ,
    pushed_team     = pushed_in_blue ? 'blue' : pushed_in_green ? 'green' : null ,
    pushed_team_not = pushed_team === 'blue' ? 'green' : pushed_team === 'green' ? 'blue' : null ,
    pushed_keeper   = G.S.keepers[ pushed_team ]

    //..................................................................................................................
    // rule_3
    //
    if( G.I.area[ pushed_team_not ].indexOf( new_cell ) !== -1 ) black_cells_3.push( cell )

    //..................................................................................................................
    // rule_4
    //
    if( pushed_keeper !== null && pushed_keeper !== pushed_index )
    {
      if( G.I.area[ pushed_team ].indexOf( new_cell ) !== -1 ) black_cells_4.push( cell )
    }
  } )

  //....................................................................................................................
  // finalize black zones process
  //
  const black_zones =
    black_cells_0
    .concat( black_cells_1 )
    .concat( black_cells_2 )
    .concat( black_cells_3 )
    .concat( black_cells_4 )
    .map( cell => G.S.zones.indexOf( cell ) )
    .filter( ( zone_index , $ , array ) => $ === array.indexOf( zone_index ) )

  //....................................................................................................................
  // apply classes
  //
  red_zones.forEach( zone_index => G.D.zones[ zone_index ].classList.add( 'zon_red' ) )
  black_zones.forEach( zone_index => G.D.zones[ zone_index ].classList.add( 'zon_blk' ) )
}

