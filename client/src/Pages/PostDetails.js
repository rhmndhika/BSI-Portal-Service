import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Button, 
  Flex, 
  Image, 
  Input, 
  Text,   
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import Appbar from '../Component/Appbar/Appbar.tsx';
import parse from 'html-react-parser';


const PostDetails = () => {

  Axios.defaults.withCredentials = true;
    
  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ saveData, setSaveData ] = useState([]);
  const [ count, setCount ] = useState(false);
  const [ test, setTest ] = useState("");
  const [ comment, setComment ] = useState([]);
  const [ profileList, setProfileList] = useState([]);
  const [ liked, setLiked ] = useState(false);
  const [ likeCount, setLikeCount ] = useState("");


  const getPostDetails = () => {
    Axios.get(`https://bsi-portal-service-production.up.railway.app/socialmedia/post/${id}`).then((response) => {
      setSaveData(response.data);
    })
  }

  const getPostDetailsComments = () => {
    Axios.get(`https://bsi-portal-service-production.up.railway.app/socialmedia/post/${id}/comment`).then((response) => {
    console.log(response.data);
    })
  }

  const submitComment = async (e) => {

    e.preventDefault();
    if (test !== "") {
      Axios.put(`https://bsi-portal-service-production.up.railway.app/socialmedia/post/${id}/comment` , {
        Text : test,
        PostedBy : profileList._id
        }).then((response)=> {
          alert("Submitted")
        })
    } else {
      alert("Cannot be Empty")
    }
    }

  const getProfile = () => {
    Axios.get("https://bsi-portal-service-production.up.railway.app/socialmedia/profile/email").then((response) => {
        setProfileList(response.data);
    })
  }

  const getComment = () => {
    Axios.get("https://bsi-portal-service-production.up.railway.app/socialmedia/comment/all").then((response) => {
      setComment(response.data);
    })
  }

  const LikePost = () => {
    Axios.put(`https://bsi-portal-service-production.up.railway.app/socialmedia/${id}/like`, {
      Likes : profileList._id
    }).then((response) => {
      setLikeCount(response.data);
      console.log(response.data)
    })
    setLiked(true);
  }

  const UnlikePost = () => {
    Axios.put(`https://bsi-portal-service-production.up.railway.app/socialmedia/${id}/unlike`, {
      Likes : profileList._id
    })
    setLiked(false);
  }
  
  useEffect(() => {
    getPostDetails();
    getProfile();
    getComment();
  }, [])
  

  return (
    <div>
      <Appbar />
        {/* Like : {count ? "Like" : "Dislike"}
        <Button onClick={() => setCount((prevCount) => !prevCount)}>Like</Button> */}
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <Flex mt="50px">
            <Text>{saveData.Title}</Text>
          </Flex>

          <Flex>
            <Text>
              {parse(`${saveData.Content}`)}
            </Text>
          </Flex>

          <Flex width="430px">
          {Object.values(saveData).includes("png", "jpg", "jpeg", "svg", "apng") ? 
            <img w="650px" h="200px" alt="empty" src={saveData.Documents} />
            :
            <video w="650px" h="200px" alt="empty" src={saveData.Documents} controls></video>
          }
          </Flex>
        </Flex>
        <Flex justifyContent="Center" alignItems="center" mt="5px">
          <Button onClick={onOpen}>Open Modal Comment</Button>
        </Flex>
        <Modal closeOnOverlayClick={false}  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submitComment}>
          <ModalBody>
            <Input type="text" value={test} placeholder='Comment Here' onChange={(e) => setTest(e.target.value)}  />
            <Input type="text" defaultValue={profileList._id} display="none" disabled />
            {/* <Input type="text" value={profileList._id} name="PostedBy" onChange={(e) => setEmpty(e.target.value)} /> */}
            <Input type="text" defaultValue={id} display="none" disabled />
          </ModalBody>

          <ModalFooter>
            <Button type="submit" mr={3}>Comment</Button>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
     {liked === false ? 
      <Button onClick={LikePost}>Like</Button>
      :  
      <Button onClick={UnlikePost}>Unlike</Button>
     }

    </div>
    
  )
}

export default PostDetails