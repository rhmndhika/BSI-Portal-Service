import React,{ useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Appbar/Appbar.tsx';
import { EmailUser } from '../../Helper/EmailUserProvider';
import Axios from 'axios';
import Admin from '../Admin/Admin';

const Home = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();


  const { emailLog, setEmailLog } = useContext(EmailUser);
  const [ role, setRole ] = useState("");

  const PageDisplay = () => {
    if ( role === "User" ){
        return <Home />
    } else if ( role === "Admin") {
        return <Admin />
    } 
  };

  const userExpire = () => {
    Axios.get('https://empty-test-project.herokuapp.com/login')
    .then((response)=> {
      if(response.data.loggedIn === true) {
        setEmailLog(response.data.email.email);
        setRole(response.data.role);
      } else {
        navigate("/")
      }
    }, {withCredentials : true});
  };

  useEffect(() => {
    userExpire();
   }, [])

  return (
    <>
    <Appbar />
    <h1>USER : {emailLog}</h1>
    </>
  )
}

export default Home