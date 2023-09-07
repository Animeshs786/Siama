const express = require('express');
const unspecifiedRoutesHandler = require('./unspecified.route');
const { finalErrorHandler } = require('../errorHandler');
const userRoute = require('./user.route');
const testRoute = require('./test.route');
const adminRoute = require('./admin.route');

const appRoutes = (app) => {
  app.use('/public', express.static('public/'));
  app.get('/', (req, res) => res.status(301).redirect('/api/ping'));
  app.get('/api/ping', (_, res) => res.status(200).json({ status: true, message: 'Ping Successfully.', timestamp: new Date() }));
  //user api
  app.use('/api/user', userRoute);
  app.use('/api/test', testRoute);
  //admin panel
  app.use('/admin', adminRoute);
  app.use(unspecifiedRoutesHandler);
  app.use(finalErrorHandler);
};

module.exports = appRoutes;

// app.use('/images', express.static('public/images'));
// app.use('/images', express.static('images'));
