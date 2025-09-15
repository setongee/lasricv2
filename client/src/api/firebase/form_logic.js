import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const updateDocument = async (uid, address) => {

    const documentRef = doc(db, "users", uid);
    await updateDoc(documentRef, { "info.address" : address });
    await updateDoc(documentRef, { "info.status" : "completed" })

}


export const updateParents = async (uid, data) => {

    const documentRef = doc(db, "users", uid);
    await updateDoc(documentRef, { "form.data.parents.data" : data });
    await updateDoc(documentRef, { "form.data.parents.status" : "completed" })

}

export const updateEducation = async (uid, data) => {

    const documentRef = doc(db, "users", uid);
    await updateDoc(documentRef, { "form.data.education.data" : data });
    await updateDoc(documentRef, { "form.data.education.status" : "completed" })

}

export const updateIdea = async (uid, data) => {

    const documentRef = doc(db, "users", uid);
    await updateDoc(documentRef, { "form.data.idea.data" : data });
    await updateDoc(documentRef, { "form.data.idea.status" : "completed" })

}

export const updateIdeaVideo = async (uid, url) => {

    const documentRef = doc(db, "users", uid);
    await updateDoc(documentRef, { "form.data.idea.data.video" : url });

}

export const updateForm = async (uid) => {

    if(uid !== '') {

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

             console.log(docSnap.data())

             const checkformStatus = docSnap.data().form.status;

             const parents = docSnap.data().form.data.parents.status;
             const education = docSnap.data().form.data.education.status;
             const idea = docSnap.data().form.data.idea.status;
             const info = docSnap.data().info.status

             if ( checkformStatus === "pending" && education === "completed" && idea === "completed" && parents === "completed" && info === "completed" ) {

                 await updateDoc(docRef, {"form.status" : "completed" })

             }
    
        }
    }
}

export const submitApplication = async (uid) => {

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {"form.submitted" : true })

    await setDoc(doc( db, "submitted-application", uid ), {

        id : uid,
        dateSubmitted : new Date( Date.now() ).toUTCString(),
        grade : {

            score : '',
            gradedBy : [],
            status : 'pending'
            
        }

    })

}

