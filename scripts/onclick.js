
'use strict'

//......................................................................................................................
//
onclick = event =>
{
  var target = event.target.id

  //....................................................................................................................
  // utilities
  //
  if( target === 'language' )
  {}
  else if( target === 'save' )
  {}
  else if( target === 'load' )
  {}
  else if( target === 'reset' )
  {}
  else if( target === 'github' )
  {}

  //....................................................................................................................
  // ball
  //
  else if( target === 'ball' )
  {}

  //....................................................................................................................
  // athlete
  //
  else if( target.slice( 0 , 7 ) === 'athlete' )
  {
    var
    athlete_index = Number( target.slice( 8 , 10 ) ) ,
    athlete_row   = Number( state.athletes[ athlete_index ].slice( 1 , 3 ) ) ,
    replaced_both = state.replaced.green.concat( state.replaced.green )

    if( athlete_row === 12 ) // athlete is benched
    {
      if( state.turn < 8 ) // while choosing athletes
      {
        change_selected( athlete_index )
      }
      else if( replaced_both.indexOf( athlete_index ) === - 1 // athlete was not replaced
      && state.replaced[ state.player.now() ].length < 2 ) // team has replacements left
      {
        //
      }
    }
    else // athlete is playing
    {
      if( state.turn < 8 )
      {
        change_selected( athlete_index )
      }
      else
      {
        //
      }
    }
  }

  //....................................................................................................................
  // zone
  //
  else if( target.slice( 0 , 4 ) === 'zone'
  && Array.from( zones[ Number( target.slice( 5 , 7 ) ) ].classList ).indexOf( 'nop' ) !== - 1 )
  {
    // do nothing (gameplay focused choice)
  }
  else if( target.slice( 0 , 4 ) === 'zone' )
  {
    var
    selected                  = state.selected.now ,
    zone_index                = Number( target.slice( 5 , 7 ) ) ,
    zone_cell                 = state.zones[ zone_index ] ,
    zone_cell_letter          = zone_cell.slice( 0 , 1 ) ,
    zone_cell_number          = Number( zone_cell.slice( 1 , 3 ) ),
    zone_cell_in_blue_starter = state.starter.blue.indexOf( zone_cell ) !== - 1

    if( selected === 'ball' )
    {
      //
    }
    else if( selected !== null )
    {
      if( state.turn === 0 ) state.player.first = zone_cell_in_blue_starter ? 'blue' : 'green'

      if( state.turn < 8 )
      {
        var
        athlete_index = state.selected.now ,
        color         = state.player.now()

        athletes[ athlete_index ].classList.add( color )
        state.team[ color ].push( athlete_index )
        state.starter[ color ] = state.starter[ color ].filter( cell => cell !== zone_cell )

        //..............................................................................................................
        // simple move (can be abstracted)
        //
        var
        new_x = a_to_t.indexOf( zone_cell_letter ) * root_raw.cell_size + root_raw.border_full ,
        new_y = zone_cell_number * root_raw.cell_size + root_raw.border_full

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
            x_is_equal       = athlete_rect_x.toFixed( 1 ) === athlete_margin_x.toFixed( 1 ) ,
            y_is_equal       = athlete_rect_y.toFixed( 1 ) === athlete_margin_y.toFixed( 1 )

            return x_is_equal && y_is_equal
          } ,
          act : _ =>
          {
            state.turn ++

            update_zone_cell()

            // localStorage.hard_ball_save_auto = JSON.stringify( state ) // not until the state is more solidified
          }
        } )
      }
      else
      {
        //
      }
    }
  }

  //....................................................................................................................
  // aim
  //
  else if( target === 'aim' )
  {
    //
  }

  //....................................................................................................................
  // nothing
  //
  else
  {
    change_selected( null )
  }
}

