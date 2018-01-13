
'use strict'

//......................................................................................................................
//
var update_zone_cell = _ =>
{
  state.zones.forEach( ( zone , $ ) => state.zones[ $ ] = null )

  var hovered = state.hovered.now

  if( hovered === 'ball' )
  {
    if( state.ball === null )
    {
      ball.style.zIndex = "1"

      var middle = [ 'J05' , 'J06' , 'K05' , 'K06' ]

      for( var $ = 0 ; $ < 4 ; $ ++ ) state.zones[ $ ] = middle[ $ ]
    }
  }
  else if( Number.isInteger( hovered ) ) // hovering athlete
  {
    //
  }

  reload.zones()
}

