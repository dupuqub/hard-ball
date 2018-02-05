
'use strict'

//......................................................................................................................
//
G.move = ( chosen , zone_cell ) => // 'target' = from 0 to 19 or 'ball'
{
  const
  zone_letter = zone_cell.slice( 0 , 1 ) ,
  zone_number = Number( zone_cell.slice( 1 ) ) ,
  new_x       = zone_number * G.I.cell_size + G.I.border_full ,
  new_y       = G.I.a_to_m.indexOf( zone_letter ) * G.I.cell_size + G.I.border_full

  G.S.lock = true
  G.S.athletes[ chosen ] = zone_cell
  G.D.athletes[ chosen ].style.marginLeft = new_x + 'px'
  G.D.athletes[ chosen ].style.marginTop = new_y + 'px'

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
      athlete_rect     = G.D.athletes[ chosen ].getBoundingClientRect() ,
      athlete_rect_x   = Math.floor( athlete_rect.x - board_rect.x - G.I.border_full / 2 ) ,
      athlete_rect_y   = Math.floor( athlete_rect.y - board_rect.y - G.I.border_full / 2 ) ,
      athlete_margin_x = Math.floor( Number( G.D.athletes[ chosen ].style.marginLeft.slice( 0 , -2 ) ) ) ,
      athlete_margin_y = Math.floor( Number( G.D.athletes[ chosen ].style.marginTop.slice( 0 , -2 ) ) ) ,
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
      if( G.S.pushed !== null )
      {
        // send push to new cell
        // test if pushed is new holder
        // set G.S.pushed to null
      }

      if( ! G.S.rounding )
      {
        G.S.turn ++

        G.update_lights()

        if( G.S.holder.future !== null ) G.update_holder()
      }

      G.change_selected( G.S.selected )

      G.S.lock = false
    }
  } )
}

//......................................................................................................................
//
G.update_holder = _ =>
{
  const
  athlete_index = G.S.holder.future ,
  athlete       = G.D.athletes[ athlete_index ]

  G.S.holder.now = athlete_index
  G.S.holder.future = null
  G.S.placing = true

  G.S.ball = G.S.athletes[ athlete_index ]
  G.S.aim = G.S.athletes[ athlete_index ]

  G.D.ball.style.marginLeft = athlete.style.marginLeft
  G.D.ball.style.marginTop = athlete.style.marginTop

  G.D.aim.style.marginLeft = athlete.style.marginLeft
  G.D.aim.style.marginTop = athlete.style.marginTop

  G.change_selected( 'ball' )
}
