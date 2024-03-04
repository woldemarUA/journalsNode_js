// Importer le modèle Article depuis les modèles de base de données
const { Article } = require('../../dbModels/dbInit');

// Définir une fonction asynchrone pour ajouter un article à la base de données
async function addArticle(articleData) {
  try {
    // Extraire les données de l'article depuis l'argument articleData
    const { title, author, description, userId, is_approved } = articleData;
    // Utiliser une image par défaut si aucune image n'est fournie
    const image = articleData['image']
      ? articleData['image']
      : 'storage/default2.png';
    // Attention : si 'storage/default2.png' est modifié, le changer également dans deleteArticle

    // Créer un nouvel article dans la base de données avec les données fournies
    const article = await Article.create({
      title,
      author,
      description,
      userId,
      image,
      is_approved,
    });

    // Retourner un message de succès et l'article ajouté
    return { message: 'Votre article a été ajouté avec succès', article };
  } catch (err) {
    // Gérer les erreurs éventuelles et retourner un message d'erreur
    console.error(err);
    return { message: "Erreur lors de l'ajout de l'article", err };
  }
}

// Exporter la fonction addArticle pour l'utiliser ailleurs dans l'application
module.exports = { addArticle };
