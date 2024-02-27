const { pool } = require('./db');
const { hashPassword } = require('./hashPasswords');

async function registerUser(req, res) {
  try {
    console.log('serveur registered obejct ');
    const { nom, email, password } = req.body;
    console.log(nom, email, password);
    const hashedPassword = await hashPassword(password);

    const query = 'INSERT INTO User (nom, email, password) VALUES (?,?,?)';
    const [result] = await pool.execute(query, [nom, email, hashedPassword]);
    console.log('User ID:', result.insertId);

    res.status(200).json({ message: 'Votre registration etait succes' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = { registerUser };
