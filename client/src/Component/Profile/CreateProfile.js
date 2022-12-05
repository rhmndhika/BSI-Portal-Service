import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { ProfileUser } from '../../Helper/ProfileUserProvider';
import './CreateProfile.css';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select
} from '@chakra-ui/react';
import Axios from 'axios';


const CreateProfile = () => {
  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { profileUser, setProfileUser } = useContext(ProfileUser);
  const [ role, setRole ] = useState("");
  const [ isLoading , setIsLoading ] = useState(false);
  const [ isHide, setIsHide ] = useState(true);


  // const userExpire = () => {
  //   Axios.get('https://bsi-portal-service-production.up.railway.app/login')
  //   .then((response)=> {
  //     if(response.data.loggedIn === true) {
  //       setEmailLog(response.data.email);
  //       setRole(response.data.role);
  //     } else {
  //       navigate("/", {replace : true})
  //     }
  //   }, {withCredentials : true});
  // };

  const handleSubmitProfile = async (e) => {

    e.preventDefault();

    await Axios.post("https://bsi-portal-service-production.up.railway.app/profile" , {
      Email : emailLog,
      FullName : profileUser.fullName,
      Entity : profileUser.entity,
      SupplierName : profileUser.supplierName
    }).then(() => {
      setIsLoading(true);
      setTimeout(()=> navigate("/home", {replace : true}), 1000)
    })

  }

  useEffect(() => {

    async function userExpire2 () {
      const request = await  Axios.get('https://bsi-portal-service-production.up.railway.app/login')
      .then((response)=> {
        if(response.data.loggedIn === true) {
          setEmailLog(response.data.email);
          setRole(response.data.role);
        } else {
          navigate("/", {replace : true})
        }
      }, {withCredentials : true});
      return request;
    }
    userExpire2();
   }, [emailLog])
  
  return (
        <form className='formPayg' method='POST' encType='multipart/form-data' onSubmit={handleSubmitProfile}>
            <FormControl isRequired margin={1}>
              <FormLabel>Email</FormLabel>
              <Input type='text' value={emailLog} onChange={(e) => {
                setProfileUser(e.target.value)
              }} />

              <FormLabel>Full Name</FormLabel>
              <Input type='text' value={profileUser.fullName} onChange={(e)=> {
                setProfileUser({...profileUser, fullName : e.target.value})
              }}/>

              <FormLabel>Entity</FormLabel>
              <Select placeholder='Select Your Occupation' onChange={(e)=> {
                setProfileUser({...profileUser, entity : e.target.value})
                if (e.target.value === "Supplier") {
                  setIsHide(false);
                } else {
                  setIsHide(true);
                }
              }}>
                <option value="BSI">BSI</option>
                <option value="Supplier">Supplier</option>
              </Select>
              
              {isHide === true ?
                null
                :
              <>
                <FormLabel>Supplier Name</FormLabel>
                <Input type='text' value={profileUser.supplierName} onChange={(e)=> {
                  setProfileUser({...profileUser, supplierName : e.target.value})
                }}/>
              </>
             }

              {isLoading === false ?
              <div className='btnSubmitPayg' style={{marginTop : "15px"}}>
                <Button type="submit" colorScheme={"orange"} width={"130px"}>Submit</Button>
              </div>
              :
              <div className='btnSubmitPayg'>
                <Button
                  isLoading
                  loadingText='Submitting'
                  colorScheme={"orange"}
                  variant='outline'
                  width={"130px"}
                >
                  Submit
                </Button>
              </div>
              }
            </FormControl>
        </form>
  )
}

export default CreateProfile