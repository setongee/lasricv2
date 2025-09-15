import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AdminShow = ({data, showPrev, appuid}) => {

    const INIT_1 = data.firstname.split('')[0].toUpperCase();
    const INIT_2 = data.lastname.split('')[0].toUpperCase();
    const FULLINIT = `${INIT_1}${INIT_2}`;

    var dateSubmitted = data.dateSubmitted.toDate().toDateString()


    return (

        <div className="tableHeaders information" onClick={ () => showPrev(data, appuid) }>

            <div className="tableHead avarta" style={{textTransform: 'capitalize'}}> <div className="cardMe" style={{backgroundColor: `${data.track === 'stem' ? "#c293ff" : "#c1deff"}`}} > {FULLINIT} 

                </div> {data.firstname} {data.lastname} 

            </div>
            
            <div className="tableHead"> {dateSubmitted} </div>

            <div className="tableHead"> {data.track} </div>
            <div className="tableHead"> {data.avgGrade}% </div>

            <div className="tableHead"> <i className="fi fi-rr-arrow-right"></i> </div>

        </div>
    );
}

export default AdminShow;
