import React from 'react';
import {createContext, useState} from "react"
export const OutsourcingPortal = createContext();
export default function OutsourcingPortalProvider({children}) {
  const [outsourcingPortal, setOutsourcingPortal] = useState({
    email : "",
    fileOutsourcing : [],
    name : "",
    idLink : "",
    supplier : "",
    user1 : "",
    user2 : "",
    roleQuotation : "0"
  });
  return (
    <OutsourcingPortal.Provider value={{ outsourcingPortal, setOutsourcingPortal }}>
     {children}
    </OutsourcingPortal.Provider>
  );
}