import React, {useState} from 'react';
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
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const [input, setInput] = useState('')
  const [show, setShow] = React.useState(false)

  const [ emailReg, setEmailReg ] = useState("")
  const [ passwordReg, setPasswordReg ] = useState("")

  const handleClick = () => setShow(!show)

  const handleInputChange = (e) => setInput(e.target.value)

  const isError = emailReg === ''

  const register = (e) => {
    e.preventDefault()

    if (emailReg.length > 0 && passwordReg.length > 0) {
      Axios.post("https://bsivendor-registration.herokuapp.com/register" , {
        email: emailReg, 
        password: passwordReg
      })
      alert("Login")
      setTimeout(() => navigate("/login"), 1000);
    } else {
      alert("Warning")
    }
  }

  return (
    <div className='wrapperLogin'>
      <div class="contain">
      <div class="forms-container">
        <div class="signin-signup">
          <form class="sign-in-form">
            <div className='textCompany'>
              <h1>BSI PORTAL SERVICE</h1>
            </div>
            <h2 class="title">Sign Up</h2>
           
            <FormControl isInvalid={isError}>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<EmailIcon color='gray.300' />}
                />
                <Input type='email' required onChange={(e)=> {
                  setEmailReg(e.target.value)
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
           
            <input type="submit" value="Sign up" class="btn solid" onClick={register} />
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>Already have an account ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <a href='/login'>
            <button class="btn transparent" id="sign-up-btn">
              Login
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

export default Register