const { User } = require('../dbModels/dbInit');

async function getUserDetails(req, res) {
  const userId = req.params.id * 1;
  console.log(typeof userId);

  try {
    const user = await User.findByPk(userId);

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

module.exports = { getUserDetails };
