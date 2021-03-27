const bcrypt = require('bcrypt');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
    const firstCharacter = req.body.email.split("@")[0].charAt(0);
    const firstString = req.body.email.split("@")[0].substring(1);
    const lastString = req.body.email.split("@")[1];
    const hashEmailvalue = `${firstCharacter}${md5(firstString)}@${lastString}`; 
    bcrypt.hash(req.body.password, 10)
    .then(hashPassword => {
        const user = new User({
            email: hashEmailvalue,
            password: hashPassword
        });
        user.save()
        .then(() => res.status(201).json({message: "Compte créé et accès validé!"}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.loginUser = (req, res, next) => {
    const firstCharacter = req.body.email.split("@")[0].charAt(0);
    const firstString = req.body.email.split("@")[0].substring(1);
    const lastString = req.body.email.split("@")[1];
    const hashEmailvalue = `${firstCharacter}${md5(firstString)}@${lastString}`;
    User.findOne({ email: hashEmailvalue })
    .then(user => {
        if (!user){
            return res.status(401).json({error: "Compte introuvable!"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({error: "Mode de passe incorrect!"});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'SO_PEKOCKO_TOKEN',
                    { expiresIn: '24h' }
                    )
                });
            })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};