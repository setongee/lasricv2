import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { getApplicationData, updateStemRelevanceApplication } from '../../api/firebase/handleStemSubmits';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Stem3 = ({currentUser}) => {

    const initialData = {

        adoptionEase: "",
        need: "",
        workAround: ""

    }

    const [form2, setForm2] = useState({});
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

                setForm2(response.data.relevance.data);
                setLoader(false);

                if( response.data.relevance.status === "completed" ) {

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

        updateStemRelevanceApplication(appid, form2, cohort, progress).then( () => navigate(`/application/${cohort}/stem/${callupid}/impact`))
        

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
                                <label htmlFor="">Relevance & Proposition</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">
                                <label for="">1. How relevant is your solution to the LASRIC focus area(s) you’ve selected above? </label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="relevance"  onChange={handleChange} value={form2.relevance}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">2. Explain your value proposition?</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="exactSoln" onChange={handleChange} value={form2.exactSoln}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">3. Who are your target customers and how many do you have now?</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="targetCustomers" onChange={handleChange} value={form2.targetCustomers}></textarea>
                            </div>   
                            
                            <button className="submitArea" onClick={() => handleSubmit}> Submit & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default Stem3;
