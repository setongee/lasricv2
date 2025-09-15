import React,{useState, useEffect} from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore"
import { db } from '../../api/firebase/config';
import { submitStemApplication } from '../../api/firebase/handleStemSubmits';
import { submitResearchApplicationFinalized } from '../../api/firebase/handleResearchSubmit';


const Research = ({currentUser}) => {


    const dummy = {


        personal : {

            status : 'pending',
            data : {}

        },
        project : {

            status : 'pending',
            data : {}

        },
        results : {

            status : 'pending',
            data : {}

        },
        budget : {

            status : 'pending',
            data : {}

        }


    }


    const params = useParams()
    const Navigate = useNavigate()

    const pageDetect = useLocation().pathname;
    const callupid = params.callid;
    const paramValue = pageDetect.split("/")[5];
    const track = pageDetect.split("/")[3];
    const [active, setActive] = useState('');
    const [submitReady, setSubmitReady] = useState(false);
    const [data, setData] = useState(false);
    const cohort = params.cohort;

    const appid = `LASRIC_${callupid}_${currentUser.uid}`
    const [status, setStatus] = useState(dummy)

    const blend = (dat) => {

        setStatus(dat.data);
        setData(dat.submitted)

    }
    

    useEffect(() => {

        const unsub = onSnapshot(doc(db, "applications_data" , cohort, "applications", appid), (doc) => {

            blend(doc.data());
            console.log(doc.data());
     
         });

         return unsub;
         

    }, []);


    useEffect(() => {

         if ( status.personal.status === 'completed' && status.project.status === 'completed' && status.results.status === 'completed' && status.budget.status === 'completed') {
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
        
        case 'project':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.project').classList.add('active')

            } else {

                document.querySelector('.project').classList.add('active')
                
            }
            
            break;

            case 'result':

                var act = document.querySelector('.active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.results').classList.add('active')
    
                } else {
    
                    document.querySelector('.results').classList.add('active')
                    
                }
                
                break;

            case 'budget':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.budget').classList.add('active')

            } else {

                document.querySelector('.budget').classList.add('active')
                
            }
            
            break;
    
        default:
            break;
    }


    //()=> { signOut(authState); window.location.reload()

    const submitTheApplication = () => {

        const company = status.personal.data.institution;
        
        submitResearchApplicationFinalized(appid, callupid, currentUser.uid, track, currentUser.firstname, currentUser.lastname, cohort, company, currentUser ).then(() => Navigate('/dashboard'));
    }

    return (

        <div>

            {/*title bar*/}
            <div className="title-bar">

            <div className="panel-control">
                
                <Link to = {`/application/${cohort}/research/${callupid}/personal`} className="tabnine personal"> <div className="icon-tab"> <i className="fi fi-rr-portrait"></i> </div> Personal  { status.personal.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>

                {
                    status.personal.status === "completed" ? (


                        <div>


                            <Link to = {`/application/${cohort}/research/${callupid}/project`}  className="tabnine project"> <div className="icon-tab"> <i className="fi fi-rr-eye"></i> </div> Project { status.project.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                            <Link to = {`/application/${cohort}/research/${callupid}/result`} className="tabnine results"> <div className="icon-tab"> <i className="fi fi-rr-layers"></i> </div> Results { status.results.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                            <Link to = {`/application/${cohort}/research/${callupid}/budget`}  className="tabnine budget"> <div className="icon-tab"> <i className="fi fi-rr-briefcase"></i> </div> Budget { status.budget.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>


                        </div>



                    ) : (

                        <div className='uncompletedPersonal' onClick = {() => alert("Kindly finish submitting the form in personal to continue...")}>

                            <div  className="tabnine project"> <div className="icon-tab"> <i className="fi fi-rr-eye"></i> </div> Project</div>
                            <div className="tabnine results"> <div className="icon-tab"> <i className="fi fi-rr-layers"></i> </div> Results</div>
                            <div  className="tabnine budget"> <div className="icon-tab"> <i className="fi fi-rr-briefcase"></i> </div> Budget</div>

                        </div>

                    )
                }
                

            </div>

            <div className="nav">
                    
                {
                    data ? <div className="submitApplication" > Congrats!, Submitted </div> : submitReady ? <div className="submitApplication" onClick={ () => submitTheApplication() } > Submit Application </div> : <div className="submitApplication notReady" > Submit Application </div>
                }

            </div>
            </div>

            <Outlet />
            
        </div>
    );
}

export default Research;

