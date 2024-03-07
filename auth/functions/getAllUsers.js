const pool = require('../pg_conn/db_connect');

async function getAllUsers() {
  try {
    const users = await pool.query(
      'SELECT id, username, email, role, roles FROM users'
    );
    return users.rows;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = getAllUsers;
