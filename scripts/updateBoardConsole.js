
`use strict`

//......................................................................................................................

G.updateBoardConsole = event =>
{
  const {target} = event
  const {id} = target

  //....................................................................................................................

  if(id === `boardConsole`
  || id === `floppy`
  || id === `git`
  || id === `itch`
  || id === `lang`
  || id === `reset`)
  {
    G.D.boardConsole.innerHTML = G.langs[G.S.lang][id]
  }

  //....................................................................................................................

  else if(id.slice(0, 4) === `bulb`)
  {
    const index = Number(id.slice(4))
    const text = G.langs[G.S.lang].bulb[index]
    G.D.boardConsole.innerHTML = text
  }

  //....................................................................................................................

  else if(G.S.rounding)
  {
    G.D.boardConsole.innerHTML = G.langs[G.S.lang].rounding
  }

  //....................................................................................................................

  else if(id === `ball`)
  {
    if(G.S.ball === null)
    {
      G.D.boardConsole.innerHTML = G.langs[G.S.lang].ball[0]
    }
  }

  //....................................................................................................................

  else if(id.slice(0, 7) === `athlete`)
  {
    const index = Number(id.slice(7))
    const lang = G.langs[G.S.lang]
    const text = lang.athlete + ` ` + index + ` - ` + lang.athletes[index]

    G.D.boardConsole.innerHTML = text
  }

  //....................................................................................................................

  else
  {
    G.D.boardConsole.innerHTML = `...`
  }
}

