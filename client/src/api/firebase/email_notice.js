import { addDoc, collection } from "firebase/firestore";
import { db } from "./config";

export const email_notice_subscription = async (email, cohort) => {

    await addDoc(collection(db, "subscriptions", "email_notice", cohort), {
        
        email : email,
        status : "pending",
        date : new Date

    })
    

}