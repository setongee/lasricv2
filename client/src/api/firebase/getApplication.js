import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "./config";

export const getApplication = async (appid) => {

    const docRef = doc(db, "applications_data", "cohort5", "applications", appid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        return docSnap.data();

      } else {

        return null;

      }

}


export const getCouncilGraders = async (appid) => {

  const docRef = doc(db, "submitted_applications_beta", "cohort5", "applications", appid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    const data = []

    Object.entries(docSnap.data().grades).forEach((e) => {

        data.push(e)

    })

    return data;

    } else {

      return null;

    }

}


export const getCouncilMember = async (uid) => {

  const docRef = doc(db, "council", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

      return docSnap.data();

    } else {

      return null;

    }

}


