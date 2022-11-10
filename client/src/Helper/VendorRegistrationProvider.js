import React from 'react';
import { createContext, useState } from "react"
export const VendorRegistration = createContext();
export default function UserDataProvider({ children }) {
    const [ vendorRegistration , setVendorRegistration ] = useState({
        cName : "",
        Address : "",
        phoneNumber : "",
        presidentName : "",
        managerEmail : "",
        managerPhone : "",
        picEmail : "",
        picPhone : "",
        date: "",
        mainBusiness : [],
        employeeNumber : "",
        numberOfCustomer : "",
        fileVendor : [],


        skAny : "",
        skValid:  "",

        npwpAny : "",
        npwpValid : "",

        siupAny : "",
        siupValid : "",

        tdpAny : "",
        tdpValid : "",

        domisiliAny : "",
        domisiliValid : "",

        spkpAny : "",
        spkpValid : "",

        auditAny : "",
        auditValid : "",

        taxAny : "",
        taxValid : "",

        bankAny : "",
        bankValid : "",

        newCName : "",
        newAddress : "",
        newPhoneNumber : "",
        newPresidentName : "",
        newManagerEmail : "",
        newManagerPhone : "",
        newPICEmail : "",
        newPICPhoneNumber : "",
        newDate : "",
        newMainBusiness : "",
        newEmployeeNumber : "",
        newNumberOfCustomer : "",
        newFileVendor : "",

        newSKAny : "",
        newSKValid:  "",

        newNPWPAny : "",
        newNPWPValid : "",

        newSIUPAny : "",
        newSIUPValid : "",

        newTDPAny : "",
        newTDPValid : "",

        newDomisiliAny : "",
        newDomisiliValid : "",

        newSPKPAny : "",
        newSPKPValid : "",

        newAuditAny : "",
        newAuditValid : "",

        newTaxAny : "",
        newTaxValid : "",

        newBankAny : "",
        newBankValid : "",

        status : "",
        submitted : ""
      });

  return (
    <VendorRegistration.Provider value={{ vendorRegistration, setVendorRegistration }}>
     {children}
    </VendorRegistration.Provider>
  );
}