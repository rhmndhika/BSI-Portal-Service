import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import io from 'socket.io-client';
import Axios from 'axios';
import Chat from './Chat';
import './Chat.css';

const socket = io.connect("https://empty-test-project.herokuapp.com");

const ChatIO = () => {

    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
    
    const { emailLog, setEmailLog } = useContext(EmailUser);
    const [ role, setRole ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ room, setRoom ] = useState(2001);
    const [ showChat, setShowChat ] = useState(false);

    const [messageList, setMessageList] = useState([]);


    const joinRoom = () => {
      if (emailLog !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    };

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


       useEffect(() => {
        if (emailLog !== "" && room !== "") {
          socket.emit("join_room", room);
          setShowChat(true);
        }
       }, [])

  
  return (
    <>
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Username..."
            value={emailLog}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={emailLog} room={room} />
        // <Chat />
      )}
    </div>
    </>
  )
}

export default ChatIO