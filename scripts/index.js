
'use strict'

// TO DO
//
// selection through zon_not
// bulbs
// punt (punter chooses opponent to get ball)
// goal (finish game)
// console
// utilities (complex save/load)
// "HARD" and "BALL" on laterals
// initial fade from black

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

