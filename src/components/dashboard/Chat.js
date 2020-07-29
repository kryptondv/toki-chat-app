import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from '../../context';

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
    if(chatMain.current) {
      chatMain.current.scrollTo(0, chatMain.current.scrollHeight);
    }
  }, [chat]);

  return (
    <>
      {chat ? (
        <section className="chat">
          <h2 className="chat__heading">
            {chat.users.filter(usr => usr !== userEmail)[0]}
          </h2>
          <div className="chat__main" ref={chatMain}>
            {chat.messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {messageRead && (
              <span
                style={{
                  fontSize: '0.6rem',
                  color: 'grey',
                  display: 'block',
                  textAlign: 'right',
                }}
              >
                Message read
              </span>
            )}
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
