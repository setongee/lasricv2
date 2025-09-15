import React,{useState, useEffect} from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore"
import { db } from '../../api/firebase/config';
import { submitStemApplication } from '../../api/firebase/handleStemSubmits';
import CompleteModal from './completeModal';

const StemTitle = ({currentUser}) => {

    const authState = getAuth()

    const dummy = {
        personal : {

            status : 'pending',
            data : {}

        },
        problem : {

            status : 'pending',
            data : {}

        },
        relevance : {

            status : 'pending',
            data : {}

        },
        impact : {

            status : 'pending',
            data : {}

        },
        scalability : {

            status : 'pending',
            data : {}

        },
        experience : {

            status : 'pending',
            data : {}

        },
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
    const [showSections, setShowSections] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [textSubmit, setText] = useState(false)

    const appid = `LASRIC_${callupid}_${currentUser.uid}`

    const [status, setStatus] = useState(dummy)

    const blend = (dat) => {
        setStatus(dat.data);
        setData(dat.submitted)
    }


    useEffect(() => {

        const unsub = onSnapshot(doc(db, "applications_data", cohort, "applications", appid), (doc) => {

            if (doc.exists()){

                blend(doc.data())
            }
     
         });

         return unsub;
         

    }, []);

    useEffect(() => {

         if ( status.personal.status === 'completed' && status.problem.status === 'completed' && status.scalability.status === 'completed' && status.experience.status === 'completed'  && status.relevance.status === 'completed' && status.impact.status === 'completed' ) {
             setSubmitReady(true)
         }
    }, [status]);

    useEffect(() => {

        setActive(paramValue);
        setShowSections(false);
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
        
        case 'relevance':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.relevance').classList.add('active')

            } else {

                document.querySelector('.relevance').classList.add('active')
                
            }
            
            break;

        case 'problem':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.problem').classList.add('active')

            } else {

                document.querySelector('.problem').classList.add('active')
                
            }
            
            break;

            case 'impact':

                var act = document.querySelector('.active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.impact').classList.add('active')
    
                } else {
    
                    document.querySelector('.impact').classList.add('active')
                    
                }
                
                break;

            case 'scalability':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.scalability').classList.add('active')

            } else {

                document.querySelector('.scalability').classList.add('active')
                
            }
            
            break;

            case 'experience':

            var act = document.querySelector('.active');
            
            if(act !== null) {

                act.classList.remove('active');
                document.querySelector('.experience').classList.add('active')

            } else {

                document.querySelector('.experience').classList.add('active')
                
            }
            
            break;
    
        default:
            break;
    }


    //console.log(status)

    //()=> { signOut(authState); window.location.reload()

    const submitTheApplication = () => {

        setText(true);
        
        const company = status.personal.data.companyName;
        
        submitStemApplication(appid, callupid, currentUser.uid, track, currentUser.firstname, currentUser.lastname, cohort, company, currentUser ).then(() =>  setSubmitted(true));

    }

    return (

        <div>

            {
                data ? <CompleteModal profile = {currentUser} /> : null
            }

            <div className="show-tabs-body">

                <p> 🚨 Using a desktop is best for applications</p>

                <div className="show-tabs" onClick={ () => setShowSections(!showSections)}>Show / Hide Sections</div>

            </div>

            {
                showSections ? (
                    <div className="mints">

                <div className="panel-control">
                    
                    <Link to = {`/application/${cohort}/stem/${callupid}/personal`} className="tabnine personal"> <div className="icon-tab"> <i className="fi fi-rr-portrait"></i> </div> Personal  { status.personal.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>

                    {
                        status.personal.status === "completed" ? (


                            <div>

                                <Link to = {`/application/${cohort}/stem/${callupid}/problem`}  className="tabnine problem"> <div className="icon-tab"> <i className="fi fi-rr-eye"></i> </div> Problem { status.problem.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                                <Link to = {`/application/${cohort}/stem/${callupid}/relevance`} className="tabnine relevance"> <div className="icon-tab"> <i className="fi fi-rr-layers"></i> </div> Relevance { status.relevance.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                                <Link to = {`/application/${cohort}/stem/${callupid}/impact`}  className="tabnine impact"> <div className="icon-tab"> <i className="fi fi-rr-briefcase"></i> </div> Impact { status.impact.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                                <Link to = {`/application/${cohort}/stem/${callupid}/scalability`} className="tabnine scalability"> <div className="icon-tab"> <i className="fi fi-rr-bank"></i> </div> Scalability { status.scalability.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                                <Link to = {`/application/${cohort}/stem/${callupid}/experience`} className="tabnine experience"> <div className="icon-tab"> <i className="fi fi-rr-chat-arrow-grow"></i> </div> Experience { status.experience.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>

                            </div>



                        ) : (

                            <div className='uncompletedPersonal' onClick = {() => alert("Kindly finish submitting the form in personal to continue...")}>
                                <div  className="tabnine problem"> <div className="icon-tab"> <i className="fi fi-rr-eye"></i> </div> Problem</div>
                                <div className="tabnine relevance"> <div className="icon-tab"> <i className="fi fi-rr-layers"></i> </div> Relevance</div>
                                <div  className="tabnine impact"> <div className="icon-tab"> <i className="fi fi-rr-briefcase"></i> </div> Impact</div>
                                <div className="tabnine scalability"> <div className="icon-tab"> <i className="fi fi-rr-bank"></i> </div> Scalability</div>
                                <div className="tabnine experience"> <div className="icon-tab"> <i className="fi fi-rr-chat-arrow-grow"></i> </div> Experience</div>
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
                ) : null
            }

            {/*title bar*/}
            <div className="title-bar mints">

                <div className="panel-control">
                    
                    <Link to = {`/application/${cohort}/stem/${callupid}/personal`} className="tabnine personal"> <div className="icon-tab"> <i className="fi fi-rr-portrait"></i> </div> Personal  { status.personal.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>

                    {
                        status.personal.status === "completed" ? (


                            <div>

                                <Link to = {`/application/${cohort}/stem/${callupid}/problem`}  className="tabnine problem"> <div className="icon-tab"> <i className="fi fi-rr-eye"></i> </div> Problem { status.problem.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                                <Link to = {`/application/${cohort}/stem/${callupid}/relevance`} className="tabnine relevance"> <div className="icon-tab"> <i className="fi fi-rr-layers"></i> </div> Relevance { status.relevance.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                                <Link to = {`/application/${cohort}/stem/${callupid}/impact`}  className="tabnine impact"> <div className="icon-tab"> <i className="fi fi-rr-briefcase"></i> </div> Impact { status.impact.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                                <Link to = {`/application/${cohort}/stem/${callupid}/scalability`} className="tabnine scalability"> <div className="icon-tab"> <i className="fi fi-rr-bank"></i> </div> Scalability { status.scalability.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>
                                <Link to = {`/application/${cohort}/stem/${callupid}/experience`} className="tabnine experience"> <div className="icon-tab"> <i className="fi fi-rr-chat-arrow-grow"></i> </div> Experience { status.experience.status === 'pending' ? null : <i className="fi fi-rr-check complete " ></i>} </Link>

                            </div>



                        ) : (

                            <div className='uncompletedPersonal' onClick = {() => alert("Kindly finish submitting the form in personal to continue...")}>
                                <div  className="tabnine problem"> <div className="icon-tab"> <i className="fi fi-rr-eye"></i> </div> Problem</div>
                                <div className="tabnine relevance"> <div className="icon-tab"> <i className="fi fi-rr-layers"></i> </div> Relevance</div>
                                <div  className="tabnine impact"> <div className="icon-tab"> <i className="fi fi-rr-briefcase"></i> </div> Impact</div>
                                <div className="tabnine scalability"> <div className="icon-tab"> <i className="fi fi-rr-bank"></i> </div> Scalability</div>
                                <div className="tabnine experience"> <div className="icon-tab"> <i className="fi fi-rr-chat-arrow-grow"></i> </div> Experience</div>
                            </div>

                        )
                    }


                    

                    



                    

                    

                </div>

                <div className="nav">
                        
                    {
                        data ? <div className="submitApplication" >  Application Submitted </div> : submitReady ? <div className="submitApplication" onClick={ () => submitTheApplication() } > Submit Application </div> : <div className="submitApplication notReady" > Submit Application </div>
                    }

                </div>
                
            </div>

            <Outlet />
            
        </div>
    );
}

export default StemTitle;
