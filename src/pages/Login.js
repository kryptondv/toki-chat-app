import React, { useState, useContext } from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from '../context';

import Form from '../components/Form';

const LoginPage = () => {
  const { isLoggedIn, setLogIn } = useContext(GlobalContext);

  const [submitErr, setSubmitErr] = useState(null);

  const submitFormData = data => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => setLogIn(true))
      .catch(error => {
        const errorMessage = error.message;
        setSubmitErr(errorMessage);
      });
  };

  return (
    <>
      <Form submitFormData={submitFormData} submitErr={submitErr} />
      {isLoggedIn && <Redirect to="/dashboard" />}
    </>
  );
};

export default LoginPage;
