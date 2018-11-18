
`use strict`

//......................................................................................................................

G.loadFile = saveFile =>
{
  //....................................................................................................................
  // rebuild state

  G.S = JSON.parse(localStorage[saveFile])

  G.S.hovered = null

  //....................................................................................................................
  // colorize athletes

  G.D.athletes.forEach((athlete , index) =>
  {
    athlete.classList.remove(`blue`)
    athlete.classList.remove(`green`)
    athlete.classList.remove(`rep`)

      G.S.team.blue.indexOf(index) !== -1 || G.S.replaced.blue.indexOf(index) !== -1
    ? athlete.classList.add(`blue`)
    : G.S.team.green.indexOf(index) !== -1 || G.S.replaced.green.indexOf(index) !== -1
    ? athlete.classList.add(`green`)
    : null

      G.S.replaced.blue.concat(G.S.replaced.green).indexOf(index) !== -1
    ? athlete.classList.add(`rep`)
    : null
  })

  //....................................................................................................................
  // path

  document.querySelectorAll(`.cll`).forEach(cell => cell.classList.remove(`pat`))

  if(G.S.path.length) G.lightPath(`add`)

  //....................................................................................................................
  // updates

  G.updateSelected(G.S.selected)
  G.updateLights()
  G.updateBulbs()
  G.resize()
}

