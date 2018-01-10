
'use strict'

//......................................................................................................................
//
var
arts_athlete = document.querySelectorAll( '.art_atl' ) ,
arts_bench   = document.querySelectorAll( '.art_bnc' ) ,
athletes     = document.querySelectorAll( '.atl' ) ,

foundation   = document.querySelector( '#foundation' ) ,
game         = document.querySelector( '#game' ) ,
ball         = document.querySelector( '#ball' ) ,

game_scale   = 0.9 ,
aspect       = { x : 16 , y : 9 } ,
a_to_t       = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T' ]

//......................................................................................................................
//
var state =
{
  ball : { cell : null } ,
  athletes : ( _ =>
  {
    var new_array = []

    for( var $ = 0 ; $ < 20 ; $ ++ )
    {
      var new_athlete = { cell : a_to_t[ $ ] + 12 }

      new_array.push( new_athlete )
    }

    return new_array
  } )() ,
}

//......................................................................................................................
//
onresize = event =>
{
  resize()
  reroot()
  redraw( arts_athlete , 'fil_atl' )
  redraw( arts_bench , 'fil_bnc' )

  reload.athletes()
  reload.ball()
}

//......................................................................................................................
// Check for a automatic save file
//
if( localStorage.hard_ball_save_auto !== undefined )
{
  state = JSON.parse( localStorage.hard_ball_save_auto )
}

// Initialize
//
resize()
reroot()
redraw( arts_athlete , 'fil_atl' )
redraw( arts_bench , 'fil_bnc' )

reload.athletes()
reload.ball()

