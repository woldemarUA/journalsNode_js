const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256'],
};
passport.use(
  new JwtStrategy(options, function (jwt_payload, done) {
    // Here, you could optionally verify if the user exists in your database.
    // For simplicity, we'll just pass the payload through.
    // You could also add more logic here, such as verifying user roles or permissions.
    done(null, jwt_payload);
  })
);

// You might already have serialization and deserialization setup.
// These are not required for JWT, but kept here if you're transitioning from session-based auth.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // Here, you would fetch the user from your database using the id.
  // For JWT, this step might not be necessary, but is kept for compatibility.
  done(null, { id }); // This is just a placeholder. Replace it with actual user object.
});
