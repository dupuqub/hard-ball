
'use strict'

//......................................................................................................................
//
var load = save_file =>
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

  if( state.selected.now !== null ) change_selected( state.selected.now )

  zones.forEach( zone => zone.classList.add( 'zon_nop' ) )

  reload.athletes()
  reload.zones()
}

//......................................................................................................................
//
onkeydown = event =>
{
  var pressed = event.key

  if( ! event.ctrlKey )
  {
    if( pressed === '0' )
    {
      confirm( 'ERASE ALL SAVE FILES' )
      ? localStorage.clear()
      : null
    }
    else if( pressed !== ' ' && Number.isInteger( Number( pressed ) ) )
    {
      var
      save_file = 'hard_ball_save_' + pressed ,
      string_state = JSON.stringify( state )

      localStorage[ save_file ] === undefined
      ? ( confirm( 'SAVE ?' ) ? localStorage[ save_file ] = string_state : null )
      : confirm( 'LOAD ?' )
      ? load( save_file )
      : confirm( 'REPLACE ?' )
      ? localStorage[ save_file ] = string_state
      : confirm( 'ERASE ?' )
      ? localStorage.removeItem( save_file )
      : null
    }
  }
}