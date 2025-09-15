import React,{useState, useEffect} from 'react';
import SethAnimation from '../../components/lottie/seth-animation';
import awardee from '../../assets/svg/awardee.jpg'
import play from '../../assets/svg/play.svg'
import './styles.scss'
import partner1 from '../../assets/svg/1.png'
import partner2 from '../../assets/svg/2.png'
import partner3 from '../../assets/svg/3.png'
import partner4 from '../../assets/svg/4.png'
import partner5 from '../../assets/svg/5.png'
import flame from '../../assets/svg/flame.svg'
import web from '../../assets/svg/globe.svg'
import suitcase from '../../assets/svg/briefcase.svg'
import taxi from '../../assets/svg/taxi.svg'
import doctor from '../../assets/svg/doctor.svg'
import music from '../../assets/svg/music.svg'
import secure from '../../assets/svg/secure.svg'
import gradCap from '../../assets/svg/gradCap.svg'
import chart from '../../assets/svg/chart.svg'
import webinar from '../../assets/svg/lasric-live.jpeg'
import { getCMSData } from '../../api/firebase/admin/cms';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

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


const Landing = () => {

    let navigate = useNavigate();

    // const [email, setEmail] = useState("");

    // const [techStartUp, setTechStartUp] = useState({

    //     image : "https://bit.ly/3n7lmfR",
    //     company : "",
    //     web : "",
    //     content : "",
    //     sector : ""

    // });

    // const [editorState, setEditorState] = useState("");

    // useEffect(() => {

    //     if (techStartUp.content === "") {

    //         setEditorState(EditorState.createEmpty())

    //     } else {

    //         setEditorState(EditorState.createWithContent(convertFromRaw(techStartUp.content) ))
    //     }

    // }, [techStartUp]);

    // const injectContent = () => {

    //     const raw = convertToRaw( editorState.getCurrentContent() )
    //     const may = draftToHtml(raw)
    //     const result = document.getElementById('result');
    //     result.innerHTML = may  

    // }

    // if (techStartUp.content !== "") {
    //     injectContent()
    // }


    // //set onChange event for landing email registration

    // const handleChange = (e) => {
    //     setEmail(e.target.value)
    // }

    // //setup when the email from homepage is corrected

    // const handleEmailOnlyRegister = async e => {

    //     e.preventDefault();

    //     if ( email !== "" ) {
            
    //         await localStorage.setItem('emailOnly', email);

    //     }

    //     await navigate('/register');

    // }


    // useEffect(() => {

    //     async function fetchData() {

    //       const response = await getCMSData("landing");

    //       setTechStartUp(response)

    //     }

    //     fetchData();

    //   }, []); // 


    return (


        <div className="landing">

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

            <section className='brand__section'>

                <Container>

                    <SectionHeading title = "Shaping the Future of Lagos: Empowering Transformative Ideas for Lasting Impact" subtitle = "Building a resilient Lagos by empowering innovative startups with support, connections, and investment for sustainable growth." subtag = "What we offer" />

                   <div className="offers">

                        <Offers photo = {venture} title = "Venture Capital Funding" subtitle = "Empowering Lagos State startups and entrepreneurs with strategic venture capital funding to drive innovation, create jobs, and boost economic growth." />
                        
                        <Offers photo = {evaluation} title = "Investment Potential Evaluation" subtitle = "Providing a source of funding for companies or startups that have a high growth and social impact potential. LASRIC will invest in a no-equity interest." />

                        <Offers photo = {business} title = "Business Development and Strategy" subtitle = "Accelerating Lagos State's growth by fostering innovative business strategies, empowering entrepreneurs, and driving sustainable development through strategic initiatives." />
                        
                        <Offers photo = {network} title = "Network of Contacts and Connections" subtitle = "Fostering collaboration and innovation by connecting entrepreneurs, startups, and investors across Lagos State to accelerate growth and opportunities." />

                   </div>

                </Container>

            </section>

            <div className="portfolio__summary">

                <Container>

                    <Portfolio__summary/>

                    <Link to = '/'> View More Beneficiaries  </Link>

                </Container>

            </div>

            {/* <div className="featuredTech">

                <div className="title">Featured Tech {<br></br>} Startup of the month</div>
                
                <div className="photo"> <img src={techStartUp.image} alt="lasric featured tech startup" /> </div>

                <div className="info-actions">

                    <div className="info">
                        <div className="heading"> <div className="icon-A"> <img src={suitcase} alt="icon packs" /> </div> Company</div>
                        <div className="comapany_name">{techStartUp.company}</div>
                    </div>

                    <div className="line-space"></div>

                    <div className="info">
                        <div className="heading"> <div className="icon-A"> <img src={flame} alt="icon packs" /> </div> Sector</div>
                        <div className="comapany_name">{techStartUp.sector}</div>
                    </div>

                    <div className="line-space"></div>

                    <div className="info">
                        <div className="heading"> <div className="icon-A"> <img src={web} alt="icon packs" /> </div> Website</div>
                        <div className="comapany_name"> <a href={techStartUp.web} target="_blank" >{techStartUp.web}</a> </div>
                    </div>
                    

                </div>

                <div className="body-text" id='result'></div>

            </div>

            <div className="applyA">
                <h1>Apply today in a few simple steps</h1>
                <a href='/apply' className="applybtn" style={{color: 'white'}} >Apply Now</a>
            </div>

            <div className="themes">

                <h1> The Lagos State Cardinal {<br></br>} Focus Point. </h1>
                
                <div className="cardArea">

                    <div className="theme-card t">

                        <div className="abbrv"> T </div>
                        <div className="iconify"> <img src={taxi} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin">Traffic Management {<br></br>} and Transportation</div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> H </div>
                        <div className="iconify"> <img src={doctor} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin">Health and {<br></br>} Environment</div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> E </div>
                        <div className="iconify"> <img src={gradCap} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin">Education and {<br></br>} Technology </div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> M </div>
                        <div className="iconify"> <img src={chart} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin"> Making Lagos a {<br></br>} 21st Century Economy </div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> E </div>
                        <div className="iconify"> <img src={music} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin"> Entertainment {<br></br>} and Tourism </div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> S </div>
                        <div className="iconify"> <img src={secure} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin"> Security and {<br></br>} Governance </div>

                    </div>

                </div>

            </div> */}

        </div>


    );
}

export default Landing;
