// Importer les fonctions pour ajouter et mettre à jour les articles
const { addArticle } = require('../api_functions/articles/addArticle');
const { updateArticle } = require('../api_functions/articles/updateArticle');

// Fonction asynchrone pour gérer le téléchargement de formulaire
const formUpload = async (req, res) => {
  try {
    // Récupérer le chemin de la route pour déterminer l'action (ajouter ou éditer)
    const path = req.route.path;

    // Extraire l'userId de la query et les autres informations du corps de la requête

    const { title, author, description, id, is_approved, userId, username } =
      req.body;
    console.log('reqbody', req.body);
    console.log(`username  ${username}`);
    // Assurer que userId est un entier
    // userId = parseInt(userId, 10);

    let image;
    // Si un fichier est téléchargé, extraire le chemin de l'image
    if (req.file) {
      console.log(req.file.filename);
      const baseURI = process.env.IMAGE_UPLOAD_PATH;
      image =
        process.env.IMAGE_UPLOAD_PATH + '/titleImages/' + req.file.filename;
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
        username,
        is_approved,
        ...(image && { image }), // Ajouter conditionnellement l'image à l'objet si elle existe
      });
    } else {
      // Ajouter un nouvel article
      console.log('from add article before adding to the db', username);
      msg = await addArticle({
        title,
        author,
        description,
        userId,
        username,
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
