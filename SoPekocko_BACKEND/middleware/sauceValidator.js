const validation = require('mongoose-validator');

exports.nameSauceValidator = [
    validation({
        validator: 'isLength',
        arguments: [3, 60],
        message: 'Le nom de votre Sauce doit contenir entre 3 and 60 caractères',
    }),
    validation({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour nommer votre sauce",
    }),
];

exports.manufacturerSauceValidator = [
    validation({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Le nom du fabricant doit contenir entre 3 et 40 caractères',
    }),
    validation({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour nommer le fabricant",
    }),
];

exports.descriptionSauceValidator = [
    validation({
        validator: 'isLength',
        arguments: [10, 150],
        message: 'La description de la sauce doit contenir entre 10 et 150 caractères',
    }),
    validation({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour la description de la sauce",
    }),
];

exports.pepperSauceValidator = [
    validation({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Le principal ingrédient doit contenir entre 3 et 20 caractères',
    }),
    validation({
        validator: 'isAlphanumeric',
        message: "Ne peut contenir que des caractères alphanumériques entre 3 et 20 caractères",
    }),
];