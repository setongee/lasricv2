import React, {useState, useEffect} from 'react';
import { getAllUsers } from '../api/firebase/admin/admin_applications';
import './styles/AdminStyles.scss'
import Avatar from '../assets/svg/adminAvatar.png'
import HeaderAdmin from './header-admin';
import { Outlet, useLocation, useNavigate  } from 'react-router-dom';


const Admin = ({user}) => {
    
    const [userDetails, setUserDetails] = useState({

        firstname : "",
        lastname : ""

    })
    const pageDetect = useLocation().pathname
    const paramValue = pageDetect.split("/")[2];

    useEffect(() => {
        
        setUserDetails(user);
        
    }, []);


    const [active, setActive] = useState("");


    useEffect(() => {

        setActive(paramValue);
        
    }, [paramValue]);


    switch (active) {
        
        case 'overview':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.overview').classList.add('active')

            } else {

                document.querySelector('.overview').classList.add('active')

            }
            
            break;
        
        case 'applications':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.applications').classList.add('active')

            } else {

                document.querySelector('.applications').classList.add('active')
                
            }
            
            break;


        case 'awardees':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.awardees').classList.add('active')

            } else {

                document.querySelector('.awardees').classList.add('active')
                
            }
            
        break;

        case 'council':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.council').classList.add('active')

            } else {

                document.querySelector('.council').classList.add('active')
                
            }
            
            break;

            case 'content':

                var act = document.querySelector('.active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.content').classList.add('active')
    
                } else {
    
                    document.querySelector('.content').classList.add('active')
                    
                }
                
                break;

            case 'messages':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.messages').classList.add('active')

            } else {

                document.querySelector('.messages').classList.add('active')
                
            }
            
            break;

            case 'preferences':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.preferences').classList.add('active')

            } else {

                document.querySelector('.preferences').classList.add('active')
                
            }
            
            break;
    
        default:
            break;
    }


    const Navigate = useNavigate();

    const openBody = () => {

        const body = document.body
        body.style.overflow = 'visible'

    }


    return (
        
        <div className="adminComponents">

            <HeaderAdmin user = {userDetails} />

            <div className="sideMenuBar">

                <div className="management">

                    <div className="titleMan">
                        <h4>Master Admin</h4>
                        <p> {userDetails.firstname} {userDetails.lastname} </p>
                    </div>

                    <div className="imageMan">
                        <img src={Avatar} alt="" />
                    </div>

                </div>

                <div className="menuItem overview" onClick={() => { Navigate('/admin/overview'); openBody() }} >
                    <div className="icon"><i className="fi fi-rr-home"></i></div>
                    <div className="menuName">Overview</div>
                </div>

                <div className="menuItem applications"  onClick={() => { Navigate('/admin/applications'); openBody() } } >
                    <div className="icon"><i className="fi fi-rr-document-signed"></i></div>
                    <div className="menuName">Applications</div>
                </div>

                <div className="menuItem awardees"  onClick={() => { Navigate('/admin/awardees'); openBody() } } >
                    <div className="icon"><i className="fi fi-rr-gift"></i></div>
                    <div className="menuName">Awardees</div>
                </div>

                <div className="menuItem council"  onClick={() => { Navigate('/admin/council') } } >
                    <div className="icon"> <i className="fi fi-rr-user"></i> </div>
                    <div className="menuName"> Council </div>
                </div>

                <div className="menuItem content"  onClick={() => { Navigate('/admin/content'); openBody() } } >
                    <div className="icon"><i className="fi fi-rr-browser"></i></div>
                    <div className="menuName">Content</div>
                </div>

                <div className="menuItem messages"  onClick={() => { Navigate('/admin/messages'); openBody() } } >
                    <div className="icon"> <i className="fi fi-rr-envelope-plus"></i> </div>
                    <div className="menuName"> Messages</div>
                </div>

                <div className="menuItem preferences"  onClick={() => { Navigate('/admin/preferences/profile'); openBody() } } >
                    <div className="icon"> <i className="fi fi-rr-shuffle"></i> </div>
                    <div className="menuName"> Preferences </div>
                </div>

            </div>

            <div className="pagesComponent">

                <Outlet/>
                
            </div>

        </div>

    );
}

export default Admin;
