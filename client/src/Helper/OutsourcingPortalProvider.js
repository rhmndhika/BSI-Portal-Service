import React from 'react';
import {createContext, useState} from "react"
export const OutsourcingPortal = createContext();
export default function OutsourcingPortalProvider({children}) {
  const [outsourcingPortal, setOutsourcingPortal] = useState({
    email : "",
    name : "",
    idLink : "",
    supplier : "",
    user1 : "",
    user2 : "",
    roleQuotation : "0",
    fileOutsourcing : [],

    newName : "",
    newIDLink : "",
    newSupplier : "",
    newUser1 : "",
    newUser2 : "",
    newRoleQuotation : ""
  });
  return (
    <OutsourcingPortal.Provider value={{ outsourcingPortal, setOutsourcingPortal }}>
     {children}
    </OutsourcingPortal.Provider>
  );
}