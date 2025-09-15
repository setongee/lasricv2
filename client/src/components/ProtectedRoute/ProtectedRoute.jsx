// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import {Outlet, useNavigate } from "react-router-dom";
import { isTokenValid } from "../../middleware/authToken";
import { signOut, auth } from "firebase/auth";

const ProtectedRoute = ({ currentUser, allowedTypes }) => {

  const navigate = useNavigate();

useEffect(() => {
  // isTokenValid();
}, []);

  if (!Object.keys(currentUser).length) {
    navigate('/login')
  };

  if (allowedTypes && !allowedTypes.includes(currentUser.type)) {
     navigate('/login');
  }

  return <Outlet/>

};

export default ProtectedRoute;