
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

