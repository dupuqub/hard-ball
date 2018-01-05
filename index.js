
'use strict'

//..............................................................................
//
var foundation = document.querySelector( '#foundation' )
var board = document.querySelector( '#board' )
var aspect = { x : 16 , y : 9 }

//..............................................................................
//
var root =
[
  '--foundation-w : 0 ;' ,
  '--foundation-h : 0 ;' ,
  '--board-w : 0 ;' ,
  '--board-h : 0 ;' ,
]

//..............................................................................
//
var reroot = _ =>
{
  var rerooted = root.reduce( ( a, b ) => a + b )
  document.styleSheets[ 1 ].rules[ 0 ].style.cssText = rerooted
}

//..............................................................................
//
var resize = _ =>
{
  var scale = 0.9

  if( window.innerHeight / aspect.y > window.innerWidth / aspect.x )
  {
    var height_foundation = window.innerWidth / aspect.x * aspect.y
    var height_space = ( window.innerHeight - height_foundation ) / 2
    var width_board = height_foundation / 15 * 20

    root[ 0 ] = '--foundation-w:' + window.innerWidth + 'px;'
    root[ 1 ] = '--foundation-h:' + height_foundation + 'px;'
    root[ 2 ] = '--board-w:' + width_board * scale + 'px;'
    root[ 3 ] = '--board-h:' + height_foundation * scale + 'px;'
  }
  else
  {
    var width_foundation = window.innerHeight / aspect.y * aspect.x
    var width_space = ( window.innerWidth - width_foundation ) / 2
    var width_board = window.innerHeight / 15 * 20

    root[ 0 ] = '--foundation-w:' + width_foundation + 'px;'
    root[ 1 ] = '--foundation-h:' + window.innerHeight + 'px;'
    root[ 2 ] = '--board-w:' + width_board * scale + 'px;'
    root[ 3 ] = '--board-h:' + window.innerHeight * scale + 'px;'
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

