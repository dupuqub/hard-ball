
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

    setTimeout( _ => athletes.forEach( ( athlete , $ ) => athlete.classList.add( 'tra_atl' ) ) , 0 )
  } ,

  //....................................................................................................................
  //
  ball : _ =>
  {
    var
    cell_name = state.ball.cell ,
    new_x     = 0 ,
    new_y     = 0

    if( cell_name === null )
    {
      new_x = root_raw.game_w / 2 - root_raw.athlete_size / 2
      new_y = root_raw.game_h_real / 2 - root_raw.athlete_size / 2
    }
    else
    {
      new_x = a_to_t.indexOf( cell_name.slice( 0 , 1 ) ) * root_raw.cell_size + root_raw.border_full ,
      new_y = Number( cell_name.slice( 1 , 3 ) ) * root_raw.cell_size + root_raw.border_full
    }

    ball.style.transform = 'translate3d(' + new_x + 'px,' + new_y + 'px,0)'
  } ,
}

