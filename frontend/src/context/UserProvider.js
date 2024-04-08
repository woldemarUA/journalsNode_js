import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';
import { loginApi, registerApi } from '../apiCalls/authCalls';
import { fetchUsers } from '../apiCalls/userCalls';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [users, setUsers] = useState([]);
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
      }
    } else {
      return {
        token: null,
        userId: null,
        username: null,
        roles: [],
      };
    }
  });
  useEffect(() => {
    setIsAdmin(user?.roles.includes('admin') ?? false);
  }, [user]);

  useEffect(() => {
    try {
      isAdmin && fetchUsers(user.token).then((res) => setUsers(res));
      setRefetchFlag((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  }, [user.token, isAdmin]);
  const login = async (formData) => {
    try {
      const fetchedAuth = await loginApi(formData);
      localStorage.setItem('token', fetchedAuth.token);
      const decoded = jwtDecode(fetchedAuth.token);

      setUser({
        token: fetchedAuth.token,
        userId: decoded.id,
        username: decoded.username,
        roles: decoded.roles,
      });
      if (decoded.roles.includes('admin')) setIsAdmin(true);
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
    isAdmin && setIsAdmin(!isAdmin);
    setUser({ token: null, userId: null, username: null, roles: [] });
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAdmin,
        users,
        logout,
        login,
        register,
        setRefetchFlag,
        refetchFlag,
      }}>
      {children}
    </UserContext.Provider>
  );
};
