import React, { useState, useContext, useEffect, useRef } from 'react'
import { EmailUser } from '../Helper/EmailUserProvider'
import { RoleUser } from '../Helper/RoleUserProvider'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import '../Component/Profile/CreateProfile.css'
import CreateProfile from '../Component/Profile/CreateProfile';
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Image
  } from '@chakra-ui/react';
  import BusinessMain3D from '../Images/BusinessMain3D.png';
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  AOS.init();
  
export default function HeroPage() {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();


  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ isHide, setIsHide ] = useState(true);
  const [ dataProfileUser, setDataProfileUser ] = useState([]);
  
  const ref = useRef(null);

  const handleClick = () => {
    setIsHide(false);
    setTimeout( () => ref.current?.scrollIntoView({behavior: 'smooth'}, 500))
  }

  const userExpire = () => {
    Axios.get('https://bsi-portal-service-production.up.railway.app/login')
    .then((response) => {
      if(response.data.loggedIn === true) {
        setEmailLog(response.data.email);
        setRoleUser(response.data.role);
      } else {
        navigate("/", {replace : true})
      }
    }, {withCredentials : true});
  };

  const getProfileUser = async () => {
    await Axios.get("https://bsi-portal-service-production.up.railway.app/profile").then((response) => {
      setDataProfileUser(response.data);
    })
  }

  useEffect(() => {
   userExpire();
   getProfileUser();
  }, [])
  
    return (
      <Container maxW={'5xl'}>
        <Stack 
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          data-aos="zoom-in"
          data-aos-duration="1000">
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Welcome to{' '}
            <Text as={'span'} color={'orange.400'}>
              BSI Portal Supplier
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            {/* Never miss a meeting. Never be late for one too. Keep track of your
            meetings and receive smart reminders in appropriate times. Read your
            smart “Daily Agenda” every morning. <br></br> */}
            BSI Portal Supplier is a intermediary that can make both parties to communicate with each other by using a website. 
            Before you enter the homepage, please create your profile first so we know who you are.
          </Text>
          <Stack spacing={6} direction={'row'}>
          {dataProfileUser.CompanyName === "" || dataProfileUser.length <= 0  ? 
            <Button
              width={150}
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}
              onClick={() => handleClick()}>
              Create Profile
            </Button>
            :
            null
            }
             {dataProfileUser.CompanyName === "" || dataProfileUser.length <= 0 ?
             null
             :
             <a href="/home">
              <Button  width={150}
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}>
                Home
              </Button>
             </a>
            }
          </Stack>
          <Flex w={'full'} justifyContent="center">
            <Image src={BusinessMain3D}  fill="none" alt="" height={{sm : '24rem', lg : '28rem'}} mt={{ base : 12, sm: 16}} />
          </Flex>
          {isHide === false ?
          <Stack ref={ref}>
            <CreateProfile />
          </Stack>
          :
          null
          }
        </Stack>
      </Container>
    );
  }
  