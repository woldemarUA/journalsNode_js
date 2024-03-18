const pool = require('../pg_conn/db_connect');
const hashPassword = require('../utilities/hashPassword');

async function register(userData) {
  try {
    const { username, password, email } = userData;

    const checkUserQuery = {
      name: 'checkUserName',
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };
    const checkResult = await pool.query(checkUserQuery);
    if (checkResult.rows.length > 0) {
      throw new Error(`Nom d'utilisateur ${username} existe deja`);
    }

    const hashed_password = await hashPassword(password);

    const query = {
      name: 'registerUser',
      text: 'INSERT INTO users (username, hashed_password, email) VALUES ($1, $2, $3) RETURNING id',
      values: [username, hashed_password, email],
    };

    const result = await pool.query(query);

    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = register;
