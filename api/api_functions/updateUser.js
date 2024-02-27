const { User } = require('../dbModels/dbInit');

async function updateUser(req, res) {
  const userId = req.params.id * 1;

  try {
    // const response = await User.destroy({
    //   where: {
    //     id: userId,
    //   },
    // });

    res.status(200).json({
      //response,
      msg: 'Votre utilisateur était supprime',
      userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

module.exports = { updateUser };
