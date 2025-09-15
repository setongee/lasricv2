import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../stores/user.store";

const auth = getAuth()

const currentUser = useUser.getState().currentUser;

export const isTokenValid = () => {

  const { loggedIn } = currentUser;

  if (!loggedIn) {
    console.log("No login time found");
    return;
  }

  const loginTime = new Date(loggedIn).getTime();
  const now = Date.now();

  const diffMs = now - loginTime;
  const diffMinutes = Math.floor(diffMs / 1000 / 60);

  if(diffMinutes >= 30){
    SignOutClient();
  }

};

export const SignOutClient = () => {

    signOut(auth).then(() => window.location.reload(true) );

}