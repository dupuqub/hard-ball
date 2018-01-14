
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
var log = content => console.log( content )

//......................................................................................................................
//
var state =
{
  turn     : 0 ,
  hovered  : { old : null , now : null } , // from 0 to 19 or 'ball' or null
  selected : { old : null , now : null } , // from 0 to 19 or 'ball' or null
  keeper   : { blue : null , green : null } ,
  player   : { first : null , now : _ => {

    var turn_is_even = state.turn % 2 === 0

    return state.player.first === 'blue'
           ? ( turn_is_even ? 'blue' : 'green' )
           : ( turn_is_even ? 'green' : 'blue' )
  } } ,
  team     : { blue : [] , green : [] } ,
  replaced : { blue : [] , green : [] } ,
  starter  : { blue : [ 'C02','C09','D03','D08' ] , green : [ 'Q03','Q08','R02','R09' ] } ,
  aim      : null ,
  ball     : null ,
  athletes : ( _ => {

    var new_array = []
    for( var $ = 0 ; $ < 20 ; $ ++ ) new_array.push( a_to_t[ $ ] + 12 )
    return new_array
  } )() ,
  zones    : ( _ => {

    var new_array = []
    for( var $ = 0 ; $ < 16 ; $ ++ ) new_array.push( null )
    return new_array
  } )() , // it didn't have to be here, but this is better for code organization
}

//......................................................................................................................
//
var loop = _ =>
{
  game_console.innerHTML = 'loading... joking, it isn\'t'

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
    //
    update_zone_cell()

    state.selected.old = state.selected.now
  }

  //....................................................................................................................
  // selected animation control
  //
  ball.classList.remove( 'slc' )
  athletes.forEach( athlete => athlete.classList.remove( 'slc' ) )

  if( target !== null )
  {
    setTimeout( _ =>
    {
      return target === 'ball'
             ? ball.classList.add( 'slc' )
             : athletes[ target ].classList.add( 'slc' )
    } , 0 )
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
    //
    update_zone_cell()

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
  reload.zones()
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
reload.zones()
reload.ball()

loop()

