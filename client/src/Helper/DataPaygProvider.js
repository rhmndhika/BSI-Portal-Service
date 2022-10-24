import React from 'react';
import {createContext, useState} from "react"
export const DataPayg = createContext();
export default function DataPaygProvider({children}) {
  const [payg, setPayg] = useState({
    invoiceNumber : "",
    invoiceDate : "",
    buyerName : "",
    invoiceAmount : "",
    invoiceSubject : "",
    filePayg : [],

    newInvoiceNumber : "",
    newInvoiceDate : "",
    newBuyerName : "",
    newInvoiceAmount : "",
    newInvoiceSubject : "",
    newFilePayg : [],
    submitted : ""
  });
  return (
    <DataPayg.Provider value={{ payg, setPayg }}>
     {children}
    </DataPayg.Provider>
  );
}