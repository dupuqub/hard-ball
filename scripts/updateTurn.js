
`use strict`

//......................................................................................................................

G.updateTurn = () =>
{
  //....................................................................................................................

  G.S.turn ++

  G.updateLights()

  //....................................................................................................................

  if(G.S.holder.future !== null) G.updateHolder()

  //....................................................................................................................
  // punt

  if(G.S.holding.turns === 5 && G.S.takingShot !== G.S.holding.team)
  {
    G.S.punting = true
    G.S.holder.now = null

    G.updateSelected(`ball`)
  }

  //....................................................................................................................
  // update bulbs

  if(G.S.holding.team === G.playsNow() && G.S.holding.turns < 5)
  {
    G.S.holding.turns ++

    G.updateBulbs()
  }

  //....................................................................................................................
  // end game

  if(G.S.takingShot !== null && G.S.takingShot === G.playsNow() && G.S.holder.now === null)
  {
    const winner = G.playsNow() === `blue` ? `BLUE` : `GREEN`

    G.D.centralWindow.innerHTML = `${winner} WINS`
    G.D.vignette.style.display = `flex`
    setTimeout(() => G.D.vignette.style.opacity = 100, 50) // to trigger transition animation
  }

  //....................................................................................................................

  G.S.locked = false
  localStorage.hardBallAutoSave = JSON.stringify(G.S)
}

