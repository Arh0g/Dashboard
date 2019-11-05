/*
Pour ALEX
Ce fichier permet entre autre de rediriger les routes vers les pages de login et de register.
Il permettra aussi de réceptionner les données de l'utilisateur quand il voudra s'authentifier
et s'inscrire par la même occasion.
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')

//User model for database
const User = require('../models/User')

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Sign Up Page
router.get('/register', (req, res) => res.render('register'));

//Get POST request from register
router.post('/register', (req, res) => {
    const {name, email, password, password2 } = req.body;
    let errors = [];

    //Check des données
    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill all the fields.'})
    }

    if (password !== password2) {
        errors.push({msg: 'Passwords not matching.'})
    }

    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters.'})
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name, 
            email,
            password,
            password2
        });
    } else {
        //Good
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //The user exists
                    errors.push({msg: "Email is already taken."})
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            newUser.password = hash
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered ! You can log in !')
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                    }))
                }
            });
    }
});

//Handle the login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

//Handle Logout (more later)
/*
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out !')
    res.redirect('/users/login')
})
*/

module.exports = router;