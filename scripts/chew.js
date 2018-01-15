
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
  source_cell        = state.athletes[ athlete_source ].cell ,
  source_cell_letter = source_cell.slice( 0 , 1 ) ,
  source_cell_number = Number( source_cell.slice( 1 , 3 ) ) ,

  sight_cell         = state.athletes[ athlete_sight ].cell ,
  sight_cell_letter  = sight_cell.slice( 0 , 1 ) ,
  sight_cell_number  = Number( sight_cell.slice( 1 , 3 ) ) ,

  moves              = matrix[ athlete_sight ].moves ,
  this_array         = []

  if( moves.indexOf( 0 ) !== - 1 )
  {
    var cells =
    [
      make_cell( source_cell_letter , make_number( source_cell_number - 1 , 12 ) ) ,
      make_cell( source_cell_letter , make_number( source_cell_number + 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 1 ) , source_cell_number ) ,
      make_cell( make_letter( source_cell_letter , 1 ) , source_cell_number ) ,
    ]

    cells.forEach( cell => this_array.push( cell ) )
  }
  if( moves.indexOf( 1 ) !== - 1 )
  {
    var cells =
    [
      make_cell( make_letter( source_cell_letter , - 1 ) , make_number( source_cell_number - 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 1 ) , make_number( source_cell_number - 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 1 ) , make_number( source_cell_number + 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 1 ) , make_number( source_cell_number + 1 , 12 ) ) ,
    ]

    cells.forEach( cell => this_array.push( cell ) )
  }
  if( moves.indexOf( 2 ) !== - 1 )
  {
    var cells =
    [
      make_cell( source_cell_letter , make_number( source_cell_number - 2 , 12 ) ) ,
      make_cell( source_cell_letter , make_number( source_cell_number + 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 2 ) , source_cell_number ) ,
      make_cell( make_letter( source_cell_letter , 2 ) , source_cell_number ) ,
    ]

    cells.forEach( cell => this_array.push( cell ) )
  }
  if( moves.indexOf( 3 ) !== - 1 )
  {
    var cells =
    [
      make_cell( make_letter( source_cell_letter , - 1 ) , make_number( source_cell_number - 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 1 ) , make_number( source_cell_number - 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 2 ) , make_number( source_cell_number - 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 2 ) , make_number( source_cell_number + 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 1 ) , make_number( source_cell_number + 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 1 ) , make_number( source_cell_number + 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 2 ) , make_number( source_cell_number + 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 2 ) , make_number( source_cell_number - 1 , 12 ) ) ,
    ]

    cells.forEach( cell => this_array.push( cell ) )
  }
  if( moves.indexOf( 4 ) !== - 1 )
  {
    var cells =
    [
      make_cell( make_letter( source_cell_letter , - 2 ) , make_number( source_cell_number - 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 2 ) , make_number( source_cell_number - 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 2 ) , make_number( source_cell_number + 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 2 ) , make_number( source_cell_number + 2 , 12 ) ) ,
    ]

    cells.forEach( cell => this_array.push( cell ) )
  }
  if( moves.indexOf( 5 ) !== - 1 )
  {
    var cells =
    [
      make_cell( source_cell_letter , make_number( source_cell_number - 3 , 12 ) ) ,
      make_cell( source_cell_letter , make_number( source_cell_number + 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 3 ) , source_cell_number ) ,
      make_cell( make_letter( source_cell_letter , 3 ) , source_cell_number ) ,
    ]

    cells.forEach( cell => this_array.push( cell ) )
  }
  if( moves.indexOf( 6 ) !== - 1 )
  {
    var cells =
    [
      make_cell( make_letter( source_cell_letter , - 1 ) , make_number( source_cell_number - 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 1 ) , make_number( source_cell_number - 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 3 ) , make_number( source_cell_number - 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 3 ) , make_number( source_cell_number + 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 1 ) , make_number( source_cell_number + 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 1 ) , make_number( source_cell_number + 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 3 ) , make_number( source_cell_number + 1 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 3 ) , make_number( source_cell_number - 1 , 12 ) ) ,
    ]

    cells.forEach( cell => this_array.push( cell ) )
  }
  if( moves.indexOf( 7 ) !== - 1 )
  {
    var cells =
    [
      make_cell( make_letter( source_cell_letter , - 2 ) , make_number( source_cell_number - 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 2 ) , make_number( source_cell_number - 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 3 ) , make_number( source_cell_number - 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 3 ) , make_number( source_cell_number + 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 2 ) , make_number( source_cell_number + 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 2 ) , make_number( source_cell_number + 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 3 ) , make_number( source_cell_number + 2 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 3 ) , make_number( source_cell_number - 2 , 12 ) ) ,
    ]

    cells.forEach( cell => this_array.push( cell ) )
  }
  if( moves.indexOf( 8 ) !== - 1 )
  {
    var cells =
    [
      make_cell( make_letter( source_cell_letter , - 3 ) , make_number( source_cell_number - 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 3 ) , make_number( source_cell_number - 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , 3 ) , make_number( source_cell_number + 3 , 12 ) ) ,
      make_cell( make_letter( source_cell_letter , - 3 ) , make_number( source_cell_number + 3 , 12 ) ) ,
    ]

    cells.forEach( cell => this_array.push( cell ) )
  }

  return this_array
}

