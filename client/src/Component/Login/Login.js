import React, { useState, useContext } from 'react';
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
    useColorMode,
    useColorModeValue,
    Box,
    Checkbox,
    Flex,
    Heading,
    Link,
    Stack,
    Image,
} from '@chakra-ui/react';
import { LockIcon, EmailIcon } from '@chakra-ui/icons';
import './Login.css';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();
  
  const { colorMode, toggleColorMode } = useColorMode();
  const [show, setShow] = React.useState(false);
  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ passwordLog, setPasswordLog  ] = useState("");
  const [ usernameLog, setUsernameLog ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const handleClick = () => setShow(!show);

  const isErrorEmail = emailLog === '' || emailLog === null
  

  const showToastSucces = () => {
    toast.success('Succes!', {
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

  const login = async (e) => {
    e.preventDefault();

    Axios.post("https://empty-test-project.herokuapp.com/login" , {
      username : usernameLog,
      email: emailLog, 
      password: passwordLog
    }).then((response)=> {
      if (response.data.result) {
        setEmailLog(response.data.email);  
        setRoleUser(response.data.role);
        showToastSucces();
        setTimeout(() => navigate("/landingpage", {replace : true}), 2000);
      } 
    }).catch((error) => {

      const showToastError = () => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      
      if (error.response.status === 400) {
        showToastError();
        setTimeout(() => setIsLoading(false), 2000);
      } else if (error.response.status === 404) {
        showToastError();
        setTimeout(() => setIsLoading(false), 2000);
      } else if (error.response.status === 406) {
        showToastError();
        setTimeout(() => setIsLoading(false), 2000);
      } 
    })
    setIsLoading(true)
  };

  return (
    <>
    <ToastContainer />
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <form onSubmit={login}>
          <FormControl isInvalid={isErrorEmail}>
          <FormLabel>Email</FormLabel>
          <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<EmailIcon color='gray.300' />}
          />
          <Input required className='inputEmail' placeholder="Enter Email" type='email' onChange={(e)=> {
            setEmailLog(e.target.value)
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
                  className='inputPassword'
                  onChange={(e) => {
                    setPasswordLog(e.target.value)
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
              <Checkbox>Remember me</Checkbox>
              <Link href='/register' color={'blue.500'}>Dont have an account ?</Link>
            </Stack>
            {isLoading === false ?
              <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                Sign in
              </Button>
              :
              <Button 
                isLoading
                loadingText='Signin in'
                colorScheme='blue'
                variant='outline'
              >
                Sign in
              </Button>
            }
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

export default Login