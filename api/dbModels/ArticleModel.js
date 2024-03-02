// Définition du modèle ArticleModel pour Sequelize
const ArticleModel = (sequelize, DataTypes) => {
  // Créer et retourner le modèle 'Article' avec sa structure
  const Article = sequelize.define(
    'Article', // Nom du modèle
    {
      // Définition des attributs du modèle
      id: {
        autoIncrement: true, // Incrémentation automatique
        type: DataTypes.INTEGER, // Type entier
        allowNull: false, // Non nul
        primaryKey: true, // Clé primaire
      },
      author: {
        type: DataTypes.STRING(255), // Chaîne de caractères, maximum 255
        allowNull: false, // Non nul
      },
      userId: {
        type: DataTypes.INTEGER, // Type entier
        allowNull: false, // Non nul
        references: {
          model: 'User', // Référence au modèle User
          key: 'id', // Clé étrangère faisant référence à 'id' dans User
        },
      },
      title: {
        type: DataTypes.STRING(255), // Chaîne de caractères, maximum 255
        allowNull: false, // Non nul
      },
      description: {
        type: DataTypes.TEXT, // Texte long
        allowNull: false, // Non nul
      },
      image: {
        type: DataTypes.STRING(255), // Chaîne de caractères, maximum 255
        allowNull: true, // Peut être nul
      },
      isApproved: {
        type: DataTypes.BOOLEAN, // Booléen
        allowNull: false, // Non nul
        defaultValue: 0, // Valeur par défaut '0' (faux)
      },
    },
    {
      // Options supplémentaires du modèle
      sequelize, // Instance de connexion Sequelize
      tableName: 'Article', // Nom de la table
      timestamps: true, // Active les timestamps (createdAt, updatedAt)
      indexes: [
        // Définition des index
        {
          name: 'PRIMARY', // Index primaire
          unique: true, // Unique
          using: 'BTREE', // Utilisation d'un B-Tree
          fields: [{ name: 'id' }], // Sur le champ 'id'
        },
        {
          name: 'fk_user', // Index sur la clé étrangère 'userId'
          using: 'BTREE', // Utilisation d'un B-Tree
          fields: [{ name: 'userId' }], // Sur le champ 'userId'
        },
      ],
    }
  );
  return Article; // Retourner le modèle Article
};

// Exporter le modèle ArticleModel pour utilisation dans l'application
module.exports = { ArticleModel };
