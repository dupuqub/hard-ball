
'use strict'

//......................................................................................................................
//
onkeydown = event =>
{
  const pressed = event.key

  if( ! event.ctrlKey && ! event.altKey)
  {
    if( pressed === '0' )
    {
        confirm( 'ERASE ALL SAVE FILES ?' )
      ? localStorage.clear()
      : null
    }
    else if( pressed !== ' ' && Number.isInteger( Number( pressed ) ) )
    {
      const
      save_file    = 'hard_ball_save_' + pressed ,
      string_state = JSON.stringify( G.S )

      localStorage[ save_file ] === undefined
      ?
          confirm( 'SAVE ?' )
        ? localStorage[ save_file ] = string_state
        : null

      : confirm( 'LOAD ?' )
      ? G.load_file( save_file )
      : confirm( 'REPLACE ?' )
      ? localStorage[ save_file ] = string_state
      : confirm( 'ERASE ?' )
      ? localStorage.removeItem( save_file )
      : null
    }
  }
}

//......................................................................................................................
//
G.load_file = save_file =>
{
  // rebuild state
  //
  G.S = JSON.parse( localStorage[ save_file ] )

  // check selected
  //
  if( G.S.selected !== null ) G.update_selected( G.S.selected )

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

  // updates
  //
  G.update_lights()
  G.resize()
}

