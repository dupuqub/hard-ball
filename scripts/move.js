
'use strict'

//......................................................................................................................
//
G.move = ( athlete_index , zone_cell ) => // 'target' = from 0 to 19 or 'ball'
{
  const
  zone_letter = zone_cell.slice( 0 , 1 ) ,
  zone_number = Number( zone_cell.slice( 1 ) ) ,
  new_x       = zone_number * G.I.cell_size + G.I.border_full ,
  new_y       = G.I.a_to_m.indexOf( zone_letter ) * G.I.cell_size + G.I.border_full

  G.S.lock = true
  G.S.athletes[ athlete_index ] = zone_cell
  G.D.athletes[ athlete_index ].style.marginLeft = new_x + 'px'
  G.D.athletes[ athlete_index ].style.marginTop = new_y + 'px'

  //....................................................................................................................
  //
  G.check.pool.push(
  {
    clear : true ,

    //..................................................................................................................
    //
    test : _ =>
    {
      const
      board_rect       = G.D.board.getBoundingClientRect() ,
      athlete_rect     = G.D.athletes[ athlete_index ].getBoundingClientRect() ,
      athlete_rect_x   = Math.floor( athlete_rect.x - board_rect.x - G.I.border_full / 2 ) ,
      athlete_rect_y   = Math.floor( athlete_rect.y - board_rect.y - G.I.border_full / 2 ) ,
      athlete_margin_x = Math.floor( Number( G.D.athletes[ athlete_index ].style.marginLeft.slice( 0 , -2 ) ) ) ,
      athlete_margin_y = Math.floor( Number( G.D.athletes[ athlete_index ].style.marginTop.slice( 0 , -2 ) ) ) ,
      error            = 2 ,

      x_is_close =
        athlete_rect_x > athlete_margin_x - error
        && athlete_rect_x < athlete_margin_x + error ,

      y_is_close =
        athlete_rect_y > athlete_margin_y - error
        && athlete_rect_y < athlete_margin_y + error

      return x_is_close && y_is_close
    } ,

    //..................................................................................................................
    //
    act : _ =>
    {
      if( G.S.pushed !== null )                   G.push()
      if( ! G.S.rounding && G.S.pushed === null ) G.change_turn()
      if( G.S.pushed === null )                   G.S.lock = false

      G.change_selected( G.S.selected )
    }
  } )
}

