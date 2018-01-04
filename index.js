
'use strict'

var foundation = document.querySelector( '#foundation' )
var board = document.querySelector( '#board' )
var aspect = { x : 16, y : 9 }

var resize = _ =>
{
  var scale = 0.9

  if( window.innerHeight / aspect.y > window.innerWidth / aspect.x )
  {
    var height_foundation = window.innerWidth / aspect.x * aspect.y
    var height_space = ( window.innerHeight - height_foundation ) / 2
    var width_board = height_foundation / 15 * 20

    foundation.style.width = window.innerWidth + 'px'
    foundation.style.height = height_foundation + 'px'
    foundation.style.transform = 'translateY(' + height_space + 'px)'

    board.style.width = width_board * scale + 'px'
    board.style.height = height_foundation * scale + 'px'
  }
  else
  {
    var width_foundation = window.innerHeight / aspect.y * aspect.x
    var width_space = ( window.innerWidth - width_foundation ) / 2
    var width_board = window.innerHeight / 15 * 20

    foundation.style.width = width_foundation + 'px'
    foundation.style.height = window.innerHeight + 'px'
    foundation.style.transform = 'translateX(' + width_space + 'px)'

    board.style.width = width_board * scale + 'px'
    board.style.height = window.innerHeight * scale + 'px'
  }
}

resize() // on initialization

onresize = event => resize() // on every screen resize event

