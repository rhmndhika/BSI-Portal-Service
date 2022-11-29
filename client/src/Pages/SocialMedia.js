import React, { useEffect, useContext, useState } from 'react';
import { EmailUser } from '../Helper/EmailUserProvider';
import { ProfileSosmed } from '../Helper/ProfileSosmedProvider';
import Appbar from '../Component/Appbar/Appbar.tsx';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    Spinner
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/card'
import { 
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
    const [ role, setRole ] = useState("");
    const [ profileList, setProfileList ] = useState("");
    const [ image, setImage ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
          setProfileSosmed({...profileSosmed, profilePicture : event.target.files[0]})
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

    useEffect(() => {
        getProfile();
    }, [])
    

  return (
   <>
    <Appbar />
    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
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
                    <Input width="300px" type='text' placeholder='Search....' />
                </InputGroup>
                </Flex>
            </Flex>
        </Flex>

        <Flex className='flexContainerSM' flexDirection="row" justifyContent="space-between" alignItems="flex-start" padding="30px">

            <Flex className='flex-item-1' flexDirection="column" justifyContent="center" alignItems="center">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" border="1px solid" borderRadius="20px" width="320px" height="320px">
                    { isLoading === false ? 
                    <>
                    {profileList.length <= 0 ? <Button onClick={onOpen}>Create Profile</Button> :  profileList.map((i, index) => {
                    return (
                        <Flex flexDirection="column" justifyContent="center" alignItems="center" key={index}>
                            <Flex justifyContent="center" width="300px">
                                {/* <Avatar width="250px" height="250px"  objectFit="cover" src={i.ProfilePicture} crossOrigin="anonymous"/> */}
                                <img width="250px" height="250px" crossOrigin="anonymous" src={i.ProfilePicture} />
                            </Flex>
                            <Text>@{i.FullName}</Text>
                            <Text>{i.Username}</Text>
                        </Flex>
                    )
                    })}
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
                        Summary
                        </Heading>
                    </Box>
                    <Box cursor="pointer">
                        <Heading size='xs' textTransform='uppercase'>
                        Overview
                        </Heading>
                    </Box>
                    <Box cursor="pointer">
                        <Heading size='xs' textTransform='uppercase'>
                        Analysis
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
            >
            Create Post</Button>
            </Flex>

            <Flex className='flex-item-2' width="750px" flexDirection="column">
                <Flex marginTop="15px">
                    <Card shadow="lg" padding="10px">
                    <CardHeader>
                        <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                            <Box>
                            <Heading size='sm'>Segun Adebayo</Heading>
                            <Text>Time</Text>
                            </Box>
                        </Flex>
                        <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                            icon={<BsThreeDotsVertical />}
                        />
                        </Flex>
                    </CardHeader>
                    <Image
                        className='imgPost'
                        objectFit='cover'
                        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Chakra UI'
                        marginTop="10px"
                        maxW="700px"
                        maxH="550px"
                        display="block"
                        marginLeft="auto"
                        marginRight="auto"
                        />
                    <CardBody>
                        <Text padding="15px">
                        With Chakra UI, I wanted to sync the speed of development with the speed
                        of design. I wanted the developer to be just as excited as the designer to
                        create a screen.
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
            </Flex>

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