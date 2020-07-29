import React, { useContext } from 'react';
import { GlobalContext } from '../../context';

import Avatar from './Avatar';

const ChatListItem = ({ chat, index }) => {
  const { userEmail, selectChat, selectedChat, setNewChatWindow, setSidebar } = useContext(GlobalContext);

  const friendEmail = chat.users.filter(user => user !== userEmail)[0];
  const lastMessage =
    chat.messages.length !== 0
      ? chat.messages[chat.messages.length - 1].message
      : '';
  const lastMessagePrev =
    lastMessage.length > 20
      ? lastMessage.substring(0, 40) + ' ...'
      : lastMessage;

  const onChatListItemClick = index => {
    setNewChatWindow(false);
    selectChat(index);
    setSidebar(false);
  };


  return (
    <div
      onClick={() => onChatListItemClick(index)}
      className={`chat-list-item ${
        selectedChat === index ? 'chat-list-item--selected' : ''
      }`}
    >
      <div className="chat-list-item__avatar">
        <Avatar user={friendEmail} />
      </div>
      <div className="chat-list-item__right">
        <span className="chat-list-item__contact">{friendEmail}</span>
        <p className="chat-list-item__msg-prev">{lastMessagePrev}</p>
      </div>
    </div>
  );
};

export default ChatListItem;
