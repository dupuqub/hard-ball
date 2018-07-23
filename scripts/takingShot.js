
`use strict`

//......................................................................................................................

G.takingShot = () =>
(
    G.I.goal.blue.indexOf (G.S.ball) !== -1
  ? `blue`
  : G.I.goal.green.indexOf (G.S.ball) !== -1
  ? `green`
  : null
)

