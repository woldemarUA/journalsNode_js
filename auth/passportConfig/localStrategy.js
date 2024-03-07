const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('../pg_conn/db_connect');

// Définir la stratégie locale de Passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Utiliser  un seul utilisateur
      const query = {
        // give the query a unique name
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
      };

      const res = await pool.query(query);
      const user = res.rows[0];
      // Si aucun utilisateur n'est trouvé
      if (!user) {
        return done(null, false, { message: `Nom d'utilisateur incorrect.` });
      }

      // Utilisateur trouvé, maintenant vérifier le mot de passe
      const match = await bcrypt.compare(password, user.hashed_password);
      if (match) {
        return done(null, user); // Le mot de passe correspond, retourner l'utilisateur
      } else {
        return done(null, false, { message: 'Mot de passe incorrect.' }); // Le mot de passe ne correspond pas
      }
    } catch (err) {
      console.error(err);
      return done(err); // Gestion correcte des erreurs
    }
  })
);

// // Serializing user
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserializing user
// passport.deserializeUser((id, done) => {
//   User.findByPk(id)
//     .then((user) => done(null, user))
//     .catch((err) => done(err));
// });
