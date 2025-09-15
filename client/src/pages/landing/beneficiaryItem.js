import React, {useState, useEffect} from 'react';
import '../../Admin/styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import { setLandingDetails, getCMSData, addCallupsDetails, getCMSCallupData } from '../../api/firebase/admin/cms';
import SethAnimation from '../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../api/firebase/admin/admin_applications';

const BeneficiariesItemLanding = ({dataPlan, onDelete, deleteVal}) => {

    const Navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)


    useEffect(() => {
        
        setData(dataPlan.data);

    }, []);


    const webURL = () => {

        window.open(data.website, '_blank')

    }


    return (


        <div className='cms-joint beneficiary_item' onClick={ () => webURL() } >


            <div className="logoBen">

                <img src={data.logo} alt="company logo image" />

            </div>

            <div className="foundersCorner"> {data.founders} </div>

        </div>

    );
}

export default BeneficiariesItemLanding;




