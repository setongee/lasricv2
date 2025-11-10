import React from 'react'
import { useCohortNumber } from '../../stores/cohort.store'
import './banner.scss'
import people from './lasricv9.jpg'
import { Xmark } from 'iconoir-react'
import { useNavigate } from 'react-router-dom'

const Banner = ({onClose}) => {
    const cohort = useCohortNumber(state => state.cohort)
    const navigate = useNavigate()

    const onApply = (e) => {
        e.preventDefault();
        window.sessionStorage.setItem('banner', true);
        navigate('/apply')
    }

  return (
   <div className="banner-holder">
    <div className="banner">
        <div className="closeBanner" onClick={() => onClose(true)}><Xmark strokeWidth={2}/></div>
        <div className="bannerImage"><img src={people} alt="" /></div>
        <div className="bannerContent">
            <p>Applications Now Open for LASRIC Cohort {cohort}!</p>
            <span>Are you an innovator, startup founder, or researcher with a brilliant idea that can transform Lagos?
Join the LASRIC Innovation Fund Cohort {cohort} and get the support you need to scale your impact.</span>
        <button onClick={onApply}> Apply Now </button>
        </div>

   </div>
   </div>
  )
}

export default Banner