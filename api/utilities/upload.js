// Importer multer pour la gestion des téléchargements de fichiers
const multer = require('multer');
// Importer le module path pour manipuler les chemins de fichiers
const path = require('path');

// Configurer le stockage pour multer
const storage = multer.diskStorage({
  // Définir la destination du fichier téléchargé
  destination: function (req, file, cb) {
    // Dossier de destination par défaut pour les fichiers téléchargés
    let destFolder = 'public/storage/';
    // Vérifier le chemin de la requête pour ajuster le dossier de destination
    console.log('uploade new article');
    console.log(req.path);
    if (
      req.path.includes('/add') ||
      req.path.includes('/edit') ||
      req.path.includes('/upload')
    ) {
      destFolder = 'public/storage/titleImages/';
    }
    // Appeler le callback avec le dossier de destination sélectionné
    cb(null, destFolder);
  },
  // Définir le nom du fichier téléchargé
  filename: function (req, file, cb) {
    // Générer le nom du fichier avec un timestamp pour éviter les doublons
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// Créer l'instance multer avec la configuration de stockage définie
const upload = multer({ storage: storage });

// Exporter l'instance upload pour l'utiliser dans d'autres parties de l'application
module.exports = { upload };
