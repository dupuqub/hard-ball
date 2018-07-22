
'use strict'

//......................................................................................................................
//
G.colorize_athlete_zones = athlete_index =>
{
  const
  athlete_cell   = G.S.athletes[ athlete_index ] ,
  athlete_letter = athlete_cell.slice( 0 , 1 ) ,
  athlete_number = Number( athlete_cell.slice( 1 ) ) ,

  athlete_in_blue  = G.S.team.blue.indexOf( athlete_index ) !== -1 ,
  athlete_in_green = G.S.team.green.indexOf( athlete_index ) !== -1 ,

  team     = athlete_in_blue ? 'blue' : athlete_in_green ? 'green' : null ,
  team_not = team === 'blue' ? 'green' : team === 'green' ? 'blue' : null ,

  athlete_keeper = G.S.keepers[ team ] ,
  playing_cells  = G.athletes_playing_cells() ,

  //....................................................................................................................
  // reasons for red zone
  //
  // rule_0 = athletes
  // rule_1 = ball
  // rule_2 = path

  //....................................................................................................................
  // rule_0
  //
  red_cells = playing_cells.both.filter( cell => G.S.zones.indexOf( cell ) !== -1 ) ,

  //....................................................................................................................
  //
  red_indexes = red_cells.map( cell => G.S.zones.indexOf( cell ) )

  //....................................................................................................................
  // rule_1
  //
  // push to 'red_indexes' directly to optimize athlete-push calculations
  //
  if( G.S.zones.indexOf( G.S.ball ) !== -1 ) red_indexes.push( G.S.zones.indexOf( G.S.ball ) )

  //....................................................................................................................
  // rule_2
  //
  // push to 'red_indexes' directly to optimize athlete-push calculations
  //
  if( G.S.path )
  {
    G.S.zones.forEach( cell =>
    {
      const
      cell_path_index  = G.S.path.indexOf( cell ) ,
      cell_zones_index = G.S.zones.indexOf( cell )

      if( cell_path_index !== -1 && red_indexes.indexOf( cell_zones_index ) === -1 )
      {
        red_indexes.push( cell_zones_index )
      }
    } )
  }

  //....................................................................................................................
  // reasons for black zone
  //
  // rule_0 = opponent's area
  // rule_1 = own keeped area if not keeper
  // rule_2 = blocked push by athlete
  // rule_3 = blocked push by pushed's rule_0
  // rule_4 = blocked push by pushed's rule_1

  //....................................................................................................................
  // rule_0
  //
  const black_cells_0 = G.S.zones.filter( cell => G.I.area[ team_not ].indexOf( cell ) !== -1 ) // rule_0

  //....................................................................................................................
  //
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
    black_cells_1 = G.S.zones.filter( cell =>
    {
      const is_push = playing_cells.both.some( is_push_cell => is_push_cell === cell )

      if( ! is_push ) return G.I.area[ team ].indexOf( cell ) !== -1
    })
  }

  //....................................................................................................................
  // pushed calculations
  //
  red_cells.forEach( cell =>
  {
    //..................................................................................................................
    // find the following cell
    //
    const new_cell = G.next_cell( athlete_cell , cell )

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
    else if( pushed_keeper !== null || pushed_keeper === pushed_index)
    {
      if( G.I.area[ pushed_team ].indexOf( new_cell ) !== -1 ) black_cells_4.push( cell )
    }
  } )

  //....................................................................................................................
  // finalize black zones process
  //
  const black_indexes =
    black_cells_0
    .concat( black_cells_1 )
    .concat( black_cells_2 )
    .concat( black_cells_3 )
    .concat( black_cells_4 )
    .map( cell => G.S.zones.indexOf( cell ) )
    .filter( ( zone_index , $ , array ) => $ === array.indexOf( zone_index ) ) // remove duplicates

  //....................................................................................................................
  // apply classes
  //
  red_indexes.forEach( zone_index => G.D.zones[ zone_index ].classList.add( 'zon_red' ) )
  black_indexes.forEach( zone_index => G.D.zones[ zone_index ].classList.add( 'zon_blk' ) )
}

