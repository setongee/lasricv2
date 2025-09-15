import React from 'react'
import './contact.scss'
import Container from '../../components/container/container'

export default function Contact() {

  return (

    <div className="contact pageBrief">

        <Container>

            <div className="headers">

                <p> Contact us today – we’re excited to hear about your ideas or needs. </p>

                <div className="description">Our friendly team would love to hear from you</div>

            </div>

            <div className="lasric__form">

                <form>

                    <div className="diff">

                        <div className="inputZone"> 
                            <label htmlFor="fullname"> Firstname</label>
                            <input type="text" name='fullname' placeholder='Enter here...' /> 
                        </div>

                        <div className="inputZone"> 
                            <label htmlFor="fullname">Lastname</label>
                            <input type="text" name='fullname' placeholder='Enter here...' /> 
                        </div>

                    </div>

                    <div className="inputZone"> 
                        <label htmlFor="email">Email Address</label>
                        <input type="text" name='email' placeholder='Enter here...' /> 
                    </div>

                    <div className="inputZone"> 
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" name='phone' placeholder='Enter here...' /> 
                    </div>

                    <div className="inputZone"> 
                        <label htmlFor="message">Message</label>
                        <textarea cols="30" rows="10" placeholder='Enter here...'></textarea>
                    </div>

                    <div className="submitButton">Send Message</div>

                </form>

            </div>

        </Container>

    </div>

  )

}
