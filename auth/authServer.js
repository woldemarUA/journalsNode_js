require('dotenv').config();

const express = require('express');
const passport = require('passport');

const pool = require('./pg_conn/db_connect');

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(passport.initialize());
require('./passportConfig/localStrategy');

app.use('/', userRoutes);

// app.get('/', async (req, res) => {
//   try {
//     const response = await pool.query('SELECT * FROM users');

//     res.send(`Bonjour sur port ${PORT}, Time: ${response.rows[0]}`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error executing query');
//   }
// });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
