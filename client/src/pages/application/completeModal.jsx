import React from 'react';
import SethAnimation from '../../components/lottie/seth-animation';
import './showModal.scss'
import Faces from '../../assets/svg/africanFaces.jpeg'
import { useNavigate } from 'react-router-dom';

const CompleteModal = ({profile}) => {

    let navigate = useNavigate();

    return (

        <div className="showModalComplete">

            <div className="closeBack"></div>
            
            <div className="thereal">


                 <div className="imageProcess">
                    <img src={Faces} alt="African Faces" />
                 </div>

                <div className="contentSubmit">

                    <h4> Thank you for submitting {profile.firstname} </h4>

                    <h1> Could be your turn to join other top apllicants to build the next amazing solution in Lagos. </h1>

                    <p> Hey, your application has been submitted successfully, you will be notified soon if your application was successful or rejected. Good Luck!  </p>

                </div>

                <div className="goDashboard" onClick={() => navigate('/dashboard') }>Proceed to dashboard</div>

            </div>

        </div>

    );
}

export default CompleteModal;
