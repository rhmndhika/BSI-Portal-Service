import React, { useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EmailUser } from '../../Helper/EmailUserProvider'
import { DataPayg } from '../../Helper/DataPaygProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx'
import {
    Button,
    Spinner
  } from '@chakra-ui/react';


const PaygStatusAdmin = () => {
  
  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();


  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { payg, setPayg } = useContext(DataPayg);
  const { roleUser, setRoleUser } = useContext(RoleUser);

  const [ dataList, setDataList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const userExpire = () => {
      Axios.get('https://empty-test-project.herokuapp.com/login')
      .then((response)=> {
        if(response.data.loggedIn === true) {
          setEmailLog(response.data.email);
          setRoleUser(response.data.role);
        } else {
          navigate("/", {replace : true})
        }
      }, {withCredentials : true});
    };

  const getAllDataPayg = () => {
      Axios.get("https://empty-test-project.herokuapp.com/admin/paygdata").then((response) => {
          setDataList(response.data);
          setIsLoading(false);
      });   
  };

  // const deleteDataPayg = (id) => {
  //     Axios.delete(`https://empty-test-project.herokuapp.com/deletepaygdata/${id}`).then((response) => {
  //         setDataList(dataList.filter((val) => {
  //             return val._id != id
  //         }))
  //         setIsLoading(false);
  //     }); 
  // }

    useEffect(() => {
      userExpire();
      getAllDataPayg();
     }, [])
  return (
    <div style={{height : "493px"}}>
        <Appbar />
        <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
        { dataList.length <= 0 ?
        <p style={{marginTop: "150px"}}>No Data Available</p>
        :
        <table className="table table-action">
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
            {isLoading ? <Spinner marginTop={30} /> : dataList.map((i, index) => {
            return(
            <>
            <tbody>
                <tr key={index}>
                    <td><label></label></td>
                    <td>{i.InvoiceNumber}</td>
                    <td>{i.Email}</td>
                    <td>{i.BuyerName}</td>
                    {!i.status ?
                    <td className="t-status t-draft">
                        Submitted
                    </td>
                    :
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
                    }
                    <td>
                        <div style={{display: "flex", justifyContent : "center", alignItems : "center"}}>
                            <Link to={`/paygstatusdetail/${i._id}`}>
                                <Button width={100} >Edit</Button>
                            </Link>
                                {/* <Button width={100} marginLeft={5}  onClick={() => {
                                    deleteDataPayg(i._id)
                                }}>Delete</Button> */}
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

export default PaygStatusAdmin