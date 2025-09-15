import './App.css';
import React, {useState, useEffect} from 'react';

// styles
import './global/styles/pageBrief.scss';

//components
import Header from './components/header/header';
import Router from './routes/routes';
import Footer from './components/footer/footer';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from './api/firebase/config';
import QuickInfo from './components/header/quickInfo';
import { useLocation } from 'react-router-dom';
import { getCurrentCohortNumber } from './api/firebase/admin/admin_applications';
import { useUser } from './stores/user.store';
import { useCohortNumber } from './stores/cohort.store';


function App() {

  const currentUser = useUser(state=>state.currentUser);
  const cohort = useCohortNumber(state=>state.cohort);
  const setCohortNumber = useCohortNumber(state=>state.setCohortNumber);

  const auth = getAuth();
  const {pathname} = useLocation()
  

  useEffect(() => {
    
    window.scroll(0,0);
    document.body.style.overflowY = "visible"
    if(pathname === '/apply') document.body.style.overflowY = "hidden"

  }, [pathname]);


  useEffect(() => {
        
    getCurrentCohortNumber()
    .then( res => setCohortNumber(res[0].present) )

  }, []);

  return (
    
    <div className="app">

      <div className={`fixedClass client_${pathname.split('/')[1]}`}>
        
        <QuickInfo cohort = {cohort} />
        <Header user = {currentUser} cohort = {cohort} />

      </div>

      <Router user = {currentUser} cohort = {cohort} />
      
      <Footer/>

    </div>

  );

}

export default App;
