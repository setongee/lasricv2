import React from 'react'
import Faq from './Faq'
import Container from '../container/container'

export default function FaqSection() {
  
    return (

        <div className="faqsSection">

            <div className="rings ring1"></div>
            
            <div className="ring__group">
                <div className="rings ring2"></div>
                <div className="rings ring3"></div>
            </div>
            
            <Container>

                <div className="section__title">Frequently Asked Questions: Get the Answers You’re Looking For</div>
                
                <Faq/>

            </Container>

        </div>
    )

}
