
'use strict'

//......................................................................................................................
//
var reload =
{

  //....................................................................................................................
  //
  athletes : _ =>
  {
    athletes.forEach( ( athlete , $ ) =>
    {
      var
      cell_name = state.athletes[ $ ].cell ,
      new_x     = a_to_t.indexOf( cell_name.slice( 0 , 1 ) ) * root_raw.cell_size + root_raw.border_full ,
      new_y     = Number( cell_name.slice( 1 , 3 ) ) * root_raw.cell_size + root_raw.border_full

      athlete.style.transform = 'translate3d(' + new_x + 'px,' + new_y + 'px,0)'
      athlete.classList.remove( 'tra_atl' )
    } )

    setTimeout( _ => athletes.forEach( athlete => athlete.classList.add( 'tra_atl' ) ) , 0 )
  } ,

  //....................................................................................................................
  //
  ball : _ =>
  {
    var
    cell_ball = state.ball.cell ,
    cell_aim  = state.aim.cell ,
    ball_x    = 0 ,
    ball_y    = 0 ,
    aim_x     = 0 ,
    aim_y     = 0

    if( cell_ball === null )
    {
      ball_x = root_raw.game_w / 2 - root_raw.athlete_size / 2
      ball_y = root_raw.game_h_real / 2 - root_raw.athlete_size / 2
      aim_x = ball_x
      aim_y = ball_y
    }
    else
    {
      ball_x = a_to_t.indexOf( cell_ball.slice( 0 , 1 ) ) * root_raw.cell_size + root_raw.border_full
      ball_y = Number( cell_ball.slice( 1 , 3 ) ) * root_raw.cell_size + root_raw.border_full
      aim_x = a_to_t.indexOf( cell_aim.slice( 0 , 1 ) ) * root_raw.cell_size + root_raw.border_full
      aim_y = Number( cell_aim.slice( 1 , 3 ) ) * root_raw.cell_size + root_raw.border_full
    }

    ball.style.transform = 'translate3d(' + ball_x + 'px,' + ball_y + 'px,0)'
    aim.style.transform = 'translate3d(' + aim_x + 'px,' + aim_y + 'px,0)'
  } ,
}

