import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { updateStemApplication } from '../../api/firebase/handleStemSubmits';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getApplicationData, updateResearchProject } from '../../api/firebase/handleResearchSubmit';

const ResearchProject = ({currentUser}) => {

    const [form2, setForm2] = useState({} )

    const params = useParams()

    const [loader, setLoader] = useState(true);
    const [errors, setErrors] = useState([]);
    const [stat, setStat] = useState('pending')

    const pageDetect = useLocation().pathname
    const callupid = params.callid
    const track = pageDetect.split("/")[3]
    const cohort = params.cohort

    const userid = currentUser.uid;

    const appid = `LASRIC_${callupid}_${userid}`;

    const [progress, setProgress] = useState(0);

    let navigate = useNavigate()

    //useeffect important

    useEffect(() => {

        getApplicationData(appid, cohort).then(response => {

            if(response !== null) {

                setForm2(response.data.project.data);
                setLoader(false);

                if( response.data.project.status === "completed" ) {

                    setProgress(response.progress)

                } else {
                    setProgress ( response.progress + 25 )
                }

            } else {

                setLoader(false)

            }
        });
        
    }, []);

    


    const handleChange = (e) => {

        const {id, value} = e.target;
        const g = value.split(" ");

        if (g.length > 150) {

            alert('Sorry, you cannot input above 150 words.')

        } else {

            setForm2(data => {

                return {
                  ...data,
                  [id] : value
                }
            })
        } 
    
    } 

    const checkRequired = () => {

        console.log("checking required...")

        const inputs = document.querySelectorAll('textarea');

        const inputForm = Array.from(inputs);
        
        const inputError = inputForm.filter((item) => {

            return item.value === ""

        })

        inputError.length ? alert("errors") : successSubmit();

    }

    const successSubmit =async () => {

        updateResearchProject(appid, form2, cohort, progress)

        await navigate(`/application/${cohort}/research/${callupid}/result`);

    }


    const handleSubmit = (e) => {

        e.preventDefault();
        checkRequired()
        console.log("handling submit")

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

            <div className="wrapper">

                <div className="body-section">

                    <form className='lasric-apply-form' onSubmit={handleSubmit}>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor="">Project</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">
                                <label for="">Project Title </label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="projectTitle"  onChange={handleChange} value={form2.projectTitle}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">Executive Summary</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="executiveSummary" onChange={handleChange} value={form2.executiveSummary}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">Introduction</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="introduction" onChange={handleChange} value={form2.introduction}></textarea>
                            </div>   
                            

                            <div className="sub-section">
                                <label for="">Problem Statement/Justification/Conceptual framework</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="problemStatement" onChange={handleChange} value={form2.problemStatement}></textarea>
                            </div>   


                            <div className="sub-section">
                                <label for="">Objective(s) of the Study</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="objectives" onChange={handleChange} value={form2.objectives}></textarea>
                            </div>  

                            <div className="sub-section">
                                <label for=""> Literature Review </label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="literature" onChange={handleChange} value={form2.literature}></textarea>
                            </div>  

                            <div className="sub-section">
                                <label for=""> Methodology </label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="methodology" onChange={handleChange} value={form2.methodology}></textarea>
                            </div>  


                            <button className="submitArea" onClick={() => handleSubmit}> Submit & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default ResearchProject;
