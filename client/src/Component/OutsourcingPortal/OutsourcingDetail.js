import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import { OutsourcingPortal } from '../../Helper/OutsourcingPortalProvider';
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
    Textarea,
    Flex,
    Text
  } from '@chakra-ui/react'
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Markup } from 'interweave';

const OutsourcingDetail = () => {
    
    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
    const {id} = useParams();

    const { emailLog, setEmailLog } = useContext(EmailUser);
    const { roleUser, setRoleUser } = useContext(RoleUser);
    const { outsourcingPortal, setOutsourcingPortal } = useContext(OutsourcingPortal);
    const [ dataOutsourcingID, setDataOutsourcingID ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isSaving, setIsSaving ] = useState(false);
    const [ isSavingProgress, setIsSavingProgress ] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { 
      isOpen: isOpenProgressModal, 
      onOpen: onOpenProgressModal, 
      onClose: onCloseProgressModal 
    } = useDisclosure()

    
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    // const userExpire = () => {
    //     Axios.get('https://empty-test-project.herokuapp.com/login')
    //     .then((response)=> {
    //       if(response.data.loggedIn === true) {
    //         setEmailLog(response.data.email);
    //         setRoleUser(response.data.role);
    //       } else {
    //         navigate("/", {replace : true})
    //       }
    //     }, {withCredentials : true});
    //   };

      const updateDataOutsourcing = async (id, Name, IDLink, Supplier, User1, User2, RoleQuotation) => {

        Axios.put("https://empty-test-project.herokuapp.com/updateoutsourcing" , {
          Name : outsourcingPortal.newName ? outsourcingPortal.newName : Name ,
          IDLink :  outsourcingPortal.newIDLink ? outsourcingPortal.newIDLink : IDLink ,
          Supplier : outsourcingPortal.newSupplier ? outsourcingPortal.newSupplier : Supplier ,
          User1 : outsourcingPortal.newUser1 ? outsourcingPortal.newUser1 : User1 ,
          User2 : outsourcingPortal.newUser2 ? outsourcingPortal.newUser2 : User2 ,
          RoleQuotation : outsourcingPortal.newRoleQuotation ? outsourcingPortal.newRoleQuotation : RoleQuotation ,
          id  : id
        }).then(() => {
          setIsSaving(true);
          setTimeout(() => window.location.reload(false), 1200);
        })
      }

      const updateMessageOutsourcing = async (id, Message) => {
        await Axios.put("https://empty-test-project.herokuapp.com/updateoutsourcingmessage", {
          message : outsourcingPortal.newMessage ? outsourcingPortal.newMessage : Message,
          id : id
        }).then(() => {
          setIsSavingProgress(true);
          setTimeout(() => window.location.reload(false), 1200);
        })
      }

      const updateStatusOutsourcing = (id, e) => {
        Axios.put("https://empty-test-project.herokuapp.com/updateoutsourcingmessage", {
          status : e.target.value,
          id : id
        }).then(() => {
          setTimeout(() => window.location.reload(false), 1000);
        })
      }
      
      function convertToPlain(html){

        // Create a new div element
        var tempDivElement = document.createElement("div");
        
        // Set the HTML content with the given value
        tempDivElement.innerHTML = html;
        
        // Retrieve the text property of the element 
        return tempDivElement.textContent || tempDivElement.innerText || "";
      }      

      useEffect(() => {

        async function userExpire2 () {
          const request = await  Axios.get('https://empty-test-project.herokuapp.com/login')
          .then((response)=> {
            if(response.data.loggedIn === true) {
              setEmailLog(response.data.email);
              setRoleUser(response.data.role)
            } else {
              navigate("/", {replace : true})
            }
          }, {withCredentials : true});
          return request;
        }
        userExpire2();
       }, [emailLog])

    useEffect(() => {
        const cancelToken = Axios.CancelToken.source();
  
        Axios.get(`https://empty-test-project.herokuapp.com/outsourcing/${id}`, {
          cancelToken : cancelToken.token,
        }).then((response) => {
          setDataOutsourcingID(response.data);
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
      
  return (
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
            <FormLabel>New Name</FormLabel>
            <Input type="text" value={outsourcingPortal.newName ? outsourcingPortal.newName : dataOutsourcingID.Name } 
            onChange={(e) => {
              setOutsourcingPortal({...outsourcingPortal, newName : e.target.value})
            }}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>New ID Link</FormLabel>
            <Input type="text" value={outsourcingPortal.newIDLink ? outsourcingPortal.newIDLink : dataOutsourcingID.IDLink } 
            onChange={(e) => {
              setOutsourcingPortal({...outsourcingPortal, newIDLink : e.target.value})
            }}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>New Supplier</FormLabel>
            <Input type="text" value={outsourcingPortal.newSupplier ? outsourcingPortal.newSupplier : dataOutsourcingID.Supplier } 
            onChange={(e) => {
              setOutsourcingPortal({...outsourcingPortal, newSupplier : e.target.value})
            }}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>New User 1</FormLabel>
            <Input type="text" value={outsourcingPortal.newUser1 ? outsourcingPortal.newUser1 : dataOutsourcingID.User1 } 
            onChange={(e) => {
              setOutsourcingPortal({...outsourcingPortal, newUser1 : e.target.value})
            }}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>New User 2</FormLabel>
            <Input type="text" value={outsourcingPortal.newUser2 ? outsourcingPortal.newUser2 : dataOutsourcingID.User2 } 
            onChange={(e) => {
              setOutsourcingPortal({...outsourcingPortal, newUser2 : e.target.value})
            }}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>New Role Quotation</FormLabel>
            <Input type="text" value={outsourcingPortal.newRoleQuotation ? outsourcingPortal.newRoleQuotation : dataOutsourcingID.RoleQuotation } 
            onChange={(e) => {
              setOutsourcingPortal({...outsourcingPortal, newRoleQuotation : e.target.value})
            }}/>
          </FormControl>

        </ModalBody>
        <ModalFooter>
          {isSaving === false ? 
          <Button width={"100px"} colorScheme='blue' mr={3} 
          onClick={() => {updateDataOutsourcing(
            dataOutsourcingID._id, dataOutsourcingID.Name, dataOutsourcingID.IDLink, dataOutsourcingID.Supplier, dataOutsourcingID.User1,
            dataOutsourcingID.User2, dataOutsourcingID.RoleQuotation)
          }}
          >
          Save
          </Button>
          :
          <Button
          isLoading
          loadingText='Saving'
          colorScheme='blue'
          variant='outline'
          width={"100px"}
          mr={3}
          marginLeft={"1px"}
          >
          Saving
          </Button>
          }
         <Button width={"100px"} onClick={onClose}>Cancel</Button>
      </ModalFooter>
      </ModalContent>            
      </Modal>
      <Modal closeOnOverlayClick={false} isOpen={isOpenProgressModal} onClose={onCloseProgressModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Write your progress here</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
           <Textarea placeholder='Here is a sample placeholder' value={outsourcingPortal.newMessage ? outsourcingPortal.newMessage : dataOutsourcingID.Message} onChange={(e) => {
            setOutsourcingPortal({...outsourcingPortal, newMessage : e.target.value})
           }}  />
            <Text fontSize='sm' marginTop="5px"><i>Please write in list format</i></Text>
          </ModalBody>

          <ModalFooter>
            {isSavingProgress === false ?
            <Button type='submit' colorScheme='blue' mr={3} onClick={() => {updateMessageOutsourcing(
              dataOutsourcingID._id, dataOutsourcingID.Message)
            }}>
              Save
            </Button>
            :
            <Button
            isLoading
            loadingText='Saving'
            colorScheme='blue'
            variant='outline'
            width={"100px"}
            mr={3}
            marginLeft={"1px"}
            >
            Saving
            </Button>
            }
            <Button onClick={onCloseProgressModal} mr={3}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    <Appbar />
    <Flex 
      justifyContent="center"
      marginTop="30px"
    >
    { roleUser === "Admin" 
      ? null
      : <>
          { dataOutsourcingID.status === "Approved" || dataOutsourcingID.status === "Rejected"
             ?  null
             :   <Button width={"140px"} onClick={onOpen}>Edit Data</Button>
          }
          </>
    }    

    { roleUser === "Admin" 
      ? null
      : <>
          { dataOutsourcingID.status === "Approved" || dataOutsourcingID.status === "Rejected"
            ?  null
            :  <Button width={"140px"} onClick={onOpenProgressModal} marginLeft={"30px"}>Update Progress</Button>
          }
        </>
     }  

     
      
    </Flex>
    {isLoading ?
        <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", marginTop : "20px"}}>
          <Spinner />
        </div>
        :
        <div style={{display : "flex", flexDirection : "column", marginTop : "20px", marginLeft : "30px"}}>
          <div>
          <p>ID               : {dataOutsourcingID._id}</p>
          <p>Email            : {dataOutsourcingID.Email}</p>
          <p>Name             : {dataOutsourcingID.Name}</p>
          <p>ID Link          : {dataOutsourcingID.IDLink}</p>
          <p>Supplier         : {dataOutsourcingID.Supplier}</p>
          <p>User-1           : {dataOutsourcingID.User1}</p>
          <p>User-2           : {dataOutsourcingID.User2}</p>
          <p>Role Quotation   : {dataOutsourcingID.RoleQuotation}</p>
          <p className='textMessage'>Attachments      : {dataOutsourcingID.OutsourcingAttachments}</p>
          <p>Created          : {moment(dataOutsourcingID.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p>Updated          : {moment(dataOutsourcingID.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p>Progress         : {dataOutsourcingID.Message}</p>
          <p>TEST : {dataOutsourcingID.Status}</p>
          </div>
        </div>
      }

          {!dataOutsourcingID.status  ?
              <>
              {roleUser === "Admin" ? 
              <div style={{display : "flex", flexDirection : "row", justifyContent : "center", alignItems : "center", marginTop : "30px"}}>
                <Button width={100} name="status" value="Approved" onClick={(e) => {
                  updateStatusOutsourcing(dataOutsourcingID._id, e)
                }}>Approve</Button>

                <Button width={100} marginLeft={30} name="status" value="Rejected" onClick={(e) => {
                  updateStatusOutsourcing(dataOutsourcingID._id, e)
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
  )
}

export default OutsourcingDetail