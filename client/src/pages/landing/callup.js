import React, {useState, useEffect} from 'react';
import '../../Admin/styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getCMSCallupData } from '../../api/firebase/admin/cms';
import SethAnimation from '../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../api/firebase/admin/admin_applications';
import "./styles.scss"
import EmptyData from '../../assets/svg/empty_data.png'
import ApplyCard from './apply';
import { email_notice_subscription } from '../../api/firebase/email_notice';
import Container from '../../components/container/container';
import { useCohortNumber } from '../../stores/cohort.store';
import { Xmark } from 'iconoir-react';
import Loader from '../../components/loader/loader';
import { useUser } from '../../stores/user.store';
import { editUser } from '../../api/firebase/editUser';
import Preapp from './modals-application/preapp';
import Eligibility from './modals-application/eligibility';

const ApplyApplication = () => {

    const [data, setData] = useState([]);
    const [deleteListener, setDeleteListener] = useState(true)
    const [loadPage, setLoadPage] = useState(true);
    const [noticeEmail, setNoticeEmail] = useState("")
    const cohort = useCohortNumber(state=>state.cohort)
    const [type, setType] = useState("innovation");
    let navigate = useNavigate();
    const currentUser = useUser(state=>state.currentUser);
    const [infoLinkedin, setInfoLinkedin] = useState(false);
    const [eligibility, setEligibility] = useState(true);

    const application_url = (type, uid) => {
     
        const url = `/application/cohort${cohort}/${type}/${uid}/personal`
        return url;
        
    }

    let localStorage = window.localStorage.getItem('eligibility');

    useEffect(() => {

        if(!Object.keys(currentUser).length) {
            navigate('/login');
            return;
        }
        
        if(currentUser?.quizData && currentUser?.quizData[`cohort${cohort}`] ){
            navigate(application_url(type, currentUser?.quizData[`cohort${cohort}`]?.uid))
        }

        if(!currentUser.verified) {
            setInfoLinkedin(true);
            return;
        }

        if(localStorage !== null) {
            setEligibility(false);
        }

        async function fetchData() {

          const cohortNum = await getCurrentCohortNumber().then( (e) => e[0].present );
          const response = await getCMSCallupData("callups", `cohort${cohortNum}`)

          filterExpiredCallup(response)
          .then( () => setLoadPage(false) )

        }

        fetchData();

    }, []);


    const filterExpiredCallup = async (res) => {

        const result = res.filter( e => {

            const dateData = new Date(e.data.date)
            const expiryDate = dateData.getTime();

            const dateToday = new Date;
            return expiryDate >= dateToday.getTime()

        })

        setData(result)

    }

    const handleSubmitNotice = async () => {

       if ( noticeEmail !== "" ) {

            const docv = document.getElementById("email_btn");
            docv.textContent = "Submitting..."

            await email_notice_subscription(noticeEmail, cohort)
            .then( () => {

                setTimeout(() => {

                    const docv = document.getElementById("email_btn");
                    docv.style.backgroundColor = "#43D57F";
                    docv.textContent = "Submitted"

                }, 1000);

                setTimeout(() => {

                    docv.style.backgroundColor = "#00B44E";
                    docv.textContent = "Notify Me"
                    setNoticeEmail("")
                    
                }, 2500);

            } )

       }

    }

    const handleQuizSubmit = async () => {
        
        const findTypeId = data.filter(res => res.data.track === type);
        const payload = { quizData : {...currentUser?.quizData, [`cohort${cohort}`] : {type, uid : findTypeId[0]?.uid ||"testuid"}}}

        let uid = findTypeId[0]?.uid || "testuid"
        
        await editUser(payload, currentUser.uid).then(()=>{
            navigate(application_url(type, uid));
        })

    }

    const handleEligibilityStatus = () => {
        const checkbox = document.getElementById('accept');
        if (!checkbox.checked) {
            alert("Please confirm that you have read, fully understood, and meet the eligibility criteria before proceeding.");
            return ;
        }

        setEligibility(false);
        window.localStorage.setItem('eligibility', true);

    }



    return (

        <div className="callupListing pageBrief">

            {
                infoLinkedin && 
                <div className="applicationQuiz">
                    <div className="modal">
                        <div className="title">Unverified Linkedin Profile!</div>
                        <div className="formInput">
                            <p>Sorry, you cannot apply for cohort {cohort} right now. Kindly verify your linkedin account to proceed!</p>
                            <div className="submitUrl" onClick = { () => navigate('/dashboard/verify') }>Continue</div>
                        </div>
                    </div>
                </div>
            }

            {
                loadPage ? 
                
                <div className="loadPage">
                    <div className="loadingCircle">
                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_l9bcfk19.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"2"} />
                    </div>
                </div> : null
            }

            <Container>

                <div className="callupItem landing_apply_page">

                    {
                        data.length 
                        ? 
                        (
                            <>
                                <div className="headers">
                                    <p>Apply for Cohort {cohort} </p>
                                </div>

                                {
                                    eligibility 
                                    ? 
                                    <Eligibility handleEligibilityStatus = {handleEligibilityStatus} /> 
                                    :
                                    <Preapp type = {type} setType = {setType} handleQuizSubmit = {handleQuizSubmit} />
                                }

                                <div className="result_data">
                                    {
                                        data.map((data, index) => {
                                        return <ApplyCard dataPlan = {data} key = {index} onDelete = {setDeleteListener} deleteVal = {deleteListener} />
                                    })}
                                </div>

                            </>
                            
                        ) : <p className='nope'>No active applications currently</p>
                    }

                </div>

            </Container>

        </div>

    );
}

export default ApplyApplication;


