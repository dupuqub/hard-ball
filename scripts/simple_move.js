
'use strict'

//......................................................................................................................
//
var simple_move = zone_cell =>
{
  var
  athlete_index    = state.selected.now ,
  zone_cell_letter = zone_cell.slice( 0 , 1 ) ,
  zone_cell_number = Number( zone_cell.slice( 1 , 3 ) ) ,
  new_x            = a_to_t.indexOf( zone_cell_letter ) * root_raw.cell_size + root_raw.border_full ,
  new_y            = zone_cell_number * root_raw.cell_size + root_raw.border_full

  state.lock = true
  state.athletes[ athlete_index ] = zone_cell
  athletes[ athlete_index ].style.marginLeft = new_x + 'px'
  athletes[ athlete_index ].style.marginTop = new_y + 'px'

  check.pool.push(
  {
    test : _ =>
    {
      var
      chosen           = state.selected.now ,
      game_rect        = game.getBoundingClientRect() ,
      athlete_rect     = athletes[ chosen ].getBoundingClientRect() ,
      athlete_rect_x   = athlete_rect.x - game_rect.x - root_raw.border_full / 2 ,
      athlete_rect_y   = athlete_rect.y - game_rect.y - root_raw.border_full / 2 ,
      athlete_margin_x = Number( athletes[ chosen ].style.marginLeft.slice( 0 , -2 ) ) ,
      athlete_margin_y = Number( athletes[ chosen ].style.marginTop.slice( 0 , -2 ) ) ,
      x_is_close       = athlete_rect_x.toFixed( 1 ) > athlete_margin_x.toFixed( 1 ) - .2
                         && athlete_rect_x.toFixed( 1 ) < athlete_margin_x.toFixed( 1 ) + .2 ,
      y_is_close       = athlete_rect_y.toFixed( 1 ) > athlete_margin_y.toFixed( 1 ) - .2
                         && athlete_rect_y.toFixed( 1 ) < athlete_margin_y.toFixed( 1 ) + .2

      return x_is_close && y_is_close
    } ,
    act : _ =>
    {
      state.turn ++
      state.lock = false

      update_zone_cell()

      localStorage.hard_ball_save_auto = JSON.stringify( state ) // not until the state is more solidified
    }
  } )
}

