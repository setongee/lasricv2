import React, {useState, useEffect} from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';

const Preferences = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = location.pathname.split('/')[3]

    useEffect(() => {

        switch (params) {
        
            case 'profile':
    
                var act = document.querySelector('.filters .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.profile').classList.add('active')
    
                } else {
    
                    document.querySelector('.profile').classList.add('active')
    
                }
                
                break;
            
            case 'cohort':
    
                var act = document.querySelector('.filters .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.cohort').classList.add('active')
    
                } else {
    
                    document.querySelector('.cohort').classList.add('active')
                    
                }
                
                break;
    
            case 'team':
    
                var act = document.querySelector('.filters .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.team').classList.add('active')
    
                } else {
    
                    document.querySelector('.team').classList.add('active')
                    
                }
                
                break;
        
            default:
                break;
        }
    }, [params]);

    return (

        <div className = "overviewAdmin applicationsPage" >
            
            <div className="tableInfo">

                <div className="filters">

                    <li className="profile active" onClick = { () => navigate('/admin/preferences/profile')} >Profile</li>
                    <li className='cohort' onClick = { () => navigate('/admin/preferences/cohort') } >Cohort & Gradings</li>
                    <li className='team'>Team</li>

                </div>

            </div>

            <div className="preferences" style={{ width : '100%'}}>

                <Outlet/>

            </div>

        </div>

    );
}

export default Preferences;



    

