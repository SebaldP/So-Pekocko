const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const verifyPassword = require('../middleware/verifyPassword');

// Routes de l'API "user"
router.post('/signup', verifyPassword, userCtrl.createUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;