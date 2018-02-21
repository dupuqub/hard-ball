
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
  else if( target === 'aim' || target === 'aim_ring' ) G.shoot()

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
        zone        = Number( target.slice( 5 ) ) ,
        zone_cell   = G.S.zones[ zone ] ,
        zone_letter = zone_cell.slice( 0 , 1 ) ,
        zone_index  = G.I.a_to_m.indexOf( zone_letter ) ,
        zone_number = Number( zone_cell.slice( 1 ) )

        //..............................................................................................................
        //
        if( G.S.selected === 'ball' )
        {
          //............................................................................................................
          // has target
          //
          if( Array.from( G.D.zones[ zone ].classList ).indexOf( 'zon_red' ) !== -1 )
          {
            const athlete_index = G.S.athletes.indexOf( zone_cell )

            if( athlete_index !== -1 )
            {
              G.S.holder.future = athlete_index

              G.update_holder()
            }
            else
            {
              const
              new_x = zone_number * G.I.cell_size + G.I.border_full ,
              new_y = zone_index * G.I.cell_size + G.I.border_full

              G.D.ball.style.marginLeft = new_x + 'px'
              G.D.ball.style.marginTop = new_y + 'px'
              G.D.aim.style.marginLeft = new_x + 'px'
              G.D.aim.style.marginTop = new_y + 'px'

              G.S.ball = zone_cell
              G.S.aim = zone_cell

              G.S.scoring = G.scoring()
              G.S.holder.now = null

              G.update_selected( null )
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
          athlete        = G.S.selected ,
          athlete_cell   = G.S.athletes[ athlete ] ,
          athlete_letter = athlete_cell.slice( 0 , 1 ) ,
          athlete_number = Number( athlete_cell.slice( 1 ) ) ,

          pushed = G.S.athletes.indexOf( zone_cell )

          let color = G.plays_now()

          //............................................................................................................
          // startup
          //
          if( G.S.turn < 8 )
          {
            if( G.S.turn === 0 )
            {
              G.S.first = G.S.starter.blue.indexOf( zone_cell ) !== -1 ? 'blue' : 'green'
              color = G.S.first
            }

            G.D.athletes[ athlete ].classList.add( color )
            G.S.team[ color ].push( athlete )
            G.S.starter[ color ] = G.S.starter[ color ].filter( cell => cell !== zone_cell )

            G.move( G.S.selected , zone_cell )
          }

          //............................................................................................................
          // benched
          //
          else if( athlete_letter === 'M' && G.S.replaced[ G.plays_now() ].length < 2 )
          {
            G.S.replace = true
            G.S.pushed = pushed

            G.S.team[ color ] = G.S.team[ color ].map( item =>{ return item === pushed ? athlete : item } )
            G.S.replaced[ color ].push( pushed )

            G.D.athletes[ pushed ].classList.add( 'rep' )
            G.D.athletes[ athlete ].classList.add( color )

            G.update_lights()
            G.move( athlete , zone_cell )
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
            if( G.S.holder.now !== null && athlete === G.S.holder.now ) G.S.holder.future = G.S.holder.now

            //..........................................................................................................
            // first ball hold
            //
            if( G.S.ball === null && G.I.middle.indexOf( zone_cell ) !== -1 ) G.S.holder.future = athlete

            //..........................................................................................................
            // has target
            //
            else if( zone_class_list.indexOf( 'zon_red' ) !== -1 )
            {
              //........................................................................................................
              // push
              //
              if( G.S.athletes.indexOf( zone_cell ) !== -1 )
              {
                G.S.pushed = pushed
                G.S.old_cell = athlete_cell
              }

              //........................................................................................................
              // take ball
              //
              else if( zone_cell === G.S.ball || G.S.path.indexOf( zone_cell ) !== -1 )
              {
                G.S.holder.future = athlete
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
      //................................................................................................................
      //
      if( target === 'ball' && G.S.ball !== null && G.S.scoring === null )
      {
        G.update_selected( 'ball' )
      }

      //................................................................................................................
      //
      else if( target.slice( 0 , 7 ) === 'athlete' )
      {
        const
        athlete               = Number( target.slice( -2 ) ) ,
        athlete_letter        = G.S.athletes[ athlete ].slice( 0 , 1 ) ,
        athlete_was_replaced  = Array.from( G.D.athletes[ athlete ].classList ).indexOf( 'rep' ) !== -1 ,
        team_has_replacements = G.S.replaced[ G.plays_now() ].length < 2

        if( athlete_letter !== 'M' || ! athlete_was_replaced && team_has_replacements )
        {
          G.update_selected( athlete )
        }
      }

      //................................................................................................................
      // click nothing
      //
      else
      {
        G.update_selected( null )
      }
    }
  }
}

