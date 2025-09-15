import React from 'react'
import './styles.scss'
import logo from './assets/lasric_logo.svg'
import construct from './assets/construction.png'
import find from './assets/find.svg'

export default function Construction() {
  return (
    <div className="construction">

        <div className="public"> Cohort VI is around the corner with new LASRIC 2.0 experience 🚀 <span>Get Notified when live</span></div>

        <div className="head__title"> 
          <div className="logo"> <img src={logo} alt="" /> </div> 
        </div>

        <div className="build__text">
          
          <div className="text"> We're Building a Better Experience for You. </div>
          <div className="sub__heading"> We’re creating a faster, smarter, and more intuitive platform designed to elevate your entire experience! </div>
          
        </div>

        <div className="construction__image">
          <img src={construct} alt="" />
        </div>

    </div>
  )
}
