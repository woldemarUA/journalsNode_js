const { sequelizeConn } = require('../api_functions/db_sequelize');
const { DataTypes } = require('sequelize');
const { UserModel } = require('./UserModel');

const User = UserModel(sequelizeConn, DataTypes);

module.exports = { User };
