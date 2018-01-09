
'use strict'

//..............................................................................
//
var foundation = document.querySelector( '#foundation' )
var game = document.querySelector( '#game' )
var game_scale = 0.9
var aspect = { x : 16 , y : 9 }

//..............................................................................
//
var root = // color control doesn't seem to work through here
[
  '--foundation-w :   0 ;' ,
  '--foundation-h :   0 ;' ,
  '--game-w :         0 ;' ,
  '--game-h :         0 ;' ,
]

//..............................................................................
//
var reroot = _ =>
{
  var rerooted = root.reduce( ( a, b ) => a + b )

  document.styleSheets[ 1 ].cssRules[ 0 ].style.cssText = rerooted
}

//..............................................................................
//
var resize = _ =>
{
  if( window.innerHeight / aspect.y > window.innerWidth / aspect.x )
  {
    var height_foundation = window.innerWidth / aspect.x * aspect.y
    var height_space = ( window.innerHeight - height_foundation ) / 2
    var width_game = height_foundation / 14 * 20

    root[ 0 ] = '--foundation-w:' + window.innerWidth + 'px;'
    root[ 1 ] = '--foundation-h:' + height_foundation + 'px;'
    root[ 2 ] = '--game-w:' + width_game * game_scale + 'px;'
    root[ 3 ] = '--game-h:' + height_foundation * game_scale + 'px;'
  }
  else
  {
    var width_foundation = window.innerHeight / aspect.y * aspect.x
    var width_space = ( window.innerWidth - width_foundation ) / 2
    var width_game = window.innerHeight / 14 * 20

    root[ 0 ] = '--foundation-w:' + width_foundation + 'px;'
    root[ 1 ] = '--foundation-h:' + window.innerHeight + 'px;'
    root[ 2 ] = '--game-w:' + width_game * game_scale + 'px;'
    root[ 3 ] = '--game-h:' + window.innerHeight * game_scale + 'px;'
  }
}

//..............................................................................
//
var redraw = _ =>
{
  //
}

var art_matrix =
[
  // Most valuable
  { w : 2 , h : 3 , rects : [ [0,1] , [1,0] , [1,1] , [2,0] ] } ,
  { w : 2 , h : 3 , rects : [ [0,0] , [0,1] , [1,0] , [2,0] ] } ,
  { w : 2 , h : 3 , rects : [ [0,0] , [1,1] , [2,0] , [2,1] ] } ,
  { w : 3 , h : 3 , rects : [ [0,2] , [1,1] , [2,0] , [2,1] ] } ,
  { w : 2 , h : 3 , rects : [ [0,1] , [1,0] , [1,1] , [2,1] ] } ,
  { w : 2 , h : 4 , rects : [ [0,1] , [1,0] , [2,0] , [3,0] ] } ,
  { w : 2 , h : 4 , rects : [ [0,1] , [1,1] , [2,0] , [3,0] ] } ,
  { w : 2 , h : 4 , rects : [ [0,1] , [1,0] , [2,1] , [3,0] ] } ,
  { w : 3 , h : 4 , rects : [ [0,2] , [1,1] , [2,0] , [3,1] ] } ,
  { w : 3 , h : 3 , rects : [ [0,2] , [1,0] , [1,1] , [2,1] ] } ,
  { w : 3 , h : 3 , rects : [ [0,2] , [1,0] , [1,2] , [2,1] ] } ,
  { w : 3 , h : 4 , rects : [ [0,2] , [1,1] , [2,1] , [3,0] ] } ,
  { w : 3 , h : 4 , rects : [ [0,2] , [1,1] , [2,0] , [3,0] ] } ,
  { w : 2 , h : 2 , rects : [ [0,0] , [0,1] , [1,0] , [1,1] ] } ,
  { w : 1 , h : 4 , rects : [ [0,0] , [1,0] , [2,0] , [3,0] ] } ,
  { w : 2 , h : 4 , rects : [ [0,0] , [1,1] , [2,0] , [3,0] ] } ,
  { w : 2 , h : 4 , rects : [ [0,0] , [1,1] , [2,1] , [3,0] ] } ,
  { w : 4 , h : 4 , rects : [ [0,3] , [1,2] , [2,1] , [3,0] ] } ,
  { w : 3 , h : 3 , rects : [ [0,1] , [0,2] , [1,0] , [2,0] ] } ,
  { w : 3 , h : 3 , rects : [ [0,1] , [1,0] , [1,2] , [2,1] ] } ,
  // Least valuable
]

//..............................................................................
//
onresize = event =>
{
  resize()
  reroot()
  redraw()
}

//..............................................................................
//
resize()
reroot()
redraw()

