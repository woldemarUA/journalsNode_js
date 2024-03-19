import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginApi, registerApi } from '../apiCalls/authCalls';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return {
          token,
          userId: decoded.id,
          username: decoded.username,
          roles: decoded.roles,
        };
      } catch (err) {
        console.error('Erreur decoder JWT:', err);
        return {
          token: null,
          userId: null,
          username: null,
          roles: null,
        };
      }
    }
  });

  const login = async (formData) => {
    try {
      const fetchedAuth = await loginApi(formData);
      localStorage.setItem('token', fetchedAuth.token);
      const decoded = jwtDecode(fetchedAuth.token);

      setUser({
        userId: decoded.id,
        username: decoded.username,
        roles: decoded.roles,
      });

      // Stocker le jeton reçu dans localStorage
      navigate('/dashboard'); // Naviguer vers le tableau de bord après une connexion réussie
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const register = async (formData) => {
    try {
      await registerApi(formData);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser({ token: null, userId: null, username: null });
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, logout, login, register }}>
      {children}
    </UserContext.Provider>
  );
};
