
'use strict'

//..............................................................................
//
var art_athlete = document.querySelectorAll( '.art_atl' )
var art_bench = document.querySelectorAll( '.art_bnc' )

var foundation = document.querySelector( '#foundation' )
var game = document.querySelector( '#game' )

var game_scale = 0.9
var aspect = { x : 16 , y : 9 }

//..............................................................................
//
var root = [] // color control doesn't seem to work through here

var root_raw =
{
  foundation_w : 0 ,
  foundation_h : 0 ,
  game_w       : 0 ,
  game_h       : 0 ,
}

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

    root_raw.foundation_w = window.innerWidth
    root_raw.foundation_h = height_foundation
    root_raw.game_w = width_game * game_scale
    root_raw.game_h = height_foundation * game_scale
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

    root_raw.foundation_w = width_foundation
    root_raw.foundation_h = window.innerHeight
    root_raw.game_w = width_game * game_scale
    root_raw.game_h = window.innerHeight * game_scale
  }
}

//..............................................................................
//
var write_svg = $ =>
{
  var message = '<rect x="' + 0 + '" y="' + 0 + '" class="sqr_art"></rect>' +
                '<rect x="' + 0 + '" y="' + 0 + '" class="sqr_art"></rect>' +
                '<rect x="' + 0 + '" y="' + 0 + '" class="sqr_art"></rect>' +
                '<rect x="' + 0 + '" y="' + 0 + '" class="sqr_art"></rect>'

  return message
}

//..............................................................................
//
var redraw = _ =>
{
  Array.from( art_bench ).forEach( ( art , $ ) =>
  {
    var cell_size = root_raw.game_w / 20
    var square_size = cell_size / 7

    var new_width = art_matrix[ $ ].w * square_size
    var new_height = art_matrix[ $ ].h * square_size

    art_bench[ $ ].innerHTML = write_svg( $ )
    art_bench[ $ ].style.width = String( new_width )
    art_bench[ $ ].style.height = String( new_height )

    art_bench[ $ ].style.background = 'pink'
  } )
}

//..............................................................................
//
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

