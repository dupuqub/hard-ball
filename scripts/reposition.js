
`use strict`

//......................................................................................................................

G.reposition =
{
  //....................................................................................................................

  athletes: () =>
  {
    G.D.athletes.forEach ((athlete, index) =>
    {
      const cellName = G.S.athletes [index]
      const cellLetter = cellName.slice (0, 1)
      const cellIndex = G.I.aToM.indexOf (cellLetter)
      const cellNumber = Number (cellName.slice (1))
      const newX = cellNumber * G.I.cellSize + G.I.borderFull
      const newY = cellIndex * G.I.cellSize + G.I.borderFull

      athlete.style.marginLeft = newX + `px`
      athlete.style.marginTop = newY + `px`
      athlete.classList.remove (`tra`)
    })

    setTimeout(() => G.D.athletes.forEach (athlete => athlete.classList.add (`tra`)), 0)
  },

  //....................................................................................................................

  zones: () =>
  {
    G.D.zones.forEach ((zone, index) =>
    {
      const cellName = G.S.zones [index]

      let newX = -G.I.board.w
      let newY = -G.I.board.w

      if (cellName !== null)
      {
        const cellLetter = cellName.slice (0, 1)
        const cellIndex = G.I.aToM.indexOf (cellLetter)
        const cellNumber = Number (cellName.slice (1))

        newX = cellNumber * G.I.cellSize + G.I.borderFull / 2
        newY = cellIndex * G.I.cellSize + G.I.borderFull / 2
      }

      zone.style.marginLeft = newX + `px`
      zone.style.marginTop = newY + `px`
    })
  },

  //....................................................................................................................

  ball: () =>
  {
    const cellBall = G.S.ball
    const cellAim = G.S.aim

    let ballX = G.I.board.w / 2 - G.I.athleteSize / 2
    let ballY = G.I.board.hReal / 2 - G.I.athleteSize / 2
    let aimX = ballX
    let aimY = ballY

    if (cellBall !== null)
    {
      const ballLetter = cellBall.slice (0, 1)
      const ballIndex = G.I.aToM.indexOf (ballLetter)
      const ballNumber = Number (cellBall.slice (1))
      const aimLetter = cellAim.slice (0, 1)
      const aimIndex = G.I.aToM.indexOf (aimLetter)
      const aimNumber = Number (cellAim.slice (1))

      ballX = ballNumber * G.I.cellSize + G.I.borderFull
      ballY = ballIndex * G.I.cellSize + G.I.borderFull
      aimX = aimNumber * G.I.cellSize + G.I.borderFull
      aimY = aimIndex * G.I.cellSize + G.I.borderFull
    }

    G.D.ball.style.marginLeft = ballX + `px`
    G.D.ball.style.marginTop = ballY + `px`
    G.D.ball.classList.remove (`tra`)

    G.D.aim.style.marginLeft = aimX + `px`
    G.D.aim.style.marginTop = aimY + `px`
    G.D.aim.classList.remove (`tra`)

    setTimeout (() =>
    {
      G.D.ball.classList.add (`tra`)
      G.D.aim.classList.add (`tra`)
    }, 0)
  },
}

