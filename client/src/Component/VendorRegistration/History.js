import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import { useNavigate, Link } from 'react-router-dom';
import Appbar from '../Appbar/Appbar.tsx';
import {
  Button,
  useDisclosure,
  Spinner,
  Flex,
  Input
} from '@chakra-ui/react';
import VendorHistoryAdmin from '../Admin/VendorHistoryAdmin';
import moment from 'moment';
import './History.css';
import '../PayG/PaygStatus.css'

const History = () => {

  Axios.defaults.withCredentials = true;
  

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ dataVendorRegistration, setDataVendorRegistration ] = useState([]);

  const [ search, setSearch ] = useState("");

  const [ isLoading, setIsLoading ] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

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
            <Button mt="10px" width={"120px"} colorScheme='teal' mr={3}>Input Data</Button>
          </Link>
        </Flex>
        :
        <>
        <Flex flexDirection="column" marginTop="10px">
          <Flex justifyContent="center" alignItems="center" marginBottom="10px">
            <Link to="/inputdatavendor">
              <Button>Input Data</Button>
            </Link>
          </Flex>
          <Flex>
            <Input type="text" placeholder='Search By ID' onChange={(e) => setSearch(e.target.value)} />
          </Flex>
        </Flex>
        <table className="table table-action">
            <thead>
                <tr>
                <th className="t-small"></th>
                <th className="t-medium">ID</th>
                <th className="t-medium">Email</th>
                <th className="t-medium">Company Name</th>
                <th className="t-medium">Created</th>
                <th className="t-medium">Updated</th>
                <th className="t-medium">Status</th>
                <th className="t-medium">Action</th>
                </tr>
            </thead>
            {isLoading ? <Spinner marginTop={30} /> : dataVendorRegistration.filter(i=> i._id.toLowerCase().includes(search)).map((i, index) => {
            return(
            <>
            <tbody>
                <tr key={index}>
                    <td key="table1"><label></label></td>
                    <td key="table2">{i._id}</td>
                    <td key="table3">{i.email}</td>
                    <td key="table3">{i.CompanyName}</td>
                    <td key="table4">{moment(i.createdAt).format("DD MMMM YYYY, h:mm:ss a")}</td>
                    <td key="table5">{moment(i.updatedAt).format("DD MMMM YYYY, h:mm:ss a")}</td>
                    {i.status ? 
                        <>
                          {i.status === "Approved" ?
                            <td key="table6" className="t-status t-active">
                                {i.status}
                            </td>
                          :
                            <td key="table7" className="t-status t-inactive">
                                {i.status}
                            </td>
                          }
                        </>
                        :
                        <>
                        {!i.submitted  ? 
                            <td key="table8" className="t-status t-draft2">
                            Draft
                            </td>
                        :
                        <td key="table9" className="t-status t-draft">
                            {i.submitted}
                        </td>
                        }
                        </>
                    }
                    <td>
                        <div style={{display: "flex", justifyContent : "center", alignItems : "center"}}>
                            <Link to={`/registrationhistory/${i._id}`}>
                                <Button width={100} >Edit</Button>
                            </Link>
                                <Button width={100} marginLeft={5} onClick={() => deleteVendorRegistrationData(i._id)}>Delete</Button>
                        </div>
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