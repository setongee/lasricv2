import React from 'react';
import Logo from '../assets/svg/lasric_logo.svg'

import { signOut, getAuth } from 'firebase/auth';

const HeaderAdmin = ({user}) => {

    const auth = getAuth()

    const authOut = () => {

        console.log('Signing Out...')
        signOut(auth).then(() => window.location.reload(true) )

    }

    return (

        <div className="headerAdmin">

            <div className="PageTitle">

                <div className="lasric_logo">
                    <img src={Logo} alt="lasric logo" />
                </div>

            </div>

            <div className="accountArea">

                Welcome Back,  <span className='firstname'> {user.firstname} </span>

                <div className="initialsAdmin">
                    {user.firstname.split("")[0]}
                    {user.lastname.split("")[0]}
                </div>
{/* 
                <div className="icon">
                    <i className="fi fi-rr-angle-small-down"></i>
                </div> */}

                <div className="dropdownAuth" onClick={() => authOut() } >Sign Out</div>

            </div>

        </div>

    );
}

export default HeaderAdmin;
