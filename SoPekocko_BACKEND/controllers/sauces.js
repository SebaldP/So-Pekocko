// Récupération du module 'file system' (téléchargements/modifications d'images)
const fs = require('fs');
// Récupération du modèle 'sauce'
const Sauce = require('../models/sauce');

exports.getAllSauces = (req, res, next) => {
    // On utilise la méthode find pour obtenir la liste complète des données, respectant le modèle 'sauce'.
    Sauce.find()
        .then((sauces) => {res.status(200).json(sauces)})
        .catch(() => res.status(500).send(new Error('Erreur dans la base de donnée!')));
};

exports.getOneSauce = (req, res , next) => {
    // On utilise la méthode findById pour obtenir la sauce correspondant à l'Id donnée, présente dans la base de données et respectant le modèle 'sauce'.
    Sauce.findById(req.params.id)
    .then((sauce) => {
        // Si la sauce n'existe pas, renvoyez une erreur 404.
        if (!sauce) {
            return res.status(404).send(new Error("La sauce n'a pas été trouvée !"));
        }
        res.status(200).json(sauce)})
    // Si on ne peut accéder à la sauce, renvoyez une erreur serveur 500.
    .catch(() => res.status(500).send(new Error('Erreur dans la base de donnée!')));
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce ajoutée !'}))
        .catch(() => res.status(500).send(new Error('Erreur dans la base de donnée!')));
};

exports.modifySauce = (req, res, next) => {
    let sauceObject = {};
    if (req.file) {
        Sauce.findOne({
            _id: req.params.id
        }).then((sauce) => {
          // On supprime l'ancienne image du serveur
            const filename = sauce.imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`)
        }),
        sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
    } else {
        sauceObject = {
            ...req.body
        }
    }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(() => res.status(500).send(new Error('Erreur dans la base de donnée!')));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
        .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(() => res.status(500).send(new Error('Erreur dans la base de donnée!')));
};

exports.markSauce = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;
    const sauceId = req.params.id;
    if (like === 1) {
        Sauce.updateOne({
            _id: sauceId }, {
            $inc: { likes: +1 },
            $push: { usersLiked: userId }
        })
            .then(() => res.status(201).json({ message: "Un utilisateur aime cette sauce ! Un Like en plus !" }))
            .catch(error => res.status(400).json({ error }));
    }
    if (like === -1) {
        Sauce.updateOne({
            _id: sauceId }, {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: userId }
            })
            .then(() => res.status(201).json({ message: "Un utilisateur n'aime pas cette sauce ! Un Dislike en plus !"}))
            .catch(error => res.status(400).json({ error }));
    }
    if (like === 0) {
        Sauce.findOne({ _id: sauceId })
            .then(sauce => {
                if (sauce.usersDisliked.includes(userId)) { // si le tableau userDisliked contient l'id de l'utilisateur, et l'utilisateur veut annuler son dislike
                    Sauce.updateOne({
                        _id: sauceId }, {
                        $pull: { usersDisliked: userId },
                        $inc: { dislikes: -1 }
                    })
                        .then((sauce) => { res.status(200).json({ message: "Un utilisateur a annulé son jugement ! Un Dislike en moins !"}) })
                        .catch(error => res.status(400).json({ error }))
                }
                if (sauce.usersLiked.includes(userId)) { // si le tableau userLiked contient l'id de l'utilisateur, et l'utilisateur veut annuler son like
                    Sauce.updateOne({ 
                        _id: sauceId }, {
                        $pull: { usersLiked: userId },
                        $inc: { likes: -1 }
                    })
                        .then((sauce) => { res.status(200).json({ message: "Un utilisateur a annulé son jugement ! Un Like en moins !" }) })
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(404).json({ error }));
    }
};