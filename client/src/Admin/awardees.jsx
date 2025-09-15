import React,{useState, useEffect} from 'react'
import {addAwardees, getAwardeeBank, getAwardees, getCurrentCohortNumber, getPotentiaalApps, getSubmittedAwardeesBank} from '../api/firebase/admin/admin_applications'
import { useNavigate } from 'react-router-dom';
import { CSVLink } from "react-csv";


export default function Awardees() {

    const [potentialAwardees, setPotentialAwardees] = useState([]);
    const [awardees, setAwardees] = useState([]);
    
    const [potentialAwardeesModal, setPotentialAwardeesModal] = useState(false);
    const [addStatus, setAddStatus] = useState(false);
    const [complete, setComplete] = useState(false);

    const [loaded, setLoaded] = useState(false);

    const [dataExport, setDataExport] = useState([]);

    const navigate = useNavigate()


    const openPotentialAwardeesModaL = () => {

        setPotentialAwardeesModal(true);

    }

    const closePotentialAwardeesModaL = () => {

        setPotentialAwardeesModal(false);

    }

    //console.log(awardees[1].data.dateUpdated)

    const pushAwardees = () => {

        console.log('checking...');

        const selected = document.querySelectorAll('#selectAwardee');
        const majorArr = Array.from(selected);

       const selectedApps = majorArr.filter((e) => {

            return e.checked === true

        });

        selectedApps.map(e=>{
            
            const appsData = potentialAwardees[e.parentElement.id];

            const newData = {
                uid : appsData.data.uid, 
                firstname : appsData.data.firstname,
                lastname : appsData.data.lastname,
                email : appsData.data.email || "",
                track : appsData.data.track,
                callID : appsData.data.callID,
                company : appsData.data.companySector,
                grade : appsData.data.grade_export,
                phone : appsData.data.phone || "",
                status : false,
                dataUpdated : null
            }

            addAwardees(newData, appsData.id);

        })

        console.log({
            status : 'ok',
            message : `You have successfully added ${selectedApps.length} applicants!`
        });

        setAddStatus(!addStatus);
        setComplete(true)

        setTimeout(() => {

            setComplete(false)
            closePotentialAwardeesModaL();
            
        }, 3000);

    }

    const selectAwardee = (e) => {

        e.preventDefault();
        

        if (e.target.classList[0] === 'tableHeader_hl') {

            const checkValue = e.target.childNodes[0].checked;
            e.target.childNodes[0].checked = !checkValue;

        } else if (e.target.classList[0] === 'initA'){

            const checkValue = e.target.parentElement.parentElement.childNodes[0].checked;
            e.target.parentElement.parentElement.childNodes[0].checked = !checkValue;

        }else {

            const checkValue = e.target.parentElement.childNodes[0].checked;
            e.target.parentElement.childNodes[0].checked = !checkValue;

        }

    }

    useEffect(() => {

        setLoaded(true);
        document.querySelector('body').style.overflow = "hidden";
        
        getPotentiaalApps()
        .then( (e) => {
            setPotentialAwardees(e);
        });

        getAwardees()
        .then( e => {
            setAwardees(e);

            setTimeout(() => {

                setLoaded(false);
                document.querySelector('body').style.overflow = "visible";
                
            }, 2000);

        } ).catch( () => {
            setLoaded(false);
            document.querySelector('body').style.overflow = "visible";
        } )


        //getAwardeeBank()

        getSubmittedAwardeesBank()
        .then( res => setDataExport(res) )

    }, [addStatus, potentialAwardeesModal]);

    //csv download

    const headers = [

        { 
            label: "Fullname", 
            key: "fullname" 
        },
        { 
            label: "Company / Institution", 
            key: "company" 
        },
        { 
            label: "Email", 
            key: "email" 
        },

        //form questions

        { 
            label: "To what extent did the grant create any impact? Highlight the specific impact so far. 5 being the highest , 1 being the least.", 
            key: "extent" 
        },
        { 
            label: "Did the grant contribute to attracting additional funding or investment for your research and innovation projects?", 
            key: "contribution" 
        },
        { 
            label: "Are there any unexpected outcomes or occurrences resulting from the grant that you did not anticipate?", 
            key: "unexpectation" 
        },
        { 
            label: "To what extent did the grant support your organization's efforts to commercialize or translate research outcomes into practical applications?", 
            key: "support" 
        },
        { 
            label: "Did the grant facilitate international collaborations or partnerships in research and innovation?", 
            key: "collaborations" 
        },
        { 
            label: "How did the grant/work contribute to the development of the innovation ecosystem in Lagos, Nigeria?", 
            key: "ecosystem" 
        },
        { 
            label: "How would you rate the overall effectiveness of the grant in supporting your innovation and research activities?", 
            key: "rate" 
        },
        { 
            label: "Are there any unexpected outcomes or occurrences resulting from the grant that you did not anticipate?", 
            key: "help" 
        },
        { 
            label: "If NO or MAYBE in the above kindly state what was in your proposals.", 
            key: "ifNo" 
        },
        { 
            label: "How would you rate the level of support and guidance provided by LASRIC throughout the grant period?", 
            key: "supportLevel" 
        }

        //end ofform questions
        
      ];

    


return (


    <div className="awardeesArea">


        {
            loaded 
            ?
            <div className="loadingScreen">
                <div className="load">
                    <img src="https://firebasestorage.googleapis.com/v0/b/lasricv2.appspot.com/o/fragments%2FLoader%20(2).gif?alt=media&token=b7eb2ebe-43fd-4ac0-8921-6949ab880178" alt="loading..." />
                </div>
            </div> : null
        }


        { 
        
            potentialAwardeesModal ? 
            
            (
                
            <div className="absolute_dezz">

            {
                
                potentialAwardees.length ?
                
                <div className='addAwardeesP'>

                    {
                        complete 
                        
                        ? 

                        <div className="checkGood">

                            <div className="imagePhoth">

                                <img src="https://firebasestorage.googleapis.com/v0/b/lasricv2.appspot.com/o/fragments%2Fsuccess%20(1).gif?alt=media&token=12160ff2-263b-4b61-aa12-014b1bd90591" alt="completed" />

                            </div>

                        </div> : null
                    }

                    <div className="highlight">

                        <div className="topic">
                            
                            <div className="headR">
                                <h1>Interview Bucket Applications</h1>
                                <p>Add applicants from interview bucket to awardee list</p>
                            </div>

                            <div className="control">

                                <div className="pushToAwardeeSection"  onClick={() => pushAwardees()} >Add Applicants</div>
                                <div className="pushToAwardeeSection cancel"  onClick={() => closePotentialAwardeesModaL()} >Cancel</div>

                            </div>
                        </div>

                        <div className="tableHeader_hl headingTop">

                            <div className="heading_awardee tiktok"></div>
                            <div className="heading_awardee fullname">Fullname</div>
                            <div className="heading_awardee comp">Company</div>
                            <div className="heading_awardee">Track</div>
                            <div className="heading_awardee">Grade</div>




                        </div>

                        
                        {
                            potentialAwardees.map( (res, index) => {

                                return (

                                    <div className="tableHeader_hl list_awardee" onClick={(e) => selectAwardee(e)} key={res.id} id = {index} >

                                        <input type = 'checkbox' className="heading_awardee tiktok" id = 'selectAwardee' />
                                        <div className="heading_awardee fullname"> <div className="initA" style={{backgroundColor: `${res.data.track === 'stem' ? "#c293ff" : res.data.track === 'innovation' ? "#c1deff" : "#a49eff" }`}}> {res.data.firstname.split('')[0]}{res.data.lastname.split('')[0]} </div> {res.data.firstname} {res.data.lastname} </div>
                                        <div className="heading_awardee comp">{res.data.companySector}</div>
                                        <div className="heading_awardee">{res.data.track}</div>
                                        <div className="heading_awardee">{res.data.grade_export}</div>


                                    </div>


                                )

                            } )
                        }

                        

                    </div>

                </div>

                : null

            }


        </div> 
        
        
        ) : null
            
    
    }


        <div className="header_awardees">

            <h1> Awardees </h1>

            <div className="buttonsZone">
                <div className="addAwardee downloadX"> <CSVLink data={dataExport} headers={headers} filename={`LASRIC 2023 Applications_Export.csv`} className="btn_download" > Export Responses </CSVLink> </div>
                <div className="addAwardee" onClick={() => openPotentialAwardeesModaL()} > Add Awardee </div>
            </div>
            

        </div>

        <div className="awardeesArea">

            <div className="list_awardees_here">

            {
                    
                    awardees.length ?
                    
                    <div className='addAwardeesP awardee_real'>

                        <div className="highlight">

                            <div className="tableHeader_hl headingTop">

                                <div className="heading_awardee fullname">Fullname</div>
                                <div className="heading_awardee comp">Company</div>
                                <div className="heading_awardee">Track</div>
                                <div className="heading_awardee">Date Submited</div>
                                <div className="heading_awardee">Action</div>



                            </div>

                            
                            {
                                awardees.map( (res, index) => {

                                    return (

                                        <div className="tableHeader_hl list_awardee" key = {index} >

                                            <div className="heading_awardee fullname"> <div className="initA" style={{backgroundColor: `${res.data.track === 'stem' ? "#c293ff" : res.data.track === 'innovation' ? "#c1deff" : "#a49eff" }`}}> {res.data.firstname.split('')[0]}{res.data.lastname.split('')[0]} </div> {res.data.firstname} {res.data.lastname} </div>
                                            <div className="heading_awardee comp">{res.data.company}</div>
                                            <div className="heading_awardee">{res.data.track}</div>
                                            <div className="heading_awardee">{ res.data.dataUpdated === null ? "Not Submitted yet" : res.data.dataUpdated.toDate().toDateString() }</div>

                                            {
                                                res.data.status ? 
                                                <div className="heading_awardee btnA" onClick={() => navigate(`/admin/awardees/form/${res.data.uid}`)} > <div className="view">View Form</div> </div>
                                                : <div className="heading_awardee"> - </div>
                                            }


                                        </div>


                                    )

                                } )
                            }

                            

                        </div>

                    </div>

                    :  
                    
                    <div className="awardeeList">

                        <div className="emptyState">
            
                            <div className="lottieArr">
                                <img src="https://firebasestorage.googleapis.com/v0/b/lasricv2.appspot.com/o/fragments%2Fwoman-emptying-envelope.gif?alt=media&token=d683885f-2012-4fb9-8cdc-bfbf006423b5" alt="" />
                            </div>
                            <div className="message">Oops! You have not added any awardee yet</div>
            
                        </div>
            
                    </div>

                }


            </div>

        </div>


       

    </div>

  )

}
