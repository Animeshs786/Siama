const express = require('express');
const path = require('path');
const appRoutes = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(express.json({ limit: '100kb' }));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

appRoutes(app);
require('./script/test'); //testing script
module.exports = app;
