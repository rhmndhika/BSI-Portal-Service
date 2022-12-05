import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { VendorRegistration } from '../../Helper/VendorRegistrationProvider';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Appbar/Appbar.tsx';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  Select,
  Button
} from '@chakra-ui/react';
import './InputDataVendor.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputDataVendor = () => {

  Axios.defaults.withCredentials = true;
  

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const [ role, setRole ] = useState("");
  const { vendorRegistration, setVendorRegistration } = useContext(VendorRegistration);
  const [ isSubmit, setIsSubmit ] = useState(false);

  let navigate = useNavigate();


  const showToastSucces = () => {
    toast.success('Success!', {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('email', emailLog);
    formData.append('CompanyName', vendorRegistration.cName);
    formData.append('Address', vendorRegistration.Address);
    formData.append('Phone', vendorRegistration.phoneNumber);
    formData.append('PresidentName', vendorRegistration.presidentName);
    formData.append('ManagerEmail', vendorRegistration.managerEmail);
    formData.append('ManagerPhone', vendorRegistration.managerPhone);
    formData.append('PICEmail', vendorRegistration.picEmail);
    formData.append('PICPhone', vendorRegistration.picPhone);
    formData.append('EstablishedDate', vendorRegistration.date);
    formData.append('ChoiceBusiness', vendorRegistration.mainBusiness);
    formData.append('EmployeeNumber', vendorRegistration.employeeNumber);
    formData.append('NumberOfCustomer', vendorRegistration.numberOfCustomer);
    formData.append('SKAny', vendorRegistration.skAny);
    formData.append('SKValid', vendorRegistration.skValid);
    formData.append('NPWPAny', vendorRegistration.npwpAny);
    formData.append('NPWPValid', vendorRegistration.npwpValid);
    formData.append('SIUPAny', vendorRegistration.siupAny);
    formData.append('SIUPValid', vendorRegistration.siupValid);
    formData.append('TDPAny', vendorRegistration.tdpAny);
    formData.append('TDPValid', vendorRegistration.tdpValid);
    formData.append('DomisiliAny', vendorRegistration.domisiliAny);
    formData.append('DomisiliValid', vendorRegistration.domisiliValid);
    formData.append('SPKPAny', vendorRegistration.spkpAny);
    formData.append('SPKPValid', vendorRegistration.spkpValid);
    formData.append('AuditAny', vendorRegistration.auditAny);
    formData.append('AuditValid', vendorRegistration.auditValid);
    formData.append('TaxAny', vendorRegistration.taxAny);
    formData.append('TaxValid', vendorRegistration.taxValid);
    formData.append('BankAny', vendorRegistration.bankAny);
    formData.append('BankValid', vendorRegistration.bankValid);
    for(let i = 0; i < vendorRegistration.fileVendor.length; i++) {
    formData.append('fileVendorRegistration', vendorRegistration.fileVendor[i]);
    }
   
    fetch("https://bsi-portal-service-production.up.railway.app/vendor/registration", {
      method: 'POST',
      body: formData,
    }).then((res) => {
      setIsSubmit(true);
      setTimeout(() => window.location.reload(false) ,1200);
      showToastSucces();
    }).catch((err) => {
      const showToastError = () => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      showToastError();
    });
  }

  useEffect(() => {

    async function userExpire2 () {
      const request = await  Axios.get('https://bsi-portal-service-production.up.railway.app/login')
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
    <>
    <ToastContainer />
    <Appbar />
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
    <h1 style={{textAlign: "center", marginTop : "20px", fontSize : "20px"}}>Supplier Data</h1>
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <form className='formForm' method='POST' encType='multipart/form-data' action='#' onSubmit={handleSubmit}>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input className="inputVendor" type='email' value={emailLog} name='email' disabled onChange={(e) => {
            setVendorRegistration(e.target.value) }} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>CompanyName</FormLabel>
          <Input className="inputVendor" type='text' name="CompanyName" placeholder="Company Name" value={vendorRegistration.cName} onChange={(e) => {
            setVendorRegistration({...vendorRegistration, cName : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Input className="inputVendor" type='text' name="Address" value={vendorRegistration.Address} placeholder="Address"onChange={(e) => {
            setVendorRegistration({...vendorRegistration, Address : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input className="inputVendor" type='tel' name="Phone" value={vendorRegistration.phoneNumber} placeholder="0xxxxxx"onChange={(e) => {
            setVendorRegistration({...vendorRegistration, phoneNumber : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="20px">
        <FormControl isRequired>
          <FormLabel>President Director Name</FormLabel>
          <Input className="inputVendor" type='text' name="PresidentName" value={vendorRegistration.presidentName} placeholder="President Name"onChange={(e) => {
            setVendorRegistration({...vendorRegistration, presidentName : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>Manager Email</FormLabel>
          <Input className="inputVendor" type='email' name="ManagerEmail" value={vendorRegistration.managerEmail} placeholder="email@email.com"onChange={(e) => {
            setVendorRegistration({...vendorRegistration, managerEmail : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>Manager Phone</FormLabel>
          <Input className="inputVendor" type='tel' name="ManagerPhone" value={vendorRegistration.managerPhone} placeholder="0xxxxxx"onChange={(e) => {
            setVendorRegistration({...vendorRegistration, managerPhone : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>PIC Email</FormLabel>
          <Input className="inputVendor" type='email' name="PICEmail" value={vendorRegistration.picEmail} placeholder="email@email.com"onChange={(e) => {
            setVendorRegistration({...vendorRegistration, picEmail : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>PIC Phone</FormLabel>
          <Input className="inputVendor" type='tel' name="PICPhone" value={vendorRegistration.picPhone} placeholder="0xxxxxx"onChange={(e) => {
            setVendorRegistration({...vendorRegistration, picPhone : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>Established Date</FormLabel>
          <Input className="inputVendor" type='date' name="EstablishedDate" value={vendorRegistration.date} onChange={(e) => {
            setVendorRegistration({...vendorRegistration, date : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>Main Business</FormLabel>
          <Select className="selectVendor" multiple="true" name='ChoiceBusiness' onChange={(e) => {
            setVendorRegistration(vendorRegistration => ({...vendorRegistration, mainBusiness : [...vendorRegistration.mainBusiness, e.target.value]}))}}>
              <option value="Software License">Software License</option>
              <option value="IT Services & Consulting">IT Services & Consulting</option>
              <option value="IT Outsourcing">IT Outsourcing</option>
              <option value="Hardware">Hardware</option>
              <option value="General Trading">General Trading</option>
              <option value="Others">Others</option>
          </Select>
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>Employee Number</FormLabel>
          <Select className="inputVendor" name='EmployeeNumber' onChange={(e) => {
            setVendorRegistration({...vendorRegistration, employeeNumber : e.target.value})}}>
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
          <Input className="inputVendor" type='text' name="NumberOfCustomer" value={vendorRegistration.numberOfCustomer} placeholder="Customer Number"onChange={(e) => {
            setVendorRegistration({...vendorRegistration, numberOfCustomer : e.target.value})}} />
        </FormControl>
        </Flex>

        <Flex marginTop="15px">
        <FormControl isRequired>
          <FormLabel>Attachments</FormLabel>
          <Input className="inputVendor" type='file' multiple onChange={(e) => {
            setVendorRegistration({...vendorRegistration, fileVendor : e.target.files})}} />
          <FormHelperText><i style={{fontSize : "13px"}}>Please make sure to input the right file.</i></FormHelperText>
        </FormControl>
        </Flex>

        <Flex marginTop="20px">
          <FormControl isRequired>
            <FormLabel>SK Menhum</FormLabel>
            <Select className="inputVendor" name='SKAny'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, skAny : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Any / Not</option>
              <option value="Any">Any</option>
              <option value="Not">Not</option>
            </Select>

            <Select className="inputVendor" marginTop="15px" name='SKValid'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, skValid : e.target.value})}}>
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
              setVendorRegistration({...vendorRegistration, npwpAny : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Any / Not</option>
              <option value="Any">Any</option>
              <option value="Not">Not</option>
            </Select>

            <Select className="inputVendor" marginTop="15px" name='NPWPValid'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, npwpValid : e.target.value})}}>
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
              setVendorRegistration({...vendorRegistration, siupAny : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Any / Not</option>
              <option value="Any">Any</option>
              <option value="Not">Not</option>
            </Select>

            <Select className="inputVendor" marginTop="15px" name='SIUPAny'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, siupValid : e.target.value})}}>
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
              setVendorRegistration({...vendorRegistration, tdpAny : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Any / Not</option>
              <option value="Any">Any</option>
              <option value="Not">Not</option>
            </Select>

            <Select className="inputVendor" marginTop="15px" name='TDPValid'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, tdpValid : e.target.value})}}>
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
              setVendorRegistration({...vendorRegistration, domisiliAny : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Any / Not</option>
              <option value="Any">Any</option>
              <option value="Not">Not</option>
            </Select>

            <Select className="inputVendor" marginTop="15px" name='DomisiliValid'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, domisiliValid : e.target.value})}}>
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
              setVendorRegistration({...vendorRegistration, spkpAny : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Any / Not</option>
              <option value="Any">Any</option>
              <option value="Not">Not</option>
            </Select>

            <Select className="inputVendor" marginTop="15px" name='SPKPValid'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, spkpValid : e.target.value})}}>
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
              setVendorRegistration({...vendorRegistration, auditAny : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Any / Not</option>
              <option value="Any">Any</option>
              <option value="Not">Not</option>
            </Select>

            <Select className="inputVendor" marginTop="15px" name='AuditValid'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, auditValid : e.target.value})}}>
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
              setVendorRegistration({...vendorRegistration, taxAny : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Any / Not</option>
              <option value="Any">Any</option>
              <option value="Not">Not</option>
            </Select>

            <Select className="inputVendor" marginTop="15px" name='TaxValid'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, taxValid : e.target.value})}}>
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
              setVendorRegistration({...vendorRegistration, bankAny : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Any / Not</option>
              <option value="Any">Any</option>
              <option value="Not">Not</option>
            </Select>

            <Select className="inputVendor" marginTop="15px" name='BankValid'  onChange={(e) => {
              setVendorRegistration({...vendorRegistration, bankValid : e.target.value})}}>
              <option value="" disabled selected hidden>Choose Valid / Invalid</option>
              <option value="Valid">Valid</option>
              <option value="Invalid">Invalid</option>
            </Select>
          </FormControl>
        </Flex>
      
        {isSubmit === false ?
              <Flex marginTop="20px" marginBottom="20px">
                <Button width="120px" type="submit">Submit</Button>
              </Flex>
              :
              <Flex marginTop="20px" marginBottom="20px">
                 <Button
                    isLoading
                    loadingText='Submitting'  
                    variant='outline'
                    width="120px"
                  >
                    Submitting
                </Button>
              </Flex>
        }
      </form>
    </Flex>
    </Flex>
    </> 
  )
}

export default InputDataVendor