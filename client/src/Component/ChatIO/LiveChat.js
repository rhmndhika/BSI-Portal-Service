import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import io from 'socket.io-client';
import Axios from 'axios';
import Chat from './Chat';
import './Chat.css';
import { Button, Flex, Input, Select, Text } from '@chakra-ui/react';
import ScrollToBottom from "react-scroll-to-bottom";
import Appbar from "../Appbar/Appbar.tsx";

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

    const [ chatMessage, setChatMessage ] = useState({name : "", msg: "", room : "", isPrivate : false});
    const [ currentRoom, setCurrentRoom ] = useState("General Chat");


    const joinRoom = () => {
        if (emailLog !== "" && room !== "") {
          socket.emit("join_room", room);
          setShowChat(true);
        }
    };

    useEffect(() => {
      socket.emit("userJoin", emailLog);
    }, [emailLog, users]);

    socket.on("newMessage", newMessage => {
      console.log("Just ariived :", newMessage);
      setMessageList([...messageList, { name : newMessage.name, msg : newMessage.msg, isPrivate : newMessage.isPrivate }])
    })

    socket.on("userList", userList => {
      setUsers(userList);
      setChatMessage({name : emailLog, msg : chatMessage.msg})
    })

    const handleChange = (e) => {
      setChatMessage({...chatMessage, [e.target.name]: e.target.value})
    }

    const newMessageSubmit = (e) => {
      e.preventDefault();

      
      const newMessage = {
        name : chatMessage.name,
        msg  :chatMessage.msg,
        room : currentRoom,
        isPrivate : isChatPrivate(currentRoom, users)
      }
      
      if (newMessage !== "" ) {
        socket.emit("newMessage", newMessage)

        setChatMessage({
          name : emailLog,
          msg : ""
        })
      } 
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


       const enteringRoom = (e) => {
        let oldRoom = currentRoom
        let newRoom = e.target.textContent
        setCurrentRoom(newRoom);
        socket.emit("roomEntered", { oldRoom, newRoom});
        setMessageList([]);
       }

       const isChatPrivate = (roomName, userList) => {
        let isPrivate = false
        userList.forEach(userName => {
          if(userName === roomName) {
            isPrivate = true
          }
        })
        return isPrivate
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
    <Appbar />
    <Flex flexDirection="row" justifyContent="space-evenly" alignItems="center">

      <Flex flexDirection="column" justifyContent={"center"} alignItems={"center"}>

        <Flex flexDirection="column" justifyContent={"center"} alignItems={"center"}>
          <Flex>
            <Text>Chat Rooms : </Text>
          </Flex>
          <Flex>
            <ul style={{listStyle : "none", cursor : "pointer"}}>
              <li style={{display : "flex", justifyContent : "center"}} onClick={enteringRoom}>General Chat</li>
              <li style={{display : "flex", justifyContent : "center"}} onClick={enteringRoom}>Apple</li>
              <li style={{display : "flex", justifyContent : "center"}} onClick={enteringRoom}>Banana</li>
              <li style={{display : "flex", justifyContent : "center"}} onClick={enteringRoom}>Melon</li>
            </ul>
          </Flex>
        </Flex>
       
       
        <Flex flexDirection="column" justifyContent={"center"} alignItems={"center"} mt="20px">
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Text>User Online: </Text>
          </Flex>
          <Flex justifyContent={"center"} alignItems={"center"}>
          <ul style={{listStyle : "none"}}>
            {users.map((user) => {
              return (
                <>
                <Flex justifyContent="center" alignItems="center">
                { user === emailLog ?
                  <li style={{cursor : "pointer"}} key={user} onClick={enteringRoom}>{user}(you)</li>
                  :
                  <li style={{cursor : "pointer"}} key={user} onClick={enteringRoom}>{user}</li>
                }
                </Flex>
                </>
              )
            })}
          </ul>
          </Flex>
        </Flex>

      </Flex>

      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        {/* <Text marginTop="15px">Chat Messages ({currentRoom})</Text>
        <form onSubmit={newMessageSubmit}>
          <Input type="text" name="msg" marginTop="20px" width="300px" value={chatMessage.msg} onChange={handleChange} />
          <Button type="submit">Submit</Button>
        </form>
        <Text style={{border : "1px solid black", width : "300px", height: "200px"}} marginTop="10px">
          <ul style={{listStyle : "none"}}> 
            {messageList.map((messageList, index) => {
              return (
                <li key={index}>
                  <b>{messageList.name}:</b> 
                  <i>
                    <span style={{color : messageList.isPrivate ? "red" : "black"}}>
                      {messageList.msg}
                    </span>
                  </i>
                </li>
              )
            })}
          </ul>
        </Text> */}
        <Flex>
        <div className="chat-window">
          {currentRoom.length > 12 ? 
           <div className="chat-header1">
            <p>Chat Messages ({currentRoom})</p>
           </div>
           :
          <div className="chat-header">
            <p>Chat Messages ({currentRoom})</p>
          </div>
          }
        <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
          return (
            <div
              className="message"
              id={emailLog === messageContent.name ? "you" : emailLog !== messageContent.name ? "other" : null}
            >
              <div>
                <div className="message-content">
                  <span style={{color : messageContent.isPrivate ? "red" : "white"}}>
                      {messageContent.msg}
                  </span>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
      </div>
        <div className="chat-footer">
        <form onSubmit={newMessageSubmit}>
          {/* <Input type="text" name="msg" marginTop="20px" width="300px" value={chatMessage.msg} onChange={handleChange} />
          <Button type="submit">Submit</Button> */}
          <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <input
            type="text"
            name="msg"
            value={chatMessage.msg}
            placeholder="Hey..."
            onChange={handleChange} 
            />
          <Button type="submit">&#9658;</Button>
          </Flex>
          </form>
        </div>
        </div>
        </Flex>
      </Flex>
    </Flex>
    </>
  )
}

export default LiveChat