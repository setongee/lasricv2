import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { updateStemExperienceApplication } from '../../api/firebase/handleStemSubmits';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Stemtr from '../../components/tabletr/stemtr';
import ResearchTR from '../../components/tabletr/researchTR';
import { getApplicationData, updateResearchResultApplication } from '../../api/firebase/handleResearchSubmit';

const ResearchResults = ({currentUser}) => {

    const [form2, setForm2] = useState({ 

        activity : { activity1 : {activity : "", result : ""} }

    } );

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

    const [tableTR, setTableTR] = useState({activity : []})

    const [progress, setProgress] = useState(0);

    let navigate = useNavigate()

    //useeffect important

    useEffect(() => {

        getApplicationData(appid, cohort).then(response => {

            if(response !== null) {

                setForm2(response.data.results.data);
                setLoader(false);

                if( response.data.results.status === "completed" ) {

                    setProgress(response.progress)

                } else {
                    setProgress ( response.progress + 25 )
                }

            } else {

                setLoader(false)

            }
        });
        
    }, []);


    const addTableTR = (e, key) => {

        e.preventDefault();

        const {name, id, value} = e.target;

        const gh = Object.keys(form2.activity).length

        const newKey = `activity${gh+1}`

        setForm2(data => {

            return {
              ...data,
              activity : form2.activity ? {...form2.activity, [newKey] : {activity : '', result: '' } } : []
            }
        })
        

    }

    const handleTableDelete = async (e, val) => {

        const del = document.querySelector(`table #activity-row-${e.target.id}`);
        //del.remove();
        form2.activity[val].status = 'deleted';
        del.style.display = 'none';
    }


    const handleChange = (e) => {

        const {id, value} = e.target;
        const g = value.split(" ");

        if (g.length > 200) {

            alert('Sorry, you cannot input above 200 words.')

        } else {

            setForm2(data => {

                return {
                  ...data,
                  [id] : value
                }
            })
        } 

       
    
    } 

    const handleTeam = (e) => {

        const {name, id, value} = e.target;

        setForm2(data => {

            return {
              ...data,
              activity : form2.activity ? {...form2.activity, [name] : { ...form2.activity[name], [id] : value } } : []
            }
        })

    }

    const checkRequired = () => {

        

        const inputs = document.querySelectorAll('textarea');

        const inputForm = Array.from(inputs);
        
        const inputError = inputForm.filter((item) => {

            return item.value === ""

        })

        inputError.length ? alert("errors") : successSubmit();

    }

    const successSubmit = async () => {

        updateResearchResultApplication(appid, form2, cohort, progress).then(
            () => navigate(`/application/${cohort}/research/${callupid}/budget`)
        )

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
                                <label htmlFor="">Results</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label>
                                Results (Expected Outputs/Results)
                                </label>
                                
                                <table className="team-table" style = { {border:'none'} } > 

                                    <tr>
                                        <th>Activity</th>
                                        <th>Expected Results</th>
                                    </tr>
                                    
                                    <tr className="team-table-row team-table-row-1">

                                        <td> <input name = "activity1" required type="text" id="activity" onChange={handleTeam}  value = {form2.activity.activity1.activity} />  </td>
                                        <td> <input name = "activity1" required type="text" id="result" onChange={handleTeam} value = {form2.activity.activity1.result} /> </td>

                                        <td style={{width:'10%', textAlign : 'center', padding :0, border:'none' }}> </td>

                                    </tr>

                                    {
                                        Object.keys(form2.activity).length > 1 && tableTR.activity.length == 0 ? Object.keys(form2.activity).map( (activity, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <ResearchTR deleted = {handleTableDelete} customName="activity" data = {form2.activity} bill = {activity} index = {index} key = {index} change = {handleTeam} />
                                            }
                                        } ) : null
                                    }


                                    <div class="add-btn" onClick={(e) => addTableTR(e, "activity")} >
                                        <button className="add-button add-team">+ Add Activity</button>
                                    </div>
            
                                </table>

                            </div>

                            
                            <button className="submitArea" onClick={() => handleSubmit}> Submit & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default ResearchResults;
