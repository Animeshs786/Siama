const express = require('express');
const appRoutes = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(express.json({ limit: '100kb' }));

appRoutes(app);
module.exports = app;
