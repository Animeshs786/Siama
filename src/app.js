const express = require('express');
const path = require('path');
const morgan = require('morgan');
// const ejs = require('ejs');
// const session = require('express-session');
const cors = require('cors');
const appRoutes = require('./routes');
const { initData } = require('./script');
const app = express();

app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(express.json({ limit: '100kb' }));
app.use(cors());
app.use(morgan('dev'));

/*
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'secretkey',
    resave: false, // R&D on options
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);
// ejs.openDelimiter = '[';
ejs.delimiter = '?'; // little formating
// ejs.closeDelimiter = ']';
*/
initData();
appRoutes(app);
require('./script/test'); //testing script

module.exports = app;
