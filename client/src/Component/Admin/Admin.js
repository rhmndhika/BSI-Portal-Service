import React, { useState, useEffect, useContext } from 'react';
import { EmailUser } from '../../Helper/EmailUserProvider';
import { RoleUser } from '../../Helper/RoleUserProvider';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Appbar from '../Appbar/Appbar.tsx';
import { 
  Button, 
  Flex,
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';

const Admin = () => {

  Axios.defaults.withCredentials = true;

  let navigate = useNavigate();

  const { emailLog, setEmailLog } = useContext(EmailUser);
  const { roleUser, setRoleUser } = useContext(RoleUser);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ username, setUsername ] = useState("");
  const [ title, setTitle ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ input, setInput ] = useState('');
  const [ tags, setTags ] = useState([]);
  const [ isKeyReleased, setIsKeyReleased ] = useState(false);
  const [ isSaving, setIsSaving ] = useState(false);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();
  
    if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }
  
    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }
  
    setIsKeyReleased(false);
  };
  
  const onKeyUp = () => {
    setIsKeyReleased(true);
  }

  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  

  const submitNews = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      await Axios.post(`${process.env.REACT_APP_MY_ENV_VAL}/news/createNews`, {
        Email : emailLog,
        Username : username,
        Title : title,
        Tags : tags,
        Content : message
      }).then((response) => {
        const showToastError = () => {
          toast.error(response.data.errors.Title.message, {
            className : css({
              width: "600px",
              background: "#00FF00 !important"
            }),
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
        }
        if (response.data.errors) {
          // showToastError();
          setIsSaving(false);
          alert(response.data.errors.Title.message);
        } else {
          setTimeout(() => window.location.reload(false), 1000);
        }
      })
    } catch (err) {
      console.log(err);
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

  return (
  <>
  {roleUser !== "Admin" ? <div>NOT ADMIN!!!</div> : 
  <div>
  <Appbar />
  <ToastContainer />
  <Modal
    initialFocusRef={initialRef}
    finalFocusRef={finalRef}
    isOpen={isOpen}
    onClose={onClose}>
    <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create News / Announcement</ModalHeader>
        <ModalCloseButton />
  <form onSubmit={submitNews}>
      <ModalBody pb={6}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input ref={initialRef} value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Tags</FormLabel>
          {tags.map((tag, index) => (
            <div className="tag" key={index}>
              {tag}
              <button onClick={() => deleteTag(index)}>x</button>
            </div>
          ))}
          <Input
          value={input}
          placeholder="Enter a tag"
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={onChange} />
          <FormHelperText><i>Input your tag by pressing enter key. max 4</i></FormHelperText>
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Content</FormLabel>
          <ReactQuill theme="snow" message={message} onChange={setMessage} />
        </FormControl>
      </ModalBody>

      <ModalFooter>
      { isSaving === false ? 
        <Button type="submit" colorScheme='blue' mr={3}>
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
        <Button onClick={() => {
          onClose()
          setMessage("")
        }}>Cancel</Button>
      </ModalFooter>
  </form>
      </ModalContent>
  </Modal>  
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Button mt="300px" onClick={onOpen}>Create News</Button>
    </Flex>
    </div>
    }
  </>
  )
}

export default Admin