
`use strict`

//......................................................................................................................

G.updateZoneCells = () =>
{
  G.S.zones = G.S.zones.map(() => null)

  G.D.zones.forEach(zone =>
  {
    zone.classList.remove(`zonNot`)
    zone.classList.remove(`zonRed`)
    zone.classList.remove(`zonBlk`)
  })

  G.D.ball.style.zIndex = Number(G.S.ball === null)
  G.D.aim.style.zIndex = Number(G.S.ball === null)

  if(G.S.hovered === `ball`) G.updateBallZones()
  else if(G.S.hovered !== null) G.updateAthleteZones(G.S.hovered)
  else if(G.S.selected === `ball`) G.updateBallZones()
  else if(G.S.selected !== null) G.updateAthleteZones(G.S.selected)

  G.reposition.zones()

  G.updateAim()
}

