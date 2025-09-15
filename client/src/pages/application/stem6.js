import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { getApplicationData, updateStemExperienceApplication } from '../../api/firebase/handleStemSubmits';
import { useLocation, useParams } from 'react-router-dom';
import Stemtr from '../../components/tabletr/stemtr';

const Stem6 = ({currentUser}) => {

    const [form2, setForm2] = useState({ 

        team : { team1 : {name : "", role : "", response : '', linkedin : ''} }

    } );


    const [uploadFiles, setuploadFiles] = useState([])

    const [loader, setLoader] = useState(true);
    const [errors, setErrors] = useState([]);
    const [tableTR, setTableTR] = useState({team : []})

    const params = useParams()
    const [stat, setStat] = useState('pending')

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

                setForm2(response.data.experience.data);
                setLoader(false);

                if( response.data.experience.status === "completed" ) {

                    setProgress(response.progress)

                } else {
                    setProgress ( response.progress + 16.67 )
                }

            } else {

                setLoader(false)

            }
        });
        
    }, []);

    


    const addTableTR = (e, key) => {

        e.preventDefault();

        const {name, id, value} = e.target;

        const gh = Object.keys(form2.team).length

        const newKey = `team${gh+1}`

        setForm2(data => {

            return {
              ...data,
              team : form2.team ? {...form2.team, [newKey] : {name : '', role : '', response : "", linkedin : "" } } : []
            }
        })
        

    }

    const handleTableDelete = async (e, val) => {

        const del = document.querySelector(`table #team-row-${e.target.id}`);
        //del.remove();
        form2.team[val].status = 'deleted';
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
              team : form2.team ? {...form2.team, [name] : { ...form2.team[name], [id] : value } } : []
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

        updateStemExperienceApplication(appid, form2, cohort, progress)
        
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
                                <label htmlFor="">Team Experience</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label>
                                1. How many people are on your team? What is each person’s role and what are their responsibilities? (Add LinkedIn Profile Link for each)
                                </label>
                                
                                <table className="team-table" style = { {border:'none'} } > 

                                    <tr>
                                        <th>Team Member</th>
                                        <th>Role</th>
                                        <th>Responsibilities</th>
                                        <th>Linkedin Profile</th>
                                    </tr>
                                    
                                    <tr className="team-table-row team-table-row-1">

                                        <td> <input name = "team1" required type="text" id="name" onChange={handleTeam}  value = {form2.team.team1.name} />  </td>
                                        <td> <input name = "team1" required type="text" id="role" onChange={handleTeam} value = {form2.team.team1.role} /> </td>
                                        <td> <input name = "team1" required type="text" id="response" onChange={handleTeam} value = {form2.team.team1.response} /> </td>
                                        <td> <input name = "team1" required type="text" id="linkedin" onChange={handleTeam} value = {form2.team.team1.linkedin} /> </td>

                                        <td style={{width:'10%', textAlign : 'center', padding :0, border:'none' }}> </td>

                                    </tr>

                                    {
                                        Object.keys(form2.team).length > 1 && tableTR.team.length == 0 ? Object.keys(form2.team).map( (team, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <Stemtr deleted = {handleTableDelete} customName="team" data = {form2.team} bill = {team} index = {index} key = {index} change = {handleTeam} />
                                            }
                                        } ) : null
                                    }


                                    <div class="add-btn" onClick={(e) => addTableTR(e, "team")} >
                                        <button className="add-button add-team">+ Add Team Member</button>
                                    </div>
            
                                </table>

                            </div>

                            <div className="sub-section">
                                <label for="">2. Explain the experience you /your team has with delivering this solution or any similar solution.</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="experience" onChange={handleChange} value={form2.experience}></textarea>
                            </div>
                            
                            <button className="submitArea" onClick={() => handleSubmit}> Submit & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default Stem6;
