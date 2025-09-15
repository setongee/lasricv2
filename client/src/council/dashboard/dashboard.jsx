import React, {useEffect, useState} from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import '../councilArea.scss'
import CouncilHeading from '../council_heading';
import { getAllSubmittedApplications } from '../../api/firebase/council-applications';
import { useParams } from 'react-router-dom';

const CouncilDashboard = ({user}) => {

    const Path = useLocation().pathname.split('/')[1];

    let params = useParams()

    const alldata = getAllSubmittedApplications(user.uid);

    const [data, setData] = useState([])

    useEffect(() => {
        
        alldata.then( e => setData(e) )
        
    }, []);

    return (

        <div className='councilBGArea'>

            <CouncilHeading data = {data} uid = {user.uid} />

            <div className= { Object.keys(params).length ? "nameSpace gradeKey" : "nameSpace" } >

                <div className="welcome-council">

                    <p>Welcome Back,</p>

                    <h1 className="councilProfile">
                        {user.firstname} {user.lastname}
                    </h1>

                </div>

            </div>
            
            <Outlet />

        </div>
    );
}

export default CouncilDashboard;
