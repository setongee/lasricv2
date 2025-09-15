import React, {useState, useEffect} from 'react';
import '../../styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { addBeneficiaryDetails } from '../../../api/firebase/admin/cms';
import SethAnimation from '../../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../../api/firebase/admin/admin_applications';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BeneficiariesCreate = () => {

    const Navigate = useNavigate()

    const [data, setData] = useState({

        logo : "https://bit.ly/3aavFx1",
        foundersImg : "https://bit.ly/3OIXeMQ",
        company : "Dribble Technologies",
        founders : "Tobi Obasa & Setonji Avoseh",
        website : "https://www.nowebsiteurl.africa",
        track : "innovation",
        cohortNum : 0

    })

    const [openPreviewModal, setPreviewModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false);
    const [content, setContent] = useState("");
    const [content2, setContent2] = useState( "" );

    // const handleFileChange = e => {

    //     const image = document.getElementById("callup_img")
    //     image.src = URL.createObjectURL(e.target.files[0])
    //     setContent(e.target.files[0]);

    // }

    const handleFileChange = e => {

        const image = document.getElementById("foundersImage")
        image.src = URL.createObjectURL(e.target.files[0])
        setContent(e.target.files[0]);

    }

    const handleFileChange2 = e => {


        const image = document.getElementById("logoCompany")
        image.src = URL.createObjectURL(e.target.files[0])
        setContent2(e.target.files[0]);

    }

    // const handleFileUpload = () => {

    //     const fileInput = document.getElementById("callupPhoto")
    //     fileInput.click();

    // }

    const handleFileUpload = (e) => {
        const fileInput = document.getElementById("founders")
        fileInput.click();

    }

    const handleFileUpload2 = (e) => {

        const fileInput = document.getElementById("company_logo")
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

    // useEffect(() => {

    //     async function fetchData() {

    //       const response = await getCMSData("callups", "");

    //       setData(response)

    //     }

    //     fetchData();

    //   }, []); 

    // useEffect(() => {

    //     if (data.description === "") {

    //         setEditorState(EditorState.createEmpty())

    //     } else {

    //         setEditorState(EditorState.createWithContent(convertFromRaw(data.description) ))
            
    //     }

    // }, [data]);

    const uploading2 = (url_logo) => {

        const storage = getStorage();
        const storageRef = ref( storage, `cms / beneficiaries / logos / logo_${data.company}` );
    
            //uploading to firebase begins
            uploadBytes(storageRef, content2)
            .then( () => {
    
                getDownloadURL(storageRef)
                .then( url => {

                    //the cms details is updated here
                    addBeneficiaryDetails({...data, logo : url, foundersImg : url_logo}, `cohort${data.cohortNum}` ).then( () => {

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

                            Navigate('/admin/content/beneficiaries')
                            
                        }, 4000);

                    } )
                    
                })
                
            });       

    }

    const uploading = () => {

        const storage = getStorage();
        const storageRef = ref( storage, `cms / beneficiaries / foundersImage / founders_${data.company}` );
    
            //uploading to firebase begins
            uploadBytes(storageRef, content)
            .then( () => {
    
                getDownloadURL(storageRef)
                .then( url => {

                    uploading2(url)
                    
                })
                
            });       

    }
      

    const submitForm = () => {
        
        //loader is initiated here
        setLoading(true);
        window.scrollTo(0, 0);

        uploading()

    }

    useEffect(() => {
        
        getCurrentCohortNumber()
        .then( (e) => data.cohortNum = e[0].present)

    }, []);



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

                <div className="cms-title">Content Management {">"} Beneficiaries {">"} Create</div>

            </div>

            <div className="callups_section">

                <div className="preview_cms_card beneficiary">

                    <div className="callup_img"  onClick={(e) => handleFileUpload()} >
                        <img src={data.foundersImg} alt="Founders image" id = "foundersImage" />
                        <div className="tapEdit">Tap to Edit</div>
                    </div>

                    <div className="logoCompany" onClick={(e) => handleFileUpload2()}>
                        <img src={data.logo} alt="company logo image" id='logoCompany' />
                        <div className="tapEdit">Tap to Edit</div>
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


                <div className="writeup_cms_form">

                    <div className="contentPlaceholder overload_xl">
                
                        <form className="cms-fill">

                            <h1>Create a new beneficiary</h1>

                            <div className="cms-input-holder">

                                <input type="file" accept="image/png, image/jpeg" id = "founders" onChange={handleFileChange} hidden />

                                <input type="file" accept="image/png, image/jpeg" id = "company_logo" onChange={handleFileChange2} hidden />

                                <input type="text" className="cms-input" name = 'company' id='company' placeholder='Enter Company Name' onChange={ handleChange } value = {data.company} />

                                <input type="text" className="cms-input" name = 'website' id='website' placeholder='Enter Website URL' onChange={ handleChange } value = {data.website || 'https://'} />

                                <input type="text" className="cms-input" name = 'founders' id='founders' placeholder='Enter Company Founders Name' onChange={ handleChange } value = {data.founders} />

                                <input type="text" className="cms-input" name = 'cohortNum' id='cohortNum' placeholder='Enter Cohort Number' onChange={ handleChange } value = {data.cohortNum} />

                                <select name="track" id="track" onChange={ handleChange } value = {data.track} >

                                    <option value=""> --- Select Track --- </option>
                                    <option value="innovation"> Innovation </option>
                                    <option value="research"> Research </option>
                                    <option value="stem"> Stem </option>
                                    <option value="secsch"> Secondary Schools </option>

                                </select>


                            </div>
                            
                            <div className="submitButtonCMS" onClick={ () => submitForm() }> Create Beneficiary </div>


                        </form>

                    </div>

                </div>

                

            </div>

        </div>

    );
}

export default BeneficiariesCreate;
