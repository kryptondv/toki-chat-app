import React, { useState, useContext, useRef } from 'react';
import { GlobalContext } from '../../context';
import firebase from 'firebase/app';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  // const { submitMessage, updateMessageRead } = useContext(GlobalContext);
  const { chats, selectedChat, userEmail } = useContext(GlobalContext);

  const msgInput = useRef();

  // add message to database
  const submitMessage = message => {
    const friend = chats[selectedChat].users.filter(
      user => user !== userEmail
    )[0];
    const documentKey = [userEmail, friend].sort().join(':');
    firebase
      .firestore()
      .collection('chats')
      .doc(documentKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: userEmail,
          message: message,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };


  const onFormSubmit = e => {
    e.preventDefault();
    if (message.length > 0) {
      submitMessage(message);
    }
    setMessage('');
    msgInput.current.focus()
  };


  return (
    <form onSubmit={onFormSubmit} className="chat-input">
      <input
        className="chat-input__msg"
        value={message}
        onChange={e => setMessage(e.target.value)}
        type="text"
        placeholder="your message"
        ref={msgInput}
      />
      <button className="chat-input__btn">
        <i className="fas fa-paper-plane"></i>
      </button>
    </form>
  );
};

export default ChatInput;
