import React, {useState, useEffect} from 'react';
import '../../styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { setLandingDetails, getCMSData, addCallupsDetails, getCMSCallupData, deleteDocumentCMS, deleteBeneficiaryCMS } from '../../../api/firebase/admin/cms';
import SethAnimation from '../../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../../api/firebase/admin/admin_applications';


const BeneficiariesItem = ({dataPlan, onDelete, deleteVal}) => {

    const Navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)


    useEffect(() => {
        
        setData(dataPlan.data);

    }, []);

    const handleDelete = () => {

         //loader is initiated here
         setLoading(true);
         window.scrollTo(0, 0);
 
         //the cms details is updated here
         deleteBeneficiaryCMS( `cohort${data.cohortNum}`, dataPlan.uid ).then( () => {

            onDelete(!deleteVal);
 
             //alert the action has been saved
             setLoading(false)
 
             setTimeout(() => {
 
                 setAlert(true)
                 
                 setTimeout(() => {
 
                     const alert = document.querySelector('.alertSuccess');
                     alert.style.right = '0px'
                     
                 }, 100);
                 
             }, 100);
 
             setTimeout(() => {
 
                 const alert = document.querySelector('.alertSuccess');
                 alert.style.right = '-400px'
                 
                 setTimeout(() => {
 
                     setAlert(false)
                     
                 }, 1000);
                 
             }, 3000);
 
         } )

    }



    return (


        <div className='cms-joint admin_callup'>

            {
                loading ? <div className="loaderScreen">
                    <SethAnimation jsonSrc={"https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />
                </div> : null
            }

            {
                alert ? 
                
                <div className="alertSuccess">

                    <div className="sethAnim">
                        <SethAnimation jsonSrc={"https://assets7.lottiefiles.com/packages/lf20_afs4kbqm.json"} lottieStyle = {{width: '50px', height: '50px'}} speed={"1"} />
                    </div>

                    This callup has been deleted successfully!

                </div> : null
            }

            <div className="callups_section ">

                <div className="preview_cms_card beneficiary">

                    <div className="logoCompany">
                        <img src={data.logo} alt="company logo image" />
                    </div>

                    <div className="details_pin">

                        <div className="callup_details">
                            {data.founders}
                        </div>

                        <div className="callup_title">{data.company}</div>

                        <div className="callup_footer">

                            <p><a href = {data.website} target = '_blank' > Visit Website <i className="fi fi-rr-arrow-small-right"></i> </a></p>
                            <div className="callup_track"> <div className="track_icon"><i className="fi fi-rr-bulb"></i></div> {data.track} </div>

                        </div>

                    </div>

                </div>

                <div className="manageCallup">

                    <div className="editCallup" onClick={ () => Navigate(`/admin/content/beneficiaries/edit/cohort${dataPlan.data.cohortNum}/${dataPlan.uid}`) } >

                        <i className="fi fi-rr-pencil"></i>
                        <p>Edit</p>

                    </div>

                    <div className="editCallup" onClick = { () => handleDelete() } >

                        <i className="fi fi-rr-trash"></i>
                        <p>Delete</p>

                    </div>

                </div>
                

            </div>

        </div>

    );
}

export default BeneficiariesItem;
