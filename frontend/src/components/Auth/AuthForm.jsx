import React from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

export const AuthForm = ({ formType, onSubmit, onChange, formData }) => {
  const isRegister = formType === 'register'; // Détermine si le formulaire est pour l'inscription
  return (
    <Form
      className='m-2'
      onSubmit={onSubmit}
    >
      <FloatingLabel
        controlId='username'
        label='Votre nom utilisateur'
        className='my-1'
      >
        <Form.Control
          type='text'
          name='username'
          value={formData.username} // Composant contrôlé
          onChange={onChange} // Mettre à jour l'état lors du changement
          autoComplete='new-password'
          required
        />
      </FloatingLabel>

      {isRegister && (
        <FloatingLabel
          controlId='email'
          label='Votre email'
          className='my-1'
        >
          <Form.Control
            type='email'
            name='email'
            value={formData.email} // Composant contrôlé
            onChange={onChange} // Mettre à jour l'état lors du changement
            required
            autoComplete='new-password'
          />
        </FloatingLabel>
      )}

      <FloatingLabel
        controlId='password'
        label='Votre mot de passe'
        className='my-1'
      >
        <Form.Control
          type='password'
          name='password'
          value={formData.password} // Composant contrôlé
          onChange={onChange} // Mettre à jour l'état lors du changement
          autoComplete='new-password'
          required
        />
      </FloatingLabel>

      <Button
        variant='outline-secondary'
        type='submit'
        className='my-1 btn-sm'
      >
        Submit
      </Button>
    </Form>
  );
};
