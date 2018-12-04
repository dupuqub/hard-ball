
`use strict`

//......................................................................................................................

G.contextMenu = event =>
{
  if(!G.S.locked
  && !G.S.placing
  && !G.S.rounding
  && !G.S.punting)
  {
    G.updateSelected(null)
  }

  return false
}

