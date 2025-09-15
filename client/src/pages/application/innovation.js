import React, {useState, useEffect} from 'react';
import './application.scss';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createApplication, getApplicationData } from '../../api/firebase/handleSubmits';
import { getApplication } from '../../api/firebase/getApplication';
import SethAnimation from '../../components/lottie/seth-animation';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { updatePersonalApplication } from '../../api/firebase/handleSubmits';
import {states} from './NigeriaAPI'



const Innovation = ({currentUser}) => {

    const Data = {

        age: "",
        annualReturns: "",
        bankConfirmation : "",
        bizModel: "",
        bizStage: "",
        cacCert: "",
        cacForm7: "",
        cacMemorandum: "",
        cacPost: "",
        company: "",
        companyDate: "",
        companySector: "",
        criminalRecord: "",
        gender: "",
        idCard: "",
        lasricGrant: "",
        lawsuit: "",
        lgaResidence: "",
        linkedin: "",
        nationality: "",
        nextKin: "",
        orgRole: "",
        patent: "",
        refLetter1: "",
        refLetter2: "",
        relKin: "",
        rev12: "",
        stateResidence: "",
        targetArea: "",
        taxClearance: "",
        taxEvidence: "",
        website: ""

    }

    const [form1, setForm1] = useState(Data);
    const [uploadFiles, setuploadFiles] = useState([])

    const params = useParams()

    const [loader, setLoader] = useState(true);
    const [errors, setErrors] = useState([]);
    const [stat, setStat] = useState('pending')

    const pageDetect = useLocation().pathname
    const callupid = params.callid
    const track = pageDetect.split("/")[3]
    const cohort = params.cohort

    const [uploadingServer, setUploadingServer] = useState(false);
    const [successUploadStores, setSuccessUploadStores] = useState(false)

    const [statesAPI, setStatesAPI] = useState(states)

    let navigate = useNavigate();

    //useEffect important
    
    const userid = currentUser.uid
    const appid = `LASRIC_${callupid}_${userid}`

    useEffect(() => {

        getApplicationData(appid, cohort).then(response => {

            if(response !== undefined ) {

                setForm1(response.data.personal.data);
                setStat(response.data.personal.status)
                setLoader(false);
                console.log(response)

            } else {

                setLoader(false)
                console.log("No document found!")

            }
        });


        


    }, []);

    // useEffect(() => {

    //     const STATES = states.map(e => {
    //         return {state : e.state, value : e.alias};
    //     })

    //     setStatesAPI(STATES)

        

    // }, []);

    
    

    useEffect(() => {

        const getStates = () => {

            document.getElementById('stateResidence').innerHTML = ''

            const ID = document.getElementById('stateResidence');
    
            if(ID !== null) {
                statesAPI.forEach(data => {
    
                    const node = document.createElement("option");
        
                    node.value = data.alias;
                    node.innerText = data.state
        
                    ID.appendChild(node)
        
                })
            }
    
        }
    
        getStates();

        const getStatesLGA = () => {

            document.getElementById('lgaResidence').innerHTML = '';

            if (form1.stateResidence !== ""){
    
                const res = states.filter((e) => {
                    return e.alias === form1.stateResidence
                })
    
            const IDL = document.getElementById('lgaResidence');
    
    
            if(IDL !== null) {
    
                res[0].lgas.forEach(data => {
    
                    const node = document.createElement("option");
        
                    console.log(data)
        
                    node.value = data.toLowerCase();
                    node.innerText = data
        
                    IDL.appendChild(node)
        
                    console.log(node)
        
                })
            }
            }
    
        }
    
        getStatesLGA();

    }, [form1.stateResidence]);

    //useeffect important

    const handleChange = (e) => {
  
        const {id, value} = e.target;

        setForm1(data => {

            return {
                ...data,
                [id] : value
            }
        })  
    
    }

    //handleChange
    
    const handleFiles = (e) => {

        const id = e.target.id
        const value = e.target.value

        const chk = uploadFiles.find(data => data.filename === `LASRIC_${id}.pdf`) || [];
        
        if (!chk.length > 0) {

            setuploadFiles( [...uploadFiles, { filename : `LASRIC_${id}.pdf`, target : e.target.files[0] } ] )

        } else {

            uploadFiles.find(( data, index ) => {

                if(data.filename === `LASRIC_${id}.pdf`){
                    
                    uploadFiles[index].target = e.target.files[0];
                    
                }
    
            })
        }  
        
        setForm1(data => {

            return {
                ...data,
                [id] : e.target.files[0].name || ""
            }

            
        })
    }

    const handleChooseFile = (e) => {

        var input = `input#${e.target.parentElement.id}`
        document.querySelector(input).click();

    }

    const handleFileUpload = async () => {


        uploadFiles.forEach( file => {

            const storage = getStorage();
            const storageRef = ref(storage, `${cohort}/${currentUser.uid}/${callupid}/${file.filename}` );

            //uploading to firebase begins
            uploadBytes(storageRef,file.target);

        if(uploadFiles.length) {
            
            setUploadingServer(true)

        }

    });

 }  

    const checkRequired = () => {

        console.log("checking required...")

        const inputs = document.querySelectorAll('input');
        const select = document.querySelectorAll('select');

        const inputForm = Array.from(inputs);
        const selectForm = Array.from(select);
        
        
        const inputError = inputForm.filter((item) => {

            return item.value === ""

        })

        const selectError = selectForm.filter((item) => {

            return item.value === ""

        })

        inputError.length && selectError.length ? alert("Sorry Errors, Fill All Inputs") : successSubmit();

    }

    const successSubmit = async () => {

        await handleFileUpload().then(e => console.log("done uploading"));

        setSuccessUploadStores(true);

        if(stat === 'pending') {

            await createApplication(callupid, userid, form1, track, cohort, currentUser.email, currentUser.phone ).then(()=>{
                
                window.localStorage.setItem("appid", true);
    
            })

        } else {
            updatePersonalApplication(appid, form1, cohort)
        }

        await navigate(`/application/${cohort}/innovation/${callupid}/vision`);



    }

    const handleSubmit = (e) => {

        e.preventDefault();
        checkRequired()

    }

    const manageFileView = (e) => {

        const id = e.target.parentElement.id;

        const storage = getStorage();
        const storageRef = ref(storage, `${cohort}/${currentUser.uid}/${callupid}/LASRIC_${id}.pdf` );

        getDownloadURL(storageRef).then((url) => {

            window.open(url)

        })
        
    }

    return (

        <div className="application innovation">

            {
                loader ? 
                
                (
                
                    <div className="loader">

                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_bujdzzfn.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />

                    </div>
                
                ) : null
            }

            {

                uploadingServer 
                ? 
                <div className="uploadingFiles">

                    <div className="cont">

                        {
                            !successUploadStores ? <SethAnimation jsonSrc={"https://assets6.lottiefiles.com/temp/lf20_xYfV1x.json"} lottieStyle = {{width: '200px', height: '200px'}} speed={"1"} /> : <SethAnimation jsonSrc={"https://assets1.lottiefiles.com/packages/lf20_wcnjmdp1.json"} lottieStyle = {{width: '200px', height: '200px'}} speed={"1"} />
                        }

                        <p> Uploading your PDF files to the Lagos State Science Research and Innovation Council (LASRIC) Servers </p>

                    </div>

                </div> : null

            }

            <div className="wrapper">
                
                <div className="body-section">
                    
                    {/*innovation form 1 breakdown*/}

                    <form id="form-innovation-1" className='lasric-apply-form'>
                    
                    <div className="details">
                        <label>
                        Gender <div className="notice req">*</div>
                        </label>

                        <select id="gender" name = "gender" onChange={handleChange} value = {form1.gender} required >

                        <option value="">-----Please Select-----</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>

                        </select>

                    </div>
                    <div className="details">
                        <label>
                        Are you a citizen of Nigeria?{" "}
                        <div className="notice req">*</div>
                        </label>
                        <select id="nationality" onChange={handleChange} value = {form1.nationality} required >
                        <option value="None">-----Please Select-----</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </select>
                    </div>
                    <div className="details">
                        <label>
                        Date of Birth <div className="notice req">*</div>
                        </label>
                        <input type="date" id="age" placeholder="Please Enter..." onChange={handleChange} value = {form1.age} required />
                    </div>
                    
                    <div className="details">
                        <label>
                        Linkedin Profile <div className="notice opt">*</div>
                        </label>
                        <input type="text" id="linkedin" placeholder="Please Enter..." value = {currentUser?.linkedinProfile} disabled/>
                    </div>

                    <div className="details">
                        <label>
                        State of Residence <div className="notice req">*</div>
                        </label>

                        <select required id="stateResidence" onChange={handleChange} value = {form1.stateResidence}> 

                            <option value = '' > ---- Select State ----  </option>
                        
                        </select>

                    </div>

                    <div className="details">
                        <label>
                        Local Govt. of Residence <div className="notice req">*</div>
                        </label>

                        <select required id="lgaResidence" onChange={handleChange} value = {form1.lgaResidence}> 

                            <option value = '' > ---- Select LGA ----  </option>
                        
                        </select>
                    </div>

                    {/* file upload */}

                    <div className="details">

                        <label>Valid means of identification (LASRRA Card is acceptable) <div className="notice req">*</div></label>

                        <input type="file" id="idCard" accept="application/pdf" onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="idCard"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.idCard || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>
                        
                    </div>

                    
                    

                    
                    
                    <div className="details">

                        <label>
                        Select a target area
                        <div className="notice req">*</div>
                        </label>

                            <select required id="targetArea" onChange={handleChange} value = {form1.targetArea}>
                            <option value="">-----Please Select-----</option>
                            <option value="agriculture">Agriculture (Production and Wate Reuse)</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="greenEnergy">Green Energy</option>
                            <option value="HealthCare">HealthCare</option>

                        </select>

                    </div>
                    <div className="details">
                        <label>
                        Have you ever received a grant for this business or idea from LASRIC?{" "}
                        <div className="notice req">*</div>
                        </label>
                        <select required id="lasricGrant" onChange={handleChange} value = {form1.lasricGrant}>
                        <option value="">-----Please Select-----</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        </select>
                    </div>

                    <div className="details">
                        <label>
                        Company Name <div className="notice req">*</div>
                        </label>
                        <input required type="text" id="company" placeholder="Please Enter..." onChange={handleChange} value = {form1.company}/>
                    </div>

                    <div className="details">
                        <label>
                        Company Website. if any? <div className="notice req">*</div>
                        </label>
                        <input required type="text" id="website" placeholder="https://" onChange={handleChange} value = {form1.website}/>
                    </div>

                    <div className="details">
                        <label>
                        When was the company founded{" "}
                        <div className="notice req">*</div>
                        </label>
                        <input required type="text" id="companyDate" placeholder="Please Enter..." onChange={handleChange} value = {form1.companyDate}/>
                    </div>

                    <div className="details">
                        <label>
                        Which of the following sectors does your company belong to?{" "}
                        <div className="notice req">*</div>
                        </label>
                        <select id="companySector" onChange={handleChange} value = {form1.companySector} required >
                        <option value="">-----Please Select-----</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="education">Education</option>
                        <option value="health">Health</option>
                        <option value="transportation">Transportation</option>
                        <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="details">
                        <label>
                        What's your business model? (B2B, B2C, B2G B2B2C etc.){" "}
                        <div className="notice req">*</div>
                        </label>

                        <select required id="bizModel" onChange={handleChange} value = {form1.bizModel}>

                            <option value = 'b2c'>B2C</option>
                            <option value = 'b2b'>B2B</option>
                            <option value = 'b2g'>B2G</option>
                            <option value = 'b2b2c'>B2B2C</option>

                        </select>

                    </div>

                    <div className="details">
                        <label>
                        What stage is your startup in? (Idea, Pre-Seed, Seed, Growth, Scale){" "}
                        <div className="notice req">*</div>
                        </label>

                        <select required id="bizStage" onChange={handleChange} value = {form1.bizStage}>

                            <option value = 'idea'>Idea</option>
                            <option value = 'preseed'>Pre-Seed</option>
                            <option value = 'seed'>Seed</option>
                            <option value = 'growth'>Growth</option>
                            <option value = 'scale'>Scale</option>

                        </select>

                    </div>

                    <div className="details">

                        <label>
                        Is your company incorporated? If yes, please upload certificate of
                        incorporation <div className="notice req">*</div>
                        </label>

                        <input required type="file" id="cacCert" accept="application/pdf" onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="cacCert"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.cacCert || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>

                    </div>

                    


                    <div className="details">
                        <label>
                        Kindly provide evidence of payment of annual returns till date.
                        <div className="notice opt">optional</div>
                        </label>
                        
                        <input type="file" id="annualReturns" accept="application/pdf"  onChange={handleFiles} hidden />
                        
                        <div className="fileUploaded" id="annualReturns"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.annualReturns || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>
                    </div>


                    <div className="details">
                        <label>
                        What’s your role in the organisation{" "}
                        <div className="notice req">*</div>
                        </label>
                        <select required id="orgRole" onChange={handleChange} value = {form1.orgRole}>
                        <option value="">-----Please Select-----</option>
                        <option value="idea-owner">Idea Owner?</option>
                        <option value="team-member">Team Member</option>
                        <option value="other">Other?</option>
                        </select>
                    </div>
                    

                    {
                        stat === "pending" ? 
                        <button id="form-proceed" onClick={handleSubmit}>
                            Save & Proceed
                        </button> :
                        <button id="form-proceed completed" style={{backgroundColor : "green"}} onClick={(e) => e.preventDefault()} >
                            Submitted
                        </button>
                    }

                    </form>
                </div>
                </div>

            
        </div>

    );
}

export default Innovation;

