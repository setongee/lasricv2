import React, {useState, useEffect} from 'react';
import '../styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { setLandingDetails, getCMSData } from '../../api/firebase/admin/cms';
import SethAnimation from '../../components/lottie/seth-animation';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const LandingCMS = () => {

    const Navigate = useNavigate()


    const [data, setData] = useState({

        image : "https://bit.ly/3n7lmfR",
        company : "",
        web : "https://",
        content : "",
        sector : ""

    })

    const [editorState, setEditorState] = useState();

    const [loading, setLoading] = useState(false)

    const [alert, setAlert] = useState(false)

    const [content, setContent] = useState( "" )

    const handleFileChange = e => {

        const image = document.getElementById("foundersPhoto")
        image.src = URL.createObjectURL(e.target.files[0])
        setContent(e.target.files[0]);

    }

    const handleFileUpload = () => {

        const fileInput = document.getElementById("landing_image")
        console.log(fileInput);
        fileInput.click();

    }


    
    const handleChange = e => {

        const check = e.target.value

        if(e.target.name === "web" && check === "") {


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

          const response = await getCMSData("landing");

          setData(response)

        }

        fetchData();

      }, []); // 

    useEffect(() => {

        if (data.content === "") {

            setEditorState(EditorState.createEmpty())

        } else {

            setEditorState(EditorState.createWithContent(convertFromRaw(data.content) ))
            
        }

    }, [data]);


    const editorFinished = () => {

        const raw = convertToRaw( editorState.getCurrentContent() )
        data.content = raw

    }

    const uploading = () => {

        const storage = getStorage();
        const storageRef = ref( storage, `cms / landing page / cms_landing_${data.company}` );
    
            //uploading to firebase begins
            uploadBytes(storageRef, content)
            .then( () => {
    
                getDownloadURL(storageRef)
                .then( url => {

                    //the cms details is updated here
                    setLandingDetails({ ...data, image : url }, "landing" ).then( () => {

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

        uploading();

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

                    Your inforrmation has been updated and saved successfully!

                </div> : null
            }
            
            <div className="cms-nav">

                <div className="headerBack" onClick={ () => Navigate(-1) } >
                    <i className="fi fi-rr-arrow-small-left"></i>
                </div>

                <div className="cms-title">Content Management {">"} Landing Page </div>

            </div>

            <div className="contentPlaceholder">
                
                <form className="cms-fill">

                    <h1>Featured Tech Startup of the month.</h1>

                    <div className="techImage" onClick={ () => handleFileUpload() } >
                        <img src={data.image} alt="featured Tech Startup" id='foundersPhoto' />
                    </div>

                    <div className="infoEdit">Tap above picture to edit</div>

                    <div className="cms-input-holder">
                        
                        <input type="file" className="cms-input" id='landing_image' accept="image/png, image/jpeg" onChange={ handleFileChange } hidden />

                        <input type="text" className="cms-input" name = 'company' id='company' placeholder='Enter Company Name' onChange={ handleChange } value = {data.company} />

                        <input type="text" className="cms-input" name = 'sector' id='sector' placeholder='Enter Sector' onChange={ handleChange } value = {data.sector} />

                        <input type="text" className="cms-input" name = 'web' id='web' placeholder='Enter Company Website (must have https:// or http://' onChange={ handleChange } value = {data.web || "https://"} />

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
                    
                    
                    <div className="submitButtonCMS" onClick={ () => submitForm() }> Save & Submit </div>


                </form>

            </div>

        </div>

    );
}

export default LandingCMS;
