const pool = require('../pg_conn/db_connect');

async function updateUser(id) {
  console.log(id);
  return id;
}

module.exports = updateUser;
