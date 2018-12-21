
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

    if(G.S.turn < 8)
    {
      G.D.boardConsole.innerHTML = G.langs[G.S.lang].bulb[index]
    }
  }

  //....................................................................................................................

  else
  {
    G.D.boardConsole.innerHTML = `...`
  }
}

