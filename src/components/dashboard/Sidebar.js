import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import firebase from 'firebase/app';

import Button from './Button';
import ChatList from './ChatList';
import SidebarToggler from './SidebarToggler';

const Sidebar = () => {
  const {
    userEmail,
    showSidebar,
    setSidebar,
    setNewChatWindow,
    selectChat,
  } = useContext(GlobalContext);

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
      <div className="sidebar__toggler">
        <SidebarToggler />
      </div>
      <ChatList />
      <div className="sidebar__buttons">
        <Button func={onNewChatBtnClick} icon="fas fa-user-plus">
          Add Friend
        </Button>
        <Button func={signOut} icon="fas fa-sign-out-alt">
          Sign out
        </Button>
      </div>
    </section>
  );
};

export default Sidebar;
