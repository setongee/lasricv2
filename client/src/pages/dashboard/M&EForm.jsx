import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getAwardeeBank, getAwardeeDetails, updateMaintenaceForm } from '../../api/firebase/admin/admin_applications';
import './m_and_e.scss';

export default function MEForm() {

const data = {

    extent : "",
    contribution : "",
    unexpectation : "",
    support : "",
    collaborations : "",
    ecosystem : "",
    rate : "",
    help : "",
    ifNo : "",
    supportLevel : ""

}

const [dataTrack, setDataTrack] = useState([]);

const params = useParams();
const navigate = useNavigate();

const [dataForm, setDataForm] = useState(data);
const [submitted, setSubmitted] = useState(false);


const [info, setInfo] = useState({})



useEffect(() => {
    
    getAwardeeBank(params.uid)
    .then(res => {
        setDataTrack(res);
        setDataForm(res[0].data.form); 

        getAwardeeDetails(params.uid, res[0].data.cohort)
        .then(e => {
            setInfo({
                fullname : `${e.firstname} ${e.lastname}`,
                company : e.company,
                email : e.email
            })
        })
    });

    

}, []);

const handleRadioBtns = () => {

    const radd =  Array.from(document.querySelectorAll('input[type=radio'));

    radd.map( itr => {

        if ( 
            itr.value === dataForm[itr.id]
         ) {
            itr.checked = true;
         }

    } )

}


handleRadioBtns();  


const handleChange = (e) => {
  
    const {id, value} = e.target;

    setDataForm(data => {

        return {
            ...data,
            [id] : value
        }
    })  

}

const handleSubmit = () => {

    const getDataForm = Object.values(dataForm);

    const errorSearch = getDataForm.filter( e => {
        return e === "";
    })

    errorSearch.length 

    ? 
    
    alert("Kindly fill all forms as it is required!") 
    
    : 

    updateMaintenaceForm(params.uid, dataTrack[0].data.cohort, {...dataForm, ...info }).then( res => {

        setSubmitted(true);
        
        setTimeout(() => {

            setSubmitted(false);
            navigate('/dashboard');

            
        }, 2000);

    } )

}

  return (

    <div className="formBG">

        {
        
        submitted ? 

        <div className="checkGood">

            <div className="imagePhoth">

                <img src="https://firebasestorage.googleapis.com/v0/b/lasricv2.appspot.com/o/fragments%2Fsuccess%20(1).gif?alt=media&token=12160ff2-263b-4b61-aa12-014b1bd90591" alt="completed" />

            </div>

        </div> : null
        
        }
            
            <div className="formStation">

                    <div className="header_title">

                        <h1> Monitoring and Evaluating Form </h1>
                        <p>Kindly complete and submit this form for your M&E</p>

                    </div>

                    <div className="formUI">

                        <form id = "formUtils" >

                            <div className="formHolder">

                                <label> 1. To what extent did the grant create any impact? Highlight the specific impact so far. 5 being the highest , 1 being the least. </label>
                                
                                <div className="radioBtn">

                                    <input type="radio" id='extent' name='extent' onChange={handleChange} value="5" />
                                    <div className='val'> 5 </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='extent' onChange={handleChange} name='extent' value="4" />
                                    <div className='val'> 4 </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='extent' onChange={handleChange} name='extent' value="3" />
                                    <div className='val'> 3 </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='extent' onChange={handleChange} name='extent' value="2" />
                                    <div className='val'> 2 </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='extent' onChange={handleChange} name='extent' value="1" />
                                    <div className='val'> 1 </div>

                                </div>

                            </div>


                            <div className="formHolder">

                                <label> 2. Did the grant contribute to attracting additional funding or investment for your research and innovation projects? </label>
                                
                                <div className="radioBtn">

                                    <input type="radio" id='contribution' name='contribution'  onChange={handleChange} value="Yes, significantly (80%-100%)" />
                                    <div className='val'> Yes, significantly (80%-100%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='contribution' onChange={handleChange} name='contribution' value="Yes, to some extent (60%-79%)" />
                                    <div className='val'> Yes, to some extent (60%-79%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='contribution' onChange={handleChange} name='contribution' value="No, it didn't facilitate collaboration (0%-59%)" />
                                    <div className='val'> No, it didn't facilitate collaboration (0%-59%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='contribution' onChange={handleChange} name='contribution' value="No international collaborations or partnerships (N/A)" />
                                    <div className='val'> No international collaborations or partnerships (N/A) </div>

                                </div>

                            </div>

                            <div className="formHolder">

                                <label> 3. Are there any unexpected outcomes or occurrences resulting from the grant that you did not anticipate? </label>
                                
                                <div className="radioBtn">

                                    <input type="radio" id='unexpectation' name='unexpectation'  onChange={handleChange} value="yes" />
                                    <div className='val'> Yes </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='unexpectation' onChange={handleChange} name='unexpectation' value="no" />
                                    <div className='val'> No </div>

                                </div>


                            </div>

                            <div className="formHolder">

                                <label> 4. To what extent did the grant support your organization's efforts to commercialize or translate research outcomes into practical applications? </label>
                                
                                <div className="radioBtn">

                                    <input type="radio" id='support' name='support'  onChange={handleChange} value="High Impact" />
                                    <div className='val'> High Impact </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='support' onChange={handleChange} name='support' value="medium" />
                                    <div className='val'> Medium </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='support' onChange={handleChange} name='support' value="low" />
                                    <div className='val'> Low </div>

                                </div>


                            </div>

                            <div className="formHolder">

                                <label> 5. Did the grant facilitate international collaborations or partnerships in research and innovation? </label>
                                
                                <div className="radioBtn">

                                    <input type="radio" id='collaborations' name='collaborations'  onChange={handleChange} value="Yes, significantly (80%-100%)" />
                                    <div className='val'> Yes, significantly (80%-100%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='collaborations' onChange={handleChange} name='collaborations' value="Yes, to some extent (60%-79%" />
                                    <div className='val'> Yes, to some extent (60%-79%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='collaborations' onChange={handleChange} name='collaborations' value="No, it didn't facilitate collaboration (0%-59%)" />
                                    <div className='val'> No, it didn't facilitate collaboration (0%-59%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='collaborations' onChange={handleChange} name='collaborations' value="No international collaborations or partnerships (N/A)" />
                                    <div className='val'> No international collaborations or partnerships (N/A) </div>

                                </div>

                            </div>

                            <div className="formHolder">

                                <label> 6. How did the grant/work contribute to the development of the innovation ecosystem in Lagos, Nigeria? </label>
                                
                                <div className="radioBtn">

                                    <input type="text" id='ecosystem' name='ecosystem'  onChange={handleChange} value={dataForm.ecosystem} placeholder='Enter short answer...' />

                                </div>

                            </div>

                            <div className="formHolder">

                                <label> 7. How would you rate the overall effectiveness of the grant in supporting your innovation and research activities? </label>
                                
                                <div className="radioBtn">

                                    <input type="radio" id='rate' onChange={handleChange} name='rate' value=" Highly effective (80%-100%)" />
                                    <div className='val'> Highly effective (80%-100%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='rate' onChange={handleChange} name='rate' value="Moderately effective (60%-79%)" />
                                    <div className='val'> Moderately effective (60%-79%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='rate' onChange={handleChange} name='rate' value="Slightly effective (40%-59%)" />
                                    <div className='val'> Slightly effective (40%-59%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='rate' onChange={handleChange} name='rate' value="Ineffective (0%-39%)" />
                                    <div className='val'> Ineffective (0%-39%) </div>

                                </div>

                            </div>

                            <div className="formHolder">

                                <label> 8. Are there any unexpected outcomes or occurrences resulting from the grant that you did not anticipate? </label>
                                
                                <div className="radioBtn">

                                    <input type="radio" id='help' name='help'  onChange={handleChange} value="yes" />
                                    <div className='val'> Yes </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='help' onChange={handleChange} name='help' value="no" />
                                    <div className='val'> No </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='help' onChange={handleChange} name='help' value="maybe" />
                                    <div className='val'> Maybe </div>

                                </div>


                            </div>

                            <div className="formHolder">

                                <label> 9. If NO or MAYBE in the above kindly state what was in your proposals. </label>
                                
                                <div className="radioBtn">

                                    <input type="text" id='ifNo' name='ifNo'  onChange={handleChange} value={dataForm.ifNo} placeholder='Enter short answer...' />

                                </div>

                            </div>

                            <div className="formHolder">

                                <label> 10. How would you rate the level of support and guidance provided by LASRIC throughout the grant period? </label>
                                
                                <div className="radioBtn">

                                    <input type="radio" id='supportLevel' onChange={handleChange} name='supportLevel' value="Very high level of support (80%-100%)" />
                                    <div className='val'> Very high level of support (80%-100%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='supportLevel' onChange={handleChange} name='supportLevel' value="Moderate level of support (60%-79%)" />
                                    <div className='val'> Moderate level of support (60%-79%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='supportLevel' onChange={handleChange} name='supportLevel' value="Minimal level of support (40%-59%)" />
                                    <div className='val'> Minimal level of support (40%-59%) </div>

                                </div>

                                <div className="radioBtn">

                                    <input type="radio" id='supportLevel' onChange={handleChange} name='supportLevel' value="No support provided (0%-39%)" />
                                    <div className='val'> No support provided (0%-39%) </div>

                                </div>

                            </div>

                            {
                                dataTrack.length && !dataTrack[0].data.status ? <div className="submitButtonForm" onClick={ handleSubmit } >Submit</div> : null
                            }
                            

                            

                        </form>

                    </div>

            </div> 
            
            

    </div>


  )

}
