const express = require('express');
const adminRoute = express.Router();
adminRoute.get('/', (req, res) => {
  res.render('index', { data: 'rajat', data2: [1, 2] });
});
module.exports = adminRoute;
