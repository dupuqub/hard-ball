
'use strict'

//......................................................................................................................
//
var load_file = save_file =>
{
  state = JSON.parse( localStorage[ save_file ] )

  athletes.forEach( ( athlete , $ ) =>
  {
    athlete.classList.remove( 'blue' )
    athlete.classList.remove( 'green' )

    state.team.blue.indexOf( $ ) !== - 1
    ? athlete.classList.add( 'blue' )
    : state.team.green.indexOf( $ ) !== - 1
    ? athlete.classList.add( 'green' )
    : null
  } )

  zones.forEach( zone => zone.classList.add( 'zon_nop' ) )

  if( state.selected.now !== null ) change_selected( state.selected.now )

  update_lights()

  reload.athletes()
  reload.zones()
}

