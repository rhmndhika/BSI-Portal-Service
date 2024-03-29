import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx';
import {
  Button
} from '@chakra-ui/react';


const PaygHomeAdmin = () => {

  Axios.defaults.withCredentials = true;


  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  

  
  return (
    <div style={{height : "650px"}}>
        <Appbar />
        <div style={{display : "flex", flexDirection : "column" ,justifyContent : "center", alignItems : "center"}}>
         <p style={{marginTop : "30px"}}>
            Welcome to PayG Vendor
        </p>
        <div style={{display : "flex", margin : "20px"}}>
            <a href='/paygStatus'>
            <Button width={150}>Invoice Status</Button>
            </a>
        </div>
        </div>
    </div>
  )
}

export default PaygHomeAdmin