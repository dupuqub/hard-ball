
'use strict'

//......................................................................................................................
//
var redraw = ( dom_object , klass ) =>
{
  dom_object.forEach( ( art , $ ) =>
  {
    var size = root_raw.game_w / 140

    art.innerHTML    = write_svg( $ , size , klass )
    art.style.width  = matrix[ $ ].w * size
    art.style.height = matrix[ $ ].h * size
  } )
}

//......................................................................................................................
//
var write_svg = ( $ , size , klass ) =>
{
  var rect = matrix[ $ ].rects

  return(

    '<rect x="' + rect[ 0 ][ 1 ] * size + '" y="' + rect[ 0 ][ 0 ] * size + '" class="sqr_art atl_' + $ + ' ' + klass + '"></rect>' +
    '<rect x="' + rect[ 1 ][ 1 ] * size + '" y="' + rect[ 1 ][ 0 ] * size + '" class="sqr_art atl_' + $ + ' ' + klass + '"></rect>' +
    '<rect x="' + rect[ 2 ][ 1 ] * size + '" y="' + rect[ 2 ][ 0 ] * size + '" class="sqr_art atl_' + $ + ' ' + klass + '"></rect>' +
    '<rect x="' + rect[ 3 ][ 1 ] * size + '" y="' + rect[ 3 ][ 0 ] * size + '" class="sqr_art atl_' + $ + ' ' + klass + '"></rect>'
  )
}

