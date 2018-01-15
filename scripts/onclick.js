
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
    athlete_row   = Number( state.athletes[ athlete_index ].cell.slice( 1 , 3 ) ) ,
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
      //
    }
  }

  //....................................................................................................................
  // zone
  //
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

        state.athletes[ athlete_index ] = { cell : zone_cell , x : new_x , y : new_y }
        athletes[ athlete_index ].style.transform = 'translate3d(' + new_x + 'px,' + new_y + 'px,0)'

        check.pool.push(
        {
          test : _ =>
          {
            var
            state_athlete = state.athletes[ state.selected.now ] ,
            now_letter    = a_to_t[ ( state_athlete.x - root_raw.border_full ) / root_raw.cell_size ] ,
            last_letter   = state_athlete.cell.slice( 0 , 1 ) ,
            now_number    = ( state_athlete.y - root_raw.border_full ) / root_raw.cell_size ,
            last_number   = Number( state_athlete.cell.slice( 1 , 3 ) )

            return now_letter === last_letter && now_number === last_number
          } ,
          act : _ =>
          {
            state.turn ++

            change_selected( null )

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

