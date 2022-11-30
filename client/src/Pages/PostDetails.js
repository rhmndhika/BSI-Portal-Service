import React, { useState, useEffect, useContext, useRef } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';

const PostDetails = () => {

  Axios.defaults.withCredentials = true;
  
  let navigate = useNavigate();
  
  const { id } = useParams();


  const [ saveData, setSaveData ] = useState([]);
  const [ count, setCount ] = useState(false);

  const [ test, setTest ] = useState("");

  const [ saved, setSaved] = useState([]);


  const getPostDetails = () => {
    Axios.get(`https://empty-test-project.herokuapp.com/socialmedia/post/${id}`).then((response) => {
      setSaveData(response.data);
      console.log(response.data);
    })
  }

  const submitComment = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append('Content', test);

    await fetch("https://empty-test-project.herokuapp.com/socialmedia/comment", {
        method: 'POST',
        body: formData,
    }).then((response) => {
       
    })
  }

  const getComment = () => {
    Axios.get("https://empty-test-project.herokuapp.com/socialmedia/comment/all").then((response) => {
      setSaved(response.data);
    })
  }

  useEffect(() => {
    getPostDetails();
  }, [])

  return (
    <div>
      PostDetails
      <div>
        {/* Like : {count ? "Like" : "Dislike"}
        <Button onClick={() => setCount((prevCount) => !prevCount)}>Like</Button> */}

        <Flex>
          <Text>{saveData.Title}</Text>
          <Text>{saveData.Content}</Text>

          <form onSubmit={submitComment}>
            <Input type="text" value={test} onChange={(e) => setTest(e.target.value)} />
            <Button type="submit">Submit</Button>
          </form>
        </Flex>
        {saved}
        <Button onClick={getComment}>Click ME</Button>
      </div>  
    </div>
    
  )
}

export default PostDetails