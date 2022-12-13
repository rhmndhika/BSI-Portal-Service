import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

const ProfileDetails = () => {

  Axios.defaults.withCredentials = true

  const { id } = useParams();

  
  const [ profileDetails, setProfileDetails ] = useState([]);

  const getProfileDetails = () => {
    Axios.get(`https://bsi-portal-service-production.up.railway.app/socialmedia/profile/${id}`).then((response) => {
      setProfileDetails(response.data);
    })
  }

  useEffect(() => {
    getProfileDetails();
  }, [id])

  return (
    <div>
      <div>
        ProfileDetails with ID :{id}
      </div>
      {profileDetails.map((i, index) => {
        return (
        <Flex>
          <p key={index}>{i.Username}</p>
          <p key={index}>{i.FullName}</p>
          <p key={index}>{i.Bio}</p>
        </Flex>
        )
      })}
    </div>
  )
}

export default ProfileDetails