
`use strict`

//......................................................................................................................
// Firefox couldn't handle `art.style.width" nor "art.style.height" without "px"

G.redrawSvg = (domObject, klass) =>
{
  domObject.forEach((art, index) =>
  {
    const size = G.I.board.w / 140

    art.innerHTML = G.createSvgInnerHtml(index, size, klass)
    art.style.width = G.matrix[index].w * size + `px`
    art.style.height = G.matrix[index].h * size + `px`
  })
}

//......................................................................................................................
// Firefox couldn't handle "width", "height" nor "stroke-width" defined by CSS

G.createSvgInnerHtml =(index, size, klass) =>
(
  G.matrix[index].rects

  .map(rect =>
  (
    `<rect` +
    ` y="` + rect[0] * size +
    `"x="` + rect[1] * size +
    `"width="` + size +
    `"height="` + size +
    `"stroke-width="` + size / 5 +
    `"class="` + klass + ` atl` + index +
    `"/>`
  ))

  .reduce((a, b) => a + b, ``)
)

