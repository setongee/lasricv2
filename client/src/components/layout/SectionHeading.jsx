import React from 'react'
import './layout.scss'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'iconoir-react'
import { Link } from 'react-router-dom'

export default function SectionHeading( { title, subtitle, subtag, style, showNavArrows, link, target } ) {

    const arrowScroll = (type) => {

    const rt = document.getElementById(target);

        if(rt !== null) {

            if(type === 'right'){
                rt.scrollLeft += 500
            }else{
                rt.scrollLeft -= 500
            }

        }

    }
    
  return (

    <div className={`sectionHeading ${style}`}>

        <div className="subtag">

            <p> {subtag} </p>

            { link ? <Link to = {link.url} className='SectionHeadingLinks'> View All Our People <div className="arrow__go"><ArrowUpRight/></div> </Link> : null }

        </div>

        <div className="divider"></div>

        <div className="titleHeader">

            <div className="title"> {title} </div>
            <div className="subtitle"> {subtitle} </div>

            {
                
                showNavArrows ? 

                <div className="navArrows">

                    <div onClick={()=>arrowScroll('left')} ><ArrowLeft/></div>
                   <div onClick={()=>arrowScroll('right')} > <ArrowRight/></div>

                </div> 
                
                : null
            }

        </div>

    </div>

  )
}
