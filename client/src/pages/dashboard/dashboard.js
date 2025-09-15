import React, { useEffect, useState } from 'react';
import './dashboard.scss'
import { getApplication } from '../../api/firebase/getApplication';
import SethAnimation from '../../components/lottie/seth-animation'
import { Link, Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import LasricLogo from '../../assets/svg/logo__lasric.svg'
import lasricicon from '../../assets/svg/send.svg'
import banner from '../../assets/svg/banner.svg'
import none from '../../assets/svg/none.png'

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../api/firebase/config';

import styled from 'styled-components'
import {keyframes} from 'styled-components'
import { getAwardeeBank } from '../../api/firebase/admin/admin_applications';
import Container from '../../components/container/container';
import { Check, CheckCircle } from 'iconoir-react';
import { SignOutClient } from '../../middleware/authToken';

const Dashboard = ({currentUser}) => {

    let navigate = useNavigate()

   const [user, setUser] = useState({});
   const [app, setApp] = useState([]);
   const [submitted, setSubmitted] = useState(0)
   const [showModal, setShowModal] = useState(true);
   console.log(currentUser);

   const [valid, setValid] = useState([]);

   const [burgerM, setBurgerM] = useState(false);

   const [statistics, setStatistics] = useState({
    apps : [],
    pending : [],
    submitted : [],
    accepted : 0,
    rejected : 0
   })

   const [ME, setME] = useState([]);

   const bannerB = () => {

        setShowModal(false);

        var chk = document.getElementById('cheq');

        if(chk.checked){
            shutBanners()
        }

   }

   const shutBanners = () =>{

       localStorage.setItem("banner", true);

   }


//    useEffect( async () => {
    
//     if (localStorage.getItem("banner")) {
//         setShowModal(false)
//     } else{
//         setShowModal(true)
//     }

//     setUser(currentUser)

//     const citiesRef = collection(db, "applications_data", "cohort4", "applications")
//     const q = query(citiesRef, where("userid", "==", currentUser.uid));
//     const querySnapshot = await getDocs(q)

//     var apps = [];

//     querySnapshot.forEach((doc) => {

//         apps.push(doc.data())
//         console.log(doc);

//     });

//     appsStatistics(apps);

//     getAwardeeBank(currentUser.uid)
//     .then(res => {
//         setValid(res);
//     });


// }, []);


    const appsStatistics = async (data) => {

        const dataFeed = {

            apps : data,
            pending : [],
            submitted : [],
            accepted : 0,
            rejected : 0

           }
        
        const submitted = data.filter(e => {
            return e.submitted === true
        })

        dataFeed.submitted = submitted

        const pending = data.filter(e => {
            return e.submitted !== true
        })

        dataFeed.pending = pending

        const pendingKeyTotal = pending.filter(e => {
            return e.data
        })

        await setStatistics(dataFeed);

    }

    const progressbar = keyframes`
    from {
        width : 0%;
    }

    to {
        width : ${props => props.width}
    }`;


    const Progress = styled.div`
    animation: ${progressbar} 2s cubic-bezier(0.65, 0.05, 0.36, 1);
    width : ${props => props.width};
    height: 6px;
    background-color: ${props => props.background};
    border-radius: 100px;
    margin-bottom: 15px;
    position: absolute;
    transition: all .4s ease-in-out;`

    const stringSplitter = (string, splitnode) =>{

        const value = string.split(splitnode);
        return value;

    }

    const verifyLinkedin = () => navigate('/dashboard/verify')

    
    return (
        

        <div className="dashboard">

            <Container>

                <div className="desknotice">

                    Hey, kindly use a desktop device or screen to access this page

                    <div className="goHome"> 
                        <Link to="/">Back to Main Site</Link> 
                    </div>

                </div>

                {
                    burgerM ? <div className="cheng">

                    <Link to = '/dashboard' className='dashboard_link active-li'> <i className="fi fi-rr-home"></i> Dashboard  </Link>

                    <Link to = '/people' className='dashboard_link'> <i className="fi fi-rr-user"></i> Council Members  </Link>

                    <Link to = '/about' className='dashboard_link'> <i className="fi fi-rr-e-learning"></i> About Lasric  </Link>

                    <Link to = '/apply' className='dashboard_link'> <i className="fi fi-rr-flag"></i> Callups  </Link>

                    <Link to = '/gallery' className='dashboard_link'> <i className="fi fi-rr-picture"></i> Gallery  </Link>


                    <div className="account-pindrop">

                        <div className="holder-acc">

                            <div className="hold-1"></div>
                            <div className="hold-2"> { currentUser?.firstname?.split('')[0] }{ currentUser?.lastname?.split('')[0] }  </div>

                        </div>

                        <p>{currentUser.firstname || ''} {currentUser.lastname || ''}</p>

                    </div>


                </div> : null
                }
                        
                <div className="main-content-dashboard">
                

                    <div className="header-dashboard">
                    
                        <div className="lasricLogo">
                            <div className="las_logo"><img src={LasricLogo} alt="logo" /></div>
                        </div>

                        <div className="account-place">


                            <div className="main-site">
                                <Link to = '/' className='dashboard_link'> <i className="fi fi-rr-computer"></i> Main Site  </Link>
                            </div>
                            
                            <div className="account_arr">Dashboard</div>
                            <div className="line-arr"></div>
                            <div className="applyNow" onClick={ () => SignOutClient() } > Sign Out </div>

                        </div>

                        
                    
                    </div>  

                    <div className="homeBar">

                        <div className="topBar">


                            <p>Welcome Back!</p>

                            <div className="profileJoint">
                                <h1>Hello {currentUser?.firstname || ''} {currentUser?.lastname || ''}</h1> 
                                
                                <div className="profile_details">
                                    {
                                        currentUser?.verified ? <div className="verifiedAccount"> <CheckCircle fontSize={12}/> Verified</div> : (<div className="linkedin" onClick={verifyLinkedin}>Verify Linkedin</div>)
                                    }
                                    <div className="displayPhoto">
                                        {
                                            currentUser?.photo ?
                                            <img src={currentUser?.photo} alt="" />
                                            : <p>{currentUser?.firstname?.split('')[0]}{currentUser?.lastname?.split('')[0]}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                        {
                            valid.length ? 

                            <div className="submitME">

                                <div className="infoMen">

                                    <h1>Monitoring and Evaluation Form!</h1>
                                    <p>Hey, kickstart or update your M&E form so that LASRIC can recieve your input!</p>

                                </div>

                                {/* {
                                    !valid[0].data.status ? <div className="openForm" onClick={() => navigate(`/m&e/${currentUser.uid}`) } >  Start your M&E form </div> : <div className="openForm" onClick={() => navigate(`/m&e/${currentUser.uid}`) } >  View your M&E form </div>
                                } */}

    {
                                    <div className="openForm" onClick={() => navigate(`/m&e/${currentUser.uid}`) } >  Start your M&E form </div>
                                }

                                

                            </div> 
                            
                            : null
                        }

                        <div className="statBar">

                            <div className="status">

                                <div className="star-head"> Applications</div>
                                <div className="line_star"></div>
                                <div className="value-star"> {statistics.apps.length} </div>

                            </div>

                            <div className="status">

                                <div className="star-head"> Pending</div>
                                <div className="line_star"></div>
                                <div className="value-star"> {statistics.pending.length} </div>

                            </div>

                            <div className="status">

                                <div className="star-head"> Submitted</div>
                                <div className="line_star"></div>
                                <div className="value-star">  {statistics.submitted.length} </div>

                            </div>

                            <div className="status">

                                <div className="star-head"> Accepted </div>
                                <div className="line_star"></div>
                                <div className="value-star">0</div>

                            </div>

                            <div className="status">

                                <div className="star-head"> Rejected </div>
                                <div className="line_star"></div>
                                <div className="value-star">0</div>

                            </div>

                        </div>

                        {/* lower statistics area */}

                        <div className="lower_stat">

                            <div className="application_section">

                                <div className="pending_applicatons">

                                    <div className="title_name"> <div className="date_icon"><i className="fi fi-rr-file-invoice"> </i></div> Pending Applications ({statistics.pending.length})</div>
                                
                                    {
                                        statistics.pending.length ? statistics.pending.map( (data, index) => {

                                            return (<div className="application" key={index}>

                                                <div className="progress"> 

                                                    <Progress width = {`${data.progress}%`} background = "#6c43d5"></Progress>
                                                
                                                </div>

                                                <div className="keyStat">

                                                    <div className="title"> LASRIC {data.track.toUpperCase()} APPLICATION ({data.progress}%)</div>
                                                    <div onClick={() => navigate(`/application/cohort5/${data.track}/${stringSplitter(data.uid, "_")[1]}/personal`)} className="viewIcon"> <i className="fi fi-sr-eye"></i> </div>

                                                </div>
                                                {/* <div className="app_action"> View </div> */}

                                            </div>)
                                            
                                        } ) : (
                                        
                                            <div className="null_effect">

                                                <SethAnimation jsonSrc={"https://assets1.lottiefiles.com/private_files/lf30_cgfdhxgx.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"1"} />

                                                You have no pending applications here

                                            </div>
                                        
                                        )
                                    }

                                </div>

                                <div className="pending_applicatons">

                                    <div className="title_name"> <div className="date_icon"><i className="fi fi-rr-file-invoice"> </i></div> Submitted Applications ({statistics.submitted.length})</div>
                                
                                    {
                                        statistics.submitted.length ? statistics.submitted.map( (data, index) => {

                                            return (<div className="application" key={index}>

                                                <div className="progress submitted"> 

                                                    <Progress width = {`${data.progress}%`} background = "#6c43d5"></Progress>
                                                
                                                </div>

                                                <div className="keyStat">

                                                    <div className="title"> LASRIC {data.track.toUpperCase()} APPLICATION ({data.progress}%)</div>
                                                    <div onClick={() => navigate(`/application/cohort5/${data.track}/${stringSplitter(data.uid, "_")[1]}/personal`)} className="viewIcon"> <i className="fi fi-sr-eye"></i> </div>

                                                </div>
                                                {/* <div className="app_action"> View </div> */}

                                            </div>)
                                            
                                        } ) : (
                                        
                                            <div className="null_effect">

                                                <SethAnimation jsonSrc={"https://assets1.lottiefiles.com/private_files/lf30_cgfdhxgx.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"1"} />

                                                You have no submitted applications here

                                            </div>
                                        
                                        )
                                    }

                                </div>
                            

                            </div>

                            <div className="events">

                                <div className="title_name"> <div className="date_icon"><i className="fi fi-rr-calendar"> </i></div> Upcoming Events</div>

                                {/* <div className="event">

                                    <div className="event_date">
                                        <div className="day">29</div>
                                        <div className="month">JUNE</div>
                                    </div>

                                    <div className="event_title"> Raising startup funds for your innovative ideas </div>

                                    <div className="event_action"> View Event </div>
                                    
                                </div> */}

                                <div className="empty_data">

                                    <div className="content_empty">
                                        <img src={none} alt="no event yet" />
                                    </div>

                                    <h4>There are no upcoming events yet</h4>

                                </div>

                            </div>

                            

                        </div>


                    </div>


                
                
                </div>  


            </Container> 

            <Outlet/>
                
        </div>

    );
}

export default Dashboard;
