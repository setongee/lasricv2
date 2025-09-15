import React, {useEffect, useState} from 'react';
import { getAllSubmittedApplications } from '../../api/firebase/council-applications';
import Tableshow from './tableShow';
import SethAnimation from '../../components/lottie/seth-animation';


const Pending = ({councilProfile}) => {

    const alldata = getAllSubmittedApplications(councilProfile.uid);

    const [data, setData] = useState([])

    useEffect(() => {

        alldata
        .then( data =>{
            
            const bin = data.filter((e) => {
                
                try {

                    if (!e.grades[councilProfile.uid]){
    
                        //these have grades key but council uid has not graded
                        return !e.grades[councilProfile.uid]
    
                    }

                } catch (error) {

                    console.log("mak")
                    
                }
            })

            setData(bin)

        } )

    }, []);
    

    return (

        <div className="applications-council">

            <div className="tableHeaders itshead">

                <div className="tableHead"> Fullname </div>
                <div className="tableHead"> Date Submitted </div>
                <div className="tableHead"> Track </div>
                <div className="tableHead"> Grade </div>
                <div className="tableHead">  </div>

            </div>

            {/* Applications Listings Here */}

            {
                data.length ? data.map((e, index) => {
                    return <Tableshow data = {e} key = {index} councilUID = {councilProfile.uid} />
                }) : <div className="no-data-state">
                    <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />

                    <p>Oops! You have no pending applications</p>
                </div>
            }

        </div>

    );
}

export default Pending;
