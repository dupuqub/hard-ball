
'use strict'

//......................................................................................................................
//
G.reposition =
{
  //....................................................................................................................
  //
  athletes : _ =>
  {
    G.D.athletes.forEach( ( athlete , $ ) =>
    {
      const
      cell_name   = G.S.athletes[ $ ] ,
      cell_letter = cell_name.slice( 0 , 1 ) ,
      cell_number = Number( cell_name.slice( 1 ) ) ,
      new_x       = cell_number * G.I.cell_size + G.I.border_full ,
      new_y       = G.I.a_to_m.indexOf( cell_letter ) * G.I.cell_size + G.I.border_full

      athlete.style.marginLeft = new_x + "px"
      athlete.style.marginTop = new_y + "px"
      athlete.classList.remove( 'tra' )
    } )

    setTimeout( _ => G.D.athletes.forEach( athlete => athlete.classList.add( 'tra' ) ) , 0 )
  } ,

  //....................................................................................................................
  //
  zones : _ =>
  {
    G.D.zones.forEach( ( zone , $ ) =>
    {
      const cell_name = G.S.zones[ $ ]

      let
      new_x = -G.I.board.w ,
      new_y = -G.I.board.w

      if( cell_name !== null )
      {
        const
        cell_letter = cell_name.slice( 0 , 1 ) ,
        cell_number = Number( cell_name.slice( 1 ) )

        new_x = cell_number * G.I.cell_size + G.I.border_full / 2
        new_y = G.I.a_to_m.indexOf( cell_letter ) * G.I.cell_size + G.I.border_full / 2
      }

      zone.style.marginLeft = new_x + "px"
      zone.style.marginTop = new_y + "px"
    } )
  } ,

  //....................................................................................................................
  //
  ball : _ =>
  {
    const
    cell_ball = G.S.ball ,
    cell_aim  = G.S.aim

    let
    ball_x    = G.I.board.w / 2 - G.I.athlete_size / 2 ,
    ball_y    = G.I.board.h_real / 2 - G.I.athlete_size / 2 ,
    aim_x     = ball_x ,
    aim_y     = ball_y

    if( cell_ball !== null )
    {
      const
      ball_letter = cell_ball.slice( 0 , 1 ) ,
      ball_number = Number( cell_ball.slice( 1 ) ) ,
      aim_letter  = cell_aim.slice( 0 , 1 ) ,
      aim_number  = Number( cell_aim.slice( 1 ) )

      ball_x = ball_number * G.I.cell_size + G.I.border_full
      ball_y = G.I.a_to_m.indexOf( ball_letter ) * G.I.cell_size + G.I.border_full
      aim_x = aim_number * G.I.cell_size + G.I.border_full
      aim_y = G.I.a_to_m.indexOf( aim_letter ) * G.I.cell_size + G.I.border_full
    }

    G.D.ball.style.marginLeft = ball_x + "px"
    G.D.ball.style.marginTop = ball_y + "px"
    G.D.ball.classList.remove( 'tra' )

    G.D.aim.style.marginLeft = aim_x + "px"
    G.D.aim.style.marginTop = aim_y + "px"
    G.D.aim.classList.remove( 'tra' )

    setTimeout( _ =>
    {
      G.D.ball.classList.add( 'tra' )
      G.D.aim.classList.add( 'tra' )
    } , 0 )
  }
}

