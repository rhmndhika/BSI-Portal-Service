import React from 'react';
import {createContext, useState} from "react"
export const EmailUser = createContext();
export default function EmailUserProvider({children}) {
  const [emailLog, setEmailLog] = useState("");
  return (
    <EmailUser.Provider value={{ emailLog, setEmailLog }}>
     {children}
    </EmailUser.Provider>
  );
}