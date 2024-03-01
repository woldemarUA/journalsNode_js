const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', async (req, res) => {
  res.render('auth/login', { title: 'login' });
});

// Route to handle login submissions
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/api/articles/45', // change after the tests
    failureFlash: false, // SET TO TRUE AND CONfigure message
  })
);

// Route to handle logout
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    //logout provided by the passport
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid', { path: '/' }); // remove cookie from the client
      res.redirect('/'); // Redirect after session is destroyed
    });
  });
});

module.exports = router;
