
'use strict'

//......................................................................................................................
//
var make_cell = ( letter , number ) => letter + ( number < 10 ? '0' + number : number )

//......................................................................................................................
//
var make_letter = ( letter , number ) => a_to_t[ make_number( a_to_t.indexOf( letter ) + number , 20 ) ]

//......................................................................................................................
//
var make_number = ( index , length ) => index > length - 1 ? index - length : index < 0 ? length + index : index

//......................................................................................................................
//
var chew = ( athlete_source , athlete_sight ) =>
{
  var
  source_cell        = state.athletes[ athlete_source ] ,
  source_cell_letter = source_cell.slice( 0 , 1 ) ,
  source_cell_number = Number( source_cell.slice( 1 , 3 ) ) ,

  sight_cell         = state.athletes[ athlete_sight ] ,
  sight_cell_letter  = sight_cell.slice( 0 , 1 ) ,
  sight_cell_number  = Number( sight_cell.slice( 1 , 3 ) ) ,

  moves              = matrix[ athlete_sight ].moves ,
  this_array         = []

  moves.forEach( move =>
  {
    if( move === 0 || move === 2 || move === 5 )
    {
      var
      value = move === 0 ? 1 : move === 2 ? 2 : 3 ,
      cells =
      [
        make_cell( source_cell_letter , make_number( source_cell_number - value , 12 ) ) ,
        make_cell( source_cell_letter , make_number( source_cell_number + value , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , - value ) , source_cell_number ) ,
        make_cell( make_letter( source_cell_letter , value ) , source_cell_number ) ,
      ]

      cells.forEach( cell => this_array.push( cell ) )
    }
    if( move === 1 || move === 4 || move === 8 )
    {
      var
      value = move === 1 ? 1 : move === 4 ? 2 : 3 ,
      cells =
      [
        make_cell( make_letter( source_cell_letter , - value ) , make_number( source_cell_number - value , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , value ) , make_number( source_cell_number - value , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , value ) , make_number( source_cell_number + value , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , - value ) , make_number( source_cell_number + value , 12 ) ) ,
      ]

      cells.forEach( cell => this_array.push( cell ) )
    }
    if( move === 3 || move === 6 || move === 7 )
    {
      var
      value_0 = move === 3 ? 1 : move === 6 ? 1 : 2 ,
      value_1 = move === 3 ? 2 : move === 6 ? 3 : 3 ,
      cells =
      [
        make_cell( make_letter( source_cell_letter , - value_0 ) , make_number( source_cell_number - value_1 , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , value_0 ) , make_number( source_cell_number - value_1 , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , value_1 ) , make_number( source_cell_number - value_0 , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , value_1 ) , make_number( source_cell_number + value_0 , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , value_0 ) , make_number( source_cell_number + value_1 , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , - value_0 ) , make_number( source_cell_number + value_1 , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , - value_1 ) , make_number( source_cell_number + value_0 , 12 ) ) ,
        make_cell( make_letter( source_cell_letter , - value_1 ) , make_number( source_cell_number - value_0 , 12 ) ) ,
      ]

      cells.forEach( cell => this_array.push( cell ) )
    }
  } )

  return this_array
}

