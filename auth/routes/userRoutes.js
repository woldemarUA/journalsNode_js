const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const register = require('../functions/registerUser');
const getAllUsers = require('../functions/getAllUsers');
const getUserById = require('../functions/getUserById');
const deleteUser = require('../functions/deleteUser');
const updateUser = require('../functions/updateUser');
const extractId = require('../utilities/extractId');

router.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const msg = await register(userData);
    res.status(200).json(msg);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local',
    {
      session: false,
    },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        // auth etait rejeté pas de utilisateur
        return res.status(401).json({ message: info.message });
      }
      // generation JWT token
      const userPayload = { id: user.id, email: user.email, role: user.role };
      const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });
      res.json({ token, userPayload });
    }
  )(req, res, next);
});

router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const id = extractId(req);

    const user = await getUserById(id);
    if (!user) {
      // si l,utilisateur netait trouvee a 404 Not Found reponse
      return res.status(404).json({ message: 'Pas des utilisateur' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const id = extractId(req);

    const user = await deleteUser(id);
    res.status(200).json({ message: 'Utilisateur etait effacé', user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});
router.put('/users/:id', async (req, res) => {
  try {
    const id = extractId(req);
    const user = await updateUser(id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const msg = req.body;
    console.log(msg);
    res.status(200).json(msg);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
router.post('/token', async (req, res) => {
  try {
    const msg = req.body;
    console.log(msg);
    res.status(200).json(msg);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
router.post('/verify', async (req, res) => {
  try {
    const msg = req.body;
    console.log(msg);
    res.status(200).json(msg);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
module.exports = router;
