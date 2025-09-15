import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, collection, query, getDocs, where } from "firebase/firestore"; 
import { db } from "./config";
import { data } from "./new-data";
import axios from "axios";


export const setDocument = async ( uid, lastname, firstname, email, phone, type, password, linkedinProfile ) => {

    await setDoc(doc(db, "users", uid), {

        lastname,
        firstname,
        password,
        email,
        phone,
        uid,
        type,
        applications : [],
        application_pathway : {},
        verified : false,
        photo : "",
        linkedinProfile,
        team : [],
        createdAt : new Date()

    });

   if (type === 'admin') {
    setAdminDocument(uid, lastname, firstname, email, type)
   }

//    sendLasricEmail(email, firstname, lastname, password, track)

}

const sendLasricEmail = async (email, firstname, lastname, password, track) =>{

    if (track === 'council') {
        await axios.post('/api/sendemail/council/create', {email : email, firstname : firstname, lastname, password});
    } else {
        await axios.post('/api/sendemail/register', {email : email, firstname : firstname, lastname, password});
    }

}

export const setCouncilDocument = async ( uid, data ) => {

    await setDoc(doc(db, "council", uid), data);

    await SignInUser('admin@lasric.com', '123456');

}


export const createCouncilMember = (data) => {

    const { email, password, lastname, firstname, phone = '08145627389' } = data;

    const auth = getAuth();

    console.log(email, password, lastname, phone)

    createUserWithEmailAndPassword( auth, email, password )
    .then(async (userCredential) => {

        const user = userCredential.user;

        await setDocument(user.uid, lastname, firstname, email, phone, "council", password)
        .then(() => {

            setCouncilDocument(user.uid, {...data, uid : user.uid})

        })

    })
    .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        alert('Sorry this email address is already in use.')

    });

}


const SignInUser = (email, password) => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password);

}



export const getCouncilData = async () => {

    const fetchUsers = query(collection(db, "council"), where("internal", "==", true));
    
    const querySnapshot = await getDocs(fetchUsers);

    const allUsers = []

    querySnapshot.forEach((doc) => {
    
        allUsers.push(doc.data());

    });

    return allUsers;

}


export const setAdminDocument = async ( uid, lastname, firstname, email, type) => {

    await setDoc(doc(db, "admin", uid), {

        lastname : lastname,
        firstname : firstname,
        email : email,
        type : type,
        uid : uid

    });

}

export const getUser = async (uid) => {

    const docRef = doc(db, "council", uid);
    
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        return docSnap.data()

    } else {

        console.log("No such document!");

    }
}

export const getAUser = async (uid) => {

    const docRef = doc(db, "users", uid);
    
    const docSnap = await getDoc(docRef);

    return docSnap.data();

}

export const getUsersInfo = async (uid) => {

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    const dataDetails = await docSnap.data()

    return dataDetails;
    
}

export const getDataExport = async (data) => {

    const user = {
        data : {}
    }

    data.forEach(async res => {

        await getUsersInfo(res.data.uid).then(ent => user.data = ent)

    })

   console.log(user)
    
}









