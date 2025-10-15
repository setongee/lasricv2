import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../../global/styles/Auth.scss'
import '../../global/styles/fragments.scss'
import logo from '../../assets/svg/logo__lasric.svg'
import mark from '../../assets/auth/quote.svg'
import { ArrowLeft, ArrowUpRight } from 'iconoir-react';
import Loader from '../../components/loader/loader';
import { resetPassword } from '../../api/firebase/resetPassword';

const ResetPassword = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false)

    const SignInUser = () => {

        setSuccess(true);

        resetPassword(email)
        .then((e)=> {
            if(e.status === "error" && e.message === "auth/user-not-found"){
                alert("Email doesn't exist, try a valid email");
                setSuccess(false);
            }else{
                alert(e.message);
                setSuccess(false);
            }
        })
    }

    return (

        <div className="authComponent">

            {
                success ? <div className="loadingLoader"> <Loader/> </div> : null
            }

            <div className="Register central">

                <div className="headerAuth">

                    <div className="logoPin"><img src={logo} alt="" /></div>
                    <Link to = "/" className="back"> Go to Main Site <div className="icon"><ArrowUpRight/></div> </Link>

                </div>

                <div className="authTitle" >
                    <p>Forgot Password</p>
                    <div className='di'>Enter your email address to reset your password</div>
                </div>

                <form>

                    <div className="field-data">

                        <div className="full-type">
                                
                            <div className="inputArea">
                                <label htmlFor="">Email address</label>
                                <input type="email" placeholder = 'Enter Email' required onChange = {(e) => setEmail(e.target.value)}/>
                            </div>
                            
                        </div>


                    </div>

                    <button className="submit-btn" type = 'submit' onClick = {(e) => {e.preventDefault(); SignInUser()}}> Continue </button>

                </form>

            </div>

        </div>

    );
}

export default ResetPassword;
