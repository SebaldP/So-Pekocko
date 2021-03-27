const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

// Modèle de "sauce"
const sauceSchema = mongoose.Schema({
    // Identifiant de l'utilisateur qui a ajouté la sauce dans la base de données
    userId: {
        type: String,
        required: true
    },
    // Nom de la sauce
    name: {
        type: String,
        required: true
    },
    // Concepteur de la sauce
    manufacturer: {
        type: String,
        required: true
    },
    // Description de la sauce
    description: {
        type: String,
        required: true
    },
    // Ingrédient principal, donnant le piquant à la sauce
    mainPepper: {
        type: String,
        required: true
    },
    // Adresse de l'image, présentant la sauce
    imageUrl: {
        type: String,
        required: true
    },
    // Force piquante de la sauce
    heat: {
        type: Number,
        required: true
    },
    // Nombre de "j'aime" attribué à la sauce
    likes: {
        type: Number
    },
    // Nombre de "je n'aime pas" attribué à la sauce
    dislikes: {
        type: Number
    },
    // Tableau d'utilisateurs qui apprécie la sauce
    usersLiked: {
        type: [String]
    },
    // Tableau d'utilisateurs qui n'apprécie pas la sauce
    usersDisliked: {
        type: [String]
    }
});

sauceSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('Sauce', sauceSchema);