import React from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://empty-test-project.herokuapp.com");

const ChatIO = () => {
  return (
    <div>ChatIO</div>
  )
}

export default ChatIO