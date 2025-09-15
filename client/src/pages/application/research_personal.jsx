import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { createStemApplication, updateStemPersonalApplication  } from '../../api/firebase/handleStemSubmits';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createResearchApplication, getApplicationData } from '../../api/firebase/handleResearchSubmit';

const ResearchPersonal = ({currentUser}) => {

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

            if (response !== undefined) {

                setForm2(response.data.personal.data);
                setStat(response.data.personal.status)
                setLoader(false);

            } else{
                setLoader(false);
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


            await createResearchApplication(callupid, userid, form2, track, cohort, currentUser.email, currentUser.phone).then(()=>{
                
                window.localStorage.setItem("appid", true)
    
            })

        } else {
            updateStemPersonalApplication(appid, form2, cohort)
        }

        await navigate(`/application/${cohort}/research/${callupid}/project`);

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
                                    Institution
                                </label>

                                <input id="institution" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.institution} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                Department
                                </label>

                                <input id="department" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.department} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                Co-Researchers (if any)
                                </label>

                                <textarea id="coResearchers" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.coResearchers} />

                            </div>
                            
                            
                            <button className="submitArea" onClick={() => handleSubmit}> Submit & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default ResearchPersonal;
