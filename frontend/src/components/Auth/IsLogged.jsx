import React from 'react';
import { Navigate } from 'react-router-dom';

const IsLogged = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return (
      <Navigate
        to='/dashboard'
        replace
      >
        {children}
      </Navigate>
    );
  }
  return children;
};

export default IsLogged;
