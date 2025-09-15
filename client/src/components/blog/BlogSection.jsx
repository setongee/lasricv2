import React from 'react'
import Container from '../container/container'
import SectionHeading from '../layout/SectionHeading'
import Blog from './Blog'

export default function BlogSection() {
    
  return (

    <div className="lasric__section mint">

        <Container>
        
            <SectionHeading title = "Our Blog : Discover Trends, Expert Tips, and Strategies for Growth" subtitle = "" subtag = "Stay up to date" style = "flow" showNavArrows = {true} target = "blog" />
        
            <Blog/>
            
        </Container>


    </div>
  )
}
