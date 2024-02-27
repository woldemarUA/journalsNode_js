const { pool } = require('./db');

async function getUsers(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM User');
    res.status(200).json(rows); // Use .json() for setting Content-Type to application/json
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = { getUsers };
