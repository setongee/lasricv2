import React, {useState, useEffect} from 'react';
import '../../Admin/styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import { setLandingDetails, getCMSData, addCallupsDetails, getCMSCallupData, getCMSCallupDataBeneficiary } from '../../api/firebase/admin/cms';
import SethAnimation from '../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../api/firebase/admin/admin_applications';
import BeneficiariesItemLanding from './beneficiaryItem';
import EmptyData from '../../assets/svg/empty_data.png'

const Beneficiaries = () => {

    const Navigate = useNavigate()

    const [data, setData] = useState([]);
    const [cohort, setCohort] = useState("cohort0");
    const [track, setTrack] = useState("all");
    const [deleteListener, setDeleteListener] = useState(true)
    const [loadPage, setLoadPage] = useState(true);

    useEffect(() => {

        async function fetchData() {

          setData([])

          switch (track) {
        
            case 'all':
    
                var act = document.querySelector('.tracks .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.all').classList.add('active')
    
                } else {
    
                    document.querySelector('.all').classList.add('active')
    
                }
                
                break;
            
            case 'innovation':
    
                var act = document.querySelector('.tracks .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.innovation').classList.add('active')
    
                } else {
    
                    document.querySelector('.innovation').classList.add('active')
                    
                }
                
                break;
    
            case 'research':
    
                var act = document.querySelector('.tracks .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.research').classList.add('active')
    
                } else {
    
                    document.querySelector('.research').classList.add('active')
                    
                }
                
                break;
    
                case 'stem':
    
                    var act = document.querySelector('.tracks .active');
                    
                    if(act !== null) {
        
                        act.classList.remove('active');
                        document.querySelector('.stem').classList.add('active')
        
                    } else {
        
                        document.querySelector('.stem').classList.add('active')
                        
                    }
                    
                    break;
        
            default:
                break;
        }


          const response = await getCMSCallupDataBeneficiary("beneficiaries", cohort, track);
          setData(response);

        }

        fetchData();

      }, [cohort, track]);


      useEffect(() => {

        async function fetchCohort() {

          const cohort = await getCurrentCohortNumber().then( (e) => e[0].present)
          
          if ( Number(cohort) > 0 ) {

             setCohort('cohort1');

          }

          // Fill in the past cohorts in the options
          const selectOptionsBody = document.querySelector('#select_track');

          if (!selectOptionsBody.childNodes.length) {


              for ( let i = 1; i < cohort; i++ ) {
        
                const selectOptions = document.querySelector('#select_track');
    
                const option = document.createElement('option');
                option.value = `cohort${i}`;
                option.innerText = `Cohort ${i}`;
    
                selectOptions.appendChild(option)
    
                const selectOptionsBody = document.querySelector('#select_track');
                selectOptionsBody.value = `cohort${Number(cohort) - 1}`

                setLoadPage(false)
            
            }  

            selectOptionsBody.childNodes[0].selected = 'true'

          }

        }

        fetchCohort();

      }, []);

      
    const handleChange = (e) => {

      setData([])
      setCohort(e.target.value);

    }


    return (

        <div className="callupListing landing_beneficiaries">

            {
                loadPage ? 
                
                <div className="loadPage">
                    <div className="loadingCircle">
                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_l9bcfk19.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"1"} />
                    </div>
                </div> : null
            }
            

            <div className="topic">Beneficiaries</div>

            <div className="cms-nav beneficiary">

                <div className="sidedItem">

                    <div className="selectTrack">

                        <div className="trackCohort">
                            
                            <p>Filter by Cohort</p>

                            <select name="select_track" id="select_track" onChange={handleChange} >
                                
                            </select>

                        </div>

                        <div className="filterTrackHMO">

                            <p>Filter by track : </p>

                            <div className="tracks">

                                <p className='all active' onClick={ () => setTrack("all") } >All</p>
                                <p className='innovation' onClick={ () => setTrack("innovation") } >Innovation</p>
                                <p className='research' onClick={ () => setTrack("research") } >Research</p>
                                <p className='stem' onClick={ () => setTrack("stem") } >Stem</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="callupItem beneficiary_map">

                    <div className="list_timp">

                    {
                        data.length ? data.map((data, index) => {

                            return <BeneficiariesItemLanding dataPlan = {data} key = {index} onDelete = {setDeleteListener} deleteVal = {deleteListener} />
                            
                        }) : <div className="no-data-state noDataState_landing">

                        <div className="none_anim">

                            <img src={EmptyData} alt="empty data state" />

                        </div>
        
                        <div className="info_msg">
                            
                                {/* No beneficiaries added yet
                                {<br></br>}
                                {<br></br>}
                            Kindly check back later on as awardees will be updated duly */}

                            Oops! Nothing here to show

                        
                        </div>

                        </div>

                    }

                </div>

            </div>


            <div className="footerPlace">

                <p> {data.length} results found </p>

            </div>


        </div>

    );
}

export default Beneficiaries;
