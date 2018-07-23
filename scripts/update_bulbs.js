
'use strict'

//....................................................................................................................
//
G.update_bulbs = _ =>
{
  G.D.bulbs.forEach( bulb =>
  {
    bulb.classList.remove( 'blue' )
    bulb.classList.remove( 'green' )
    bulb.classList.remove( 'red_lgt' )
  } )

  if( G.S.holding.turns === 5 )
  {
    G.D.bulbs.forEach( bulb => bulb.classList.add( 'red_lgt' ) )
  }

  else
  {
    G.D.bulbs.forEach( ( bulb , $ ) =>
    {
      if( $ < G.S.holding.turns )
      {
        bulb.classList.add( G.S.holding.team )
      }
    } )
  }
}

