
'use strict'

//......................................................................................................................
//
G.move = ( athlete , zone_cell ) => // 'target' = from 0 to 19 or 'ball'
{
  const
  zone_letter = zone_cell.slice( 0 , 1 ) ,
  zone_number = Number( zone_cell.slice( 1 ) ) ,
  new_x       = zone_number * G.I.cell_size + G.I.border_full ,
  new_y       = G.I.a_to_m.indexOf( zone_letter ) * G.I.cell_size + G.I.border_full

  G.S.locked = true
  G.S.athletes[ athlete ] = zone_cell
  G.D.athletes[ athlete ].style.marginLeft = new_x + 'px'
  G.D.athletes[ athlete ].style.marginTop = new_y + 'px'

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
      board_rect   = G.D.board.getBoundingClientRect() ,
      athlete_rect = G.D.athletes[ athlete ].getBoundingClientRect() ,
      athlete_x    = Math.floor( athlete_rect.x - board_rect.x - G.I.border_full / 2 ) ,
      athlete_y    = Math.floor( athlete_rect.y - board_rect.y - G.I.border_full / 2 ) ,
      margin_x     = Math.floor( Number( G.D.athletes[ athlete ].style.marginLeft.slice( 0 , -2 ) ) ) ,
      margin_y     = Math.floor( Number( G.D.athletes[ athlete ].style.marginTop.slice( 0 , -2 ) ) ) ,
      error        = 2 ,

      x_is_close =
           athlete_x > margin_x - error
        && athlete_x < margin_x + error ,

      y_is_close =
           athlete_y > margin_y - error
        && athlete_y < margin_y + error

      return x_is_close && y_is_close
    } ,

    //..................................................................................................................
    //
    act : _ =>
    {
      if( ! G.S.rounding && ! G.S.replace && G.S.pushed === null ) G.update_turn()
      if( G.S.replace && G.S.pushed === null )                     G.S.replace = false
      if( G.S.pushed !== null || G.S.replace )                     G.push_athlete()

      if( G.S.pushed === null ) G.S.locked = false

      G.update_selected( G.S.selected )
    }
  } )
}

