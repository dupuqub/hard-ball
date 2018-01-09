
'use strict'

//..............................................................................
//
var
art_athlete = document.querySelectorAll( '.art_atl' ) ,
art_bench   = document.querySelectorAll( '.art_bnc' ) ,
foundation  = document.querySelector( '#foundation' ) ,
game        = document.querySelector( '#game' ) ,
game_scale  = 0.9 ,
aspect      = { x : 16 , y : 9 } ,

//..............................................................................
// Color control doesn't seem to work through here
// Inner text for reference (updates on resize)
//
root =
[
  '--foundation-w : 0 ;' ,
  '--foundation-h : 0 ;' ,
  '--game-w       : 0 ;' ,
  '--game-h       : 0 ;' ,
] ,

//..............................................................................
//
root_raw =
{
  foundation_w : 0 ,
  foundation_h : 0 ,
  game_w       : 0 ,
  game_h       : 0 ,
} ,

//..............................................................................
//
reroot = _ =>
{
  var rerooted = root.reduce( ( a , b ) => a + b )

  document.styleSheets[ 1 ].cssRules[ 0 ].style.cssText = rerooted
} ,

//..............................................................................
//
resize = _ =>
{
  if( window.innerHeight / aspect.y > window.innerWidth / aspect.x )
  {
    var
    height_foundation = window.innerWidth / aspect.x * aspect.y ,
    height_space      = ( window.innerHeight - height_foundation ) / 2 ,
    width_game        = height_foundation / 14 * 20

    root_raw.foundation_w = window.innerWidth
    root_raw.foundation_h = height_foundation
    root_raw.game_w       = width_game * game_scale
    root_raw.game_h       = height_foundation * game_scale

    root[ 0 ] = '--foundation-w:' + window.innerWidth + 'px;'
    root[ 1 ] = '--foundation-h:' + height_foundation + 'px;'
    root[ 2 ] = '--game-w:' + width_game * game_scale + 'px;'
    root[ 3 ] = '--game-h:' + height_foundation * game_scale + 'px;'
  }
  else
  {
    var
    width_foundation = window.innerHeight / aspect.y * aspect.x ,
    width_space      = ( window.innerWidth - width_foundation ) / 2 ,
    width_game       = window.innerHeight / 14 * 20

    root_raw.foundation_w = width_foundation
    root_raw.foundation_h = window.innerHeight
    root_raw.game_w       = width_game * game_scale
    root_raw.game_h       = window.innerHeight * game_scale

    root[ 0 ] = '--foundation-w:' + width_foundation + 'px;'
    root[ 1 ] = '--foundation-h:' + window.innerHeight + 'px;'
    root[ 2 ] = '--game-w:' + width_game * game_scale + 'px;'
    root[ 3 ] = '--game-h:' + window.innerHeight * game_scale + 'px;'
  }
} ,

//..............................................................................
//
write_svg = ( $ , size , klass ) =>
{
  var
  rect = art_matrix[ $ ].rects ,
  text = '<rect x="' + rect[0][1] * size + '" y="' + rect[0][0] * size + '" class="sqr_art ' + klass + '"></rect>' +
         '<rect x="' + rect[1][1] * size + '" y="' + rect[1][0] * size + '" class="sqr_art ' + klass + '"></rect>' +
         '<rect x="' + rect[2][1] * size + '" y="' + rect[2][0] * size + '" class="sqr_art ' + klass + '"></rect>' +
         '<rect x="' + rect[3][1] * size + '" y="' + rect[3][0] * size + '" class="sqr_art ' + klass + '"></rect>'

  return text
} ,

//..............................................................................
//
redraw = _ =>
{
  Array.from( art_bench ).forEach( ( art , $ ) =>
  {
    var
    size       = root_raw.game_w / 20 / 7 ,
    new_width  = art_matrix[ $ ].w * size ,
    new_height = art_matrix[ $ ].h * size

    art_bench[ $ ].innerHTML    = write_svg( $ , size , 'fil_bnc' )
    art_bench[ $ ].style.width  = new_width
    art_bench[ $ ].style.height = new_height
  } )
} ,

//..............................................................................
//
art_matrix =
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

