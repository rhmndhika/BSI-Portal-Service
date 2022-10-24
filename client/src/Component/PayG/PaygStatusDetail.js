import React, { useState, useContext, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EmailUser } from '../../Helper/EmailUserProvider'
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
    Input
  } from '@chakra-ui/react'
import './PaygStatus.css'
import moment from 'moment';

const PaygStatusDetail = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();
  const {id} = useParams();

  const { emailLog, setEmailLog } = useContext(EmailUser);
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
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>First name</FormLabel>
                  <Input ref={initialRef} placeholder='First name' />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Last name</FormLabel>
                  <Input placeholder='Last name' />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
              <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
                <p>Email           : {dataListID.Email}</p>
                <p>Invoice Number  : {dataListID.InvoiceNumber}</p>
                <p>Invoice Date    : {moment(dataListID.InvoiceDate).format("DD MMMM YYYY")}</p>
                <p>Invoice Amount  : {dataListID.Amount}</p>
                <p>Invoice Subject : {dataListID.Subject}</p>
                <p>Buyer Name      : {dataListID.BuyerName}</p>
                <p>Attachments     : {dataListID.PaygAttachments}</p>
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