import React, {useState, useEffect} from 'react';
import { CSVLink } from "react-csv";
import { useNavigate } from 'react-router-dom';
import { getCurrentCohortNumber, getPassmark } from '../../api/firebase/admin/admin_applications';
import { getAdminUserDetails, updateCohort, updatePassmark } from '../../api/firebase/admin/preferences';
import SethAnimation from '../../components/lottie/seth-animation';
import './preferences.scss';
import '../styles/cms.scss'

const Cohort = () => {

    const navigate = useNavigate();

    const [cohort, setCohort] = useState("");
    const [passmark, setPassmark] = useState("");
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)


    useEffect(() => {

        async function fetchData() {

            const response = await getCurrentCohortNumber();
            const passmark =  await getPassmark();
            setCohort(response[0].present);
            setPassmark(passmark.grade)

        }

        fetchData();

    }, []);


    const handleSubmit = (e) => {

        //loader is initiated here
        setLoading(true);
        window.scrollTo(0, 0);

        updateCohort( { present : cohort } ).then( () => {

            setLoading(false)

            setTimeout(() => {

                setAlert(true)
                
                setTimeout(() => {

                    const alert = document.querySelector('.alertSuccess');
                    alert.style.right = '0px'
                    
                }, 100);
                
            }, 100)

            setTimeout(() => {

                const alert = document.querySelector('.alertSuccess');
                alert.style.right = '-400px'
                
                setTimeout(() => {

                    setAlert(false)
                    
                }, 1000);

                navigate('/admin/preferences/cohort');
            
            }, 4000)

        } )
    }

    const handleSubmit2 = (e) => {

        //loader is initiated here
        setLoading(true);
        window.scrollTo(0, 0);

        updatePassmark( { grade : Number(passmark) } ).then( () => {

            setLoading(false)

            setTimeout(() => {

                setAlert(true)
                
                setTimeout(() => {

                    const alert = document.querySelector('.alertSuccess');
                    alert.style.right = '0px'
                    
                }, 100);
                
            }, 100)

            setTimeout(() => {

                const alert = document.querySelector('.alertSuccess');
                alert.style.right = '-400px'
                
                setTimeout(() => {

                    setAlert(false)
                    
                }, 1000);

                navigate('/admin/preferences/cohort');
            
            }, 4000)

        } )
    }


    return (

        <div className="profile_page">

            {/* <CSVLink data={dataO} headers={headers} filename={"LASRIC_Download_FIle.csv"} > Download me </CSVLink>; */}

            <div className="cohortJoint">

                {
                    loading ? <div className="loaderScreen">
                    <SethAnimation jsonSrc={"https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />
                </div> : null
                }

                {
                    alert ? 
                    
                    <div className="alertSuccess">

                        <div className="sethAnim">
                            <SethAnimation jsonSrc={"https://assets7.lottiefiles.com/packages/lf20_afs4kbqm.json"} lottieStyle = {{width: '50px', height: '50px'}} speed={"1"} />
                        </div>

                        Your inforrmation has been updated and saved successfully!

                    </div> : null
                }

            </div>

            <div className="cohort1">
                
                <form className="form-profile">

                    <div className="each_input">
                        <label> Cohort Number </label>
                        <input type="text" name = "cohort" placeholder='Enter Current Cohort Number' value={cohort} onChange={ e => setCohort(e.target.value) }/>
                    </div>

                </form>

                <div className="button_cohort" onClick={handleSubmit}> Submit </div>

            </div>

            <div className="cohort1">
                
                <form className="form-profile">

                    <div className="each_input">
                        <label> Grading Passmark </label>
                        <input type="text" name = "cohort" placeholder='Enter Grading Passmark' value={passmark} onChange={ e => setPassmark(e.target.value) }/>
                    </div>

                </form>

                <div className="button_cohort" onClick={handleSubmit2}> Submit </div>

            </div>

        </div>

    );
}

export default Cohort;
