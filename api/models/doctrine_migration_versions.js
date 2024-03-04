const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctrine_migration_versions', {
    version: {
      type: DataTypes.STRING(191),
      allowNull: false,
      primaryKey: true
    },
    executed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    execution_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'doctrine_migration_versions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "version" },
        ]
      },
    ]
  });
};
