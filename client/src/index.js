import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUser } from './stores/user.store'; 
import { getAUser } from './api/firebase/auth';

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const { setCurrentUser } = useUser.getState(); 
  if(user) {
    getAUser(user?.uid).then(userdetails => setCurrentUser({...userdetails, loggedIn : new Date()}));
  }else{
    setCurrentUser({})
  }
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);