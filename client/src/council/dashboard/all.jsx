import React, {useEffect, useState} from 'react';
import { getAllSubmittedApplications } from '../../api/firebase/council-applications';
import Tableshow from './tableShow';
import { useLocation } from 'react-router-dom';
import SethAnimation from '../../components/lottie/seth-animation';
import { getCouncilMember } from '../../api/firebase/getApplication';
import { getAuth, updatePassword } from "firebase/auth";

const All = ({councilProfile}) => {

    const alldata = getAllSubmittedApplications(councilProfile.uid);
    const councilMember = getCouncilMember(councilProfile.uid)

    var pi = useLocation()

    const [data, setData] = useState([])
    const [councilTrack, setCouncilTrack] = useState([])

    useEffect(() => {
        
        alldata.then(e => setData(e))

        // councilMember.then((member) => setCouncilTrack(member.track))

        // alldata.then(e => {

        //     var pinned = [];

        //     if (councilTrack.includes(stem))

        // })

    }, []);
    

    

    return (

        <div className="applications-council">

            <div className="tableHeaders itshead">

                <div className="tableHead"> Fullname </div>
                <div className="tableHead"> Date Submitted </div>
                <div className="tableHead"> Track </div>
                <div className="tableHead"> Grade </div>
                <div className="tableHead"> </div>

            </div>

            {/* Applications Listings Here */}

            {
                data.length ? data.map((e, index) => {
                    return <Tableshow data = {e} key = {index} councilUID = {councilProfile.uid} />
                }) : <div className="no-data-state">
                <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />

                <p>Oops! You have no submitted applications</p>
            </div>
            }

        </div>

    );
}

export default All;
