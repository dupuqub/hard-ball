
'use strict'

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

  G.update_selected( 'ball' )
}

