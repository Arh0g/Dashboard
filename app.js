const express = require('express');
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const app = express();
const passport = require('passport')
const cors = require('cors')


//DB
const db = require('./config/keys').MongoURI;
mongoose.set('useCreateIndex', true)
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("Mongoose connected ! :)"))
  .catch(err => console.log)

//EJS
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}))

//Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Connect Flash
app.use(flash())

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

//To use steam api
app.use(cors())

//ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use(express.static(__dirname + '/public'));

app.listen(8080, () => {
  console.log('Dashboard listening on port 8080!');
});