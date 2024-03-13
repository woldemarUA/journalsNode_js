// Définition du modèle ArticleModel pour Sequelize
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
        defaultValue: 'storage/default2.png',
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

  return Article; // Retourner le modèle Article
};
// const ArticleModel = (sequelize, DataTypes) => {
//   const Article = sequelize.define(
//     'Article',
//     {
//       id: {
//         autoIncrement: true,
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//       },
//       author: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       title: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       username: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       image: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//       },
//       is_approved: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//       },
//     },
//     {
//       sequelize,
//       tableName: 'Article',
//       timestamps: true,
//       indexes: [
//         {
//           name: 'PRIMARY',
//           unique: true,
//           using: 'BTREE',
//           fields: [{ name: 'id' }],
//         },
//       ],
//     }
//   );
//   return Article; // Retourner le modèle Article
// };

// Exporter le modèle ArticleModel pour utilisation dans l'application
module.exports = { ArticleModel };
