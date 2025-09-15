import React from 'react'
import { convertToTitleCase } from '../../middleware/middleware'

export default function PortfolioItem({data}) {

    const visitPortfolio = () => {

        window.open(data.data.website);
        
    }

  return (

    <div className="portfolio" onClick = { () => visitPortfolio() } >

        <div className="company">

            <div className="logo"><img src={data.data.logo} alt="" /></div>

            <div className="company__name">
                <p> { convertToTitleCase(data.data.company) } </p>
                <span>{data.data.founders}</span>
            </div>

        </div>

        <div className="details">
            <div className="tab active">cohort {data.data.cohortNum} </div>
            <div className="tab"> {data.data.track} </div>
        </div>

    </div>

  )
}
