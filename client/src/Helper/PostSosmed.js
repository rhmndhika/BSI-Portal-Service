import React from 'react';
import {createContext, useState} from "react"
export const PostSosmed = createContext();
export default function PostSosmedProvider({children}) {
  const [postSosmed, setPostSosmed] = useState({
   username : "",
   content : "",
   documents : "",
   tags : [],
   comment : [],
   postedBy : ""
  });
  return (
    <PostSosmed.Provider value={{ postSosmed, setPostSosmed }}>
     {children}
    </PostSosmed.Provider>
  );
}