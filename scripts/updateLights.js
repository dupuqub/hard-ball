
`use strict`

//......................................................................................................................

G.updateLights = () =>
{
  const color = G.playsNow()

  document.querySelectorAll(`.atlFil`).forEach(art => art.classList.remove(`glw`))

  G.D.blueLight.forEach(cell => cell.classList.remove(`glw`))
  G.D.blueDark.forEach(cell => cell.classList.remove(`glw`))
  G.D.greenLight.forEach(cell => cell.classList.remove(`glw`))
  G.D.greenDark.forEach(cell => cell.classList.remove(`glw`))

  setTimeout(() => // fix : ex-path cells glowing off tempo after scoring team defends
  {
    if(color === `blue`)
    {
      G.D.blueLight.forEach(cell => cell.classList.add(`glw`))
      G.D.blueDark.forEach(cell => cell.classList.add(`glw`))
    }
    else
    {
      G.D.greenLight.forEach(cell => cell.classList.add(`glw`))
      G.D.greenDark.forEach(cell => cell.classList.add(`glw`))
    }

    setTimeout(() => // to make area cells and athletes glow alternately
    {
      G.S.team[color].forEach(athleteIndex =>
      {
        document.querySelectorAll(`.atl` + athleteIndex).forEach(art =>
        {
          if(Array.from(art.classList).indexOf(`atlFil`) !== -1)
          {
            art.classList.add(`glw`)
          }
        })
      })
    }, 750)
  }, 100)
}

