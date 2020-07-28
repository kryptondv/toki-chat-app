import React, { useContext } from 'react';
import { GlobalContext } from '../../context';

import Avatar from './Avatar';

const ChatListItem = ({ chat, index }) => {
  const { userEmail } = useContext(GlobalContext);
  const selectedChat = true;

  const friendEmail = chat.users.filter(user => user !== userEmail)[0];
  const lastMessage =
    chat.messages.length !== 0
      ? chat.messages[chat.messages.length - 1].message
      : '';
  const lastMessagePrev =
    lastMessage.length > 20
      ? lastMessage.substring(0, 20) + ' ...'
      : lastMessage;

  return (
    <div
      // onClick={() => onChatListItemClick(index)}
      className={`list-item ${selectedChat === index ? 'selected' : ''}`}
    >
      <Avatar user={friendEmail} />
      <span>{friendEmail}</span>
      <p>{lastMessagePrev}</p>
    </div>
  );
};

export default ChatListItem;
