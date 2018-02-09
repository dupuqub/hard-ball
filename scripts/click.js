
'use strict'

//......................................................................................................................
//
G.click = target =>
{
  //....................................................................................................................
  // UTILITIES
  //....................................................................................................................
  //
  if( target === 'language' )
  {
    //
  }
  else if( target === 'save' )
  {
    //
  }
  else if( target === 'load' )
  {
    //
  }
  else if( target === 'wipe' )
  {
    //
  }
  else if( target === 'github' )
  {
    //
  }

  //....................................................................................................................
  // GAMEPLAY
  //....................................................................................................................
  //
  else if( target === 'aim' || target === 'aim_ring') G.shoot()

  //....................................................................................................................
  // gate 0
  //
  else if( ! G.S.locked )
  {
    //..................................................................................................................
    //
    if( target.slice( 0 , 4 ) === 'zone' )
    {
      const zone_class_list = Array.from( G.D.zones[ Number( target.slice( 5 ) ) ].classList )

      if( zone_class_list.indexOf( 'zon_not' ) !== -1
      || zone_class_list.indexOf( 'zon_blk' ) !== -1 )
      {
        // do nothing (gameplay focused choice)
      }
      else
      {
        const
        zone_index  = Number( target.slice( 5 ) ) ,
        zone_cell   = G.S.zones[ zone_index ] ,
        zone_letter = zone_cell.slice( 0 , 1 ) ,
        zone_number = Number( zone_cell.slice( 1 ) )

        //..............................................................................................................
        //
        if( G.S.selected === 'ball' )
        {
          //............................................................................................................
          // has target
          //
          if( Array.from( G.D.zones[ zone_index ].classList ).indexOf( 'zon_red' ) !== -1 )
          {
            const athlete_index = G.S.athletes.indexOf( zone_cell )

            if( athlete_index !== -1 )
            {
              G.S.holder.future = athlete_index

              G.update_holder()
            }
            else
            {
              // try score
            }
          }

          //............................................................................................................
          // has NO target
          //
          else
          {
            const
            new_x = zone_number * G.I.cell_size + G.I.border_full ,
            new_y = G.I.a_to_m.indexOf( zone_letter ) * G.I.cell_size + G.I.border_full

            G.D.ball.style.marginLeft = new_x + 'px'
            G.D.ball.style.marginTop = new_y + 'px'

            G.D.aim.style.marginLeft = new_x + 'px'
            G.D.aim.style.marginTop = new_y + 'px'

            G.S.ball = zone_cell
            G.S.aim = zone_cell

            G.S.placing = false

            G.update_zone_cells()
          }
        }

        //..............................................................................................................
        //
        else if( G.S.selected !== null ) // athlete
        {
          const
          athlete_index  = G.S.selected ,
          athlete_cell   = G.S.athletes[ athlete_index ] ,
          athlete_letter = athlete_cell.slice( 0 , 1 ) ,
          athlete_number = Number( athlete_cell.slice( 1 ) )

          //............................................................................................................
          // startup
          //
          if( G.S.turn < 8 )
          {
            let color = G.plays_now()

            if( G.S.turn === 0 )
            {
              G.S.first = G.S.starter.blue.indexOf( zone_cell ) !== -1 ? 'blue' : 'green'
              color = G.S.first
            }

            G.D.athletes[ athlete_index ].classList.add( color )
            G.S.team[ color ].push( athlete_index )
            G.S.starter[ color ] = G.S.starter[ color ].filter( cell => cell !== zone_cell )

            G.move( G.S.selected , zone_cell )
          }

          //............................................................................................................
          // common play
          //
          else
          {
            //..........................................................................................................
            // define rounding
            //
            G.S.rounding = G.S.rounding ? false : G.I.roundabout.indexOf( athlete_letter ) !== -1

            //..........................................................................................................
            // check for holder moving
            //
            if( G.S.holder.now !== null && athlete_index === G.S.holder.now ) G.S.holder.future = G.S.holder.now

            //..........................................................................................................
            // first ball hold
            //
            if( G.S.ball === null && G.I.middle.indexOf( zone_cell ) !== -1 ) G.S.holder.future = athlete_index

            //..........................................................................................................
            // has target
            //
            else if( zone_class_list.indexOf( 'zon_red' ) !== -1 )
            {
              if( G.S.athletes.indexOf( zone_cell ) !== -1 )
              {
                G.S.pushed = G.S.athletes.indexOf( zone_cell )
                G.S.old_cell = athlete_cell
              }
              else if( zone_cell === G.S.ball || G.S.path.indexOf( zone_cell ) !== -1 )
              {
                G.S.holder.future = athlete_index
              }
            }

            //..........................................................................................................
            //
            G.move( G.S.selected , zone_cell )
          }
        }
      }
    }

    //..................................................................................................................
    // gate 1
    //
    else if( ! G.S.placing && ! G.S.rounding )
    {
      if( target === 'ball' && G.S.ball !== null )   G.update_selected( 'ball' )
      else if( target.slice( 0 , 7 ) === 'athlete' ) G.update_selected( Number( target.slice( 8 ) ) )
      else                                           G.update_selected( null )
    }
  }
}

