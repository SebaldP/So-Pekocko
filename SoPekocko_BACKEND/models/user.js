const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

// Modèle de "user"
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Veuillez entrer votre adresse e-mail!"],
        // match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Veuillez entrer votre mot de passe!"]
    },
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('User', userSchema);