
'use strict'

//......................................................................................................................
//
G.taking_shot = _ =>
{
  return(

      G.I.goal.blue.indexOf( G.S.ball ) !== -1
    ? 'green'
    : G.I.goal.green.indexOf( G.S.ball ) !== -1
    ? 'blue'
    : null
  )
}

