//Strategy
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const configAuth = require('../config/auth')

//DB
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//DB Model
const User = require('../models/User')

module.exports = function(passport) {
    //Local Strategy
    passport.use('login', 
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Find user
            User.findOne({ 'local.email': email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'This email is not registered.'})
                    }
                    //Find if password is good
                    bcrypt.compare(password, user.local.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'This password is not correct.'})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },
    function(token, refreshToken, profile, done) {
        console.log(profile)
        process.nextTick(function() {
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err)
                if (user) {
                    return done(null, user)
                } else {
                    var newUser = new User()

                    newUser.facebook.id = profile.id
                    newUser.facebook.token = token
                    newUser.facebook.name  = profile.displayName

                    newUser.save(function(err) {
                        if (err)
                            throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }))
}