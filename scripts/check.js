
'use strict'

//......................................................................................................................
//
var check =
{
  pool : [] ,
  tool : _ => check.pool.forEach( ( item_0 , $_0 ) =>
  {
    if( item_0.test() )
    {
      var safe_act = item_0.act

      check.pool = check.pool.filter( ( item_1 , $_1 ) => $_0 !== $_1 )

      safe_act()
    }
  } )
}

