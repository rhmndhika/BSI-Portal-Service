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
    Button
} from '@chakra-ui/react';
import { LockIcon, EmailIcon } from '@chakra-ui/icons';
import Log from '../../Images/log.svg';
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


  const handleClick = () => setShow(!show)

  const isErrorUsername = usernameReg === ''
  const isErrorEmail = emailReg === ''


  // 🦄
  const showToastError = () => {
    toast.error(' Please fill out the form!', {
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
    e.preventDefault()

    if (usernameReg.length > 0 && emailReg.length > 0 && passwordReg.length > 0) {
      Axios.post("https://empty-test-project.herokuapp.com/register" , {
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
          showToastWarning();
        }
      })
      showToastSucces();
      setTimeout(() => navigate("/"), 2000);
    } else {
      showToastError();
    }
  }

  
  return (
    <>
    <ToastContainer />
    <div className='wrapperLogin'>
      <div className="contain">
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form">
            <div className='textCompany'>
              <h1>BSI PORTAL SERVICE</h1>
            </div>
            <h2 className="title">Sign Up</h2>

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
           
            <input type="submit" value="Sign up" className="btn solid" onClick={register} />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Already have an account ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <a href='/'>
            <button className="btn transparent" id="sign-up-btn">
              Login
            </button>
            </a>
          </div>
          <img src={Log} className="image" alt="" />
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Register