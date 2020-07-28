import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const Chat = () => {
  const [messageRead, setMessageRead] = useState(false);

  const { userEmail, chats, selectedChat } = useContext(GlobalContext);
  const chat = chats[selectedChat];

  useEffect(() => {
    if (chat && chat.messages.length > 0) {
      const selectedChatMessages = chat.messages;
      const lastSender =
        selectedChatMessages[selectedChatMessages.length - 1].sender;
      setMessageRead(chat.receiverHasRead && lastSender === userEmail);
    }
  }, [chat, userEmail]);

  // add scroll to latest message
  return (
    <section className="chat">
      {chat ? (
        <div>
          <h2 className="chat__heading">{chat.users.filter(usr => usr !== userEmail)[0]}</h2>
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
          <ChatInput />
        </div>
      ) : (
        <div>no chat selected</div>
      )}
    </section>
  );
};

export default Chat;
