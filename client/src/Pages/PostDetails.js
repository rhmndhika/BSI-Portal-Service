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

const PostDetails = () => {

  Axios.defaults.withCredentials = true;
  
  let navigate = useNavigate();
  
  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ saveData, setSaveData ] = useState([]);
  const [ count, setCount ] = useState(false);
  const [ test, setTest ] = useState("");
  const [ comment, setComment ] = useState([]);
  const [ profileList, setProfileList] = useState([]);



  const getPostDetails = () => {
    Axios.get(`https://bsi-portal-service-production.up.railway.app/socialmedia/post/${id}`).then((response) => {
      setSaveData(response.data);
    })
  }

  const submitComment = async (e) => {

    e.preventDefault();
    if (test !== "") {
      Axios.post("https://bsi-portal-service-production.up.railway.app/socialmedia/comment" , {
        Content : test,
        WriterID: profileList._id, 
        PostID: id
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

  const getComment= () => {
    Axios.get("https://bsi-portal-service-production.up.railway.app/socialmedia/comment/all").then((response) => {
      setComment(response.data);
    })
  }


  useEffect(() => {
    getPostDetails();
  }, [])

  useEffect(() => {
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
            <Text>{saveData.Content}</Text>
          </Flex>

          <Flex>
            <Image w="150px" h="100px" alt="empty" src={saveData.Documents} />
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
          <form onSubmit={submitComment} method="POST">
          <ModalBody>
            {comment.map((i, index) => {
              return (
              <Flex flexDirection="row" key={index}>
                {/* {i.WriterID === profileList._id ? i.WriterID = profileList.Username : null} */}
                <Text fontWeight='bold' mb='1rem' key={index}>
                  {i.WriterID} :
                </Text>
                <Text  mb='1rem' key={index}> 
                   {i.ContentMessage}
                </Text>
              </Flex>
              )
            })}
            <Input type="text" value={test} placeholder='Comment Here' onChange={(e) => setTest(e.target.value)}  />
            <Input type="text" value={profileList._id} display="none" />
            {/* <Input type="text" value={profileList._id} name="PostedBy" onChange={(e) => setEmpty(e.target.value)} /> */}
            <Input type="text" value={id} display="none" />
          </ModalBody>

          <ModalFooter>
            <Button type="submit" mr={3}>Submit</Button>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
    
  )
}

export default PostDetails