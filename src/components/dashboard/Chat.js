import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from '../../context';
import firebase from 'firebase/app';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const Chat = () => {
  const [messageRead, setMessageRead] = useState(false);

  const { userEmail, chats, selectedChat } = useContext(GlobalContext);
  const chat = chats[selectedChat];

  const chatMain = useRef();

  useEffect(() => {
    if (chat && chat.messages.length > 0) {
      const selectedChatMessages = chat.messages;
      const lastSender =
        selectedChatMessages[selectedChatMessages.length - 1].sender;
      setMessageRead(chat.receiverHasRead && lastSender === userEmail);
    }
  }, [chat, userEmail]);

  // scroll to latest message
  useEffect(() => {
    if (chatMain.current) {
      chatMain.current.scrollTo(0, chatMain.current.scrollHeight);
    }
  }, [chat]);

  // send read confirmation
  const updateMessageRead = () => {
    const selectedChatMessages = chats[selectedChat].messages;
    const lastSender =
      selectedChatMessages.length > 0
        ? selectedChatMessages[selectedChatMessages.length - 1].sender
        : '';
    // DRY - fix that!!!
    const friend = chats[selectedChat].users.filter(
      user => user !== userEmail
    )[0];
    const documentKey = [userEmail, friend].sort().join(':');
    if (lastSender !== userEmail) {
      firebase
        .firestore()
        .collection('chats')
        .doc(documentKey)
        .update({ receiverHasRead: true });
    }
  };

  return (
    <>
      {chat ? (
        <section className="chat" onClick={updateMessageRead}>
          <h2 className="chat__heading">
            {chat.users.filter(usr => usr !== userEmail)[0]}
          </h2>
          <div className="chat__main" ref={chatMain}>
            <div className="chat__messages">
              {chat.messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {messageRead && (
                <span className="chat__message-read">Message read</span>
              )}
            </div>
          </div>
          <ChatInput />
        </section>
      ) : (
        <section className="no-chat">no chat selected</section>
      )}
    </>
  );
};

export default Chat;
