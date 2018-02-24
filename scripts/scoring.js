
'use strict'

//......................................................................................................................
//
G.scoring = _ =>
{
  return(

      G.I.goal.blue.indexOf( G.S.ball ) !== -1
    ? 'green'
    : G.I.goal.green.indexOf( G.S.ball ) !== -1
    ? 'blue'
    : null
  )
}

