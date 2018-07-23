
`use strict`

//......................................................................................................................

G.resize = () =>
{
  const proportionW = window.innerWidth / G.I.aspect.w
  const proportionH = window.innerHeight / G.I.aspect.h
  const vertical = proportionW < proportionH

  //....................................................................................................................
  // redefine useful JS variables

  G.I.body =
  {
    w: vertical ? window.innerWidth : proportionH * G.I.aspect.w,
    h: !vertical ? window.innerHeight : proportionW * G.I.aspect.h,
  }

  G.I.board =
  {
    w: G.I.body.w * 0.7,
    h: G.I.body.w * 0.7 / 20 * 14,
    hReal: G.I.body.w * 0.7 / 20 * 12,
  }

  G.I.cellSize = G.I.board.w / 20
  G.I.borderFull = G.I.board.w / 400
  G.I.athleteSize = G.I.cellSize - G.I.borderFull * 2

  //....................................................................................................................
  // redefine the first "root" under "root.css"

  const newRoot =

    `--bodyW:` + G.I.body.w + `px;` +
    `--bodyH:` + G.I.body.h + `px;`

  Array.from (document.styleSheets).some (sheet =>
  {
    if (sheet.href !== null && sheet.href.indexOf (`styles/root.css`) !== -1)
    {
      sheet.cssRules [0].style.cssText = newRoot

      return true
    }
  })

  //....................................................................................................................
  // Firefox couldn't handle "r", "cx" nor "cy" defined by CSS

  G.D.selectors.forEach (selector =>
  {
    Array.from ([`r`,`cx`,`cy`]).forEach (attribute =>
    {
      selector.setAttribute (attribute, G.I.athleteSize / 2)
    })
  })

  //....................................................................................................................
  // redraw the tiny squares inside the athletes

  G.redrawSvg (G.D.athleteArt, `atlFil`)
  G.redrawSvg (G.D.benchArt, `bncFil`)

  //....................................................................................................................

  G.reposition.athletes ()
  G.reposition.zones ()
  G.reposition.ball ()
}

