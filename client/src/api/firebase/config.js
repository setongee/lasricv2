import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQvvFWIDGZ2Cwi69Dz-ewwiu-z_ggLO_w",
  authDomain: "lasricv2.firebaseapp.com",
  projectId: "lasricv2",
  storageBucket: "lasricv2.appspot.com",
  messagingSenderId: "1086813331415",
  appId: "1:1086813331415:web:482ba9a702912ab8bbb592"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);

export {app, db, storage}