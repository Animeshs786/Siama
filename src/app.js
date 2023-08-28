const express = require('express');
const path = require('path');
const session = require('express-session');
const appRoutes = require('./routes');
const { initData } = require('./script');
const app = express();

app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(express.json({ limit: '100kb' }));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
  })
);

initData();
appRoutes(app);
require('./script/test'); //testing script

module.exports = app;
