// Définition du modèle ArticleModel pour Sequelize
const ArticleModel = (sequelize, DataTypes) => {
  // Créer et retourner le modèle 'Article' avec sa structure
  // const Article = sequelize.define(
  //   'Article', // Nom du modèle
  //   {
  //     // Définition des attributs du modèle
  //     id: {
  //       autoIncrement: true, // Incrémentation automatique
  //       type: DataTypes.INTEGER, // Type entier
  //       allowNull: false, // Non nul
  //       primaryKey: true, // Clé primaire
  //     },
  //     author: {
  //       type: DataTypes.STRING(255), // Chaîne de caractères, maximum 255
  //       allowNull: false, // Non nul
  //     },
  //     userId: {
  //       type: DataTypes.INTEGER, // Type entier
  //       allowNull: false, // Non nul
  //       references: {
  //         model: 'User', // Référence au modèle User
  //         key: 'id', // Clé étrangère faisant référence à 'id' dans User
  //       },
  //     },
  //     title: {
  //       type: DataTypes.STRING(255), // Chaîne de caractères, maximum 255
  //       allowNull: false, // Non nul
  //     },
  //     description: {
  //       type: DataTypes.TEXT, // Texte long
  //       allowNull: false, // Non nul
  //     },
  //     image: {
  //       type: DataTypes.STRING(255), // Chaîne de caractères, maximum 255
  //       allowNull: true, // Peut être nul
  //     },
  //     is_approved: {
  //       type: DataTypes.BOOLEAN, // Booléen
  //       allowNull: false, // Non nul
  //       defaultValue: 0, // Valeur par défaut '0' (faux)
  //     },
  //   },
  //   {
  //     // Options supplémentaires du modèle
  //     sequelize, // Instance de connexion Sequelize
  //     tableName: 'Article', // Nom de la table
  //     timestamps: true, // Active les timestamps (createdAt, updatedAt)
  //     indexes: [
  //       // Définition des index
  //       {
  //         name: 'PRIMARY', // Index primaire
  //         unique: true, // Unique
  //         using: 'BTREE', // Utilisation d'un B-Tree
  //         fields: [{ name: 'id' }], // Sur le champ 'id'
  //       },
  //       {
  //         name: 'fk_user', // Index sur la clé étrangère 'userId'
  //         using: 'BTREE', // Utilisation d'un B-Tree
  //         fields: [{ name: 'userId' }], // Sur le champ 'userId'
  //       },
  //     ],
  //   }
  // );
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
      is_approved: {
        type: DataTypes.BOOLEAN,
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
          name: 'IDX_23A0E6664B64DCC',
          using: 'BTREE',
          fields: [{ name: 'userId' }],
        },
      ],
    }
  );
  return Article; // Retourner le modèle Article
};

// Exporter le modèle ArticleModel pour utilisation dans l'application
module.exports = { ArticleModel };
