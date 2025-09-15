import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { updateEconomicsApplication, getApplicationData  } from '../../api/firebase/handleSubmits';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import TableTr from '../../components/tabletr/table-tr';
import TableTr5 from '../../components/tabletr/Innovation5TR';

const Innovation4 = ({currentUser}) => {

    const [form2, setForm2] = useState({ 

        costing : { costing1 : {cost : "", driver : ""} }

    } );

    const [uploadFiles, setuploadFiles] = useState([])
    const [loader, setLoader] = useState(true);
    const [errors, setErrors] = useState([]);
    const [teamDetails, setTeamDetails] = useState()
    const [tableTR, setTableTR] = useState({costing : []})

    const params = useParams()

    const pageDetect = useLocation().pathname
    const callupid = params.callid
    const track = pageDetect.split("/")[3]
    const cohort = params.cohort

    const navigate = useNavigate()

    const userid = currentUser.uid;

    const appid = `LASRIC_${callupid}_${userid}`;

    const [progress, setProgress] = useState(0)

    //useeffect important

    useEffect(() => {

        getApplicationData(appid, cohort).then(response => {

            if(response !== null) {

                setForm2(response.data.economics.data);
                setLoader(false);

                if( response.data.economics.status === "completed" ) {

                    setProgress(response.progress)

                } else {
                    setProgress ( response.progress + 16.67 )
                }

            } else {

                setLoader(false)

            }
        });
        
    }, []);

    console.log(Object.keys(form2.costing).length)
    
    const addTableTR = (e, key) => {

        e.preventDefault();

        const {name, id, value} = e.target;

        const gh = Object.keys(form2.costing).length

        const newKey = `costing${gh+1}`

        setForm2(data => {

            return {
              ...data,
              costing : form2.costing ? {...form2.costing, [newKey] : {cost : '', driver : '' } } : []
            }
        })
        

    }

    const handleTableDelete = async (e, val) => {

        const del = document.querySelector(`table #costing-row-${e.target.id}`);
        //del.remove();
        form2.costing[val].status = 'deleted';
        del.style.display = 'none';
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

    const handleCosting = (e) => {

        const {name, id, value} = e.target;

        setForm2(data => {

            return {
              ...data,
              costing : form2.costing ? {...form2.costing, [name] : { ...form2.costing[name], [id] : value } } : []
            }
        })


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

        updateEconomicsApplication(appid, form2, cohort, progress)
        .then(() => navigate(`/application/${cohort}/innovation/${callupid}/milestones`))

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
                                <label htmlFor="">Economics</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    1. What are the ways your startups value proposition generates money for the business?
                                </label>

                                <textarea id="valProp" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.valProp} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                   2. Does your startup have an accounting procedures manual and a policy on reimbursement of expenses?
                                </label>

                                <textarea id="accPolicy" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.accPolicy} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                3. Since starting, what is your startup’s average gross profit margin (i.e. profit it gets on its cost of sales)?
                                </label>

                                <textarea id="grossProfitMargin" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.grossProfitMargin} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                4. What is the fair market value of your startup? (You may use a recent valuation as reference)
                                </label>

                                <textarea id="valuation" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.valuation} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                5. Please share the details of any outstanding liabilities of your startup, if any?
                                </label>

                                <textarea id="liabilities" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.liabilities} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                6. How are the unit economics (selling price vs costs) of your startup sustainable?
                                </label>

                                <textarea id="unitEcon" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.unitEcon} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                7. How much cash does your startup have in the Bank?
                                </label>

                                <textarea id="bankMoni" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.bankMoni} />

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
                                    
                                    <tr className="team-table-row team-table-row-1" required>

                                        <td> <input name = "costing1" required type="text" id="cost" onChange={handleCosting}  value = {form2.costing.costing1.cost} />  </td>
                                        <td> <input name = "costing1" required type="text" id="driver" onChange={handleCosting} value = {form2.costing.costing1.driver} /> </td>

                                        <td style={{width:'10%', textAlign : 'center', padding :0, border:'none' }}> </td>

                                    </tr>

                                    {
                                        Object.keys(form2.costing).length > 1 && tableTR.costing.length == 0 ? Object.keys(form2.costing).map( (costing, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <TableTr5 deleted = {handleTableDelete} customName="costing" data = {form2.costing} bill = {costing} index = {index} key = {index} change = {handleCosting} />
                                            }
                                        } ) : null
                                    }


                                    <div class="add-btn" onClick={(e) => addTableTR(e, "costing")} >
                                        <button className="add-button add-team">+ Add Cost</button>
                                    </div>
            
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
                                        <td> <input  required type="text" id="year1gross" onChange={handleChange} value = {form2.year1gross} /> </td>
                                        <td> <input  required type="text" id="year1assumption" onChange={handleChange} value = {form2.year1assumption} /> </td>

                                    </tr>

                                    <tr className="team-table-row team-table-row-1" required>

                                        <td> <input disabled required type="text" onChange={handleChange} value="Year 2 (Next year)"/>  </td>
                                        <td> <input  required type="text" id="year2gross" onChange={handleChange} value = {form2.year2gross} /> </td>
                                        <td> <input  required type="text" id="year2assumption" onChange={handleChange} value = {form2.year2assumption} /> </td>

                                    </tr>

                                    <tr className="team-table-row team-table-row-1" required>

                                        <td> <input disabled required type="text" onChange={handleChange} value="Year 3 (The year after)"/>  </td>
                                        <td> <input  required type="text" id="year3gross" onChange={handleChange} value = {form2.year3gross} /> </td>
                                        <td> <input  required type="text" id="year3assumption" onChange={handleChange} value = {form2.year3assumption} /> </td>

                                    </tr>

                                   
            
                                </table>

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
