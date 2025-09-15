import React from 'react';

const PreviewCallup = ({img, modalChange, title, dataTrack, callupid}) => {

    console.log(dataTrack)
    return (

        <div className="previewApply">

            <div className="modal">

                <div className="closeBTN" onClick={()=>modalChange(false)} > X </div>
                
                <div className="heading-modal">

                    <div className="image-pin">
                        <img src={img} alt="callup image" />
                    </div>
                    
                    <div className="title">{title}</div>

                    <div className="dashed-line"></div>

                </div>
                
                { dataTrack === 'innovation' ? 
                
                ( <p> The Lagos State Science Research & Innovation Council (LASRIC) is hereby calling for investment-ready applications in Innovation {<br></br>}{<br></br>} Find details below: {<br></br>}{<br></br>}<strong>Target Areas</strong>  {<br></br>}{<br></br>}* Block Chain Applications {<br></br>}* Agriculture (Production and Waste Reuse) {<br></br>}* Manufacturing{<br></br>} * Green Energy {<br></br>}* HealthCare {<br></br>}{<br></br>}Eligibility{<br></br>}{<br></br>} * Must be a Lagos State based startup venture less than 5 years old. {<br></br>}* Founder must be full time dedicated to the startup with a team. {<br></br>} * Must not have taken any grants or loans from any Lagos State Government organisation within the last 3 years. {<br></br>} * Must have proof of revenue and not be financially encumbered. {<br></br>} * All Intelectual Property must be original and owned {<br></br>} * No age limits </p> ) 

                : 

                (<p> Lagos State Science Research and Innovation Council is calling for fund-ready applications in Science, Technology, Engineering and Mathematics (STEM). The award fund is up to ₦5m for successful entry. {<br></br>}{<br></br>} Find details below: {<br></br>}{<br></br>}<strong>Target Areas</strong>  {<br></br>}{<br></br>}* STEM Education. {<br></br>}* Applied-STEM Interventions in schools. {<br></br>}* Pomoting STEM {<br></br>}* STEM in Media & Communication {<br></br>}{<br></br>}Eligibility{<br></br>}{<br></br>} * Must be a start-up and an independent innovator based in Lagos State and should have existence for not less than 5 years. {<br></br>}* Must have not taken any grants from LASRIC/ any Lagos State Government organization in the last 3 years.{<br></br>} * Must have a clean balance sheet.{<br></br>} * Innovation must be original and free of plagiarism. * No age limits. </p>) }

                <div className="continue" onClick={ () => { window.location.href = `/application/${dataTrack.toLowerCase()}/${callupid}/personal`; window.localStorage.setItem("appid", false)} } > Proceed to Application</div> 

            </div>

        </div>

    );
}

export default PreviewCallup;
