import React, { useState, useContext, useEffect, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { DataPayg } from '../../Helper/DataPaygProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx';
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
    FormHelperText,
    Textarea
  } from '@chakra-ui/react'
import './PaygStatus.css'
import moment from 'moment';
import emailjs from '@emailjs/browser';
import './PaygStatusDetail.css';

const PaygStatusDetail = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const {id} = useParams();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { payg, setPayg } = useContext(DataPayg);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ isLoading, setIsLoading ] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ dataListID, setDataListID ] = useState([]);

  const { 
    isOpen: isOpenSubmitModal, 
    onOpen: onOpenSubmitModal, 
    onClose: onCloseSubmitModal 
  } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  const userExpire = () => {
      Axios.get('https://empty-test-project.herokuapp.com/login')
      .then((response)=> {
        if(response.data.loggedIn === true) {
          setEmailLog(response.data.email);
          setRoleUser(response.data.role);
        } else {
          navigate("/", {replace : true})
        }
      }, {withCredentials : true});
    };
  
    const updateDataPayg = async (id, InvoiceNumber, InvoiceDate, Amount, Subject, BuyerName, PaygAttachments) => {
  
      const formData = new FormData();
      
      formData.append('id', id);
      formData.append('InvoiceNumber', payg.newInvoiceNumber ? payg.newInvoiceNumber : InvoiceNumber);
      formData.append('InvoiceDate', payg.newInvoiceDate ? payg.newInvoiceDate : InvoiceDate);
      formData.append('Amount', payg.newInvoiceAmount ? payg.newInvoiceAmount : Amount);
      formData.append('Subject', payg.newInvoiceSubject ? payg.newInvoiceSubject : Subject);
      formData.append('BuyerName', payg.newBuyerName ? payg.newBuyerName : BuyerName);
      for(let i = 0; i < payg.newFilePayg.length; i++) {
      formData.append('file', payg.newFilePayg[i] ? payg.newFilePayg[i] : PaygAttachments);
      }
     
      await fetch("https://empty-test-project.herokuapp.com/updatepaygdata", {
        method: 'PUT',
        body: formData,
      })
      .then((res) => {
        setTimeout(() => window.location.reload(false), 1000);
      })
    }

    const form = useRef();
    const sendEmail = (e) => {
      
      e.preventDefault();
  
      emailjs.sendForm('service_i2rw35b', 'template_kbjdjat', form.current, 'H-1q8l7mJMHKzqNUS')
        .then((result) => {
        }, (error) => {
          console.log(error.text);
        });
    };

    const updateSubmitted = (id, e) => {
      Axios.put("https://empty-test-project.herokuapp.com/updateSubmitted" , {
        submitted: e.target.name, 
        id : id
      }).then((response)=> {
        setTimeout(() => window.location.reload(false), 1000);
      });
    };

    const updateStatus = (id, e) => {
      Axios.put("https://empty-test-project.herokuapp.com/updateStatus" , {
        status: e.target.value, 
        id : id
      }).then((response) => {
        setTimeout(() => window.location.reload(false), 1000);
      });
    };

    useEffect(() => {
      const cancelToken = Axios.CancelToken.source();

      Axios.get(`https://empty-test-project.herokuapp.com/paygdata/${id}`, {
        cancelToken : cancelToken.token,
      }).then((response) => {
        setDataListID(response.data);
        setIsLoading(false);
      }).catch((err) => {
        if (Axios.isCancel(err)){
          console.log("canceled");
        } else {
          console.log("not canceled")
        }
      });


      return () => {
        cancelToken.cancel();
      }   
     }, [id])

     useEffect(() => {
      userExpire();
     }, [])


  return (
    <>
    <div style={{display : "flex", flexDirection : "column"}}>
    <Appbar />
      <div style={{display : "flex", justifyContent : "center", alignItems : "center", margin : "30px"}}>
        {dataListID.submitted === "Submitted" ? 
        null
        :
        <Button width={20} onClick={onOpen}>Edit</Button>
        }
        {dataListID.submitted === "Submitted" ? 
        null
        :
        <Button width={20} onClick={onOpenSubmitModal} marginLeft={5}>Submit</Button>
        }
      </div>
        <div style={{display : "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
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
                     <Input type="number" value={payg.newInvoiceAmount? payg.newInvoiceAmount : dataListID.Amount} onChange={(e) => {
                      setPayg({...payg, newInvoiceAmount : e.target.value})
                      }}  />
                  <FormHelperText>*IDR</FormHelperText>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>New Invoice Subject</FormLabel>
                  <Input type="text" value={payg.newInvoiceSubject ? payg.newInvoiceSubject : dataListID.Subject} onChange={(e) => {
                      setPayg({...payg, newInvoiceSubject : e.target.value})
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

          {/* -------------------------------------------- */}
          
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpenSubmitModal}
            onClose={onCloseSubmitModal}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <form ref={form} onSubmit={sendEmail}>
            <ModalContent>
              <ModalHeader>Send an Email</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>To Email</FormLabel>
                  <Input type="email" name="user_email" ref={initialRef} placeholder='To Email' />
                </FormControl>

                <FormControl mt={4} isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea name="message" placeholder='Please Input Your Email and Username' defaultValue={
                  <>
                    <p>Email : {dataListID.Email}</p>
                  </>
                  }/>
                  <FormHelperText>Please make sure to fill out all the field, otherwise the message will not be sent.</FormHelperText>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" name="Submitted" value="Submit" colorScheme='blue' mr={3} onClick={(e) => {
                  updateSubmitted(dataListID._id, e)
                }}>
                  Submit
                </Button>
                <Button onClick={onCloseSubmitModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
            </form>
          </Modal>
                  <div className='texter'>
                      <p>ID              : {dataListID._id}</p>
                      <p>Email           : {dataListID.Email}</p>
                      <p>Invoice Number  : {dataListID.InvoiceNumber}</p>
                      <p>Invoice Date    : {moment(dataListID.InvoiceDate).format("DD MMMM YYYY")}</p>
                      <p>Invoice Amount  : {dataListID.Amount}</p>
                      <p>Invoice Subject : {dataListID.Subject}</p>
                      <p>Buyer Name      : {dataListID.BuyerName}</p>
                      <p>Submitted       : {dataListID.submitted}</p>
                      <p>Status          : {dataListID.status}</p>
                      <p>Created At      : {moment(dataListID.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                      <p>Updated At      : {moment(dataListID.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                      <p>Attachments     : {dataListID.PaygAttachments}</p>
                  </div>
                    
                
              {!dataListID.status  ?
              <>
              {roleUser === "Admin" ? 
              <div style={{display : "flex", flexDirection : "row", justifyContent : "center", alignItems : "center", marginTop : "30px"}}>
                <Button width={100} name="status" value="Approved" onClick={(e) => {
                  updateStatus(dataListID._id, e)
                }}>Approve</Button>

                <Button width={100} marginLeft={30} name="status" value="Rejected" onClick={(e) => {
                  updateStatus(dataListID._id, e)
                }}>Reject</Button>
              </div>
              :
              null
              }
              </>
              :
              null
              }
          </>
              }
        </div>
    </div>
    </>
  )
}

export default PaygStatusDetail