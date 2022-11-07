import React, { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { DataPayg } from '../../Helper/DataPaygProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx';
import './Payg.css';
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
  Spinner
} from '@chakra-ui/react';
import { userSchema } from '../../Validations/UserValidation';

const Payg = () => {
    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
  
    const { emailLog, setEmailLog } = useContext(EmailUser);
    const { payg, setPayg } = useContext(DataPayg);
    const [ role, setRole ] = useState("");
    const [ isLoading , SetIsLoading ] = useState(false);
    const [ isSaving, SetIsSaving ] = useState(false);

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
      
      formData.append('email', emailLog);
      formData.append('InvoiceNumber', payg.invoiceNumber);
      formData.append('InvoiceDate', payg.invoiceDate);
      formData.append('BuyerName', payg.buyerName);
      formData.append('Amount', payg.invoiceAmount);
      formData.append('Subject', payg.invoiceSubject);
      for(let i = 0; i < payg.filePayg.length; i++) {
      formData.append('file', payg.filePayg[i]);
      }

     
     
        fetch("https://empty-test-project.herokuapp.com/paygdata", {
          method: 'POST',
          body: formData,
        })
        .then((res) => {
          SetIsLoading(true);
          setTimeout(() => navigate("/paygHome"), 1000)
        })
    }

    useEffect(() => {
      userExpire();
     }, [])

   
  return (
    <div>
        <Appbar />
        <div className='wrapperBodyPayg'>
          <div className='textHeaderPayg'>
            <h1 style={{fontSize : "20px"}}>Input Data Vendor</h1>
          </div>
            <form className='formPayg' method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
            <FormControl isRequired margin={1}>
              <FormLabel>Current User</FormLabel>
              <Input type='text' value={emailLog} disabled onChange={(e) => {
                setPayg(e.target.value)
              }} />
              
              <FormLabel>Invoice Number</FormLabel>
              <Input type='text' value={payg.invoiceNumber} onChange={(e) => {
                setPayg({...payg, invoiceNumber : e.target.value})
              }} />

              <FormLabel>Invoice Date</FormLabel>
              <Input type='date' value={payg.invoiceData} onChange={(e) => {
                setPayg({...payg, invoiceDate : e.target.value})
              }}  />

              <FormLabel>Buyer Name</FormLabel>
              <Select placeholder='Select Target Name' onChange={(e) => {
                setPayg({...payg, buyerName : e.target.value})}}>
                <option value="Tovan Octa Ferdinan">Tovan Octa Ferdinan</option>
                <option value="Muhammad Ridwan">Muhammad Ridwan</option>
                <option value="Ismi Rahmawati">Ismi Rahmawati</option>
              </Select>

              <FormLabel>Amount</FormLabel>
              <NumberInput min={0}>
                <NumberInputField value={payg.invoiceAmount} onChange={(e) => {
                setPayg({...payg, invoiceAmount : e.target.value})
              }} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>*IDR</FormHelperText>

              <FormLabel>Subject</FormLabel>
              <Input type='text' value={payg.invoiceSubject} onChange={(e) => {
                setPayg({...payg, invoiceSubject : e.target.value})
              }} />

              <FormLabel>Attachments</FormLabel>
              <Input type='file' size="md" multiple onChange={(e) => {
                setPayg({...payg, filePayg : e.target.files})
              }} />
              <FormHelperText>*PDF/CSV Format</FormHelperText>
              
              {isLoading === false ?
              <div className='btnSubmitPayg'>
              <Button type="submit" colorScheme={"blue"} width={"120px"}>Save</Button>
              </div>
              :
              <div className='btnSubmitPayg'>
                 <Button
                    isLoading
                    loadingText='Saving'  
                    colorScheme='blue'
                    variant='outline'
                    width={"120px"}
                  >
                    Save
                  </Button>
              </div>
              }
             
            </FormControl>
            </form>
        </div>
    </div>
  )
}

export default Payg