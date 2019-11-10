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

/*Weather*/

function getWeatherFromCity(city) {
    let apiKey = '48eb9b6228b51e3445b97cb1640729a1'
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, {json: true}, (err, response, body) => {
        if (err) {
            console.log('error:', error);
        } else {
            console.log('body:', body);
        }
        var temp = body.main.temp
        return temp
    })
    //return temp
}

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    //Get the widgets of the user
    var widget
    var widgets = {
        name: "",
        content: "",
        value: ""
    }
    var tabWidgets = []
    //
    if (req.user.local) {
        widget = req.user.local.widgets
    } else if (req.user.facebook) {
        widget = req.user.facebook.widgets
    }
    for (var i = 0; i < widget.length; i++) {
        if (widget[i].name == "weather") {
            widgets.name = widget[i].name
            widgets.content = widget[i].content
            var valueWidget = getWeatherFromCity(widget[i].content)
            widgets.value = valueWidget
            //
            tabWidgets.push(widgets)
        } else if (widget[i].name == "youtube") {
            continue
        } else if (widgets[i].name == "steam") {
            continue
        }
    }
    res.render('dashboard', {
        user: req.user,
        widgets: tabWidgets
    })
})

router.post('/dashboard', urlencodedParser, (req, res) => {
    var temp = ""
    var name = ""
    var user = req.user
    if (req.body.cityWeather != undefined) {
        temp = req.body.cityWeather
        name = "weather"
    } else if (req.body.videoID != undefined) {
        temp = req.body.videoID
        name = "youtube"
    } else if (req.body.steamID != undefined) {
        temp = req.body.steamID
        name = "steam"
    }
    var object = {
        name: name,
        content: temp
    }
    if (user.local)
        user.local.widgets.push(object)
    else if (user.facebook)
        user.facebook.widgets.push(object)
    user.markModified('local')
    user.save()
    res.sendStatus(200)
})

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', {
        user: req.user
    })
})

module.exports = router;