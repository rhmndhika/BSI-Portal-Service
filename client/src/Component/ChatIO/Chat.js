import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import Axios from "axios";
import './Chat.css';
import { 
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Flex,
  Text
 } from '@chakra-ui/react';
import Appbar from "../Appbar/Appbar.tsx";


const Chat = ({ socket, username, room, id }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');


    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef();

    const handleTyping = () => {
      socket.emit('typing', `${username} is typing`);
    }
  

    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          socketID : socket.id,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
  
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
        
      }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);

    useEffect(() => {
      socket.emit('get-messages-history', room)
      socket.on('output-messages', savedMessage => {
        setMessageList(savedMessage)
      })
    }, [socket]);

  return (
    <div className='App'>
    <div className="chat-window">
    <div className="chat-header">
      <p>Live Chat {room}</p>
    </div>
    <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={username === messageContent.User ? "you" : username !== messageContent.author ? "other" : null}
            >
              <div>
                <div className="message-content">
                    {messageContent.message ?
                    <>
                      <p>{messageContent.message}</p>
                    </> 
                      :
                      <>
                      <p>{typingStatus}</p>
                      <p>{messageContent.Message}</p>
                      <p>{messageContent.message}</p>
                      </>
                    }
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  { messageContent.message ? 
                    <p id="author">{messageContent.author}</p>
                    :
                    <p id="author">{messageContent.User}</p>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
    <div className="chat-footer">
      <input
        type="text"
        value={currentMessage}
        placeholder="Hey..."
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && sendMessage();
        }}
        onKeyDown={handleTyping}
      />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
    </div>
  </div>
  )
}

export default Chat