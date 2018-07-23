
'use strict'

//......................................................................................................................
//
G.resize = _ =>
{
  const
  proportion_w       = window.innerWidth / G.I.aspect.w ,
  proportion_h       = window.innerHeight / G.I.aspect.h ,
  screen_is_vertical = proportion_w < proportion_h

  //....................................................................................................................
  // Redefine useful JS variables
  //
  G.I.body =
  {
    w : screen_is_vertical ? window.innerWidth : proportion_h * G.I.aspect.w ,
    h : ! screen_is_vertical ? window.innerHeight : proportion_w * G.I.aspect.h
  }

  G.I.board =
  {
    w      : G.I.body.w * 0.7 ,
    h      : G.I.body.w * 0.7 / 20 * 14 ,
    h_real : G.I.body.w * 0.7 / 20 * 12
  }

  G.I.cell_size = G.I.board.w / 20
  G.I.border_full = G.I.board.w / 400
  G.I.athlete_size = G.I.cell_size - G.I.border_full * 2

  //....................................................................................................................
  // Redefine the first 'root' under 'root.css'
  //
  const new_root =
    '--body-w:' + G.I.body.w + 'px;' +
    '--body-h:' + G.I.body.h + 'px;'

  Array.from( document.styleSheets ).some( sheet =>
  {
    if( sheet.href !== null && sheet.href.indexOf( 'root.css' ) !== -1 )
    {
      sheet.cssRules[ 0 ].style.cssText = new_root

      return true
    }
  } )

  //....................................................................................................................
  // Firefox couldn't handle 'r', 'cx' nor 'cy' defined by CSS
  //
  G.D.selectors.forEach( selector =>
  {
    Array.from( [ 'r','cx','cy' ] ).forEach( attribute =>
    {
      selector.setAttribute( attribute , G.I.athlete_size / 2 )
    } )
  } )

  //....................................................................................................................
  // Redraw the tiny squares inside the athletes
  //
  G.redraw_svg( G.D.athlete_art , 'atl_fil' )
  G.redraw_svg( G.D.bench_art , 'bnc_fil' )

  //....................................................................................................................
  //
  G.reposition.athletes()
  G.reposition.zones()
  G.reposition.ball()
}

