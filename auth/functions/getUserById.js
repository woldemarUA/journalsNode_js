const pool = require('../pg_conn/db_connect');

async function getUserById(id) {
  try {
    const query = {
      // give the query a unique name
      name: 'fetch-user',
      text: 'SELECT id, username, email, roles FROM users WHERE id = $1',
      values: [id],
    };

    const res = await pool.query(query);
    const user = res.rows[0];

    return user;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = getUserById;
