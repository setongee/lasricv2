import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
        status : "sent",
        message : "Password reset email sent!"
    }
    // alert("Check your inbox for a password reset link.");
  } catch (error) {
    return {
        status : "error",
        message : error.code
    }
  }
}