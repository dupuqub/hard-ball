
'use strict'

//......................................................................................................................
//
var
arts_athlete = document.querySelectorAll( '.art_atl' ) ,
arts_bench   = document.querySelectorAll( '.art_bnc' ) ,
athletes     = document.querySelectorAll( '.atl' ) ,

game_console = document.querySelector( '#game_console' ) ,
foundation   = document.querySelector( '#foundation' ) ,
game         = document.querySelector( '#game' ) ,
ball         = document.querySelector( '#ball' ) ,
aim          = document.querySelector( '#aim' ) ,

game_scale   = 0.9 ,
aspect       = { x : 16 , y : 9 } ,
a_to_t       = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T' ]

//......................................................................................................................
//
var state =
{
  turn     : 0 ,
  player   : { first : null , now : null } , // 'green' or 'blue'
  team     : { blue : [] , green : [] } ,
  replaced : { blue : [] , green : [] } ,
  hovered  : { old : 0 , now : 0 } ,
  aim      : { cell : null } ,
  ball     : { cell : null } ,
  athletes : ( _ =>
  {
    var new_array = []

    for( var $ = 0 ; $ < 20 ; $ ++ )
    {
      var new_athlete = { cell : a_to_t[ $ ] + 12 }

      new_array.push( new_athlete )
    }

    return new_array
  } )() ,
}

//......................................................................................................................
//
var loop = _ =>
{
  game_console.innerHTML = 'loading... joking, it isn\'t'

  // updates who plays now
  //
  if( state.player.first === 'blue' ) state.player.now = state.turn % 2 === 0 ? 'green' : 'blue'
  else if( state.player.first === 'green' ) state.player.now = state.turn % 2 === 0 ? 'blue' : 'green'

  window.requestAnimationFrame( loop )
}

//......................................................................................................................
//
onmousemove = event =>
{
  state.hovered.now = event.target.id

  if( state.hovered.now !== state.hovered.old )
  {
    // everything that triggers when the hover target changes

    state.hovered.old = state.hovered.now
  }
}

//......................................................................................................................
//
onclick = event =>
{
  var target = event.target.id

  //....................................................................................................................
  // utilities
  //
  if( target === 'language' )
  {}
  else if( target === 'save' )
  {}
  else if( target === 'load' )
  {}
  else if( target === 'reset' )
  {}
  else if( target === 'github' )
  {}

  //....................................................................................................................
  // gameplay
  //
  else if( target === 'ball' )
  {}
  else if( target.slice( 0 , 7 ) === 'athlete' )
  {
    var
    athlete_number = Number( target.slice( 8 , 10 ) ) ,
    athlete_row = Number( state.athletes[ athlete_number ].cell.slice( 1 , 3 ) ) ,
    replaced_both = state.replaced.green.concat( state.replaced.green )

    if( athlete_row === 12 ) // athlete is in the bench
    {
      if( state.turn < 8 ) // while choosing athletes
      {
        //
      }
      else if( replaced_both.indexOf( athlete_number ) === -1 // athlete is not replaced
      && state.replaced[ state.player.now ].length < 2 ) // team has replacements left
      {
        //
      }
    }
    else // athlete is on the field
    {
      //
    }
  }
  else if( 1 ) /* zones */
  {}
  else if( 1 ) /* aim */
  {}
}

//......................................................................................................................
//
onresize = event =>
{
  resize()
  reroot()
  redraw( arts_athlete , 'fil_atl' )
  redraw( arts_bench , 'fil_bnc' )

  reload.athletes()
  reload.ball()
}

//......................................................................................................................
// check for a automatic save file
//
if( localStorage.hard_ball_save_auto !== undefined )
{
  state = JSON.parse( localStorage.hard_ball_save_auto )
}

// initialize
//
resize()
reroot()
redraw( arts_athlete , 'fil_atl' )
redraw( arts_bench , 'fil_bnc' )

reload.athletes()
reload.ball()

loop()
