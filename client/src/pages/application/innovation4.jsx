import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { updateOrganizationApplication, getApplicationData  } from '../../api/firebase/handleSubmits';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import TableTr from '../../components/tabletr/table-tr';

const Innovation4 = ({currentUser}) => {

    const [form2, setForm2] = useState({ 

        team : { team1 : {name : "", role : "", response : ""} },
        partner : { partner1 : { name : "", focus : "", duration : "" } }

    } );

    const params = useParams()

    const [loader, setLoader] = useState(true);
    const [errors, setErrors] = useState([]);
    const [stat, setStat] = useState('pending')

    const [teamDetails, setTeamDetails] = useState()
    const [tableTR, setTableTR] = useState({team : [], partner : []})

    const pageDetect = useLocation().pathname
    const callupid = params.callid
    const track = pageDetect.split("/")[3]
    const cohort = params.cohort

    const navigate = useNavigate();

    const userid = currentUser.uid;

    const appid = `LASRIC_${callupid}_${userid}`;

    const [progress, setProgress] = useState(0)

    //useeffect important

    useEffect(() => {

        getApplicationData(appid, cohort).then(response => {

            if(response !== null) {

                setForm2(response.data.organization.data);
                setLoader(false);

                if( response.data.organization.status === "completed" ) {

                    setProgress(response.progress)

                } else {
                    setProgress ( response.progress + 16.67 )
                }

            } else {

                setLoader(false)

            }
        });
        
    }, []);

    console.log(Object.keys(form2.team).length)
    
    const addTableTR = (e, key) => {

        e.preventDefault();

        const {name, id, value} = e.target;

        const gh = Object.keys(form2.team).length

        const newKey = `team${gh+1}`

        setForm2(data => {

            return {
              ...data,
              team : form2.team ? {...form2.team, [newKey] : {name : '', role : '', response : "" } } : []
            }
        })
        

    }

    const addTableTRP = (e, key) => {

        e.preventDefault();

        console.log('get')

        const gh = Object.keys(form2.partner).length

        const newKey = `partner${gh+1}`

        setForm2(data => {

            return {
              ...data,
              partner : form2.partner ? {...form2.partner, [newKey] : {name : '', focus : '', duration : "" } } : []
            }
        })
        

    }

    const [val, setValDel] = useState('')
    const [Par, setParDel] = useState('')
    const [del, setDel] = useState('')

    const handleTableDelete = async (e, val) => {

        const del = document.querySelector(`table #team-row-${e.target.id}`);
        //del.remove();
        form2.team[val].status = 'deleted';
        del.style.display = 'none';
    }

    const handleTableDeletePar = async (e, val) => {

        const del = document.querySelector(`table #partner-row-${e.target.id}`);

        //console.log(val)


        //delete form2.partner[val]

        form2.partner[val].status = 'deleted';
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

    const handleTeam = (e) => {

        const {name, id, value} = e.target;

        setForm2(data => {

            return {
              ...data,
              team : form2.team ? {...form2.team, [name] : { ...form2.team[name], [id] : value } } : []
            }
        })


    }

    const handlePartner = (e) => {

        const {name, id, value} = e.target;

        setForm2(data => {

            return {
              ...data,
              partner : form2.partner ? {...form2.partner, [name] : { ...form2.partner[name], [id] : value } } : []
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

        updateOrganizationApplication(appid, form2, cohort, progress)
        .then(() => navigate(`/application/${cohort}/innovation/${callupid}/economics`))

        console.log("success")
        

    }


    const handleSubmit = (e) => {

        e.preventDefault();
        checkRequired()

    }


    return (


        
        <div className="application innovation">

            {/* {
                loader ? 
                
                (
                
                    <div className="loader">

                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_bujdzzfn.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />

                    </div>
                
                ) : null
            } */}

            <div className="wrapper">

                <div className="body-section">

                    <form className='lasric-apply-form' onSubmit={handleSubmit}>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor="">Organisation (how well structured are you to deliver on your proposed solution?)</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    1. Who are you? What drives you and what’s your personal mission in life? (100 words maximum)
                                </label>

                                <textarea id="missionDrive" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.missionDrive} />

                            </div>

                            <div className="sub-section">

                                <label>
                                    2. Do you have a team? 
                                </label>
                                
                                <select id="haveTeam" required onChange={handleChange} value = {form2.haveTeam}>
                                    <option value="">-----Please Select-----</option>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>

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
                                    
                                    <tr className="team-table-row team-table-row-1" required>

                                        <td> <input name = "team1" required type="text" id="name" onChange={handleTeam}  value = {form2.team.team1.name} />  </td>
                                        <td> <input name = "team1" required type="text" id="role" onChange={handleTeam} value = {form2.team.team1.role} /> </td>
                                        <td> <input name = "team1" required type="text" id="response" onChange={handleTeam} value = {form2.team.team1.response} /> </td>

                                        <td style={{width:'10%', textAlign : 'center', padding :0, border:'none' }}> </td>

                                    </tr>

                                    {
                                        Object.keys(form2.team).length > 1 && tableTR.team.length == 0 ? Object.keys(form2.team).map( (team, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <TableTr deleted = {handleTableDelete} customName="team" data = {form2.team} bill = {team} index = {index} key = {index} change = {handleTeam} />
                                            }
                                        } ) : null
                                    }


                                    <div class="add-btn" onClick={(e) => addTableTR(e, "team")} >
                                        <button className="add-button add-team">+ Add Team Member</button>
                                    </div>
            
                                </table>

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    4. What is your startup's unique difference in its revenue streams, distribution channel or customer relationship? Please describe the difference. (100 words maximum)
                                </label>

                                <textarea id="uniqRevDiff" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.uniqRevDiff} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    5. Is the board structured in a way that makes sense for the governance needs of your Start-up?
                                </label>

                                <textarea id="boardGov" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.boardGov} />

                            </div>

                            <div className="sub-section">

                                <label>
                                    6. Do you have other partners (other individuals or businesses for financial, technical or managerial purposes)?
                                </label>
                                
                                <select id="havePartners" required onChange={handleChange} value = {form2.havePartners}>
                                    <option value="">-----Please Select-----</option>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>

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
                                    
                                    <tr className="team-table-row team-table-row-1" required>

                                        <td> <input name = "partner1" type="text" id="name" onChange={handlePartner}  value = {form2.partner.partner1.name} />  </td>
                                        <td> <input name = "partner1" type="text" id="focus" onChange={handlePartner} value = {form2.partner.partner1.focus} /> </td>
                                        <td> <input name = "partner1" type="text" id="duration" onChange={handlePartner} value = {form2.partner.partner1.duration} /> </td>

                                        <td style={{width:'10%', textAlign : 'center', padding :0, border:'none' }}> </td>

                                    </tr>


                                    {
                                        Object.keys(form2.partner).length > 1 && tableTR.partner.length == 0 ? Object.keys(form2.partner).map( (partner, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <TableTr deleted = {handleTableDeletePar} customName="partner" data = {form2.partner} bill = {partner} index = {index} key = {index} change = {handlePartner} />
                                            }
                                        } ) : null
                                    }


                                    <div class="add-btn" onClick={(e) => addTableTRP(e, "partner")} >
                                        <button className="add-button add-team">+ Add Partner</button>
                                    </div>
            
                                </table>

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    8. Do you have a plan to get partners or build partnerships? If so what are they? (100 words maximum)
                                </label>

                                <textarea id="partnerPlan" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.partnerPlan} />

                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    9. Do you have a plan to get partners or build partnerships? If so what are they? (100 words maximum)
                                </label>

                                <textarea id="empTurnOver" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.empTurnOver} />

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
