import React, {useState, useEffect} from 'react';
import CouncilMember from './CouncilTable';
import AdminShow from './adminShow';
import SethAnimation from '../components/lottie/seth-animation'
import { getSubmittedApps, getPendingApps, getGradedApps, getInterviewBucketApps, getCouncilMemberListing } from '../api/firebase/admin/admin_applications';
import './styles/AdminStyles.scss'
import Previewapplication from './previewApplication';
import CouncilShow from './councilTabs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, draftToHtml, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { createCouncilMember, setCouncilDocument } from '../api/firebase/auth';
import { setCouncilInfomation, addNewCouncil } from '../api/firebase/admin/admin_applications';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CLOSING } from 'ws';

const Councilmemberlisting = () => {

    
    const dataPreview = {

        firstname : "",
        lastname : '',
        img : 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
        email : '',
        password : 'password',
        track : [],
        uid : '',
        profile : "",
        internal : true

    }

    const defaultData = {

        firstname : "",
        lastname : '',
        img : 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
        email : '',
        password : 'password',
        track : [],
        uid : '',
        profile : "",
        internal : true

    }

    const [data, setData] = useState([])
    const [previewShow, setPreviewShow ] = useState(false)
    const [previewData, setPreviewData] = useState(dataPreview)
    const [appUID, setAppID] = useState({})
    const [input, setInput] = useState("")
    const [ v, x ] = useState("")
    const [src, setSrc] = useState("")
    const [edit, setEdit] = useState([])
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [internal, setInternal] = useState(previewData.internal)
    const [successModal, setSuccessModal] = useState(false);
    const [content, setContent] = useState( "" )

    const handleFileChange = e => {

        const image = document.getElementById("profilePix")
        image.src = URL.createObjectURL(e.target.files[0])
        setContent(e.target.files[0]);

    }

    const handleFileUpload = () => {

        const fileInput = document.getElementById("contentImage")
        console.log(fileInput);
        fileInput.click();

    }


    const onEditorStateChange = (editorState) => {

        setEditorState( editorState )

    }


    const previewUser = (data, appuid) => {

        //show the modal
        setPreviewShow(true);

        document.body.style.overflow = "hidden";
        
    }

    const closePreviewUser = () => {

        //show the modal
        setPreviewShow(false);

        //set the data in for viewing
        setPreviewData(defaultData)

        document.body.style.overflow = "visible";
        
        //setInternal(true);  
    }

    
    const councilOnchange = (e) => {

        const {name, value} = e.target;
    
        setPreviewData( data => {

            return {

                ...data,
                [name] : value

            }
        })

    }

    const addTrackCouncil = () => {


        const checkbox = document.querySelectorAll('.checkboxx input')
        const rent = Array.from(checkbox)

        const newTrackList = []
        
        rent.forEach(track => {
            if (track.checked) {

                newTrackList.push(track.name)

            }
        })

        previewData.track = newTrackList;

    }

    const editorFinished = () => {

        const raw = convertToRaw( editorState.getCurrentContent() )
        previewData.profile = raw

    }

    const handleInternalChange = () => {

        const raw = convertToRaw( editorState.getCurrentContent() )
        previewData.profile = raw

    }

    const [newCouncil, setNewCouncil] = useState({})

    const uploading = () => {

        const storage = getStorage();
        const storageRef = ref(storage, `council / ${previewData.firstname} /  council_${previewData.firstname}_${previewData.lastname}` );
    
            //uploading to firebase begins
            uploadBytes(storageRef, content)
            .then( () => {
    
                getDownloadURL(storageRef)
                .then( url => {
                    
                    setPreviewData( {...previewData, img : url } );

                    createCouncilMember( {...previewData, img : url }).then(() => {

                        setSuccessModal(true);
            
                        setNewCouncil(previewData);
            
                        setTimeout(() => {
            
                            setSuccessModal(false);
                            closePreviewUser()
                            
                        }, 1000);
            
                    })
                    
                })
                
            });       

    }


    const submitCouncilInfo = async () => {

        //setCouncilDocument(data.uid, data)
        addTrackCouncil();
        editorFinished();
        previewData.internal = internal;
        uploading();
        console.log(previewData)

        

    }


    return (

        <div className="councilMembers">

            <div className="headCouncil">

               <div className='headerTags' >Council Members</div>
               <div className="createNew" onClick={ () => previewUser() }> + Add Council</div>

            </div>

            {
                previewShow ? (


                    <div className="previewCouncil">

                        {
                            successModal ? <div className="successModal">
                                <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_lk80fpsm.json"} lottieStyle = {{width: '200px', height: '200px'}} speed={"1"} /> 
                            </div>: null

                        }

                        <div className="closeModalCouncil" onClick={ () => closePreviewUser() }> <i className="fi fi-rr-cross-small"></i> </div>

                        <div className="councilInformation">

                            <div className="profileImageContainer">

                                <div className="toggleArea">

                                    <p>Internal</p>

                                    <div className="toggleCouncilType" onClick = { () => setInternal(!internal) } >

                                        <div className={`${previewData.internal ? 'togglePin' : 'togglePin switch'}`}></div>
                                        

                                    </div>

                                    <p>External</p>

                                </div>

                                <div className="profileImage" onClick={() => handleFileUpload()}><img id = "profilePix" src={previewData.img} alt="council member Image" /></div>
                                
                                <div className="councilName"> 

                                    <div className="firstname-council"> {previewData.firstname} {<br></br>} <strong>{previewData.lastname}</strong> </div>
                                
                                </div>

                                <div className="tap">
                                    Tap to edit
                                </div>

                                <div className="email_prev"> {previewData.email}</div>

                                <div className="button-submit" onClick={ () => submitCouncilInfo() }> Submit & Save </div>

                            </div>

                            <div className="formAction">

                                <form action="">

                                    <div className="gradeTrack"> <i className="fi fi-rr-user"></i> Personal Information</div>

                                    <div className="inputForm">
                                        <input type="text" placeholder='Enter Council Firstname' value={previewData.firstname} name='firstname' id='firstname' onChange={councilOnchange}/>
                                    </div>

                                    <div className="inputForm">
                                        <input type="text" placeholder='Enter Council Lastname' value={previewData.lastname} name='lastname' id='lastname' onChange={councilOnchange}/>
                                    </div>

                                    <div className="inputForm">
                                        <input type="email" placeholder='Enter Council Valid Email Address' value={previewData.email} name='email' id='email' onChange={councilOnchange}/>
                                    </div>

                                    <div className="inputForm">
                                        <input type="text" placeholder='Enter Council Job Title' value={previewData.job} name='job' id='job'  onChange={councilOnchange}/>
                                    </div>

                                    <div className="inputForm">
                                        <input type="text" placeholder='Enter Council Linkedin Profile URL' value={previewData.linkedin} name='linkedin' id='linkedin' onChange={councilOnchange}/>
                                    </div>

                                    <div className="inputForm hide">

                                        <input type="file" accept="image/png, image/jpeg" id = "contentImage" onChange={handleFileChange} hidden />

                                    </div>

                                    <div className="select-box">

                                        <div className="gradeTrack"> <i className="fi fi-rr-checkbox"></i> Grading Track</div>

                                        <div className="checkboxx">
                                            <p>Innovation</p>
                                            <input type="checkbox"  name = 'innovation' id='innovation' value="innovation" />
                                        </div>

                                        <div className="checkboxx">
                                            <p>Research</p>
                                            <input type="checkbox" name = 'research' id='research' value="research" />
                                        </div>

                                        <div className="checkboxx">
                                            <p>Stem</p>
                                            <input type="checkbox" name = 'stem' id='stem' value="stem" />
                                        </div>

                                        <div className="checkboxx">
                                            <p>Secondary School</p>
                                            <input type="checkbox" name = 'secsch' id='secsch' value="secsch" />
                                        </div>
                                        
                                    </div>

                                </form>

                                <div className="gradeTrack"> <i className="fi fi-rr-edit"></i> Council Profile </div>


                                    <div className="editorDraft">

                                        <Editor

                                            editorState={editorState}
                                            onEditorStateChange={onEditorStateChange}
                                            toolbar= {

                                                { options : [ 'inline', 'list'] }

                                            }
                                        

                                        />

                                    </div>

                                </div>

                        </div>

                        

                    </div>


                ) : null
            }
            
           <div className="councilData">

                <CouncilMember newCouncil = {newCouncil} />
                
           </div>

        </div>

    );
}

export default Councilmemberlisting;
