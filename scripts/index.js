
'use strict'

//......................................................................................................................
//
var
art_athlete = document.querySelectorAll( '.art_atl' ) ,
art_bench   = document.querySelectorAll( '.art_bnc' ) ,
foundation  = document.querySelector( '#foundation' ) ,
game        = document.querySelector( '#game' ) ,
game_scale  = 0.9 ,
aspect      = { x : 16 , y : 9 } ,

//......................................................................................................................
//
onresize = event =>
{
  resize()
  reroot()
  redraw( art_bench , 'fil_bnc' )
}

//......................................................................................................................
//
resize()
reroot()
redraw( art_bench , 'fil_bnc' )

