const express = require('express'); // Importation du module express pour créer le serveur
const router = express.Router(); // Création d'un nouveau routeur express
const passport = require('passport'); // Importation de Passport pour l'authentification
const jwt = require('jsonwebtoken'); // Importation de jsonwebtoken pour la gestion des tokens JWT

const register = require('../functions/registerUser'); // Fonction pour enregistrer un nouvel utilisateur
const getAllUsers = require('../functions/getAllUsers'); // Fonction pour récupérer tous les utilisateurs
const getUserById = require('../functions/getUserById'); // Fonction pour récupérer un utilisateur par son ID
const deleteUser = require('../functions/deleteUser'); // Fonction pour supprimer un utilisateur
const updateUser = require('../functions/updateUser'); // Fonction pour mettre à jour un utilisateur
const extractId = require('../utilities/extractId'); // Fonction utilitaire pour extraire l'ID de l'utilisateur depuis la requête

router.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const msg = await register(userData);
    res.status(200).json(msg);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local',
    {
      session: false,
    },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        // auth etait rejeté pas de utilisateur
        return res.status(401).json({ message: info.message });
      }
      // generation JWT token
      const userPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
      };
      const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });
      res.json({ token, userPayload });
    }
  )(req, res, next);
});

router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const id = extractId(req);

    const user = await getUserById(id);
    if (!user) {
      // si l,utilisateur netait trouvee a 404 Not Found reponse
      return res.status(404).json({ message: 'Pas des utilisateur' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const id = extractId(req);

    const msg = await deleteUser(id);
    res.status(200).json({ message: msg });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});

router.patch('/users/update/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;

  try {
    // Appeler updateUser et attendre sa réponse
    const updateResponse = await updateUser({
      userId,
      username,
      email,
      password,
    });

    // Vérifier la propriété success de la réponse
    if (!updateResponse.success) {
      // Si success est faux, utiliser le message de la réponse pour le statut d'erreur
      // Cela pourrait être un 404 si aucun utilisateur n'a été trouvé, ou un 400 s'il y avait un doublon de nom d'utilisateur, etc.
      // Ici, vous pourriez décider du code de statut en fonction du message ou ajouter plus de logique pour différencier
      return res.status(400).json({ message: updateResponse.message });
    }

    // Si success est vrai, procéder à l'envoi de la réponse de succès
    res
      .status(200)
      .json({ message: "L'utilisateur a été mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'utilisateur.",
      error, // Utilisation du raccourci ES6 pour error: error
    });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const msg = req.body;
    console.log(msg);
    res.status(200).json(msg);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
// router.post('/token', async (req, res) => {
//   try {
//     const msg = req.body;
//     console.log(msg);
//     res.status(200).json(msg);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });
// router.post('/verify', async (req, res) => {
//   try {
//     const msg = req.body;
//     console.log(msg);
//     res.status(200).json(msg);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });
module.exports = router;
