require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const apiRoutes = require('./routing/api/apiRouter');
const authRouter = require('./routing/auth/authRouter');
const PORT = 3001;
const app = express();

const options = {
  host: 'db',
  port: 3306, // Default MySQL port
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

// Create the session store
const sessionStore = new MySQLStore(options);

// start session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use the secret from your .env file
    store: sessionStore, // Use MySQL session store
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Example: 24 hours
    },
  })
);

// start passport (auth services)
app.use(passport.initialize());
app.use(passport.session());
// register my auth strategy
require('./api_functions/passportConfig/locaStr');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/api', apiRoutes);
app.use('/auth', authRouter);
app.get('/test-session', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Number of views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome to this page for the first time!');
  }
});
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
