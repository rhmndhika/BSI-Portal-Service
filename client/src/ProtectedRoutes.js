import React, { useContext } from 'react';
import { EmailUser } from './Helper/EmailUserProvider'
import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {

  const { emailLog } = useContext(EmailUser);


  return emailLog 
}

const ProtectedRoutes = () => {

  const isAuth = useAuth();
  
  return isAuth !== null  ? <Outlet  /> : <Navigate to="/" replace />

}

export default ProtectedRoutes

