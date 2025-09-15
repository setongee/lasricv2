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

const AlbumListing = () => {

    const Navigate = useNavigate()

    const [data, setData] = useState([]);
    const [deleteListener, setDeleteListener] = useState(true)

    useEffect(() => {

        async function fetchData() {

          const response = await getCMSCallupData("gallery", "albums");
          setData(response);

        }

        fetchData();

      }, [deleteListener]);


    return (

        <div className="callupListing">

            <div className="cms-nav beneficiary">

                <div className="navBack">

                    <div className="headerBack" onClick={ () => Navigate('/admin/content') } >
                        <i className="fi fi-rr-arrow-small-left"></i>
                    </div>

                    <div className="cms-title">Content Management {">"} Gallery</div>

                </div>

                <div className="sidedItem">
                    
                    <div className="creatCallup" onClick={ () => Navigate('/admin/content/gallery/create')} > Create </div>

                </div>

            </div>

            <div className="callupItem">

                {
                    data.length ? data.map((data, index) => {

                        return <CallupsCMSItem dataPlan = {data} key = {index} onDelete = {setDeleteListener} deleteVal = {deleteListener} />
                        
                    }) : <div className="no-data-state">

                            <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />
            
                            <p> Oops! There are no albums created yet </p>
    
                         </div>
                }

            </div>

        </div>

    );
}

export default AlbumListing;
