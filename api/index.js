// Charger les variables d'environnement depuis un fichier .env
require('dotenv').config();

// Importation des modules nécessaires
const express = require('express');
const passport = require('passport');

const apiRoutes = require('./routing/api/apiRouter');

const cors = require('cors');

// Définir le port sur lequel le serveur va écouter
const PORT = 3001;
const app = express();

// Utilisation des messages flash dans l'application

app.use(cors());
// Initialisation de Passport (services d'authentification)
app.use(passport.initialize());

// Enregistrement de la stratégie d'authentification
require('./api_functions/passportConfig/passpordConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use('/public/storage', express.static('public/storage'));
// public/storage/
// Définition du moteur de rendu des vues
app.set('view engine', 'ejs');

// Middleware pour rendre 'isAuthenticated' et 'user' disponibles globalement
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});
// app.use((req, res, next) => {
//   res.locals.messages = req.flash();
//   next();
// });

// Configuration des routes
app.use('/', apiRoutes);

// Démarrage du serveur
app.listen(PORT, () => console.log(`Le serveur fonctionne sur ${PORT}`));
