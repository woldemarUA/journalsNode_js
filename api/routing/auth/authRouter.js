const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', async (req, res) => {
  res.render('auth/login', { title: 'Homepage' });
});

// Route to handle login submissions
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/articles/',
    failureRedirect: '/api/articles/45', // change after the tests
    failureFlash: false, // SET TO TRUE AND CONfigure message
  })
);

// Route to handle logout
router.get('/logout', (req, res) => {
  req.logout(); // Passport provides this to terminate a login session.
  res.redirect('/');
});

module.exports = router;
