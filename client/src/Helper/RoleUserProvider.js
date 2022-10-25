import React from 'react';
import {createContext, useState} from "react"
export const RoleUser = createContext();
export default function RoleUserProvider({children}) {
  const [roleUser, setRoleUser] = useState("");
  return (
    <RoleUser.Provider value={{ roleUser, setRoleUser }}>
     {children}
    </RoleUser.Provider>
  );
}