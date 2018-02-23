
'use strict'

//......................................................................................................................
//
G.light_path = ( method , where ) =>
{
  let $ = 0

  const path_lighter = setInterval( _ =>
  {
    const zone = document.querySelector( '#' + G.S.path[ $ ] )

    zone.classList[ method ]( 'pat' )

    $ ++

    if( $ === G.S.path.length - 1 )
    {
      G.S.locked = false

      window.clearInterval( path_lighter )

      if( method === 'remove' )
      {
        G.S.path = []

        G.update_lights()
      }
    }
  } , 30 )
}

