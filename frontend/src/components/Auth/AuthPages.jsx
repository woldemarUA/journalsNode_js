import React, { useEffect, useState } from 'react';

import { login, register } from '../../apiCalls/authCalls';

import { useNavigate } from 'react-router-dom';

import { AuthForm } from './AuthForm';


// { formType, onSubmit }

// {
//   "token": ,
//   "userPayload": {
//       "id": 2,
//       "email": "another@email.route",
//       "role": null,
//       "username": "frenchMan3"
//   }
// }
// "username": "frenchMan2",
//     "password": "userpassword",
//     "email":"another@email.route"

export const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const fetchedAuth = await login({ username, password });

      const { token } = fetchedAuth;
      localStorage.setItem('token', token);
      // localStorage.setItem('user', userPayload);

      navigate('/dashboard');
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div>
      {error && <div className='text-danger'> {error.message}</div>}
      <AuthForm
        formType={'login'}
        onSubmit={handleLogin}
      />
    </div>
  );
};
export const RegisterPage = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    console.log('register');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    console.log(username, password, email);
  };
  return (
    <div>
      <AuthForm
        formType={'register'}
        onSubmit={handleRegister}
      />
    </div>
  );
};
export const UpdateUserPage = () => {
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log('update user');
  };
  return (
    <div>
      <AuthForm
        formType={'update'}
        onSubmit={handleUpdate}
      />
    </div>
  );
};
