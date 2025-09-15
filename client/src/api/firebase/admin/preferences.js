import { doc, updateDoc, getDocs, collection, addDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config";

export const getAdminUserDetails = async (uid) => {

    const docRef = doc(db, "admin", uid);
    const documenter = await getDoc(docRef);

    return documenter.data();

}

export const updateCohort = async (data) => {

    const docRef = doc(db, "preferences", "cohort");
    
    await setDoc(docRef, data)

}

export const updatePassmark = async (data) => {

    const docRef = doc(db, "preferences", "passmark");
    
    await setDoc(docRef, data)

}

