const express = require('express');
const unspecifiedRoutesHandler = require('./unspecified.route');
const { finalErrorHandler } = require('../errorHandler');
const userRoute = require('./user.route');
const staticRoute = require('./static.route');
const adminRoute = require('./admin.route');
const vendorRoute = require('./vendor.route');

const appRoutes = (app) => {
  app.use('/public', express.static('public'));
  // app.get('/', (req, res) => res.status(301).redirect('/api/ping'));
  app.get('/api/ping', (_, res) => res.status(200).json({ status: true, message: 'Ping Successfully.', timestamp: new Date() }));
  app.use('/api/static', staticRoute);
  app.use('/api/user', userRoute);
  //admin panel
  app.use('/api/admin', adminRoute);
  app.use('/api/vendor', vendorRoute);
  app.use(unspecifiedRoutesHandler);
  app.use(finalErrorHandler);
};

module.exports = appRoutes;

// app.use('/images', express.static('public/images'));
// app.use('/images', express.static('images'));
