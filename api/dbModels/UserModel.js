// Définition du modèle UserModel pour Sequelize
const UserModel = (sequelize, DataTypes) => {
  // Créer et retourner le modèle 'User' avec sa structure
  const User = sequelize.define(
    'User', // Nom du modèle
    {
      // Définition des attributs du modèle
      id: {
        autoIncrement: true, // Incrémentation automatique
        type: DataTypes.INTEGER, // Type entier
        allowNull: false, // Non nul
        primaryKey: true, // Clé primaire
      },

      nom: {
        type: DataTypes.STRING(180),
        allowNull: false,
        unique: 'UNIQ_2DA179776C6E55B5',
      },
      role: {
        type: DataTypes.STRING(255), // Chaîne de caractères, maximum 255
        allowNull: false, // Non nul
        defaultValue: 'Basic', // Valeur par défaut 'Basic'
      },
      email: {
        type: DataTypes.TEXT, // Texte long
        allowNull: false, // Non nul
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      roles: {
        type: DataTypes.JSON,
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
          name: 'UNIQ_2DA179776C6E55B5',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'nom' }],
        },
      ],
    }
  );

  return User; // Retourner le modèle User
};

// Exporter le modèle UserModel pour utilisation dans l'application
module.exports = { UserModel };
