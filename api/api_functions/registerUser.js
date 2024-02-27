const { User } = require('../dbModels/dbInit');
const { hashPassword } = require('./hashPasswords');

async function registerUser(req, res) {
  try {
    console.log('serveur registered obejct ');
    const { nom, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    // const query = 'INSERT INTO User (nom, email, password) VALUES (?,?,?)';
    // const [result] = await pool.execute(query, [nom, email, hashedPassword]);
    // console.log('User ID:', result.insertId);
    const user = await User.create({
      nom,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: 'Votre registration etait succes', user });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = { registerUser };
