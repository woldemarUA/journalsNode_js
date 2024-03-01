function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // Proceed to the next middleware or route handler
  }
  // User is not authenticated
  req.flash('message', 'il faut etre connecté(e) pour voir cette page');
  res.redirect('/auth/login'); // Redirect to the login page
}

module.exports = ensureAuthenticated;
