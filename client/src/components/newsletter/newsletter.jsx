import React from 'react'
import './newsletter.scss'

export default function Newsletter() {
  return (

    <div className="newsletter">

        <div className="title">Subscribe Newsletter</div>

        <form action="">

            <input type="email" placeholder='Enter Email Address' />
            <div className="submitButton">Subscribe Now</div>

        </form>

    </div>

  )

}
