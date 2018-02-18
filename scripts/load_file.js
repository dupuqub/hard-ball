
'use strict'

//......................................................................................................................
//
G.load_file = save_file =>
{
  //....................................................................................................................
  // rebuild state
  //
  G.S = JSON.parse( localStorage[ save_file ] )

  //....................................................................................................................
  // check selected
  //
  if( G.S.selected !== null ) G.update_selected( G.S.selected )

  //....................................................................................................................
  // colorize athletes
  //
  G.D.athletes.forEach( ( athlete , $ ) =>
  {
    athlete.classList.remove( 'blue' )
    athlete.classList.remove( 'green' )

      G.S.team.blue.indexOf( $ ) !== -1
    ? athlete.classList.add( 'blue' )
    : G.S.team.green.indexOf( $ ) !== -1
    ? athlete.classList.add( 'green' )
    : null
  } )

  //....................................................................................................................
  // path
  //
  document.querySelectorAll( '.cll' ).forEach( cell => cell.classList.remove( 'pat' ) )

  if( G.S.path.length ) G.light_path( 'add' )

  //....................................................................................................................
  // updates
  //
  G.update_lights()
  G.resize()
}

