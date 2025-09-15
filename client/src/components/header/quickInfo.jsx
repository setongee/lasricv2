import React from 'react'
import './header.scss'
import { useNavigate } from 'react-router-dom';

export default function QuickInfo({cohort}) {

  let navigate = useNavigate();

  return (
    
    <div className="quickInfo"> Build the next big idea, <span onClick={ () => navigate('/apply') } > Apply for C{cohort} now! </span> </div>

  )
}
