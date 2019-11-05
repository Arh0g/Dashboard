/*
Pour ALEX
Il va simplement rediriger le / vers le fichier welcome.
Et maintenant vers le dashboard quand /dashboard.
*/
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

router.get('/', (req, res) => res.render('welcome'));
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        //Dont work
        user: req.user
    }))

module.exports = router;