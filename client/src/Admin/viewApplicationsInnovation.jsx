import React, {useState, useEffect} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import Stemtr from '../components/tabletr/stemtr';

import { getApplication } from '../api/firebase/getApplication';
import { updateGrade, getApplicationGrades } from '../api/firebase/council-applications';

import SethAnimation from '../components/lottie/seth-animation';
import TableTr from '../components/tabletr/table-tr';
import gradingTableTR from '../components/tabletr/gradingTableTR';
import GradingTableTR from '../components/tabletr/gradingTableTR';
import TableTr5 from '../components/tabletr/Innovation5TR';
import GradingTableTr5 from '../components/tabletr/gradingTR5';

const InnovationAdminView = () => {

const Navigate = useNavigate()

const formData23 = {

    personal : {

        status : 'completed',
        data : {}

    },
    vision : {
        status : 'pending',
        data : {

            howBig: "",
            howMoney: "",
            problem: "",
            solnDesc: "",
            uniqVal: "",
            workAround: ""
    }

    },
    proposition : {
        status : 'pending',
        data : {

            brandEffective: "",
            competitors: "",
            custEngagement: "",
            exactSoln: "",
            growthSupport: "",
            intelProp: "",
            prodMethod: "",
            salesVal: "",
            whoCustomers: ""
        }

    },
    organization : {
        status : 'pending',
        data : {

            boardGov: "",
            empTurnOver: "",
            havePartners: "",
            haveTeam: "",
            missionDrive: "",
            partner : {partner1 : {focus: '', name: '', duration: ''}},
            partnerPlan: "",
            team: { team1 : { name: '', response : '', role: ''}},
            uniqRevDiff: ""
        }

    },
    economics : {
        status : 'pending',
        data : {

            accPolicy: "",
            bankMoni: "N",
            costing: { costing1 : { cost: '', driver : ''}},
            grossProfitMargin: "",
            liabilities: "",
            unitEcon: "",
            valProp: "",
            valuation: "",
            year1assumption: "",
            year1gross: "",
            year2assumption: "",
            year2gross: "",
            year3assumption: "",
            year3gross: "",
        }

    },
    milestones : {
        status : 'pending',
        data : {
            custValEvidence: "",
            decrCACEvidence: "",
            min2Rev: "",
            scaleProd: "",
            trackSuccess: ""
            }

    } 
    
};

    const [form2, setForm2] = useState(formData23)
    const pageDetect = useLocation().pathname
    const rip = pageDetect.split("/")[4]

    const [tableTR, setTableTR] = useState({team : []})

    const [score, setScore] = useState({

        vision : '',
        proposition : '',
        organization : '',
        economics : '',
        milestones : ''

    })

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
        
    }, []);


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

    const handleGradeChange = (e) => {

        const {id, value} = e.target;
        
        var numbers = /^[-+]?[0-9]+$/;
      
        if (value !== "") {
            
            if (!value.match(numbers)){

                alert('Please input only numbers to grade application')
                
            }
        }

        if (value > 20){

            alert('Grade for this area connot be above 20 marks')

        } else {

            setScore(data => {

                return {
                  ...data,
                  [id] : value
                }
            })
        }
        

        
  
    }

    return (

        <div className="gradingApplication">

            <div className="gradeHere">Grading</div>
           
            <div className="custom-grade">

                <div className="sectors">

                    <form className='gradingPart'>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor="">Personal Information</label>
                                <div className="line-section" />
                            </div>

                            {/* <div className="headTitleTag">
                                Personal Information
                            </div> */}

                            <div className="sub-section">
                                <label for="">Gender </label>
                                <input value={form2.personal.data.gender} disabled = 'true'/>
                            </div>

                            <div className="sub-section">
                                <label for=""> Linkedin Profile </label>
                                <a href={form2.personal.data.linkedin} target="_blank" > {form2.personal.data.linkedin}</a>
                            </div>

                            <div className="sub-section">
                                <label for="">Target Area </label>
                                <input value={form2.personal.data.targetArea} disabled = 'true'/>
                            </div>

                            <div className="sub-section">
                                <label for="">Company Name </label>
                                <input value={form2.personal.data.company} disabled = 'true'/>
                            </div>
                            
                            <div className="sub-section">
                                <label for="">Company Website </label>
                                <input value={form2.personal.data.website} disabled = 'true'/>
                            </div>

                            <div className="sub-section">
                                <label for="">When was the company founded? </label>
                                <input value={form2.personal.data.companyDate} disabled = 'true'/>
                            </div>

                            <div className="sub-section">
                                <label for=""> Which of the following sectors does your company belong to? </label>
                                <input value={form2.personal.data.companySector} disabled = 'true'/>
                            </div>

                            <div className="sub-section">
                                <label for=""> What's your business model? </label>
                                <input value={form2.personal.data.bizModel} disabled = 'true'/>
                            </div>

                            <div className="sub-section">
                                <label for=""> What stage is your startup in? </label>
                                <input value={form2.personal.data.bizStage} disabled = 'true'/>
                            </div>

                            <div className="sub-section">
                                <label for=""> Organization Role </label>
                                <input value={form2.personal.data.orgRole} disabled = 'true'/>
                            </div>

                            <div className="sub-section">
                                <label for=""> Revenue in the last 12 months </label>
                                <input value={form2.personal.data.rev12} disabled = 'true'/>
                            </div>

                        </div>
                    </form>
                </div>

                {/* Vision AreaX */}

                <div className="sectors">

                    <form className='gradingPart'>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor=""> Vision </label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">
                                <label for=""> 1. What is the problem/need of your target customer that you are trying to solve? </label>
                                <textarea name="" rows="5" value={form2.vision.data.problem} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 2. How big is this problem? Please give figures from verifiable sources. </label>
                                <textarea name="" rows="5" value={form2.vision.data.howBig} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 3. What are people currently doing to deal with this problem? </label>
                                <textarea name="" rows="5" value={form2.vision.data.workAround} disabled = 'true' ></textarea>
                            </div>
                            
                            <div className="sub-section">
                                <label for=""> 4. Briefly describe your proposed solution in terms of the activities, product or service you will provide </label>
                                <textarea name="" rows="5" value={form2.vision.data.solnDesc} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 5. What makes your startup’s solution unique? </label>
                                <textarea name="" rows="5" value={form2.vision.data.uniqVal} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 6. How does or will your startup make money by solving this problem? </label>
                                <textarea name="" rows="5" value={form2.vision.data.howMoney} disabled = 'true' ></textarea>
                            </div>

                        </div>
                    </form>

                </div>

                {/* Proposition Area Grading */}

                <div className="sectors">

                    <form className='gradingPart'>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor=""> Proposition </label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">
                                <label for=""> 1. What is the value of each customer and sales contract you have right now? How long is each available for? </label>
                                <textarea name="" rows="5" value={form2.proposition.data.salesVal} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 2. How is your target market supporting substantial growth / valuation? </label>
                                <textarea name="" rows="5" value={form2.proposition.data.growthSupport} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 3. Who are your target customers and how many do you have now? </label>
                                <textarea name="" rows="5" value={form2.proposition.data.whoCustomers} disabled = 'true' ></textarea>
                            </div>
                            
                            <div className="sub-section">
                                <label for=""> 4. What exactly is the solution your startup is giving to customers? </label>
                                <textarea name="" rows="5" value={form2.proposition.data.exactSoln} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 5. Kindly provide details of any registered intellectual property your startup owns? </label>
                                <textarea name="" rows="5" value={form2.proposition.data.intelProp} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 6. Does your startup have a methodology for product development? If so please describe your process. </label>
                                <textarea name="" rows="5" value={form2.proposition.data.prodMethod} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 7. How do you know that your startup brand design and marketing strategy is effective? </label>
                                <textarea name="" rows="5" value={form2.proposition.data.brandEffective} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 8. Who are your principal competitors and what traction do they have? What are the strengths and weaknesses of each competitor?</label>
                                <textarea name="" rows="5" value={form2.proposition.data.competitors} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 9. What channels do you use to engage with your customers? Please describe your use of each channel. </label>
                                <textarea name="" rows="5" value={form2.proposition.data.custEngagement} disabled = 'true' ></textarea>
                            </div>

                        </div>
                    </form>

                </div>

                {/* Organization Area */}

                <div className="sectors">

                    <form className='gradingPart'>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor=""> Organisation</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">
                                <label for=""> 1. Who are you? What drives you and what’s your personal mission in life? </label>
                                <textarea name="" rows="5" value={form2.organization.data.missionDrive} disabled = 'true' ></textarea>
                            </div>

                            <div className="sub-section">
                                <label for=""> 2. Do you have a team? </label>
                                <textarea name="" rows="5" value={form2.organization.data.haveTeam} disabled = 'true' ></textarea>
                            </div>


                            <div className="sub-section">

                                <label>
                                3. How many people are on your team or How many people do you plan to have on your team? What is each person’s role and what are their responsibilities?
                                </label>
                                
                                <table className="team-table" style = { {border:'none'} } > 

                                    <tr>
                                        <th>Team Member</th>
                                        <th>Role</th>
                                        <th>Responsibilities</th>
                                    </tr>
                                    
                                    <tr className="team-table-row team-table-row-1">

                                        <td> <input name = "team1" required type="text" id="name" onChange={handleTeam}  value = {form2.organization.data.team.team1.name} />  </td>
                                        <td> <input name = "team1" required type="text" id="role" onChange={handleTeam} value = {form2.organization.data.team.team1.role} /> </td>
                                        <td> <textarea  rows={4} name = "team1" required type="text" id="response" onChange={handleTeam} value = {form2.organization.data.team.team1.response} > </textarea>  </td>

                                    </tr>

                                    {
                                        Object.keys(form2.organization.data.team).length > 1 && tableTR.team.length == 0 ? Object.keys(form2.organization.data.team).map( (team, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <GradingTableTR deleted = {handleTableDelete} customName="team" data = {form2.organization.data.team} bill = {team} index = {index} key = {index} change = {handleTeam} />
                                            }
                                        } ) : null
                                    }
            
                                </table>

                            </div>

                            <div className="sub-section">
                                <label for=""> 4. What is your startup's unique difference in its revenue streams, distribution channel or customer relationship? Please describe the difference.</label>
                                <textarea name="" rows="5" value={form2.organization.data.uniqRevDiff} disabled = 'true' ></textarea>
                            </div> 

                            <div className="sub-section">
                                <label for=""> 5. Is the board structured in a way that makes sense for the governance needs of your Start-up?</label>
                                <textarea name="" rows="5" value={form2.organization.data.boardGov} disabled = 'true' ></textarea>
                            </div> 

                            <div className="sub-section">
                                <label for=""> 6. Do you have other partners (other individuals or businesses for financial, technical or managerial purposes)?</label>
                                <textarea name="" rows="5" value={form2.organization.data.havePartners} disabled = 'true' ></textarea>
                            </div>    


                            <div className="sub-section">

                                <label>
                                7. Who are your partners?
                                </label>
                                
                                <table className="team-table" style = { {border:'none'} } > 

                                    <tr>
                                        <th>Partner</th>
                                        <th>Partnership Focus (Core role/responsibility)</th>
                                        <th>Partnership Duration</th>
                                    </tr>
                                    
                                    <tr className="team-table-row team-table-row-1">

                                        <td> <input name = "partner1" required type="text" id="name" onChange={handleTeam}  value = {form2.organization.data.partner.partner1.name} />  </td>
                                        <td> <input name = "partner1" required type="text" id="focus" onChange={handleTeam} value = {form2.organization.data.partner.partner1.focus} /> </td>
                                        <td> <textarea  rows={4} name = "partner1" required type="text" id="duration" onChange={handleTeam} value = {form2.organization.data.partner.partner1.duration} > </textarea>  </td>

                                    </tr>

                                    {
                                        Object.keys(form2.organization.data.partner).length > 1 && tableTR.team.length == 0 ? Object.keys(form2.organization.data.partner).map( (partner, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <GradingTableTR deleted = {handleTableDelete} customName="partner" data = {form2.organization.data.partner} bill = {partner} index = {index} key = {index} change = {handleTeam} />
                                            }
                                        } ) : null
                                    }
            
                                </table>

                            </div>   
                            
                            <div className="sub-section">
                                <label for=""> 8. Do you have a plan to get partners or build partnerships? If so what are they?</label>
                                <textarea name="" rows="5" value={form2.organization.data.partnerPlan} disabled = 'true' ></textarea>
                            </div>   

                            <div className="sub-section">
                                <label for=""> 9. Do you have a plan to get partners or build partnerships? If so what are they? </label>
                                <textarea name="" rows="5" value={form2.organization.data.empTurnOver} disabled = 'true' ></textarea>
                            </div>                        

                        </div>
                    </form>

                </div>

                {/* Economics Area Grading */}

                <div className="sectors">

                    <form className='gradingPart'>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor=""> Economics </label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    1. What are the ways your startups value proposition generates money for the business?
                                </label>

                                <textarea id="valProp" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.economics.data.valProp} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                   2. Does your startup have an accounting procedures manual and a policy on reimbursement of expenses?
                                </label>

                                <textarea id="accPolicy" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.economics.data.accPolicy} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                3. Since starting, what is your startup’s average gross profit margin (i.e. profit it gets on its cost of sales)?
                                </label>

                                <textarea id="grossProfitMargin" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.economics.data.grossProfitMargin} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                4. What is the fair market value of your startup? (You may use a recent valuation as reference)
                                </label>

                                <textarea id="valuation" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.economics.data.valuation} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                5. Please share the details of any outstanding liabilities of your startup, if any?
                                </label>

                                <textarea id="liabilities" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.economics.data.liabilities} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                6. How are the unit economics (selling price vs costs) of your startup sustainable?
                                </label>

                                <textarea id="unitEcon" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.economics.data.unitEcon} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                7. How much cash does your startup have in the Bank?
                                </label>

                                <textarea id="bankMoni" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.economics.data.bankMoni} />

                            </div>

                            <div className="sub-section">

                                <label>
                                    8. What are the key costs in your startup business model and what are the major drivers of these costs?
                                </label>
                                
                                <table className="team-table" style = { {border:'none'} } > 

                                    <tr>
                                        <th>Cost</th>
                                        <th>Primary Driver</th>
                                    </tr>
                                    
                                    <tr className="team-table-row team-table-row-1 nio" required>

                                        <td> <input name = "costing1" required type="text" id="cost"  value = {form2.economics.data.costing.costing1.cost} />  </td>
                                        <td> <input name = "costing1" required type="text" id="driver" value = {form2.economics.data.costing.costing1.driver} /> </td>

                                    </tr>

                                    {
                                        Object.keys(form2.economics.data.costing).length || 0 > 1 && tableTR.costing.length == 0 ? Object.keys(form2.economics.data.costing).map( (costing, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <GradingTableTr5 deleted = {handleTableDelete} customName="costing" data = {form2.economics.data.costing} bill = {costing} index = {index} key = {index} />
                                            }
                                        } ) : null
                                    }

                                </table>

                            </div>

                            <div className="sub-section">

                                <label>
                                    9. What is your estimated profit/loss each year for the next 3 years and what are the underlying assumptions behind the forecast projections?
                                </label>
                                
                                <table className="team-table" style = { {border:'none'} } > 

                                    <tr>
                                        <th>Year</th>
                                        <th>Profit or Loss</th>
                                        <th>Assumptions</th>
                                    </tr>
                                    
                                    <tr className="team-table-row team-table-row-1" required>

                                        <td> <input disabled required type="text" onChange={handleChange} value="Year 1 (This year)"/>  </td>
                                        <td> <input  required type="text" id="year1gross" onChange={handleChange} value = {form2.economics.data.year1gross} /> </td>
                                        <td> <input required type="text" id="year1assumption" onChange={handleChange} value = {form2.economics.data.year1assumption} /> </td>

                                    </tr>

                                    <tr className="team-table-row team-table-row-1" required>

                                        <td> <input disabled required type="text" onChange={handleChange} value="Year 2 (Next year)"/>  </td>
                                        <td> <input  required type="text" id="year2gross" onChange={handleChange} value = {form2.economics.data.year2gross} /> </td>
                                        <td> <input  required type="text" id="year2assumption" onChange={handleChange} value = {form2.economics.data.year2assumption} /> </td>

                                    </tr>

                                    <tr className="team-table-row team-table-row-1" required>

                                        <td> <input disabled required type="text" onChange={handleChange} value="Year 3 (The year after)"/>  </td>
                                        <td> <input  required type="text" id="year3gross" onChange={handleChange} value = {form2.economics.data.year3gross} /> </td>
                                        <td> <input  required type="text" id="year3assumption" onChange={handleChange} value = {form2.economics.data.year3assumption} /> </td>

                                    </tr>

                                   
            
                                </table>

                            </div>

                        </div>
                    </form>

                </div>

                {/* Milestones AreaX */}

                <div className="sectors">

                    <form className='gradingPart'>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor=""> Milestones </label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                1. How do you intend to track your progression to success over time?
                                </label>

                                <textarea id="trackSuccess" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.milestones.data.trackSuccess} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                2. Do you have a clear evidence that your customer segments find value in your startup’s solution?
                                </label>

                                <textarea id="custValEvidence" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.milestones.data.custValEvidence} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                3. Is there any evidence of a decreasing CAC with a growing customer base buying your products at target price?
                                </label>

                                <textarea id="decrCACEvidence" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.milestones.data.decrCACEvidence} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                4. Do you have products built for scale with strong customer product feedback in multiple markets?
                                </label>

                                <textarea id="scaleProd" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.milestones.data.scaleProd} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                5. Has your startup delivered a minimum 2x revenue growth for multiple years.
                                </label>

                                <textarea id="min2Rev" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.milestones.data.min2Rev} />

                            </div>

                        </div>
                    </form>

                </div>

            </div>
                        
        </div>




    );
}

export default InnovationAdminView;
