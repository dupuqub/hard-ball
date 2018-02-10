
'use strict'

// lights
// punt
// try score
// game over
// utilities
// console

//......................................................................................................................
//
onmousemove = event => G.mouse_move( event.target.id )
onclick     = event => G.click( event.target.id )
onresize    = event => G.resize()

//......................................................................................................................
//
G.run = _ =>
{
  G.check.tool()

  window.requestAnimationFrame( G.run )
}

//......................................................................................................................
//
G.start = _ =>
{
  if( localStorage.hard_ball_auto_save !== undefined ){ /* load */ }

  G.resize()
  G.run()
}

//......................................................................................................................
//
G.start()

