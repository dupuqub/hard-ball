
'use strict'

//......................................................................................................................
//
G.update_turn = _ =>
{
  G.S.turn ++

  G.update_lights()

  //....................................................................................................................
  //
  if( G.S.holder.future !== null ) G.update_holder()

  //....................................................................................................................
  //
  if( G.S.holding.team === G.plays_now() )
  {
    if( G.S.holding.turns < 5 )
    {
      G.S.holding.turns ++

      if( G.S.holding.turns === 5 )
      {
        G.D.bulbs.forEach( bulb =>
        {
          bulb.classList.remove( 'blue' )
          bulb.classList.remove( 'green' )
          bulb.classList.add( 'red_lgt' )
        } )

        G.S.punting = true

        G.update_selected( 'ball' )
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
  }
}

