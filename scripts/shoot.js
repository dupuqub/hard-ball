
'use strict'

//......................................................................................................................
//
G.shoot = _ =>
{
  G.S.locked = true
  G.S.holder.now = null

  G.D.ball.classList.remove( 'tra' )
  G.D.aim.classList.remove( 'tra' )

  //....................................................................................................................
  // path find
  //
  const
  path = [ G.S.ball , G.S.aim ] ,
  both_goals = G.I.goal.blue.concat( G.I.goal.green )

  if( G.S.athletes.indexOf( path[ 1 ] ) === -1 // aim is not on player
  && both_goals.indexOf( path[ 1 ] ) === -1 ) // aim is not on goal
  {
    while( true )
    {
      const
      first_cell = path[ path.length - 2 ] ,
      last_cell  = path[ path.length - 1 ] ,
      next_cell  = G.next_cell( first_cell , last_cell )

      if( G.S.athletes.indexOf( next_cell ) !== -1 // player receives
      || both_goals.indexOf( next_cell ) !== -1 ) // try score
      {
        path.push( next_cell )
        break
      }
      else
      {
        path.push( next_cell )
      }
    }
  }

  G.S.path = path

  //....................................................................................................................
  // define shot direction
  //
  const
  first_cell   = path[ 0 ] ,
  first_letter = first_cell.slice( 0 , 1 ) ,
  first_index  = G.I.a_to_m.indexOf( first_letter ) ,
  first_number = Number( first_cell.slice( -2 ) ) ,

  last_cell   = path[ 1 ] ,
  last_letter = last_cell.slice( 0 , 1 ) ,
  last_index  = G.I.a_to_m.indexOf( last_letter ) ,
  last_number = Number( last_cell.slice( -2 ) ) ,

  difference_x = last_number - first_number ,
  difference_y = last_index - first_index

  G.S.shot =
  {
    x : Math.abs( difference_x ) > 1 ? difference_x - 20 : difference_x ,
    y : Math.abs( difference_y ) > 1 ? difference_y - 12 : difference_y
  }

  //....................................................................................................................
  //
  const move_ball = setInterval( _ =>
  {
    //..................................................................................................................
    // test end proximity
    //
    const
    board_rect = G.D.board.getBoundingClientRect() ,
    ball_x     = Number( G.D.ball.style.marginLeft.slice( 0 , -2 ) ) ,
    ball_y     = Number( G.D.ball.style.marginTop.slice( 0 , -2 ) ) ,
    end_cell   = G.S.path[ G.S.path.length - 1 ] ,
    end_letter = end_cell.slice( 0 , 1 ) ,
    end_index  = G.I.a_to_m.indexOf( end_letter ) ,
    end_number = Number( end_cell.slice( 1 ) ) ,
    end_x      = end_number * G.I.cell_size + G.I.border_full ,
    end_y      = end_index * G.I.cell_size + G.I.border_full ,
    error      = 2 ,

    x_is_close =
         ball_x > end_x - error
      && ball_x < end_x + error ,

    y_is_close =
         ball_y > end_y - error
      && ball_y < end_y + error ,

    close_enough = x_is_close && y_is_close

    //..................................................................................................................
    // try score or pass
    //
    if( close_enough )
    {
      //................................................................................................................
      //
      const last_on_path = G.S.path[ G.S.path.length - 1 ]

      G.S.ball = last_on_path
      G.S.aim = last_on_path

      G.D.ball.classList.add( 'tra' )
      G.D.aim.classList.add( 'tra' )

      window.clearInterval( move_ball )

      //................................................................................................................
      // try score
      //
      if( both_goals.indexOf( last_on_path ) !== -1 )
      {
        G.S.scoring = G.scoring()

        G.light_path( 'add' )
        G.update_selected( null )
      }

      //................................................................................................................
      // pass
      //
      else if( G.S.athletes.indexOf( last_on_path ) !== -1 )
      {
        G.S.holder.future = G.S.athletes.indexOf( last_on_path )

        G.update_holder()
      }

      //................................................................................................................
      //
      G.S.locked = false
    }

    //..................................................................................................................
    // move 'ball' and 'aim'
    //
    else
    {
      const
      board_end_x = G.I.cell_size * 20 ,
      board_end_y = G.I.cell_size * 12 ,
      modifier    = G.I.cell_size / 2 ,
      distance_x  = G.S.shot.x * modifier ,
      distance_y  = G.S.shot.y * modifier ,
      possible_x  = ball_x + distance_x ,
      possible_y  = ball_y + distance_y ,
      ball_size   = G.I.athlete_size ,

      teleport =
           possible_x > board_end_x - ball_size
        || possible_x < 0
        || possible_y > board_end_y - ball_size
        || possible_y < 0

      let
      new_left = possible_x ,
      new_top  = possible_y

      if( teleport )
      {
        const
        now_letter     = G.I.a_to_m[ Math.floor( ball_y / G.I.cell_size ) ] ,
        now_number     = Math.floor( ball_x / G.I.cell_size ) ,
        now_cell       = G.celler( now_letter, now_number ) ,
        now_path_index = G.S.path.indexOf( now_cell ) ,

        next_path_cell   = G.S.path[ now_path_index + 1 ] ,
        next_path_letter = next_path_cell.slice( 0 , 1 ) ,
        next_path_index  = G.I.a_to_m.indexOf( next_path_letter ) ,
        next_path_number = Number( next_path_cell.slice( 1 ) )

        new_left = next_path_number * G.I.cell_size + G.I.border_full
        new_top = next_path_index * G.I.cell_size + G.I.border_full
      }

      G.D.ball.style.marginLeft = new_left + 'px'
      G.D.ball.style.marginTop = new_top + 'px'

      G.D.aim.style.marginLeft = new_left + 'px'
      G.D.aim.style.marginTop = new_top + 'px'
    }
  } , 10 )
}

