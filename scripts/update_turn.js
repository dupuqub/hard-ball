
'use strict'

//......................................................................................................................
//
G.update_turn = _ =>
{
  G.S.turn ++

  G.update_lights()

  if( G.S.holder.future !== null ) G.update_holder()
}
