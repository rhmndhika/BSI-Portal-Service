import React, { useState, useContext, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EmailUser } from '../../Helper/EmailUserProvider'
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx'
import {
    Button,
    Spinner
  } from '@chakra-ui/react'
import './PaygStatus.css'
import moment from 'moment';

const PaygStatusDetail = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();
  const {id} = useParams();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const [ role, setRole ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true);

 const [ dataListID, setDataListID ] = useState([]);

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
  
    const fetchDataPayg = () => {
      Axios.get(`https://empty-test-project.herokuapp.com/paygdata/${id}`).then((response) => {
        setDataListID(response.data);
        setIsLoading(false);
      })
    }
   

    useEffect(() => {
      userExpire();
      fetchDataPayg();
     }, [])


  return (
    <div>
      <Appbar />
        <div style={{display : "flex", justifyContent: "center", alignItems: "center"}}>
          {isLoading ? <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}><Spinner/></div> : 
              <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
                <p>Email           : {dataListID.Email}</p>
                <p>Invoice Number  : {dataListID.InvoiceNumber}</p>
                <p>Invoice Date    : {moment(dataListID.InvoiceDate).format("DD MMMM YYYY")}</p>
                <p>Invoice Amount  : {dataListID.Amount}</p>
                <p>Invoice Subject : {dataListID.Subject}</p>
                <p>Attachments     : {dataListID.PaygAttachments}</p>
                <p>Created At      : {moment(dataListID.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p>Updated At      : {moment(dataListID.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
              }
        </div>
    </div>
  )
}

export default PaygStatusDetail