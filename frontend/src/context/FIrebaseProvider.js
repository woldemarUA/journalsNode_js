import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';

const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ firebase: 'firebse' }}>
      {children}
    </FirebaseContext.Provider>
  );
};
