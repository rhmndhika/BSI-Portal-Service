import React, { useEffect, useState, useContext} from 'react';
import { EmailUser } from '../Helper/EmailUserProvider';
import { RoleUser } from '../Helper/RoleUserProvider';
import Axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Appbar from '../Component/Appbar/Appbar.tsx';
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Flex,
    Input
  } from '@chakra-ui/react';
import BlogCard from '../Component/BlogCard/blogPostWithImage';

const News = () => {

    let navigate = useNavigate();

    const { emailLog, setEmailLog } = useContext(EmailUser);
    const { roleUser, setRoleUser } = useContext(RoleUser);

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

  return (
    <>
    <Appbar />
    <Flex justifyContent="center" alignItems="center" mt="20px">
        <Input width="320px" height="80px" placeholder='Search News...' backgroundColor="blackAlpha.300" />
    </Flex>
    <Flex flexDirection="row" flexWrap="wrap" justifyContent="center" alignItems="center" padding="20px" gap="30px" marginLeft="auto" marginRight="auto">
       <BlogCard />
    </Flex>
    </>
  )
}

export default News