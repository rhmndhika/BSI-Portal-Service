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
import { Table, thead, tbody, tr, th, td } from 'react-super-responsive-table'



const History = () => {

  Axios.defaults.withCredentials = true;
  

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ dataVendorRegistration, setDataVendorRegistration ] = useState([]);

  const [ search, setSearch ] = useState("");

  const [ isLoading, setIsLoading ] = useState(true);

  
  let navigate = useNavigate();

  
  const getVendorRegistrationData = () => {
    Axios.get("https://bsi-portal-service-production.up.railway.app/vendor/registration").then((response) => {
      setDataVendorRegistration(response.data);
      setIsLoading(false);
    });
  }

  const deleteVendorRegistrationData = (id) => {
    Axios.delete(`https://bsi-portal-service-production.up.railway.app/vendor/delete/${id}`).then(() => {
      setDataVendorRegistration(dataVendorRegistration.filter((val) => {
        return val._id != id
    }))
    })
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
    getVendorRegistrationData();
  }, [])

  return (
    <>
    {roleUser === "User" ? 
    <div style={{height : "493px"}}>
        <Appbar />
        <h1 style={{display : "flex", justifyContent : "center", marginTop : "35px", fontSize : "20px"}}>Welcome to Vendor Registration</h1>
        <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
        { isLoading === true ?
        <Flex>
          <Spinner marginTop={30} />
        </Flex>
        :
        <>
        { dataVendorRegistration.length <= 0 ? 
        null
        :
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
        }
        <table className="table table-action">
          { dataVendorRegistration.length <= 0 ?
          <Flex flexDirection="column" justifyContent="center" alignItems="center" marginTop="85px" fontWeight="bold">
            <p>NO DATA AVAILABLE</p>
            <Link to="/inputdatavendor">
              <Button mt="10px" width={"120px"} mr={3}>Input Data</Button>
            </Link>
          </Flex>
          :
          <thead>
            <tr>
              <th className="t-small"></th>
              <th className="t-medium">ID</th>
              <th className="t-medium">Email</th>
              <th className="t-medium">Company Name</th>
              <th className="t-medium">Created</th>
              <th className="t-medium">Status</th>
              <th className="t-medium">Action</th>
            </tr>
          </thead>
          }
          {dataVendorRegistration.length <= 0 ? null : dataVendorRegistration.filter(
            i=> i._id.toLowerCase().includes(search) || 
            i.email.toLowerCase().includes(search) ||
            i.CompanyName.toLowerCase().includes(search) ||
            i.createdAt.toLowerCase().includes(search) 
            ).map((i, index) => {
            return(
            <>
          <tbody>
          <tr key={index}>
                    <td key="table1"><label></label></td>
                    <td key={i._id}>{i._id}</td>
                    <td key={i._id}>{i.email}</td>
                    <td key={i._id}>{i.CompanyName}</td>
                    <td key={i._id}>{moment(i.createdAt).format("DD MMMM YYYY")}</td>
                    {i.status ? 
                        <>
                        {i.status === "Approved" ?
                          <td key={i._id} >
                            {i.status}
                          </td>
                        :
                          <td key={i._id} >
                            {i.status}
                           </td>
                        }
                        </>
                        :
                        <>
                        {!i.submitted  ? 
                        <td key={i._id} >
                          Draft
                        </td>
                        :
                        <td key={i._id} >
                          {i.submitted}
                        </td>
                        }
                        </>
                    }
                    <td>
                        <Flex flexDirection="column" justifyContent="center" alignItems="center">
                            <Link to={`/registrationhistory/${i._id}`}>
                                <Button width={100} marginTop={"5px"} marginBottom={"10px"}>Edit</Button>
                            </Link>
                                <Button width={100} marginBottom={"5px"} onClick={() => deleteVendorRegistrationData(i._id)}>Delete</Button>
                        </Flex>
                    </td>
                </tr>
          </tbody>
            </>
            )})}
        </table>
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