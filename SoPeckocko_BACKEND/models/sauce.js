const mongoose = require('mongoose');

// Modèle de "sauce"
const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: false, default: 0 },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: true },
    userLiked: { type: [String] , required: false },
    usersDisliked: { type: [String] , required: false },
});

module.exports = mongoose.model('Sauce', sauceSchema);