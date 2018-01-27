
'use strict'

var colorize_athlete_zones = athlete_index =>
{
  var
  athlete_cell   = state.athletes[ athlete_index ] ,
  athlete_letter = athlete_cell.slice( 0 , 1 ) ,
  athlete_number = Number( athlete_cell.slice( 1 , 3 ) ) ,

  athlete_in_blue  = state.team.blue.indexOf( athlete_index ) !== -1 ,
  athlete_in_green = state.team.green.indexOf( athlete_index ) !== -1 ,
  athlete_team     = athlete_in_blue ? 'blue' : athlete_in_green ? 'green' : null ,
  athlete_team_not = athlete_team === 'blue' ? 'green' : athlete_team === 'green' ? 'blue' : null

  // colorize zones
  //
  var
  athlete_keeper = state.keepers[ athlete_team ] ,
  playing_cells  = athletes_playing_cells() ,
  red_cells      = playing_cells.both.filter( cell => state.zones.indexOf( cell ) !== -1 ) ,
  red_zones      = red_cells.map( cell => state.zones.indexOf( cell ) ) ,

  // reasons for black zone
  //
  // rule_0 = opponent's area
  // rule_1 = own keeped area if not keeper
  // rule_2 = blocked push by athlete
  // rule_3 = blocked push by pushed's rule_0
  // rule_4 = blocked push by pushed's rule_1
  //
  black_cells_0 = state.zones.filter( cell => area[ athlete_team_not ].indexOf( cell ) !== -1 ) ,
  black_cells_1 = [] ,
  black_cells_2 = [] ,
  black_cells_3 = [] ,
  black_cells_4 = []

  // rule_1
  //
  if( athlete_keeper !== null && athlete_keeper !== athlete_index )
  {
    black_cells_1 = state.zones.filter( cell => area[ athlete_team ].indexOf( cell ) !== -1 )
  }

  // pushed calculations
  //
  red_cells.forEach( cell =>
  {
    // find the following cell
    //
    var
    cell_letter = cell.slice( 0 , 1 ) ,
    cell_number = Number( cell.slice( 1 , 3 ) ) ,

    cell_letter_index    = a_to_t.indexOf( cell_letter ) ,
    athlete_letter_index = a_to_t.indexOf( athlete_letter ) ,
    letter_diff          = cell_letter_index - athlete_letter_index ,
    number_diff          = cell_number - athlete_number ,
    number_origin        = cell_number + number_diff ,

    new_cell = make_cell( make_letter( cell_letter , letter_diff ) , make_number( number_origin , 12 ) )

    // rule_2
    //
    if( playing_cells.both.indexOf( new_cell ) !== -1 ) black_cells_2.push( cell )

    // pushed variables
    //
    var
    pushed_index    = state.athletes.indexOf( cell ) ,
    pushed_in_blue  = state.team.blue.indexOf( pushed_index ) !== -1 ,
    pushed_in_green = state.team.green.indexOf( pushed_index ) !== -1 ,
    pushed_team     = pushed_in_blue ? 'blue' : pushed_in_green ? 'green' : null ,
    pushed_team_not = pushed_team === 'blue' ? 'green' : pushed_team === 'green' ? 'blue' : null ,
    pushed_keeper   = state.keepers[ pushed_team ]

    // rule_3
    //
    if( area[ pushed_team_not ].indexOf( new_cell ) !== -1 ) black_cells_3.push( cell )

    // rule_4
    //
    if( pushed_keeper !== null && pushed_keeper !== pushed_index )
    {
      if( area[ pushed_team ].indexOf( new_cell ) !== -1 ) black_cells_4.push( cell )
    }
  } )

  // including duplicates
  //
  var black_zones =
    black_cells_0
    .concat( black_cells_1 )
    .concat( black_cells_2 )
    .concat( black_cells_3 )
    .concat( black_cells_4 )
    .map( cell => state.zones.indexOf( cell ) )
    .filter( ( zone_index , $ , array ) => $ === array.indexOf( zone_index ) )

  // apply classes
  //
  red_zones.forEach( zone_index => zones[ zone_index ].classList.add( 'zon_red' ) )
  black_zones.forEach( zone_index => zones[ zone_index ].classList.add( 'zon_blk' ) )
}

