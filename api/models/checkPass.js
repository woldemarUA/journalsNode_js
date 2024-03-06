const bcrypt = require('bcrypt');
const saltRounds = 10;
// Example hash and password. Replace these with the actual hash from Symfony and the password you want to verify.
const hashFromSymfony =
  '$2y$10$UVg5rNgL5iEV8uwAkUGbNOpriWk5A2P.BArcohIEO2rSRTFcTAnpm';
const passwordToVerify = '123';

async function hashPassword(password) {
  // Le facteur de coût contrôle le temps nécessaire pour calculer un seul hachage bcrypt.
  // Plus le coût est élevé, plus il y a de tours de hachage. Augmenter cette valeur rendra le processus de hachage du mot de passe plus lent et plus résistant aux attaques par force brute.
  const saltRounds = 10;
  try {
    // Hachage du mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Mot de passe haché :', hashedPassword);
    return hashedPassword;
  } catch (error) {
    // Gestion des erreurs de hachage
    console.error('Erreur lors du hachage du mot de passe :', error);
  }
}
hashPassword(passwordToVerify);
// bcrypt.compare(passwordToVerify, hashFromSymfony, function (err, result) {
//   if (err) {
//     console.error('Error verifying password:', err);
//     return;
//   }
//   if (result) {
//     console.log('Password is correct!');
//   } else {
//     console.log('Password is incorrect.');
//   }
// });

// const myPassword = '123';

// bcrypt.hash(myPassword, saltRounds, function (err, hash) {
//   if (err) throw err;
//   // Now test the hash against the password
//   bcrypt.compare(myPassword, hash, function (err, result) {
//     if (result) {
//       console.log('Password matches the hash!');
//     } else {
//       console.log('Password does NOT match the hash.');
//     }
//   });
// });
