const { User } = require('../dbModels/dbInit');
async function getUsers() {
  //

  try {
    const users = await User.findAll({
      attributes: ['nom', 'email', 'id'],
    });

    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getUsers };
