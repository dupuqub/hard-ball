
`use strict`

//......................................................................................................................

G.shoot = () =>
{
  G.S.locked = true
  G.S.holder.now = null

  G.D.ball.classList.remove(`tra`)
  G.D.aim.classList.remove(`tra`)

  //....................................................................................................................
  // path find

  const path = [G.S.ball, G.S.aim]
  const bothGoals = G.I.goal.blue.concat(G.I.goal.green)

  if(G.S.athletes.indexOf(path[1]) === -1 // aim is not on player
  && bothGoals.indexOf(path[1]) === -1) // aim is not on goal
  {
    while(true)
    {
      const firstCell = path[path.length - 2]
      const lastCell = path[path.length - 1]
      const nextCell = G.nextCell(firstCell, lastCell)

      if(G.S.athletes.indexOf(nextCell) !== -1 // player receives
      || bothGoals.indexOf(nextCell) !== -1) // try score
      {
        path.push(nextCell)
        break
      }
      else
      {
        path.push(nextCell)
      }
    }
  }

  G.S.path = path

  //....................................................................................................................
  // define shot direction

  const firstCell = path[0]
  const firstLetter = firstCell.slice(0, 1)
  const firstIndex = G.I.aToM.indexOf(firstLetter)
  const firstNumber = Number(firstCell.slice(1))

  const lastCell = path[1]
  const lastLetter = lastCell.slice(0, 1)
  const lastIndex = G.I.aToM.indexOf(lastLetter)
  const lastNumber = Number(lastCell.slice(1))

  const differenceX = lastNumber - firstNumber
  const differenceY = lastIndex - firstIndex

  G.S.shot =
  {
    x: Math.abs(differenceX) > 1 ? differenceX - 20 : differenceX,
    y: Math.abs(differenceY) > 1 ? differenceY - 12 : differenceY,
  }

  //....................................................................................................................

  const moveBall = setInterval(() =>
  {
    //..................................................................................................................
    // test end proximity

    const ballX = Number(G.D.ball.style.marginLeft.slice(0, -2))
    const ballY = Number(G.D.ball.style.marginTop.slice(0, -2))
    const endCell = G.S.path[G.S.path.length - 1]
    const endLetter = endCell.slice(0, 1)
    const endIndex = G.I.aToM.indexOf(endLetter)
    const endNumber = Number(endCell.slice(1))
    const endX = endNumber * G.I.cellSize + G.I.borderFull
    const endY = endIndex * G.I.cellSize + G.I.borderFull
    const error = 2

    const xIsClose =

         ballX > endX - error
      && ballX < endX + error

    const yIsClose =

         ballY > endY - error
      && ballY < endY + error

    const closeEnough = xIsClose && yIsClose

    //..................................................................................................................
    // try score or pass

    if(closeEnough)
    {
      //................................................................................................................

      const lastOnPath = G.S.path[G.S.path.length - 1]

      G.S.ball = lastOnPath
      G.S.aim = lastOnPath

      G.D.ball.classList.add(`tra`)
      G.D.aim.classList.add(`tra`)

      window.clearInterval(moveBall)

      //................................................................................................................
      // try score

      if(bothGoals.indexOf(lastOnPath) !== -1)
      {
        G.lightPath(`add`)
        G.updateSelected(null)
      }

      //................................................................................................................
      // pass

      else if(G.S.athletes.indexOf(lastOnPath) !== -1)
      {
        G.S.holder.future = G.S.athletes.indexOf(lastOnPath)
        G.updateHolder()
      }

      //................................................................................................................

      G.S.locked = false
    }

    //..................................................................................................................
    // move "ball" and "aim"

    else
    {
      const boardEndX = G.I.cellSize * 20
      const boardEndY = G.I.cellSize * 12
      const modifier = G.I.cellSize / 2
      const distanceX = G.S.shot.x * modifier
      const distanceY = G.S.shot.y * modifier
      const possibleX = ballX + distanceX
      const possibleY = ballY + distanceY
      const ballSize = G.I.athleteSize
      const teleport =

           possibleX > boardEndX - ballSize
        || possibleX < 0
        || possibleY > boardEndY - ballSize
        || possibleY < 0

      let newLeft = possibleX
      let newTop = possibleY

      if(teleport)
      {
        const nowLetter = G.I.aToM[Math.floor(ballY / G.I.cellSize)]
        const nowNumber = Math.floor(ballX / G.I.cellSize)
        const nowCell = G.celler(nowLetter, nowNumber)
        const nowPathIndex = G.S.path.indexOf(nowCell)

        const nextPathCell = G.S.path[nowPathIndex + 1]
        const nextPathLetter = nextPathCell.slice(0, 1)
        const nextPathIndex = G.I.aToM.indexOf(nextPathLetter)
        const nextPathNumber = Number(nextPathCell.slice(1))

        newLeft = nextPathNumber * G.I.cellSize + G.I.borderFull
        newTop = nextPathIndex * G.I.cellSize + G.I.borderFull
      }

      G.D.ball.style.marginLeft = newLeft + `px`
      G.D.ball.style.marginTop = newTop + `px`

      G.D.aim.style.marginLeft = newLeft + `px`
      G.D.aim.style.marginTop = newTop + `px`
    }
  }, 10)
}

