import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import firebase from 'firebase/app';

import Button from './Button';
import Logo from '../Logo';
import ChatList from './ChatList';

const Sidebar = () => {
  const { userEmail } = useContext(GlobalContext);

  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="sidebar">
      <Logo />
      <h1 className="sidebar__heading">{userEmail}</h1>
      <ChatList />
      <Button func={signOut}>Sign out</Button>
    </div>
  );
};

export default Sidebar;