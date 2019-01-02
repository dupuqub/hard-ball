
`use strict`

//......................................................................................................................

G.updateBoardConsole = event =>
{
  event =

      typeof event === `string`
    ? {target: {id: event}}
    : event === undefined
    ? {target: {id: ``}}
    : event

  const {target} = event
  const {id} = target
  const lang = G.langs[G.S.lang]

  //....................................................................................................................

  if(id === `boardConsole`
  || id === `floppy`
  || id === `git`
  || id === `itch`
  || id === `lang`
  || id === `reset`
  || id === `load`)
  {
    G.D.boardConsole.innerHTML = lang[id]
  }

  //....................................................................................................................

  else if(id.slice(0, 4) === `bulb`)
  {
    const index = Number(id.slice(4))
    const text = lang.bulb[index]
    G.D.boardConsole.innerHTML = text
  }

  //....................................................................................................................

  else if(G.S.rounding)
  {
    G.D.boardConsole.innerHTML = lang.rounding
  }

  //....................................................................................................................

  else if(G.S.placing)
  {
    G.D.boardConsole.innerHTML = lang.placing
  }

  //....................................................................................................................

  else if(id === `ball`)
  {
    if(G.S.ball === null)
    {
      G.D.boardConsole.innerHTML =

          lang.ball[0]
        + ` - `
        + lang.ball[(G.S.turn < 8) + 1]
    }
  }

  //....................................................................................................................

  else if(id.slice(0, 7) === `athlete`)
  {
    const index = Number(id.slice(7))
    const {team, replaced} = G.S
    const isPlaying = team.blue.indexOf(index) !== -1 || team.green.indexOf(index) !== -1
    const isReplaced = replaced.blue.indexOf(index) !== -1 || replaced.green.indexOf(index) !== -1
    const status = isPlaying ? 3 : isReplaced ? 4 : 2

    G.D.boardConsole.innerHTML =

        lang.athletes[0] + ` `
      + lang.animals[index] + ` - `
      + lang.athletes[1] + ` `
      + index + ` (`
      + lang.athletes[status].toLowerCase() + `)`
  }

  //....................................................................................................................
  // first turn

  else if(G.S.turn === 0)
  {
      G.S.selected === null
    ? G.D.boardConsole.innerHTML = lang.start[0]
    : G.D.boardConsole.innerHTML = lang.start[1]
  }

  //....................................................................................................................
  // athlete selection

  else if(G.S.turn < 8)
  {
    const color = G.playsNow()
    const amount = G.S.team[color].length
    const amountMessage =

        lang.selection[0] + ` `
      + lang.selection[amount + 2] + ` `
      + lang.selection[1]

    G.D.boardConsole.innerHTML =

        lang[color].toUpperCase() + ` `
      + lang.plays + ` - `
      + amountMessage
  }

  //....................................................................................................................

  else
  {
    G.D.boardConsole.innerHTML = `...`
  }
}

