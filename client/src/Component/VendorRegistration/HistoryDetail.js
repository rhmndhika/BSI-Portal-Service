import React, { useState, useEffect, useContext, useRef } from 'react';
import Axios from 'axios';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { VendorRegistration } from '../../Helper/VendorRegistrationProvider';
import Appbar from '../Appbar/Appbar.tsx';
import moment from 'moment';
import emailjs from '@emailjs/browser';
import jsPDF from "jspdf";
import { 
  Flex,
  Button, 
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  FormHelperText
} from '@chakra-ui/react';
import './HistoryDetail.css';
import PTBSI from '../../Images/LogoPTBSI.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HistoryDetail = () => {
  
  Axios.defaults.withCredentials = true;
  

  let navigate = useNavigate();
  
  const { id } = useParams();
  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const { vendorRegistration, setVendorRegistration } = useContext(VendorRegistration);
  const [ vendorRegistrationDataID, setVendorRegistrationDataID ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isSubmitting, setIsSubmitting ] = useState(true);

  const { 
    isOpen: isOpenSubmitModal, 
    onOpen: onOpenSubmitModal, 
    onClose: onCloseSubmitModal 
  } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_uf8ralj', 'template_jhnmlkr', form.current, 'DCCW1cqbNXXvZktbW')
      .then((result) => {
        setTimeout(()=> navigate("/home"), 2000);
      }, (error) => {
        console.log(error.text);
      });
  };


  const pdfRef = useRef(null);
  const handleDownload = () => {
    const content = pdfRef.current;
    const doc = new jsPDF("p", "px" , "b1");
      doc.html(content,  {
      callback: function (doc) {
      doc.save('Document.pdf');
      }
    });
  };

  const showToastUpdate = () => {
    toast.success('Data Updated!', {
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

  const showToastSubmit = () => {
    toast.success('Data Submitted!', {
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

  const showToastStatus = () => {
    toast.success('Status Updated!', {
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
  //   Axios.get("https://bsi-portal-service-production.up.railway.app/login")
  //   .then((response)=> {
  //     if(response.data.loggedIn === true) {
  //       setEmailLog(response.data.email);
  //     } else {
  //       navigate("/", {replace : true})
  //     }
  //   }, {withCredentials : true});
  // };

  const updatevendorRegistration = (id, CompanyName, Address, PhoneNumber, PresidentName, AccountManagerEmail, AccountManagerPhone,
    PICEmail, PICPhone, EstablishedDate, EmployeeNumber, NumberOfCustomer, Attachments, SKAny, SKValid, NPWPAny, NPWPValid,
    SIUPAny, SIUPValid, TDPAny, TDPValid, DomisiliAny, DomisiliValid, SPKPAny, SPKPValid, AuditAny, AuditValid, TaxAny, TaxValid, BankAny, BankValid ) => {
    Axios.put("https://bsi-portal-service-production.up.railway.app/vendor/update", {
      cName           : vendorRegistration.newCName? vendorRegistration.newCName : CompanyName , 
      Address         : vendorRegistration.newAddress? vendorRegistration.newAddress : Address,
      phoneNumber     : vendorRegistration.newPhoneNumber? vendorRegistration.newPhoneNumber : PhoneNumber,
      presidentName   : vendorRegistration.newPresidentName? vendorRegistration.newPresidentName : PresidentName,
      managerEmail    : vendorRegistration.newManagerEmail? vendorRegistration.newManagerEmail : AccountManagerEmail , 
      managerPhone    : vendorRegistration.newManagerPhone? vendorRegistration.newManagerPhone : AccountManagerPhone , 
      picEmail        : vendorRegistration.newPICEmail? vendorRegistration.newPICEmail : PICEmail , 
      picPhone        : vendorRegistration.newPICPhoneNumber? vendorRegistration.newPICPhoneNumber : PICPhone , 
      date            : vendorRegistration.newDate? vendorRegistration.newDate : EstablishedDate , 
      employeeNumber  : vendorRegistration.newEmployeeNumber? vendorRegistration.newEmployeeNumber : EmployeeNumber , 
      numberOfCustomer: vendorRegistration.newNumberOfCustomer? vendorRegistration.newNumberOfCustomer : NumberOfCustomer ,
      myFile          : vendorRegistration.newMyFile? vendorRegistration.newMyFile : Attachments ,
      skAny           : vendorRegistration.newSKAny? vendorRegistration.newSKAny : SKAny,
      skValid         : vendorRegistration.newSKValid? vendorRegistration.newSKValid : SKValid,
      npwpAny         : vendorRegistration.newNPWPAny? vendorRegistration.newNPWPAny : NPWPAny,
      npwpValid       : vendorRegistration.newNPWPValid? vendorRegistration.newNPWPValid : NPWPValid,
      siupAny         : vendorRegistration.newSIUPAny? vendorRegistration.newSIUPAny : SIUPAny,
      siupValid       : vendorRegistration.newSIUPValid? vendorRegistration.newSIUPValid : SIUPValid,
      tdpAny          : vendorRegistration.newTDPAny? vendorRegistration.newTDPAny : TDPAny,
      tdpValid        : vendorRegistration.newTDPValid? vendorRegistration.newTDPValid : TDPValid,
      domisiliAny     : vendorRegistration.newDomisiliAny? vendorRegistration.newDomisiliAny : DomisiliAny,
      domisiliValid   : vendorRegistration.newDomisiliValid? vendorRegistration.newDomisiliValid : DomisiliValid,
      spkpAny         : vendorRegistration.newSPKPAny? vendorRegistration.newSPKPAny : SPKPAny,
      spkpValid       : vendorRegistration.newSPKPValid? vendorRegistration.newSPKPValid: SPKPValid,
      auditAny        : vendorRegistration.newAuditAny? vendorRegistration.newAuditAny : AuditAny,
      auditValid      : vendorRegistration.newAuditValid? vendorRegistration.newAuditValid : AuditValid,
      taxAny          : vendorRegistration.newTaxAny? vendorRegistration.newTaxAny : TaxAny,
      taxValid        : vendorRegistration.newTaxValid? vendorRegistration.newTaxValid: TaxValid,
      bankAny         : vendorRegistration.newBankAny? vendorRegistration.newBankAny : BankAny,
      bankValid       : vendorRegistration.newBankValid? vendorRegistration.newBankValid : BankValid,
      id : id
    }).then((response)=> {
      setTimeout(() => window.location.reload(false), 1000);
      showToastUpdate();
    });
  };

  const updateStatus = (id, Status, e) => {
    Axios.put("https://bsi-portal-service-production.up.railway.app/vendor/update/status" , {
      status: e.target.value, 
      id : id
    }).then(() => {
      fetch("https://bsi-portal-service-production.up.railway.app/sendNotification", {
        method: "POST",
        headers : {
        "Content-type" : "application/json",
        }
      });
      setTimeout(() => window.location.reload(false), 1000);
      showToastStatus();
    });
  };

  const updateSubmitted = (id, e) => {
    Axios.put("https://bsi-portal-service-production.up.railway.app/vendor/update/submitted" , {
      submitted: e.target.name, 
      id : id
    }).then((response)=> {
      showToastSubmit();
      setIsSubmitting(false);
      setTimeout(() => window.location.reload(false), 1000);
    });
  };

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

    const cancelToken = Axios.CancelToken.source();
  
    Axios.get(`https://bsi-portal-service-production.up.railway.app/vendor/registration/${id}`, {
      cancelToken : cancelToken.token,
    }).then((response) => {
        setVendorRegistrationDataID(response.data);
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
    <ToastContainer />
    {isLoading === false ? 
    <div>
    <Appbar />
    <div className='btn-container'>
    <Button style={{backgroundColor : " #DFF6FF", color : "black", width: "120px"}} variant="contained" onClick={handleDownload}>Download</Button>
    
    { roleUser === "Admin" 
      ? null
      : <>
        { vendorRegistrationDataID.submitted === "Submitted" && vendorRegistrationDataID.status != ""
          ? null
          : <Button style={{marginLeft : "20px", backgroundColor : " #DFF6FF", color : "black", width: "120px"}} variant="contained" onClick={onOpen}>Edit</Button>
        }
        </>
    }

    { roleUser === "Admin" 
      ? null
      : <>
        { vendorRegistrationDataID.submitted === "Submitted"
          ? null
          : <Button style={{marginLeft : "20px", backgroundColor : " #DFF6FF", color : "black", width: "120px"}} variant="contained" onClick={onOpenSubmitModal}>Submit</Button>
        }
        </>
    }

    </div>

    <div className='wrapperWrapper'>
      <div ref={pdfRef}>
        <div className='headerMonitoring'>
          <div className='header-item header-item-1'>
            {/* <img src={PTBSI} alt="logo bsi" /> */}
          </div>
          <div className='header-item header-item-2'>
          {/* <img src={PTBSI} alt="logo bsi" /> */}
          </div>
        </div>

      

      <div className='flexbox-container'>
        <div className='flexbox-item flexbox-item-1'>
          
          <div className="leftDiv">
            <h2 className='textSupplier'>Supplier Data</h2>
              <div className='textData'>
                <p>Company Name : {vendorRegistrationDataID.CompanyName}</p>
                <p>Address: {vendorRegistrationDataID.Address}</p>
                <p>Phone Number : {vendorRegistrationDataID.PhoneNumber}</p>
                <p>President Director (Name) : {vendorRegistrationDataID.PresidentName}</p>
                <p>Account Manager (Email / Phone) : {vendorRegistrationDataID.ManagerEmail} / {vendorRegistrationDataID.ManagerPhone}</p> 
                <p>Escalation PIC (Email / Phone) : {vendorRegistrationDataID.PICEmail} / {vendorRegistrationDataID.PICPhone}</p> 
                <p>Established Date :   {moment(vendorRegistrationDataID.EstablishedDate).format("DD MMMM YYYY")} </p>
                <p>Main Business : {vendorRegistrationDataID.ChoiceBusiness}</p>
                <p>Employee Number : {vendorRegistrationDataID.EmployeeNumber}</p>
                <p>Number of Customer : {vendorRegistrationDataID.NumberOfCustomer}</p>
                <p>Attachments : {vendorRegistrationDataID.Attachments}</p>
              </div>
          </div>     
        </div>
        
        <div className='flexbox-item flexbox-item-2'>
          <h2 className='textSupplier'>Document </h2>
          <div className="header_fixed">
            <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Any / Not</th>        
                <th>Valid / Invalid</th>  
              </tr>
            </thead>
            <tbody className="tableBody">
              <tr>
                <td>SK Menhum & Akta Notaris</td>       
                <td>{vendorRegistrationDataID.SKAny}</td>   
                <td>{vendorRegistrationDataID.SKValid}</td>
              </tr>
              <tr>
                <td>NPWP</td>       
                <td>{vendorRegistrationDataID.NPWPAny}</td>   
                <td>{vendorRegistrationDataID.NPWPValid}</td>
              </tr>
              <tr>
                <td>SIUP</td>       
                <td>{vendorRegistrationDataID.SIUPAny}</td>   
                <td>{vendorRegistrationDataID.SIUPValid}</td>
              </tr> 
              <tr>
                <td>TDP</td>       
                <td>{vendorRegistrationDataID.TDPAny}</td>   
                <td>{vendorRegistrationDataID.TDPValid}</td>
              </tr> 
              <tr>
                <td>Surat Domisili</td>       
                <td>{vendorRegistrationDataID.DomisiliAny}</td>   
                <td>{vendorRegistrationDataID.DomisiliValid}</td>
              </tr> 
              <tr>
                <td>SPKP</td>       
                <td>{vendorRegistrationDataID.SPKPAny}</td>   
                <td>{vendorRegistrationDataID.SPKPValid}</td>
              </tr> 
              <tr>
                <td>Latest Financial Report ( Audit )</td>       
                <td>{vendorRegistrationDataID.AuditAny}</td>   
                <td>{vendorRegistrationDataID.AuditValid}</td>
              </tr> 
              <tr>
                <td>Tax Report</td>       
                <td>{vendorRegistrationDataID.TaxAny}</td>   
                <td>{vendorRegistrationDataID.TaxValid}</td>
              </tr> 
              <tr>
                <td>Bank Account</td>       
                <td>{vendorRegistrationDataID.BankAny}</td>   
                <td>{vendorRegistrationDataID.BankValid}</td>
              </tr>    
            </tbody>
          </table>
        </div>
      </div>
      </div>

      <div>
      <div className='flexbox-container-2'>
        <div className='item-2 flexbox-item-3'>
          <h2 className='textSupplier'>Statement Condition</h2>
          <p style={{textAlign : "justify"}}>
            I who undersign below is the authorized party of the company to perform legal action to represent the company on conducting its business.
            Our company shall not give any gift in any other form to the parties represents PT. Berlian Sistem Informasi on conducting business transaction with our company.
            If on the future it is found that we breach our obligation as stated on point 2 of this letter, we are ready to accept any legal consequences that will be coming.  
          </p>
          <p style={{textAlign : "right", marginBottom : "20px"}}>
            Sign And Stamp
          </p>
          <div>
          {vendorRegistrationDataID.status == "Approved" ? 
            <div className='textStatusApprove'>
             <p>{vendorRegistrationDataID.status}</p>
            </div>
            :
            <>
            {vendorRegistrationDataID.status == "Rejected" ?
            <div className='textStatusReject'>
             <p>{vendorRegistrationDataID.status}</p>
            </div>
            :
            <div></div>
            }
            </>
            }
            <div style={{textAlign : "right"}}>
              <p>{vendorRegistrationDataID.PresidentName}</p>
              <p>President Director</p>
            </div>
          </div>
        </div>
      </div>
      </div>   
    </div>
      
   
      

      {roleUser === "Admin" ? 
      <>
        { vendorRegistrationDataID.status === "" || vendorRegistrationDataID.status == null  && vendorRegistrationDataID.submitted === "Submitted" ?
           <div className='btnStatus'>
            <div className='btnStatus-item-1'>
              <Button style={{backgroundColor : "#367E18", color : "white", width : "100px"}} name="status" value="Approved" variant='contained'  onClick={(e)=> {
                updateStatus(vendorRegistrationDataID._id, vendorRegistrationDataID.Status, e)}}>
                Approve 
              </Button>
            </div>
            <div>
              <Button style={{backgroundColor : "#FF1E00", color : "white", width : "100px"}} name="status" value="Rejected" variant='contained' onClick={(e)=> {
                updateStatus(vendorRegistrationDataID._id, vendorRegistrationDataID.Status, e)}}>
                Reject
              </Button>
            </div>
           </div>
           :
           null
        }
      </>
      :
      null
      }
    </div>

      <>
      <div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
          <ModalOverlay />
            <ModalContent marginLeft="6px">
              <ModalHeader>Edit Supplier Data</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
              <Flex flexDirection="column" justifyContent="center" alignItems="center">
             
              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>CompanyName</FormLabel>
                <Input className="inputVendor" type='text' name="CompanyName" value={vendorRegistration.newCName? vendorRegistration.newCName : vendorRegistrationDataID.CompanyName} onChange={(event) => {
                  setVendorRegistration({...vendorRegistration, newCName : event.target.value})
                }} />
              </FormControl>
              </Flex>

              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input className="inputVendor" type='text' name="Address" value={vendorRegistration.newAddress?  vendorRegistration.newAddress : vendorRegistrationDataID.Address} onChange={(event) => {
                  setVendorRegistration({...vendorRegistration, newAddress : event.target.value})
                }} />
              </FormControl>
              </Flex>

              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input className="inputVendor" type='tel' name="Phone" value={vendorRegistration.newPhoneNumber?  vendorRegistration.newPhoneNumber: vendorRegistrationDataID.PhoneNumber} onChange={(event) => {
                  setVendorRegistration({...vendorRegistration, newPhoneNumber : event.target.value})
                }} />
              </FormControl>
              </Flex>

              <Flex marginTop="20px">
              <FormControl isRequired>
                <FormLabel>President Director Name</FormLabel>
                <Input className="inputVendor" type='text' name="PresidentName" value={vendorRegistration.newPresidentName?  vendorRegistration.newPresidentName : vendorRegistrationDataID.PresidentName} onChange={(event) => {
                  setVendorRegistration({...vendorRegistration, newPresidentName : event.target.value})
                }} />
              </FormControl>
              </Flex>

              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>Manager Email</FormLabel>
                <Input className="inputVendor" type='email' name="ManagerEmail" value={vendorRegistration.newManagerEmail?  vendorRegistration.newManagerEmail : vendorRegistrationDataID.ManagerEmail} onChange={(event) => {
                  setVendorRegistration({...vendorRegistration, newManagerEmail : event.target.value})
                }} />
              </FormControl>
              </Flex>

              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>Manager Phone</FormLabel>
                <Input className="inputVendor" type='tel' name="ManagerPhone" value={vendorRegistration.newManagerPhone?  vendorRegistration.newManagerPhone : vendorRegistrationDataID.ManagerPhone} onChange={(event) => {
                  setVendorRegistration({...vendorRegistration, newManagerPhone : event.target.value})
                }} />
              </FormControl>
              </Flex>

              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>PIC Email</FormLabel>
                <Input className="inputVendor" type='email' name="PICEmail"  value={vendorRegistration.newPICEmail?  vendorRegistration.newPICEmail : vendorRegistrationDataID.PICEmail} onChange={(event) => {
                  setVendorRegistration({...vendorRegistration, newPICEmail : event.target.value})
                }} />
              </FormControl>
              </Flex>

              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>PIC Phone</FormLabel>
                <Input className="inputVendor" type='tel' name="PICPhone" value={vendorRegistration.newPICPhoneNumber?  vendorRegistration.newPICPhone : vendorRegistrationDataID.PICPhone} onChange={(event) => {
                  setVendorRegistration({...vendorRegistration, newPICPhoneNumber : event.target.value})
                }} />
              </FormControl>
              </Flex>

              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>Established Date</FormLabel>
                <Input className="inputVendor" type='date' name="EstablishedDate" value={vendorRegistration.newDate?  vendorRegistration.newDate : vendorRegistrationDataID.EstablishedDate} onChange={(event) => {
                  setVendorRegistration({...vendorRegistration, newDate : event.target.value})
                }} />
              </FormControl>
              </Flex>

              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>Employee Number</FormLabel>
                <Select className="inputVendor" name='EmployeeNumber' onChange={(e) => {
                  setVendorRegistration({...vendorRegistration, newEmployeeNumber : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Employee Number...</option>
                    <option value="1-50">1-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-250">101-250</option>
                    <option value="251-500">251-500</option>
                    <option value="500+">500+</option>
                </Select>
              </FormControl>
              </Flex>

              <Flex marginTop="15px">
              <FormControl isRequired>
                <FormLabel>Number of Customer</FormLabel>
                <Input className="inputVendor" type='text' name="NumberOfCustomer" value={vendorRegistration.newNumberOfCustomer? vendorRegistration.newNumberOfCustomer : vendorRegistrationDataID.NumberOfCustomer} onChange={(e) => {
                  setVendorRegistration({...vendorRegistration, newNumberOfCustomer : e.target.value})}} />
              </FormControl>
              </Flex>

              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>SK Menhum</FormLabel>
                  <Select className="inputVendor" onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newSKAny : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Any / Not</option>
                    <option value="Any">Any</option>
                    <option value="Not">Not</option>
                  </Select>

                  <Select className="inputVendor" marginTop="15px" onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newSKValid : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Valid / Invalid</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>NPWP</FormLabel>
                  <Select className="inputVendor" name='NPWPAny'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newNPWPAny : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Any / Not</option>
                    <option value="Any">Any</option>
                    <option value="Not">Not</option>
                  </Select>

                  <Select className="inputVendor" marginTop="15px" name='NPWPValid'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newNPWPValid : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Valid / Invalid</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>SIUP</FormLabel>
                  <Select className="inputVendor" name='SIUPAny'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newSIUPAny : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Any / Not</option>
                    <option value="Any">Any</option>
                    <option value="Not">Not</option>
                  </Select>

                  <Select className="inputVendor" marginTop="15px" name='SIUPAny'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newSIUPValid : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Valid / Invalid</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>TDP</FormLabel>
                  <Select className="inputVendor" name='TDPAny'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newTDPAny : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Any / Not</option>
                    <option value="Any">Any</option>
                    <option value="Not">Not</option>
                  </Select>

                  <Select className="inputVendor" marginTop="15px" name='TDPValid'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newTDPValid : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Valid / Invalid</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>Surat Domisili</FormLabel>
                  <Select className="inputVendor" name='DomisiliAny'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newDomisiliAny : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Any / Not</option>
                    <option value="Any">Any</option>
                    <option value="Not">Not</option>
                  </Select>

                  <Select className="inputVendor" marginTop="15px" name='DomisiliValid'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newDomisiliValid : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Valid / Invalid</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>SPKP</FormLabel>
                  <Select className="inputVendor" name='SPKPAny'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newSPKPAny : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Any / Not</option>
                    <option value="Any">Any</option>
                    <option value="Not">Not</option>
                  </Select>

                  <Select className="inputVendor" marginTop="15px" name='SPKPValid'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newSPKPValid : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Valid / Invalid</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>Latest Financial Report</FormLabel>
                  <Select className="inputVendor" name='AuditAny'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newAuditAny : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Any / Not</option>
                    <option value="Any">Any</option>
                    <option value="Not">Not</option>
                  </Select>

                  <Select className="inputVendor" marginTop="15px" name='AuditValid'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newAuditValid : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Valid / Invalid</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>Tax Report</FormLabel>
                  <Select className="inputVendor" name='TaxAny'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newTaxAny : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Any / Not</option>
                    <option value="Any">Any</option>
                    <option value="Not">Not</option>
                  </Select>

                  <Select className="inputVendor" marginTop="15px" name='TaxValid'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newTaxValid : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Valid / Invalid</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>Bank Account</FormLabel>
                  <Select className="inputVendor" name='BankAny'  onChange={(e) => {
                    setVendorRegistrationDataID({...vendorRegistration, newBankAny : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Any / Not</option>
                    <option value="Any">Any</option>
                    <option value="Not">Not</option>
                  </Select>

                  <Select className="inputVendor" marginTop="15px" name='BankValid'  onChange={(e) => {
                    setVendorRegistration({...vendorRegistration, newBankValid : e.target.value})}}>
                    <option value="" disabled selected hidden>Choose Valid / Invalid</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                  </Select>
                </FormControl>
              </Flex>
              </Flex>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={()=> {updatevendorRegistration(
                vendorRegistrationDataID._id, vendorRegistrationDataID.CompanyName, vendorRegistrationDataID.Address, vendorRegistrationDataID.PhoneNumber, vendorRegistrationDataID.PresidentName, vendorRegistrationDataID.ManagerEmail, 
                vendorRegistrationDataID.ManagerPhone, vendorRegistrationDataID.PICEmail, vendorRegistrationDataID.PICPhone, vendorRegistrationDataID.EstablishedDate,  vendorRegistrationDataID.EmployeeNumber, vendorRegistrationDataID.NumberOfCustomer, vendorRegistrationDataID.Attachments,
                vendorRegistrationDataID.SKAny, vendorRegistrationDataID.SKValid, vendorRegistrationDataID.NPWPAny, vendorRegistrationDataID.NPWPValid, vendorRegistrationDataID.SIUPAny, vendorRegistrationDataID.SIUPValid, vendorRegistrationDataID.TDPAny, vendorRegistrationDataID.TDPValid, vendorRegistrationDataID.DomisiliAny, vendorRegistrationDataID.DomisiliValid,
                vendorRegistrationDataID.SPKPAny, vendorRegistrationDataID.SPKPValid, vendorRegistrationDataID.AuditAny, vendorRegistrationDataID.AuditValid, vendorRegistrationDataID.TaxAny, vendorRegistrationDataID.TaxValid, vendorRegistrationDataID.BankAny, vendorRegistrationDataID.BankValid
                )}}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
      </Modal>
      </div>
  
           <Modal
            isOpen={isOpenSubmitModal}
            onClose={onCloseSubmitModal}
            >
            <ModalOverlay />
            <form ref={form} onSubmit={sendEmail}>
            <ModalContent>
              <ModalHeader>Send an Email</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
              <Flex marginTop="20px">
                <FormControl isRequired>
                  <FormLabel>To Email</FormLabel>
                  <Input type="email" name="user_email" />
                    
                  <FormLabel>Message</FormLabel>
                  <Textarea name="message" />
                  <FormHelperText><i>Please write your credentials here</i></FormHelperText>
                </FormControl>
              </Flex>
              </ModalBody>

              <ModalFooter>
                { isSubmitting === true ? 
                <Button type="submit" width="130px" name="Submitted" value="Submit" colorScheme='blue' mr={3} onClick={(e) => {
                  updateSubmitted(vendorRegistrationDataID._id, e)
                }}>
                Submit
                </Button>
                :
                <Button
                  isLoading
                  loadingText='Submitting'
                  colorScheme='blue'
                  variant='outline'
                  width={"130px"}
                  mr={3}
                  marginLeft={"1px"}
                  >
                  Saving
                </Button>
                }
                <Button width="130px" onClick={onCloseSubmitModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </form>
          </Modal>
          </>
  </div>
  :
  <Flex justifyContent="center" alignItems="center" marginTop="30px">
    <Spinner />
  </Flex>
  }
  </>
  )
}

export default HistoryDetail