const pool = require('../pg_conn/db_connect');
const hashPassword = require('../utilities/hashPassword');

async function register(userData) {
  try {
    const { username, password, email } = userData;
    const hashed_password = await hashPassword(password);

    const query = {
      name: 'registerUser',
      text: 'INSERT INTO users (username, hashed_password, email) VALUES ($1, $2, $3) RETURNING id',
      values: [username, hashed_password, email],
    };

    const result = await pool.query(query);
    // console.log(result.rows);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = register;
