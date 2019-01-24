
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
    const status = isPlaying ? 2 : isReplaced ? 3 : 1

    G.D.boardConsole.innerHTML =

        (G.S.turn < 8 ? lang.athletes[0] + ` ` : ``)
      + lang.animals[index] + ` (`
      + lang.athletes[status].toLowerCase() + `)`

    if(G.S.turn > 7)
    {
      const isBenched = G.S.athletes[index].substring(0, 1) === `M`
      const color = G.playsNow()
      const changes = G.S.replaced[color].length

      if(isBenched)
      {
        G.D.boardConsole.innerHTML += ` - ` + lang.changes.toLowerCase() + ` ` + changes + `/2`
      }
    }
  }

  //....................................................................................................................

  else if(id.slice(0, 4) === `zone`)
  {
    const index = Number(id.slice(4))
    const cell = G.S.zones[index]
    const letter = cell.substring(0, 1)
    const bothTeams =

      G.S.team.blue
      .concat(G.S.team.green)
      .map(athlete => G.S.athletes[athlete])

    if(G.S.turn < 8)
    {
      const isBenched = G.S.athletes[G.S.selected].substring(0, 1) === `M`

      if(isBenched) G.D.boardConsole.innerHTML = lang.zone[0]
      else G.D.boardConsole.innerHTML = lang.zone[1]
    }

    else if(G.S.selected === "ball")
    {
      //
    }

    else if(G.S.selected !== null) // athlete
    {
      // if(letter === `A` || letter === `B` || letter === `K` || letter === `L`)
      // {
      //   G.D.boardConsole.innerHTML = `tracks`
      // }
      // else if(G.S.ball === cell)
      // {
      //   G.D.boardConsole.innerHTML = `ball`
      // }
      // else if(bothTeams.indexOf(cell) !== -1)
      // {
      //   const classList = G.D.zones[index].classList
      //   const animal = lang.animals[G.S.athletes.indexOf(cell)]
      //   const black = Array.from(classList).indexOf("zonBlk") !== -1

      //   if(black) G.D.boardConsole.innerHTML = `cannot push ` + animal
      //   else G.D.boardConsole.innerHTML = `push ` + animal
      // }
      // else
      // {
      //   G.D.boardConsole.innerHTML = `move`
      // }
    }
    else
    {
      //
    }
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
    const color = G.playsNow()
    const holder = G.S.holder.now

    G.D.boardConsole.innerHTML = lang[color].toUpperCase() + ` ` + lang.plays

    if(G.S.ball === null)
    {
      G.D.boardConsole.innerHTML += ` - ` + lang.go
    }
    else if(holder !== null)
    {
      const holderColor = G.S.team.green.indexOf(holder) !== -1 ? `green` : `blue`

      console.log(holderColor)
    }
  }
}

