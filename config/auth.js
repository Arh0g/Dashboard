module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            req.flash('error_msg', 'Please log in to see the dashboard !')
            res.redirect('/users/login')
        }
    },

    //Facebook Data
    'facebookAuth' : {
        'clientID' : '1223437854510072',
        'clientSecret' : '20b5a039759bcb4be30f6dacd95d4d0a',
        'callbackURL' : 'http://localhost:8080/auth/facebook/callback',
        'profileURL' : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name']
    }
}