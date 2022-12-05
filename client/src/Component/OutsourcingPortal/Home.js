import React, { useState, useContext, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
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
  PopoverArrow,
  PopoverCloseButton,
  Badge,
  Flex,
  InputGroup,
  InputLeftElement,
  Spinner,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import '../PayG/Payg.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'
import OutsourcingHomeAdmin from '../Admin/OutsourcingHomeAdmin';

const Home = () => {
  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { outsourcingPortal, setOutsourcingPortal } = useContext(OutsourcingPortal);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ search, setSearch ] = useState("");
  const [ isLoading , SetIsLoading ] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isFetching, setIsFetching ] = useState(true);
  const btnRef = React.useRef();

  const [ dataOutsourcing, setDataOutsourcing ] = useState([]);

  const initialFocusRef = React.useRef();

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
  //   Axios.get('https://bsi-portal-service-production.up.railway.app/login')
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
   
    await fetch("https://bsi-portal-service-production.up.railway.app/outsourcing", {
      method: 'POST',
      body: formData,
  })
      .then((res) => {
        SetIsLoading(true);
        setTimeout(() => window.location.reload(false), 1000)
      })
  }

  const getOutsourcingData = () => {
     Axios.get("https://bsi-portal-service-production.up.railway.app/outsourcing").then((response) => {
      setDataOutsourcing(response.data);
      setIsFetching(false);
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
    Axios.delete(`https://bsi-portal-service-production.up.railway.app/outsourcing/delete/${id}`).then((response) => {
      setDataOutsourcing(dataOutsourcing.filter((val) => {
        return val._id != id
      }))
  });     
  }

  useEffect(() => {

    async function userExpire2 () {
      const request = await  Axios.get('https://bsi-portal-service-production.up.railway.app/login')
      .then((response)=> {
        if(response.data.loggedIn === true) {
          setEmailLog(response.data.email);
          setRoleUser(response.data.role);
        } else {
          navigate("/", {replace : true})
        }
      }, {withCredentials : true});
      return request;
    }
    userExpire2();
   }, [emailLog])

   useEffect(() => {
    getOutsourcingData();
   }, [])

  return (
    <>
    {roleUser === "User" ? 
    <div>
        <ToastContainer />
        <Appbar />
        <h1 style={{display : "flex", justifyContent : "center", marginTop : "35px", fontSize : "20px"}}>Welcome to Outsourcing Portal</h1>
        <div style={{display : "flex", justifyContent : "center", marginTop : "35px", flexDirection : "column"}}>
          <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
          </div>
          { isFetching === false ? 
          <>
          { dataOutsourcing.length <= 0 ? 
          null
          :
           <Flex className='flexTable'>
              <Flex marginTop="-15px" justifyContent="center" alignItems="center">
                <Button width={"120px"} ref={btnRef} colorScheme='teal' mr={3} onClick={onOpen}>
                   Upload CV
                </Button>
                <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                />
                    <Input className='inputPortal' type="text" placeholder='Search...' outline="black" onChange={(e) => setSearch(e.target.value)} />
                </InputGroup>
              </Flex> 
            </Flex> 
          }
          <TableContainer marginTop={"10px"}>
            <Table variant='simple'>
            {dataOutsourcing.length <= 0 ? 
            <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", marginTop : "50px", fontWeight : "bold"}}>
              <p>NO DATA AVAILABLE</p>
              <Button width={"120px"} ref={btnRef} colorScheme='teal' mr={3} mt={"10px"} onClick={onOpen}>
                Upload CV
              </Button>
            </div>
            :
              <Thead>
              <Tr>
                <Th>Email</Th>
                <Th>Name</Th>
                <Th>ID Link</Th>
                <Th>Supplier</Th>
                <Th>Progress</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            }
          {dataOutsourcing.length <= 0 ? 
          null
          : 
          dataOutsourcing.filter(i => 
          i.Name.toLowerCase().includes(search) || 
          i.IDLink.toLowerCase().includes(search) ||
          i.Supplier.toLowerCase().includes(search) || 
          i.User1.toLowerCase().includes(search) ||
          i.User2.toLowerCase().includes(search) 
          ).map((i, index) => {
            return(
              <Tbody key={index}>
                <Tr>
                  <Td key="Test1">{i.Email}</Td>
                  <Td key="Test2">{i.Name}</Td>
                  <Td key="Test3">{i.IDLink}</Td>
                  <Td key="Test4">{i.Supplier}</Td>
                  {/* <Td key="Test6">
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
                      <div>
                       <p className='textMessage'>{i.Message}</p>
                      </div>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  </Td> */}
                  <Td>
                    <a href="/progress">
                    Progress
                    </a>
                  </Td>
                  {i.status === "" || i.status == null ?
                  <Td key="Test5">None</Td>
                  :
                  <>
                  {i.status === "Approved" ? 
                  <Td key="Test11" style={{color : "green"}}>{i.status}</Td>
                  :
                  <Td key="Test16" style={{color : "red"}}>{i.status}</Td>
                  }
                  </>
                  }
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
          </>
          :
          <Flex justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
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
    :
    <OutsourcingHomeAdmin />
    }
    </>
  )
}

export default Home