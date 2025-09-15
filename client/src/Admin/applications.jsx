import React,{useState, useEffect} from 'react';
import AdminTable from './adminTables';
import { CSVLink } from "react-csv";
import { getCurrentCohortNumber } from '../api/firebase/admin/admin_applications';

const Applications = () => {

    const [ filterContent, setFilterContent ] = useState("submitted")
    const [track, setTrack] = useState("all");
    const [cohort, setCohort] = useState(0)

    const headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "email" },
        {label : "Phone Number", key: "phone" },
        {label : "Track", key: "track" },
        { label: "Average Grading", key : "grade_export"},
        { label: "Company Name / School Name", key : "companySector"},
      ];


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

    console.log(dataExport)
    
    
    useEffect(() => {


        switch (filterContent) {
        
            case 'submitted':
    
                var act = document.querySelector('.filters .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.submitted').classList.add('active')
    
                } else {
    
                    document.querySelector('.submitted').classList.add('active')
    
                }
                
                break;
            
            case 'pending':
    
                var act = document.querySelector('.filters .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.pending').classList.add('active')
    
                } else {
    
                    document.querySelector('.pending').classList.add('active')
                    
                }
                
                break;
    
            case 'graded':
    
                var act = document.querySelector('.filters .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.graded').classList.add('active')
    
                } else {
    
                    document.querySelector('.graded').classList.add('active')
                    
                }
                
                break;
    
                case 'interview':
    
                    var act = document.querySelector('.filters .active');
                    
                    if(act !== null) {
        
                        act.classList.remove('active');
                        document.querySelector('.interview').classList.add('active')
        
                    } else {
        
                        document.querySelector('.interview').classList.add('active')
                        
                    }
                    
                    break;

                
        
            default:
                break;
        }


        getCurrentCohortNumber().then(e =>  setCohort(e[0].present))


    }, [filterContent]);

    return (

        <div className = "overviewAdmin applicationsPage" >
            
            <div className="tableInfo">

                <div className="filters">

                    <li className="submitted active" onClick={()=>setFilterContent("submitted")}>All Applications</li>
                    <li className='pending' onClick={()=>setFilterContent("pending")}>Pending</li>
                    <li className='graded' onClick={()=>setFilterContent("graded")}>Graded</li>
                    <li className='interview' onClick={()=>setFilterContent("interview")}>Interview Bucket</li>

                </div>

                <form className="filterTrack">

                    <select name="filter" id="filter" onChange={ (e) => setTrack(e.target.value) }>

                        <option value="all"> All Applications </option>
                        <option value="stem"> Stem Applications </option>
                        <option value="innovation"> Innovation Applications </option>
                        <option value="research"> Research Applications </option>

                    </select>

                    <CSVLink data={[]} headers={headers} filename={`LASRIC 2022 Cohort${cohort}_${track}_${filterContent} Applications_Export.csv`} className="btn_download" > Export</CSVLink>

                </form>

            </div>

            <AdminTable check = {filterContent} track = {track} exportData = {DataExport} />

        </div>

    );
}

export default Applications;
