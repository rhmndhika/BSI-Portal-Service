import React, { useEffect, useContext, useState, useRef } from 'react';
import { EmailUser } from '../Helper/EmailUserProvider';
import { ProfileSosmed } from '../Helper/ProfileSosmedProvider';
import { PostSosmed } from '../Helper/PostSosmed';
import Appbar from '../Component/Appbar/Appbar.tsx';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { 
    Box,
    Image,
    Avatar,
    Heading,
    Text,
    IconButton,
    Button,
    Select,
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
    AlertDialogOverlay
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/card'
import { 
    EditIcon,
    SearchIcon
} from '@chakra-ui/icons';
import './SocialMedia.css'
import {
    BsThreeDotsVertical,
    BsChat
} from 'react-icons/bs';
import {
    BiLike
} from 'react-icons/bi';



const SocialMedia = () => {

    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
    
    const { emailLog, setEmailLog } = useContext(EmailUser);
    const { profileSosmed, setProfileSosmed } = useContext(ProfileSosmed);
    const { postSosmed, setPostSosmed } = useContext(PostSosmed);
    const [ role, setRole ] = useState("");
    const [ profileList, setProfileList ] = useState("");
    const [ postList, setPostList ] = useState("");
    const [ allProfile, setAllProfile ] = useState("");
    const [ image, setImage ] = useState(null);
    const [ imagePost, setImagePost ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ currentID, setCurrentID ] = useState("");
    const [ search, setSearch ] = useState("");
    
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
    const cancelRef = React.useRef()

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
          const request = await  Axios.get('https://empty-test-project.herokuapp.com/login')
          .then((response)=> {
            if(response.data.loggedIn === true) {
              setEmailLog(response.data.email);
              setRole(response.data.role);
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

        await fetch("https://empty-test-project.herokuapp.com/socialmedia/create", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            setTimeout(() => window.location.reload(false), 1000);
        })
    }

    const getProfile = () => {
        Axios.get("https://empty-test-project.herokuapp.com/socialmedia").then((response) => {
            setProfileList(response.data);
            setIsLoading(false);
        })
    }

    const submitPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('Username', emailLog);
        formData.append('Title', postSosmed.title);
        formData.append('Content', postSosmed.content);
        formData.append('Documents', postSosmed.documents);

        await fetch("https://empty-test-project.herokuapp.com/socialmedia/post", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            setTimeout(() => window.location.reload(false), 1000);
        })
    }

    const getAllPost = () => {
        Axios.get("https://empty-test-project.herokuapp.com/socialmedia/post/all").then((response) => {
            setPostList(response.data);
            setIsLoading(false);
        })
    }

    const getAllProfile = () => {
      Axios.get("https://empty-test-project.herokuapp.com/socialmedia/all").then((response) => {
          setAllProfile(response.data);
          setIsLoading(false);
      })
    }

    const deleteCurrentID = (id) => {
       Axios.delete(`https://empty-test-project.herokuapp.com/socialmedia/post/delete/${currentID}`).then(() => {
        setPostList(postList.filter((val) => {
          return val._id != currentID
        }))
        onCloseAlertDialog();
      }); 
    }

   
    useEffect(() => {
        getProfile();
        getAllProfile();
        getAllPost();
    }, [])
    

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
              Delete Customer
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

            <FormControl mt={4} isRequired>
              <FormLabel>Title</FormLabel>
              <Input type="text" value={postSosmed.title} name="title" onChange={(e) => {
                setPostSosmed({...postSosmed, title : e.target.value});
              }} />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Content</FormLabel>
              <Textarea value={postSosmed.content} name="content" onChange={(e) => {
                setPostSosmed({...postSosmed, content : e.target.value});
              }} />
            </FormControl>

            <FormControl mt={4} isRequired>
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
        <Flex justifyContent="center">
            <Flex justifyContent="center"  height="60px" margin="20px 10px 0 10px">
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

        <Flex className='flexContainerSM' flexDirection="row" justifyContent="space-between" alignItems="flex-start" padding="30px">

            <Flex className='flex-item-1' flexDirection="column" justifyContent="center" alignItems="center">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" border="1px solid" borderRadius="20px" width="320px" height="320px">
                    { isLoading === false ? 
                    <>
                    {profileList.length <= 0 ? <Button onClick={onOpen}>Create Profile</Button> : 
                        <Flex flexDirection="column" justifyContent="center" alignItems="center" >
                            <Flex justifyContent="center" width="300px">
                                <img style={{width : "250px", height: "250px"}} crossOrigin="anonymous" src={profileList.ProfilePicture} />
                            </Flex>
                            <Text>@{profileList.FullName}</Text>
                            <Text>{profileList.Username}</Text>
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
            Create Post</Button>
            </Flex>
            
            { isLoading === false ? 
            <Flex className='flex-item-2' width="750px" flexDirection="column">
                { postList.length <= 0 ? null : postList.filter(i => 
                i.Username.toLowerCase().includes(search) || 
                i.Title.toLowerCase().includes(search)
                ).map((i, index) => {
                return (
                <Flex marginTop="15px" key={index}>
                    <Card shadow="lg" padding="10px">
                    <CardHeader>
                        <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Link to={`/socialmedia/${i._id}`}>
                                {profileList.length <= 0 ? null : 
                                  <Avatar name={i.Username} src="" />  
                                }
                            </Link>
                            <Box>
                            <Heading size='sm'>{i.Username}</Heading>
                            <Text>Created {moment(i.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                            {/* <Text>{moment(i.createdAt).startOf('day').fromNow()}</Text> */}
                            </Box>
                        </Flex>
                        {/* { i.Username === emailLog 
                        ?
                        <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<EditIcon />}
                        />
                        :
                        <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                        />
                        } */}
                        <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        onClick={() => {
                          setCurrentID(i._id);
                          onOpenAlertDialog(i._id);
                        }}
                        icon={<BsThreeDotsVertical />}
                        />
                        </Flex>
                    </CardHeader>
                    <Text marginTop={30}>
                        {i.Title}
                    </Text>
                    <Image
                        className='imgPost'
                        objectFit='cover'
                        src={i.Documents}
                        alt='Chakra UI'
                        marginTop="10px"
                        // maxW="700px"
                        // maxH="550px"
                        width="700px"
                        height="550px"
                        display="block"
                        marginLeft="auto"
                        marginRight="auto"
                        />
                    <CardBody>
                        <Text padding="15px">
                        {i.Content}
                        </Text>
                    </CardBody>

                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                        '& > button': {
                            minW: '136px',
                        },
                        }}
                    >
                        <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                        Like
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<BsChat />}>
                        Comment
                        </Button>
                    </CardFooter>
                    </Card>
                </Flex>
                )
            })}
            </Flex>
            :
            <Spinner mt={150} />
            }      

            <Flex className='flex-item-3' flexDirection="column" justifyContent="center" alignItems="center" width="300px">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" width="300px" height="max-content" border="1px solid" marginTop="15px">
                    <Flex>
                        <Text>Who to find</Text>
                    </Flex>

                    <Flex flexDirection="row" justifyContent="space-evenly" width="250px" alignItems="center" marginTop="10px">
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        <Text>Username</Text>
                        <Button>View</Button>
                    </Flex>

                    <Flex flexDirection="row" justifyContent="space-evenly" width="250px" alignItems="center" marginTop="10px">
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        <Text>Username</Text>
                        <Button>View</Button>
                    </Flex>

                    <Flex flexDirection="row" justifyContent="space-evenly" width="250px" alignItems="center" marginTop="10px">
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        <Text>Username</Text>
                        <Button>View</Button>
                    </Flex>

                    <Flex flexDirection="row" justifyContent="space-evenly" width="250px" alignItems="center" marginTop="10px">
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        <Text>Username</Text>
                        <Button>View</Button>
                    </Flex> 
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
                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

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
                            sx={{
                            '& > button': {
                                minW: '136px',
                            },
                            }}
                        >
                            <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                            
                            </Button>
                            <Button flex='1' variant='ghost' leftIcon={<BsChat />}>
                            
                            </Button>
                        </CardFooter>
                        </Card>
                    </Flex>
                    
                    <Flex>
                        <Card shadow="lg" padding="20px">
                        <CardHeader>
                            <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

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
                            sx={{
                            '& > button': {
                                minW: '136px',
                            },
                            }}
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