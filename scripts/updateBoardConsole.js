
`use strict`

//......................................................................................................................

G.updateBoardConsole = event =>
{
  const id = typeof event === `string` ? event : event === undefined ? `` : event.target.id
  const lang = G.langs[G.S.lang]

  //....................................................................................................................

  if(id === `boardConsole`
  || id === `floppy`
  || id === `git`
  || id === `itch`
  || id === `lang`
  || id === `reset`
  || id === `load`) G.D.boardConsole.innerHTML = lang[id]

  //....................................................................................................................

  else if(id.slice(0, 4) === `bulb`) G.D.boardConsole.innerHTML = lang.bulb[Number(id.slice(4))]
  else if(G.S.rounding) G.D.boardConsole.innerHTML = lang.rounding
  else if(G.S.placing) G.D.boardConsole.innerHTML = lang.placing

  //....................................................................................................................

  else if(id === `ball`)
  {
    if(G.S.ball === null)
    {
      G.D.boardConsole.innerHTML = lang.ball[0] + ` - ` + lang.ball[(G.S.turn < 8) + 1]
    }
  }

  //....................................................................................................................

  else if(id.slice(0, 7) === `athlete`)
  {
    const index = Number(id.slice(7))
    const isBlue = G.S.team.blue.indexOf(index) !== -1
    const isGreen = G.S.team.green.indexOf(index) !== -1
    const wasBlue = G.S.replaced.blue.indexOf(index) !== -1
    const wasGreen = G.S.replaced.green.indexOf(index) !== -1
    const playing = isBlue || isGreen
    const replaced = wasBlue || wasGreen
    const color = isBlue ? `blue` : isGreen ? `green` : null
    const status = playing ? lang[color] : replaced ? lang.athletes[2] : lang.athletes[1]
    const benched = G.S.athletes[index].substring(0, 1) === `M`
    const changes = G.S.replaced[G.playsNow()].length

    G.D.boardConsole.innerHTML =

        (G.S.turn > 0 ? lang[G.playsNow()].toUpperCase() + ` ` + lang.plays + ` - ` : ``)
      + (G.S.turn < 8 ? lang.athletes[0] + ` ` : ``)
      + lang.animals[index]
      + (G.S.turn < 8 ? ` - ` + lang.athletes[3] + ` ` + index : ``) + ` (`
      + status.toLowerCase() + `)`
      + (G.S.turn > 7 && benched ? ` - ` + lang.changes + ` ` + changes + `/2` : ``)
  }

  //....................................................................................................................

  else if(id.slice(0, 4) === `zone` && G.S.selected !== null)
  {
    const index = Number(id.slice(4))
    const cell = G.S.zones[index]
    const letter = cell.substring(0, 1)

    if(G.S.selected === `ball`)
    {
      //
    }

    else // athlete
    {
      const isBlue = G.S.team.blue.indexOf(G.S.selected) !== -1
      const isGreen = G.S.team.green.indexOf(G.S.selected) !== -1
      const color = isBlue ? `blue` : isGreen ? `green` : null
      const other = color === `blue` ? `green` : color === `green` ? `blue` : null

      const tracking = letter === `A` || letter === `B` || letter === `K` || letter === `L`
      const benched = G.S.athletes[G.S.selected].substring(0, 1) === `M`
      const middle = G.I.middle.indexOf(cell) !== -1
      const both = G.S.team.blue.concat(G.S.team.green).map(i => G.S.athletes[i])
      const pushing = both.indexOf(cell) !== -1

      const classList = G.D.zones[index].classList
      const black = Array.from(classList).indexOf(`zonBlk`) !== -1
      const target = lang.animals[G.S.athletes.indexOf(cell)]
      const animal = lang.animals[G.S.selected]

      if(G.S.turn < 8)
      {
        if(benched) G.D.boardConsole.innerHTML = lang.zone[0] + ` ` + animal + ` ` + lang.zone[1]
        else G.D.boardConsole.innerHTML = lang.zone[3]
      }
      else if(benched) G.D.boardConsole.innerHTML = animal + ` ` + lang.push[2] + ` ` + target + ` ` + lang.push[3]
      else if(color === G.playsNow())
      {
        const ownArea = G.I.area[color].indexOf(cell) !== -1
        const foeArea = G.I.area[other].indexOf(cell) !== -1
        const hasKeeper = G.S.keepers[color] !== null
        const isKeeper = G.S.keepers[color] === G.S.selected

        if(tracking) G.D.boardConsole.innerHTML = lang.tracks
        else if(G.S.ball === null && middle) G.D.boardConsole.innerHTML = lang.grab
        else if(pushing)
        {
          if(black) G.D.boardConsole.innerHTML = lang.push[0] + ` ` + target.toUpperCase() + ` ` + lang.push[1]
          else G.D.boardConsole.innerHTML = lang.push[4] + ` ` + target.toUpperCase()
        }
        else if(foeArea) G.D.boardConsole.innerHTML = lang.foeArea
        else if(ownArea)
        {
          if(!hasKeeper) G.D.boardConsole.innerHTML = lang.ownArea
          else if(isKeeper) G.D.boardConsole.innerHTML = lang.move
          else G.D.boardConsole.innerHTML = lang.ownAreaOccupied
        }
        else if(G.S.ball === cell) G.D.boardConsole.innerHTML = lang.grab
        else G.D.boardConsole.innerHTML = lang.move
      }
    }
  }

  //....................................................................................................................

  else if(G.S.selected === `ball`)
  {
    //
  }

  //....................................................................................................................

  else if(G.S.selected !== null)
  {
    const index = G.S.selected
    const cell = G.S.athletes[index]
    const letter = cell.substring(0, 1)
    const stringIndex = index > 9 ? index : `0` + index

    if(G.S.turn < 8)
    {
      if(letter === `M`) G.D.boardConsole.innerHTML = lang.zone[0] + ` ` + lang.animals[index] + ` ` + lang.zone[2]
      else G.D.boardConsole.innerHTML = lang.animals[index] + ` ` + lang.already
    }

    else G.updateBoardConsole(`athlete` + stringIndex)
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

    G.D.boardConsole.innerHTML =

        lang[color].toUpperCase() + ` `
      + lang.plays + ` - `
      + lang.selection[0] + ` `
      + lang.selection[amount + 2] + ` `
      + lang.selection[1]
  }

  //....................................................................................................................

  else
  {
    G.D.boardConsole.innerHTML =

        lang[G.playsNow()].toUpperCase() + ` ` + lang.plays
      + (G.S.ball === null ? ` - ` + lang.go : ``)
      + (G.S.holder.now !== null ? ` - ` + lang.pass : ``)
  }
}

