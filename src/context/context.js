import React, { createContext, useReducer } from 'react';
import appReducer from './appReducer';

const initialState = {}

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <GlobalContext.Provider value={{ ...state }}>
      {children}
    </GlobalContext.Provider>
  );
}