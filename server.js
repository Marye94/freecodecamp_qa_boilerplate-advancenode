'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session')
const passport = require('passport')
const { ObjectID } = require('mongodb');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  //myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
    //done(null, null);
  //});
  done(null, null);
});


const app = express();

app.set('view engine', 'pug');
app.set('views', './views/pug');

fccTesting(app); //For FCC testing purposes

app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

app.route('/').get((req, res) => {
  res.render('index', {
    title: 'Hello',
    message: 'Please log in'
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
