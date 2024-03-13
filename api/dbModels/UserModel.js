// Définition du modèle UserModel pour Sequelize
const UserModel = (sequelize, DataTypes) => {
  // Créer et retourner le modèle 'User' avec sa structure
  const User = sequelize.define(
    'Article',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        defaultValue: 'https://tymchenko.fr/images/default2.png',
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
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
      ],
    }
  );

  return User; // Retourner le modèle User
};

// Exporter le modèle UserModel pour utilisation dans l'application
module.exports = { UserModel };
