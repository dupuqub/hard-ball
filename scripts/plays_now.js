
'use strict'

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

