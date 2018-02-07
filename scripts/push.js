
'use strict'

//......................................................................................................................
//
G.push = _ =>
{
  const
  pushed_index  = G.S.pushed ,
  selected_cell = G.S.old_cell ,
  pushed_cell   = G.S.athletes[ pushed_index ] ,
  new_cell      = G.next_cell( selected_cell , pushed_cell )

  //..............................................................................................................
  // work with updated holders
  //
  if( pushed_index === G.S.holder.future
  || pushed_index === G.S.holder.now && G.S.holder.future === null
  || pushed_index === G.S.holder.now && pushed_index === G.S.holder.future )
  {
    G.S.holder.future = G.S.selected
  }

  //..............................................................................................................
  // prioritize defensive team (every pushed athlete may disrupt the ball at its path)
  //
  else if( G.S.ball === new_cell
  || G.S.ball === null && G.I.middle.indexOf( new_cell ) !== -1
  || G.S.path.indexOf( new_cell ) !== -1 )
  {
    G.S.holder.future = pushed_index
  }

  //..............................................................................................................
  //
  setTimeout( _ =>
  {
    G.S.pushed = null
    G.move( pushed_index , new_cell )
  } , 0 )
}

