import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailUser } from '../../Helper/EmailUserProvider'
import Axios from 'axios'
import Appbar from '../Appbar/Appbar.tsx'
import {
    Button
} from '@chakra-ui/react';
  

const PaygHome = () => {
    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
  
  
    const { emailLog, setEmailLog } = useContext(EmailUser);
    const [ role, setRole ] = useState("");

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
    <div>
        <Appbar />
        <div style={{display : "flex", flexDirection : "column" ,justifyContent : "center", alignItems : "center"}}>
         <p style={{marginTop : "30px"}}>
            Welcome to PayG Vendor
        </p>
        <div style={{display : "flex", margin : "20px"}}>
            <a href='/payg'>
                <Button width={150}>Input Data</Button>
            </a>
            <a href='/paygStatus'>
            <Button width={150} marginLeft={10}>Invoice Status</Button>
            </a>
        </div>
        </div>
    </div>
  )
}

export default PaygHome