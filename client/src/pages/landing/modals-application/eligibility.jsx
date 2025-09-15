import React from 'react'

const Eligibility = ({handleEligibilityStatus}) => {

  return (

    <div className="eligibility_requirement overlay">

        <div className="innerModalCard">
            <div className="title">
                Eligibility Requirements
            </div>

            <div className="lineThrough"></div>

            <div className="eligibility">
            
                <div><strong>✅ Mandatory Eligibility Criteria</strong></div>
                <ul>
                <li>Must be a Nigerian citizen, at least 18 years old.</li>
                <li>Must have a valid means of identification (LASRRA card accepted).</li>
                <li>Must have a registered company/business operating in Lagos State.</li>
                <li>Must have a Minimum Viable Product (MVP) with active customers or documented impact.</li>
                <li>Must have a product/tool/solution/technique that is your original idea.</li>
                <li>Must show evidence of payment of Personal Income Tax in Lagos State.</li>
                <li>Must not be indebted to Lagos State Government through loans or support funds (e.g., LSETF).</li>
                <li>Must submit an original and innovative application.</li>
                <li>Must understand LASRIC objectives and align with its vision.</li>
                </ul>

                <div><strong>⭐ Conditional / Extra Advantage</strong></div>
                <ul>
                <li>Be ready to fund their team’s travel and associated expenses.</li>
                <li>High-value scalable solutions may be considered for LASRIC equity investment.</li>
                </ul>

            </div>

            <div className='accept'>
                <label>
                    <input type="checkbox" required id = 'accept' />
                    I have read, fully understand, and meet the eligibility criteria.
                </label>
            </div>

            <div className="button" onClick={()=>handleEligibilityStatus()}> Proceed to Application </div>

        </div>

    </div>

  )

}

export default Eligibility