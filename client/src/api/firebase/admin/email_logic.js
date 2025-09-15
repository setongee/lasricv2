import { doc, updateDoc, getDocs, collection, deleteDoc, addDoc, where, query, orderBy, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config";
import axios from "axios";
import { getCurrentCohortNumber } from "./admin_applications";

//functions
export const getUsersEmails = async () => {
    
    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const allApplications = []

    const bintConv =  collection( db, "applications_data", `cohort${cohortN}` , "applications")
    const querySnapshot = await getDocs(bintConv);

    querySnapshot.forEach( applicant => {

        allApplications.push(applicant.data().email)

    } )

    return allApplications;
    
}

export const getProgressEmails = async () => {
    
    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const allApplications = []

    const bintConv = query (  collection( db, "applications_data", `cohort${cohortN}` , "applications"), where("submitted", "==", false )  )
    const querySnapshot = await getDocs(bintConv);

    querySnapshot.forEach( applicant => {

        allApplications.push(applicant.data().email)

    } )

    return allApplications;
    
}

export const getSubmittedEmails = async () => {
    
    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const allApplications = []

    const bintConv = query (  collection( db, "applications_data", `cohort${cohortN}` , "applications"), where("submitted", "==", true )  )
    const querySnapshot = await getDocs(bintConv);

    querySnapshot.forEach( applicant => {

        allApplications.push(applicant.data().email)

    } )

    // return allApplications;
    console.log(allApplications)
    
}

export const getFailedEmails = async () => {
    
    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const allApplications = []

    const bintConv = query (  collection( db, "submitted_applications_beta", `cohort${cohortN}` , "applications"), where("avgGrade", "<", 70 )  )
    const querySnapshot = await getDocs(bintConv);

    querySnapshot.forEach( applicant => {

        allApplications.push(applicant.data().email)

    } )

    return allApplications;
    
}

export const getSuccessEmails = async () => {
    
    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const allApplications = []

    const bintConv = query (  collection( db, "submitted_applications_beta", `cohort${cohortN}` , "applications"), where("avgGrade", ">", 69.99 )  )
    const querySnapshot = await getDocs(bintConv);

    querySnapshot.forEach( applicant => {

        allApplications.push(applicant.data().email)

    } )

    return allApplications;
    
}

export const getTestEmails = async () => {
    
    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const allApplications = []

    const bintConv = collection( db, "test_users")

    const querySnapshot = await getDocs(bintConv);

    querySnapshot.forEach( applicant => {

        allApplications.push(applicant.data().email)

    } )

    return allApplications;
    
}

export const getAllEmails = async () => {

    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const allApplications = []

    const bintConv =  collection( db, "messages", `cohort${cohortN}` , "emails")
    const querySnapshot = await getDocs(bintConv);

    querySnapshot.forEach( applicant => {

        allApplications.push(applicant.data())

    } )

    return allApplications;

}

export const addEmailHistory = async (body, subject, group, emails) => {

    const data = {
        applications : emails,
        body : body,
        subject : subject,
        group : group,
        date : new Date,
    }

    console.log(data)

    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)
    await addDoc(collection( db, "messages", `cohort${cohortN}` , "emails"), data )

}



export const sendEmailLogic = async (subject, content, to) => {

    if ( to === "all" ) {

        getUsersEmails().then( async email => {

            const data = {emails : email, subject : subject, html : content}
            await addEmailHistory(content, subject, to, email)
            await axios.post('/api/sendemails', data)
    
        })

    }

    if ( to === "progress" ) {

        getProgressEmails().then( async email => {

            const data = {emails : email, subject : subject, html : content}
            await addEmailHistory(content, subject, to, email)
            await axios.post('/api/sendemails', data)
    
        })

    }

    if ( to === "submitted" ) {

        getSubmittedEmails().then( async email => {

            const data = {emails : email, subject : subject, html : content}
            await addEmailHistory(content, subject, to, email)
            await axios.post('/api/sendemails', data)
    
        })

    }

    if ( to === "failed" ) {

        getFailedEmails().then( async email => {

            const data = {emails : email, subject : subject, html : content}
            await addEmailHistory(content, subject, to, email)
            await axios.post('/api/sendemails', data)
    
        })

    }

    if ( to === "success" ) {

        getSuccessEmails().then( async email => {

            const data = {emails : email, subject : subject, html : content}
            await addEmailHistory(content, subject, to, email)
            await axios.post('/api/sendemails', data)
    
        })

    }

    if ( to === "test" ) {

        getTestEmails().then( async email => {

            const data = {emails : email, subject : subject, html : content}
            await addEmailHistory(content, subject, to, email);
            await axios.post('/api/sendemails', data)
    
        })

    }
}



