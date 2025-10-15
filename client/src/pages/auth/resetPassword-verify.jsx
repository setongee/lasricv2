import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import '../../global/styles/Auth.scss'
import '../../global/styles/fragments.scss'
import logo from '../../assets/svg/logo__lasric.svg'
import mark from '../../assets/auth/quote.svg'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'iconoir-react';
import Loader from '../../components/loader/loader';
import { resetPassword } from '../../api/firebase/resetPassword';
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

const VerifyResetPassword = () => {

    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const auth = getAuth()

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(true)

    const oobCode = searchParams.get("oobCode");

    useEffect(() => {
    async function verifyCode() {
        try {
            const userEmail = await verifyPasswordResetCode(auth, oobCode);
            setEmail(userEmail);
            setSuccess(false)
        } catch (err) {
            setError("Invalid or expired reset link");
            setSuccess(false)
        }
        }
        if (oobCode) verifyCode();
    }, [oobCode]);


    const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (password1 !== password2) {
      alert("Passwords do not match.");
      return;
    }

    setSuccess(true);
    try {
      await confirmPasswordReset(auth, oobCode, password1);
      alert("✅ Password reset successful! You can now log in.");
      navigate("/login")
    } catch (err) {
      setError(err.message);
    } finally {
      setSuccess(false);
    }
  };

    useEffect(() => {
       
    }, []);

    if(success) return <div className="authComponent"><div className="loadingLoader"> <Loader/> </div></div>

    if(error) {

        return (
            <div className="errorLink">
                <div className="error-body">
                <div className="logoPin error-logo"><img src={logo} alt="" /></div>
                    <p>Invalid or expired reset link, try again to reset password!</p>
                    <a href="/">Go back to homepage <ArrowRight fontSize={12}/> </a>
                </div>
            </div>
        )

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
                    <p>Create New Password</p>
                    <div className='di'>Enter your preferred new password</div>
                </div>

                <form>

                    <div className="field-data">

                        <div className="full-type">
                                
                            <div className="inputArea">
                                <label htmlFor="">New Password</label>
                                <input type="password" placeholder = 'Enter New Password' required onChange = {(e) => setPassword1(e.target.value)}/>
                            </div>
                            
                        </div>


                    </div>

                    <div className="field-data">

                        <div className="full-type">
                                
                            <div className="inputArea">
                                <label htmlFor="">Confirm New Password</label>
                                <input type="password" placeholder = 'Confirm New Password' required onChange = {(e) => setPassword2(e.target.value)}/>
                            </div>
                            
                        </div>


                    </div>

                    <button className="submit-btn" type = 'submit' onClick = {(e) => {e.preventDefault(); handleSubmit()}}> Continue </button>

                </form>

            </div>

        </div>

    );
}

export default VerifyResetPassword;
