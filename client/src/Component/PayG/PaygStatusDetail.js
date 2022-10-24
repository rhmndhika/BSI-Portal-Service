import React, { useState, useContext, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EmailUser } from '../../Helper/EmailUserProvider'
import { DataPayg } from '../../Helper/DataPaygProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx'
import {
    Button,
    Spinner,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormHelperText
  } from '@chakra-ui/react'
import './PaygStatus.css'
import moment from 'moment';

const PaygStatusDetail = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();
  const {id} = useParams();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { payg, setPayg } = useContext(DataPayg);
  const [ role, setRole ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

 const [ dataListID, setDataListID ] = useState([]);

  const userExpire = () => {
      Axios.get('https://empty-test-project.herokuapp.com/login')
      .then((response)=> {
        if(response.data.loggedIn === true) {
          setEmailLog(response.data.email.email);
          setRole(response.data.role);
        } else {
          navigate("/")
        }
      }, {withCredentials : true});
    };
  
    const fetchDataPayg = () => {
      Axios.get(`https://empty-test-project.herokuapp.com/paygdata/${id}`).then((response) => {
        setDataListID(response.data);
        setIsLoading(false);
      })
    }
   
    const updateDataPayg = async (id, InvoiceNumber, InvoiceDate, BuyerName, Amount, Subject, PaygAttachments) => {
      // Axios.put("https://empty-test-project.herokuapp.com/updatedatapayg", {

      // })

      const formData = new FormData();
      
      formData.append('InvoiceNumber', payg.newInvoiceNumber ? payg.newInvoiceNumber : InvoiceNumber);
      formData.append('InvoiceDate', payg.newInvoiceDate ? payg.newInvoiceDate : InvoiceDate);
      formData.append('BuyerName', payg.newBuyerName ? payg.newBuyerName : BuyerName);
      formData.append('Amount', payg.newInvoiceAmount ? payg.newInvoiceAmount : Amount);
      formData.append('Subject', payg.newInvoiceSubject ? payg.newInvoiceSubject : Subject);
      
      formData.append('id', id);
     
      fetch("https://empty-test-project.herokuapp.com/updatepaygdata", {
        method: 'PUT',
        body: formData,
      })
      .then((res) => {
        
      })
    }

    useEffect(() => {
      userExpire();
      fetchDataPayg();
     }, [])


  return (
    <div>
      <Appbar />
      <Button onClick={onOpen}>Open Modal</Button>
        <div style={{display : "flex", justifyContent: "center", alignItems: "center"}}>
          {isLoading ? 
          <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
            <Spinner/>
          </div> 
          : 
          <>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Data</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                
                <FormControl mt={4}>
                  <FormLabel>New Invoice Number</FormLabel>
                  <Input type="text" value={payg.newInvoiceNumber ? payg.newInvoiceNumber : dataListID.InvoiceNumber} onChange={(e) => {
                  setPayg({...payg, newInvoiceNumber : e.target.value})
                  }} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>New Date</FormLabel>
                  <Input type="date" value={payg.newInvoiceDate ? payg.newInvoiceDate : dataListID.InvoiceDate} onChange={(e) => {
                  setPayg({...payg, newInvoiceDate : e.target.value})
                  }}   />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>New Buyer Name</FormLabel>
                  <Select placeholder='Select Target Name' onChange={(e) => {
                  setPayg({...payg, newBuyerName : e.target.value})
                  }} >
                    <option value="Tovan Octa Ferdinan">Tovan Octa Ferdinan</option>
                    <option value="Muhammad Ridwan">Muhammad Ridwan</option>
                    <option value="Ismi Rahmawati">Ismi Rahmawati</option>
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>New Invoice Amount</FormLabel>
                    <NumberInput min={0}>
                     <NumberInputField value={payg.newInvoiceAmount? payg.newInvoiceAmount : dataListID.Amount} onChange={(e) => {
                      setPayg({...payg, newInvoiceAmount : e.target.value})
                      }}  />
                     <NumberInputStepper>
                       <NumberIncrementStepper />
                       <NumberDecrementStepper />
                    </NumberInputStepper>
                   </NumberInput>
                  <FormHelperText>*IDR</FormHelperText>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>New Invoice Subject</FormLabel>
                  <Input type="text" value={payg.newInvoiceSubject ? payg.newInvoiceSubject : dataListID.Subject} onChange={(e) => {
                      setPayg({...payg, newInvoiceSubject : e.target.value})
                      }} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>New Attachments</FormLabel>
                  <Input type="file" size="md" value={payg.newFilePayg? payg.newFilePayg : dataListID.PaygAttachments} multiple onChange={(e) => {
                  setPayg({...payg, newFilePayg : e.target.files})
                  }} />
                </FormControl>
                
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => {updateDataPayg(
                 dataListID._id, dataListID.InvoiceNumber, dataListID.InvoiceDate, dataListID.Amount, dataListID.Subject, dataListID.BuyerName, dataListID.PaygAttachments)
                }}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
              <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
                <p>ID              : {dataListID._id}</p>
                <p>Email           : {dataListID.Email}</p>
                <p>Invoice Number  : {dataListID.InvoiceNumber}</p>
                <p>Invoice Date    : {moment(dataListID.InvoiceDate).format("DD MMMM YYYY")}</p>
                <p>Invoice Amount  : {dataListID.Amount}</p>
                <p>Invoice Subject : {dataListID.Subject}</p>
                <p>Buyer Name      : {dataListID.BuyerName}</p>
                {/* <p>Attachments     : {dataListID.PaygAttachments}</p> */}
                <p>Created At      : {moment(dataListID.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p>Updated At      : {moment(dataListID.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
          </>
              }
        </div>
    </div>
  )
}

export default PaygStatusDetail