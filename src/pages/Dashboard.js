import React, { useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from '../context';
import Sidebar from '../components/dashboard/Sidebar';

const Dashboard = () => {
  const { isLoggedIn, userEmail, setChats } = useContext(GlobalContext);

  const onDashboardMount = () => {
    console.log('rendered');
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
   
  }

  useEffect(onDashboardMount, [userEmail]);


  return (
    <div className="dashboard">
      {/* left side */}
      <Sidebar />
      Dashboard
      {!isLoggedIn && <Redirect to="/login" />}
    </div>
  );
}

export default Dashboard;
