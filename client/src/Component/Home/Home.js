import React,{ useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Appbar/Appbar.tsx';
import { EmailUser } from '../../Helper/EmailUserProvider';
import Axios from 'axios';

const Home = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();


  const { emailLog, setEmailLog } = useContext(EmailUser);
  const [ role, setRole ] = useState("");

  const userExpire = () => {
    Axios.get('https://empty-test-project.herokuapp.com/login')
    .then((response)=> {
      if(response.data.loggedIn === true && response.data.role !== "") {
        setEmailLog(response.data.email.email);
        setRole(response.data.role);
      } else {
        navigate("/" , {replace : true});
      }
    });
  };

  useEffect(() => {
    userExpire();
   }, [])

  return (
    <Appbar />
  )
}

export default Home