// Importer les modèles Article et User depuis l'initialisation de la base de données
const { Article, User } = require('../../dbModels/dbInit');

// Fonction asynchrone pour récupérer un article par son identifiant
async function getArticle(id) {
  try {
    // Utiliser findByPk pour trouver l'article par son PK (Primary Key),
    // inclure les informations associées de l'utilisateur (User),
    // mais seulement le nom de l'utilisateur
    const article = await Article.findByPk(id, {
      include: {
        model: User,
        attributes: ['nom'], // 'nom' est l'attribut du modèle User à inclure
      },
    });

    // Retourner l'article trouvé avec les informations de l'utilisateur associé
    return article;
  } catch (err) {
    // Gérer les erreurs en affichant le message d'erreur et relancer l'erreur
    console.error(err);
    throw err; // Relancer l'erreur pour une éventuelle gestion supplémentaire
  }
}

// Exporter la fonction getArticle pour l'utiliser dans d'autres parties de l'application
module.exports = getArticle;
