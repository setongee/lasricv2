import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { updateApplication, getApplicationData } from '../../api/firebase/handleSubmits';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Innovation2 = ({currentUser}) => {

    const initialData = {

        howBig: "",
        howMoney: "",
        problem: "",
        solnDesc: "",
        uniqVal: "",
        workAround: ""

    }

    const [form2, setForm2] = useState(initialData);

    const params = useParams()
    const [uploadFiles, setuploadFiles] = useState([])
    const [loader, setLoader] = useState(true);
    const [errors, setErrors] = useState([]);

    const pageDetect = useLocation().pathname
    const callupid = params.callid
    const userid = currentUser.uid;
    const track = pageDetect.split("/")[3]
    const cohort = params.cohort

    const appid = `LASRIC_${callupid}_${userid}`;

    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    //useeffect important

    useEffect(() => {

        getApplicationData(appid, cohort).then(response => {

            if(response !== null) {

                setForm2(response.data.vision.data);
                setLoader(false);

                if( response.data.vision.status === "completed" ) {

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
        
        console.log(form2)
    
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

    const successSubmit = () => {

        updateApplication(appid, form2, cohort, progress)
        .then(() => navigate(`/application/${cohort}/innovation/${callupid}/proposition`));

        console.log("success")
        

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
                                <label htmlFor="">Vision</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    1. What is the problem/need of your target customer that you are trying to solve? (100 words maximum)
                                </label>

                                <textarea id="problem" rows={5} placeholder="Please Enter..." onChange={handleChange} value = {form2.problem} />

                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                2. How big is this problem? Please give figures from verifiable sources.
                                </label>
                                <textarea
                                id="howBig"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.howBig}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                3. What are people currently doing to deal with this problem?
                                </label>
                                <textarea
                                id="workAround"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.workAround}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                4. Briefly describe your proposed solution in terms of the activities,
                                product or service you will provide
                                </label>
                                <textarea
                                id="solnDesc"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.solnDesc}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">5. What makes your startup’s solution unique?</label>
                                <textarea
                                id="uniqVal"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.uniqVal}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                6. How does or will your startup make money by solving this problem?
                                </label>
                                <textarea
                                id="howMoney"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.howMoney}
                                />
                            </div>
                            
                            <button className="submitArea" onClick={() => handleSubmit}> Save & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default Innovation2;
