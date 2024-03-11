require('dotenv').config();
const options = {
  host: 'db',
  port: 3306, // Port MySQL par défaut
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};
console.log(options);
