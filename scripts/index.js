
'use strict'

//......................................................................................................................
//
var
arts_athlete = document.querySelectorAll( '.art_atl' ) ,
arts_bench   = document.querySelectorAll( '.art_bnc' ) ,
athletes     = document.querySelectorAll( '.atl' ) ,
zones        = document.querySelectorAll( '.zon' ) ,

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
  hovered  : { old : null , now : null } , // from 0 to 19 or 'ball' or null
  selected : { old : null , now : null } , // from 0 to 19 or 'ball' or null
  team     : { blue : [] , green : [] } ,
  replaced : { blue : [] , green : [] } ,
  starter  : { blue : [ 'C02','C09','D03','D08' ] , green : [ 'Q03','Q08','R02','R09' ] } ,
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
var change_selected = target =>
{
  state.selected.now = target

  if( state.selected.old !== state.selected.now )
  {
    // everything that triggers when the click target changes

    state.selected.old = state.selected.now
  }

  // selected animation control
  //
  ball.classList.remove( 'slc' )
  athletes.forEach( athlete => athlete.classList.remove( 'slc' ) )

  if( target !== null )
  {
    setTimeout( _ => target === 'ball' ? ball.classList.add( 'slc' ) : athletes[ target ].classList.add( 'slc' ) , 0 )
  }
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
