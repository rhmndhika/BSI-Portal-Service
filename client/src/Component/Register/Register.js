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

const Register = () => {

const [input, setInput] = useState('')
const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)

  const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === ''

  return (
    <div className='wrapperLogin'>
      <div class="contain">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="/home" class="sign-in-form">
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
                <Input type='email' value={input} onChange={handleInputChange}/>
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
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            </FormControl>
           
            <input type="submit" value="Sign up" class="btn solid" />
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