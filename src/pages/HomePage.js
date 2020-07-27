import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { GlobalContext } from '../context';

const HomePage = () => {
  const { isLoggedIn } = useContext(GlobalContext);

  return (
    <>
      {isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
    </>
  );
}

export default HomePage;
