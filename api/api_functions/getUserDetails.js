const { User } = require('../dbModels/dbInit');

async function getUserDetails(req, res) {
  const userId = req.params.id * 1;
  console.log(typeof userId);

  try {
    const user = await User.findByPk(userId);

    return user;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}

module.exports = { getUserDetails };
