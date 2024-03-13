// Importations
import React, { useState } from 'react'; // Base de React et le hook useState pour la gestion de l'état
import { useNavigate } from 'react-router-dom'; // Hook pour la navigation programmatique
import { Alert } from 'react-bootstrap'; // Composant de React Bootstrap pour afficher des alertes
import { AuthForm } from './AuthForm'; // Votre composant de formulaire personnalisé
import { login, register } from '../../apiCalls/authCalls'; // Fonctions d'appel d'API

export const AuthPage = ({ formType }) => {
  // Définition du composant avec la prop `formType` pour déterminer la fonction du formulaire
  const [formData, setFormData] = useState({
    // État pour conserver les données du formulaire
    username: '',
    email: '',
    password: '',
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' }); // État pour les messages de retour
  const navigate = useNavigate(); // Hook pour activer la navigation programmatique

  // Gestionnaire pour les changements de champs du formulaire, mettant à jour l'état formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement de soumission par défaut du formulaire

    try {
      if (formType === 'login') {
        // Vérifier si le formulaire est pour la connexion
        const fetchedAuth = await login(formData); // Appeler l'API de connexion avec formData
        localStorage.setItem('token', fetchedAuth.token); // Stocker le jeton reçu dans localStorage
        navigate('/dashboard'); // Naviguer vers le tableau de bord après une connexion réussie
      } else if (formType === 'register') {
        // Vérifier si le formulaire est pour l'inscription
        await register(formData); // Appeler l'API d'inscription avec formData
        setFeedback({
          message: 'Inscription réussie. Veuillez vous connecter.',
          type: 'success',
        }); // Définir le retour de succès
      } else {
        // Emplacement réservé pour la fonctionnalité de mise à jour
        console.log('Fonctionnalité de mise à jour à être implémentée');
      }
    } catch (err) {
      // Gérer toutes erreurs
      setFeedback({ message: err.message, type: 'danger' }); // Définir le retour d'erreur
    }
  };

  return (
    // Rendre le composant
    <div>
      {feedback.message && (
        <Alert variant={feedback.type}>{feedback.message}</Alert>
      )}
      <AuthForm
        formType={formType}
        onSubmit={handleSubmit}
        onChange={handleChange}
        formData={formData}
      />
    </div>
  );
};
