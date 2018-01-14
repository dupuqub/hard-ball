
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
    athlete_number = Number( target.slice( 8 , 10 ) ) ,
    athlete_row    = Number( state.athletes[ athlete_number ].slice( 1 , 3 ) ) ,
    replaced_both  = state.replaced.green.concat( state.replaced.green )

    if( athlete_row === 12 ) // athlete is benched
    {
      if( state.turn < 8 ) // while choosing athletes
      {
        change_selected( athlete_number )
      }
      else if( replaced_both.indexOf( athlete_number ) === -1 // athlete was not replaced
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
    zone_cell_in_blue_starter = state.starter.blue.indexOf( zone_cell ) !== -1

    if( selected === 'ball' )
    {
      //
    }
    else if( selected !== null )
    {
      if( state.turn === 0 )
      {
        state.player.first = zone_cell_in_blue_starter ? 'blue' : 'green'
      }

      if( state.turn < 8 )
      {
        // to-do list
        //
        // send athlete to its place
        // lock game while athlete moves
        // change turn and autosave when athlete reaches destination

        var
        athlete_index = state.selected.now ,
        color         = state.player.now()

        athletes[ athlete_index ].classList.add( color )
        state.team[ color ].push( athlete_index )
        state.starter[ color ] = state.starter[ color ].filter( cell => cell !== zone_cell )

        change_selected( null )
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

