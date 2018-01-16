
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
  else if( ! state.lock )
  {
    //....................................................................................................................
    // ball
    //
    if( target === 'ball' )
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
      else if( state.turn < 8 || ! state.rounding )
      {
        change_selected( athlete_index )
      }
    }

    //....................................................................................................................
    // zone
    //
    else if( target.slice( 0 , 4 ) === 'zone' )
    {
      var zone_class_list = Array.from( zones[ Number( target.slice( 5 , 7 ) ) ].classList )

      if( zone_class_list.indexOf( 'zon_nop' ) !== - 1 )
      {
        // do nothing (gameplay focused choice)
      }
      else if( zone_class_list.indexOf( 'zon_blk' ) !== - 1 )
      {
        // do nothing (gameplay focused choice)
      }
      else
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

            simple_move( zone_cell )
          }

          //..............................................................................................................
          // roundabouting
          //
          else if( state.rounding )
          {
            if( zone_class_list.indexOf( 'zon_red' ) !== - 1 ) // has target
            {
              //
            }
            else // no target
            {
              //
            }
          }

          //..............................................................................................................
          // common play
          //
          else
          {
            if( zone_class_list.indexOf( 'zon_red' ) !== - 1 ) // has target
            {
              //
            }
            else // no target
            {
              simple_move( zone_cell )
            }
          }
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
}

