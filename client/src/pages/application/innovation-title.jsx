import React,{useState, useEffect} from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore"
import { db } from '../../api/firebase/config';
import { submitApplication, getApplicationData } from '../../api/firebase/handleSubmits';

const InnovationTitle = ({currentUser}) => {

    let navigate = useNavigate()
    
    useEffect(() => {
        
        if(!Object.keys(currentUser).length){
            navigate('/login')
        }
        
    }, [currentUser]);

    const dummy = {
        personal : {

            status : 'pending',
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
    }

    const params = useParams()
    const pageDetect = useLocation().pathname
    const callupid = params.callid
    const paramValue = pageDetect.split("/")[5];
    const track = pageDetect.split("/")[3]
    const [active, setActive] = useState('');
    const [submitReady, setSubmitReady] = useState(false);
    const [data, setData] = useState(false)
    const Navigate = useNavigate()
    const cohort = params.cohort

    const appid = `LASRIC_${callupid}_${currentUser.uid}`

    const [status, setStatus] = useState(dummy)

    const blend = (dat) => {

        setStatus(dat.data);
        setData(dat.submitted);

    }

    useEffect(() => {

        // if (!Object.keys(currentUser).length) navigate('/login')

        const unsub = onSnapshot(doc(db, "applications_data", cohort, "applications", appid), (doc) => {

            if(doc.data()){
                blend(doc.data())
            }
     
         });

         return unsub;
         

    }, []);

    useEffect(() => {
        if ( status.personal.status === 'completed' && status.vision.status === 'completed' && status.economics.status === 'completed' && status.milestones.status === 'completed'  && status.proposition.status === 'completed' && status.organization.status === 'completed' ) {
            setSubmitReady(true)
        }
    }, [status]);

    useEffect(() => {

        setActive(paramValue);
        window.scrollTo(0, 0);
        
    }, [paramValue]);

    switch (active) {
        
        case 'personal':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.personal').classList.add('active')

            } else {

                document.querySelector('.personal').classList.add('active')

            }
            
            break;
        
        case 'proposition':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.proposition').classList.add('active')

            } else {

                document.querySelector('.proposition').classList.add('active')
                
            }
            
            break;

        case 'vision':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.vision').classList.add('active')

            } else {

                document.querySelector('.vision').classList.add('active')
                
            }
            
            break;

            case 'organization':

                var act = document.querySelector('.active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.organization').classList.add('active')
    
                } else {
    
                    document.querySelector('.organization').classList.add('active')
                    
                }
                
                break;

            case 'economics':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.economics').classList.add('active')

            } else {

                document.querySelector('.economics').classList.add('active')
                
            }
            
            break;

            case 'milestones':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.milestones').classList.add('active')

            } else {

                document.querySelector('.milestones').classList.add('active')
                
            }
            
            break;
    
        default:
            break;
    }

    //()=> { signOut(authState); window.location.reload()


    const submitTheApplication = () => {

        const company = status.personal.data.company;
        
        submitApplication( appid, callupid, currentUser.uid, track, currentUser.firstname, currentUser.lastname, cohort, company, currentUser ).then(() => Navigate('/dashboard'))

    }

    return (

        <div>

            {/*title bar*/}
            <div className="title-bar">

            <div className="panel-control">
                
                <Link to = {`/application/${cohort}/innovation/${callupid}/personal`} className="tabnine personal"> <div className="icon-tab"> <i className="fi fi-rr-portrait"></i> </div> Personal  { status?.personal?.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>

                {
                    status?.personal?.status === "completed" ? (


                        <div>

                            <Link to = {`/application/${cohort}/innovation/${callupid}/vision`}  className="tabnine vision"> <div className="icon-tab"> <i className="fi fi-rr-eye"></i> </div> Vision { status.vision.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                            <Link to = {`/application/${cohort}/innovation/${callupid}/proposition`} className="tabnine proposition"> <div className="icon-tab"> <i className="fi fi-rr-layers"></i> </div> Proposition { status.proposition.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                            <Link to = {`/application/${cohort}/innovation/${callupid}/organization`}  className="tabnine organization"> <div className="icon-tab"> <i className="fi fi-rr-briefcase"></i> </div> Organization { status.organization.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                            <Link to = {`/application/${cohort}/innovation/${callupid}/economics`} className="tabnine economics"> <div className="icon-tab"> <i className="fi fi-rr-bank"></i> </div> Economics { status.economics.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                            <Link to = {`/application/${cohort}/innovation/${callupid}/milestones`} className="tabnine milestones"> <div className="icon-tab"> <i className="fi fi-rr-chat-arrow-grow"></i> </div> Milestones { status.milestones.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>

                        </div>



                    ) : (

                        <div className='uncompletedPersonal' onClick = {() => alert("Kindly finish submitting the form in personal to continue...")}>
                            <div  className="tabnine vision"> <div className="icon-tab"> <i className="fi fi-rr-eye"></i> </div> Vision</div>
                            <div className="tabnine proposition"> <div className="icon-tab"> <i className="fi fi-rr-layers"></i> </div> Proposition</div>
                            <div  className="tabnine organization"> <div className="icon-tab"> <i className="fi fi-rr-briefcase"></i> </div> Organization</div>
                            <div className="tabnine economics"> <div className="icon-tab"> <i className="fi fi-rr-bank"></i> </div> Economics</div>
                            <div className="tabnine milestones"> <div className="icon-tab"> <i className="fi fi-rr-chat-arrow-grow"></i> </div> Milestones</div>
                        </div>

                    )
                }


                

                



                

                

            </div>

            <div className="nav">

                {/* <div className="save-draft">
                    <div className="text">Continue Later?</div>
                    <button id="form-save" style={{ outline: "none" }}>
                    Save Draft
                    </button>
                </div> */}
                    
                {
                    data ? <div className="submitApplication" > Congrats!, Submitted </div> : submitReady ? <div className="submitApplication" onClick={ () => submitTheApplication() } > Submit Application </div> : <div className="submitApplication notReady" > Submit Application </div>
                }

            </div>
            </div>

            <Outlet />
            
        </div>
    );
}

export default InnovationTitle;
