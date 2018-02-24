
'use strict'

//......................................................................................................................
//
G.update_holder = _ =>
{
  const
  athlete      = G.S.holder.future ,
  athlete_dom  = G.D.athletes[ athlete ] ,
  holding_team = G.S.holding.team ,
  athlete_team =
      G.S.team.blue.indexOf( athlete ) !== -1
    ? 'blue'
    : G.S.team.green.indexOf( athlete ) !== -1
    ? 'green'
    : null

  G.S.holder.now = athlete
  G.S.holder.future = null
  G.S.scoring = null
  G.S.placing = true

  G.S.ball = G.S.athletes[ athlete ]
  G.S.aim = G.S.athletes[ athlete ]

  G.D.ball.style.marginLeft = athlete_dom.style.marginLeft
  G.D.ball.style.marginTop = athlete_dom.style.marginTop
  G.D.aim.style.marginLeft = athlete_dom.style.marginLeft
  G.D.aim.style.marginTop = athlete_dom.style.marginTop

  //....................................................................................................................
  //
  if( G.S.holder.now !== null && athlete_team !== holding_team )
  {
    G.S.holding = { turns : 0 , team : athlete_team }

    G.update_bulbs()
  }

  //....................................................................................................................
  //
  if( G.S.path.length ) G.light_path( 'remove' )

  //....................................................................................................................
  //
  G.update_selected( 'ball' )
}

