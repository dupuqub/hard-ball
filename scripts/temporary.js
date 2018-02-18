
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

