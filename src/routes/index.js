const express = require('express');
const unspecifiedRoutesHandler = require('./unspecified.route');
const { finalErrorHandler } = require('../errorHandler');
const userRoute = require('./user.route');
const appRoutes = (app) => {
  app.get('/', (_, res) => {
    res.status(200).json({ status: true, message: 'Ping Successfully.', timestamp: new Date() });
  });
  app.use('/user', userRoute);
  app.use(unspecifiedRoutesHandler);
  app.use(finalErrorHandler);
};

module.exports = appRoutes;

// app.use('/images', express.static('public/images'));
// app.use('/images', express.static('images'));
