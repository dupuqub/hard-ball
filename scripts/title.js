
`use strict`

//......................................................................................................................

G.title = string =>
(
  Array
  .from (string)
  .map ((char, index) => index ? char : char.toUpperCase ())
  .reduce ((a, b) => a + b, ``)
)

