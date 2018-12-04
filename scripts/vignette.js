
`use strict`

//......................................................................................................................

G.vignette =
{
  show: inner =>
  {
    G.D.centralWindow.innerHTML = inner
    G.D.vignette.style.display = `flex`
    setTimeout(() => G.D.vignette.style.opacity = 100, 50) // to trigger transition animation
  },

  hide: () =>
  {
    G.D.vignette.style.opacity = 0
    setTimeout(() => G.D.vignette.style.display = `none`, 300) // to trigger transition animation
  },
}

