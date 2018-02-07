
'use strict'

//......................................................................................................................
//
G.athletes_playing_cells = _ =>
{
  const new_object =
  {
    blue  : G.S.team.blue.map( athlete_index => G.S.athletes[ athlete_index ] ) ,
    green : G.S.team.green.map( athlete_index => G.S.athletes[ athlete_index ] )
  }

  new_object.both = new_object.blue.concat( new_object.green )

  return new_object
}

//......................................................................................................................
//
G.change_selected = chosen =>
{
  G.S.selected = chosen
  G.D.ball.classList.remove( 'slc' )
  G.D.athletes.forEach( athlete => athlete.classList.remove( 'slc' ) )

  if( chosen !== null )
  {
    setTimeout( _ =>
    {
      chosen === 'ball'
      ? G.D.ball.classList.add( 'slc' )
      : G.D.athletes[ chosen ].classList.add( 'slc' )
    } , 0 )
  }

  G.update_zone_cells()
}

//......................................................................................................................
//
G.following_cell = ( first_cell , second_cell ) =>
{
  const
  first_letter  = first_cell.slice( 0 , 1 ) ,
  first_number  = Number( first_cell.slice( 1 ) ) ,
  second_letter = second_cell.slice( 0 , 1 ) ,
  second_number = Number( second_cell.slice( 1 ) ) ,

  first_letter_index  = G.I.a_to_m.indexOf( first_letter ) ,
  second_letter_index = G.I.a_to_m.indexOf( second_letter ) ,
  letter_diff         = second_letter_index - first_letter_index ,
  number_diff         = second_number - first_number ,
  number_origin       = second_number + number_diff

  return G.celler( G.letterer( second_letter , letter_diff ) , G.numberer( number_origin , 20 ) )
}

//......................................................................................................................
//
G.mouse_move = target =>
{
  G.S.hovered =
    target === 'ball'
    ? 'ball'
    : target.slice( 0 , 7 ) === 'athlete'
    ? Number( target.slice( -2 ) )
    : null

  G.update_zone_cells()
}

//......................................................................................................................
//
G.plays_now = _ =>
{
  const
  turn_is_even = G.S.turn % 2 === 0 ,
  color        =
    G.S.first === 'blue'
    ? ( turn_is_even ? 'blue' : 'green' )
    : ( turn_is_even ? 'green' : 'blue' )

  return color
}

//......................................................................................................................
//
G.update_holder = _ =>
{
  const
  athlete_index = G.S.holder.future ,
  athlete       = G.D.athletes[ athlete_index ]

  G.S.holder.now = athlete_index
  G.S.holder.future = null
  G.S.placing = true

  G.S.ball = G.S.athletes[ athlete_index ]
  G.S.aim = G.S.athletes[ athlete_index ]

  G.D.ball.style.marginLeft = athlete.style.marginLeft
  G.D.ball.style.marginTop = athlete.style.marginTop

  G.D.aim.style.marginLeft = athlete.style.marginLeft
  G.D.aim.style.marginTop = athlete.style.marginTop

  G.change_selected( 'ball' )
}

//......................................................................................................................
//
G.update_keepers = _ =>
{
  const
  playing_cells = G.athletes_playing_cells() ,
  colors        = [ 'blue' , 'green' ]

  G.S.keepers = { blue : null , green : null }

  colors.forEach( color =>
  {
    playing_cells[ color ].forEach( cell =>
    {
      if( G.I.area[ color ].indexOf( cell ) !== -1 )
      {
        G.S.keepers[ color ] = G.S.athletes.indexOf( cell )
      }
    } )
  } )
}

