
'use strict'

//......................................................................................................................
//
G.D = // dom (document object model)
{
  aim   : document.querySelector( '#aim' ) ,
  ball  : document.querySelector( '#ball' ) ,
  board : document.querySelector( '#board' ) ,

  bulbs       : document.querySelectorAll( '.bul' ) ,
  zones       : document.querySelectorAll( '.zon' ) ,
  athletes    : document.querySelectorAll( '.atl' ) ,
  athlete_art : document.querySelectorAll( '.atl_art' ) ,
  bench_art   : document.querySelectorAll( '.bnc_art' ) ,
  selectors   : document.querySelectorAll( '.atl_sel' ) ,

  blue_light  : document.querySelectorAll( '.blu_lgt' ) ,
  blue_dark   : document.querySelectorAll( '.blu_drk' ) ,
  green_light : document.querySelectorAll( '.grn_lgt' ) ,
  green_dark  : document.querySelectorAll( '.grn_drk' )
}

//......................................................................................................................
//
G.I = // information
{
  a_to_m       : [ 'A','B','C','D','E','F','G','H','I','J','K','L','M' ] ,
  middle       : [ 'F09','F10','G09','G10' ] ,
  roundabout   : [ 'A','B','K','L' ] ,
  aspect       : { w : 16 , h : 9 } , // proportion
  body         : { w : 0 , h : 0 } , // px
  board        : { w : 0 , h : 0 } , // px
  cell_size    : 0 , // px
  border_full  : 0 , // px
  athlete_size : 0 , // px

  area : // cells
  {
    blue  : Array.from( G.D.blue_light ).concat( Array.from( G.D.blue_dark ) ).map( light => light.id ).sort() ,
    green : Array.from( G.D.green_light ).concat( Array.from( G.D.green_dark ) ).map( light => light.id ).sort()
  } ,

  goal :
  {
    blue  : [ 'C00','D00','E00','F00','G00','H00','I00','J00' ] ,
    green : [ 'C19','D19','E19','F19','G19','H19','I19','J19' ]
  }
}

//......................................................................................................................
// "aim", "shot" and "zones" are here for better code visualization since they don't have to be persistent
//
G.S = // state
{
  punting : false ,
  holding : { turns : 0 , team : null } ,



  path     : [] ,
  turn     : 0 ,
  pathing  : false ,
  placing  : false ,
  rounding : false ,
  locked   : false ,
  replace  : false ,
  old_cell : null , // cell or null
  aim      : null , // cell or null
  ball     : null , // cell or null
  scoring  : null , // 'green', 'blue' or null
  first    : null , // 'green', 'blue' or null
  pushed   : null , // from 0 to 19 or null
  selected : null , // from 0 to 19, 'ball' or null
  hovered  : null , // from 0 to 19, 'ball' or null
  shot     : { x : 0 , y : 0 } , // -1, 0 or 1
  holder   : { now : null , future : null } , // from 0 to 19 or null
  keepers  : { blue : null , green : null } , // from 0 to 19 or null
  replaced : { blue : [] , green : [] } , // from 0 to 19
  team     : { blue : [] , green : [] } , // from 0 to 19
  zones    : Array.from( G.D.zones ).map( _ => null ) , // cells or nulls
  athletes : Array.from( G.D.selectors ).map( selector => 'M' + selector.id.slice( -2 ) ) , // cells
  starter  :
  {
    blue  : [ 'C02','D03','I03','J02' ] ,
    green : [ 'C17','D16','I16','J17' ]
  }
}

