import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { updateStemExperienceApplication } from '../../api/firebase/handleStemSubmits';
import { useLocation, useParams } from 'react-router-dom';
import Stemtr from '../../components/tabletr/stemtr';
import ResearchTR from '../../components/tabletr/researchTR';
import ResearchTRP from '../../components/tabletr/researchTRP';
import { getApplicationData, updateBudgetApplication } from '../../api/firebase/handleResearchSubmit';

const ResearchBudget = ({currentUser}) => {

    const [form2, setForm2] = useState({ 

        activity : { activity1 : {activity : "", result : ""} },
        budget : { budget1 : {item : "", amount : "", total : ""} },

    } );


    const params = useParams()


    const [loader, setLoader] = useState(true);
    const [errors, setErrors] = useState([]);
    const [stat, setStat] = useState('pending')
    const [tableTR, setTableTR] = useState({activity : []})
    const [tableTRP, setTableTRP] = useState({budget : []})

    const pageDetect = useLocation().pathname
    const callupid = params.callid
    const track = pageDetect.split("/")[3]
    const cohort = params.cohort

    const userid = currentUser.uid;
    const appid = `LASRIC_${callupid}_${userid}`;

    const [progress, setProgress] = useState(0);

    //useeffect important

    useEffect(() => {

        getApplicationData(appid, cohort).then(response => {

            if(response !== null) {

                setForm2(response.data.budget.data);
                setLoader(false);

                if( response.data.budget.status === "completed" ) {

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

    const addTableTRP = (e, key) => {

        e.preventDefault();

        const {name, id, value} = e.target;

        const gh = Object.keys(form2.budget).length

        const newKey = `budget${gh+1}`

        setForm2(data => {

            return {
              ...data,
              budget : form2.budget ? {...form2.budget, [newKey] : {item : '', amount: '', total : '' } } : []
            }
        })
        

    }

    const handleTableDelete = async (e, val) => {

        const del = document.querySelector(`table #activity-row-${e.target.id}`);
        //del.remove();
        form2.activity[val].status = 'deleted';
        del.style.display = 'none';
    }


    const handleTableDeleteBudget = async (e, val) => {

        const del = document.querySelector(`table #budget-row-${e.target.id}`);
        //del.remove();
        form2.budget[val].status = 'deleted';
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

    const handleBudget = (e) => {

        const {name, id, value} = e.target;

        setForm2(data => {

            return {
              ...data,
              budget : form2.budget ? {...form2.budget, [name] : { ...form2.budget[name], [id] : value } } : []
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

    const successSubmit = () => {

        updateBudgetApplication(appid, form2, cohort, progress)

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
                                <label htmlFor="">Budget & Timelines</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label>
                                Results (Expected Outputs/Results)
                                </label>
                                
                                <table className="team-table" style = { {border:'none'} } > 

                                    <tr>
                                        <th>Activity</th>
                                        <th> Time (Months) </th>
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


                            <div className="sub-section">

                                <label>
                                Budget (Provide a budget break-down by activity/line item)
                                </label>
                                
                                <table className="team-table" style = { {border:'none'} } > 

                                     <tr>

                                        <th>Description of Item</th>
                                        <th> Amount </th>
                                        <th>Total</th>

                                    </tr>
                                    
                                    <tr className="team-table-row team-table-row-1">

                                        <td> <input name = "budget1" required type="text" id="item" onChange={handleBudget}  value = {form2.budget.budget1.item} />  </td>
                                        <td> <input name = "budget1" required type="text" id="amount" onChange={handleBudget} value = {form2.budget.budget1.amount} /> </td>
                                        <td> <input name = "budget1" required type="text" id="total" onChange={handleBudget} value = {form2.budget.budget1.total} /> </td>

                                        <td style={{width:'10%', textAlign : 'center', padding :0, border:'none' }}> </td>

                                    </tr>

                                    {
                                        Object.keys(form2.budget).length > 1 && tableTRP.budget.length == 0 ? Object.keys(form2.budget).map( (budget, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <ResearchTRP deleted = {handleTableDeleteBudget} customName="budget" data = {form2.budget} bill = {budget} index = {index} key = {index} change = {handleBudget} />
                                            }
                                        } ) : null
                                    }


                                    <div class="add-btn" onClick={(e) => addTableTRP(e, "activity")} >
                                        <button className="add-button add-team">+ Add Budget</button>
                                    </div>
            
                                </table>

                            </div>

                            <div className="sub-section">
                                <label for="">Financial /other control measures (Institutional, Researchers/individual)</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="financialMeasures" onChange={handleChange} value={form2.financialMeasures}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">Environmental impact (Social/physical/health etc)</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="environmentalImpact" onChange={handleChange} value={form2.environmentalImpact}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">References</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="references" onChange={handleChange} value={form2.references}></textarea>
                            </div>
                            
                            <button className="submitArea" onClick={() => handleSubmit}> Submit & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default ResearchBudget;
