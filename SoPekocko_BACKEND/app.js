const express = require('express');                 // importation du package "express": node.js web framework
const bodyParser = require('body-parser');          // importation du package "body-parser": parse incoming request bodies in a middleware before handlers, available under the req.body property.
const cookieParser = require("cookie-parser");      // importation du package "cookie-parser": pour lire les cookies
const mongoose = require('mongoose');               // importation du package "mongoose": ODM, a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
const helmet = require('helmet');                   // importation du package "helmet": 13 middleware pour sécuriser les données et les connexions.
const path = require('path');                       // importation du package "path": provides a way of working with directories and file paths.
const cors = require('cors');                       // importation du package "cors": manage cross-origin resource sharing
const rateLimit = require('express-rate-limit');    // importation du package "express-rate-limit": on va fixer un taux limite pour les requêtes, afin de protéger le système contre le "brute force".
const cookieSession = require("cookie-session");    // importation du package "cookie-session": il définit les flags des cookies (contre attaques XSS et CSRF)
const toobusy = require("toobusy-js");              // importation du package "toobusy": il empêche le Denial of Service (DoS) en monitorant l'event loop

const app = express();

const rateLimiter = rateLimit({         
    windowMs : 25 * 60 * 1000, 
    max: 5, 
    message: "Vous avez dépassé le nombre maximal de tentatives, merci de réessayer ultérieurement."
})

app.use("/api/auth", rateLimiter);

app.use(cors({origin: 'http://localhost:4200'}));   // Sécurisation CORS: localhost:4200

// connection à la base de données
mongoose
    .connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

// Headers qui configure les actions à implémenter CORS
app.use((req, res, next) => {
    // d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res, next) => {
    if (toobusy()) {
        res.send(503, "Le serveur est saturé !");
    } else {
        next();
    }
});

const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 heure
app.use(cookieSession({
    secret: "SopOPC20",
    name: "sessionId",
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: true,
        path: "/api/",
        expires: expiryDate
    }    
}));

// Gestion pour accès aux fichiers images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Sécurisation d'express en paramètrant les entêtes HTTP
app.use(helmet());

// Extraction de l'objet JSON des requètes entrantes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Importation des routes pour "sauces" et "users", du dossier "routes"
const saucesRoutes = require('./routes/sauces');
const usersRoutes = require('./routes/users');

// déclaration des API et de leurs routes respectives
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', usersRoutes);

module.exports = app;