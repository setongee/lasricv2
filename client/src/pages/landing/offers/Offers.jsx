import React from 'react'
import './offers.scss'
import { ArrowUpRight } from 'iconoir-react';

export default function Offers({photo, title, subtitle}) {
  return (

    <div className="offer">

        <div className="offer__photo">
            <img src={photo} alt="" />
        </div>

        <div className="offer__content">

            <div className="offer__content__title"> {title} </div>

            <div className="offer__content__subtitle"> {subtitle} </div>

            {/* <div className="learn">Learn More <div className="arrow__go"><ArrowUpRight/></div> </div> */}

        </div>

    </div>

  )
  
}
