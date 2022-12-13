import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { EmailUser } from './Helper/EmailUserProvider'
import { RoleUser } from './Helper/RoleUserProvider'
import Axios from 'axios'
import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {

    const { emailLog, setEmailLog } = useContext(EmailUser);
      
    return emailLog 
}

const ProtectedRoutes = () => {

  const isAuth = useAuth();
  
  return isAuth !== null || "" ? <Outlet  /> : <Navigate to="/" replace />

}

export default ProtectedRoutes

