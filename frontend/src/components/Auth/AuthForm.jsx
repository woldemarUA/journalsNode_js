import React from 'react';

export const AuthForm = ({ formType, onSubmit }) => {
  const isRegister = formType === 'register';
  return (
    <form
      className=' m-2'
      onSubmit={onSubmit}
    >
      <div className='form-floating my-1'>
        <input
          type='text'
          className='form-control'
          name='username'
          id='username'
          autoComplete='new-password'
          required
        />
        <label htmlFor='username'>Votre nom d'utilisateur</label>
      </div>
      {isRegister && (
        <div className='form-floating my-1'>
          <input
            type='email'
            className='form-control'
            name='email'
            id='email'
            required
            autoComplete='new-password'
          />
          <label htmlFor='email'>Votre email</label>
        </div>
      )}

      <div className='form-floating my-1'>
        <input
          type='password'
          className='form-control'
          name='password'
          id='password'
          autoComplete='new-password'
          required
        />
        <label htmlFor='password'>Votre mot de pass</label>
      </div>
      <div className='form-floating my-1'>
        <input
          type='submit'
          className='btn btn-outline-secondary btn-sm'
        />
      </div>
    </form>
  );
};
