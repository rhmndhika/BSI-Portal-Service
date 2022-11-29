import React from 'react';
import {createContext, useState} from "react"
export const ProfileSosmed = createContext();
export default function ProfileSosmedProvider({children}) {
  const [profileSosmed, setProfileSosmed] = useState({
   username : "",
   fullName : "",
   profilePicture : "",
   bio : "",
  });
  return (
    <ProfileSosmed.Provider value={{ profileSosmed, setProfileSosmed }}>
     {children}
    </ProfileSosmed.Provider>
  );
}