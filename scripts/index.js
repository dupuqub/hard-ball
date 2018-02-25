
'use strict'

// TO DO
//
// goal art
// console
// utilities (complex save/load)
// "HARD" and "BALL" on laterals
// initial fade from black
// autosave

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
  if( localStorage.hard_ball_auto_save !== undefined )
  {
    G.load_file( 'hard_ball_auto_save' )
  }

  G.resize()
  G.run()
}

//......................................................................................................................
//
G.start()

