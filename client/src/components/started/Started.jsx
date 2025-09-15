import React from 'react'
import './started.scss'
import { useNavigate } from 'react-router-dom'

export default function Started() {

  let navigate = useNavigate()
  
  return (

    <div className="started">

        <div className="tag">validate your ideas and innovation</div>
        <div className="title">Ready to take the next step?</div>
        <div className="subtitle">Build the next big thing in Lagos state and get the support of industry professionals as you take this journey.</div>
        <div className="button__main" onClick={() => navigate('/register') } >Register & Apply</div>

        <div className="login">Already have an account? <span onClick={() => navigate('/login') }>Sign In</span> and Apply</div>

    </div>

  )

}
