import React, { useEffect, useState } from 'react';
import './dashboard.scss'
import { getApplication } from '../../api/firebase/getApplication';
import SethAnimation from '../../components/lottie/seth-animation'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LasricLogo from '../../assets/svg/lasric_logo.svg'
import lasricicon from '../../assets/svg/send.svg'
import banner from '../../assets/svg/banner.svg'
import { signOut, getAuth } from 'firebase/auth';

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../api/firebase/config';
import { editCallup } from '../../api/firebase/admin/cms';

const ApplicationsDash = ({currentUser}) => {

    let navigate = useNavigate()

   const [user, setUser] = useState({});
   const [app, setApp] = useState([]);
   const [submitted, setSubmitted] = useState(0)
   const [showModal, setShowModal] = useState(true);

   const auth = getAuth();

   const bannerB = () => {

        setShowModal(false);

        var chk = document.getElementById('cheq');

        if(chk.checked){
            shutBanners()
        }

   }

   const shutBanners = () =>{

       localStorage.setItem("banner", true)

   }


   useEffect( async () => {
    
    if (localStorage.getItem("banner")) {
        setShowModal(false)
    } else{
        setShowModal(true)
    }

    setUser(currentUser)

    setApp(currentUser.applications.cohort4);

    const citiesRef = collection(db, "applications_data", "cohort5", "applications")
    const q = query(citiesRef, where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(q)

    var arr = []

    querySnapshot.forEach((doc) => {

       arr.push(doc.data());

    });

    setSubmitted(arr.length)
    console.log(arr)

}, [user]);


   
    var deadineDtae = new Date("Mar 31, 2022 23:59:59").getTime();
    var now = new Date().getTime();
    var distance = deadineDtae - now;
    var remainingDays = Math.floor(distance / (1000 * 60 * 60 * 24));


    const authOut = async () => {

        console.log('Signing Out...')
        await signOut(auth).then(() => navigate('/login') )

    }


    
    return (

        <div className="dashboard">


            <div className="desknotice">

            Hey, kindly use a desktop device or screen to access this page

            <div className="goHome"> <Link to="/">Back to Main Site</Link> </div>

            </div>


            {/* <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium aliquid, sit ratione minima voluptatibus quos blanditiis nisi architecto perspiciatis iste!</h1> */}
            

            <div className="menuAreaBar">


                <Link to = '/dashboard' className='dashboard_link '> <i className="fi fi-rr-home"></i> Dashboard  </Link>

                <Link to = '/people' className='dashboard_link'> <i className="fi fi-rr-user"></i> Council Members  </Link>

                <Link to = '/about' className='dashboard_link'> <i className="fi fi-rr-e-learning"></i> About Lasric  </Link>

                <Link to = '/apply' className='dashboard_link'> <i className="fi fi-rr-flag"></i> Callups  </Link>

                <Link to = '/gallery' className='dashboard_link'> <i className="fi fi-rr-picture"></i> Gallery  </Link>


                <div className="account-pindrop">

                    <div className="holder-acc">

                        <div className="hold-1"></div>
                        <div className="hold-2"> { currentUser.firstname.split('')[0] }{ currentUser.lastname.split('')[0] }  </div>

                    </div>

                    <p>{currentUser.firstname || ''} {currentUser.lastname || ''}</p>

                </div>


            </div>
                    
            <div className="main-content-dashboard">
               

                <div className="header-dashboard">
                
                    <div className="lasricLogo">
                        <img src={LasricLogo} alt="logo" />
                    </div>

                    <div className="account-place">

                    <div className="main-site">
                            <Link to = '/' className='dashboard_link'> <i className="fi fi-rr-computer"></i> Main Site  </Link>
                        </div>

                        <div className="account_arr">Dashboard</div>
                        <div className="line-arr"></div>
                        <div className="applyNow" onClick={ () => authOut() } > Sign Out </div>

                    </div>
                
                </div>  

                <div className="homeBar">

                    <div className="topBar">

                        <h1>Hello {currentUser.firstname || ''}</h1>
                        <p>Welcome Back!</p>

                    </div>

                    <div className="applicationsData">

                            <div className="apps">

                                {
                                    
                                    submitted.length ? currentUser.applications.cohort4.map(data => (


                                        <div className="application_card_play">

                                                <div className="applications-play">
                                                    
                                                    <div className="title"> 
                                                    
                                                    LASRIC Y2022 Cohort 4 {data.track.toUpperCase()} CALL-OUT
                                                    </div>

                                                    <div className="statusApp">
                                                        
                                                        {`${data.submitted ? 'Status : Submitted' : "Status : Pending"}`}
                                                        
                                                    </div>

                                                    <div className="viewBtn">
                                                    <Link to = {`/application/${data.track}/${data.callUID}/personal`}  className="button viewapp">View <i className="fi fi-rr-arrow-right"></i></Link>
                                                    </div>
                                                </div>

                                            </div>


                                    )) : <div className="empty">
                                        <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '500px', height: '500px'}} speed={"1"} />
                                    </div>

                                }

                        </div>

                    </div>

                </div>

            </div>   
                
        </div>

    );
}

export default ApplicationsDash;
