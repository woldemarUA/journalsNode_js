// Importer le module fs pour les opérations sur le système de fichiers
const { log } = require('console');
const fs = require('fs');
// Importer le module path pour la manipulation des chemins de fichiers
const path = require('path');

// Définir une fonction pour supprimer un fichier à partir d'un chemin relatif
function deleteFile(relativePath) {
  console.log('backend deletefile');
  console.log(relativePath);
  const searchTerm = 'titleImages';

  // Construire le chemin absolu du fichier à supprimer
  const filePath = path.join(
    __dirname,
    '..',
    '/public/storage/',
    relativePath.slice(relativePath.indexOf(searchTerm))
  );
  console.log(filePath);
  // Utiliser fs.unlink pour supprimer le fichier
  fs.unlink(filePath, (err) => {
    // Gérer les erreurs lors de la suppression du fichier
    if (err) {
      console.error(
        "Une erreur s'est produite lors de la suppression du fichier :",
        err
      );
    } else {
      // Confirmer la suppression réussie du fichier
      console.log('Fichier supprimé avec succès');
    }
  });
}

// Exporter la fonction deleteFile pour l'utiliser dans d'autres parties de l'application
module.exports = { deleteFile };
