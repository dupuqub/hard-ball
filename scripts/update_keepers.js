
'use strict'

//......................................................................................................................
//
var update_keepers = _ =>
{
  var
  playing_cells = athletes_playing_cells() ,
  colors        = [ 'blue' , 'green' ]

  state.keepers = { blue : null , green : null }

  colors.forEach( color =>
  {
    playing_cells[ color ].forEach( cell =>
    {
      if( area[ color ].indexOf( cell ) !== -1 )
      {
        state.keepers[ color ] = state.athletes.indexOf( cell )
      }
    } )
  } )
}

