import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailUser } from '../../Helper/EmailUserProvider';
import io from 'socket.io-client';
import Axios from 'axios';
import Chat from './Chat';
import './Chat.css';
import { Select } from '@chakra-ui/react';

const socket = io.connect("https://bsi-portal-service-production.up.railway.app");

const LiveChat = () => {

    Axios.defaults.withCredentials = true;

    let navigate = useNavigate();
    
    const { emailLog, setEmailLog } = useContext(EmailUser);
    const [ role, setRole ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ room, setRoom ] = useState();
    const [ userId, setUserId ] = useState("");
    const [ showChat, setShowChat ] = useState(false);
    const [users, setUsers] = useState([]);

    const [messageList, setMessageList] = useState([]);

    const joinRoom = () => {
        if (emailLog !== "" && room !== "") {
          socket.emit("join_room", room);
          socket.emit('newUser', { emailLog, socketID: socket.id });
          setShowChat(true);
        }
    };

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

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, users])

  return (
    <div className="App">
    <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.emailLog}</p>
          ))}
        </div>
      </div>
    {!showChat ? (
      <>
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <p>Value : {room}</p>
        <input
          type="text"
          placeholder="Username..."
          value={emailLog}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          />
        <Select placeholder='Select Target to Chat' onChange={(event) => {
            setRoom(event.target.value);
          }}>
            <option value={Math.random()}>Tovan Octa Fedinan</option>
            <option value={Math.random()}>Ismi Rahmawati</option>
            <option value={Math.random()}>Muhammad Ridwan</option>
        </Select>
        <button onClick={joinRoom}>Join A Room</button>
      </div>

      </>
    ) : (
      <Chat socket={socket} username={emailLog} room={room} />
    )}
  </div>
  )
}

export default LiveChat