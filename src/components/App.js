import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalContext } from '../context';

import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ErrorPage from '../pages/ErrorPage';


import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const App = () => {
  const { setLogIn, setUserEmail } = useContext(GlobalContext);

  // check if user is logged in firebase and set state accordingly
  const checkIfLoggedIn = () => {
     firebase.auth().onAuthStateChanged(function (user) {
       if (user) {
         setLogIn(true);
         setUserEmail(user.email)
       } else {
         setLogIn(false);
       }
     });
  }

  useEffect(checkIfLoggedIn, []);

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
};

export default App;
