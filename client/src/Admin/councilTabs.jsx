import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AdminStyles.scss'
import { getCouncilGradeTrack, getCouncilApps } from '../api/firebase/admin/admin_applications';

const CouncilShow = ({data, showPrev, appuid}) => {

    const [graded, setGraded] = useState(0)
    const [trackTotal, trackSetTotal] = useState({

        stem : [],
        innovation : [],
        research : []
    })

    const councilStack = {

        councilTrackG : getCouncilGradeTrack(data.track),
        councilGradedLength : getCouncilApps(data.uid)

    }


    useEffect(() => {

        councilStack.councilTrackG.then((e) => trackSetTotal(e) )
        councilStack.councilGradedLength.then( e => setGraded(e[data.uid].length))

    }, []);

    return (

        <div className="tableHeaders information councilMem" onClick={ () => showPrev(data, appuid) }>

            <div className="tableHead avarta"> 

                <div className="councilImageSide">
                    <img src={data.img} alt="Council Image" />
                </div>
                
                {data.firstname} {data.lastname} 

            </div>
            
            <div className="tableHead"> {data.track.join(", ")} </div>

            <div className="tableHead">  {graded} of <strong>{trackTotal.total}</strong>  </div>
            <div className="tableHead" style={{color : "green", fontWeight : "bold", fontSize : "12px" }}> Active </div>

            {/* <div className="tableHead" style={{color : "green", fontWeight : "bold", fontSize : "12px" }}> { !data.internal ? <div style={{color : "green"}}> Internal </div> : <div style={{color : "blue"}}> External </div> } </div> */}

            <div className="tableHead"> <i className="fi fi-rr-arrow-right"></i> </div>

        </div>
    );
}

export default CouncilShow;
