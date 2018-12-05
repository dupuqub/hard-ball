
`use strict`

//......................................................................................................................

G.updateBoardConsole = target =>
{
  if(target === `boardConsole`
  || target === `floppy`
  || target === `git`
  || target === `itch`
  || target === `lang`
  || target === `reset`)
  {
    G.D.boardConsole.innerHTML = G.langs[G.S.lang][target]
  }
  else
  {
    G.D.boardConsole.innerHTML = `...`
  }
}

