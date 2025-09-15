import React, {useState, useEffect} from 'react';
import '../../styles/cms.scss'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { setLandingDetails, getCMSData, addCallupsDetails, editCallup, updateCallup } from '../../../api/firebase/admin/cms';
import SethAnimation from '../../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../../api/firebase/admin/admin_applications';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CallupEdit = () => {

    const Navigate = useNavigate();
    const params = useParams();

    const [data, setData] = useState({

        image : "https://bit.ly/39QPwRz",
        title : "Title Goes Here",
        description : "",
        short : "Lorem ipsum dolor killer bean of the sit amet consectetur adipisicing elit. Suscipit?",
        track : "Innovation",
        date : "",
        formattedDate : "Fri Dec 14 2001",
        popDesc : "",
        cohortNum : 0

    })

    const [editorState, setEditorState] = useState("");
    const [cohortNum, setCohortNum] = useState(0);
    const [openPreviewModal, setPreviewModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const [content, setContent] = useState( null )

    console.log(data.image);

    const handleFileChange = e => {

        const image = document.getElementById("callup_img")
        image.src = URL.createObjectURL(e.target.files[0])
        setContent(e.target.files[0]);

    }

    const handleFileUpload = () => {

        const fileInput = document.getElementById("callupPhoto")
        console.log(fileInput);
        fileInput.click();

    }


    const handleChange = e => {

        const check = e.target.value;

        if ( e.target.name === "date" ) {

           const newDate = new Date(e.target.value).toDateString();
           data.formattedDate = newDate;
            
        } 
        
        setData( (data) => {
    
            return {
                ...data,
                [e.target.name] : e.target.value
            }

        } )

    }

    const onEditorStateChange = (editorState) => {

        setEditorState( editorState )

    }

    useEffect(() => {

        async function fetchData() {

            getCurrentCohortNumber().then( (e) => setCohortNum(e[0].present) )

            if (cohortNum !== 0) {
                
                const response = await editCallup( `cohort${cohortNum}`, params.id )
                setData(response);

            }

        }

        fetchData();

      }, [cohortNum]); 

    useEffect(() => {

        if (data.description === "") {

            setEditorState(EditorState.createEmpty())

        } else {

            setEditorState(EditorState.createWithContent(convertFromRaw(data.description) ))
            
        }

    }, [data]);


    const editorFinished = () => {

        const raw = convertToRaw( editorState.getCurrentContent() )
        data.description = raw

    }

    const uploading = () => {

        const storage = getStorage();
        const storageRef = ref( storage, `cms / callups / cms_callup_${data.title}` );
    
            //uploading to firebase begins
            uploadBytes(storageRef, content)
            .then( () => {
    
                getDownloadURL(storageRef)
                .then( url => {

                    //the cms details is updated here
                    updateCallup( `cohort${data.cohortNum}`, params.id, {...data, image : url} ).then( () => {

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

                            Navigate('/admin/content/callups')
                            
                        }, 4000);

                    } )
                    
                })
                
            });       

    }
      

    const submitForm = () => {
        
        //loader is initiated here
        setLoading(true);
        window.scrollTo(0, 0);

        //editor area is added to content parameter
        editorFinished();

        if (content !== null) {

            uploading()

        } else {

            updateCallup( `cohort${data.cohortNum}`, params.id, data ).then( () => {

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

                    Navigate('/admin/content/callups')
                    
                }, 4000);

            } )

        }

    }
    
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


    console.log(content);

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

                    Your inforrmation has been updated and saved successfully!

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


            <div className="cms-nav">

                <div className="headerBack" onClick={ () => Navigate('/admin/content/callups') } >
                    <i className="fi fi-rr-arrow-small-left"></i>
                </div>

                <div className="cms-title">Content Management {">"} Callups {">"} Edit</div>

            </div>

            <div className="callups_section">

                <div className="preview_cms_card">

                    <div className="callup_img"  onClick={ () => handleFileUpload() }>
                        <img src={data.image} alt="callup image" id = "callup_img" />
                        <div className="tapEdit">Tap to Edit</div>
                    </div>

                    <div className="details_pin">

                        <div className="expires">Expires {data.formattedDate} </div>

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


                <div className="writeup_cms_form">

                    <div className="contentPlaceholder overload_xl">
                
                        <form className="cms-fill">

                            <h1> Edit Callup Information </h1>

                            <div className="cms-input-holder">
                                
                                <input type="file" accept="image/png, image/jpeg" id = "callupPhoto" onChange={handleFileChange} hidden />

                                <input type="text" className="cms-input" name = 'title' id='title' placeholder='Enter Calliup Title' onChange={ handleChange } value = {data.title} />

                                <input type="date" className="cms-input" name = 'date' id='date' placeholder='Set Deadline Date' onChange={ handleChange } value = {data.date} />

                                <select name="track" id="track" onChange={ handleChange } value = {data.track} >

                                    <option value=""> --- Select Track --- </option>
                                    <option value="innovation"> Innovation </option>
                                    <option value="research"> Research </option>
                                    <option value="stem"> Stem </option>
                                    <option value="secsch"> Secondary Schools </option>

                                </select>

                                <textarea name="short" id="short" cols="20" rows="2" onChange={ handleChange } value = {data.short} placeholder = "Enter a short description (Not more than 13 words)" ></textarea>


                            </div>


                            <div className="editorDraft">

                                <Editor

                                    editorState={editorState}
                                    onEditorStateChange={onEditorStateChange}
                                    toolbar= {

                                        { options : [ 'inline', 'list'] }

                                    }
                                

                                />

                            </div>
                            
                            
                            <div className="submitButtonCMS" onClick={ () => submitForm() }> Edit Callup </div>


                        </form>

                    </div>

                </div>

                

            </div>

        </div>

    );
}

export default CallupEdit;
