// Importer Sequelize pour la connexion à la base de données
const { Sequelize } = require('sequelize');

// Créer une instance de connexion à la base de données avec Sequelize
const sequelizeConn = new Sequelize(
  process.env.MYSQL_DB, // Nom de la base de données
  process.env.MYSQL_USER, // Utilisateur de la base de données
  process.env.MYSQL_PASSWORD, // Mot de passe de l'utilisateur
  {
    host: 'db', // Hôte de la base de données
    dialect: 'mysql', // Le dialecte de la base de données (MySQL dans ce cas)
  }
);

// Fonction asynchrone pour tester la connexion à la base de données
async function testConnectionDB() {
  try {
    // Tenter d'authentifier la connexion à la base de données
    await sequelize.authenticate();
    console.log('La connexion a été établie avec succès.');
  } catch (error) {
    // Capturer et afficher l'erreur en cas d'échec de la connexion
    console.error('Impossible de se connecter à la base de données :', error);
  }
}

// Exporter la connexion sequelize pour l'utiliser dans d'autres parties de l'application
module.exports = { sequelizeConn };
