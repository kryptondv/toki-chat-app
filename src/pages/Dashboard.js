import React, { useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from '../context';

import Sidebar from '../components/dashboard/Sidebar';
import Chat from '../components/dashboard/Chat';
import NewChat from '../components/dashboard/NewChat';

const Dashboard = () => {
  const { isLoggedIn, userEmail, setChats, newChatWindow } = useContext(
    GlobalContext
  );

  const onDashboardMount = () => {
    const subscribe = () => {
      firebase
        .firestore()
        .collection('chats')
        .where('users', 'array-contains', userEmail)
        .onSnapshot(res => {
          const userChats = res.docs.map(doc => doc.data());
          setChats(userChats);
        });
    };
    subscribe();
    // clear subscribe on unmount
    return () => {
      subscribe();
    };
  };

  useEffect(onDashboardMount, [userEmail]);

  return (
    <div className="dashboard">
      {/* left side */}
      <Sidebar />

      {/* right side */}
      <main className="dashboard__main">
        {newChatWindow ? <NewChat /> : <Chat />}
      </main>

      {!isLoggedIn && <Redirect to="/login" />}
    </div>
  );
};

export default Dashboard;
