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

const CallupsCMSList = () => {

    const Navigate = useNavigate()

    const [data, setData] = useState([]);
    const [deleteListener, setDeleteListener] = useState(true)

    useEffect(() => {

        async function fetchData() {

          const cohort = await getCurrentCohortNumber().then( (e) => data.cohortNum = e[0].present)

          const response = await getCMSCallupData("callups", `cohort${cohort}`);
          setData(response);

        }

        fetchData();

      }, [deleteListener]);


    return (

        <div className="callupListing">




            <div className="cms-nav">

                <div className="headerBack" onClick={ () => Navigate('/admin/content') } >
                    <i className="fi fi-rr-arrow-small-left"></i>
                </div>

                <div className="cms-title">Content Management {">"} Callups</div>

                <div className="creatCallup" onClick={ () => Navigate('/admin/content/callups/create')} > Create </div>

            </div>

            <div className="callupItem">

                {
                    data.length ? data.map((data, index) => {

                        return <CallupsCMSItem dataPlan = {data} key = {index} onDelete = {setDeleteListener} deleteVal = {deleteListener} />
                        
                    }) : <div className="no-data-state">

                            <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />
            
                            <p> Oops! There are no callups created yet </p>
    
                         </div>
                }

            </div>

        </div>

    );
}

export default CallupsCMSList;
