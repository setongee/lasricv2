import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../../global/styles/Auth.scss'
import '../../global/styles/fragments.scss'

const CouncilLogin = () => {


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

        <div className="Register">

            {

                success ? 
                (   
                    <div className="success">
                        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_poqmycwy.json" background= "transparent" loop speed="1.5"  style={{"width": "300px", "height": "300px"}} autoplay></lottie-player>
                    </div>
                    
                ) : null

            }

            <div className="title-tag">
                <h1 style={{margin : '0 auto'}}>Welcome Back</h1>
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

                <div className="login-trigger">
                    Don't have an account? <Link to='/council/register' className="login-btn">Register</Link>
                </div>

                

            </form>

        </div>

    );
}

export default CouncilLogin;
