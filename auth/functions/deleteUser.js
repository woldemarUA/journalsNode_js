const pool = require('../pg_conn/db_connect');

async function deleteUser(id) {
  const query = {
    // give the query a unique name
    name: 'delete-user',
    text: 'DELETE FROM users WHERE id = $1 RETURNING *',
    values: [id],
  };

  const result = await pool.query(query);
  const message =
    result.rowCount === 0
      ? "L'utilisateur n'a pas été supprimé car il n'existe pas"
      : 'Utilisateur supprimé';

  return message;
}

module.exports = deleteUser;
