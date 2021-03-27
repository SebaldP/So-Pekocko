const passwordValidator = require('password-validator');

// Schéma de mot de passe sécurisé
const passwordSchema = new passwordValidator();

// Contraintes du mot de passe
passwordSchema
.is().min(10)                                   // Longueur minimun : 10
.has().uppercase()                              // Doit avoir (au moins) une majuscule
.has().lowercase()                              // Doit avoir (au moins) une minuscule
.has().digits()                                 // Doit avoir (au moins) un chiffre
.has().not().spaces()                           // Doit avoir aucun espace
.is().not().oneOf(['M0tdePasse']);              // Blacklist de valeurs à proscrire

module.exports = passwordSchema;