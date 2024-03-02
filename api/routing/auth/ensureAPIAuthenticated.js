function ensureApiAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    message: 'Vous devez être connecté pour accéder à cette ressource.',
  });
}

module.exports = ensureApiAuthenticated;
