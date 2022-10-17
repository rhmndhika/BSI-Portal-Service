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
    Button
} from '@chakra-ui/react';
import { LockIcon, EmailIcon } from '@chakra-ui/icons';
import Log from '../../Images/log.svg';
import './Login.css';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { useNavigate } from 'react-router-dom';

/* thrid party */
import Axios from 'axios';


const Login = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();
  
  const [show, setShow] = React.useState(false)
  const { emailLog, setEmailLog } = useContext(EmailUser)
  const [ passwordLog, setPasswordLog  ] = useState("")

  const handleClick = () => setShow(!show)

  const isError = emailLog === ''

  const login =  (e) => {
    e.preventDefault()
    Axios.post("https://empty-test-project.herokuapp.com/login" , {
      email: emailLog, 
      password: passwordLog
    }).then((response)=> {
      if (response.data.result.email) {
        setEmailLog(response.data.result.email);  
        alert("Succes")
        setTimeout(() => navigate("/home"), 1000);
        console.log(response)
      } 
    });
  };

  console.log(emailLog)

  return (
    <div className='wrapperLogin'>
      <div class="contain">
      <div class="forms-container">
        <div class="signin-signup">
          <form class="sign-in-form">
            <div className='textCompany'>
              <h1>BSI PORTAL SERVICE</h1>
            </div>
            <h2 class="title">Sign in</h2>
           
            <FormControl isInvalid={isError}>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<EmailIcon color='gray.300' />}
                />
                <Input className='inputEmail' type='email' onChange={(e)=> {
                  setEmailLog(e.target.value)
                }}/>
                </InputGroup>
                {!isError ? (
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
           
            <input type="submit" value="Login" class="btn solid" onClick={login} />
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
            <a href='/'>
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
  )
}

export default Login