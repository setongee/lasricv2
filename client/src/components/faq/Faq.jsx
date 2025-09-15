import React from 'react'
import './Faq.scss'
import { Plus } from 'iconoir-react';

export default function Faq() {

    const showFaq = (e) => {

        const checkIfOpen = document.querySelector('.openFaq');

        if (checkIfOpen === null) {

            const target = e.target;
            const getParentNode = target.parentNode.parentNode
            getParentNode.classList.add("openFaq")

        } else{

            checkIfOpen.classList.remove('openFaq');

            const target = e.target;
            const getParentNode = target.parentNode.parentNode
            getParentNode.classList.add("openFaq")
        }

        
    }

    const hideFaq = (e) => {

        

    }

  return (
    
    <div className="faqs fullpad pad-x">

            <div className="faqSection">

                <div className="faq openFaq">

                    <div className="text-faq">

                        <div className="q">
                        
                            What is LASRIC, and what does it aim to achieve?
                    
                        </div>

                        <div className="a">

                            LASRIC, the Lagos State Science, Research, and Innovation Council, was established to drive Lagos State’s economic growth by fostering innovation, science, and technology development. It provides support for startups, researchers, and innovative projects that can contribute to the state's social and economic transformation.

                        </div>

                    </div>

                    <div className="controller" onClick={ (e) => showFaq(e) } > <Plus /> <div className="overlay"></div> </div>


                </div>

                <div className="faq">

                    <div className="text-faq">

                    <div className="q">
                        
                        Who can apply for LASRIC funding or support?

                    </div>

                    <div className="a">
                    
                        <li><strong>1.	Startups & Entrepreneurs</strong> : Early-stage businesses leveraging technology to solve real-world problems.</li>
                        <li> <strong>2.	Researchers & Academics : </strong> Individuals or institutions conducting research in science, technology, and innovation (STI).</li>
                        <li><strong>3.	SMEs & Businesses :</strong> Companies working on innovative solutions that can contribute to Lagos’ economic development.</li>
                        <li><strong>4.	Technology & Innovation Hubs :</strong> Incubators and accelerators that support tech-driven startups.</li>
                        <li><strong>5.	Students & Youth Innovators :</strong> Young innovators with groundbreaking ideas in STEM fields.</li>

                        {<br></br>}
                        
                        <strong>Eligible Sectors</strong> {<br></br>}
                        LASRIC typically funds projects in sectors such as : {<br></br>}{<br></br>}
                        
                        ✅ HealthTech {<br></br>}
                        ✅ FinTech {<br></br>}
                        ✅ AgriTech {<br></br>}
                        ✅ Renewable Energy {<br></br>}
                        ✅ Smart City & Transportation {<br></br>}
                        ✅ Artificial Intelligence & IoT {<br></br>}
                        ✅ Education Technology {<br></br>}
                        ✅ Manufacturing & Industrial Innovations {<br></br>}
                    
                    </div>

                    </div>

                    <div className="controller" onClick={ (e) => showFaq(e) }> <Plus/> <div className="overlay"></div> </div>

                </div>

                <div className="faq">

                    <div className="text-faq">

                        <div className="q">
                        
                            How do I apply for a LASRIC grant?

                    
                        </div>

                        <div className="a">

                            To apply for a grant from the Lagos State Science, Research & Innovation Council (LASRIC), follow these steps: {<br></br>}{<br></br>}

                            <strong>1.	Stay Informed :</strong> LASRIC periodically announces funding opportunities and challenges. To receive notifications about active applications, visit their official website and subscribe with your email address. ￼{<br></br>}
                            
                            <strong>2.	Check Eligibility :</strong> Ensure you meet the specific criteria for the grant you’re interested in. For instance, the LASRIC STEM Challenge 2025 requires applicants to: {<br></br>} {<br></br>}

                            •	Be at least 18 years old.{<br></br>}
                            •	Have a valid means of identification.{<br></br>}
                            •	Own a startup company registered and based in Lagos.{<br></br>}
                            •	Possess an original product, tool, solution, or technique.{<br></br>}
                            •	Have a Minimum Viable Product with documented impact.{<br></br>}
                            •	Not be indebted to the Lagos State Government through loans or support funds. {<br></br>}￼{<br></br>}
                            
                            <strong>3.	Prepare Your Application :</strong> Gather all necessary documents and information as specified in the application guidelines. This may include business registration documents, project proposals, and evidence of your solution’s impact. {<br></br>}
                            
                            <strong>4.	Submit Your Application :</strong> Once applications are open, complete the online application form available on the LASRIC portal. Ensure all information is accurate and all required documents are uploaded. {<br></br>}
                            
                            <strong>5.	Await Feedback :</strong> After submission, LASRIC will review applications and notify successful applicants. {<br></br>}
                           
                        </div>

                    </div>

                    <div className="controller" onClick={ (e) => showFaq(e) }> <Plus/> <div className="overlay"></div> </div>

                </div>

                <div className="faq">

                    <div className="text-faq">

                        <div className="q">
                        
                            What kinds of projects does LASRIC typically fund?
                    
                        </div>

                        <div className="a">

                            LASRIC funds projects that drive innovation, technology advancement, and economic growth in Lagos State. The council prioritizes solutions that align with the government’s Smart City and Digital Transformation goals. {<br></br>}{<br></br>}

                            <strong>Sectors & Types of Projects Funded 🚀 </strong> {<br></br>}{<br></br>}

                                <strong>1.	HealthTech & Biotechnology 🏥</strong> {<br></br>} {<br></br>}
                                
                                •	AI-driven diagnostics and telemedicine solutions {<br></br>}
                                •	Medical device innovations {<br></br>}
                                •	Genomics and personalized medicine research {<br></br>}{<br></br>}

                                <strong>2.	FinTech & Digital Economy 💰</strong> {<br></br>} {<br></br>}

                                •	Blockchain-based financial solutions {<br></br>}
                                •	AI-powered credit scoring and lending platforms {<br></br>}
                                •	Digital payment innovations {<br></br>}{<br></br>}

                                <strong>3.	AgriTech & Food Security 🌱</strong> {<br></br>}{<br></br>}
                                
                                •	Smart farming & IoT-driven agriculture {<br></br>}
                                •	Sustainable food processing and packaging {<br></br>}
                                •	AI-powered crop monitoring systems {<br></br>}{<br></br>}

                                <strong>4.	Renewable Energy & Sustainability ⚡
                                </strong> {<br></br>}{<br></br>}

                                •	Solar, wind, and other clean energy solutions {<br></br>}
                                •	Smart grids & energy management platforms {<br></br>}
                                •	Waste-to-energy innovations {<br></br>}{<br></br>}

                                <strong>5.	Artificial Intelligence & IoT 🤖</strong> {<br></br>}{<br></br>}

                                •	AI-driven business automation tools {<br></br>}
                                •	Smart city solutions (e.g., traffic management, security) {<br></br>}
                                •	IoT applications for logistics and supply chains {<br></br>}{<br></br>}

                                <strong>6.	Education Technology (EdTech) 📚</strong> {<br></br>}{<br></br>}

                                •	AI-powered personalized learning platforms {<br></br>}
                                •	Virtual reality (VR) and augmented reality (AR) in education {<br></br>}
                                •	Digital literacy and coding initiatives {<br></br>}{<br></br>}

                                <strong>7.	Smart Transportation & Mobility 🚗</strong> {<br></br>}{<br></br>}

                                •	Electric vehicles (EV) and charging infrastructure {<br></br>}
                                •	Ride-sharing and smart mobility apps {<br></br>}
                                •	Traffic optimization solutions {<br></br>}{<br></br>}

                                <strong>8.	Manufacturing & Industrial Innovation 🏭</strong> {<br></br>}{<br></br>}

                                •	Robotics and automation in manufacturing {<br></br>}
                                •	3D printing for industrial use {<br></br>}
                                •	Sustainable materials and green manufacturing {<br></br>}{<br></br>}

                                <strong>9.	Water & Environmental Management 🌍</strong> {<br></br>}{<br></br>}

                                •	Smart water purification and distribution systems {<br></br>}
                                •	AI-powered waste management solutions {<br></br>}
                                •	Pollution monitoring and mitigation technologies {<br></br>}{<br></br>}

                            <strong>What LASRIC Looks for in a Project - </strong> {<br></br>}{<br></br>}

                            ✅ Originality & Innovation – The solution must be unique and address a real problem. {<br></br>}
                            ✅ Feasibility & Scalability – Can the project be implemented and expanded successfully?{<br></br>}
                            ✅ Impact on Lagos – The project should contribute to the city’s economy and residents’ well-being.{<br></br>}
                            ✅ Sustainability – It should have long-term benefits, not just a short-term fix.{<br></br>}


                        </div>

                    </div>

                    <div className="controller" onClick={ (e) => showFaq(e) }> <Plus/> <div className="overlay"></div> </div>

                </div>

                <div className="faq">

                    <div className="text-faq">

                        <div className="q">
                        
                            How does LASRIC support the growth of startups beyond funding?
                    
                        </div>

                        <div className="a">

                            LASRIC provides more than just funding—it offers a complete growth ecosystem for startups, ensuring long-term success. Here’s how: {<br></br>}{<br></br>}

                            <strong>1. Business Development & Mentorship</strong> {<br></br>}{<br></br>}

                            ✅ Access to Industry Experts – Startups receive mentorship from seasoned entrepreneurs, investors, and subject-matter experts. {<br></br>}
                            ✅ Workshops & Training – Regular sessions on product development, scaling, marketing, and fundraising strategies. {<br></br>}
                            ✅ Legal & Regulatory Support – Guidance on business registration, intellectual property (IP) protection, and compliance with Lagos State regulations. {<br></br>}{<br></br>}

                            <strong>2. Networking & Collaboration</strong> {<br></br>}{<br></br>}

                            ✅ Innovation Hubs & Tech Communities – LASRIC connects startups with Lagos’ vibrant tech and innovation ecosystem, including co-working spaces and accelerators.{<br></br>}
                            ✅ Partnerships with Corporates & Government – Opportunities to collaborate with government agencies and private sector leaders for pilots and market access.{<br></br>}
                            ✅ International Exposure – Some LASRIC-backed startups get introduced to global innovation programs, investors, and accelerators. {<br></br>}{<br></br>}

                           <strong> 3. Infrastructure & Resources</strong> {<br></br>}{<br></br>}

                            ✅ Access to Labs & Research Facilities – Startups working on deep tech, AI, biotech, and hardware can leverage state-sponsored research centers. {<br></br>}
                            ✅ Prototyping Support – Assistance with developing Minimum Viable Products (MVPs), especially for hardware and IoT startups. {<br></br>} {<br></br>}

                            <strong>4. Market Access & Government Adoption</strong> {<br></br>}{<br></br>}

                            ✅ Pilot Programs & Public Sector Integration – LASRIC helps startups test and validate their solutions with government agencies. {<br></br>}
                            ✅ Procurement Opportunities – Potential for Lagos State Government to adopt and scale successful innovations. {<br></br>}
                            ✅ Investor Introductions – Startups with high potential get connected to VCs, angel investors, and grant programs beyond LASRIC. {<br></br>}{<br></br>}

                            <strong> 5. Long-Term Sustainability & Growth </strong> {<br></br>}{<br></br>}

                            ✅ Follow-on Funding & Grants – LASRIC doesn’t just fund once; promising startups may receive follow-up investment. {<br></br>}
                            ✅ Export & Expansion Support – Assistance in scaling solutions beyond Lagos into wider Nigerian and African markets. {<br></br>}{<br></br>}

                            🔹 Bottom Line: LASRIC isn’t just about money—it’s about building sustainable, scalable, and impactful businesses in Lagos.

                        </div>

                    </div>

                    <div className="controller" onClick={ (e) => showFaq(e) }> <Plus/> <div className="overlay"></div> </div>

                </div>

                <div className="faq">

                    <div className="text-faq">

                        <div className="q">
                        
                            What is the selection process for receiving LASRIC support?
                    
                        </div>

                        <div className="a">

                            The LASRIC selection process is competitive and follows a structured evaluation framework to ensure that the most promising innovations receive support. Here’s how it works: {<br></br>} {<br></br>}

                            <strong>1. Application Submission</strong> {<br></br>} {<br></br>}

                                ✅ Interested applicants submit their proposals through the LASRIC online portal (lasric.lagosstate.gov.ng). {<br></br>}
                                ✅ Applications must include: {<br></br>}{<br></br>}

                                •	Business or research proposal {<br></br>}
                                •	Minimum Viable Product (MVP) or prototype (if available) {<br></br>}
                                •	Financial projections and business model {<br></br>}
                                •	Team details and track record {<br></br>}
                                •	Proof of Lagos residency or business registration {<br></br>}{<br></br>}

                                <strong>2. Initial Screening</strong> {<br></br>}{<br></br>}

                                ✅ LASRIC reviews applications to check eligibility and completeness. {<br></br>}
                                ✅ Applications that do not meet the basic criteria (e.g., incomplete documents, non-Lagos-based projects) are disqualified. {<br></br>}{<br></br>}

                                <strong>3. Evaluation & Scoring</strong> {<br></br>}{<br></br>}

                                A panel of industry experts, investors, and government representatives evaluates applications based on: {<br></br>}{<br></br>}

                                💡 Innovation & Originality – How unique is the solution? {<br></br>}
                                📈 Scalability & Market Potential – Can it grow and attract investment? {<br></br>}
                                💰 Economic & Social Impact – How will it benefit Lagos residents or businesses? {<br></br>}
                                🚀 Feasibility & Execution Plan – Is the project realistic and well-planned? {<br></br>}
                                👥 Team Strength & Capability – Does the team have the expertise to execute? {<br></br>}{<br></br>}

                                Projects with high scores proceed to the next stage.

                                <strong>4. Pitching & Interview Stage</strong> {<br></br>} {<br></br>}

                                ✅ Shortlisted applicants present their ideas to a panel of judges. {<br></br>}
                                ✅ The pitch session allows startups to demonstrate their innovation, business model, and potential impact. {<br></br>}
                                ✅ Some rounds may include Q&A sessions, where applicants defend their proposals and address concerns. {<br></br>}{<br></br>}

                               <strong> 5. Final Selection & Approval</strong> {<br></br>}{<br></br>}

                                ✅ The highest-ranking startups or researchers are recommended for funding.{<br></br>}
                                ✅ The LASRIC Council and Lagos State Government approve final selections. {<br></br>}
                                ✅ Winners sign agreements detailing fund utilization, milestones, and reporting requirements. {<br></br>}{<br></br>}

                                <strong>6. Post-Funding Support & Monitoring</strong> {<br></br>}{<br></br>}

                                ✅ Funds are disbursed based on the agreed milestones. {<br></br>}
                                ✅ Startups receive mentorship, business development support, and monitoring to track progress. {<br></br>}
                                ✅ LASRIC may assist in investor introductions, government partnerships, and follow-on funding {<br></br>}{<br></br>}

                                <strong>How Long Does It Take?</strong> {<br></br>}{<br></br>}

                                ⏳ The process varies by funding cycle but typically takes a few months from application to funding disbursement. {<br></br>}

                                🔹 Want to improve your chances? I can help you craft a compelling pitch or refine your proposal! 🚀 {<br></br>}{<br></br>}

                        </div>

                    </div>

                    <div className="controller" onClick={ (e) => showFaq(e) }> <Plus/> <div className="overlay"></div> </div>

                </div>

        </div>

    </div>

  )
}
