import React, { useState, Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArticleForm } from './ArticleForm';
import { addArticle, editArticle } from '../../apiCalls/fetchArticles';
import { Alert } from 'react-bootstrap';
import { useUser } from '../../context/UserProvider';

const ArticleManagement = ({ formType }) => {
  const location = useLocation();
  const { user } = useUser();
  const { userId, username } = user;
  const [formData, setFormData] = useState({
    id: '',
    author: '',
    title: '',
    description: '',
    imageArticle: null,
    userId,
    username,
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    if (location.state && location.state) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...location.state,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      imageArticle: e.target.files[0],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formType === 'add') {
        const response = await addArticle(formData);

        setFeedback({
          message:
            "Journal ajouté avec succès. Il doit être approuvé par l'administrateur",
          type: 'success',
        });
        setFormData({
          id: '',
          author: '',
          title: '',
          description: '',
          imageArticle: null,
          userId,
          username,
        });
      } else if (formType === 'edit') {
        const response = await editArticle(formData);

        setFeedback({
          message: 'Journal édité avec succès',
          type: 'success',
        });
      } else {
        // Emplacement réservé pour la fonctionnalité de mise à jour
        console.log('Fonctionnalité de mise à jour à être implémentée');
      }
    } catch (err) {
      setFeedback({
        message: err.message,
        type: 'danger',
      });
    }
  };

  return (
    <Fragment>
      {feedback.message && (
        <Alert variant={feedback.type}>{feedback.message}</Alert>
      )}
      <ArticleForm
        formType={formType}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onImageChange={handleImageChange}
        formData={formData}
      />
    </Fragment>
  );
};

export default ArticleManagement;
