import React, { useState, useContext, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx';
import {
  Input,
  Button,
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
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import '../PayG/Payg.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../OutsourcingPortal/Home.css'



const OutsourcingHomeAdmin = () => {
  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ search, setSearch ] = useState("");
  const [ isLoading , SetIsLoading ] = useState(false);

  const [ dataOutsourcing, setDataOutsourcing ] = useState([]);

  const initialFocusRef = React.useRef();

  


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
    Axios.delete(`https://empty-test-project.herokuapp.com/outsourcing/delete/${id}`).then((response) => {
      setDataOutsourcing(dataOutsourcing.filter((val) => {
        return val._id != id
      }))
  });     
  }

  const getAllOutsourcingData = () => {
    Axios.get("https://empty-test-project.herokuapp.com/outsourcing/all").then((response) => {
      setDataOutsourcing(response.data);
    })
  }

  useEffect(() => {

    async function userExpire2 () {
      const request = await  Axios.get('https://empty-test-project.herokuapp.com/login')
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
    getAllOutsourcingData()
   }, [])

  return (
    <>
     <div>
        <ToastContainer />
        <Appbar />
        <h1 style={{display : "flex", justifyContent : "center", marginTop : "35px", fontSize : "20px"}}>Welcome to Outsourcing Portal</h1>
        <div style={{display : "flex", justifyContent : "center", marginTop : "35px", flexDirection : "column"}}>
          <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
          </div>
          {dataOutsourcing.length ? 
          <>
           <Flex className='flexTable'>
              <Flex marginTop="-15px" justifyContent="center" alignItems="center">
                <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                />
                    <Input className='inputPortal' type="text" placeholder='Search...' outline="black" onChange={(e) => setSearch(e.target.value)} />
                </InputGroup>
              </Flex>
             
            </Flex> 
          <TableContainer marginTop={"10px"}>
            <Table variant='simple'>
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
          {dataOutsourcing.filter(i => 
          i.Email.toLowerCase().includes(search) ||
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
                  {/* <Td key="Test8">
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
                  <Td key="Test4">None</Td>
                  :
                  <Td key="Tes5">{i.status}</Td>
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
          <div style={{display : "flex", justifyContent : "center", alignItems : "center", marginTop : "50px", fontWeight : "bold"}}>
            <p>NO DATA AVAILABLE</p>
          </div>
          }
        </div>
    </div>
    </>
  )
}

export default OutsourcingHomeAdmin