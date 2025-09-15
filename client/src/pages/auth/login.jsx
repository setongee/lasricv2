import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../../global/styles/Auth.scss'
import '../../global/styles/fragments.scss'
import logo from '../../assets/svg/logo__lasric.svg'
import mark from '../../assets/auth/quote.svg'
import { ArrowLeft, ArrowUpRight } from 'iconoir-react';
import Loader from '../../components/loader/loader';

const Login = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false)

    const SignInUser = () => {

        setSuccess(true);

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate('/dashboard')

        })
        .catch((err) => {{alert('error with sign in'); setSuccess(false);}});

    }

    return (

        <div className="authComponent">

            {
                success ? <div className="loadingLoader"> <Loader/> </div> : null
            }

            <div className="platform">

                <p>
                    
                    <div className="quote"><img src={mark} alt="" /></div>
                    
                    👋  Welcome to LASRIC – your gateway to innovation and excellence. Log in to explore groundbreaking opportunities, drive impactful change, and be a part of shaping the future. Together, let's innovate and inspire!

                    <div className="authr">
                        <div className="nameArthr">Engr (Mrs) Ibilola Kasunmu</div>
                        <div className='posi'> Permanent Secretary Lagos State Ministry of Innovation, Science and Technology </div>
                    </div>

                </p>
            </div>

            <div className="Register">

                <div className="headerAuth">

                    <div className="logoPin"><img src={logo} alt="" /></div>
                    <Link to = "/" className="back"> Go to Main Site <div className="icon"><ArrowUpRight/></div> </Link>

                </div>

                <div className="authTitle" >
                    <p>Sign In to your Dashboard</p>
                    <div className='di'>Welcome back, Explore more</div>
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

                    <div className="field-data">

                        <div className="full-type">
                            
                            <div className="inputArea">
                                <label htmlFor="">Password</label>
                                <input type="password" placeholder = 'Enter Password' required onChange = {(e) => setPassword(e.target.value)}/>
                            </div>

                        </div>

                    </div>


                    <button className="submit-btn" type = 'submit' onClick = {(e) => {e.preventDefault(); SignInUser()}}> Sign In </button>

                    <div className="login-trigger">
                        Don't have an account? <Link to='/register' className="login-btn">Join LASRIC</Link>
                    </div>

                    

                </form>

            </div>

        </div>

    );
}

export default Login;
