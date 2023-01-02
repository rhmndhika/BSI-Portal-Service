import React, { useState, useEffect, useContext } from 'react';
import { EmailUser } from '../Helper/EmailUserProvider';
import { RoleUser } from '../Helper/RoleUserProvider';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  Flex,  
  Text
} from '@chakra-ui/react';
import Appbar from '../Component/Appbar/Appbar.tsx';
import parse from 'html-react-parser';


const PostDetails = () => {

  Axios.defaults.withCredentials = true;
    
  const { id } = useParams();
  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);


  const [ saveData, setSaveData ] = useState([]);
  const [ profileList, setProfileList] = useState([]);
  const [ liked, setLiked ] = useState(false);
  const [ likeCount, setLikeCount ] = useState("");


  const getProfile = async () => {
   await Axios.get(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/profile/email`).then((response) => {
        setProfileList(response.data);
    })
  }

  const LikePost = async () => {
    await Axios.put(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/${id}/like`, {
      Likes : profileList._id
    }).then((response) => {
      setLikeCount(response.data);
    })
    setLiked(true);
  }

  const UnlikePost = async () => {
    await Axios.put(`${process.env.REACT_APP_MY_ENV_VAL}socialmedia/${id}/unlike`, {
      Likes : profileList._id
    })
    setLiked(false);
  }

  useEffect(() => {
    const cancelToken = Axios.CancelToken.source();

    Axios.get(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/post/${id}`, {
      cancelToken : cancelToken.token,
    }).then((response) => {
      setSaveData(response.data);
    }).catch((err) => {
      if (Axios.isCancel(err)){
        console.log("canceled");
      } else {
        console.log("not canceled")
      }
    });

    return () => {
      cancelToken.cancel();
    }   
   }, [id])


  useEffect(() => {
    getProfile();
  }, [])
  

  return (
    <>
      <Appbar />
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <Flex mt="50px">
            <Text>{saveData.Title}</Text>
          </Flex>

          <Flex>
            <Text>
              {parse(`${saveData.Content}`)}
            </Text>
          </Flex>

          <Flex>
            <Text>
              {saveData.Username}
            </Text>
          </Flex>

        {saveData  ? 
          <img w="650px" h="200px" alt="empty" src={saveData.Documents} /> ||  <video w="650px" h="200px" alt="empty" src={saveData.Documents} controls></video>
          :
          null
        }
          {/* {Object.values(saveData).includes("png" || "jpg" || "jpeg" || "svg" || "apng") ? 
          <Flex width="430px">
            <img w="650px" h="200px" alt="empty" src={saveData.Documents} />
          </Flex> 
            : Object.values(saveData).includes("mp4") ? 
            <Flex width="430px">
            <video w="650px" h="200px" alt="empty" src={saveData.Documents} controls></video>
            </Flex>
           :
           null 
          } */}
        </Flex>   
    </>
    
  )
}

export default PostDetails