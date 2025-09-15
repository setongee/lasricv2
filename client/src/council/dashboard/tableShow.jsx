import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Tableshow = ({data, councilUID}) => {

    const Navigate = useNavigate()

    const INIT_1 = data.firstname.split('')[0].toUpperCase();
    const INIT_2 = data.lastname.split('')[0].toUpperCase();
    const FULLINIT = `${INIT_1}${INIT_2}`

    const gradeData = data.grades

    const [grade, setGrade] = useState(0)

    useEffect(() => {

        try {

           setGrade(gradeData[councilUID].grade)
            
        } catch (error) {
            
            setGrade(0)
        }


    }, []);

    var dateSubmitted = data.dateSubmitted.toDate().toDateString()

    return (

        <div className="tableHeaders information" onClick={ () => Navigate(`/council/dashboard/applications/grade/${data.track}/${data.appid}`)}>

            <div className="tableHead avarta" style={{textTransform: 'capitalize'}}> <div className="cardMe" style={{backgroundColor: `${data.track === 'stem' ? "#c293ff" : "#c1deff"}`}}> {FULLINIT} 

                <div className="iconShow"></div>

            </div> {data.firstname} {data.lastname} 

            </div>

            <div className="tableHead"> {dateSubmitted} </div>
            <div className="tableHead pilo" style={{textTransform: 'capitalize'}}> <div className="trackDesign"> {data.track} </div> </div>
            <div className="tableHead"> {grade}% </div>

            <div className="tableHead"> <i className="fi fi-rr-arrow-right"></i> </div>

        </div>
    );
}

export default Tableshow;
