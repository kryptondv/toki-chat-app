import React, { createContext, useReducer } from 'react';
import appReducer from './appReducer';

const initialState = {
  isLoggedIn: false,
  userEmail: '',
  chats: [],
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLogIn = value => {
    dispatch({
      type: 'SET_LOG_IN',
      payload: value,
    });
  };

  const setUserEmail = email => {
    dispatch({
      type: 'SET_USER_EMAIL',
      payload: email,
    });
  };

  const setChats = chats => {
    dispatch({
      type: 'SET_CHATS',
      payload: chats,
    });
  };

  return (
    <GlobalContext.Provider
      value={{ ...state, setLogIn, setUserEmail, setChats }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
