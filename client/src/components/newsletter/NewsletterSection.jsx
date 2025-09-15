import React from 'react'
import Container from '../container/container'
import Newsletter from './newsletter'

export default function NewsletterSection() {
  return (
    <div className="subscribe">

        <div className="mint subscribeBar"></div>

        <Container>

            <div className="subscription">

                <Newsletter/>

            </div>

        </Container>

    </div>
  )
}
