import React, { useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EmailUser } from '../../Helper/EmailUserProvider'
import { DataPayg } from '../../Helper/DataPaygProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx'
import {
    Button,
    Spinner,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure
  } from '@chakra-ui/react';
import './PaygStatus.css'

const PaygStatus = () => {

    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
  
  
    const { emailLog, setEmailLog } = useContext(EmailUser);
    const { payg, setPayg } = useContext(DataPayg);
    const [ role, setRole ] = useState("");

    const [ dataList, setDataList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
  

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

    const getDataPayg = () => {
        Axios.get("https://empty-test-project.herokuapp.com/paygdata").then((response) => {
            setDataList(response.data);
            setIsLoading(false);
        });   
    };

    const deleteDataPayg = (id) => {
        Axios.delete(`https://empty-test-project.herokuapp.com/deletepaygdata/${id}`).then((response) => {
            setDataList(dataList.filter((val) => {
                return val._id != id
            }))
            setIsLoading(false);
        }); 
    }

      useEffect(() => {
        userExpire();
        getDataPayg();
       }, [])
  
  return (
    <div>
    <Appbar />
        <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
        { dataList.length <= 0 ?
        <p style={{marginTop: "150px"}}>No Data Available</p>
        :
        <table class="table table-action">
            <thead>
                <tr>
                <th class="t-small"></th>
                <th class="t-small">ID</th>
                <th class="t-medium">Email</th>
                <th class="t-medium">Display Name</th>
                <th class="t-small">Status</th>
                <th class="t-medium">Action</th>
                </tr>
            </thead>
            {isLoading ? <Spinner marginTop={30} /> : dataList.map((i, index) => {
            return(
            <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => {
                            deleteDataPayg(i._id)
                        }} ml={3}>
                            Delete
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>   
            </AlertDialog>
            <tbody>
                <tr key={index}>
                    <td><label></label></td>
                    <td>{i._id}</td>
                    <td>{i.Email}</td>
                    <td>{i.BuyerName}</td>
                    <td class="t-status t-active">
                      Status
                    </td>
                    <td>
                        <div style={{display: "flex", justifyContent : "center", alignItems : "center"}}>
                            <Link to={`/paygstatusdetail/${i._id}`}>
                                <Button width={100} >Edit</Button>
                            </Link>
                                <Button width={100} marginLeft={5}  onClick={() => {
                                    deleteDataPayg(i._id)
                                }}>Delete</Button>
                        </div>
                    </td>
                </tr>
            </tbody>
            </>
           )})}
        </table>
        }
        </div>
    </div>
    )
}

export default PaygStatus