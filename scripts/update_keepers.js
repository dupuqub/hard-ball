
'use strict'

//......................................................................................................................
//
G.update_keepers = _ =>
{
  const
  playing_cells = G.athletes_playing_cells() ,
  colors        = [ 'blue' , 'green' ]

  G.S.keepers = { blue : null , green : null }

  colors.forEach( color =>
  {
    playing_cells[ color ].forEach( cell =>
    {
      if( G.I.area[ color ].indexOf( cell ) !== -1 )
      {
        G.S.keepers[ color ] = G.S.athletes.indexOf( cell )
      }
    } )
  } )
}

