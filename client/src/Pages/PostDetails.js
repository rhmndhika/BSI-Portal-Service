import React, { useState, useEffect, useContext, useRef } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const PostDetails = () => {

  Axios.defaults.withCredentials = true;
  
  let navigate = useNavigate();
  
  const { id } = useParams();

  const [ count, setCount ] = useState(false);

  return (
    <div>
      PostDetails
      <div>
        Like : {count ? "Like" : "Dislike"}
        <Button onClick={() => setCount((prevCount) => !prevCount)}>Like</Button>
      </div>  
    </div>
    
  )
}

export default PostDetails