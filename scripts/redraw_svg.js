
'use strict'

//......................................................................................................................
// Firefox couldn't handle 'art.style.width" nor "art.style.height' without 'px'
//
G.redraw_svg = ( dom_object , klass ) =>
{
  dom_object.forEach( ( art , $ ) =>
  {
    const size = G.I.board.w / 140

    art.innerHTML = G.create_svg_inner_html( $ , size , klass )
    art.style.width = G.matrix[ $ ].w * size + 'px'
    art.style.height = G.matrix[ $ ].h * size + 'px'
  } )
}

//......................................................................................................................
// Firefox couldn't handle 'width', 'height' nor 'stroke-width' defined by CSS
//
G.create_svg_inner_html = ( $ , size , klass ) =>
(
  G.matrix[ $ ].rects

  .map( rect =>
  (
    '<rect'           +
    ' y="'            + rect[ 0 ] * size +
    '"x="'            + rect[ 1 ] * size +
    '"width="'        + size +
    '"height="'       + size +
    '"stroke-width="' + size / 5 +
    '"class="'        + klass + ' atl_' + $ +
    '"/>'
  ) )

  .reduce( ( a , b ) => a + b )
)

