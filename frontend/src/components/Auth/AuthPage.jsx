// Importations
import React, { useState } from 'react'; // Base de React et le hook useState pour la gestion de l'état
import { Alert } from 'react-bootstrap'; // Composant de React Bootstrap pour afficher des alertes
import { AuthForm } from './AuthForm'; // Votre composant de formulaire personnalisé
import { useUser } from '../../context/UserProvider';

export const AuthPage = ({ formType }) => {
  // Définition du composant avec la prop `formType` pour déterminer la fonction du formulaire
  const [formData, setFormData] = useState({
    // État pour conserver les données du formulaire
    username: '',
    email: '',
    password: '',
  });
  const { login, register } = useUser();
  const [feedback, setFeedback] = useState({ message: '', type: '' }); // État pour les messages de retour

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
        await login(formData);
      } else if (formType === 'register') {
        // Vérifier si le formulaire est pour l'inscription
        await register(formData);
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

      setFeedback({ message: err.response.data.error, type: 'danger' }); // Définir le retour d'erreur
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
