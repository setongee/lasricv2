import { collection, getDocs } from "firebase/firestore"; 
import { db } from './config';

export const getCallups = async () => {

  const callup = []

  const querySnapshot = getDocs(collection(db, "callups"));
  
  await querySnapshot
  .then( (e) => e.docs.forEach( data => callup.push( {...data.data(), id : data.id } ) ) )

  return callup

}