import { doc, updateDoc, setDoc, getDoc, arrayUnion } from "firebase/firestore"; 
import { db } from "./config";
import { data } from "./new-data";
import axios from "axios";

export const createStemApplication = async (callid, userid, formData, track, cohort, email, phone) => {

    await setDoc(doc(db, "applications_data", cohort, "applications", `LASRIC_${callid}_${userid}`), {...data.application, track : track, uid : `LASRIC_${callid}_${userid}`, userid : userid, progress : 16.67, email, phone, 
    
    data : {

        personal : {

            status : 'completed',
            data : formData

        },
        problem : {

            status : 'pending',
            data : {
                adoptionEase: "",
                need: "",
                workAround: ""
            }

        },
        relevance : {

            status : 'pending',
            data : {
                relevance : '',
                exactSoln: '',
                targetCustomers : ''
            }

        },
        impact : {

            status : 'pending',
            data : {
                missionDrive : '',
                impact : ''
            }

        },
        scalability : {

            status : 'pending',
            data : {
                howScalable : '',
                uniqDiff : ""
            }

        },
        experience : {

            status : 'pending',
            data : {
                team: { team1 : { name: '', response : '', role: ''}},
                experience : ''
            }

        },

    }});

    await updateUserApplication(userid, `LASRIC_${callid}_${userid}`, track, callid);
}


export const getApplicationData = async (appid, cohort) => {

    const fetchApplications = doc(db, "applications_data", cohort, "applications", appid);
    const querySnapshot = await getDoc(fetchApplications);

    return querySnapshot.data();

}


export const submitStemApplication = async (appid, callid, userid, track, firstname, lastname, cohort, company, currentUser) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    const documentRef = doc(db, "applications_data" , cohort, "applications", appid);
    await updateDoc(documentRef, { "progress" : 100 });
    
    await addToSubmitted(callid, userid, track, firstname, lastname, cohort, company, appid, currentUser.email, currentUser.phone);
    
    //await axios.post('/api/sendEmail', {email : currentUser.email, firstname : firstname, track : track, userid : currentUser.uid});
    
    await updateDoc(documentRef, { "submitted" : true });

}

const addToSubmitted = async (callid, userid, track, firstname, lastname, cohort, company, appid, email, phone) => {

    await setDoc(doc(db, "submitted_applications_beta", cohort, "applications", appid), 
    { 
        ...data.application, 
        uid : userid , 
        track, 
        firstname, 
        lastname, 
        dateSubmitted : new Date, 
        avgGrade : 0, 
        grade_export : '0%', 
        companySector : company , 
        grades : {}, 
        status : 'pending', 
        callID : callid,  
        email,
        phone
    } )


}

export const updateStemApplication = async (appid, formData, cohort, progress) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    const documentRef = doc(db, "applications_data", cohort, "applications", appid);
    await updateDoc(documentRef, { "data.problem.data" : formData });
    await updateDoc(documentRef, { "progress" : progress });
    await updateDoc(documentRef, { "data.problem.status" : "completed" });

}

export const updateStemRelevanceApplication = async (appid, formData, cohort, progress) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });
    const documentRef = doc(db, "applications_data", cohort, "applications", appid);
    await updateDoc(documentRef, { "data.relevance.data" : formData });
    await updateDoc(documentRef, { "progress" : progress });
    await updateDoc(documentRef, { "data.relevance.status" : "completed" });

}

export const updateStemImpactApplication = async (appid, formData, cohort, progress) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    const documentRef = doc(db, "applications_data", cohort, "applications", appid);
    await updateDoc(documentRef, { "data.impact.data" : formData });
    await updateDoc(documentRef, { "progress" : progress });
    await updateDoc(documentRef, { "data.impact.status" : "completed" });

}

export const updateStemExperienceApplication = async (appid, formData, cohort, progress) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    const documentRef = doc(db, "applications_data", cohort, "applications", appid);
    await updateDoc(documentRef, { "data.experience.data" : formData });
    await updateDoc(documentRef, { "progress" : progress });
    await updateDoc(documentRef, { "data.experience.status" : "completed" });

}

export const updateStemScalabilityApplication = async (appid, formData, cohort, progress) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    const documentRef = doc(db, "applications_data", cohort, "applications", appid);
    await updateDoc(documentRef, { "data.scalability.data" : formData });
    await updateDoc(documentRef, { "progress" : progress });
    await updateDoc(documentRef, { "data.scalability.status" : "completed" });

}

export const updateStemPersonalApplication = async (appid, formData, cohort, progress) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    const documentRef = doc(db, "applications_data", cohort, "applications", appid);
    await updateDoc(documentRef, { "data.personal.data" : formData });
    await updateDoc(documentRef, { "progress" : progress });
    await updateDoc(documentRef, { "data.personal.status" : "completed" });

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
    await updateDoc(documentRef, { "applications.cohort5" : arrayUnion(data) });

}

export const updateCallupApplications = async (callupid, appid) => {

    const documentRef = doc(db, "callups", callupid);
    await updateDoc(documentRef, { "applications" : arrayUnion(appid) });

}

