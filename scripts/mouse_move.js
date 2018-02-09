
'use strict'

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

