import React,{ useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Appbar/Appbar.tsx';
import { EmailUser } from '../../Helper/EmailUserProvider';
import Axios from 'axios';
import Admin from '../Admin/Admin';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Flex,
  Button,
  Icon,
  Image,
  Text,
  DarkMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { MdPeople } from "react-icons/md";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import LogoRegistration from '../../Images/LogoRegistration.png'


const Home = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();


  const { emailLog, setEmailLog } = useContext(EmailUser);
  const [ role, setRole ] = useState("");

  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let mainText = useColorModeValue("gray.800", "white");
  let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  let iconColor = useColorModeValue("brand.200", "white");

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
    <div>
    <Flex
      style={{border : "1px solid"}}
      borderRadius='20px'
      bg={boxBg}
      p='20px'
      h='345px'
      w={{ base: "315px", md: "345px" }}
      alignItems='center'
      direction='column'>
      <Flex w='100%' mb='18px'>
        <Flex
          w='38px'
          h='38px'
          align='center'
          justify='center'
          borderRadius='50%'
          me='12px'
          bg={iconBox}>
          <Icon w='24px' h='24px' as={MdPeople} color={iconColor} />
        </Flex>
        <Text
          my='auto'
          fontWeight='600'
          color={mainText}
          textAlign='center'
          fontSize='xl'
          me='auto'>
          Application
        </Text>
      </Flex>
      <Image
        src={LogoRegistration}
        maxW='100%'
        borderRadius='20px'
        mb='10px'
      />
      <Text
        fontWeight='600'
        color={mainText}
        textAlign='start'
        fontSize='xl'
        w='100%'>
        Vendor Registration
      </Text>
      <Flex mt='auto' justify='space-between' w='100%' align='center'>
        <DarkMode>
          <Badge
            borderRadius='9px'
            size='md'
            colorScheme='green'
            color='green.400'
            textAlign='center'
            display='flex'
            justifyContent='center'
            alignItems='center'>
            BSI
          </Badge>
        </DarkMode>
      </Flex>
    </Flex>
    </div>
    </>
  )
}

export default Home