
`use strict`

//......................................................................................................................

G.updateHolder = () =>
{

  const athlete = G.S.holder.future
  const athleteDom = G.D.athletes [athlete]
  const holdingTeam = G.S.holding.team
  const athleteTeam =

      G.S.team.blue.indexOf (athlete) !== -1
    ? `blue`
    : G.S.team.green.indexOf (athlete) !== -1
    ? `green`
    : null

  G.S.holder.now = athlete
  G.S.holder.future = null
  G.S.placing = true

  G.S.ball = G.S.athletes [athlete]
  G.S.aim = G.S.athletes [athlete]

  G.D.ball.style.marginLeft = athleteDom.style.marginLeft
  G.D.ball.style.marginTop = athleteDom.style.marginTop
  G.D.aim.style.marginLeft = athleteDom.style.marginLeft
  G.D.aim.style.marginTop = athleteDom.style.marginTop

  //....................................................................................................................

  if (G.S.holder.now !== null && athleteTeam !== holdingTeam)
  {
    G.S.holding = {turns: 0, team: athleteTeam}

    G.updateBulbs()
  }

  //....................................................................................................................

  if (G.S.path.length) G.lightPath (`remove`)

  //....................................................................................................................

  G.updateSelected (`ball`)
}

