import React, { useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { DataPayg } from '../../Helper/DataPaygProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx';
import {
    Button,
    Spinner,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text
  } from '@chakra-ui/react';
import './PaygStatus.css'
import PaygStatusAdmin from '../Admin/PaygStatusAdmin';
import { PhoneIcon, SearchIcon } from '@chakra-ui/icons';

const PaygStatus = () => {

    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
   
    const { emailLog, setEmailLog } = useContext(EmailUser);
    const { payg, setPayg } = useContext(DataPayg);
    const { roleUser, setRoleUser } = useContext(RoleUser);
    const [ dataList, setDataList ] = useState([]);
    const [ search, setSearch ] = useState("");
    const [ isLoading, setIsLoading ] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
  
    const getDataPayg = () => {
        Axios.get("https://bsi-portal-service-production.up.railway.app/payg/email").then((response) => {
            setDataList(response.data);
            setIsLoading(false);
        });   
    };

    const deleteDataPayg = (id) => {
        Axios.delete(`https://bsi-portal-service-production.up.railway.app/payg/delete/${id}`).then((response) => {
            setDataList(dataList.filter((val) => {
                return val._id != id
            }))
            setIsLoading(false);
        }); 
    }

   

    useEffect(() => {
        getDataPayg();
    }, [])
  
  return (
    <>
    {roleUser === "User" ? 
    <div style={{height : "493px"}}>
        <Appbar />
        <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
            { isLoading === false ? 
            <>
            { dataList.length <= 0 ?
            null
            :
            <Flex className='flexTable'>
                <Flex marginTop="-15px" justifyContent="flex-end" float="right">
                    <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300' />}
                    />
                        <Input type="text" placeholder='Search By Invoice / Buyer' outline="black" onChange={(e) => setSearch(e.target.value)} />
                    </InputGroup>
                </Flex>
            </Flex> 
            }
            <table className="table table-action">
            {dataList.length <= 0 ? 
            <Flex justifyContent="center" alignItems="center" textAlign="center">
                <Text>No Data Available</Text> 
            </Flex>
            :
            <thead>
            <tr>
            <th className="t-small"></th>
            <th className="t-medium">Invoice Number</th>
            <th className="t-medium">Email</th>
            <th className="t-medium">Buyer Name</th>
            <th className="t-medium">Status</th>
            <th className="t-medium">Action</th>
            </tr>
            </thead>
            }
            {dataList.length <= 0 ? 
            null
            : 
            dataList.filter(i => i.InvoiceNumber.toLowerCase().includes(search) || i.BuyerName.toLowerCase().includes(search))
            .map((i, index) => {
            return(
            <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent key={index}>
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
                    <td>{i.InvoiceNumber}</td>
                    <td>{i.Email}</td>
                    <td>{i.BuyerName}</td>
                    {i.status ? 
                        <>
                        {i.status === "Approved" ?
                            <td className="t-status t-active">
                                {i.status}
                            </td>
                        :
                            <td className="t-status t-inactive">
                                {i.status}
                            </td>
                        }
                        </>
                        :
                        <>
                        {!i.submitted  ? 
                            <td className="t-status t-draft2">
                            Draft
                            </td>
                        :
                        <td className="t-status t-draft">
                            {i.submitted}
                        </td>
                        }
                        </>
                    }
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
            </>
            :
            <Spinner marginTop={30} />
            }
        </div>
    </div>
    :
    <PaygStatusAdmin />
    }
    </>
    )
}

export default PaygStatus