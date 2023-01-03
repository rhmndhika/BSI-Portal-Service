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
    FormHelperText,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Center,
    AvatarGroup,
    Tooltip
} from '@chakra-ui/react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter 
} from '@chakra-ui/card'
import { 
  AddIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon
} from '@chakra-ui/icons';
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
import { BsThreeDotsVertical, BsChatSquareQuote } from 'react-icons/bs';
import { RiShutDownLine, RiRestartLine, RiFileShredLine } from 'react-icons/ri';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import './SocialMedia.css';

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
    const [ likeCount, setLikeCount ] = useState([]);
    const [ text, setText ] = useState("");
    const [ postID, setPostID ] = useState("");
    const [ value, setValue ] = useState('');
    const [ isSaving, setIsSaving ] = useState(false);
    const [ isSavingProfile, setIsSavingProfile ] = useState(false);
  
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
          const request = await  Axios.get(`${process.env.REACT_APP_MY_ENV_VAL}/login`)
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
        
        await fetch(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/profile/create`, {
            method: 'POST',
            body: formData,
        }).then((response) => {
            setIsSavingProfile(true);
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

        if (value === "") {
          alert("Please input the content")
        } else { 
          await fetch(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/post`, {
            method : "POST",
            body: formData,
          }).then((response) => {
            setIsSaving(true);
            setTimeout(() => window.location.reload(false), 1000);
          })
        }
    }

    const getAllPost = () => {
        Axios.get(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/post/all`).then((response) => {
            setPostList(response.data);
            setIsLoading(false);
        })
    }

    const getAllProfile = () => {
      Axios.get(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/profile/all`).then((response) => {
          setProfileList(response.data);
          setIsLoading(false);
      })
    }

    const getProfile = () => {
      Axios.get(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/profile/email`).then((response) => {
          setProfileUser(response.data);
          setIsLoading(false);
      })
    }

    const deleteCurrentID = () => {
       Axios.delete(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/post/delete/${currentID}`).then(() => {
        setPostList(postList.filter((val) => {
          return val._id != currentID
        }))
        onCloseAlertDialog();
      }); 
    }

    const deleteProfile = async () => {
      await Axios.delete(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/profile/${profileUser._id}/delete`).then(() => {
        setTimeout(() => window.location.reload(false), 1000)
      })
    }

    const LikePost = (id) => {
      Axios.put(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/${id}/like`, {
        Likes : profileUser._id
      }).then((response) => {
        setLikeCount(response.data);
      })
    }
  
    const UnlikePost = (id) => {
      Axios.put(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/${id}/unlike`, {
        Likes : profileUser._id
      }).then((response) => {
        setLikeCount(response.data);
      })
    }

    const submitComment = async (e) => {

      e.preventDefault();
      if (text !== "" ) {
        Axios.put(`${process.env.REACT_APP_MY_ENV_VAL}/socialmedia/post/${postID}/comment` , {
          Text : text,
          PostedBy : profileUser._id
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

            <FormControl mt={4} isRequired>
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
          {isSaving === true ? 
            <Button
            isLoading
            loadingText='Saving'
            colorScheme='blue'  
            variant='outline'
            spinnerPlacement='start'
            mr="10px"
            >
            Saving 
            </Button>
          :
            <Button type='submit' colorScheme='blue' mr={3}>
              Save
            </Button>
          }
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
          <form onSubmit={createProfile}>
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
          { isSavingProfile === false ? 
            <Button type='submit' colorScheme='blue' mr={3}>
              Save
            </Button>
          :
            <Button
              isLoading
              loadingText='Saving'
              colorScheme='blue'
              variant='outline'
              spinnerPlacement='start'
              mr="10px"
            >
              Saving
            </Button>
          }
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
    </Modal>
    
    {/* Modal Create Comment */}
    {postList.map((i, index) => (
    <Modal closeOnOverlayClick={false}  isOpen={isOpenCommentDialog} onClose={onCloseCommentDialog} key={i._id}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submitComment}>
          <ModalBody>
            {i.Comments.map((x) => (
              <Flex flexDirection="row" mt="5px">
                <Text key={x._id} paddingLeft="10px">{x.PostedBy} : </Text>
                <Text key={x._id} paddingLeft="10px">{x.Text}</Text>
              </Flex> 
            )
            )}
            <Input type="text" value={text} placeholder='Comment Here' mt="10px" onChange={(e) => setText(e.target.value)}  />
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
    )}

       {/* Header for Mobile Version */}
        <Flex className="flex-nav-1" flexDirection="row" justifyContent="center" alignItems="center" width="full" height="80px">
            <Flex justifyContent="center" alignItems="center"  height="60px" margin="20px 10px 20px 10px">
              <Flex width="320px" height="60px" borderRadius="40px" shadow="base">
              <InputGroup margin="10px">
              <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='black.300' />}/>
              <Input backgroundColor="gray.100" textColor="black.300" borderRadius="50px" width="180px" type='text' placeholder='Search....'  onChange={(e) => setSearch(e.target.value)} />
              </InputGroup>
                    {profileUser.length <= 0 ? <Button borderRadius="30px" onClick={onOpen} mt="10px" mr="20px">New</Button> : 
                    <Flex gap="-10px" justifyContent="center">
                    { profileUser ? 
                    <IconButton 
                      variant="outline"
                      colorScheme="black.100"
                      aria-label="create post"
                      rounded="full"  
                      mt="10px"
                      icon={<AddIcon />}
                      onClick={onOpenPostModal}/>
                    :
                    null
                    }
                    <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      mr={'15px'}
                      minW={0}>
                    <Avatar size='md' name={profileUser.FullName} margin="5px" crossOrigin="anonymous" src={profileUser.ProfilePicture} />{' '}
                    </MenuButton>
                    <MenuList alignItems={'center'} borderRadius="20px">
                      <br />
                      <Center>
                        <Flex flexDirection="column" >
                          <Flex>
                            <Text>👋Hey, {profileUser.FullName}</Text>
                          </Flex>
                        </Flex>
                      </Center>
                      <br />
                      <MenuDivider />
                      <a href={`/socialmedia/profile/${profileUser._id}`}>
                      <MenuItem>Profile Settings</MenuItem>
                      </a>
                    </MenuList>
                    </Menu>
                    </Flex>
                    }
              </Flex>
            </Flex>
            {/* { profileUser ? 
            <Flex flexDirection="row" justifyContent="center" alignItems="center" height="60px" margin="20px 10px 20px 10px">
              <Button  onClick={onOpenPostModal} width={120}>Create Post</Button>
            </Flex>
            :
            null
            } */}
        </Flex>
        

        
        <Flex className='flexContainerSM' flexDirection="row" justifyContent="space-between" alignItems="flex-start" padding="30px">
        {/* Profile Component */}
            <Flex className='flex-item-1' flexDirection="column" justifyContent="center" alignItems="center">
                       
                <Flex width="280px" height="150px" padding="10px" marginTop="25px" border="1px solid">
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
                { profileUser ? 
                <Button 
                  marginTop="20px"
                  size="md"
                  width="full"
                  colorScheme="facebook"
                  onClick={onOpenPostModal}>
                Create Post
                </Button>
                :
                <Flex>
                  <Text>Create profile first</Text>
                </Flex>
                }
            </Flex>
            
            {/* Card Post Social Media */}
            { isLoading === false ? 
            <Flex className='flex-item-2'  flexDirection="column">
                { postList.length <= 0 ? null : postList.filter(i => 
                i.Author.FullName.toLowerCase().includes(search) 
                ).map((i, index) => {
                return (
                <Flex marginTop="15px">
                    <Card shadow="lg" padding="10px" borderRadius="25px" key={i._id}>
                    <CardHeader>
                        <Flex spacing='4' borderRadius="20px">
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
                      <Text paddingTop="15px" ml="20px" mb="20px">
                      {parse(i.Content)}
                     
                      </Text>
                    </CardBody>
                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                    >            
                    {/* All user can like infinitely */}
                      {i.Likes._id === profileUser._id ?
                        <Button key={index} flex='1' variant='ghost' rightIcon={<AiFillLike />} leftIcon={`${Object.keys(i.Likes).length}`} onClick={() => UnlikePost(i._id)}>Liked</Button>
                        :
                        <>
                        <Button key={index} flex='1' variant='ghost' rightIcon={<AiOutlineLike />} leftIcon={`${Object.keys(i.Likes).length}`} onClick={() => LikePost(i._id)}>Like</Button>
                        <AvatarGroup size='sm' max={3}>
                        {i.Likes.map((x) => {
                          return (
                            <Tooltip label={x.FullName}>
                              <Avatar key={x._id} size="sm" name={x.FullName} src={x.ProfilePicture} cursor="pointer" />
                            </Tooltip>
                            )
                          })}
                        </AvatarGroup>  
                        </>
                      }
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
            <Flex className="searchWEBV" width="320px" height="60px" borderRadius="40px" shadow="base">
              <InputGroup margin="10px">
              <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='black.300' />}/>
              <Input backgroundColor="gray.100" textColor="black.300" borderRadius="50px" width="230px" type='text' placeholder='Search....'  onChange={(e) => setSearch(e.target.value)} />
              </InputGroup>
              { isLoading === false ? 
                    <>
                    {profileUser.length <= 0 ? <Button borderRadius="30px" onClick={onOpen} mt="10px" mr="20px">New</Button> : 
                    <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      mr={'15px'}
                      minW={0}>
                    <Avatar size='md' name={profileUser.FullName} margin="5px" crossOrigin="anonymous" src={profileUser.ProfilePicture} />{' '}
                    </MenuButton>
                    <MenuList alignItems={'center'} borderRadius="20px">
                      <br />
                      <Center>
                        <Flex flexDirection="column" >
                          <Flex>
                            <Text>👋Hey, {profileUser.FullName}</Text>
                          </Flex>
                        </Flex>
                      </Center>
                      <br />
                      <MenuDivider />
                      <a href={`/socialmedia/profile/${profileUser._id}`}>
                      <MenuItem>Profile Settings</MenuItem>
                      </a>
                    </MenuList>
                    </Menu>
                    }
                    </>
                    :
                        <Spinner mt="20px" ml="70px" />
                    }
            </Flex>

                <Flex flexDirection="column" justifyContent="flex-start" alignItems="center" width="330px" height="max-content" borderRadius="20px" shadow="md" marginTop="15px">
                  <Flex justifyContent="flex-start">
                    <Text textAlign="left">Suggestion For You</Text>
                  </Flex>
                    {profileList.slice(0, 5).map((i, index) => {
                      return (
                      <>
                      {i.Username !== emailLog ? 
                      <Flex flexDirection="row" justifyContent="space-evenly" width="300px" alignItems="center" marginTop="10px" key={i._id}>
                          <Avatar size="sm" name={i.Username} src={i.ProfilePicture} />
                          <Flex flexDirection="column">
                            <Text width="130px">{i.FullName}</Text>
                            <Text fontSize='xs' textColor="gray.400" width="120px">{i.Username}</Text>
                          </Flex>
                          <Link  to={`/socialmedia/profile/${i._id}`}>
                            <Text fontColor="purple.100">
                              View
                            </Text>
                          </Link>
                      </Flex>
                     :
                     null 
                     }
                      </>
                      )
                    })}    
                </Flex>

                <Flex flexDirection="column" justifyContent="flex-start" alignItems="center" width="330px" height="max-content" borderRadius="20px" shadow="md" marginTop="15px">
                    <Flex>
                        <Text>Trending Post</Text>
                    </Flex>                    
                    { postList.length <= 0 ? null : postList.slice(0,5).filter(e => e.Likes.length > 5).map((i, index) => {
                    return (
                    <Flex margin="15px">
                        <Card shadow="sm" padding="20px" width="250px" key={i._id}>
                        <CardHeader>
                            <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar size="xs" name={i.Author.FullName} src={i.Author.ProfilePicture} />
                                <Box>
                                <Heading size='sm'>{i.Author.FullName}</Heading>
                                <Text>{moment(i.Author.createdAt).format('MMMM Do YYYY')}</Text>
                                </Box>
                            </Flex>
                            </Flex>
                        </CardHeader>
                        <Link to={`/socialmedia/${i._id}`}>
                          <CardBody>
                          <video src={i.Documents + "#t=10"}></video>
                          {/* <Text>{parse(i.Content)}</Text> */}
                          </CardBody>
                        </Link>
                        <CardFooter
                          justify='space-between'
                          flexWrap='wrap'
                        >
                        { i.Likes?.length  ?
                          <Button key={index} flex='1' variant='ghost' rightIcon={<AiOutlineLike />} leftIcon={`${Object.keys(i.Likes).length}`}>Like</Button>
                        :
                        null
                        }
                        </CardFooter>
                        </Card>
                    </Flex>
                    )})}
                </Flex>
            </Flex>

        </Flex>
    </>
  )
}

export default SocialMedia