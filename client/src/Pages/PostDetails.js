import React, { useState, useEffect, useContext, useRef } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Image, Input, Text } from '@chakra-ui/react';

const PostDetails = () => {

  Axios.defaults.withCredentials = true;
  
  let navigate = useNavigate();
  
  const { id } = useParams();


  const [ saveData, setSaveData ] = useState([]);
  const [ count, setCount ] = useState(false);

  const [ test, setTest ] = useState("");

  const [ saved, setSaved] = useState([]);

  const [ bentar, setBentar ] = useState([]);


  const getPostDetails = () => {
    Axios.get(`https://bsi-portal-service-production.up.railway.app/socialmedia/post/${id}`).then((response) => {
      setSaveData(response.data);
      console.log(response.data);
    })
  }

  const submitComment = async (e) => {

    e.preventDefault();

    // const formData = new FormData();

    // formData.append('Content', test);

    // await fetch("https://bsi-portal-service-production.up.railway.app/socialmedia/comment", {
    //     method: 'POST',
    //     body: formData,
    // }).then((response) => {
       
    // })

    Axios.post("https://bsi-portal-service-production.up.railway.app/socialmedia/comment", {
      Content : test
    })
  }

  const getAll = () => {
    Axios.get("https://bsi-portal-service-production.up.railway.app/socialmedia/post/all").then((response) => {
    console.log(response.data)  
    setBentar(response.data)
    })
  }

  useEffect(() => {
    getAll();
    getPostDetails();
  }, [])

  return (
    <div>
        {/* Like : {count ? "Like" : "Dislike"}
        <Button onClick={() => setCount((prevCount) => !prevCount)}>Like</Button> */}

        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <Flex mt="50px">
            <Text>{saveData.Title}</Text>
          </Flex>

          <Flex>
            <Text>{saveData.Content}</Text>
          </Flex>

          <Flex>
            <Image w="150px" h="100px" alt="empty" src={saveData.Documents} />
          </Flex>
        </Flex>

          {/* <form>
            <Input type="text" value={test} name="Content" onChange={(e) => setTest(e.target.value)} />
            <Button onClick={submitComment} type="submit">Submit</Button>
          </form> */}
        {/* {saved}
        <Button onClick={getComment}>Click ME</Button> */}
    </div>
    
  )
}

export default PostDetails