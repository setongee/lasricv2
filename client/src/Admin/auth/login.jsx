import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../../global/styles/Auth.scss'
import '../../global/styles/fragments.scss'
import './admin-model.scss'
import Logo from '../../assets/svg/lasric_logo.svg'

const AdminLogin = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false)

    const SignInUser = () => {

        setSuccess(true);

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {

            setTimeout(async () => {

                setSuccess(false); 
                
            }, 3500);
        })
        .catch((err) => { 
            alert('error with sign in'); 
            setSuccess(false) 
        });

    }

    return (

        <div className="Register Register_admin">

            <div className="sidebarDesign"></div>

            {

                success ? 
                (   
                    <div className="success">
                        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_poqmycwy.json" background= "transparent" loop speed="1.5"  style={{"width": "300px", "height": "300px"}} autoplay></lottie-player>
                    </div>
                    
                ) : null

            }

            <div className="contentAdmin">

                <div className="logoAdmin">
                    <img src={Logo} alt="lasric Logo" />
                </div>

                <form>

                    <div className="field-data">


                        <div className="full-type">

                            <div className="icon-form"><i className="fi fi-rr-envelope"></i></div>
                                
                            <div className="inputArea">
                                <input type="email" placeholder = 'Enter Email' required autoFocus  onChange = {(e) => setEmail(e.target.value)}/>
                            </div>
                            
                        </div>


                    </div>

                    <div className="field-data">

                        <div className="full-type">

                            <div className="icon-form"><i className="fi fi-rr-lock"></i></div>
                            
                            <div className="inputArea">
                                <input type="password" placeholder = 'Enter Password' required onChange = {(e) => setPassword(e.target.value)}/>
                            </div>

                        </div>

                    </div>


                    <button className="submit-btn" type = 'submit' onClick = {(e) => {e.preventDefault(); SignInUser()}}> Login </button>

                    

                </form>

            </div>

        </div>

    );
}

export default AdminLogin;
