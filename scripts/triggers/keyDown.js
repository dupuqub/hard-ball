
`use strict`

//......................................................................................................................

G.keyDown = event =>
{
  const pressed = event.key

  if(!G.S.locked
  && !G.S.pathing
  && !event.ctrlKey
  && !event.altKey)
  {
    if(pressed === `0`)
    {
        confirm(`ERASE ALL SAVE FILES ?`)
      ? localStorage.clear()
      : null
    }
    else if(pressed !== ` ` && Number.isInteger(Number(pressed)))
    {
      const saveFile = `hardBallSave` + pressed
      const stringState = JSON.stringify(G.S)

      localStorage[saveFile] === undefined
      ?
          confirm(`SAVE ?`)
        ? localStorage[saveFile] = stringState
        : null

      : confirm(`LOAD ?`)
      ? G.loadFile(saveFile)
      : confirm(`REPLACE ?`)
      ? localStorage[saveFile] = stringState
      : confirm(`ERASE ?`)
      ? localStorage.removeItem(saveFile)
      : null
    }
  }
}

