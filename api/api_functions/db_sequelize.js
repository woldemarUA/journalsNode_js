// Importer Sequelize pour la connexion à la base de données
const { Sequelize } = require('sequelize');

// Créer une instance de connexion à la base de données avec Sequelize
const sequelizeConn = new Sequelize(
  process.env.MYSQL_DB, // Nom de la base de données
  process.env.MYSQL_USER, // Utilisateur de la base de données
  // 'root',
  process.env.MYSQL_PASSWORD, // Mot de passe de l'utilisateur
  {
    host: 'db', // Hôte de la base de données
    dialect: 'mysql', // Le dialecte de la base de données (MySQL dans ce cas)
    define: {
      timestamps: true, // this will automatically add createdAt and updatedAt fields to your model
      // You can also specify the field names and set timestamps to true, like so:
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// async function testDatabaseConnection() {
//   try {
//     await sequelizeConn.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// testDatabaseConnection();

// Exporter la connexion sequelize pour l'utiliser dans d'autres parties de l'application
module.exports = { sequelizeConn };
