
'use strict'

//......................................................................................................................
//
G.update_lights = _ =>
{
  const color = G.plays_now()

  document.querySelectorAll( '.atl_fil' ).forEach( art => art.classList.remove( 'glw' ) )

  G.D.blue_light.forEach( cell => cell.classList.remove( 'glw' ) )
  G.D.blue_dark.forEach( cell => cell.classList.remove( 'glw' ) )
  G.D.green_light.forEach( cell => cell.classList.remove( 'glw' ) )
  G.D.green_dark.forEach( cell => cell.classList.remove( 'glw' ) )

  setTimeout( _ => // this timeout serves to address issues with updating after a path clear
  {
    if( color === 'blue' )
    {
      G.D.blue_light.forEach( cell => cell.classList.add( 'glw' ) )
      G.D.blue_dark.forEach( cell => cell.classList.add( 'glw' ) )
    }
    else
    {
      G.D.green_light.forEach( cell => cell.classList.add( 'glw' ) )
      G.D.green_dark.forEach( cell => cell.classList.add( 'glw' ) )
    }

    setTimeout( _ => // this timeout serves to make area cells and athletes glow alternately
    {
      G.S.team[ color ].forEach( athlete_index =>
      {
        document.querySelectorAll( '.atl_' + athlete_index ).forEach( art => art.classList.add( 'glw' ) )
      } )
    } , 750 )
  } , 0 )
}

