import React,{ useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx';
import {
  Flex,
  Image,
  Text,
  useColorModeValue,
  IconButton
} from "@chakra-ui/react";
import './Home.css';
import Carousel from '../Header/Carousel';
import {BsChatDots} from 'react-icons/bs';
import Footer from '../Footer/Footer.tsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Sourcing from '../../Images/Sourcing.jpg';
import POManagement from '../../Images/POManagement.jpg';
import DeliveryMonitoring from '../../Images/DeliveryMonitoring.jpg';
import OutsourcingPortal from '../../Images/OutsourcingPortal.jpg';
import Forum from '../../Images/Forum.jpg';
import VendorRegistrationV2 from '../../Images/VendorRegistrationV2.jpg';
import InvoiceGatewayV2 from '../../Images/InvoiceGatewayV2.png';
import SocialMediaV2 from '../../Images/SocialMediaV2.jpg';

AOS.init();

const Home = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();
  
  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { role, setRoleUser } = useContext(RoleUser);
  const [ isHide, setIsHide ] = useState(true);

  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let mainText = useColorModeValue("gray.800", "white");
 
  useEffect(() => {

    async function userExpire2 () {
      const request = await  Axios.get(`${process.env.REACT_APP_MY_ENV_VAL}/login`)
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
  

   const cardItem = [
    {
      title : "Vendor Registration",
      imgUrl : VendorRegistrationV2,
      hrefUrl : '/registrationhistory',
      shadows : "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    },
    {
      title : "Sourcing",
      imgUrl : Sourcing,
      hrefUrl : '#',
      shadows : "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    },
    {
      title : "PO Management",
      imgUrl : POManagement,
      hrefUrl : '#',
      shadows : "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    },
    {
      title : "Social Media",
      imgUrl : SocialMediaV2,
      hrefUrl : '/socialmedia/home',
      shadows : "blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px"
    },
    {
      title : "Delivery Monitoring",
      imgUrl : DeliveryMonitoring,
      hrefUrl : '#',
      shadows : "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    },
    {
      title : "Invoice Gateway",
      imgUrl : InvoiceGatewayV2,
      hrefUrl : '/paygHome',
      shadows : "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    },
    {
      title : "Outsourcing Portal",
      imgUrl : OutsourcingPortal,
      hrefUrl : '/outsourcing',
      shadows : "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    },
    {
      title : "Group Forum",
      imgUrl : Forum,
      hrefUrl : '#',
      shadows: "blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px"
    }
   ]

   const openChat = () => {
    setIsHide(current => !current);
   }

  return (
    <>
    <Appbar />
    <Carousel />
    <Link to="/livechat">
     <IconButton
      className="whatsapp_float"
      rel="noopener noreferrer"
      colorScheme='blue'
      aria-label='Live Chat'
      isRound={true}
      size="lg"
      onClick={openChat}
      icon={<BsChatDots />}
      />
    </Link>
    <Flex flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap">
      {cardItem.map((i) => {
        return (
          <Flex
            data-aos="fade-up"
            borderRadius='20px'
            bg={boxBg}
            // shadow="outline"
            style={{boxShadow: i.shadows}}
            p='20px'
            h='225px'
            margin={30}
            marginTop="50px"
            w={{ base: "315px", md: "315px" }}
            alignItems='center'
            flexDirection="column"
            key={i._id}
            >
            <a href={i.hrefUrl}>
            <Image
              src={i.imgUrl}
              maxW='100%'
              maxH='140px'
              borderRadius='20px'
              mb='10px'
              alt='image-icon'
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
    )})}
    </Flex>
    <div style={{marginTop : "30px", height : "100px"}}></div>
    <Footer />
  </>
  )
}

export default Home