import React, {useState, useEffect} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { getApplication } from '../api/firebase/getApplication';

import SethAnimation from '../components/lottie/seth-animation';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ViewSecSch = () => {

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
    const rip = pageDetect.split("/")[4]

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



    return (

        <div className="gradingApplication">

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

                            </div>                            

                        </form>
                        
                    </div>

                </div>

            

            </div>
        </div>


    );
}

export default ViewSecSch;