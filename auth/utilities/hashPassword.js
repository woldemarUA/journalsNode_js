const bcrypt = require('bcrypt');

async function hashPassword(password) {
  // Le facteur de coût contrôle le temps nécessaire pour calculer un seul hachage bcrypt.
  // Plus le coût est élevé, plus il y a de tours de hachage. Augmenter cette valeur rendra le processus de hachage du mot de passe plus lent et plus résistant aux attaques par force brute.
  const saltRounds = 10;
  try {
    // Hachage du mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log('Mot de passe haché :', hashedPassword);
    return hashedPassword;
  } catch (error) {
    // Gestion des erreurs de hachage
    console.error('Erreur lors du hachage du mot de passe :', error);
  }
}

// Exportation de la fonction hashPassword pour une utilisation dans d'autres parties de l'application
module.exports = hashPassword;
