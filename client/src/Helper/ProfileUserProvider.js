import React from 'react';
import {createContext, useState} from "react"
export const ProfileUser = createContext();
export default function ProfileUserProvider({children}) {
  const [profileUser, setProfileUser] = useState({
   fullName : "",
   entity : "",
   supplierName : "",
  });
  return (
    <ProfileUser.Provider value={{ profileUser, setProfileUser }}>
     {children}
    </ProfileUser.Provider>
  );
}