
'use strict'

//......................................................................................................................
//
G.load_file = save_file =>
{
  //....................................................................................................................
  // rebuild state
  //
  G.S = JSON.parse( localStorage[ save_file ] )

  G.S.hovered = null

  //....................................................................................................................
  // colorize athletes
  //
  G.D.athletes.forEach( ( athlete , $ ) =>
  {
    athlete.classList.remove( 'blue' )
    athlete.classList.remove( 'green' )
    athlete.classList.remove( 'rep' )

      G.S.team.blue.indexOf( $ ) !== -1 || G.S.replaced.blue.indexOf( $ ) !== -1
    ? athlete.classList.add( 'blue' )
    : G.S.team.green.indexOf( $ ) !== -1 || G.S.replaced.green.indexOf( $ ) !== -1
    ? athlete.classList.add( 'green' )
    : null

      G.S.replaced.blue.concat( G.S.replaced.green ).indexOf( $ ) !== -1
    ? athlete.classList.add( 'rep' )
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
  G.update_selected( G.S.selected )
  G.update_lights()
  G.update_bulbs()
  G.resize()
}

