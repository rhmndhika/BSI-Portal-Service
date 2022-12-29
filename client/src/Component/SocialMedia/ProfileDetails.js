import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  Box,
  Avatar,
  Heading,
  Text,
  IconButton,
  Button,
  Flex,
  Spinner
} from '@chakra-ui/react';
import { 
Card, 
CardHeader, 
CardBody, 
CardFooter 
} from '@chakra-ui/card';
import { 
  DeleteIcon,
  EditIcon
} from '@chakra-ui/icons';
import {
  BsChat
} from 'react-icons/bs';
import {
  BiLike
} from 'react-icons/bi';
import Appbar from '../Appbar/Appbar.tsx';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';

const ProfileDetails = () => {

  Axios.defaults.withCredentials = true

  let navigate = useNavigate();

  const { id } = useParams();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  const [ profileDetails, setProfileDetails ] = useState([]);
  const [ postLists, setPostLists ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentID, setCurrentID ] = useState("");


  const deleteProfile = async () => {
    await Axios.delete(`https://bsi-portal-service-production.up.railway.app/socialmedia/profile/${id}/delete`).then(() => {
      setTimeout(() => navigate("/socialmedia/home", { replace : true}), 1000)
    })
  }

  const getYourPost = async () => {
    await Axios.get("https://bsi-portal-service-production.up.railway.app/socialmedia/post/all").then((response) => {
      setPostLists(response.data);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getYourPost();
  }, [])

  useEffect(() => {
    async function userExpire2 () {
      const request = await  Axios.get('https://bsi-portal-service-production.up.railway.app/login')
      .then((response)=> {
        if(response.data.loggedIn === true) {
          setEmailLog(response.data.email);
          setRoleUser(response.data.role);
        } else {
          navigate("/", {replace : true})
        }
      }, {withCredentials : true});
      return request;
    }
    userExpire2();
   }, [emailLog])

  useEffect(() => {
    const cancelToken = Axios.CancelToken.source();

    Axios.get(`https://bsi-portal-service-production.up.railway.app/socialmedia/profile/${id}`, {
      cancelToken : cancelToken.token,
    }).then((response) => {
      setProfileDetails(response.data);
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

  return (
    <>
    <Appbar />
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Flex flexDirection="column" textAlign="center">
        <Flex flexDirection="column" justifyContent="center" alignItems="center" border="1px solid" margin="10px 0 10px 0" textAlign="left" display="inline-block">
            <p>Profile Details with ID : {id}</p>
            <p>Username : {profileDetails.Username}</p>
            <p>Fullname : {profileDetails.FullName}</p>
            <p>Bio : {profileDetails.Bio}</p>
        </Flex>
        {profileDetails.Username === emailLog ? 
        <Button onClick={deleteProfile}>Delete my Profile</Button>
        :
        null
        } 
      </Flex>
      { isLoading === false ? 
            <Flex flexDirection="column" justifyContent="center" alignItems="center" width="430px">
                { postLists.length <= 0 ? null : postLists.filter(i => i.Author._id === id).map((i, index) => {
                return (
                <Flex marginTop="15px">
                    <Card shadow="lg" padding="10px" key={i._id}>
                    <CardHeader>
                        <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar src={i.Author.ProfilePicture} />  
                            <Box>
                            <Heading size='sm'>{i.Author.FullName}</Heading>
                            <Text>Created {moment(i.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            {/* <Text>{moment(i.createdAt).startOf('day').fromNow()}</Text> */}
                            </Box>
                        </Flex>
                        <Link to={`/socialmedia/${i._id}`}>
                          <IconButton
                          variant='ghost'
                          colorScheme='gray'
                          aria-label='See menu' 
                          icon={<EditIcon />}
                          />
                        </Link>
                        { i.Username === emailLog 
                        ?
                        <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        onClick={() => {
                          setCurrentID(i._id);
                          // onOpenAlertDialog(i._id);
                        }}
                        icon={<DeleteIcon />}
                        />
                         : 
                        null
                        }
                        </Flex>
                    </CardHeader>
                    <Text marginTop={30}>
                        {i.Title}
                    </Text>
                    {i.Documents?.includes("png", "jpg", "jpeg", "svg", "apng") ? 
                    <img
                      className='docPost'
                      src={i.Documents}
                      alt=''
                     />
                     : 
                    <video 
                      className='docPost'
                      src={i.Documents}
                      controls
                      >
                    </video>
                    }
                    <CardBody>
                        <Text padding="15px" >
                        {parse(i.Content)}
                        </Text>
                    </CardBody>
                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                    >
                        {/* <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                        Like
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<BsChat />}>
                        Comment
                        </Button> */}
                    </CardFooter>
                    </Card>
                </Flex>
                )
            })}
            </Flex>
            :
            <Spinner mt={150} />
            }
    </Flex>
    </>
  )
}

export default ProfileDetails

