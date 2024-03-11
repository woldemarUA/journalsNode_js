const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/register', async (req, res) => {
  res.render('auth/login', { title: 'login' });
});

router.post(
  '/register',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/register', // change after the tests
    failureFlash: true, // SET TO TRUE AND CONfigure message
  })
);
router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'login',
    // messages: messages,
    // hasErrors: messages.length > 0,
  });
});
// Route to handle login submissions
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
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
