import React, { useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailUser } from '../../Helper/EmailUserProvider'
import { ProfileUser } from '../../Helper/ProfileUserProvider'
import './CreateProfile.css'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
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

  const handleSubmitProfile = async (e) => {

    e.preventDefault();

    await Axios.post("https://empty-test-project.herokuapp.com/createprofile" , {
      email : emailLog,
      CompanyName : profileUser.companyName,
      PICName : profileUser.pic,
      PICEmail : profileUser.picEmail,
      Occupation : profileUser.occupation
    }).then((res) => {
      setIsLoading(true);
      setTimeout(()=> navigate("/home"), 1000)
    })

    //  const formData = new FormData();

    //   formData.append('email', emailLog);
    //   formData.append('CompanyName', profileUser.companyName);
    //   formData.append('PICName', profileUser.pic);
    //   formData.append('PICEmail', profileUser.picEmail);
    //   formData.append('Occupation', profileUser.occupation);
     
    //   await fetch("https://empty-test-project.herokuapp.com/createprofile", {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   .then((res) => {
    //     setIsLoading(true);
    //   })
  }

 


  useEffect(() => {
    userExpire();
  }, [])
  
  return (
        <form className='formPayg' method='POST' encType='multipart/form-data' onSubmit={handleSubmitProfile}>
            <FormControl isRequired margin={1}>
              <FormLabel>Current User</FormLabel>
              <Input type='text' value={emailLog} onChange={(e) => {
                setProfileUser(e.target.value)
              }} />

              <FormLabel>Company Name</FormLabel>
              <Input type='text' value={profileUser.companyName} onChange={(e)=> {
                setProfileUser({...profileUser, companyName : e.target.value})
              }}/>

              <FormLabel>PIC</FormLabel>
              <Input type='text' value={profileUser.pic} onChange={(e)=> {
                setProfileUser({...profileUser, pic : e.target.value})
              }} />

              <FormLabel>PIC Email</FormLabel>
              <Input type='email' value={profileUser.picEmail} onChange={(e)=> {
                setProfileUser({...profileUser, picEmail : e.target.value})
              }} />

              <FormLabel>Occupation</FormLabel>
              <Select placeholder='Select Your Occupation' onChange={(e)=> {
                setProfileUser({...profileUser, occupation : e.target.value})
              }}>
                <option value="Buyer">Buyer</option>
                <option value="Supplier">Supplier</option>
              </Select>
              
              {isLoading === false ?
              <div className='btnSubmitPayg'>
                <Button type="submit">Submit</Button>
              </div>
              :
              <div className='btnSubmitPayg'>
                <Spinner size='lg' />
              </div>
              }
            </FormControl>
        </form>
  )
}

export default CreateProfile