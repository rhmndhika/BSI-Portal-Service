import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Image,
  HStack
} from '@chakra-ui/react';
import { 
  LockIcon, 
  EmailIcon, 
  PhoneIcon 
} from '@chakra-ui/icons';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const [show, setShow] = React.useState(false)
  
  const [ usernameReg, setUsernameReg ] = useState("")
  const [ emailReg, setEmailReg ] = useState("")
  const [ passwordReg, setPasswordReg ] = useState("")
  const [ messageDuplicate, setMessageDuplicate] = useState("")

  const handleClick = () => setShow(!show)

  const isErrorUsername = usernameReg === ''
  const isErrorEmail = emailReg === ''

  // 🦄

  const showToastSucces = () => {
    toast.success('Redirecting to login page', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
 
  const register = (e) => {
    e.preventDefault();

     Axios.post("https://bsi-portal-service-production.up.railway.app/register" , {
        username : usernameReg,
        email: emailReg, 
        password: passwordReg
      }).catch((error) => {
        const showToastWarning = () => {
          toast.warn(error.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
        if (error.response.status === 500) {
          setMessageDuplicate(error.response.message);
          showToastWarning();
        }
      })
      showToastSucces();
      setTimeout(() => navigate("/"), 2000);
  }

  
  return (
    <>
    <ToastContainer />
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <HStack display="flex" justifyContent="center" alignItems="center" textAlign={'center'} marginBottom={'30px'}>
            <PhoneIcon  />
            <Heading fontSize={'2xl'}color={'white.600'}>BSI Supplier Portal</Heading>
          </HStack>
          <Heading fontSize={'xl'}>Register to your account</Heading>
          <form onSubmit={register}>
          <FormControl isInvalid={isErrorUsername}>
                <FormLabel>Username</FormLabel>
                <InputGroup size='md'>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.300' />}
                />
                <Input
                    pr='4.5rem'
                    type="text"
                    placeholder='Enter username'
                    required
                    onChange={(e) => {
                      setUsernameReg(e.target.value)
                    }}
                />
            </InputGroup>
            {!isErrorUsername ? (
                    <FormHelperText>
                      Please input your username
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Username is required.</FormErrorMessage>
                )}
            </FormControl>
           
            <FormControl isInvalid={isErrorEmail}>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<EmailIcon color='gray.300' />}
                />
                <Input type='email' placeholder="Enter email" required onChange={(e)=> {
                  setEmailReg(e.target.value)
                }}/>
                </InputGroup>
                {!isErrorEmail ? (
                    <FormHelperText>
                      Please input email with the correct format
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
            </FormControl>
            
            <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.300' />}
                />
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    required
                    onChange={(e) => {
                      setPasswordReg(e.target.value)
                    }}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            </FormControl>
            
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <div></div>
              <Link href="/" color={'blue.500'}>Have an account ?</Link>
            </Stack>
            <Button type='submit' colorScheme={'blue'} variant={'solid'}>
              Register
            </Button>
          </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
    </>
  )
}

export default Register


