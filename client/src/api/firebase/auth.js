import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";
import { data } from "./new-data";
import axios from "axios";

export const setDocument = async (
  uid,
  lastname,
  firstname,
  email,
  phone,
  type,
  linkedinProfile,
) => {
  await setDoc(doc(db, "users", uid), {
    lastname,
    firstname,
    email,
    phone,
    uid,
    type,
    applications: [],
    application_pathway: {},
    verified: false,
    photo: "",
    linkedinProfile,
    team: [],
    createdAt: new Date(),
  });

  if (type === "admin") {
    setAdminDocument(uid, lastname, firstname, email, type);
  }

  //    sendLasricEmail(email, firstname, lastname, password, track)
};

const sendLasricEmail = async (email, firstname, lastname, password, track) => {
  if (track === "council") {
    await axios.post("/api/sendemail/council/create", {
      email: email,
      firstname: firstname,
      lastname,
      password,
    });
  } else {
    await axios.post("/api/sendemail/register", {
      email: email,
      firstname: firstname,
      lastname,
      password,
    });
  }
};

// export const setCouncilDocument = async (uid, data) => {
//   await setDoc(doc(db, "council", uid), data);
//   SignInUser("admin@lasric.lagosstate.gov.ng", "123456");
// };

// export const createCouncilMember = (data) => {
//   const {
//     email,
//     password,
//     lastname,
//     firstname,
//     phone = "08133211658",
//     linkedinProfile,
//   } = data;

//   const auth = getAuth();

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(async (userCredential) => {
//       const user = userCredential.user;

//       await setDocument(
//         user.uid,
//         lastname,
//         firstname,
//         email,
//         phone,
//         "council",
//         linkedinProfile,
//       ).then(() => {
//         setCouncilDocument(user.uid, { ...data, uid: user.uid });
//       });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);

//       alert("Sorry this email address is already in use.");
//     });
// };

// const SignInUser = (email, password) => {
//   const auth = getAuth();
//   signInWithEmailAndPassword(auth, email, password);
// };

// new function to create council member
export const createCouncilMember = async (data) => {
  const functions = getFunctions();
  const createCouncil = httpsCallable(functions, "createCouncilMember");

  try {
    const result = await createCouncil(data);
    return result.data;
  } catch (error) {
    console.error("Error creating council member:", error);
    alert("Sorry this email address is already in use.");
  }
};

export const getCouncilData = async () => {
  const fetchUsers = query(
    collection(db, "council"),
    where("internal", "==", true),
  );

  const querySnapshot = await getDocs(fetchUsers);

  const allUsers = [];

  querySnapshot.forEach((doc) => {
    allUsers.push(doc.data());
  });

  return allUsers;
};

export const setAdminDocument = async (
  uid,
  lastname,
  firstname,
  email,
  type,
) => {
  await setDoc(doc(db, "admin", uid), {
    lastname: lastname,
    firstname: firstname,
    email: email,
    type: type,
    uid: uid,
  });
};

export const getUser = async (uid) => {
  const docRef = doc(db, "council", uid);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const getAUser = async (uid) => {
  const docRef = doc(db, "users", uid);

  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getUsersInfo = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  const dataDetails = await docSnap.data();

  return dataDetails;
};

export const getDataExport = async (data) => {
  const user = {
    data: {},
  };

  data.forEach(async (res) => {
    await getUsersInfo(res.data.uid).then((ent) => (user.data = ent));
  });

  console.log(user);
};

// field cleanup function
export const cleanupPlainTextPasswords = async () => {
  const auth = getAuth();
  console.log("Current user:", auth.currentUser?.email);
  try {
    // Clean users collection
    const usersSnapshot = await getDocs(collection(db, "users"));
    const userUpdates = usersSnapshot.docs.map((document) =>
      updateDoc(doc(db, "users", document.id), { password: deleteField() }),
    );
    await Promise.all(userUpdates);
    console.log(`Cleaned ${usersSnapshot.docs.length} user documents`);

    // Clean council collection
    const councilSnapshot = await getDocs(collection(db, "council"));
    const councilUpdates = councilSnapshot.docs.map((document) =>
      updateDoc(doc(db, "council", document.id), { password: deleteField() }),
    );
    await Promise.all(councilUpdates);
    console.log(`Cleaned ${councilSnapshot.docs.length} council documents`);

    return "Done — all plain text passwords removed";
  } catch (error) {
    console.error("Cleanup error:", error);
    throw error;
  }
};
