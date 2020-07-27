import React, { useState, useContext } from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from '../context';

import Form from '../components/Form';

const SignUp = () => {
  const { isLoggedIn, setLogIn } = useContext(GlobalContext);
  const [submitErr, setSubmitErr] = useState(null);

  const submitFormData = data => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        const user = {
          email: res.user.email,
        };
        firebase
          .firestore()
          .collection('users')
          .doc(data.email)
          .set(user)
          .then(() => {
            setLogIn(true);
          })
          .catch(error => {
            const errorMessage = error.message;
            setSubmitErr(errorMessage);
          });
      })
      .catch(error => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setSubmitErr(errorMessage);
      });
  };

  return (
    <>
      <Form
        type="signup"
        submitFormData={submitFormData}
        submitErr={submitErr}
      />
      {isLoggedIn && <Redirect to="/dashboard" />}
    </>
  );
};

export default SignUp;
