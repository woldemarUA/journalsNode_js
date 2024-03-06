const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(180),
      allowNull: false,
      unique: "UNIQ_2DA179776C6E55B5"
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Basic"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    roles: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UNIQ_2DA179776C6E55B5",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nom" },
        ]
      },
    ]
  });
};
