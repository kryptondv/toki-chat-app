import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import firebase from 'firebase/app';

import Button from './Button';
import Logo from '../Logo';
import ChatList from './ChatList';

const Sidebar = () => {
  const { userEmail, showSidebar, setSidebar, setNewChatWindow, selectChat } = useContext(GlobalContext);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const onNewChatBtnClick = () => {
    setNewChatWindow(true);
    selectChat(null);
    setSidebar(false);
  };

  return (
    <section className={`sidebar ${!showSidebar && 'sidebar--hidden'}`}>
      <h1 className="sidebar__heading">{userEmail}</h1>
      <button
        onClick={() => setSidebar(!showSidebar)}
        className="sidebar__toggle"
      >
        {'<'}
      </button>
      <ChatList />
      <div className="sidebar__buttons">
        <Button func={onNewChatBtnClick}>New Chat</Button>
        <Button func={signOut}>Sign out</Button>
      </div>
    </section>
  );
};

export default Sidebar;
