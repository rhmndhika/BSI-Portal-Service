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
  const [ comment, setComment ] = useState("");

  const [ saved, setSaved] = useState([]);

  const [ bentar, setBentar ] = useState([]);

  const [ profileList, setProfileList] = useState([]);


  const getPostDetails = () => {
    Axios.get(`https://bsi-portal-service-production.up.railway.app/socialmedia/post/${id}`).then((response) => {
      setSaveData(response.data);
    })
  }

  const submitComment = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append('Content', test);
    formData.append('PostedBy', profileList._id);

    await fetch("https://bsi-portal-service-production.up.railway.app/socialmedia/comment", {
        method: 'POST',
        body: formData,
    }).then((response) => {
       console.log(response);
    })

    Axios.post("https://bsi-portal-service-production.up.railway.app/socialmedia/comment", {
      Content : test
    })
  }

  const getProfile = () => {
    Axios.get("https://bsi-portal-service-production.up.railway.app/socialmedia").then((response) => {
        setProfileList(response.data);
    })
}

  useEffect(() => {
    getPostDetails();
    getProfile();
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
          <form onSubmit={submitComment}>
            <Input type="text" value={test} name="Content" placeholder='Comment Here' onChange={(e) => setTest(e.target.value)} />
            <Input type="text" value={profileList._id} name="PostedBy" onChange={(e) => setComment(e.target.value)} />
            <Button type="submit">Submit</Button>
          </form>
        {/* {saved}
        <Button onClick={getComment}>Click ME</Button> */}
    </div>
    
  )
}

export default PostDetails