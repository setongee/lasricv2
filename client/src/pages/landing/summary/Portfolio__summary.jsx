import React from 'react'
import './summary.scss'

//portfolio
import farm from '../../../assets/portfolio/farmz2u.png'
import pricepally from '../../../assets/portfolio/pricepally.png'
import tera from '../../../assets/portfolio/terawork.png'
import solid from '../../../assets/portfolio/solidLabs.png'
import simbi from '../../../assets/portfolio/simbibot.png'
import brick from '../../../assets/portfolio/brick.png'
import adire from '../../../assets/portfolio/adire.png'
import nja from '../../../assets/portfolio/9ja.png'
import shifa from '../../../assets/portfolio/shifa.png'
import doci from '../../../assets/portfolio/doci.png'


export default function Portfolio__summary() {

  return (

    <div className="portfolio__brief">

        <div className="section__title"> Some of the Innovations and Research we are proud to have backed </div>

            <div className="card__group">

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={solid} alt="" />

                        </div>

                    </div>

                    <div className="card__name">

                        <p>Solid Labs Ltd.</p>
                        <span>Cohort 3</span>

                    </div>

                </div>

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={farm} alt="" />

                        </div>

                    </div>

                    <div className="card__name">
                        <p>Farmz2u</p>
                        <span>Cohort 1</span>
                    </div>

                </div>

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={nja} alt="" />

                        </div>

                    </div>

                    <div className="card__name">
                        <p>9ija Kids</p>
                        <span>Cohort 3</span>
                    </div>

                </div>

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={adire} alt="" />

                        </div>

                    </div>

                    <div className="card__name">
                        <p>Adire Lounge</p>
                        <span>Cohort 3</span>
                    </div>

                </div>

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={brick} alt="" />

                        </div>

                    </div>

                    <div className="card__name">
                        <p>Brickify Tech.</p>
                        <span>Cohort 3</span>
                    </div>

                </div>

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={pricepally} alt="" />

                        </div>

                    </div>

                    <div className="card__name">
                        <p>Pricepally</p>
                        <span>Cohort 1</span>
                    </div>

                </div>

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={shifa} alt="" />

                        </div>

                    </div>

                    <div className="card__name">
                        <p>Shifa Technologies</p>
                        <span>Cohort 1</span>
                    </div>

                </div>

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={doci} alt="" />

                        </div>

                    </div>

                    <div className="card__name">
                        <p>Doci Health Tech</p>
                        <span>Cohort 3</span>
                    </div>

                </div>

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={tera} alt="" />

                        </div>

                    </div>

                    <div className="card__name">
                        <p>Terawork</p>
                        <span>Cohort 2</span>
                    </div>

                </div>

                <div className="card__xl">

                    <div className="sqr__card">

                        <div className="img__card">

                            <img src={simbi} alt="" />

                        </div>

                    </div>

                    <div className="card__name">
                        <p>Simbibot</p>
                        <span>Cohort 2</span>
                    </div>

                </div>

            </div>

    </div>

  )

}
