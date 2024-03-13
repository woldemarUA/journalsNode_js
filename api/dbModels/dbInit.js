// Importer la connexion Sequelize et DataTypes depuis le module de configuration de la base de données
const { sequelizeConn } = require('../api_functions/db_sequelize');
const { DataTypes } = require('sequelize');

// Importer les fonctions de modèle pour User et Article
const { UserModel } = require('./UserModel');
const { ArticleModel } = require('./ArticleModel');

// Initialiser les modèles User et Article avec la connexion Sequelize et les DataTypes
const User = UserModel(sequelizeConn, DataTypes);
const Article = ArticleModel(sequelizeConn, DataTypes);

// Définir les associations entre les modèles
// Un utilisateur (User) peut avoir plusieurs articles (Article) : relation "1 à plusieurs"
// User.hasMany(Article, { foreignKey: 'userId' });
// Un article (Article) appartient à un utilisateur (User) : relation "plusieurs à 1"
// Article.belongsTo(User, { foreignKey: 'userId' });

// Exporter les modèles User et Article pour les utiliser dans d'autres parties de l'application
module.exports = { User, Article };
