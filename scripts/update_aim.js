
'use strict'

//......................................................................................................................
//
G.update_aim = _ =>
{
  G.D.aim.style.marginLeft = G.D.ball.style.marginLeft
  G.D.aim.style.marginTop = G.D.ball.style.marginTop

  G.S.aim = G.S.ball

  if( G.S.hovered === 'ball' && G.S.selected === G.S.holder.now
  || G.S.hovered === 'ball' && G.S.selected === 'ball'
  || G.S.hovered === null && G.S.selected === 'ball' )
  {
    if( ! G.S.placing && G.S.ball !== null && G.S.holder.now !== null )
    {
      const
      first_cell       = G.S.athletes[ G.S.holder.now ] ,
      last_cell        = G.S.ball ,
      following_cell   = G.following_cell( first_cell , last_cell ) ,
      following_letter = following_cell.slice( 0 , 1 ) ,
      following_number = Number( following_cell.slice( 1 ) ) ,

      following_x = following_number * G.I.cell_size + G.I.border_full ,
      following_y = G.I.a_to_m.indexOf( following_letter ) * G.I.cell_size + G.I.border_full

      G.D.aim.style.marginLeft = following_x + 'px'
      G.D.aim.style.marginTop = following_y + 'px'

      G.S.aim = following_cell
      console.log( 'ok' )
    }
  }
}

