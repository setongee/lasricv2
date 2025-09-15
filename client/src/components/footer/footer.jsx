import React from 'react';
import './footer.scss'
import { Link, useLocation } from 'react-router-dom';

import LasricLogo from '../../assets/svg/logo__lasric.svg'
import Container from '../container/container';import FaqSection from '../faq/FaqSection';
import GetStartedSection from '../started/GetStartedSection';
import BlogSection from '../blog/BlogSection';
import NewsletterSection from '../newsletter/NewsletterSection';


const Footer = () => {

    const {pathname} = useLocation();
    let dir = pathname.split('/')[1];

    return (

        <div className={`footer__prime client_${pathname.split('/')[1]}`}>

            {
                dir !== 'contact' ?

                (
                    <>

                        <FaqSection/>
                        <GetStartedSection/>
                        <BlogSection/>
                        <NewsletterSection/>
                    
                    </>

                ) : null

            }

            <Container>

                <div className='footer'>

                    <div className="top__footer border__below">

                        <div className="links-footer">

                            <Link to = '/about'> About Us </Link>
                            <Link to = '/portfolio'> Portfolio </Link>
                            <Link to='/blog'> Blog </Link>
                            <Link to = '/support/help'> How to Apply </Link>
                            <Link to = '/register' className='active__footer' > Register </Link>

                        </div>

                        <div className="links-footer social">

                            <a target='_blank' href = 'https://www.linkedin.com/in/lasric-lagos-7558221a4/?originalSubdomain=ng'> <i className="fi fi-brands-linkedin"></i> </a>
                            <a href='https://web.facebook.com/p/Lasric-Lagos-100088673120709/?_rdc=1&_rdr#' target='_blank' > <i className="fi fi-brands-facebook"></i> </a>
                            <a href='https://x.com/lasriclagos?lang=en' target='_blank' > <i className="fi fi-brands-twitter-alt-circle"></i> </a>
                            <a href='https://www.instagram.com/lasriclagos/?hl=en' target='_blank' > <i className="fi fi-brands-instagram"></i> </a>

                        </div>

                    </div>

                    <div className="top__footer bottom__padding bottom__fix">

                        <p>© 2025 Powered by <strong>MIST</strong> </p>

                        <a href = '/' className="logo-foot"> <img src={LasricLogo} alt="lasric-logo" /></a>

                        <div className="links-footer">

                            <Link to = '/login'> <strong>Login</strong> </Link>
                            <Link to = '/contact'> Contact Us </Link>

                        </div>

                    </div>
                    
                </div>

            </Container>

        </div>

    );
}

export default Footer;
