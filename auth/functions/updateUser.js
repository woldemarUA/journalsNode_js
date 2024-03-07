const pool = require('../pg_conn/db_connect');
const hashPassword = require('../utilities/hashPassword');

async function updateUser({ userId, username, email, password }) {
  let query = 'UPDATE users SET';
  const params = [];

  if (username) {
    params.push(username);
    query += ` username = $${params.length},`; // Ajoute le nom d'utilisateur à la requête
  }

  if (email) {
    params.push(email);
    query += ` email = $${params.length},`; // Ajoute l'email à la requête
  }

  if (password) {
    const hashedPassword = await hashPassword(password); // Hash le mot de passe avant de le stocker
    params.push(hashedPassword);
    query += ` hashed_password = $${params.length},`; // Ajoute le mot de passe haché à la requête
  }

  query = query.slice(0, -1); // Supprime la dernière virgule
  params.push(userId);
  query += ` WHERE id = $${params.length}`; // Ajoute la clause WHERE pour cibler le bon utilisateur

  try {
    const result = await pool.query(query, params);
    if (result.rowCount === 0) {
      return { success: false, message: "Aucune ligne n'a été mise à jour." }; // Indique qu'aucune ligne n'a été mise à jour
    }
    return {
      success: true,
      message: "L'utilisateur a été mis à jour avec succès.", // Indique que la mise à jour a réussi
    };
  } catch (error) {
    console.error(
      'Erreur lors de l’exécution de la requête de mise à jour de l’utilisateur :',
      error
    );
    if (error.code === '23505') {
      // Code d'erreur PostgreSQL pour violation d'unicité
      return {
        success: false,
        message: "Un utilisateur avec le nom d'utilisateur fourni existe déjà.",
      };
    }
    // Gère les autres types d'erreurs ou les erreurs génériques
    return {
      success: false,
      message:
        "Une erreur s'est produite lors de la mise à jour de l'utilisateur.",
    };
  }
}

module.exports = updateUser;
