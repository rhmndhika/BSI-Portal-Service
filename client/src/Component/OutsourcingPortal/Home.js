import React, { useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailUser } from '../../Helper/EmailUserProvider'
import { DataPayg } from '../../Helper/DataPaygProvider';
import { OutsourcingPortal } from '../../Helper/OutsourcingPortalProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
  Spinner,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import '../PayG/Payg.css';
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav'

const Home = () => {
  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();


  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { outsourcingPortal, setOutsourcingPortal } = useContext(OutsourcingPortal);
  const [ role, setRole ] = useState("");
  const [ isLoading , SetIsLoading ] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const userExpire = () => {
    Axios.get('https://empty-test-project.herokuapp.com/login')
    .then((response)=> {
      if(response.data.loggedIn === true) {
        setEmailLog(response.data.email);
        setRole(response.data.role);
      } else {
        navigate("/", {replace : true})
      }
    }, {withCredentials : true});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('Email', emailLog);
    formData.append('Name', outsourcingPortal.name);
    formData.append('IDLink', outsourcingPortal.idLink);
    formData.append('Supplier', outsourcingPortal.supplier);
    formData.append('User1', outsourcingPortal.user1);
    formData.append('User2', outsourcingPortal.user2);
    formData.append('RoleQuotation', outsourcingPortal.roleQuotation);
    for(let i = 0; i < outsourcingPortal.fileOutsourcing.length; i++) {
    formData.append('fileOutsourcing', outsourcingPortal.fileOutsourcing[i]);
    }
   
    await fetch("https://empty-test-project.herokuapp.com/outsourcing", {
      method: 'POST',
      body: formData,
  })
      .then((res) => {
        SetIsLoading(true);
        setTimeout(() => window.location.reload(false), 1000)
      })
  }

  const cancelForm = (e) => {
    e.target.reset();
  }

  useEffect(() => {
    userExpire();
   }, [])

  return (
    <div>
        <Appbar />
        <h1 style={{display : "flex", justifyContent : "center", marginTop : "35px"}}>Outsourcing Portal</h1>
        <div style={{display : "flex", justifyContent : "center", marginTop : "35px"}}>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          Open
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <form  method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Upload Your CV</DrawerHeader>

            <DrawerBody>
            <FormControl isRequired margin={1}>
              <FormLabel>Current User</FormLabel>
              <Input type='text' value={emailLog} disabled onChange={(e) => {
                setEmailLog(e.target.value)
              }} />

              <FormLabel>Attachments</FormLabel>
              <Input type='file' size="md" multiple onChange={(e) => {
                setOutsourcingPortal({...outsourcingPortal, fileOutsourcing : e.target.files})
              }} />
              <FormHelperText>*Format</FormHelperText>
              
              <FormLabel>Name (Title)</FormLabel>
              <Input type='text' value={outsourcingPortal.name} onChange={(e) => {
                setOutsourcingPortal({...outsourcingPortal, name : e.target.value})
              }} />

              <FormLabel>ID Link</FormLabel>
              <Input type='text' value={outsourcingPortal.idLink} onChange={(e) => {
                setOutsourcingPortal({...outsourcingPortal, idLink : e.target.value})
              }} />

              <FormLabel>Supplier</FormLabel>
              <Input type='text' value={outsourcingPortal.supplier} onChange={(e) => {
                setOutsourcingPortal({...outsourcingPortal, supplier : e.target.value})
              }} />

              <FormLabel>User-1</FormLabel>
              <Input type='text' value={outsourcingPortal.user1} onChange={(e) => {
                setOutsourcingPortal({...outsourcingPortal, user1 : e.target.value})
              }} />

              <FormLabel>User-2</FormLabel>
              <Input type='text' value={outsourcingPortal.user2} onChange={(e) => {
                setOutsourcingPortal({...outsourcingPortal, user2 : e.target.value})
              }} />

              <FormLabel>Role Quotation</FormLabel>
              <Input type='number' value={outsourcingPortal.roleQuotation} onChange={(e) => {
                setOutsourcingPortal({...outsourcingPortal, roleQuotation : e.target.value})
              }} />

             
              </FormControl>
            </DrawerBody>

            <DrawerFooter>
            {isLoading === false ?
              <div className='btnSubmitPayg'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button variant='outline' type="submit" mr={3}>Upload</Button>
              </div>
              :
              <div className='btnSubmitPayg'>
                <Spinner size='lg' />
              </div>
              }
              
            </DrawerFooter>
          </DrawerContent>
            </form>
        </Drawer>
              </div>
    </div>
  )
}

export default Home