import React, {useState} from 'react'
import './support.scss';
import Container from '../../components/container/container';
import { ArrowDown, DownloadCircle, Xmark } from 'iconoir-react';
import support from '../../assets/support/support.jpg'
import play from '../../assets/support/play.png'

// steps
import step1 from '../../assets/support/step1.svg'
import step2 from '../../assets/support/step2.svg'
import step3 from '../../assets/support/step3.svg'
import step4 from '../../assets/support/step4.svg'
import step5 from '../../assets/support/step5.svg'

// pdf
import innovation from '../../assets/pdf/Innovation Application-User Manual.pdf'
import research from '../../assets/pdf/Research Application-User Manual.pdf'
import stem from '../../assets/pdf/STEM Application-User Manual.pdf'

// pdf icon
import pdf from '../../assets/support/pdff.png'

export default function Support() {

    const [isDownloadClicked, setIsDownloadClicked] = useState(false);

    const openModal = () => {

        setIsDownloadClicked(true);
    }

    const closeModal = () => {

        setIsDownloadClicked(false);
    }

  return (
    
    <div className="support pageBrief">

        {
            isDownloadClicked 
            ?

            <div className="downloadModal">

                <div className="overlay" onClick={ () => closeModal() } ></div>

                <div className="downlaodInfo">

                    <div className="closeNav" onClick={ () => closeModal() } > <Xmark/> </div>

                    <div className="downloadHead"> Download LASRIC Application PDF Guide </div>
                    <p> Access the comprehensive LASRIC guide to streamline your application process and secure funding opportunities. </p>

                    <div className="downloadFiles">

                        <li onClick={ () => closeModal() }>
                            <div className="pdfIcon"> <img src={pdf} alt="" /> </div>
                            <a href={innovation} download > LASRIC Innovation Application Guide Download </a>
                            <div className="arr"><ArrowDown/></div>
                        </li>

                        <li onClick={ () => closeModal() } >
                            <div className="pdfIcon"> <img src={pdf} alt="" /> </div>
                            <a href={research} download > LASRIC Research Application Guide Download </a>
                            <div className="arr"><ArrowDown/></div>
                        </li>

                        <li onClick={ () => closeModal() } >
                            <div className="pdfIcon"> <img src={pdf} alt="" /> </div>
                            <a href={stem} download > LASRIC STEM Application Guide Download </a>
                            <div className="arr"><ArrowDown/></div>
                        </li>

                    </div>

                </div>

            </div>

            : null
        }

        <Container>

            <div className="support__heading headers"> 

                <p>How to Apply to LASRIC: A Step-by-Step Guide to Success</p>
                <div className="description">Your Complete Guide to Navigating the LASRIC Application Process and Unlocking Funding Opportunities</div>

            </div>

            <div className="button download__btn" onClick={ () => openModal() } > 

                <div className="icon"> <DownloadCircle/> </div>
                <p> Download PDF Guide </p>

            </div>

            <div className="support__lasric">

                <img src={support} alt="" />
                
                <div className="play">
                    <img src={play} alt="" />
                </div>

            </div>

            <div className="support__steps">

                <div className="step__header"> Get Started in 5 simple steps! </div>

                <div className="steps">

                    <div className="step">

                        <div className="describe">

                            <div className="step__number">Step 1.</div>
                            <div className="step__title"> Create an Account </div>

                            <div className="step__description">

                                Click on the "Register" or "Sign Up" button, provide your details, such as name, email address, phone number, and a secure password.

                            </div>

                            <div className="step__link"> Sign Up / Login </div>

                        </div>

                        <div className="step__photo"><img src={step1} alt="" /></div>

                    </div>

                    <div className="step">

                        <div className="describe">

                            <div className="step__number">Step 2.</div>
                            <div className="step__title"> Access Application Forms </div>

                            <div className="step__description">

                                Click on the "Apply" button to navigate to the funding or callup section. Complete your application form online.

                            </div>

                            <div className="step__link"> Apply Now for Cohort 6 </div>

                        </div>

                        <div className="step__photo"><img src={step2} alt="" /></div>

                    </div>

                    <div className="step">

                        <div className="describe">

                            <div className="step__number">Step 3.</div>
                            <div className="step__title"> Prepare Required Documents </div>

                            <div className="step__description">

                                Gather necessary documents such as : Business plan or proposal, Company registration details, Financial statements (if applicable). Any other documents specified in the guidelines

                            </div>

                            <div className="step__link"> Learn More </div>

                        </div>

                        <div className="step__photo"><img src={step3} alt="" /></div>

                    </div>

                    <div className="step">

                        <div className="describe">

                            <div className="step__number">Step 4.</div>
                            <div className="step__title"> Submit Your Application </div>

                            <div className="step__description">

                                Upload the required documents and application form. Review your submission to ensure accuracy. Click "Submit."

                            </div>

                            <div className="step__link"> Learn More </div>

                        </div>

                        <div className="step__photo"><img src={step4} alt="" /></div>

                    </div>

                    <div className="step">

                        <div className="describe">

                            <div className="step__number">Step 5.</div>
                            <div className="step__title"> Follow Up and Monitor Progress </div>

                            <div className="step__description">

                                Use your account dashboard to track the status of your application. Respond promptly to any additional requests or clarifications from LASRIC.

                            </div>

                            <div className="step__link"> Learn More </div>

                        </div>

                        <div className="step__photo"><img src={step5} alt="" /></div>

                    </div>

                </div>

            </div>

        </Container>

    </div>

  )

}
