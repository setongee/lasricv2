import React, {useState, useEffect} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Stemtr from '../../components/tabletr/stemtr';

import { getApplication } from '../../api/firebase/getApplication';
import { updateGrade, getApplicationGrades } from '../../api/firebase/council-applications';

import SethAnimation from '../../components/lottie/seth-animation';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const GradeSecSch = ({councilProfile}) => {

const Navigate = useNavigate()

    const formData23 = {

        data : {
            current : '',
            describe : '',
            importance : "",
            target : '',
            unique : '',
            video : ""

        }

    }

    const [form2, setForm2] = useState(formData23)
    const pageDetect = useLocation().pathname
    const rip = pageDetect.split("/")[6]

    const [score, setScore] = useState({

        importance : '',
        unique : '',
        target : '',
        current : '',
        describe : ''

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

                setForm2(response.data.idea);

            }
        });

        console.log(form2.data)

        //get gradings

        getApplicationGrades(rip)
        .then( data => {

            if (data.length) {

                const result = data[0].grades[councilProfile.uid].gradings;
                setScore(result)

            } 
        } )
        
    }, []);


    // useEffect(() => {
       
    //     console.log("yesssir");

    //     const storage = getStorage();

    //     getDownloadURL(ref(storage, 'images/stars.jpg'))
    //     .then((url) => {



    //     })

    // }, [form2]);


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

    const dip = Object.values(score).reduce((a, b) => Number(a) + Number(b));

    const handleSubmitGrade = async () => {

        await updateGrade(rip, dip, councilProfile.uid, score).then(() => Navigate('/council'))

    }



    return (

        <div className="gradingApplication">

           
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

                        <h1>{dip}%</h1>

                </div>



                <div className="activity" onClick={()=>handleSubmitGrade()}>
                Submit Grading
                </div>

            </div>


           <div className="applicationStem">

                <div className="application innovation custom-grade">


                    <div className="body-section">

                        <form className='lasric-apply-form gradingPart'>

                            <div className="sections">
                                
                                <div className="section">
                                    <label htmlFor="">Ideas</label>
                                    <div className="line-section" />
                                </div>

                                <div className="sub-section">
                                    <label for="">1. What is the importance of your idea or innovation to the State? </label>
                                    <textarea name="" rows="5" placeholder="Please Enter..." id="red" value={form2.data.importance}></textarea>
                                </div>


                                <div className="sub-section grade-value">

                                <label>
                                        <strong>Grade this Area (Max of 20)</strong>
                                </label>

                                <input type="text" placeholder = "Enter your Score" id = "importance" onChange={handleGradeChange}  value = {score.importance} />

                             </div>

                            </div>

                            <div className="sections">
                                
                                <div className="section">
                                    <label htmlFor="">Ideas</label>
                                    <div className="line-section" />
                                </div>

                                <div className="sub-section">
                                    <label for="">1. What are people currently doing to deal with the problem your idea or Innovation intends to solve? </label>
                                    <textarea name="" rows="5" placeholder="Please Enter..." id="current" value={form2.data.current}></textarea>
                                </div>


                                <div className="sub-section grade-value">

                                <label>
                                        <strong>Grade this Area (Max of 20)</strong>
                                </label>

                                <input type="text" placeholder = "Enter your Score" id = "current" onChange={handleGradeChange}  value = {score.current} />

                             </div>

                            </div>



                            <div className="sections">
                                
                                <div className="section">
                                    <label htmlFor="">Ideas</label>
                                    <div className="line-section" />
                                </div>

                                <div className="sub-section">
                                    <label for=""> 1. Briefy describe your proposed idea or innovation </label>
                                    <textarea name="" rows="5" placeholder="Please Enter..." id="describe" value={form2.data.describe}></textarea>
                                </div>


                                <div className="sub-section grade-value">

                                <label>
                                        <strong>Grade this Area (Max of 20)</strong>
                                </label>

                                <input type="text" placeholder = "Enter your Score" id = "describe" onChange={handleGradeChange}  value = {score.describe} />

                             </div>

                            </div>



                            <div className="sections">
                                
                                <div className="section">
                                    <label htmlFor="">Ideas</label>
                                    <div className="line-section" />
                                </div>

                                <div className="sub-section">
                                    <label for=""> 1. What makes your solution unique? </label>
                                    <textarea name="" rows="5" placeholder="Please Enter..." id="unique" value={form2.data.unique}></textarea>
                                </div>


                                <div className="sub-section grade-value">

                                <label>
                                        <strong>Grade this Area (Max of 20)</strong>
                                </label>

                                <input type="text" placeholder = "Enter your Score" id = "unique" onChange={handleGradeChange}  value = {score.unique} />

                             </div>

                            </div>



                            <div className="sections">
                                
                                <div className="section">
                                    <label htmlFor="">Ideas</label>
                                    <div className="line-section" />
                                </div>

                                <div className="sub-section">
                                    <label for=""> 1. Who are the people affected by the problems that your idea or innovation intends to solve? </label>
                                    <textarea name="" rows="5" placeholder="Please Enter..." id="target" value={form2.data.target}></textarea>
                                </div>


                                <div className="sub-section grade-value">

                                <label>
                                        <strong>Grade this Area (Max of 20)</strong>
                                </label>

                                <input type="text" placeholder = "Enter your Score" id = "target" onChange={handleGradeChange}  value = {score.target} />

                             </div>

                            </div>


                            {/* <div className="sections">
                                
                                <div className="section">
                                    <label htmlFor="">Video</label>
                                    <div className="line-section" />
                                </div>

                                <a href='/' className="viewVideo"> View Video </a>

                            </div> */}
                            

                        </form>
                        
                    </div>

                </div>


           {
                !score.target || !score.describe || !score.importance || !score.current || !score.unique === "" ? (

                    <div className="realtimeScore">
                        <div className="score_real">Your Total Grading is  : <strong>{dip}</strong>% </div>
                        <div className="submitApplication emppty">Submit Application</div>
                    </div>

                ) : <div className="realtimeScore">
                        <div className="score_real">Your Total Grading is  : <strong>{dip}</strong>% </div>
                        <div className="submitApplication" onClick = { () => { handleSubmitGrade(); setLoadSubmit( true) } }  >Submit Application</div>
                    </div>
            }
            

            </div>
        </div>


    );
}

export default GradeSecSch;