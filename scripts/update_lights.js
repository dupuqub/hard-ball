
'use strict'

//......................................................................................................................
//
var update_lights = _ =>
{
  var
  fills_athlete = document.querySelectorAll( '.fil_atl' ),
  color = plays_now()

  fills_athlete.forEach( art => art.classList.remove( 'glw' ) )

  blue_light.forEach( cell => cell.classList.remove( 'glw' ) )
  blue_dark.forEach( cell => cell.classList.remove( 'glw' ) )
  green_light.forEach( cell => cell.classList.remove( 'glw' ) )
  green_dark.forEach( cell => cell.classList.remove( 'glw' ) )

  if( color === 'blue' )
  {
    blue_light.forEach( cell => cell.classList.add( 'glw' ) )
    blue_dark.forEach( cell => cell.classList.add( 'glw' ) )
  }
  else
  {
    green_light.forEach( cell => cell.classList.add( 'glw' ) )
    green_dark.forEach( cell => cell.classList.add( 'glw' ) )
  }

  setTimeout( _ =>
  {
    state.team[ color ].forEach( athlete_index =>
    {
      var arts = document.querySelectorAll( '.atl_' + athlete_index )

      arts.forEach( art => art.classList.add( 'glw' ) )
    } )
  } , 750 )
}

