// Importer les fonctions pour ajouter et mettre à jour les articles
const { addArticle } = require('../api_functions/articles/addArticle');
const { updateArticle } = require('../api_functions/articles/updateArticle');

// Fonction asynchrone pour gérer le téléchargement de formulaire
const formUpload = async (req, res) => {
  try {
    // Récupérer le chemin de la route pour déterminer l'action (ajouter ou éditer)
    const path = req.route.path;
    console.log('form upload');
    console.log(req.body);
    // Extraire l'userId de la query et les autres informations du corps de la requête
    let { userId } = req.query;
    const { title, author, description, id, is_approved } = req.body;

    // Assurer que userId est un entier
    userId = parseInt(userId, 10);

    let image;
    // Si un fichier est téléchargé, extraire le chemin de l'image
    if (req.file) {
      image = req.file.path.slice(req.file.path.indexOf('/') + 1);
    }

    let msg = {}; // Initialiser l'objet msg pour stocker la réponse des opérations d'ajout/mise à jour

    // Vérifier si l'opération est de modifier un article
    if (path.includes('edit') && id) {
      msg = await updateArticle({
        id,
        title,
        author,
        description,
        userId,
        is_approved,
        ...(image && { image }), // Ajouter conditionnellement l'image à l'objet si elle existe
      });
    } else {
      // Ajouter un nouvel article
      msg = await addArticle({
        title,
        author,
        description,
        userId,
        is_approved,
        ...(image && { image }), // Ajouter conditionnellement l'image à l'objet si elle existe
      });
    }

    // Envoyer la réponse de addArticle ou updateArticle
    res.json(msg);
  } catch (err) {
    // Gérer l'erreur en cas de problème lors du téléchargement/mise à jour de l'article
    console.error(
      `Erreur lors du téléchargement/mise à jour de l'article:`,
      err
    );
    res
      .status(500)
      .send(`Erreur lors du téléchargement/mise à jour de l'article.`);
  }
};

// Exporter formUpload pour l'utiliser dans d'autres parties de l'application
module.exports = formUpload;
