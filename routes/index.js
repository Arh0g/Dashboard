/*
Pour ALEX
Il va simplement rediriger le / vers le fichier welcome.
Et maintenant vers le dashboard quand /dashboard.
*/

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

//Passport variable and link it to his config
const passport = require('passport')
require('../config/passport')(passport)

router.get('/', (req, res) => res.render('welcome'));

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/dashboard',
    failureRedirect: '/'
}))

router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        user: req.user
    }))

module.exports = router;