
'use strict'

//......................................................................................................................
//
G.push_athlete = _ =>
{
  const
  pushed        = G.S.pushed ,
  selected_cell = G.S.old_cell ,
  pushed_cell   = G.S.athletes[ pushed ] ,
  new_cell      =
      G.S.replace
    ? G.celler( 'M' , pushed )
    : G.next_cell( selected_cell , pushed_cell )

  //..............................................................................................................
  // update future holder . part 1
  //
  if( pushed !== null )
  {
    if( pushed === G.S.holder.future
    || pushed === G.S.holder.now && null === G.S.holder.future
    || pushed === G.S.holder.now && pushed === G.S.holder.future )
    {
      G.S.holder.future = G.S.selected
    }
  }

  //..............................................................................................................
  // update future holder . part 2
  //
  // to prioritize the defensive team, every pushed athlete may disrupt the ball at its path
  //
  if( G.S.ball === new_cell
  || G.S.ball === null && G.I.middle.indexOf( new_cell ) !== -1
  || G.S.path.indexOf( new_cell ) !== -1 )
  {
    G.S.holder.future = pushed
  }

  //..............................................................................................................
  //
  G.S.pushed = null
  G.S.old_cell = null

  G.move( pushed , new_cell )
}

