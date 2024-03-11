// Charger les variables d'environnement depuis un fichier .env
require('dotenv').config();
// STARTED TO REMOVE THE SESSION BASED
// Importation des modules nécessaires
const express = require('express');
const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);
// const passport = require('passport');
const apiRoutes = require('./routing/api/apiRouter');
const authRouter = require('./routing/auth/authRouter');
const frontRouter = require('./routing/frontend/frontRouter');
const flash = require('connect-flash');
const cors = require('cors');

// Définir le port sur lequel le serveur va écouter
const PORT = 3001;
const app = express();

// Options pour le stockage des sessions dans la base de données
const options = {
  host: 'db',
  port: 3306, // Port MySQL par défaut
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

// Création du magasin de sessions
const sessionStore = new MySQLStore(options);

// Initialisation de la session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Utiliser le secret de votre fichier .env
    store: sessionStore, // Utiliser le magasin de sessions MySQL
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // A mettre sur true en production avec HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Exemple : 24 heures
    },
  })
);

// Utilisation des messages flash dans l'application
app.use(flash());
app.use(cors());
// Initialisation de Passport (services d'authentification)
app.use(passport.initialize());
app.use(passport.session());

// Enregistrement de la stratégie d'authentification
require('./api_functions/passportConfig/locaStr');

// Middleware pour analyser le corps des requêtes et servir des fichiers statiques
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Définition du moteur de rendu des vues
app.set('view engine', 'ejs');

// Middleware pour rendre 'isAuthenticated' et 'user' disponibles globalement
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Configuration des routes
app.use('/', frontRouter);
app.use('/auth', authRouter);
app.use('/api', apiRoutes);

// Route pour tester la session
app.get('/test-session', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Nombre de vues : ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Bienvenue sur cette page pour la première fois !');
  }
});

// Démarrage du serveur
app.listen(PORT, () => console.log(`Le serveur fonctionne sur ${PORT}`));
