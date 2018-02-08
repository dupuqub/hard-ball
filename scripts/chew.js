
'use strict'

//......................................................................................................................
//
G.celler = ( letter , number ) => letter + ( number < 10 ? '0' + number : number )

//......................................................................................................................
//
G.letterer = ( letter , number ) => G.I.a_to_m[ G.numberer( G.I.a_to_m.indexOf( letter ) + number , 12 ) ]

//......................................................................................................................
//
G.numberer = ( index , length ) => index > length - 1 ? index - length : index < 0 ? length + index : index

//......................................................................................................................
//
G.chew = ( athlete_source , athlete_sight ) =>
{
  const
  source_cell        = G.S.athletes[ athlete_source ] ,
  source_cell_letter = source_cell.slice( 0 , 1 ) ,
  source_cell_number = Number( source_cell.slice( 1 ) ) ,

  sight_cell        = G.S.athletes[ athlete_sight ] ,
  sight_cell_letter = sight_cell.slice( 0 , 1 ) ,
  sight_cell_number = Number( sight_cell.slice( 1 ) ) ,

  moves = G.matrix[ athlete_sight ].moves ,

  array_of_cells = []

  moves.forEach( move =>
  {
    if( move === 0 || move === 2 || move === 5 )
    {
      const
      value = move === 0 ? 1 : move === 2 ? 2 : 3 ,
      cells =
      [
        G.celler( source_cell_letter , G.numberer( source_cell_number - value , 20 ) ) ,
        G.celler( source_cell_letter , G.numberer( source_cell_number + value , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , -value ) , source_cell_number ) ,
        G.celler( G.letterer( source_cell_letter , value ) , source_cell_number )
      ]

      cells.forEach( cell => array_of_cells.push( cell ) )
    }
    if( move === 1 || move === 4 || move === 8 )
    {
      const
      value = move === 1 ? 1 : move === 4 ? 2 : 3 ,
      cells =
      [
        G.celler( G.letterer( source_cell_letter , -value ) , G.numberer( source_cell_number - value , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , value ) , G.numberer( source_cell_number - value , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , value ) , G.numberer( source_cell_number + value , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , -value ) , G.numberer( source_cell_number + value , 20 ) )
      ]

      cells.forEach( cell => array_of_cells.push( cell ) )
    }
    if( move === 3 || move === 6 || move === 7 )
    {
      const
      value_0 = move === 3 ? 1 : move === 6 ? 1 : 2 ,
      value_1 = move === 3 ? 2 : move === 6 ? 3 : 3 ,
      cells   =
      [
        G.celler( G.letterer( source_cell_letter , -value_0 ) , G.numberer( source_cell_number - value_1 , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , value_0 ) , G.numberer( source_cell_number - value_1 , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , value_1 ) , G.numberer( source_cell_number - value_0 , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , value_1 ) , G.numberer( source_cell_number + value_0 , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , value_0 ) , G.numberer( source_cell_number + value_1 , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , -value_0 ) , G.numberer( source_cell_number + value_1 , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , -value_1 ) , G.numberer( source_cell_number + value_0 , 20 ) ) ,
        G.celler( G.letterer( source_cell_letter , -value_1 ) , G.numberer( source_cell_number - value_0 , 20 ) )
      ]

      cells.forEach( cell => array_of_cells.push( cell ) )
    }
  } )

  return array_of_cells
}

