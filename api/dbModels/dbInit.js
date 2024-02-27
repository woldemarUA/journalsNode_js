const { sequelizeConn } = require('../api_functions/db_sequelize');
const { DataTypes } = require('sequelize');
const { UserModel } = require('./UserModel');
const { ArticleModel } = require('./ArticleModel');

const User = UserModel(sequelizeConn, DataTypes);
const Article = ArticleModel(sequelizeConn, DataTypes);

// Define associations
User.hasMany(Article, { foreignKey: 'userId' });
Article.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Article };
