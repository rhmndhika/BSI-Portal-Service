import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';
import Appbar from '../Appbar/Appbar.tsx';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import { useNavigate } from 'react-router-dom';

const ProfileDetails = () => {

  Axios.defaults.withCredentials = true

  let navigate = useNavigate();

  const { id } = useParams();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ profileDetails, setProfileDetails ] = useState([]);

  useEffect(() => {
    async function userExpire2 () {
      const request = await  Axios.get('https://bsi-portal-service-production.up.railway.app/login')
      .then((response)=> {
        if(response.data.loggedIn === true) {
          setEmailLog(response.data.email);
          setRoleUser(response.data.role);
        } else {
          navigate("/", {replace : true})
        }
      }, {withCredentials : true});
      return request;
    }
    userExpire2();
   }, [emailLog])

  const getProfileDetails = () => {
    Axios.get(`https://bsi-portal-service-production.up.railway.app/socialmedia/profile/${id}`).then((response) => {
      setProfileDetails(response.data);
    })
  }

  const deleteProfile = () => {
    Axios.delete(`https://bsi-portal-service-production.up.railway.app/socialmedia/profile/delete/${id}`).then((response) => {
     
    })
  }

  useEffect(() => {
    getProfileDetails();
  }, [id])

  return (
    <div>
      <Appbar />
      <div>
        ProfileDetails with ID :{id}
      </div>
        <Flex flexDirection="column">
          <p>{profileDetails.Username}</p>
          <p>{profileDetails.FullName}</p>
          <p>{profileDetails.Bio}</p>
        </Flex>
      <Button onClick={deleteProfile}>Delete my Profile</Button>
    </div>
  )
}

export default ProfileDetails