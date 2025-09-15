import { updateDoc, doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./config";
import { useUser } from "../../stores/user.store";
import axios from "axios";

export const editUser = async (data, uid) => {

    const currentUser = useUser.getState().currentUser;
    const setCurrentUser = useUser.getState().setCurrentUser;

    const userRef = doc(db, 'users', uid);
    updateDoc(userRef, data);

    setCurrentUser({...currentUser, ...data})

}

export const updateProfileLinkedin = async (url, linkedinId) => {

    console.log(url);

    const data = await getLinkdinProfile(url);
    
    
    if(data.length){
        const userRef = doc(db, 'linkedinProfile', data[0].id);
        updateDoc(userRef, {verified : true, linkedinId});
    }

}

export const addLinkedinProfile = async (url) => {
    const userRef = await addDoc(collection(db, "linkedinProfile"), {
        url : sanitizeUrl(url),
        verified : false,
        linkedinId : ""
    })

    return userRef;
}

export function isValidLinkedInProfile(url) {
    const regex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_]+\/?$/;
    return regex.test(url);
  }

export const getLinkdinProfile = async (url) => {

  const colRef = collection(db, "linkedinProfile");

  const q = query(colRef, where("url", "==", sanitizeUrl(url) ));
  const querySnapshot = await getDocs(q);

  const results = [];
  querySnapshot.forEach((docSnap) => {
    results.push({ id: docSnap.id, ...docSnap.data() });
  });

  console.log("Matching documents:", results);
  return results

}

export const getLinkdinProfileId = async (id) => {

  const colRef = collection(db, "linkedinProfile");

  const q = query(colRef, where("linkedinId", "==", id ));
  const querySnapshot = await getDocs(q);

  const results = [];
  querySnapshot.forEach((docSnap) => {
    results.push({ id: docSnap.id, ...docSnap.data() });
  });

  console.log("Matching documents:", results);
  return results

}

export function sanitizeUrl(url){

    return url.replace(/\/$/, '');

}

// async function checkLinkedInProfileExists(url) {
//   const link = axios.post('http://localhost:4580/api/v2/ping/linkedin', {url})
//   link
//   .then(e=>console.log(e))
//   .catch(err=>console.log(err))
// }