const express = require('express');
const router = express.Router();
const { getUsers } = require('../../api_functions/users/getUsers');

router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
