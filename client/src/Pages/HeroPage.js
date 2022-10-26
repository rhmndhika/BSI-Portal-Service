import React, { useState, useContext, useEffect} from 'react'
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
    Icon,
    IconProps,
  } from '@chakra-ui/react';
  
  export default function HeroPage() {
    Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ dataProfileUser, setDataProfileUser ] = useState([]);
  

  const userExpire = () => {
    Axios.get('https://empty-test-project.herokuapp.com/login')
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
    await Axios.get("https://empty-test-project.herokuapp.com/getprofile").then((response) => {
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
          py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Meeting scheduling{' '}
            <Text as={'span'} color={'orange.400'}>
              made easy
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            Never miss a meeting. Never be late for one too. Keep track of your
            meetings and receive smart reminders in appropriate times. Read your
            smart “Daily Agenda” every morning.
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}>
              Get started
            </Button>
            <Button rounded={'full'} px={6}>
              Learn more
            </Button>
          </Stack>
          <Flex w={'full'}>
            {/* <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            /> */}
          </Flex>
        </Stack>
      </Container>
    );
  }
  