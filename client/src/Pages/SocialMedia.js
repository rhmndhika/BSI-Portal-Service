import React, { useEffect, useContext, useState, useRef, useMemo } from 'react';
import { EmailUser } from '../Helper/EmailUserProvider';
import { RoleUser } from '../Helper/RoleUserProvider';
import { ProfileSosmed } from '../Helper/ProfileSosmedProvider';
import { PostSosmed } from '../Helper/PostSosmed';
import Appbar from '../Component/Appbar/Appbar.tsx';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { 
    Box,
    Avatar,
    Heading,
    Text,
    IconButton,
    Button,
    Stack,
    StackDivider,
    Input,
    InputGroup,
    InputLeftElement,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea,
    Spinner,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    FormHelperText
} from '@chakra-ui/react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter 
} from '@chakra-ui/card'
import { 
  DeleteIcon,
  EditIcon,
  SearchIcon
} from '@chakra-ui/icons';
import './SocialMedia.css'
import {
  BsChat
} from 'react-icons/bs';
import {
  BiLike
} from 'react-icons/bi';
import {
  AiFillLike,
  AiOutlineLike,
  AiOutlineDislike
} from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

const SocialMedia = () => {

    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
    
    const { emailLog, setEmailLog } = useContext(EmailUser);
    const { roleUser, setRoleUser } = useContext(RoleUser);
    const { profileSosmed, setProfileSosmed } = useContext(ProfileSosmed);
    const { postSosmed, setPostSosmed } = useContext(PostSosmed);
    const [ profileUser, setProfileUser ] = useState([]);
    const [ profileList, setProfileList ] = useState([]);
    const [ postList, setPostList ] = useState([]);
    const [ image, setImage ] = useState(null);
    const [ imagePost, setImagePost ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ currentID, setCurrentID ] = useState("");
    const [ search, setSearch ] = useState("");
    const [ liked, setLiked ] = useState(false);
    const [ likeCount, setLikeCount ] = useState([]);
    const [ text, setText ] = useState("");
    const [ postID, setPostID ] = useState("");

    const [value, setValue] = useState('');
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { 
        isOpen  : isOpenPostModal, 
        onOpen  : onOpenPostModal, 
        onClose : onClosePostModal 
    } = useDisclosure()

    const { 
        isOpen  : isOpenAlertDialog, 
        onOpen  : onOpenAlertDialog, 
        onClose : onCloseAlertDialog
     } = useDisclosure()

     const { 
      isOpen  : isOpenCommentDialog, 
      onOpen  : onOpenCommentDialog, 
      onClose : onCloseCommentDialog
   } = useDisclosure()

    const cancelRef = React.useRef();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
        setProfileSosmed({...profileSosmed, profilePicture : event.target.files[0]})
      }
    }

    const onImageChangePost = (event) => {
      if (event.target.files && event.target.files[0]) {
        setImagePost(URL.createObjectURL(event.target.files[0]));
        setPostSosmed({...postSosmed, documents : event.target.files[0]})
       }
    }

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

    const createProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('FullName', profileSosmed.fullName);
        formData.append('Username', emailLog);
        formData.append('ProfilePicture', profileSosmed.profilePicture);
        formData.append('Bio', profileSosmed.bio);

        await fetch("https://bsi-portal-service-production.up.railway.app/socialmedia/profile/create", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            setTimeout(() => window.location.reload(false), 1000);
        })
    }

    const submitPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('Username', emailLog);
        formData.append('Content', value);
        formData.append('Documents', postSosmed.documents);
        formData.append('Author', profileUser._id);

        await fetch("https://bsi-portal-service-production.up.railway.app/socialmedia/post", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            setTimeout(() => window.location.reload(false), 1000);
        })
    }

    const getAllPost = () => {
        Axios.get("https://bsi-portal-service-production.up.railway.app/socialmedia/post/all").then((response) => {
            setPostList(response.data);
            setIsLoading(false);
        })
    }

    const getAllProfile = () => {
      Axios.get("https://bsi-portal-service-production.up.railway.app/socialmedia/profile/all").then((response) => {
          setProfileList(response.data);
          setIsLoading(false);
      })
    }

    const getProfile = () => {
      Axios.get("https://bsi-portal-service-production.up.railway.app/socialmedia/profile/email").then((response) => {
          setProfileUser(response.data);
          setIsLoading(false);
      })
    }

    const deleteCurrentID = () => {
       Axios.delete(`https://bsi-portal-service-production.up.railway.app/socialmedia/post/delete/${currentID}`).then(() => {
        setPostList(postList.filter((val) => {
          return val._id != currentID
        }))
        onCloseAlertDialog();
      }); 
    }

    const LikePost = (id) => {
      Axios.put(`https://bsi-portal-service-production.up.railway.app/socialmedia/${id}/like`, {
        Likes : profileUser._id
      }).then((response) => {
        setLikeCount(response.data);
      })
      setPostSosmed({...postSosmed, liked : true})  
    }
  
    const UnlikePost = (id) => {
      Axios.put(`https://bsi-portal-service-production.up.railway.app/socialmedia/${id}/unlike`, {
        Likes : profileUser._id
      }).then((response) => {
        setLikeCount(response.data);
      })
    }

    const submitComment = async (e) => {

      e.preventDefault();
      if (text !== "" ) {
        Axios.put(`https://bsi-portal-service-production.up.railway.app/socialmedia/post/${postID}/comment` , {
          Text : text,
          PostedBy : profileUser._id
          }).then((response)=> {
            alert("Submitted")
          })
      } else {
        alert("Cannot be Empty")
      }
    }

    useEffect(() => {
      getProfile();
      getAllProfile();
    }, [])
    
    useEffect(() => {
      getAllPost();
    }, [likeCount])
    

  return (
   <>
    <Appbar />
    {/* Alert Delete */}
    <AlertDialog
        isOpen={isOpenAlertDialog}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlertDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlertDialog}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deleteCurrentID} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    {/* Modal CreatePost */}
    <Modal
        isOpen={isOpenPostModal}
        onClose={onClosePostModal}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your post</ModalHeader>
          <ModalCloseButton />
          <form method='POST' onSubmit={submitPost}>
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input value={emailLog} disabled />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Profile ID</FormLabel>
              <Input value={profileUser._id} disabled />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <ReactQuill theme="snow" value={value} onChange={setValue} />
              <FormHelperText><i>*Please add http:// or https:// if you want to input a link</i></FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Picture</FormLabel>
              <Input type="file"  name="documents" onChange={onImageChangePost} />
              <img src={imagePost} alt="preview document post" />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button type='submit' colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClosePostModal}>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
    </Modal>

    {/* Profile Modal  */}

    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Profile</ModalHeader>
          <ModalCloseButton />
          <form method='POST' onSubmit={createProfile}>
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input ref={initialRef} placeholder='Full Name' value={profileSosmed.fullName} name="fullName" onChange={(e) => {
                setProfileSosmed({...profileSosmed, fullName : e.target.value})
              }} />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Username</FormLabel>
              <Input value={emailLog} disabled name="fullName" onChange={(e) => {
                setProfileSosmed({...profileSosmed, username : e.target.value})
              }}/>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Bio</FormLabel>
              <Textarea value={profileSosmed.Bio} name="bio" onChange={(e) => {
                setProfileSosmed({...profileSosmed, bio : e.target.value})
              }}  />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Profile Picture</FormLabel>
              <Input type="file" name="ProfilePicture" onChange={onImageChange}/>
              <img src={image} alt="preview image" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    <>  

    {/* Modal Create Comment */}
    {postList.map((i, index) => {
      return (
    <Modal closeOnOverlayClick={false}  isOpen={isOpenCommentDialog} onClose={onCloseCommentDialog}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submitComment}>
          <ModalBody>
            <Input type="text" value={text} placeholder='Comment Here' onChange={(e) => setText(e.target.value)}  />
            <Input type="text" defaultValue={profileUser._id} display="none" disabled />
          </ModalBody>

          <ModalFooter>
            <Button type="submit" mr={3}>Comment</Button>
            <Button colorScheme='blue' onClick={onCloseCommentDialog}>
              Close
            </Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      )
    })}

       {/* Header for Mobile Version */}
        <Flex className="flex-nav-1" flexDirection="row" justifyContent="center" alignItems="center" width="full" height="80px">
            <Flex justifyContent="center" alignItems="center"  height="60px" margin="20px 10px 20px 10px">
                <Flex alignItems="center">
                <InputGroup>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                    />
                    <Input width="300px" type='text' placeholder='Search....'  onChange={(e) => setSearch(e.target.value)} />
                </InputGroup>
                </Flex>
            </Flex>
            <Flex flexDirection="row" justifyContent="center" alignItems="center" height="60px" margin="20px 10px 20px 10px">
              <Button  onClick={onOpenPostModal} width={120}>Create Post</Button>
              <Button onClick={onOpen} marginLeft={30} width={120}>Create Profile</Button>
            </Flex>
        </Flex>
        
        {/* Header For the web version */}
        <Flex className='flex-nav-2' flexDirection="row" justifyContent="center" alignItems="center" width="full" height="80px">
            <Flex justifyContent="center" alignItems="center"  height="60px" margin="20px 10px 20px 10px">
                <Flex alignItems="center">
                <InputGroup>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                    />
                    <Input width="300px" type='text' placeholder='Search....'  onChange={(e) => setSearch(e.target.value)} />
                </InputGroup>
                </Flex>
            </Flex>
        </Flex>
        
        {/* Profile Component */}
        <Flex className='flexContainerSM' flexDirection="row" justifyContent="space-between" alignItems="flex-start" padding="30px">

            <Flex className='flex-item-1' flexDirection="column" justifyContent="center" alignItems="center">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" border="1px solid" borderRadius="20px" width="320px" height="320px">
                    { isLoading === false ? 
                    <>
                    {profileUser.length <= 0 ? <Button onClick={onOpen}>Create Profile</Button> : 
                        <Flex flexDirection="column" justifyContent="center" alignItems="center" >
                          <Link to={`/socialmedia/profile/${profileUser._id}`}>
                            <Flex justifyContent="center" width="300px">
                                <img style={{width : "250px", height: "250px"}} crossOrigin="anonymous" src={profileUser.ProfilePicture} title="Test" />
                            </Flex>
                          </Link>
                            <Text>@{profileUser.FullName}</Text>
                            <Text>{profileUser.Username}</Text>
                        </Flex>
                    }
                    </>
                    :
                        <Spinner />
                    }
                </Flex>
                   
                <Flex width="320px" height="150px" padding="10px" marginTop="25px" borderRadius="20px" border="1px solid">
                <Card width="320px" marginTop="10px">
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                    <Box cursor="pointer">
                        <Heading size='xs' textTransform='uppercase'>
                        Profile
                        </Heading>
                    </Box>
                    <Box cursor="pointer">
                        <Heading size='xs' textTransform='uppercase'>
                        Your Post
                        </Heading>
                    </Box>
                    <Box cursor="pointer">
                        <Heading size='xs' textTransform='uppercase'>
                        IDK
                        </Heading>
                    </Box>
                    </Stack>
                </CardBody>
                </Card>
                </Flex>

            <Button 
                marginTop="20px"
                size="md"
                width="full"
                colorScheme="facebook"
                onClick={onOpenPostModal}
            >
            Create Post
            </Button>
            </Flex>
            
            {/* Card Post Social Media */}
            { isLoading === false ? 
            <Flex className='flex-item-2'  flexDirection="column">
                { postList.length <= 0 ? null : postList.filter(i => 
                i.Author.FullName.toLowerCase().includes(search) 
                ).map((i, index) => {
                return (
                <Flex marginTop="15px" key={index}>
                    <Card shadow="lg" padding="10px">
                    <CardHeader>
                        <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                              <Avatar src={i.Author.ProfilePicture} />  
                            <Box>
                            <Heading size='sm'>{i.Author.FullName}</Heading>
                            <Text>{moment(i.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
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
                          onOpenAlertDialog(i._id);
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
                    { i.Documents?.includes("png", "jpg", "jpeg", "svg", "apng") ?
                      <img
                        className='docPost'
                        src={i.Documents}
                        alt=''
                      />
                    : i.Documents?.includes("mp4") ? 
                     <video 
                        className='docPost'
                        src={i.Documents}
                        controls
                      />                      
                    :
                      <img
                      className='docPost'
                      src={i.Documents}
                      alt=''
                    />
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
                    {/* Another User cant like         */}
                      { i.Likes?.length <= 0 ?
                        <Button key={index} flex='1' variant='ghost' rightIcon={<AiOutlineLike />} leftIcon={`${Object.keys(i.Likes).length}`} onClick={() => LikePost(i._id)}>Like</Button>
                      :
                      <>
                        <Button key={index} flex='1' variant='ghost' rightIcon={<AiFillLike />} leftIcon={`${Object.keys(i.Likes).length}`} onClick={() => UnlikePost(i._id)}>Liked</Button>
                      </>
                      }
                    {/* All user can like infinitely */}
                      {/* { i.Likes?.length <= 0 && i.Likes.includes(i.Author._id) ?
                          <Button key={index} flex='1' variant='ghost' rightIcon={<AiFillLike />} leftIcon={`${Object.keys(i.Likes).length}`} onClick={() => UnlikePost(i._id)}>Liked</Button>
                        :
                        <>
                        <Button key={index} flex='1' variant='ghost' rightIcon={<AiOutlineLike />} leftIcon={`${Object.keys(i.Likes).length}`} onClick={() => LikePost(i._id)}>Like</Button>
                        </>
                      } */}
                      <Button flex='1' variant='ghost' leftIcon={<BsChat />} onClick={() => {
                        setPostID(i._id);
                        onOpenCommentDialog(i._id);
                      }}>
                      Comment</Button>
                    </CardFooter>
                    </Card>
                </Flex>
                )
            })}
            </Flex>
            :
            <Spinner mt={150} />
            }      

            {/* Right Side Component : Who to find and Trending Post */}
            <Flex className='flex-item-3' flexDirection="column" justifyContent="center" alignItems="center" width="350px">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" width="300px" height="max-content" border="1px solid" marginTop="15px">
                    <Flex>
                        <Text>Who to find</Text>
                    </Flex>
                    {profileList.map((i, index) => {
                      return (
                      <>
                      {i.Username !== emailLog ? 
                      <Flex flexDirection="row" justifyContent="space-evenly" width="250px" alignItems="center" marginTop="10px" key={index}>
                          <Avatar name={i.Username} src={i.ProfilePicture} />
                          <Text width="130px">{i.Username}</Text>
                          <Link  to={`/socialmedia/profile/${i._id}`}>
                            <Button>View</Button>
                          </Link>
                      </Flex>
                     :
                     null 
                     }
                      </>
                      )
                    })}
                </Flex>

                <Flex flexDirection="column" justifyContent="center" alignItems="center" width="300px" height="max-content" border="1px solid" marginTop="20px">
                    <Flex>
                        <Text>Trending Post</Text>
                    </Flex>

                    <Flex>
                        <Card shadow="lg" padding="20px" width="250px">
                        <CardHeader>
                            <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name='Segun Adebayo' src='' />

                                <Box>
                                <Heading size='sm'>Segun Adebayo</Heading>
                                <Text>Time</Text>
                                </Box>
                            </Flex>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Flex justifyContent="center" margin="10px">
                                <Text fontWeight="bold">
                                    Title
                                </Text>
                            </Flex>
                        </CardBody>

                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                        >
                            <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                            
                            </Button>
                            <Button flex='1' variant='ghost' leftIcon={<BsChat />}>
                            
                            </Button>
                        </CardFooter>
                        </Card>
                    </Flex>

                </Flex>
            </Flex>

        </Flex>
    </>
   </>
  )
}

export default SocialMedia