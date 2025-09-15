import { doc, updateDoc, setDoc, getDoc, arrayUnion } from "firebase/firestore"; 
import { db } from "./config";
import { data } from "./new-data";
import axios from "axios";

export const createResearchApplication = async (callid, userid, formData, track, cohort, email, phone) => {

   

    await setDoc(doc(db, "applications_data" , cohort, "applications", `LASRIC_${callid}_${userid}`), {...data.application, track : track, uid : `LASRIC_${callid}_${userid}`, userid : userid, progress : 25, email, phone, 
    
    data : {

        personal : {

            status : 'completed',
            data : formData

        },
        
        project : {

            status : 'pending',
            data : {}

        },
        results : {

            status : 'pending',
            data : {
                activity : { activity1 : {activity : "", result : ""} }
            }

        },
        budget : {

            status : 'pending',
            data : {
                activity : { activity1 : {activity : "", result : ""} },
                budget : { budget1 : {item : "", amount : "", total : ""} }
            }

        }

    }});

    
    await updateUserApplication(userid, `LASRIC_${callid}_${userid}`, track, callid);


}

// GET ALL APLLICATIONS

export const getApplicationData = async (appid, cohort) => {

    const fetchApplications = doc(db, "applications_data", cohort, "applications", appid);
    const querySnapshot = await getDoc(fetchApplications);

    return querySnapshot.data();

}


export const submitResearchApplicationFinalized = async (appid, callid, userid, track, firstname, lastname, cohort, company, currentUser) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    const documentRef = doc(db, "applications_data" , cohort, "applications", appid);
    await updateDoc(documentRef, { "submitted" : true });

    await addToSubmitted(callid, userid, track, firstname, lastname, cohort, company, appid, currentUser.email, currentUser.phone);
    
    //await axios.post('/api/sendEmail', {email : currentUser.email, firstname : firstname, track : track, userid : currentUser.uid});

}

const addToSubmitted = async (callid, userid, track, firstname, lastname, cohort, company, appid, email, phone) => {

    await setDoc(doc(db, "submitted_applications_beta", cohort, "applications", appid), {...data.application, uid : userid , track, firstname, lastname, dateSubmitted : new Date, avgGrade : 0, grade_export : '0%', companySector : company , grades : {}, status : 'pending', callID : callid, email, phone } )


}

export const updatePersonalpplication = async (appid, formData, cohort) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    //console.log(appid)

    const documentRef = doc(db, "applications_data" , cohort, "applications", appid);
    await updateDoc(documentRef, { "data.personal.data" : formData });
    await updateDoc(documentRef, { "data.personal.status" : "completed" });

}

export const updateResearchProject = async (appid, formData, cohort, progress) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });
     const documentRef = doc(db, "applications_data" , cohort, "applications", appid);
    await updateDoc(documentRef, { "data.project.data" : formData });
    await updateDoc(documentRef, { "progress" : progress });
    await updateDoc(documentRef, { "data.project.status" : "completed" });

}

export const updateResearchResultApplication = async (appid, formData, cohort, progress) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });
    const documentRef = doc(db, "applications_data" , cohort, "applications", appid);
    await updateDoc(documentRef, { "data.results.data" : formData });
    await updateDoc(documentRef, { "progress" : progress });
    await updateDoc(documentRef, { "data.results.status" : "completed" });

}

export const updateBudgetApplication = async (appid, formData, cohort, progress) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });
    const documentRef = doc(db, "applications_data" , cohort, "applications", appid);

    await updateDoc(documentRef, { "data.budget.data" : formData });
    await updateDoc(documentRef, { "progress" : progress });
    await updateDoc(documentRef, { "data.budget.status" : "completed" });

}


export const updateUserApplication = async (uid, appid, track, callid) => {

    const data = {
        appUID : appid,
        track : track,
        submitted : false,
        callUID : callid,
    }

    //console.log(appid)

    const documentRef = doc(db, "users", uid);
    await updateDoc(documentRef, { "applications.cohort4" : arrayUnion(data) });

}

export const updateCallupApplications = async (callupid, appid) => {

    const documentRef = doc(db, "callups", callupid);
    await updateDoc(documentRef, { "applications" : arrayUnion(appid) });

}

