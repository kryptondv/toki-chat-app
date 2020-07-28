import React, { createContext, useReducer } from 'react';
import appReducer from './appReducer';

const initialState = {
  isLoggedIn: false,
  userEmail: '',
  chats: [],
  selectedChat: null,
  showSidebar: true,
  newChatWindow: false,
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

  const selectChat = index => {
    dispatch({
      type: 'SELECT_CHAT',
      payload: index,
    });
  };

  const setNewChatWindow = value => {
    dispatch({
      type: 'SET_NEW_CHAT',
      payload: value,
    });
  };

  const setSidebar = value => {
    dispatch({
      type: 'SET_SIDEBAR',
      payload: value,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setLogIn,
        setUserEmail,
        setChats,
        selectChat,
        setNewChatWindow,
        setSidebar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
