const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messenger_messages', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headers: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    queue_name: {
      type: DataTypes.STRING(190),
      allowNull: false
    },
    available_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "(DC2Type:datetime_immutable)"
    },
    delivered_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "(DC2Type:datetime_immutable)"
    }
  }, {
    sequelize,
    tableName: 'messenger_messages',
    timestamps: true,
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
        name: "IDX_75EA56E0FB7336F0",
        using: "BTREE",
        fields: [
          { name: "queue_name" },
        ]
      },
      {
        name: "IDX_75EA56E0E3BD61CE",
        using: "BTREE",
        fields: [
          { name: "available_at" },
        ]
      },
      {
        name: "IDX_75EA56E016BA31DB",
        using: "BTREE",
        fields: [
          { name: "delivered_at" },
        ]
      },
    ]
  });
};
