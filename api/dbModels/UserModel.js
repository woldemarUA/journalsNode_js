const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nom: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'nom',
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'Basic',
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'User',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'nom',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'nom' }],
        },
      ],
    }
  );

  return User;
};

module.exports = { UserModel };
