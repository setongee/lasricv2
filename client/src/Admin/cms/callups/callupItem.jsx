import React, {useState, useEffect} from 'react';
import '../../styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { setLandingDetails, getCMSData, addCallupsDetails, getCMSCallupData, deleteDocumentCMS } from '../../../api/firebase/admin/cms';
import SethAnimation from '../../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../../api/firebase/admin/admin_applications';


const CallupsCMSItem = ({dataPlan, onDelete, deleteVal}) => {

    const Navigate = useNavigate()

    const [data, setData] = useState(dataPlan.data)

    const [editorState, setEditorState] = useState("");
    const [openPreviewModal, setPreviewModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)

    useEffect(() => {

        setEditorState(EditorState.createWithContent(convertFromRaw(data.description) ))

    }, [data]);
    
    const openModal = () => {

        setPreviewModal(true)

        document.body.style.overflow = "hidden"

        const raw = convertToRaw( editorState.getCurrentContent() )
        const may = draftToHtml(raw)
        //const result = document.getElementById('resultReadMore');
        //result.innerHTML = may
        data.popDesc = may

    }

    const closeModal = () => {

        setPreviewModal(false);
        document.body.style.overflow = "visible"

    }

    useEffect(() => {


        const result = document.getElementById('resultReadMore');
        
        if ( result !== null ) {

            result.innerHTML = data.popDesc;

        }
        
    }, [openPreviewModal]);


    useEffect(() => {
        
        getCurrentCohortNumber()
        .then( (e) => data.cohortNum = e[0].present)

    }, [data]);

    const handleDelete = () => {

        console.log("yeah mhen")

         //loader is initiated here
         setLoading(true);
         window.scrollTo(0, 0);
 
         //the cms details is updated here
         deleteDocumentCMS( `cohort${data.cohortNum}`, dataPlan.uid ).then( () => {

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


        <div className='cms-joint'>

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

            {/* Preview Read More Information */}

            {

                openPreviewModal ?

                ( <div className="previewReadMore">

                    <div className="readMoreModal">

                        <div className="closeModal" onClick={ () => closeModal() }> X </div>
                        <div className="expiryDate"> Expires {data.formattedDate} </div>
                        <div className="titlePreview"> {data.title} </div>
                        <div className="trackPreview"> <p>{data.track} </p><div className="divLine"></div> </div>
                        <div className="resultReadMore" id='resultReadMore'></div>
                        <div className="buttonApply"> Start Application <i className="fi fi-rr-arrow-small-right"></i></div>

                    </div>

                </div> ) : null
            
            }

            {/* End of Preview Read More Information */}

            <div className="callups_section">

                <div className="preview_cms_card">

                    <div className="callup_img">
                        <img src={data.image} alt="callup image" />
                    </div>

                    <div className="details_pin">

                        <div className="expires"><strong>Expires</strong> : {data.formattedDate} </div>

                        <div className="callup_title">{data.title}</div>

                        <div className="callup_details">
                            {data.short}
                        </div>

                        <div className="callup_footer">

                            <p onClick={ () => openModal() } > Read More </p>
                            <div className="callup_track"> <div className="track_icon"><i className="fi fi-rr-bulb"></i></div> {data.track} </div>

                        </div>

                    </div>

                </div>

                <div className="manageCallup">

                    <div className="editCallup" onClick={ () => Navigate(`/admin/content/callups/edit/${dataPlan.uid}`) } >

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

export default CallupsCMSItem;
