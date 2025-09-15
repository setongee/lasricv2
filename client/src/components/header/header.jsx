import React, {useState, useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";

//styles import
import './header.scss'

//lasric logo
import LasricLogo from '../../assets/svg/logo__lasric.svg'
import { ArrowUpRight, MenuScale, NavArrowDown } from 'iconoir-react';
import Container from '../container/container';
import { getCurrentCohortNumber } from '../../api/firebase/admin/admin_applications';



const Header = ({user, cohort}) => {

    const  routes = {
        
        //pages
        home : '/',
        about : '/about',
        people : '/people',
        beneficiaries : '/beneficiaries',
        gallery : '/gallery',
        portfolio : '/portfolio',
        blog : '/blog',
        help : '/support/help',
        resources : '/support/resources',
        contact : '/contact',

        //auth
        registers : '/register',
        login : '/login',
        dashboard : '/dashboard',
        events : '/events',

        //Council Member
        council : {

            login : '/login',
            dashboard : '/dashboard',

        }

    }

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)
    const [showDrop, setShowDrop] = useState(false);

    const {pathname} = useLocation();

    useEffect(() => {
        setIsBurgerOpen(false)
    }, [pathname]);

    useEffect(() => {
        
        if ( isBurgerOpen ) {
            document.body.style.overflow = "hidden"
        } else{
            document.body.style.overflow = "visible"
            setShowDrop(false)
        }
       
    }, [isBurgerOpen]);


return (

    <div className = {`reg client_${pathname.split('/')[1]}`} >

        {/* // Mobile support */}
    
        <div className="header desktop">

            <Container>

                <div className="header__items">

                    <Link to = {routes.home} className="logo"> 
                
                        <img src={LasricLogo} alt="lasric logo" />
                    
                    </Link>

                    <div className="menulist">

                        <Link to={routes.home}>Home</Link>
                        <Link to={routes.about}> About </Link>
                        <Link to={routes.portfolio}>Portfolio</Link>
                        <Link to={routes.people}>Our People</Link>
                        <Link to={routes.blog}>Blog</Link>
                        <a className='drivecut'> 
                            Support <div className="dropdown--arrow"><NavArrowDown/></div>  
                            
                            <div className="dropingMenu">
                                <Link to = {routes.help}> How to Apply </Link>
                                <Link to = {routes.resources}> Resources </Link>
                            </div>
                        </a>
                        <Link to={routes.contact}> Contact </Link>

                    </div>

                    <div className="auth-area">

                        <Link to="/apply" className="act-btn" >Apply for <strong> C{cohort}. </strong> </Link>

                        <div className="line-div"></div>

                        {
                            user?.uid && user?.uid !== undefined ? <div className="account">

                                <Link to={`${user.type === 'user' ? '/dashboard' : user.type === 'council' ? '/council' : '/admin/overview'}`}> Dashboard </Link>

                            </div> : 
                            <div className="account">

                                <Link to="/login"> Sign In </Link>

                            </div>

                        }

                    </div>
                    
                </div>

            </Container>

        </div>

            <div className="header mobile">

                <Container>

                    <div className="headerSection">

                        <div className="logo"> 
                        
                            <img src={LasricLogo} alt="lasric logo" />
                        
                        </div>

                        <div className="menuicon" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>

                            <MenuScale strokeWidth={2} />
                            
                        </div>

                        {
                            isBurgerOpen ? (

                                <div className="menu">

                                    <Container>

                                        <div className="menulist">

                                            <Link to={routes.home}>Home</Link>
                                            <Link to={routes.about}>About</Link>
                                            <Link to={routes.portfolio}>Portfolio</Link>
                                            <Link to={routes.people}>Our People</Link>
                                            <Link to={routes.blog}> Blog </Link>
                                            <a> 
                                                
                                                <div className="batch1" onClick={() => setShowDrop(!showDrop)}>
                                                    Support 
                                                    <div className="icon"> <NavArrowDown strokeWidth={2}/> </div>
                                                </div>

                                                {
                                                    showDrop 
                                                    
                                                    ? 

                                                    <div className="batch2">

                                                        <Link to = {routes.help} > How to Apply </Link>

                                                        <Link to = {routes.resources} > Resources </Link>

                                                    </div> 
                                                    
                                                    : 
                                                    
                                                    null
                                                }

                                            </a>
                                            <Link to={routes.contact}> Contact </Link>

                                        </div>

                                        <div className="auth-area">

                                            <Link to="/apply" className="act-btn" >Apply for <strong> C{cohort}. </strong> </Link>

                                            <div className="line-div"></div>

                                            {
                                                user.uid && user.uid !== undefined ? <div className="account">

                                                    <Link to={`${user.type === 'user' ? '/dashboard' : user.type === 'council' ? '/council' : '/admin/overview'}`}> Dashboard </Link>

                                                </div> : 
                                                <div className="account">

                                                    <Link to="/login"> Sign In </Link>

                                                </div>

                                            }

                                        </div>

                                    </Container>

                                </div>

                            ) : null
                        }

                    </div>

                </Container>

            </div>
            
        </div>

    );
}

export default Header;
