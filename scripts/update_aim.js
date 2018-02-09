
'use strict'

//......................................................................................................................
//
G.update_aim = _ =>
{
  G.D.aim.style.marginLeft = G.D.ball.style.marginLeft
  G.D.aim.style.marginTop = G.D.ball.style.marginTop

  G.S.aim = G.S.ball

  if( G.S.hovered === 'ball' && G.S.selected === G.S.holder.now
  || G.S.hovered === 'ball' && G.S.selected === null
  || G.S.hovered === 'ball' && G.S.selected === 'ball'
  || G.S.hovered === null && G.S.selected === 'ball' )
  {
    if( ! G.S.placing && G.S.ball !== null && G.S.holder.now !== null )
    {
      const
      first_cell  = G.S.athletes[ G.S.holder.now ] ,
      last_cell   = G.S.ball ,
      next_cell   = G.next_cell( first_cell , last_cell ) ,
      next_letter = next_cell.slice( 0 , 1 ) ,
      next_number = Number( next_cell.slice( 1 ) ) ,

      next_x = next_number * G.I.cell_size + G.I.border_full ,
      next_y = G.I.a_to_m.indexOf( next_letter ) * G.I.cell_size + G.I.border_full

      G.D.aim.style.marginLeft = next_x + 'px'
      G.D.aim.style.marginTop = next_y + 'px'

      G.S.aim = next_cell
    }
  }
}

