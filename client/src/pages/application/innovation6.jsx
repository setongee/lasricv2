import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { updateMilestonesApplication, getApplicationData} from '../../api/firebase/handleSubmits';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const Innovation4 = ({currentUser}) => {

    const [form2, setForm2] = useState({ 

        costing : { costing1 : {cost : "", driver : ""} }

    } );


    const params = useParams()

    const [loader, setLoader] = useState(true);
    const [errors, setErrors] = useState([]);

    const pageDetect = useLocation().pathname
    const callupid = params.callid
    const track = pageDetect.split("/")[3]
    const cohort = params.cohort

    console.log(form2)

    const userid = currentUser.uid;

    const appid = `LASRIC_${callupid}_${userid}`;

    const navigate = useNavigate();

    const [progress, setProgress] = useState(0)

    //useeffect important

    useEffect(() => {

        getApplicationData(appid, cohort).then(response => {

            if(response !== null) {

                setForm2(response.data.milestones.data);
                setLoader(false);

                if( response.data.milestones.status === "completed" ) {

                    setProgress(response.progress)

                } else {
                    setProgress ( response.progress + 16.67 )
                }

            } else {

                setLoader(false)

            }
        });
        
    }, []);

    const handleChange = (e) => {

        const {id, value} = e.target;
        const g = value.split(" ");

        if (g.length > 100) {

            alert('Sorry, you cannot input above 100 words.')

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

        //console.log("checking required...")

        const inputs = document.querySelectorAll('textarea');

        const inputForm = Array.from(inputs);
        
        const inputError = inputForm.filter((item) => {

            return item.value === ""

        })

        inputError.length ? alert("errors") : successSubmit();

    }

    const successSubmit = () => {

        updateMilestonesApplication(appid, form2, cohort, progress)

        console.log("success")
        

    }


    const handleSubmit = (e) => {

        e.preventDefault();
        checkRequired()

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
                                <label htmlFor="">Milestones</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                1. How do you intend to track your progression to success over time?
                                </label>

                                <textarea id="trackSuccess" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.trackSuccess} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                2. Do you have a clear evidence that your customer segments find value in your startup’s solution?
                                </label>

                                <textarea id="custValEvidence" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.custValEvidence} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                3. Is there any evidence of a decreasing CAC with a growing customer base buying your products at target price?
                                </label>

                                <textarea id="decrCACEvidence" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.decrCACEvidence} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                4. Do you have products built for scale with strong customer product feedback in multiple markets?
                                </label>

                                <textarea id="scaleProd" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.scaleProd} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                5. Has your startup delivered a minimum 2x revenue growth for multiple years.
                                </label>

                                <textarea id="min2Rev" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.min2Rev} />

                            </div>

                            

                           
                            
                            
                            
                            <button className="submitArea" onClick={() => handleSubmit}> Save & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default Innovation4;
