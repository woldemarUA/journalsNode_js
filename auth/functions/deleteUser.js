const pool = require('../pg_conn/db_connect');

async function deleteUser(id) {
  const query = {
    // give the query a unique name
    name: 'delete-user',
    text: 'DELETE FROM users WHERE id = $1',
    values: [id],
  };

  const res = await pool.query(query);
  const message = res.rows[0];

  return message;
}

module.exports = deleteUser;
