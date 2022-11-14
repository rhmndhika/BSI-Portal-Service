import React, { useState, useContext, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { OutsourcingPortal } from '../../Helper/OutsourcingPortalProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Badge,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import '../PayG/Payg.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { outsourcingPortal, setOutsourcingPortal } = useContext(OutsourcingPortal);
  const [ role, setRole ] = useState("");
  const [ isLoading , SetIsLoading ] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isUploading, setIsUploading ] = useState(false);
  const btnRef = React.useRef();

  const [ dataOutsourcing, setDataOutsourcing ] = useState([]);

  const initialFocusRef = React.useRef()

  const showToastWarning = () => {
    toast.warning('You have no data!', {
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

  // const userExpire = () => {
  //   Axios.get('https://empty-test-project.herokuapp.com/login')
  //   .then((response)=> {
  //     if(response.data.loggedIn === true) {
  //       setEmailLog(response.data.email);
  //       setRole(response.data.role);
  //     } else {
  //       navigate("/", {replace : true})
  //     }
  //   }, {withCredentials : true});
  // };

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
    formData.append('Message', outsourcingPortal.message);
   
    await fetch("https://empty-test-project.herokuapp.com/outsourcing", {
      method: 'POST',
      body: formData,
  })
      .then((res) => {
        SetIsLoading(true);
        setTimeout(() => window.location.reload(false), 1000)
      })
  }

  const getOutsourcingData = () => {
     Axios.get("https://empty-test-project.herokuapp.com/outsourcing").then((response) => {
      setDataOutsourcing(response.data);

      if (response.data.length <= 0 ) {
        showToastWarning();
      }
    })
  }

  const fetchSharepoint = () => {
    const payload = {
      method: 'GET',
      headers: { 
        "Accept"       : "application/json; odata=verbose",
        "Content-Type" : "application/json;odata=verbose" 
      },
      auth : {
        username : 'bsi90699@bsi.co.id',
        password : 'Password.99'
      },
      credentials: 'same-origin'    // or credentials: 'include'  
    }
  
  fetch("https://365bsi.sharepoint.com/sites/ProcPortal/_api/web/lists/getbytitle('TestInvoiceGateway')/items", payload)
      .then(response => {
        console.log(response);
      }
  )
  }

  const deleteDataOutsourcing = (id) => {
    Axios.delete(`https://empty-test-project.herokuapp.com/deleteoutsourcing/${id}`).then((response) => {
      setDataOutsourcing(dataOutsourcing.filter((val) => {
        return val._id != id
      }))
  });     
  }

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center' marginTop="8px">
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  useEffect(() => {

    async function userExpire2 () {
      const request = await  Axios.get('https://empty-test-project.herokuapp.com/login')
      .then((response)=> {
        if(response.data.loggedIn === true) {
          setEmailLog(response.data.email);
          setRole(response.data.role);
        } else {
          navigate("/", {replace : true})
        }
      }, {withCredentials : true});
      return request;
    }
    userExpire2();
   }, [emailLog])

  return (
    <div>
        <ToastContainer />
        <Appbar />
        <h1 style={{display : "flex", justifyContent : "center", marginTop : "35px"}}>Welcome to Outsourcing Portal</h1>
        <div style={{display : "flex", justifyContent : "center", marginTop : "35px", flexDirection : "column"}}>
          <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
          <Button width={"100px"} ref={btnRef} colorScheme='teal' onClick={onOpen}>
            Upload CV
          </Button>
          <Button width={"100px"} marginLeft={30} onClick={getOutsourcingData} variant="solid" >
            Show Data
          </Button>
          <Button width={"100px"} marginLeft={30} onClick={fetchSharepoint} variant="solid" >
            Sharepoint
          </Button>
          </div>
          {dataOutsourcing.length ? 
          <TableContainer marginTop={"30px"}>
            <Table variant='simple' colorScheme='teal'>
              <Thead>
              <Tr>
                <Th>Email</Th>
                <Th>Name</Th>
                <Th>ID Link</Th>
                <Th>Supplier</Th>
                <Th>User 1</Th>
                <Th>User 2</Th>
                <Th>Role Quotation</Th>
                <Th>Progress</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
          {dataOutsourcing.map((i, index) => {
            return(
              <Tbody key={index}>
                <Tr>
                  <Td key="Test1">{i.Email}</Td>
                  <Td key="Test2">{i.Name}</Td>
                  <Td key="Test3">{i.IDLink}</Td>
                  <Td key="Test4">{i.Supplier}</Td>
                  <Td key="Test5">{i.User1}</Td>
                  <Td key="Test6">{i.User2}</Td>
                  <Td key="Test7">{i.RoleQuotation}</Td>
                  <Td key="Test8">
                  <Popover
                    initialFocusRef={initialFocusRef}
                    placement='bottom'
                    closeOnBlur={false}
                    trigger="hover"
                    >
                    <PopoverTrigger>
                    <Badge cursor={"pointer"}>Progress</Badge>
                    </PopoverTrigger>
                    <PopoverContent color='white' bg='blue.800' borderColor='blue.800' width={"280px"} height={"300px"}>
                      <PopoverHeader pt={4} fontWeight='bold' border='0'>
                        Current Progress :
                      </PopoverHeader>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                       {i.Message}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  </Td>
                  <Td>
                  <HStack>
                  <Link to={`/outsourcingdetail/${i._id}`}>
                    <Button width={"100px"}>
                      Edit
                    </Button>
                  </Link>
                    <Button width={"100px"} onClick={() => {
                      deleteDataOutsourcing(i._id)
                    }}>
                      Delete 
                    </Button>
                  </HStack>
                  </Td>
                </Tr>
              </Tbody>           
          )
          })}
          </Table>
          </TableContainer>
          :
          <div style={{display : "flex", justifyContent : "center", alignItems : "center", marginTop : "50px", fontWeight : "bold"}}>
            <p>NO DATA AVAILABLE</p>
          </div>
          }
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
              <div className='btnSubmitPayg'>
                {isLoading === false ?
                <Button width={"120px"} colorScheme={"teal"} type="submit" mr={3}>Upload</Button>
                :
                <Button
                  isLoading
                  loadingText='Uploading'
                  colorScheme='teal'
                  variant='outline'
                  spinnerPlacement='start'
                  width={"120px"}
                  mr={3}
                >
                  Uploading
                </Button>
                }
                <Button width={"120px"} variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
            </form>
        </Drawer>
        </div>
    </div>
  )
}

export default Home