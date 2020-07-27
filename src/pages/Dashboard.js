import React, { useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from '../context';

const Dashboard = () => {
  const { isLoggedIn, userEmail, setChats, chats } = useContext(GlobalContext);

  const onDashboardMount = () => {
    console.log('rendered');
    const subscribe = () => {
      firebase
        .firestore()
        .collection('chats')
        .where('users', 'array-contains', userEmail)
        .onSnapshot(res => {
          const chats = res.docs.map(doc => doc.data());
          setChats(chats);
        });
    };
    if (userEmail) {
      subscribe();
    }
    // clear subscribe on unmount
    return () => {
      subscribe();
    };
   
  }

  useEffect(onDashboardMount, [userEmail]);


  return (
    <div>
      Dashboard
      {!isLoggedIn && <Redirect to="/login" />}
    </div>
  );
}

export default Dashboard;
