import { getAuth, updatePassword } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "./config";

export const resetPassword = async ( newPass ) => {

    const auth = getAuth();

    const user = auth.currentUser;
    const newPassword = newPass;

    var status = 'processing'

    await updatePassword(user, newPassword).then(() => {

        status = 'password_changed';

        const counRef = doc(db, 'council', auth.currentUser.uid);

        updateDoc(counRef, { "password" : newPassword });

    }).catch((error) => {

        console.log(error);

    });

    return status;

}