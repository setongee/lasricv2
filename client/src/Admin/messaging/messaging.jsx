import React, {useState, useEffect} from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import button from '../../assets/svg/mail.png'
import { getAllEmails, sendEmailLogic, sendEmailPending } from '../../api/firebase/admin/email_logic';
import SethAnimation from '../../components/lottie/seth-animation';
import nullSVG from '../../assets/svg/lasric_null.svg'

const Messaging = () => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [email_details, set_email_details] = useState({
        recipient : "all",
        subject : "",
        content : ""
    })
    
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    const [emails, setEmails] = useState([])

    const [checkEmailSent, setCheckEmailSent] = useState(false);


    useEffect(() => {
        
        async function fetchData() {

            getAllEmails()
            .then( data => {

                setEmails(data);

            } )
  
          }
  
          fetchData();

    }, [checkEmailSent]);

    const onEditorStateChange = (editorState) => {

        setEditorState( editorState )

    }

    const editorFinished = () => {

        const raw = convertToRaw( editorState.getCurrentContent() )
        const may = draftToHtml(raw)
        email_details.content = may

    }

    const handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        set_email_details( (email_details) => {

            return {
                ...email_details,
                [name] : value
            }

        })

        console.log(email_details);

    }


    const handleSubmitEmail = (e) => {

        getSubmitBTN("none", "flex")

        //console.log(e.target);
        setLoading(true);

        editorFinished()
        sendEmailLogic(email_details.subject, email_details.content, email_details.recipient)
        .then( () => {

            //alert the action has been saved
            setLoading(false)

            setTimeout(() => {

                setAlert(true)
                
                setTimeout(() => {

                    const alert = document.querySelector('.alertSuccess');
                    alert.style.right = '0px'
                    
                }, 100);
                
            }, 100);

            setTimeout(() => {

                const alert = document.querySelector('.alertSuccess');
                alert.style.right = '-400px'
                
                setTimeout(() => {

                    setAlert(false)
                    
                }, 1000);
                
            }, 4000);

            setTimeout(() => {

                set_email_details({
                    recipient : "all",
                    subject : ""
                });

                setEditorState(EditorState.createEmpty());

                getSubmitBTN("flex", "none");
                setCheckEmailSent(!checkEmailSent);

            }, 5000)

        } )

    }

    const getSubmitBTN = (buttonVal, buttonSendingVal) => {

        const button = document.querySelector("#button_submit");
        const buttonSending = document.querySelector("#button_submitting");
        button.style.display = buttonVal;
        buttonSending.style.display = buttonSendingVal;

    }

    return (

        <div className="messagingInbox emails_section">

            {
                loading ? <div className="loaderScreen">
                <SethAnimation jsonSrc={"https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"} lottieStyle = {{width: '300px', height: '300px'}} speed={"1"} />
               </div> : null
            }

            {
                alert ? 
                
                <div className="alertSuccess">

                    <div className="sethAnim">
                        <SethAnimation jsonSrc={"https://assets7.lottiefiles.com/packages/lf20_afs4kbqm.json"} lottieStyle = {{width: '40px', height: '40px'}} speed={"1"} />
                    </div>

                    The emails to {email_details.recipient} applicants have been sent successfully!

                </div> : null
            }
            
            <div className="headingMessage">
                <h1>Messages</h1>
            </div>

            <div className="messageBox">

                <div className="messageOutbox">

                    <div className="headingTap">
                        <i className="fi fi-sr-envelope-marker"></i>
                        Sent Messages
                    </div>
                    <div className="stats_counter">{emails.length} Messages</div>

                    <div className="email_listing">

                        {
                            emails.length ? emails.map( (data, index) => (
                                
                                <div className="email" key={index}>
                                    <div className="nameInit">{data.applications[0].split("")[0].toUpperCase()}</div>
                                    <div className="emailBar">
                                        <div className="subject_email"> {data.subject} </div>
                                        <div className="body_email"> {data.applications[0]} & {data.applications.length - 1} other emails </div>
                                    </div>

                                </div>

                            ) ) : (
                                <div className="nulldata">

                            <div className="iconNone">
                                <img src={nullSVG} alt="null icon" />
                            </div>

                            <p>You have not sent any messages yet...</p>

                        </div>
                            )
                        }
                        
                        

                    </div>

                </div>

                <div className="message_send">

                    <div className="headingTap">
                        <i className="fi fi-sr-envelope-plus"></i>
                        New Message
                    </div>

                    <form className='sendNewMessage'>

                        <div className="recipient">

                            <select name="recipient" id="recipient" onChange={handleChange} value = {email_details.recipient} > 
                                <option value="all">All Applications</option>
                                <option value="submitted">Submitted Applications</option>
                                <option value="progress">In-Progress Applications</option>
                                <option value="failed">Failed Applicantions ( below 70% )</option>
                                <option value="success">Successful Applicants ( Above 69% ) </option>
                                
                                <hr />

                                <option value="test">Test Applicants </option>

                            </select>

                        </div>

                        <div className="subject">
                            <input type="text" placeholder='Enter message subject' name = "subject" required onChange={handleChange} value = {email_details.subject} />
                        </div>

                        <div className="message_body">

                            <Editor

                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                                toolbar= {

                                    { options : [ 'inline', 'list'] }

                                    }
                                />

                        </div>

                        <div className="button_submit" id='button_submit' onClick={(e) => handleSubmitEmail(e)}>

                           <div className="imageIcon">
                                <img src={button} alt="button" />
                           </div>

                           <p>Send Message</p>

                        </div>

                        <div className="button_submit" id='button_submitting'>

                           <div className="loaderSubmit">
                                <div className="styleAnim">
                                    <SethAnimation jsonSrc={"https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"} lottieStyle = {{width: '500px', height: '500px'}} speed={"1"} />
                                </div>
                           </div>

                           <p>Sending...</p>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default Messaging;
