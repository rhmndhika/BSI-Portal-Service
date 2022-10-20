import React from 'react';
import {createContext, useState} from "react"
export const ProfileUser = createContext();
export default function ProfileUserProvider({children}) {
  const [profileUser, setProfileUser] = useState({
   companyName : "",
   pic : "",
   picEmail : "",
   occupation : ""
  });
  return (
    <ProfileUser.Provider value={{ profileUser, setProfileUser }}>
     {children}
    </ProfileUser.Provider>
  );
}