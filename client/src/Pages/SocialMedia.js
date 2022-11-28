import React, { useEffect, useContext, useState } from 'react';
import { EmailUser } from '../Helper/EmailUserProvider';
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
    Flex
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
    const [ role, setRole ] = useState("");

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
    
  return (
   <>
    <Appbar />
    {1 == 1 ? 
    <div>
        <Flex>
            <Flex justifyContent="center" border="1px solid" width="full" height="60px" margin="20px 10px 0 10px">
                <Flex alignItems="center">
                <InputGroup>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                    />
                    <Input width="500px" type='text' placeholder='Search....' />
                </InputGroup>
                </Flex>
            </Flex>
        </Flex>

        <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-start" padding="30px">

            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" border="1px solid" borderRadius="20px" width="320px" height="320px">
                    <Flex justifyContent="center" width="300px">
                        <Avatar width="250px" height="250px"  objectFit="cover" src="https://picsum.photos/id/237/200/300" />
                    </Flex>
                    <Text>Username</Text>
                    <Text>@Username</Text>
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

            <Flex width="600px" flexDirection="column">
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
                        objectFit='cover'
                        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Chakra UI'
                        marginTop="10px"
                        maxW="600px"
                        maxH="550px"
                    />
                    <CardBody>
                        <Text>
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

            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" width="350px" height="max-content" border="1px solid">
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

                <Flex flexDirection="column" justifyContent="center" alignItems="center" width="350px" height="max-content" border="1px solid" marginTop="20px">
                    <Flex>
                        <Text>Trending Post</Text>
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
    </div>
    :
    <Flex justifyContent="center" alignItems="center" marginTop="50px">
        <Button>
            Create Profile
        </Button>
    </Flex>
    }
   </>
  )
}

export default SocialMedia