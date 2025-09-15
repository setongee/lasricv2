import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { createStemApplication, getApplicationData, updateStemPersonalApplication  } from '../../api/firebase/handleStemSubmits';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Stem1 = ({currentUser}) => {

    const [form2, setForm2] = useState({})

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

    let navigate = useNavigate();

    //useeffect important

    useEffect(() => {

        getApplicationData(appid, cohort).then(response => {

            if(response !== undefined ) {

                setForm2(response.data.personal.data);
                setStat(response.data.personal.status)
                setLoader(false);

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

    const successSubmit = async () => {

        if(stat === 'pending') {

            await createStemApplication(callupid, userid, form2, track, cohort, 16.67, currentUser.email, currentUser.phone).then(()=>{
                
                window.localStorage.setItem("appid", true)
    
            })

        } else {
            updateStemPersonalApplication(appid, form2, cohort, 16.67)
        }

        await navigate(`/application/${cohort}/stem/${callupid}/problem`);;

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
                                <label htmlFor="">Personal</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                1. Company Name
                                </label>

                                <textarea id="companyName" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.companyName} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                2. What is the Title of your STEM Solution (50 words)
                                </label>

                                <textarea id="stemTitle" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.stemTitle} />

                            </div>

                            <div className="sub-section">

                                <label for="">3. Which of these key areas does your solution target?</label>

                                <select name="" id="keyArea" required  value = {form2.keyArea} onChange={handleChange}>
                                    <option value="None">----------Select----------</option>
                                    <option value="STEM for Teachers (including teachers training)">STEM for Teachers (including teachers training)</option>
                                    <option value="Demystifying STEM – Early learners (up to Primary Schools)">Demystifying STEM – Early learners (up to Primary Schools)</option>
                                    <option value="Demystifying STEM – Secondary Schools / Teenagers">Demystifying STEM – Secondary Schools / Teenagers</option>
                                    <option value="STEM for Out of School Youth">STEM for Out of School Youth </option>
                                    <option value="STEM Content made easy">STEM Content made easy</option>
                                    <option value="Technology application in STEM">Technology application in STEM</option>
                                </select>

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    4. How do you intend to track your progression to success over time?
                                </label>

                                <textarea id="trackSuccess" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.trackSuccess} />

                            </div>
                            
                            
                            <button className="submitArea" onClick={() => handleSubmit}> Submit & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default Stem1;
