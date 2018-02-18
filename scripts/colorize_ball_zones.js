
'use strict'

//......................................................................................................................
//
G.colorize_ball_zones = _ =>
{
  const
  athlete_index  = G.S.holder.now ,
  athlete_cell   = G.S.athletes[ athlete_index ] ,
  athlete_letter = athlete_cell.slice( 0 , 1 ) ,
  athlete_number = Number( athlete_cell.slice( 1 , 3 ) ) ,

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
  // rule_1 = opposing goal
  //
  red_cells_0 = playing_cells.both.filter( cell => G.S.zones.indexOf( cell ) !== -1 ) ,
  red_cells_1 = G.S.zones.filter( cell => G.I.goal[ team_not ].indexOf( cell ) !== -1 ) ,
  red_indexes =
    red_cells_0
    .concat( red_cells_1 )
    .map( cell => G.S.zones.indexOf( cell ) )
    .filter( ( zone_index , $ , array ) => $ === array.indexOf( zone_index ) ) , // remove duplicates

  //....................................................................................................................
  // reasons for black zone
  //
  // rule_0 = opposing athletes
  // rule_1 = own goal
  // rule_2 = opposing goal if holder is keeper
  //
  black_cells_0 = G.S.zones.filter( cell => playing_cells[ team_not ].indexOf( cell ) !== -1 ) ,
  black_cells_1 = G.S.zones.filter( cell => G.I.goal[ team ].indexOf( cell ) !== -1 )

  let black_cells_2 = []

  if( athlete_keeper !== null && athlete_keeper === athlete_index )
  {
    black_cells_2 = G.S.zones.filter( cell => G.I.goal[ team_not ].indexOf( cell ) !== -1 )
  }

  //....................................................................................................................
  // finalize black zones process
  //
  const black_indexes =
    black_cells_0
    .concat( black_cells_1 )
    .concat( black_cells_2 )
    .map( cell => G.S.zones.indexOf( cell ) )
    .filter( ( zone_index , $ , array ) => $ === array.indexOf( zone_index ) ) // remove duplicates

  //....................................................................................................................
  // apply classes
  //
  red_indexes.forEach( zone_index => G.D.zones[ zone_index ].classList.add( 'zon_red' ) )
  black_indexes.forEach( zone_index => G.D.zones[ zone_index ].classList.add( 'zon_blk' ) )
}

