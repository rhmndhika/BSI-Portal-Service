import React, { useEffect, useState, useContext } from 'react';
import { EmailUser } from '../Helper/EmailUserProvider';
import { RoleUser } from '../Helper/RoleUserProvider';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
  FormHelperText
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import moment from 'moment';
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewsDetails = () => {

  Axios.defaults.withCredentials = true

  let navigate = useNavigate();

  const { id } = useParams();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);

  const [ newsDetails, setNewsDetails ] = useState([]);
  const { isLoading, setIsLoading } = useState(false);
  const [ isVisible, setIsVisible ] = useState(false);
  const [ title, setTitle ] = useState("");
  const [ message, setMessage ] = useState("");
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 140) {
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

    const formData = new FormData();
      
      formData.append('Title', newsDetails.Title);
      formData.append('Content', newsDetails.Content);
    
      await fetch(`https://bsi-portal-service-production.up.railway.app/news/details/${id}/update`, {
        method: 'PUT',
        body: formData,
      })
      .then((res) => {
        // setTimeout(() => window.location.reload(false), 1200);
        console.log(formData)
      })
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
              <ReactQuill theme="snow" value={newsDetails.Content} message={newsDetails.Content} onChange={(e) => setNewsDetails({...newsDetails, Content : e.target.value})} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </form>
    </Modal>
   <Appbar />
   {isLoading === false ? 
    <Spinner />
    :
  <Container maxW='550px' height="110px" mt="50px">
   <Flex flexDirection="column" justifyContent="center" alignItems="center" marginBottom="20px">
    <Container ml="-15px">
      <Flex justifyContent="space-evenly">
          <Button onClick={onOpen}>Update</Button>
          <Button onClick={deleteNews}>Delete</Button>
      </Flex>

      <Flex>
          <Heading>{newsDetails.Title}</Heading>
      </Flex>

      <Flex mt="10px">
          <Text>{moment(newsDetails.createdAt).format("DD MMMM YYYY, h:mm:ss a")}</Text>
      </Flex>

      <Flex mt="10px">
          <Text>{newsDetails.Tags}</Text>
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
   <Flex border="1px solid" height="350px">

   </Flex>
  </Container>
  }
   {isVisible && (
        <Box
          onClick={scrollToTop}
          position='fixed'
          bottom='20px'
          right={['16px', '84px']}
          zIndex={3}>
          <Button
            size={'sm'}
            rightIcon={<ArrowUpIcon />}
            colorScheme='whatsapp'
            variant='solid'>
            Scroll To Top
          </Button>
        </Box>
    )}
   </>
  )
}

export default NewsDetails