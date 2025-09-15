import React from 'react';
import SethAnimation from '../../components/lottie/seth-animation';
import './about.scss'
import Container from '../../components/container/container';
import vision from '../../assets/about/visionLasric.png';
import mission from '../../assets/about/missionLasric.png';
import SectionHeading from '../../components/layout/SectionHeading';
import People from '../../components/people/People';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'iconoir-react';

// areas
import agriculture from '../../assets/areas/agriculture.png'
import tourism from '../../assets/areas/tourism.png'
import environment from '../../assets/areas/environment.png'
import health from '../../assets/areas/health.png'
import education from '../../assets/areas/education.png'
import security from '../../assets/areas/security.png'
import finance from '../../assets/areas/finance.png'
import transportation from '../../assets/areas/transportation.png'
import energy from '../../assets/areas/energy.png'

const areasData = [
    
    {
        heading : 'Agriculture',
        img : agriculture,
        p : 'Food Security, Water conservation, Traditional Botanical and Medicinal knowledge. '
    },

    {
        heading : 'Tourism',
        img : tourism,
        p : 'Media and Creative industry, Hospitality and Tourism, Sports, Entertainment, Transportation '
    },

    {
        heading : 'Housing and Health',
        img : health,
        p : 'Housing, Energy, Land Use, Urbanization and Habitable cities, Manufacturing, Healthcare '
    },

    {
        heading : 'Environment',
        img : environment,
        p : 'Climate change, Food security, water conservation and Flood Management, Materials'
    },

    {
        heading : 'Education',
        img : education,
        p : 'Learning Solutions, Skills development, and digital transformation literacy.'
    },

    {
        heading : 'Security',
        img : security,
        p : 'Security, Information and Communication Technology, Energy'
    },

    {
        heading : 'Financial Inclusion',
        img : finance,
        p : 'Access to bank facilities, thrift societies and other Financial solutions'
    },

    {
        heading : 'Transportation',
        img : transportation,
        p : 'Access to bank facilities, thrift societies and other Financial solutions'
    },

    {
        heading : 'Energy & Power',
        img : energy,
        p : 'Access to bank facilities, thrift societies and other Financial solutions'
    }

]

const About = () => {

    return (

        <Container>

            <div className="about">

                <div className="head-area">
                    On a <span>mission</span> to empower <span>research and innovation</span> by providing <span>funding support</span> and <span>access</span> to a dynamic network of <span>resources and collaborators.</span>
                </div>

                <div className="subhead">
                    Empowering visionary entrepreneurs with the resources to transform ideas into groundbreaking businesses.
                </div>

                <div className="line-tap">
                    <div className="pint"></div>
                    <div className="pint"></div>
                </div>

                <div className="vision-mission">

                    <div className="vision">

                        <div className="photo--vm"> <img src={vision} alt="" /> </div>

                        <div className="text__point">

                            <div className="h1">Our Vision</div>
                            <div className="divider"></div>
                            <p>To make Lagos State one of the world’s knowledge hubs through the application of Science and Technology</p>

                        </div>
                        
                    </div>

                    <div className="vision">

                        <div className="photo--vm"> <img src={mission} alt="" /> </div>

                        <div className="text__point">

                            <div className="h1">Our Mission</div>
                            <div className="divider"></div>
                            <p>Creating wealth, growth and tackling societal challenges in Lagos State through the application of Science and Technology in a knowledge driven world</p>

                        </div>
                        
                    </div>

                </div>

                <div className="headInterest">

                    <SectionHeading title = "Transformative Ideas We Seek to Fund: Empowering Visionary Projects that Drive Innovation, Disrupt Industries, and Create Lasting Impact" subtitle = "" subtag = "Our Interests - Ideas we fund" style = "light extendTitle2"  />

                    <div className="areas">

                        {
                            areasData.map(data => (

                            <div className="area">
                                
                                <div className="heading"> {data.heading} </div>

                                <div className="appIcon">
                                    <img src={data.img} alt="" />
                                </div>

                                <p> {data.p} </p>

                            </div>

                                )
                            )
                        }


                    </div>

                </div>


                <People size = {8} />
                <div className="leadLink"> <Link to = "/people" > View All Our People <div className="icon"> <ArrowUpRight/> </div> </Link> </div>

            </div>

        </Container>

    );
}

export default About;
