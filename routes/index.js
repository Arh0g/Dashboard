/*
Pour ALEX
Il va simplement rediriger le / vers le fichier welcome.
Et maintenant vers le dashboard quand /dashboard.
*/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
let request = require('request')
var urlencodedParser = bodyParser.urlencoded({extended: false})
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

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    if (req.user.local) {
        widget = req.user.local.widgets
        user = req.user.local
    } else if (req.user.facebook) {
        widget = req.user.facebook.widgets
        user = req.user.facebook
    }
    res.render('dashboard', {
        user: user,
        widgets: widget
    })
})

router.post('/dashboard', urlencodedParser, (req, res) => {
    res.sendStatus(200)
})

router.post('/saveWidget', (req, res) => {
    var dataWidget = req.body
    var user = req.user
    var realUser
    if (user.local) {
        realUser = user.local
    } else if (user.facebook) {
        realUser = user.facebook
    }
    realUser.widgets.push(dataWidget)
    user.save()
    res.status(200).send('Widget added !')
})

router.post('/editWidget', (req, res) => {
    var widgetToChange = req.body.toChange
    var widgetNewValue = req.body.newValue
    console.log('To change -> ' + widgetToChange)
    console.log('New -> ' + widgetNewValue)
    var user = req.user
    var realUser
    if (user.local) {
        realUser = user.local
    } else if (user.facebook) {
        realUser = user.facebook
    }
    var widgets = realUser.widgets
    for (var i = 0; i < widgets.length; i++) {
        if (widgets[i].widgetContent == widgetToChange) {
            var newData = {
                widgetContent: widgetNewValue,
                widgetName: widgets[i].widgetName,
                widgetRole: widgets[i].widgetRole
            }
            widgets.splice(i, 1)
            realUser.widgets.push(newData)
            user.save()
            break;
        }
    }
    res.status(200).send('Widget updated !')
})

router.get('/loadWidget', (req, res) => {
    var widgets = req.user.local.widgets
    res.send(JSON.stringify(widgets))
})

router.post('/deleteWidget', (req, res) => {
    var widgetToRemove = req.body.toRemove
    var user = req.user
    var realUser
    if (req.user.local)
        realUser = req.user.local
    else if (req.user.facebook)
        realUser = req.user.facebook
    var widgets = realUser.widgets
    for (var i = 0; i < widgets.length; i++) {
        if (widgets[i].widgetContent == widgetToRemove) {
            widgets.splice(i, 1)
            user.save()
            break;
        }
    }
    res.status(200).send("Widget removed !")
})

router.get('/profile', ensureAuthenticated, (req, res) => {
    if (req.user.local) {
        user = req.user.local
    } else if (req.user.facebook) {
        user = req.user.facebook
    }
    res.render('profile', {
        user: user
    })
})

module.exports = router;