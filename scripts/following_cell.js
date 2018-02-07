
'use strict'

//......................................................................................................................
//
G.following_cell = ( first_cell , second_cell ) =>
{
  const
  first_letter  = first_cell.slice( 0 , 1 ) ,
  first_number  = Number( first_cell.slice( 1 ) ) ,
  second_letter = second_cell.slice( 0 , 1 ) ,
  second_number = Number( second_cell.slice( 1 ) ) ,

  first_letter_index  = G.I.a_to_m.indexOf( first_letter ) ,
  second_letter_index = G.I.a_to_m.indexOf( second_letter ) ,
  letter_diff         = second_letter_index - first_letter_index ,
  number_diff         = second_number - first_number ,
  number_origin       = second_number + number_diff ,

  new_letter = G.letterer( second_letter , letter_diff ) ,
  new_number = G.numberer( number_origin , 20 )

  return G.celler( new_letter , new_number )
}

