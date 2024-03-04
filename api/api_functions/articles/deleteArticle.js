// Importer le modèle Article et la fonction deleteFile
const { Article } = require('../../dbModels/dbInit');
const { deleteFile } = require('../../utilities/fileDelete');

// Fonction asynchrone pour supprimer un article
async function deleteArticle(req, res) {
  // Récupérer l'identifiant de l'article à partir des paramètres de la requête
  let id = req.params.id;
  // Assurer que l'id est un entier
  id = parseInt(id, 10);

  try {
    // Trouver l'article par son identifiant pour obtenir le chemin de son image
    const image = await Article.findByPk(id, {
      attributes: ['image'],
    });

    // Si l'image n'est pas une image par défaut, supprimer le fichier de l'image
    if (!image['image'].includes('default')) deleteFile(image['image']);

    // Supprimer l'article de la base de données
    const response = await Article.destroy({
      where: {
        id: id,
      },
    });

    // Répondre avec succès et un message
    res.status(200).json({ response, msg: 'Votre article a été supprimé' });
  } catch (err) {
    // Gérer les erreurs et répondre avec un message d'erreur
    console.error(err);
    res.status(500).json({ error: err });
  }
}

// Exporter la fonction deleteArticle pour utilisation dans d'autres parties de l'application
module.exports = deleteArticle;
