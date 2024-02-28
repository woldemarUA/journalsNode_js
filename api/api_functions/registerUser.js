const { User } = require('../dbModels/dbInit');
const { hashPassword } = require('./hashPasswords');

async function registerUser(req, res) {
  try {
    console.log('serveur registered obejct ');
    const { nom, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      nom,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: 'Votre registration etait succes', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.parent.sqlMessage, error: true });
  }
}

module.exports = { registerUser };
