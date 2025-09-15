import React, {useState, useEffect} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Stemtr from '../../components/tabletr/stemtr';

import '../researchAPP.scss'

import { getApplication } from '../../api/firebase/getApplication';
import { updateGrade, getApplicationGrades } from '../../api/firebase/council-applications';

import SethAnimation from '../../components/lottie/seth-animation';
import GradingTableTR from '../../components/tabletr/gradingTableTR';
import GradingResearchTR from '../../components/tabletr/gradingResearchTR';
import ResearchTRP2 from '../../components/tabletr/gradingResearch3';

const GradeResearch = ({councilProfile}) => {

    const Navigate = useNavigate();

        const formData23 = {

            personal : {

                status : 'completed',
                data : {
                    coResearchers : '',
                    department : '',
                    institution : ""
                }

            },
            project : {

                status : 'pending',
                data : {}

            },
            results : {

                status : 'pending',
                data : {
                    activity : { activity1 : {activity : "", result : ""} }
                }

            },
            budget : {

                status : 'pending',
                data : {
                    activity : { activity1 : {activity : "", result : ""} },
                    budget : { budget1 : {item : "", amount : "", total : ""} }
                }

            }

        }

        const [form2, setForm2] = useState(formData23)
        const pageDetect = useLocation().pathname
        const rip = pageDetect.split("/")[6]

        const [tableTR, setTableTR] = useState({team : []})

        const [gradeScore, setGradeScore] = useState(0);
        

        const [score, setScore] = useState({

            problem : '',
            coResearchers : '',
            title : '',
            execSummary : '',
            intro : '',
            probState : '',
            obj : '',
            lite : '',
            meth : '',
            res : '',
            resultsGrade : '',
            budgetGrade : '',
            financials : '',
            environmentalImpact : '',
            ref : ''

        })

        const handleGradeChange = (e) => {

            const {id, value} = e.target;

            const max = Number(e.target.dataset.max);

            if (value !== "") {

                var numbers = /^[-+]?[0-9]+$/;
        
                if (!value.match(numbers)){

                    alert('Please input only numbers to grade application')
                
                }                
            }

            if (value > max){

                alert(`Grade for this area connot be above ${max} marks`)

            } else {

                setScore(scores => {

                    return {
                    ...scores,
                    [id] : value
                    }
                })

            }
                                
        }

        const [loadSubmit, setLoadSubmit] = useState(false)

        useEffect(() => {

            const milk = document.querySelectorAll('textarea');
            const milo = Array.from(milk)

            milo.forEach(e => {
                e.disabled = true
            })

            const select = document.querySelectorAll('select');
            const sect = Array.from(select)

            sect.forEach(e => {
                e.disabled = true
            })

            getApplication(rip).then(response => {

                if(response !== null ) {

                    setForm2(response.data);

                }
            });

            //get gradings

            getApplicationGrades(rip)
            .then( data => {

                if (data.length) {

                    const result = data[0].grades[councilProfile.uid].gradings;
                    setScore(result)

                } 
            } )
            
        }, []);

        useEffect(() => {
            
            updateScore();

        }, [score]);


        const handleTableDelete = async (e, val) => {

            const del = document.querySelector(`table #team-row-${e.target.id}`);
            //del.remove();
            form2.team[val].status = 'deleted';
            del.style.display = 'none';
        }


        const handleTeam = (e) => {

            const {name, id, value} = e.target;

            setForm2(data => {

                return {
                ...data,
                team : form2.team ? {...form2.team, [name] : { ...form2.team[name], [id] : value } } : []
                }
            })

        }


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
        
        const updateScore = () => {

            const dip = Object.values(score).reduce((a, b) => Number(a) + Number(b));
            setGradeScore(dip);

        }

        const handleSubmitGrade = async () => {

            await updateGrade(rip, gradeScore, councilProfile.uid, score).then(() => Navigate('/council'))

        }



        return (

            <div className="gradingApplication newSeth">

                {
                    loadSubmit ? (

                        <div className="loaderScreen">

                        <SethAnimation jsonSrc={"https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />
                        
                    </div>

                    ) : null
                }

                <div className="liveScore">

                    <div className="score">

                            Your Grading

                            <h1>{gradeScore}%</h1>

                    </div>

                    {
                        score.problem !== '' && score.coResearchers !== '' && score.title !== '' && score.execSummary !== '' && score.intro !== '' && score.probState !== '' && score.obj !== '' && score.lite !== '' && score.meth !== '' && score.res !== '' && score.resultsGrade !== '' && score.budgetGrade !== '' && score.financials !== '' && score.environmentalImpact !== '' && score.ref !== '' 
                        
                        ? 
                        
                        <div className="activity" onClick={()=>handleSubmitGrade()}> Submit Grading </div>
                        
                        : 
                        
                        <div className="activity" onClick={()=>handleSubmitGrade()}> Submit Grading </div>
                    }

                </div>

                <div className="applicationStem">

                    <div className="application innovation custom-grade">

                        <div className="body-section">

                            <form className='lasric-apply-form gradingPart'>

                                <div className="sections">

                                    <div className="sub-section">
                                        <label >1. Institution </label>
                                        <input id="institution" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.personal.data.institution} />

                                    </div>

                                    <div className="sub-section">
                                        <label >2. Department</label>
                                        <input id="department" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.personal.data.department} />
                                    </div>   

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "problem" onChange={handleGradeChange} value = {score.problem || ""} data-max = { Number("5") }/>

                                    </div>
                                    
                                </div>

                                <div className="sections">

                                    <div className="sub-section">

                                        <label>
                                            Co-Researchers (if any)
                                        </label>

                                        <textarea id="coResearchers" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.personal.data.coResearchers} />
                                    
                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "coResearchers" onChange={handleGradeChange} value = {score.coResearchers} data-max = { Number("5") } />
                            
                                    </div>

                                </div>

                                <div className="sections">

                                    <div className="sub-section">
                                        <label>Project Title </label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="projectTitle"  onChange={handleChange} value={form2.project.data.projectTitle}></textarea>
                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 10)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "title" onChange={handleGradeChange} value = {score.title} data-max = { Number("10") } />
                            
                                    </div>  
                                    
                                </div> 

                                <div className="sections">

                                    <div className="sub-section">
                                        <label for="">Executive Summary</label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="executiveSummary" onChange={handleChange} value={form2.project.data.executiveSummary}></textarea>
                                    </div>
                                    
                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 10)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "execSummary" onChange={handleGradeChange} value = {score.execSummary} data-max = { Number("10") } />
                            
                                    </div>

                                </div>

                                <div className="sections">

                                    <div className="sub-section">
                                        <label for="">Introduction</label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="introduction" onChange={handleChange} value={form2.project.data.introduction}></textarea>
                                    </div>   

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "intro" onChange={handleGradeChange} value = {score.intro} data-max = { Number("5") } />
                            
                                    </div>
                                    
                                </div>

                                <div className="sections">

                                    <div className="sub-section">
                                        <label for="">Problem Statement/Justification/Conceptual framework</label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="problemStatement" onChange={handleChange} value={form2.project.data.problemStatement}></textarea>
                                    </div>   

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "probState" onChange={handleGradeChange} value = {score.probState} data-max = { Number("5") } />
                            
                                    </div>

                                </div>
                                    
                                <div className="sections">

                                    <div className="sub-section">
                                        <label for="">Objective(s) of the Study</label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="objectives" onChange={handleChange} value={form2.project.data.objectives}></textarea>
                                    </div>  

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "obj" onChange={handleGradeChange} value = {score.obj} data-max = { Number("5") } />
                            
                                    </div>

                                </div>
                                    
                                <div className="sections">

                                    <div className="sub-section">
                                        <label for=""> Literature Review </label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="literature" onChange={handleChange} value={form2.project.data.literature}></textarea>
                                    </div>  

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "lite" onChange={handleGradeChange} value = {score.lite} data-max = { Number("5") } />
                            
                                    </div>
                                    
                                </div>

                                <div className="sections">

                                    <div className="sub-section">
                                        <label for=""> Methodology </label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="methodology" onChange={handleChange} value={form2.project.data.methodology}></textarea>
                                    </div> 

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 10)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "meth" onChange={handleGradeChange} value = {score.meth} data-max = { Number("10") } />
                            
                                    </div>

                                </div>   

                                <div className="sections">

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

                                                <td> <input name = "activity1" required type="text" id="activity" onChange={handleTeam}  value = {form2.results.data.activity.activity1.activity} disabled />  </td>
                                                <td> <input name = "activity1" required type="text" id="result" onChange={handleTeam} value = {form2.results.data.activity.activity1.result} disabled/> </td>
                                
                                            </tr>

                                            {
                                                Object.keys(form2.results.data.activity).length > 1 && tableTR.team.length == 0 ? Object.keys(form2.results.data.activity).map( (active, index) => {
                                                    if(index === 0) {
                                                        return null
                                                    } else {
                                                        return <GradingResearchTR deleted = {handleTableDelete} customName="activity" data = {form2.results.data.activity} bill = {active} index = {index} key = {index} change = {handleTeam} />
                                                    }
                                                } ) : null
                                            }
                    
                                        </table>

                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 15)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "res" onChange={handleGradeChange} value = {score.res} data-max = { Number("15") } />
                            
                                    </div>


                                </div>

                                <div className="sections">

                                    <div className="sub-section">

                                        <label>
                                        Results (Expected Outputs/Results)
                                        </label>
                                        
                                        <table className="team-table" style = { {border:'none'} } > 

                                            <tr>
                                                <th>Activity</th>
                                                <th>Time (Months)</th>
                                            </tr>
                                            
                                            <tr className="team-table-row team-table-row-1">

                                                <td> <input name = "activity1" required type="text" id="activity" onChange={handleTeam}  value = {form2.budget.data.activity.activity1.activity} disabled />  </td>
                                                <td> <input name = "activity1" required type="text" id="result" onChange={handleTeam} value = {form2.budget.data.activity.activity1.result} disabled/> </td>
                                
                                            </tr>

                                            {
                                                Object.keys(form2.budget.data.activity).length > 1 && tableTR.team.length == 0 ? Object.keys(form2.budget.data.activity).map( (active, index) => {
                                                    if(index === 0) {
                                                        return null
                                                    } else {
                                                        return <GradingResearchTR deleted = {handleTableDelete} customName="activity" data = {form2.budget.data.activity} bill = {active} index = {index} key = {index} change = {handleTeam} />
                                                    }
                                                } ) : null
                                            }
                    
                                        </table>

                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 15)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "resultsGrade" onChange={handleGradeChange} value = {score.resultsGrade} data-max = { Number("15") } />
                            
                                    </div>


                                </div>

                                <div className="sections">

                                    <div className="sub-section">

                                        <label>
                                        Budget (Provide a budget break-down by activity/line item)
                                        </label>
                                        
                                        <table className="team-table" style = { {border:'none'} } > 

                                            <tr>

                                                <th>Description of Item</th>
                                                <th> Amount (N)  </th>
                                                <th>Total (N) </th>

                                            </tr>
                                            
                                            <tr className="team-table-row team-table-row-1">

                                                <td> <input name = "budget1" required type="text" id="item" value = {form2.budget.data.budget.budget1.item} />  </td>
                                                <td> <input name = "budget1" required type="text" id="amount" value = {form2.budget.data.budget.budget1.amount} /> </td>
                                                <td> <input name = "budget1" required type="text" id="total" value = {form2.budget.data.budget.budget1.total} /> </td>

                                            </tr>

                                            {
                                                Object.keys(form2.budget.data.budget).length > 1 ? Object.keys(form2.budget.data.budget).map( (budget, index) => {
                                                    if(index === 0) {
                                                        return null
                                                    } else {
                                                        return <ResearchTRP2 customName="budget" data = {form2.budget.data.budget} bill = {budget} index = {index} key = {index} />
                                                    }
                                                } ) : null
                                            }
                    
                                        </table>

                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 10)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "budgetGrade" onChange={handleGradeChange} value = {score.budgetGrade} data-max = { Number("10") } />
                            
                                    </div>

                                </div>

                                <div className="sections">

                                    <div className="sub-section">
                                        <label> Financial /other control measures (Institutional, Researchers/individual) </label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="financialMeasures" onChange={handleChange} value={form2.budget.data.financialMeasures}></textarea>
                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 2)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "financials" onChange={handleGradeChange} value = {score.financials} data-max = { Number("2") } />
                            
                                    </div>

                                </div>

                                <div className="sections">

                                    <div className="sub-section">
                                        <label>Environmental impact (Social/physical/health etc)</label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="environmentalImpact" onChange={handleChange} value={form2.budget.data.environmentalImpact}></textarea>
                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 2)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "environment" onChange={handleGradeChange} value = {score.environment} data-max = { Number("2") } />
                            
                                    </div>

                                </div>

                                <div className="sections">

                                    <div className="sub-section">

                                        <label>References</label>

                                        <textarea name="" rows="5" placeholder="Please Enter..." id="references" onChange={handleChange} value={form2.budget.data.references}></textarea>

                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this section (Max of 2)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter Grade" id = "ref" onChange={handleGradeChange} value = {score.ref} data-max = { Number("2") } />
                            
                                    </div>

                                </div>

                            </form>

                        </div>
                
                    </div>

                    {/* overall grading */}
                            
                    {/* <div>

                        {
                            !score.problem || !score.experience || !score.relevance || !score.impact || !score.scalability === "" ? (

                                <div className="realtimeScore">
                                    <div className="score_real">Your Total Grading is  : <strong>{dip}</strong>% </div>
                                    <div className="submitApplication emppty">Submit Application</div>
                                </div>

                            ) : <div className="realtimeScore">
                                    <div className="score_real">Your Total Grading is  : <strong>{dip}</strong>% </div>
                                    <div className="submitApplication" onClick = { () => { handleSubmitGrade(); setLoadSubmit( true) } }  >Submit Application</div>
                                </div>
                        }
                                
                    </div> */}
                
                </div>

            </div>

        );
    }

export default GradeResearch;