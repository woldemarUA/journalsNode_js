// Importer les modèles Article et User depuis les modèles de base de données initialisés
const { Article, User } = require('../../dbModels/dbInit');

// Fonction asynchrone pour récupérer tous les articles approuvés
async function fetchApprovedArticles() {
  try {
    const articles = await Article.findAll({
      order: [['createdAt', 'DESC']], // Trier les articles par date de création, du plus récent au plus ancien
      where: { isApproved: true }, // Condition pour filtrer uniquement les articles approuvés
      include: {
        model: User, // Inclure les informations de l'utilisateur associé à chaque article
        attributes: ['nom'], // Sélectionner uniquement le nom de l'utilisateur
      },
    });

    return articles; // Retourner la liste des articles approuvés
  } catch (err) {
    console.error(err); // Afficher l'erreur en cas de problème
    throw err; // Relancer l'erreur pour une gestion ultérieure
  }
}

// Fonction asynchrone pour récupérer tous les articles en attente d'approbation
async function fetchPendingApprovalArticles() {
  try {
    const articles = await Article.findAll({
      where: { isApproved: false }, // Condition pour filtrer uniquement les articles non approuvés
      include: {
        model: User, // Inclure les informations de l'utilisateur associé
        attributes: ['nom'], // Sélectionner uniquement le nom de l'utilisateur
      },
    });

    return articles; // Retourner la liste des articles en attente d'approbation
  } catch (err) {
    console.error(err); // Afficher l'erreur en cas de problème
    throw err; // Relancer l'erreur pour une gestion ultérieure
  }
}

// Fonction asynchrone pour changer le statut d'approbation d'un article à approuvé
async function changeStatus(id) {
  try {
    const msg = await Article.update(
      { isApproved: true }, // Mettre à jour le statut d'approbation à vrai (approuvé)
      {
        where: { id: id }, // Identifier l'article à mettre à jour par son identifiant
      }
    );
    return msg; // Retourner le message de mise à jour
  } catch (err) {
    console.error(err); // Afficher l'erreur en cas de problème
    throw err; // Relancer l'erreur pour une gestion ultérieure
  }
}

// Fonction asynchrone pour récupérer tous les articles d'un utilisateur spécifique
async function fetchUserArticles(userId) {
  try {
    const articles = await Article.findAll({ where: { userId } }); // Filtrer les articles par l'identifiant de l'utilisateur
    return articles; // Retourner la liste des articles de l'utilisateur
  } catch (err) {
    console.error(err); // Afficher l'erreur en cas de problème
    throw err; // Relancer l'erreur pour une gestion ultérieure
  }
}

// Exporter les fonctions pour les utiliser dans d'autres parties de l'application
module.exports = {
  fetchApprovedArticles,
  fetchPendingApprovalArticles,
  changeStatus,
  fetchUserArticles,
};
