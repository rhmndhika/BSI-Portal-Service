import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import Axios from "axios";
import './Chat.css';
import { Button } from '@chakra-ui/react';

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [ savedMessage, setSavedMessage ] = useState([]);


    const getMessage = () => {
      Axios.get("https://empty-test-project.herokuapp.com/livechat/message").then((response) => {
        setMessageList(response.data);
      })
    }
  
    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
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
      getMessage();
    }, []);
    
  return (
    <div className="chat-window">
    <div className="chat-header">
      <p>Live Chat</p>
    </div>
    <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={username || messageList.User === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                    {messageContent.message ? 
                      <p>{messageContent.message}</p>
                      :
                      <>
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
      />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
  </div>
  )
}

export default Chat