import React, {useState, useEffect} from 'react';
import PathDun from '../assets/svg/pathGroove.svg'
import Users from '../assets/svg/manAdmin.svg'
import Apply from '../assets/svg/smartphone.svg'
import Submitted from '../assets/svg/submit.svg'

import pending from '../assets/svg/pending.svg'
import graded from '../assets/svg/grade.svg'
import brief from '../assets/svg/briefcase (2).svg'
import Win from '../assets/svg/winner.svg'
import Puzzle from '../assets/svg/delete.svg'
import Chapter from '../assets/svg/sections.svg'

import SethAnimation from '../components/lottie/seth-animation';

import AdminShow from './adminShow';
import AdminTable from './adminTables';

import { getAllUsers, getPendingApps, getGradedApps, getApplicationsNumber, getAllUnsubmittedApps, getInterviewBucketApps, getCurrentCohortNumber, getSubmittedApps, getCouncilGradedApps  } from '../api/firebase/admin/admin_applications';

import OverAdmins from './overviewTables';

const Overview = () => {

    const initialData = {

        users : 0,
        applications : 0,
        submitted : 0,
        pending : 0,
        graded : 0,
        unsubmitted : 0,
        councilGraded : 0,
        interviewBucket : 0,
        currentCohort : 0

    }

    const [counts, setCounts] = useState(initialData)
    const [loader, setLoader] = useState(true)

    const setAllDataAPI = async () => {

        const dataCounter = {

            users : 0,
            applications : 0,
            submitted : 0,
            pending : 0,
            graded : 0,
            unsubmitted : 0,
            councilGraded : 0,
            interviewBucket : 0,
            currentCohort : 0

        }
        
        await getAllUsers().then(data => dataCounter.users = data.length )
        await getSubmittedApps("all").then(data => dataCounter.submitted = data.length )
        await getAllUnsubmittedApps().then(data => dataCounter.unsubmitted = data.length )
        await getApplicationsNumber().then(data => dataCounter.applications = data.length )
        await getInterviewBucketApps("all").then(data => dataCounter.interviewBucket = data.length )
        await getPendingApps("all").then(data => dataCounter.pending = data.length )
        await getGradedApps("all").then(data => dataCounter.graded = data.length )
        await getCurrentCohortNumber().then(data => dataCounter.currentCohort = Number(data[0].present))
        await getCouncilGradedApps().then(data => {
            if(data.length){
                dataCounter.councilGraded = Math.max(...data)
            }
        } )

        return dataCounter;

    }


    useEffect(() => {

        setAllDataAPI().then(e => {

            setCounts(e);
            setLoader(false);
            

        })

    }, []);


    const [dataExport, setDataExport] = useState([]);


    const DataExport = async (red) => {

        if(dataExport.length) {

            setDataExport([]);

            red.forEach( dataUser => {
    
                setDataExport(data => [...data, dataUser.data])
                
            } )

        } else {

            red.forEach( dataUser => {
    
                setDataExport(data => [...data, dataUser.data])
                
            } )

        }

    }


    return (

        <div className="overviewAdmin">

            {
                loader ? 
                
                <div className="loadingData">

                    <SethAnimation jsonSrc={"https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />

                </div> 
                
                : null
            }

            {/* Dashboard Cards Begins */}

            <div className="dashboard_cards">

                <div className="longCards">
                    
                    <div className="card_stat" style={{ backgroundImage : `url(${PathDun})` }}>

                        <div className="iconFit">
                            <img src={Users} alt="total Users" />
                        </div>

                        <div className="detailedStat">

                            <div className="stat_number">{counts.users}</div>
                            <div className="title"> Users</div>
                        
                        </div>

                    </div>

                    <div className="card_stat" style={{ backgroundImage : `url(${PathDun})` }}>

                        <div className="iconFit">
                            <img src={Apply} alt="total Applications" />
                        </div>

                        <div className="detailedStat">

                            <div className="stat_number"> {counts.applications} </div>
                            <div className="title"> Applications</div>
                        
                        </div>

                    </div>

                    <div className="card_stat" style={{ backgroundImage : `url(${PathDun})` }}>

                        <div className="iconFit">
                            <img src={Submitted} alt="total Submitted" />
                        </div>

                        <div className="detailedStat">

                            <div className="stat_number">{counts.submitted}</div>
                            <div className="title"> Submitted</div>
                        
                        </div>

                    </div>

                </div>

                {/* Short Cards Right */}

                <div className="shortCards">

                    <div className="layerCard">
                        
                        <div className="card_stat" style={{ backgroundImage : `url(${PathDun})` }}>

                            <div className="detailedStat">

                                <div className="iconFit">
                                    <img src={pending} alt="Statistics Admin" />
                                </div>

                                <div className="contentbit">
                                    <div className="stat_number">{counts.pending}</div>
                                    <div className="title">Pending</div>
                                </div>
                            
                            </div>

                        </div>

                        <div className="card_stat" style={{ backgroundImage : `url(${PathDun})` }}>

                            <div className="detailedStat">

                                <div className="iconFit">
                                    <img src={graded} alt="Statistics Admin" />
                                </div>

                                <div className="contentbit">
                                    <div className="stat_number">{counts.graded}</div>
                                    <div className="title"> Graded</div>
                                </div>
                            
                            </div>

                        </div>

                         <div className="card_stat" style={{ backgroundImage : `url(${PathDun})` }}>

                            <div className="detailedStat">

                                <div className="iconFit">
                                    <img src={Puzzle} alt="Statistics Admin" />
                                </div>

                                <div className="contentbit">
                                    <div className="stat_number"> {counts.unsubmitted} </div>
                                    <div className="title"> Unsubmitted</div>
                                </div>
                            
                            </div>

                        </div>

                    </div>

                    <div className="layerCard layerCard2">
                        
                        <div className="card_stat" style={{ backgroundImage : `url(${PathDun})` }}>

                            <div className="detailedStat">

                                <div className="iconFit">
                                    <img src={brief} alt="Statistics Admin" />
                                </div>

                                <div className="contentbit">
                                    <div className="stat_number">{counts.councilGraded}</div>
                                    <div className="title">Council Graded</div>
                                </div>
                            
                            </div>

                        </div>

                        <div className="card_stat" style={{ backgroundImage : `url(${PathDun})` }}>

                            <div className="detailedStat">

                                <div className="iconFit">
                                    <img src={Win} alt="Statistics Admin" />
                                </div>

                                <div className="contentbit">
                                    <div className="stat_number">{counts.interviewBucket}</div>
                                    <div className="title">Interview Bucket </div>
                                </div>
                            
                            </div>

                        </div>

                         <div className="card_stat" style={{ backgroundImage : `url(${PathDun})` }}>

                            <div className="detailedStat">

                                <div className="iconFit">
                                    <img src={Chapter} alt="Statistics Admin" />
                                </div>

                                <div className="contentbit">
                                    <div className="stat_number"> {counts.currentCohort} </div>
                                    <div className="title"> Current Cohort</div>
                                </div>
                            
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Dashboard Cards Ends */}

            {/* Users Data Table Begins */}

            <OverAdmins check = "submitted" />

        </div>

    );
}

export default Overview;
