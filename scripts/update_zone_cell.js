
'use strict'

//......................................................................................................................
//
var update_zone_cell = _ =>
{
  state.zones.forEach( ( zone , $ ) => state.zones[ $ ] = null )

  var
  hovered = state.hovered.now ,
  selected = state.selected.now

  //....................................................................................................................
  //
  if( hovered === 'ball' )
  {
    if( state.ball === null )
    {
      ball.style.zIndex = "1"

      var middle = [ 'J05' , 'J06' , 'K05' , 'K06' ]

      for( var $ = 0 ; $ < 4 ; $ ++ ) state.zones[ $ ] = middle[ $ ]
    }
  }

  //....................................................................................................................
  //
  else if( hovered.slice( 0 , 7 ) === 'athlete' )
  {
    if( state.turn < 8 )
    {
      if( state.turn === 0 )
      {
        var both_starter = state.starter.blue.concat( state.starter.green )

        for( var $ = 0 ; $ < 8 ; $ ++ ) state.zones[ $ ] = both_starter[ $ ]
      }
      else
      {
        //
      }
    }
    else
    {
      //
    }
  }

  //....................................................................................................................
  //
  else if( selected === 'ball' )
  {
    //
  }

  //....................................................................................................................
  //
  else if( selected !== null ) // athlete
  {
    if( state.turn < 8 )
    {
      if( state.turn === 0 )
      {
        var both_starter = state.starter.blue.concat( state.starter.green )

        for( var $ = 0 ; $ < 8 ; $ ++ ) state.zones[ $ ] = both_starter[ $ ]
      }
      else
      {
        //
      }
    }
    else
    {
      //
    }
  }

  reload.zones()
}

