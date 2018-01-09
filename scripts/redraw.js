
'use strict'

//......................................................................................................................
//
var redraw = ( dom_object , klass ) =>
{
  Array.from( dom_object ).forEach( ( art , $ ) =>
  {
    var
    size       = root_raw.game_w / 20 / 7 ,
    new_width  = art_matrix[ $ ].w * size ,
    new_height = art_matrix[ $ ].h * size

    art_bench[ $ ].innerHTML    = write_svg( $ , size , klass )
    art_bench[ $ ].style.width  = new_width
    art_bench[ $ ].style.height = new_height
  } )
}

//......................................................................................................................
//
var write_svg = ( $ , size , klass ) =>
{
  var rect = art_matrix[ $ ].rects

  return '<rect x="' + rect[0][1] * size + '" y="' + rect[0][0] * size + '" class="sqr_art ' + klass + '"></rect>' +
         '<rect x="' + rect[1][1] * size + '" y="' + rect[1][0] * size + '" class="sqr_art ' + klass + '"></rect>' +
         '<rect x="' + rect[2][1] * size + '" y="' + rect[2][0] * size + '" class="sqr_art ' + klass + '"></rect>' +
         '<rect x="' + rect[3][1] * size + '" y="' + rect[3][0] * size + '" class="sqr_art ' + klass + '"></rect>'
}

