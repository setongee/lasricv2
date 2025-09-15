import React, {useState, useEffect} from 'react';
import '../../styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { setLandingDetails, getCMSData, addCallupsDetails, getCMSCallupData } from '../../../api/firebase/admin/cms';
import SethAnimation from '../../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../../api/firebase/admin/admin_applications';
import CallupsCMSItem from './callupItem';

const BeneficiariesList = () => {

    const Navigate = useNavigate()

    const [data, setData] = useState([]);
    const [cohort, setCohort] = useState("cohort0");
    const [deleteListener, setDeleteListener] = useState(true)

    useEffect(() => {

        async function fetchData() {

          const response = await getCMSCallupData("beneficiaries", cohort, "all");
          setData(response);

        }

        fetchData();

      }, [deleteListener, cohort]);


      useEffect(() => {

        async function fetchCohort() {

          const cohort = await getCurrentCohortNumber().then( (e) => e[0].present)

          if ( Number(cohort) > 0 ) {

            setCohort('cohort1');

         }

          // Fill in the past cohorts in the options
          const selectOptionsBody = document.querySelector('#select_track');

          if (!selectOptionsBody.childNodes.length) {


              for ( let i = 1; i <= cohort; i++ ) {
        
                const selectOptions = document.querySelector('#select_track');
    
                const option = document.createElement('option');
                option.value = `cohort${i}`;
                option.innerText = `Cohort ${i}`;
    
                selectOptions.appendChild(option)
    
                const selectOptionsBody = document.querySelector('#select_track');
                selectOptionsBody.value = `cohort${cohort}`
            
            }  

          }

          selectOptionsBody.childNodes[0].selected = 'true'

        }

        fetchCohort();

      }, []);

      
    const handleChange = (e) => {

      setData([])
      setCohort(e.target.value);

    }


    return (

        <div className="callupListing">

            <div className="cms-nav beneficiary">

                <div className="navBack">

                    <div className="headerBack" onClick={ () => Navigate('/admin/content') } >
                        <i className="fi fi-rr-arrow-small-left"></i>
                    </div>

                    <div className="cms-title">Content Management {">"} Beneficiaries</div>

                </div>

                <div className="sidedItem">

                    <div className="selectTrack">

                        <p>Filter by Cohort</p>

                        <select name="select_track" id="select_track" onChange={handleChange} >
                            
                        </select>

                    </div>
                    
                    <div className="creatCallup" onClick={ () => Navigate('/admin/content/beneficiaries/create')} > Create </div>

                </div>

            </div>

            <div className="callupItem">

                {
                    data.length ? data.map((data, index) => {

                        return <CallupsCMSItem dataPlan = {data} key = {index} onDelete = {setDeleteListener} deleteVal = {deleteListener} />
                        
                    }) : <div className="no-data-state">

                            <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />
            
                            <p> Oops! There are no beneficiaries created yet </p>
    
                         </div>
                }

            </div>

        </div>

    );
}

export default BeneficiariesList;
