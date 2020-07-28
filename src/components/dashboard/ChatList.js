import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import ChatListItem from './ChatListItem';

const ChatList = () => {
  const { chats } = useContext(GlobalContext);

  return (
    <ul className="chat-list">
      {chats.length > 0 &&
        chats.map((chat, index) => (
          <li key={index}>
            <ChatListItem chat={chat} index={index} />
          </li>
        ))}
    </ul>
  );
};

export default ChatList;
