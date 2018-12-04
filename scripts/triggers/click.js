
`use strict`

//......................................................................................................................

G.click = target =>
{
  //....................................................................................................................
  // UTILITIES
  //....................................................................................................................

  if(target === `floppy` && !G.S.locked && !G.S.pathing)
  {
    G.vignette.show(`Use numeric keys to PERLS<br>(purge, erase, replace, load or save)`)
  }

  else if(target === `git`)
  {
    window.open(`https://github.com/dupuqub/hard-ball`)
  }

  else if(target === `itch`)
  {
    window.open(`https://dupuqub.itch.io/hard-ball`)
  }

  else if(target === `lang`)
  {
    G.vignette.show(`WORK IN PROGRESS`)
  }

  else if(target === `reset` && !G.S.locked && !G.S.pathing)
  {
    if(confirm(`Reset the game ?`))
    {
      G.loadFile(`hardBallInitialState`)
      G.updateLights()
    }
  }

  else if(target === `vignette`)
  {
    G.vignette.hide()
  }

  //....................................................................................................................
  // GAMEPLAY
  //....................................................................................................................

  else if(target === `aim` || target === `aimRing`) G.shoot()

  //....................................................................................................................
  // gate 0

  else if(!G.S.locked && !G.S.pathing)
  {
    //..................................................................................................................

    if(target.slice(0, 4) === `zone`)
    {
      const zone = Number(target.slice(4))
      const zoneCell = G.S.zones[zone]
      const zoneLetter = zoneCell.slice(0, 1)
      const zoneIndex = G.I.aToM.indexOf(zoneLetter)
      const zoneNumber = Number(zoneCell.slice(1))
      const zoneClasses = Array.from(G.D.zones[zone].classList)
      const zoneIsNot = zoneClasses.indexOf(`zonNot`) !== -1
      const zoneIsBlk = zoneClasses.indexOf(`zonBlk`) !== -1
      const zoneIsRed = zoneClasses.indexOf(`zonRed`) !== -1

      //................................................................................................................

      if(zoneIsNot || zoneIsBlk)
      {
        if(zoneIsRed && !G.S.placing && !G.S.rounding && !G.S.punting)
        {
          const athlete = G.S.athletes.indexOf(zoneCell)
          const chosen =

              athlete !== -1
            ? athlete
            : G.S.ball !== null && G.S.takingShot === null
            ? `ball`
            : null

          if(chosen !== null) G.updateSelected(chosen)
        }
      }

      //................................................................................................................

      else
      {
        //..............................................................................................................

        if(G.S.selected === `ball`)
        {
          //............................................................................................................
          // has target

          if(zoneIsRed)
          {
            const athlete = G.S.athletes.indexOf(zoneCell)

            if(G.S.punting) G.S.punting = false

            if(athlete !== -1)
            {
              G.S.holder.future = athlete
              G.updateHolder()
            }
            else
            {
              G.S.takingShot = G.I.goal.blue.indexOf(zoneCell) !== -1 ? `green` : `blue`
              G.S.holder.now = null
              G.updateSelected(null)
            }
          }

          G.S.placing = false

          //............................................................................................................
          // common

          const newX = zoneNumber * G.I.cellSize + G.I.borderFull
          const newY = zoneIndex * G.I.cellSize + G.I.borderFull

          G.D.ball.style.marginLeft = newX + `px`
          G.D.ball.style.marginTop = newY + `px`
          G.D.aim.style.marginLeft = newX + `px`
          G.D.aim.style.marginTop = newY + `px`

          G.S.ball = zoneCell
          G.S.aim = zoneCell

          if(!zoneIsRed) G.updateZoneCells()
        }

        //..............................................................................................................
        // athlete

        else if(G.S.selected !== null)
        {
          const athlete = G.S.selected
          const athleteCell = G.S.athletes[athlete]
          const athleteLetter = athleteCell.slice(0, 1)
          const pushed = G.S.athletes.indexOf(zoneCell)

          let color = G.playsNow()

          //............................................................................................................
          // startup

          if(G.S.turn < 8)
          {
            if(G.S.turn === 0)
            {
              G.S.first = G.S.starter.blue.indexOf(zoneCell) !== -1 ? `blue` : `green`
              color = G.S.first
            }

            G.D.athletes[athlete].classList.add(color)
            G.S.team[color].push(athlete)
            G.S.starter[color] = G.S.starter[color].filter(cell => cell !== zoneCell)

            G.move(G.S.selected, zoneCell)
          }

          //............................................................................................................
          // benched

          else if(athleteLetter === `M` && G.S.replaced[G.playsNow()].length < 2)
          {
            G.S.replace = true
            G.S.pushed = pushed

            G.S.team[color] = G.S.team[color].map(item => item === pushed ? athlete : item)
            G.S.replaced[color].push(pushed)

            G.D.athletes[pushed].classList.add(`rep`)
            G.D.athletes[athlete].classList.add(color)

            G.updateLights()
            G.move(athlete, zoneCell)
          }

          //............................................................................................................
          // common play

          else
          {
            //..........................................................................................................
            // define rounding

            G.S.rounding = G.S.rounding ? false : G.I.roundabout.indexOf(athleteLetter) !== -1

            //..........................................................................................................
            // check for holder moving

            if(G.S.holder.now !== null && athlete === G.S.holder.now) G.S.holder.future = G.S.holder.now

            //..........................................................................................................
            // first ball hold

            if(G.S.ball === null && G.I.middle.indexOf(zoneCell) !== -1) G.S.holder.future = athlete

            //..........................................................................................................
            // has target

            else if(zoneIsRed !== -1)
            {
              //........................................................................................................
              // push

              if(G.S.athletes.indexOf(zoneCell) !== -1)
              {
                G.S.pushed = pushed
                G.S.oldCell = athleteCell
              }

              //........................................................................................................
              // take ball

              else if(zoneCell === G.S.ball || G.S.path.indexOf(zoneCell) !== -1)
              {
                G.S.holder.future = athlete
              }
            }

            //..........................................................................................................

            G.move(G.S.selected, zoneCell)
          }
        }
      }
    }

    //..................................................................................................................
    // gate 1

    else if(!G.S.placing && !G.S.rounding && !G.S.punting)
    {
      //................................................................................................................

      if(target === `ball` && G.S.ball !== null && G.S.takingShot === null)
      {
        G.updateSelected(`ball`)
      }

      //................................................................................................................

      else if(target.slice(0, 7) === `athlete`)
      {
        const athlete = Number(target.slice(7))
        const athleteLetter = G.S.athletes[athlete].slice(0, 1)
        const athleteWasReplaced = Array.from(G.D.athletes[athlete].classList).indexOf(`rep`) !== -1
        const teamHasReplacements =

            G.playsNow()
          ? G.S.replaced[G.playsNow()].length < 2
          : true

        if(athleteLetter !== `M` || !athleteWasReplaced && teamHasReplacements)
        {
          G.updateSelected(athlete)
        }
      }

      //................................................................................................................
      // click nothing

      else
      {
        G.updateSelected(null)
      }
    }
  }
}

