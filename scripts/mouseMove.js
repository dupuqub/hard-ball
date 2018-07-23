
`use strict`

//......................................................................................................................

G.mouseMove = target =>
{
  G.S.hovered =

      target === `ball`
    ? `ball`
    : target.slice (0, 7) === `athlete`
    ? Number (target.slice (7))
    : null

  G.updateZoneCells()
}

