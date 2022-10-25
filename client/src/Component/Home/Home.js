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
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { MdPeople } from "react-icons/md";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import LogoRegistration from '../../Images/LogoRegistration.png'
import './Home.css'
import Header from '../Header/Header';
import {BsChatDots} from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react'

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

   const cardItem = [
    {
      title : "Vendor Registration",
      imgUrl : LogoRegistration,
      hrefUrl : 'https://bsivendorregistration.netlify.app'
    },
    {
      title : "Sourcing",
      imgUrl : LogoRegistration,
      hrefUrl : '#'
    },
    {
      title : "PO Management",
      imgUrl : LogoRegistration,
      hrefUrl : '#'
    },
    {
      title : "Social Media",
      imgUrl : LogoRegistration,
      hrefUrl : '#'
    },
    {
      title : "Delivery Monitoring",
      imgUrl : LogoRegistration,
      hrefUrl : '#'
    },
    {
      title : "Invoice Gateway",
      imgUrl : LogoRegistration,
      hrefUrl : '/paygHome'
    },
    {
      title : "Outsourcing Portal",
      imgUrl : LogoRegistration,
      hrefUrl : '#'
    },
    {
      title : "Group Forum",
      imgUrl : LogoRegistration,
      hrefUrl : '#'
    }
   ]

  return (
    <>
    <Appbar />
    <Header />
    <a
      href="https://www.google.com/"
      class="whatsapp_float"
      target="_blank"
      rel="noopener noreferrer"
    >
     <IconButton
      colorScheme='blue'
      aria-label='Search database'
      isRound={true}
      size="lg"
      icon={<BsChatDots />}
      />
    </a>
    <div className='wrapperHome'>
      {cardItem.map((i, index) => {
        return (
        <>
          <Flex
            borderRadius='20px'
            bg={boxBg}
            p='20px'
            h='225px'
            shadow="outline"
            margin={5}
            w={{ base: "315px", md: "315px" }}
            alignItems='center'
            flexDirection="column"
            >
            <a href={i.hrefUrl}>
            <Image
              src={i.imgUrl}
              maxW='100%'
              borderRadius='20px'
              mb='10px'
              />
            </a>
            <Text
              fontWeight='600'
              color={mainText}
              textAlign='start'
              fontSize='xl'
              w='100%'>
              {i.title}
            </Text>
            </Flex>
            </>  
            
    )})}
    </div>
  </>
  )
}

export default Home