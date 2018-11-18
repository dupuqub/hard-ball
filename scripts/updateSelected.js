
`use strict`

//......................................................................................................................

G.updateSelected = chosen =>
{
  G.S.selected = chosen
  G.D.ball.classList.remove(`slc`)
  G.D.athletes.forEach(athlete => athlete.classList.remove(`slc`))

  if(chosen !== null)
  {
    setTimeout(() =>
    {
        chosen === `ball`
      ? G.D.ball.classList.add(`slc`)
      : G.D.athletes[chosen].classList.add(`slc`)
    }, 0)
  }

  G.updateZoneCells()
}

