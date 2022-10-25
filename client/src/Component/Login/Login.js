import React, {useState, useContext} from 'react';
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
    Spinner,
    useColorMode,
    useColorModeValue,
    Box
} from '@chakra-ui/react';
import { LockIcon, EmailIcon } from '@chakra-ui/icons';
import Log from '../../Images/log.svg';
import './Login.css';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { useNavigate } from 'react-router-dom';

/* thrid party */
import Axios from 'axios';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons';

const Login = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();
  
  const { colorMode, toggleColorMode } = useColorMode()
  const [show, setShow] = React.useState(false)
  const { emailLog, setEmailLog } = useContext(EmailUser)
  const [ passwordLog, setPasswordLog  ] = useState("")
  const [ usernameLog, setUsernameLog ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)

  const [ errMessage, setErrMessage ] = useState("")

  const handleClick = () => setShow(!show)

  const isErrorEmail = emailLog === '' || emailLog === null
  const isErrorUsername = usernameLog === ''

  const login =  (e) => {
    e.preventDefault()
    Axios.post("https://empty-test-project.herokuapp.com/login" , {
      username : usernameLog,
      email: emailLog, 
      password: passwordLog
    }).then((response)=> {
      if (response.data.result.email) {
        setEmailLog(response.data.result.email);  
        alert("Succes");
        setTimeout(() => navigate("/landingpage", {replace : true}), 1000);
      } 
    }).catch((error) => {
      if (error.response.status === 400) {
        alert(error.response.data.message)
        setIsLoading(false)
      } else if (error.response.status === 404) {
        alert(error.response.data.message)
        setIsLoading(false)
      } else if (error.response.status === 406) {
        alert(error.response.data.message)
        setIsLoading(false)
      }
    })
    setIsLoading(true)
  };

  return (
    <Box  bg={useColorModeValue('white', 'gray.800')}
    color={useColorModeValue('gray.600', 'white')}>

    <div className='wrapperLogin'>
      <div class="contain">
      <div class="forms-container">
        <div class="signin-signup">
          <form className="sign-in-form">
            <div className='textCompany'>
              <h1>BSI PORTAL SERVICE</h1>
              {errMessage}
            </div>
            <h2 class="title">Sign in</h2>

            <FormControl isInvalid={isErrorUsername}>
                <FormLabel>Username</FormLabel>
                <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<EmailIcon color='gray.300' />}
                />
                <Input className='inputEmail' placeholder="Enter Username" type='text' onChange={(e)=> {
                  setUsernameLog(e.target.value)
                }}/>
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
                <Input className='inputEmail' placeholder="Enter Email" type='email' onChange={(e)=> {
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
           { isLoading === false ?
               <input type="submit" value="Login" class="btn solid" onClick={login} />
               :
               <Spinner className='btnLoading' />
           }
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <a href='/register'>
            <button class="btn transparent" id="sign-up-btn">
              Sign up
            </button>
            </a>
          </div>
          <img src={Log}class="image" alt="" />
        </div>
      </div>
    </div>
    </div>
    </Box>
  )
}

export default Login