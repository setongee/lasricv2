import React, {useState, useEffect} from 'react';
import '../../Admin/styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { getCurrentCohortNumber } from '../../api/firebase/admin/admin_applications';
import SethAnimation from '../../components/lottie/seth-animation';
import stemPDF from '../../assets/pdf/STEM Application-User Manual.pdf'
import innovationPDF from '../../assets/pdf/Innovation Application-User Manual.pdf'
import researchPDF from '../../assets/pdf/Research Application-User Manual.pdf'



const ApplyCard = ({dataPlan, onDelete, deleteVal}) => {

    const Navigate = useNavigate()

    const [data, setData] = useState(dataPlan.data)

    const [editorState, setEditorState] = useState("");
    const [openPreviewModal, setPreviewModal] = useState(false);
    const [downloadModal, setDownloadModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false);
    const [downloadPDF, setDownloadPDF] = useState("")

    useEffect(() => {

        setEditorState(EditorState.createWithContent(convertFromRaw(data.description) ))

        switch (dataPlan.data.track) {
            case "stem" : setDownloadPDF(stemPDF)
            break;

            case "innovation" : setDownloadPDF(innovationPDF)
            break;

            case "research" : setDownloadPDF(researchPDF)
            break;
        
            default:
                break;
        }

    }, [data]);
    
    
    const openModal = (preview) => {

        if (preview === "prev") {

            setPreviewModal(true)

            document.body.style.overflow = "hidden"

            const raw = convertToRaw( editorState.getCurrentContent() )
            const may = draftToHtml(raw)
            //const result = document.getElementById('resultReadMore');
            //result.innerHTML = may
            data.popDesc = may

        } else{

            setDownloadModal(true)
            document.body.style.overflow = "hidden"

        }

    }

    const closeModal = (preview) => {

        if(preview === "prev") {

            setPreviewModal(false);
            document.body.style.overflow = "visible"

        } else {

            setDownloadModal(false);
            document.body.style.overflow = "visible"

        }

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


    const handleSubmitApplication = (preview) => {


        if (preview === "prev"){

            closeModal(preview);
            openModal("download")

        } else {

            document.body.style.overflow = "visible"
            const navDirection = `/application/cohort${dataPlan.data.cohortNum}/${dataPlan.data.track}/${dataPlan.uid}/personal`
            Navigate(navDirection);

        }

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

                ( <div className="previewReadMore read_apply customEdit">

                    <div className="readMoreModal">

                        <div className="closeModal" onClick={ () => closeModal('prev') }> X </div>
                        <div className="expiryDate"> Expires {data.formattedDate} </div>
                        <div className="titlePreview"> {data.title} </div>
                        <div className="trackPreview"> <p>{data.track} </p><div className="divLine"></div> </div>
                        <div className="resultReadMore" id='resultReadMore'></div>
                        <div className="buttonApply" onClick={ () => handleSubmitApplication("prev") } > Start Application <i className="fi fi-rr-arrow-small-right"></i></div>

                    </div>

                </div> ) : null
            
            }

            {
                downloadModal ? (
                    <div className="previewReadMore read_apply customEdit custom2">

                <div className="readMoreModal downloadFile">

                    <div className="closeModal" onClick={ () => closeModal('download') }> X </div>

                    <div className="animation">
                        <SethAnimation jsonSrc={"https://assets7.lottiefiles.com/packages/lf20_A49Ym5/21 - Download.json"} lottieStyle = {{width: '200px', height: '200px'}} speed={"1"} />
                    </div>

                    <h1>Download Manual for {<br></br>} <span>{dataPlan.data.track.charAt(0).toUpperCase() + dataPlan.data.track.slice(1)}</span> Application</h1>

                    <p>Kindly download the manual to proceed to application, the manual aids to guiding you in filling your application.</p>

                    <a href={downloadPDF} download className="buttonApply"> Download Manual <i className="fi fi-rr-arrow-small-down"></i></a>

                    <p className='lastmile' onClick={ () => handleSubmitApplication("download") } >Already downloaded the PDF manual? <span><strong>Proceed to application</strong></span></p>

                </div>

            </div>
                ) : null
            }

            {/* End of Preview Read More Information */}

            <div className="callups_section pageApplyCard">

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

                            
                            <div className="callup_track"> <div className="track_icon"><i className="fi fi-rr-bulb"></i></div> {data.track} </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default ApplyCard;

