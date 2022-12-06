import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import io from 'socket.io-client';
import Axios from 'axios';
import Chat from './Chat';
import './Chat.css';
import { Button, Flex, Input, Select, Text } from '@chakra-ui/react';

const socket = io.connect("https://bsi-portal-service-production.up.railway.app");

const LiveChat = () => {

    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
    
    const { emailLog, setEmailLog } = useContext(EmailUser);
    const [ role, setRole ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ room, setRoom ] = useState();
    const [ socketId, setSocketId ] = useState(socket.id);
    const [ showChat, setShowChat ] = useState(false);
    const [ users, setUsers ] = useState([]);

    const [messageList, setMessageList] = useState([]);

    const [ chatMessage, setChatMessage ] = useState({name : "", msg: ""})


    const joinRoom = () => {
        if (emailLog !== "" && room !== "") {
          socket.emit("join_room", room);
          setShowChat(true);
        }
    };

    useEffect(() => {
      socket.emit("updateUsers");
    }, []);

    socket.on("newMessage", newMessage => {
      console.log("Just ariived :", newMessage);
      setMessageList([...messageList, { name : newMessage.name, msg : newMessage.msg}])
    })

    socket.on("userList", userList => {
      setUsers(userList);
      setChatMessage({name : socket.id, msg : chatMessage.msg})
    })

    const handleChange = (e) => {
      setChatMessage({...chatMessage, [e.target.name]: e.target.value})
    }

    const newMessageSubmit = (e) => {
      e.preventDefault();

      const newMessage = {
        name : chatMessage.name,
        msg  :chatMessage.msg
      }

      socket.emit("newMessage", newMessage)

      console.log(newMessage);

      setChatMessage({
        name : socket.id,
        msg : ""
      })
    }

    useEffect(() => {
        async function userExpire2 () {
          const request = await  Axios.get('https://bsi-portal-service-production.up.railway.app/login')
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


       const [ newRoom, setNewRoom ] = useState("");

       const enteringRoom = (e) => {
        setNewRoom(e.target.value)
       }
   

  return (
//     <div className="App">
//     {!showChat ? (
//       <>
//       <div className="joinChatContainer">
//         <h3>Join A Chat</h3>
//         <p>Value : {room}</p>
//         <input
//           type="text"
//           placeholder="Username..."
//           value={emailLog}
//           onChange={(event) => {
//             setUsername(event.target.value);
//           }}
//           />
//         <input
//             type="text"
//             placeholder="Room ID"
//             value={room}
//             onChange={(event) => {
//               setRoom(event.target.value);
//             }}
//           />
//         <button onClick={joinRoom}>Join A Room</button>
//       </div>
//       </>
//     ) : (
//       <Chat socket={socket} username={emailLog} room={room} />
//     )}
//   </div>
    <>
    <Flex flexDirection="row" justifyContent="space-evenly" alignItems="center">

      <Flex justifyContent={"center"} alignItems={"center"}>
        <Text>Connected socket : </Text>
        <Text>{users}</Text>
      </Flex>

      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text marginTop="15px">Chat Messages : </Text>
        <form onSubmit={newMessageSubmit}>
          <Input type="text" name="msg" marginTop="20px" width="300px" value={chatMessage.msg} onChange={handleChange} />
          <Button type="submit">Submit</Button>
        </form>
        <Text style={{border : "1px solid black", width : "300px", height: "200px"}} marginTop="10px">
          <ul style={{listStyle : "none"}}> 
            {messageList.map((messageList, index) => {
              return (
                <li key={index}>
                  <b>{messageList.name} : <i>{messageList.msg}</i></b>
                </li>
              )
            })}
          </ul>
        </Text>
      </Flex>
    </Flex>
        {/* <Flex>
            <p>Value : {newRoom}</p>
            <Select onChange={(e) => {
                setNewRoom(e.target.value)}}>
                <option value="">Select</option>
                <option value="Banana">Banana</option>
                <option value="Apple">Apple</option>
                <option value="Melon">Melon</option>
            </Select>
        </Flex> */}
    </>
  )
}

export default LiveChat