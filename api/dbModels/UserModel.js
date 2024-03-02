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
        type: DataTypes.STRING(255), // Chaîne de caractères, maximum 255
        allowNull: false, // Non nul
        unique: 'nom', // Nom unique
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
        type: DataTypes.TEXT, // Texte long
        allowNull: false, // Non nul
      },
    },
    {
      // Options supplémentaires du modèle
      sequelize, // Instance de connexion Sequelize
      tableName: 'User', // Nom de la table
      timestamps: false, // Désactiver les timestamps (createdAt, updatedAt)
      indexes: [
        // Définition des index
        {
          name: 'PRIMARY', // Index primaire
          unique: true, // Unique
          using: 'BTREE', // Utilisation d'un B-Tree
          fields: [{ name: 'id' }], // Sur le champ 'id'
        },
        {
          name: 'nom', // Index sur le nom
          unique: true, // Unique
          using: 'BTREE', // Utilisation d'un B-Tree
          fields: [{ name: 'nom' }], // Sur le champ 'nom'
        },
      ],
    }
  );

  return User; // Retourner le modèle User
};

// Exporter le modèle UserModel pour utilisation dans l'application
module.exports = { UserModel };
