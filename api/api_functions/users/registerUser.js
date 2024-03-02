// Importer le modèle User depuis les modèles de base de données initialisés
const { User } = require('../../dbModels/dbInit');
// Importer la fonction pour hacher les mots de passe
const { hashPassword } = require('./hashPasswords');

// Fonction asynchrone pour enregistrer un nouvel utilisateur
async function registerUser(req, res) {
  try {
    console.log('serveur registered object ');
    // Extraire le nom, email et mot de passe depuis le corps de la requête
    const { nom, email, password } = req.body;

    // Hacher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer un nouvel utilisateur avec le mot de passe haché
    const user = await User.create({
      nom,
      email,
      password: hashedPassword,
    });

    // Envoyer une réponse avec statut 200 et un message de succès
    res
      .status(200)
      .json({ message: 'Votre inscription a été un succès', user });
  } catch (err) {
    // Gérer les erreurs et envoyer une réponse avec statut 500
    console.error(err);
    res.status(500).json({ message: err.parent.sqlMessage, error: true });
  }
}

// Exporter la fonction registerUser pour l'utiliser dans d'autres parties de l'application
module.exports = { registerUser };
