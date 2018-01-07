
'use strict'

//..............................................................................
//
var foundation = document.querySelector( '#foundation' )
var game = document.querySelector( '#game' )
var game_scale = 0.9
var aspect = { x : 16 , y : 9 }

//..............................................................................
//
var root =
[
  '--foundation-w :   0 ;' ,
  '--foundation-h :   0 ;' ,
  '--game-w :         0 ;' ,
  '--game-h :         0 ;' ,
  '--game-radius :    calc( var( --foundation-h ) / 20 ) ;' ,
  '--border-full :    calc( var( --foundation-h ) / 400 ) ;' ,
  '--border-half :    calc( var( --border-full ) / 2 ) ;' ,
  '--border-double :  calc( var( --border-full ) * 2 ) ;' ,
  '--cell-w :         calc( var( --game-w ) / 20 ) ;' ,
  '--cell-h :         calc( var( --game-h ) / 15 ) ;' ,
  '--gol-w :          calc( var( --cell-w ) / 4 * 3 ) ;' ,
  '--gol-h :          calc( var( --cell-h ) / 4 * 3 ) ;' ,
  '--field-middle-w : calc( var( --game-w ) / 2 ) ;' ,
  '--field-middle-h : calc( var( --game-h ) / 15 * 12 / 2 ) ;' ,
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
    var width_game = height_foundation / 15 * 20

    root[ 0 ] = '--foundation-w:' + window.innerWidth + 'px;'
    root[ 1 ] = '--foundation-h:' + height_foundation + 'px;'
    root[ 2 ] = '--game-w:' + width_game * game_scale + 'px;'
    root[ 3 ] = '--game-h:' + height_foundation * game_scale + 'px;'
  }
  else
  {
    var width_foundation = window.innerHeight / aspect.y * aspect.x
    var width_space = ( window.innerWidth - width_foundation ) / 2
    var width_game = window.innerHeight / 15 * 20

    root[ 0 ] = '--foundation-w:' + width_foundation + 'px;'
    root[ 1 ] = '--foundation-h:' + window.innerHeight + 'px;'
    root[ 2 ] = '--game-w:' + width_game * game_scale + 'px;'
    root[ 3 ] = '--game-h:' + window.innerHeight * game_scale + 'px;'
  }
}

//..............................................................................
//
onresize = event =>
{
  resize()
  reroot()
}

//..............................................................................
//
resize()
reroot()

