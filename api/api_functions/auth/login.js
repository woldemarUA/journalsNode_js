const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../../dbModels/dbInit');

// Définir la stratégie locale de Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'nom', // Utiliser 'nom' au lieu du 'username' par défaut
      passwordField: 'password', // Définir explicitement le champ 'password' si nécessaire ; il est par défaut
    },
    async (nom, password, done) => {
      try {
        // Utiliser findOne pour obtenir un seul utilisateur
        const user = await User.findOne({
          where: { nom: nom },
        });

        // Si aucun utilisateur n'est trouvé
        if (!user) {
          return done(null, false, { message: `Nom d'utilisateur incorrect.` });
        }

        // Utilisateur trouvé, maintenant vérifier le mot de passe
        const match = await bcrypt.compare(password, user.password); // Assurez-vous que 'user.password' est le champ du mot de passe haché
        if (match) {
          return done(null, user); // Le mot de passe correspond, retourner l'utilisateur
        } else {
          return done(null, false, { message: 'Mot de passe incorrect.' }); // Le mot de passe ne correspond pas
        }
      } catch (err) {
        console.error(err);
        return done(err); // Gestion correcte des erreurs
      }
    }
  )
);
