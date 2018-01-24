
'use strict'

//......................................................................................................................
//
var change_selected = target =>
{
  state.selected.now = target

  if( state.selected.old !== state.selected.now )
  {
    // everything that triggers when the click target changes
    //
    update_zone_cell()

    state.selected.old = state.selected.now
  }

  //....................................................................................................................
  // selected animation control
  //
  ball.classList.remove( 'slc' )
  athletes.forEach( athlete => athlete.classList.remove( 'slc' ) )

  if( target !== null )
  {
    setTimeout( _ =>
    {
      return(
        target === 'ball'
        ? ball.classList.add( 'slc' )
        : athletes[ target ].classList.add( 'slc' )
      )
    } , 0 )
  }
}

