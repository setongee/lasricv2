import './styles.scss'
import mark from '../../assets/svg/mark.png'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link, useNavigate } from "react-router-dom";
import Marquee from '../../components/marquee/Marquee';
import SectionHeading from '../../components/layout/SectionHeading';
import Container from '../../components/container/container';
import Offers from './offers/Offers';

import evaluation from '../../assets/offer/evaluation.jpg'
import venture from '../../assets/offer/venture.jpg'
import network from '../../assets/offer/network.jpg'
import business from '../../assets/offer/business.jpg'
import Portfolio__summary from './summary/Portfolio__summary';
import { ArrowUpRight } from 'iconoir-react';
import People from './people/People';
import { useEffect, useState } from 'react';
import { getCMSCallupData } from '../../api/firebase/admin/cms';
import { useCohortNumber } from '../../stores/cohort.store';

const Landing = () => {

    const [apps, setApps] = useState([]);
    const cohort = useCohortNumber(state=>state.cohort);

    useEffect(() => {
        
        getCMSCallupData("callups", `cohort${cohort}`)
        .then(e=>setApps(e))
        
    }, []);

    return (


        <div className="landing">

            {/* hero section */}

            <div className="homearea darkMode">

                <Container>

                    <div className="hero">

                        <div className="textArea">

                            <div className="main-text">
                                Fueling dreams, unlocking potentials & funding the <span>future of Lagos</span>
                            </div>

                            <div className="sub-text">
                                Empowering visionary entrepreneurs with the resources to transform ideas into groundbreaking businesses.
                            </div>

                        </div>
                        
                    </div>

                </Container>

                <Marquee/>

            </div>

            {/* our numbersx */}

            <section className='lasric__section'>

                <Container>

                    <SectionHeading title = "Shaping the Future of Lagos: Empowering Transformative Ideas for Lasting Impact" subtitle = "Building a resilient Lagos by empowering innovative startups with support, connections, and investment for sustainable growth." subtag = "Our Numbers" style = "light" />

                    <div className="cards__group">

                        <div className="card">
                            <p>117</p>
                            <span> Total Number of  Funded Individuals </span>
                        </div>

                        <div className="card">
                            <p> N803m+ </p>
                            <span> Total amount funded so far combined </span>
                        </div>

                        <div className="card">
                            <p> N3.65m+ </p>
                            <span> Average amount  funded per company / idea </span>
                        </div>

                    </div>

                </Container>

            </section>

            {/* call for applications */}

            {/* <Container>

                <div className="appCardBody">
                    {
                        apps?.length ?
                        apps.map(({data, uid})=>{
                            return (
                                <div className="applications__card" key={uid}>
                                    <img src={data?.image} alt="" />
                                </div>
                            )
                        }) : null
                    }
                </div>

            </Container> */}

            {/* what we offer / services */}

            <section className='brand__section'>

                <Container>

                    <SectionHeading title = "Unlocking Opportunities for Startups, Innovators and Entrepreneurs Across Lagos" subtitle = "Fueling growth, innovation, and success with tailored resources, funding, and support for Lagos-based entrepreneurs." subtag = "What we offer" style = "dark" />

                   <div className="offers">

                        <Offers photo = {venture} title = "Venture Capital Funding" subtitle = "The LASRIC Venture Catalyst Project (VCP) is a strategic funding intervention between LASRIC and Impact Hub Lagos that aims to pivot away from traditional grant funding towards a catalyst approach." />
                        
                        <Offers photo = {evaluation} title = "Investment Potential Evaluation" subtitle = "Providing a source of funding for companies or startups that have a high growth and social impact potential. LASRIC will invest in a no-equity interest." />

                        <Offers photo = {business} title = "Business Development and Strategy" subtitle = "Accelerating Lagos State's growth by fostering innovative business strategies, empowering entrepreneurs, and driving sustainable development through strategic initiatives." />
                        
                        <Offers photo = {network} title = "Network of Contacts and Connections" subtitle = "Fostering collaboration and innovation by connecting entrepreneurs, startups, and investors across Lagos State to accelerate growth and opportunities." />

                   </div>

                </Container>

            </section>

            {/* Portfolio Summary */}

            <div className="portfolio__summary">

                <Container>

                    <Portfolio__summary/>

                    <Link to = '/portfolio' className='sectionLinks'> View More Beneficiaries <div className="arrow__go"><ArrowUpRight/></div> </Link>

                </Container>

            </div>


            {/* Our People */}

            <div className="people">

                <Container>
                
                    <SectionHeading title = "Work with the best specialists who have the functional experience, industry knowledge and technical expertise your project needs" subtitle = "" subtag = "Our People" style = "light extendTitle" showNavArrows = {true} link = { {status : true, url : "/people"} } target = "arrowNavScroll" />


                    {/* people 6 */}
                
                    <People/>

                </Container>
                 

            </div>

            {/* reviews */}

            <div className="lasric__section mint">

                <Container>
                
                    <SectionHeading title = "Founders Success Stories : What They Say About Us" subtitle = "" subtag = "What our founders are saying" style = "flow" showNavArrows = {true} target = "reviews" />
                
                    <div className="review__group" id = "reviews" >

                        <div className="review__card">
                            
                            <div className="quotes"><img src={mark} alt="marks" /></div>

                            <div className="comment">LASRIC funding provided crucial support, fostering innovation and growth with seamless access to resources and opportunities.</div>

                            <div className="author">

                                <div className="author__name">
                                    <p>Luther Lawoyin</p>
                                    <span>CEO, Pricepally</span>
                                </div>

                                <div className="author__photo"> LL </div>

                            </div>

                        </div>

                        <div className="review__card">
                            
                            <div className="quotes"><img src={mark} alt="marks" /></div>

                            <div className="comment">Smooth process, great support! LASRIC funding accelerated our innovation with seamless execution and transparency.</div>

                            <div className="author">

                                <div className="author__name">
                                    <p> George Kobani </p>
                                    <span>CEO, Doci Healthcare</span>
                                </div>

                                <div className="author__photo">
                                    GK
                                </div>

                            </div>

                        </div>

                        <div className="review__card">
                            
                            <div className="quotes"><img src={mark} alt="marks" /></div>

                            <div className="comment">A game-changer! LASRIC empowered our startup with essential resources for groundbreaking digital solutions.</div>

                            <div className="author">

                                <div className="author__name">
                                    <p> Micheal Osumune </p>
                                    <span>CEO, Moon Innivations</span>
                                </div>

                                <div className="author__photo">
                                    MO
                                </div>

                            </div>

                        </div>

                        <div className="review__card">
                            
                            <div className="quotes"><img src={mark} alt="marks" /></div>

                            <div className="comment">Timely funding and excellent guidance—LASRIC truly empowers businesses to innovate and scale.</div>

                            <div className="author">

                                <div className="author__name">
                                    <p>Cynthia Asije</p>
                                    <span>CEO, Adire Lounge</span>
                                </div>

                                <div className="author__photo">
                                    CA
                                </div>

                            </div>

                        </div>

                        <div className="review__card">
                            
                            <div className="quotes"><img src={mark} alt="marks" /></div>

                            <div className="comment">Excellent support from LASRIC—funding accelerated our project, driving impactful innovation and business growth.</div>

                            <div className="author">

                                <div className="author__name">
                                    <p>Kafayat Fakoya</p>
                                    <span>Lagos State University</span>
                                </div>

                                <div className="author__photo">
                                    KF
                                </div>

                            </div>

                        </div>

                    </div>

                </Container>

            </div>
            
        </div>

    );
}

export default Landing;
