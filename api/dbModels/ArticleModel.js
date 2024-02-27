// const { sequelizeConn } = require('../api_functions/db_sequelize');
// const { Sequelize, DataTypes } = require('sequelize');

const ArticleModel = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      author: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Article',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'fk_user',
          using: 'BTREE',
          fields: [{ name: 'userId' }],
        },
      ],
    }
  );
  return Article;
};

module.exports = { ArticleModel };
