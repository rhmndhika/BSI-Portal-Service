import React, { useContext, useEffect } from 'react'
import { EmailUser } from './Helper/EmailUserProvider'
import { RoleUser } from './Helper/RoleUserProvider'
import Axios from 'axios'
import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {

    Axios.defaults.withCredentials = true;

    const { emailLog, setEmailLog } = useContext(EmailUser);
    const { roleUser, setRoleUser } = useContext(RoleUser);

    const userExpire = () => {
        Axios.get('https://empty-test-project.herokuapp.com/login')
        .then((response) => {
          if(response.data.loggedIn === true) {
            setEmailLog(response.data.email);
            setRoleUser(response.data.role);
          } 
        }, {withCredentials : true});
      };
      
  
    useEffect(() => {
      userExpire();
    }, [])
    

    return emailLog && roleUser
}

const ProtectedRoutes = () => {

    const isAuth = useAuth();
    
    return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes