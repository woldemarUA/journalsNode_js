const { User } = require('../dbModels/dbInit');
async function getUsers(req, res) {
  //

  try {
    const users = await User.findAll({
      attributes: ['nom', 'email', 'id'],
    });

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = { getUsers };
