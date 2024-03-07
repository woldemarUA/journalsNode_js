const pool = require('../pg_conn/db_connect');
const hashPassword = require('../utilities/hashPassword');

async function updateUser({ userId, username, email, password }) {
  // Start building the update query
  let query = 'UPDATE users SET';
  const params = [];

  if (username) {
    params.push(username);
    query += ` username = $${params.length},`;
  }

  if (email) {
    params.push(email);
    query += ` email = $${params.length},`;
  }

  if (password) {
    // Hash the password before storing

    const hashedPassword = await hashPassword(password);
    params.push(hashedPassword);
    query += ` hashed_password = $${params.length},`;
  }

  // Remove the last comma
  query = query.slice(0, -1);

  // Add the WHERE clause to target the correct user
  params.push(userId);
  query += ` WHERE id = $${params.length}`;

  // Execute the query
  const result = await pool.query(query, params);
  if (result.rowCount === 0) {
    return false; // Indicate that no row was updated
  }
  return true; // Indicate that the row was updated successfully
}

module.exports = updateUser;
