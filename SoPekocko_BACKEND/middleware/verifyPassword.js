const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(
            400,
            '{"message":"Mot de passe requis: 10 caractères minimum, au moins 1 MAJUSCULE, 1 minuscule et 1 chiffre. Le mot de passe ne doit comporter aucun espace"}',
            {'content-type': 'application/json'}
        );
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};