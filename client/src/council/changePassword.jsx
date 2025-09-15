import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../global/styles/Auth.scss'
import '../global/styles/fragments.scss'
import ErrorModal from '../components/modals/error_modal';
import { resetPassword } from '../api/firebase/changePassword';

const ChangePassword = ({closeModal}) => {

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [success, setSuccess] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const body = document.querySelector('body')
    body.style.overflow = "hidden"

    const resetFields = () => {

        setPassword1("");
        setPassword2("")

    }

    const handlePasswordChange = () => {
       
        if (password1 !== password2) {

            alert('Passwords do not match, pls try again!');
            
        } else {

            resetPassword(password2)
            .then((e) => {
                
                if (e === 'password_changed') {

                    resetFields();
                    setSuccess(true);

                    const body = document.querySelector('body')
                    body.style.overflow = "visible"

                    closeFunction();

                }

            })
            .catch((e) => {
                console.log(e);
            })

        }

    }

    const passwordVisibility = (e) => {

        setShowPassword1(!showPassword1);

        var x = e.target.parentElement.firstChild

        if (x.type === "password") {

            x.type = "text";

        } else {

            x.type = "password";

        }


    }

    const passwordVisibility2 = (e) => {

        setShowPassword2(!showPassword2);

        var x = e.target.parentElement.firstChild

        if (x.type === "password") {

            x.type = "text";

        } else {

            x.type = "password";

        }


    }

    const closeFunction = () => {

        resetFields();        
        closeModal(false);

    }



    return (

        <div className = "Register changePassword" >

            <div className="closePassword" onClick={ () => closeFunction() } > <i className="fi fi-sr-cross"></i> </div>

            {/* <ErrorModal/> */}

            {

                success ? 
                (   
                    <div className="success">
                        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_Gh0AU0.json" background="#000"  speed="1.5"  style={{"width": "300px", "height": "300px"}} autoplay></lottie-player>
                    </div>
                    
                ) : null

            }

            <div className="title-tag" style = {{'opacity' : success ? 0.05 : 1  }}>
                <h1 style={{margin : '0 auto', color : "#fff" }}> Change Password </h1>
            </div>

            <form style = {{'opacity' : success ? 0.05 : 1  }} >

                <div className="field-data">

                    <div className="full-type">

                        <div className="icon-form"><i className="fi fi-rr-lock"></i></div>
                        
                        <div className="inputArea">
                            <input type="password" placeholder = 'Enter Password' required onChange = {(e) => setPassword1(e.target.value)}/>

                            <div className="showPass" onClick = { e => passwordVisibility(e) } > {showPassword1 ? "Show" : "Hide"} </div>

                        </div>

                    </div>

                </div>

                <div className="field-data">

                    <div className="full-type">

                        <div className="icon-form"><i className="fi fi-rr-lock"></i></div>
                        
                        <div className="inputArea">
                            <input type="password" placeholder = 'Confirm Password' required onChange = {(e) => setPassword2(e.target.value)}/>

                            <div className="showPass" onClick = { e => passwordVisibility2(e) } > {showPassword2 ? "Show" : "Hide"} </div>

                        </div>

                    </div>

                </div>


                <button className="submit-btn" type = 'submit' onClick = {

                    (e) => { 

                        e.preventDefault(); 
                        handlePasswordChange();

                    }}> Change Password </button>

                

            </form>

        </div>

    );
}

export default ChangePassword;

