const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10; // The cost factor controls how much time is needed to calculate a single bcrypt hash. The higher the cost, the more hashing rounds are done. Increasing this value will make the password hashing process slower and more resistant to brute-force attacks.
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

// Example usage
// const myPassword = 'mySuperSecretPassword';
// console.log(hashPassword(myPassword));
// ok ,how i protect user password on the front end side on form submission (either registration or login)

// // Example of comparing a password to the hashed version
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true if they match
//     console.log('Do they match?', result);
// });

module.exports = { hashPassword };
