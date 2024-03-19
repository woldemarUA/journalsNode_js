import React, { useState } from 'react';
import { Form, Button, FloatingLabel, Image } from 'react-bootstrap';

export const ArticleForm = ({
  formType,
  onSubmit,
  onChange,
  formData,
  onImageChange,
}) => {
  const [switchInput, setSwitchInput] = useState(false);

  return (
    <Form
      className='m-2'
      onSubmit={onSubmit}
    >
      <FloatingLabel
        controlId='title'
        label='Titre'
        className='mb-3'
      >
        <Form.Control
          type='text'
          placeholder='Titre'
          name='title'
          value={formData.title}
          onChange={onChange} // Mettre à jour l'état lors du changement
          autoComplete='new-password'
          required
        />
      </FloatingLabel>
      {formData.image && (
        <Image
          src={formData.image}
          thumbnail
        />
      )}
      <Form.Check
        type='switch'
        id='image-switch'
        label={`${formData.image ? 'Changer' : 'Ajouter'} image`}
        checked={switchInput}
        onChange={() => setSwitchInput(!switchInput)}
        className='mb-3'
      />

      {switchInput && (
        <FloatingLabel
          controlId='image'
          label='Ajouter image'
          className='mb-3'
        >
          <Form.Control
            type='file'
            placeholder='Image'
            name='imageArticle'
            onChange={onImageChange} // Mettre à jour l'état lors du changement
          />
        </FloatingLabel>
      )}

      <FloatingLabel
        controlId='author'
        label='Auteur'
        className='mb-3'
      >
        <Form.Control
          type='text'
          placeholder='Auteur'
          name='author'
          value={formData.author}
          onChange={onChange} // Mettre à jour l'état lors du changement
          autoComplete='new-password'
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId='descirption'
        label='Description'
        className='mb-3'
      >
        <Form.Control
          as='textarea'
          placeholder='Votre descirption de journal'
          name='description'
          value={formData.description}
          onChange={onChange} // Mettre à jour l'état lors du changement
          autoComplete='new-password'
          style={{ height: '8rem' }}
          required
        />
      </FloatingLabel>
      <Button
        variant='outline-secondary'
        type='submit'
        className='my-1 btn-sm'
      >
        Envoyer
      </Button>
    </Form>
  );
};
