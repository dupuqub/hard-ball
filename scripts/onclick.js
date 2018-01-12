
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
  // gameplay
  //
  else if( target === 'ball' )
  {}
  else if( target.slice( 0 , 7 ) === 'athlete' )
  {
    var
    athlete_number = Number( target.slice( 8 , 10 ) ) ,
    athlete_row = Number( state.athletes[ athlete_number ].cell.slice( 1 , 3 ) ) ,
    replaced_both = state.replaced.green.concat( state.replaced.green )

    if( athlete_row === 12 ) // athlete is benched
    {
      if( state.turn < 8 ) // while choosing athletes
      {
        change_selected( athlete_number )
      }
      else if( replaced_both.indexOf( athlete_number ) === -1 // athlete was not replaced
      && state.replaced[ state.player.now ].length < 2 ) // team has replacements left
      {
        //
      }
    }
    else // athlete is playing
    {
      //
    }
  }

  /*
  else if() // zones
  {}
  else if() // aim
  {}
  */

  else // nothing
  {
    change_selected( null )
  }
}

