import React, { useContext } from 'react';
import { GlobalContext } from '../../context';

const ChatMessage = ({ message }) => {
  const { userEmail } = useContext(GlobalContext);

  return (
    <div className={`message message--${message.sender === userEmail ? 'user' : 'friend'}`}>
      {message.message}
    </div>
  );
};

export default ChatMessage;
