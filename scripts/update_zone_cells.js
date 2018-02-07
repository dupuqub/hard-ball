
'use strict'

//......................................................................................................................
//
G.update_zone_cells = _ =>
{
  G.S.zones = G.S.zones.map( _ => null )

  G.D.zones.forEach( zone =>
  {
    zone.classList.remove( 'zon_not' )
    zone.classList.remove( 'zon_red' )
    zone.classList.remove( 'zon_blk' )
  } )

  G.D.ball.style.zIndex = G.S.ball === null ? 1 : 0
  G.D.aim.style.zIndex = G.S.ball === null ? 1 : 0

  if( G.S.hovered === 'ball' )       G.update_ball_zones()
  else if( G.S.hovered !== null )    G.update_athlete_zones( G.S.hovered )
  else if( G.S.selected === 'ball' ) G.update_ball_zones()
  else if( G.S.selected !== null )   G.update_athlete_zones( G.S.selected )

  G.reposition.zones()
}

