
'use strict'

//......................................................................................................................
//
var update_zone_cell = _ =>
{
  state.zones.forEach( ( zone , $ ) => state.zones[ $ ] = null )

  var
  hovered  = state.hovered.now ,
  selected = state.selected.now

  //....................................................................................................................
  //
  if( hovered === 'ball' )
  {
    if( state.ball === null )
    {
      ball.style.zIndex = "1"

      var middle = [ 'J05' , 'J06' , 'K05' , 'K06' ]

      middle.forEach( ( cell , $ ) => state.zones[ $ ] = cell )
    }
  }

  //....................................................................................................................
  //
  else if( hovered !== null && hovered.slice( 0 , 7 ) === 'athlete' )
  {
    var
    athlete_index       = Number( hovered.slice( 8 , 10 ) ) ,
    athlete_cell        = state.athletes[ athlete_index ].cell ,
    athlete_cell_letter = athlete_cell.slice( 0 , 1 ) ,
    athlete_cell_number = Number( athlete_cell.slice( 1 , 3 ) )

    if( state.turn === 0 )
    {
      var both_starters = state.starter.blue.concat( state.starter.green )

      both_starters.forEach( ( cell , $ ) => state.zones[ $ ] = cell )
    }
    else if( state.turn < 8 )
    {
      //
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
    if( state.turn === 0 )
    {
      var both_starter = state.starter.blue.concat( state.starter.green )

      both_starter.forEach( ( cell , $ ) => state.zones[ $ ] = cell )
    }
    else if( state.turn < 8 )
    {
      //
    }
    else
    {
      //
    }
  }

  //....................................................................................................................
  //
  reload.zones()
}

