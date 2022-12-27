import React, { useEffect, useState, useContext } from 'react';
import { EmailUser } from '../Helper/EmailUserProvider';
import { RoleUser } from '../Helper/RoleUserProvider';
import Axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Appbar from '../Component/Appbar/Appbar.tsx';
import { 
  Flex, 
  Heading, 
  Spinner, 
  Text, 
  Container,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  FormHelperText,
  IconButton
} from '@chakra-ui/react';
import { ArrowUpIcon, CheckIcon, EditIcon, EmailIcon } from '@chakra-ui/icons';
import moment from 'moment';
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../Component/Home/Home.css"
import { BsChatDots } from 'react-icons/bs';

const NewsDetails = () => {

  Axios.defaults.withCredentials = true

  let navigate = useNavigate();

  const { id } = useParams();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);

  const [ newsDetails, setNewsDetails ] = useState([]);
  const { isLoading, setIsLoading } = useState(false);
  const [ isVisible, setIsVisible ] = useState(false);
  const [ isUpdating, setIsUpdating ] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'     
    });
  };

  const handleQuillEdit = (value) => {
    setNewsDetails((prev) => {
      return {
        ...prev,
        Content: value
      }
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 540) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const updateNews = async (e) => {
    e.preventDefault();
    
    try {
      await Axios.put(`https://bsi-portal-service-production.up.railway.app/news/details/${id}/update`, {
        Title : newsDetails.Title,
        Content : newsDetails.Content
      })
      setIsUpdating(true);
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      console.log(err);
    }
  }

  const deleteNews = async () => {
    await Axios.delete(`https://bsi-portal-service-production.up.railway.app/news/details/${id}/delete`);
    setTimeout(() => navigate("/news"), 1000);
  }

  useEffect(() => {
    const cancelToken = Axios.CancelToken.source();

    Axios.get(`https://bsi-portal-service-production.up.railway.app/news/details/${id}`, {
      cancelToken : cancelToken.token,
    }).then((response) => {
      setNewsDetails(response.data);
      setIsLoading(true);
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
    <IconButton
      className="whatsapp_float"
      rel="noopener noreferrer"
      colorScheme='teal'
      aria-label='Search database'
      isRound={true}
      size="lg"
      onClick={onOpen}
      icon={<EditIcon />}
      />
   <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <form onSubmit={updateNews}>
        <ModalContent>
          <ModalHeader>Update News</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>        
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input value={newsDetails.Title} onChange={(e) => setNewsDetails({...newsDetails, Title : e.target.value})} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Content</FormLabel>
              <ReactQuill theme="snow" value={newsDetails.Content} onChange={ handleQuillEdit } />
            </FormControl>
          </ModalBody>

          <ModalFooter>
          { isUpdating === false ? 
            <Button type='submit' colorScheme='blue' mr={3}>
              Update
            </Button>
          :
            <Button
            isLoading
            loadingText='Updating'
            colorScheme='blue'
            variant='outline'
            spinnerPlacement='start'
            mr="10px"
            >
              Updating
            </Button>
          }
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </form>
    </Modal>
   <Appbar />
   {isLoading === false ? 
    <Spinner />
    :
  <Container maxW='550px' maxH="full" mt="50px">
   <Flex flexDirection="column" justifyContent="center" alignItems="center" marginBottom="20px">
    <Container ml="-15px">
      { roleUser === "Admin" ? 
      <Flex justifyContent="space-evenly">
          <Button onClick={deleteNews}>Delete</Button>
      </Flex>
      :
      null
      }

      <Flex>
          <Heading>{newsDetails.Title}</Heading>
      </Flex>

      <Flex mt="10px">
          <Text>{moment(newsDetails.createdAt).format("DD MMMM YYYY, h:mm:ss a")}</Text>
      </Flex>

      <Flex mt="10px">
          <Text>Tags : {newsDetails.Tags}</Text>
      </Flex>
    </Container>

    {/* {Object.entries(newsDetails.Tags).map((i, index) => {
      return (
        <p>{i}</p>
      )
    })} */}

    <Flex flexDirection="column" alignItems="flex-start" mt="50px">
      <Text textAlign="justify" letterSpacing="1px" overflowWrap="break-word">
        {parse(`${newsDetails.Content}`)}
      </Text> 
    </Flex>
   </Flex>
   <Flex flexDirection="row" justifyContent="space-between" alignItems="center" border="1px solid" height="50px" background="gray.100">
      <Flex justifyContent="center" alignItems="center" gap="20px" ml="5px">
        <Text fontSize="sm">If you have any questions, please contact me.</Text>
      </Flex>
      <Flex gap="15px" mr="5px">
        <Button width="90px" size='sm' colorScheme="teal" leftIcon={<CheckIcon />}>Cooffe</Button>
        <Link to="/contact">
            <Button width="90px" size='sm' colorScheme="teal" leftIcon={<EmailIcon />}>Contact</Button>
        </Link>
      </Flex>
   </Flex>
  </Container>
  }
   {isVisible && (
         <IconButton
         onClick={scrollToTop}
         className="edit_float"
         position='fixed'
         bottom='110px'
         right={['16px', '40px']}
         width="60px"
         height="60px"
         zIndex={3}
         rel="noopener noreferrer"
         colorScheme='teal'
         aria-label='scroll up'
         isRound={true}
         size="lg"
         icon={<ArrowUpIcon />}
         />
    )}
   </>
  )
}

export default NewsDetails