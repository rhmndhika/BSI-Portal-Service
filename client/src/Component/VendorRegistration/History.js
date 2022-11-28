import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import { useNavigate, Link } from 'react-router-dom';
import Appbar from '../Appbar/Appbar.tsx';
import {
  Button,
  Spinner,
  Flex,
  Input
} from '@chakra-ui/react';
import VendorHistoryAdmin from '../Admin/VendorHistoryAdmin';
import moment from 'moment';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';



const History = () => {

  Axios.defaults.withCredentials = true;
  

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ dataVendorRegistration, setDataVendorRegistration ] = useState([]);

  const [ search, setSearch ] = useState("");

  const [ isLoading, setIsLoading ] = useState(true);
  
  let navigate = useNavigate();

  // const userExpire = () => {
  //   Axios.get("https://empty-test-project.herokuapp.com/login")
  //   .then((response)=> {
  //     if(response.data.loggedIn === true) {
  //       setEmailLog(response.data.email);
  //       setRoleUser(response.data.role);
  //     } else {
  //       navigate("/", {replace : true})
  //     }
  //   }, {withCredentials : true});
  // };

  const getVendorRegistrationData = () => {
    Axios.get("https://empty-test-project.herokuapp.com/vendor/registration").then((response) => {
      setDataVendorRegistration(response.data);
      setIsLoading(false);
    });
  }

  const deleteVendorRegistrationData = (id) => {
    Axios.delete(`https://empty-test-project.herokuapp.com/vendor/delete/${id}`).then(() => {
      alert("Deleted");
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
    getVendorRegistrationData();
  }, [])

  return (
    <>
    {roleUser === "User" ? 
    <div style={{height : "493px"}}>
        <Appbar />
        <h1 style={{display : "flex", justifyContent : "center", marginTop : "35px", fontSize : "20px"}}>Welcome to Vendor Registration</h1>
        <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
        { dataVendorRegistration.length <= 0 ?
        <Flex flexDirection="column" justifyContent="center" alignItems="center" marginTop="85px" fontWeight="bold">
          <p>NO DATA AVAILABLE</p>
          <Link to="/inputdatavendor">
            <Button mt="10px" width={"120px"} mr={3}>Input Data</Button>
          </Link>
        </Flex>
        :
        <>
        <Flex flexDirection="column" marginTop="10px">
          <Flex justifyContent="center" alignItems="center" marginBottom="20px">
            <Link to="/inputdatavendor">
              <Button>Input Data</Button>
            </Link>
          </Flex>
          <Flex>
            <Input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
          </Flex>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th >Email</Th>
              <Th >Company Name</Th>
              <Th >Created</Th>
              <Th >Status</Th>
              <Th >Action</Th>
            </Tr>
          </Thead>
          {isLoading ? <Spinner marginTop={30} /> : dataVendorRegistration.filter(
            i=> i._id.toLowerCase().includes(search) || 
            i.email.toLowerCase().includes(search) ||
            i.CompanyName.toLowerCase().includes(search) ||
            i.createdAt.toLowerCase().includes(search) 
            ).map((i, index) => {
            return(
            <>
          <Tbody>
          <Tr key={index}>
                    <Td key="table2">{i._id}</Td>
                    <Td key="table3">{i.email}</Td>
                    <Td key="table3">{i.CompanyName}</Td>
                    <Td key="table4">{moment(i.createdAt).format("DD MMMM YYYY")}</Td>
                    {i.status ? 
                        <>
                        {i.status === "Approved" ?
                          <Td key="table6" >
                            {i.status}
                          </Td>
                        :
                          <Td key="table7" >
                            {i.status}
                           </Td>
                        }
                        </>
                        :
                        <>
                        {!i.submitted  ? 
                        <Td key="table8" >
                          Draft
                        </Td>
                        :
                        <Td key="table9" >
                          {i.submitted}
                        </Td>
                        }
                        </>
                    }
                    <Td>
                        <Flex flexDirection="column" justifyContent="center" alignItems="center">
                            <Link to={`/registrationhistory/${i._id}`}>
                                <Button width={100} marginTop={"5px"} marginBottom={"10px"}>Edit</Button>
                            </Link>
                                <Button width={100} marginBottom={"5px"} onClick={() => deleteVendorRegistrationData(i._id)}>Delete</Button>
                        </Flex>
                    </Td>
                </Tr>
          </Tbody>
            </>
            )})}
        </Table>
        </>
        }
        </div>
    </div>
    :
    <VendorHistoryAdmin />
    }
    </>
  )
}

export default History