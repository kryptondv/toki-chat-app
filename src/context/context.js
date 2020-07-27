import React, { createContext, useReducer } from 'react';
import appReducer from './appReducer';

const initialState = {
  isLoggedIn: false
}

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLogIn = value => {
    dispatch({
      type: 'SET_LOG_IN',
      payload: value
    })
  }

 
  return (
    <GlobalContext.Provider value={{ ...state,setLogIn }}>
      {children}
    </GlobalContext.Provider>
  );
}